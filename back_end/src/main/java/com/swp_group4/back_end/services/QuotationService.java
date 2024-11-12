package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.*;
import com.swp_group4.back_end.mapper.ConstructionOrderMapper;
import com.swp_group4.back_end.mapper.QuotationMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.ExportQuotationRequest;
import com.swp_group4.back_end.responses.*;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class QuotationService {

    @Autowired
    QuotationMapper quotationMapper;
    @Autowired
    QuotationRepository quotationRepository;
    @Autowired
    ConstructionTasksRepository constructionTasksRepository;
    @Autowired
    PackageConstructionRepository packageConstructionRepository;
    @Autowired
    PackageRepository packageRepository;
    @Autowired
    PackagePriceRepository packagePriceRepository;
    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    private ConstructionOrderMapper constructionOrderMapper;

    public List<OverviewQuotationResponse> listQuotation(String accountId) {
        List<OverviewQuotationResponse> responses = new ArrayList<>();
        Staff staff = staffRepository.findByAccountId(accountId).orElseThrow();
        List<ConstructionOrder> orders = constructOrderRepository.findByConsultantIdAndQuotationIdIsNotNull(staff.getStaffId());
        for (ConstructionOrder order : orders) {
            OverviewQuotationResponse response = buildOverviewQuotation(order.getQuotationId());
            responses.add(response);
        }
        return responses;
    }

    private OverviewQuotationResponse buildOverviewQuotation(String quotationId) {
        ConstructionOrder order = constructOrderRepository.findByQuotationId(quotationId);
        Quotation quotation = quotationRepository.findById(quotationId).orElseThrow();
        Customer customer = this.findCustomerById(order.getCustomerId());
        return OverviewQuotationResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .quotationId(quotationId)
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .postedDate(quotation.getPostedDate())
                .quotationStatus(quotation.getQuotationStatus())
                .build();
    }

    public Quotation exportQuotation(String constructionOrderId, ExportQuotationRequest request){
        Packages packages = this.findPackage(request.getPackageId());
        List<PackageConstruction> packageConstructions = packageConstructionRepository.findByPackageId(request.getPackageId());
        double totalPrice = 0;
        for (PackageConstruction packageConstruction : packageConstructions) {
            totalPrice += packageConstruction.getPrice();
        }
        double volume = request.getHeight() * request.getWidth() * request.getLength();
        PackagePrice packagePrice = this.findPackagePrice(packages.getPackageId(), volume, volume);
        totalPrice = this.totalPrice(volume, packagePrice.getPrice());
        ConstructionOrder order = this.findOrderById(constructionOrderId);
        this.saveConstructionTasks(constructionOrderId, request.getPackageId());
        Quotation quotation = quotationRepository.save(this.saveQuotation(request, volume));
        constructOrderRepository.save(this.saveConstructionOrder(order, quotation, request, totalPrice));
        return quotation;
    }

    Packages findPackage(String packageId) {
        return packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found for id: " + packageId));
    }

    PackagePrice findPackagePrice(String packageId, double minVolume, double maxVolume) {
        return packagePriceRepository.findFirstByPackageIdAndMinVolumeLessThanEqualAndMaxVolumeGreaterThanEqual
                        (packageId, minVolume, maxVolume);
    }

    PackageConstruction findPackageConstruction(String packageConstructionId) {
        return packageConstructionRepository.findById(packageConstructionId)
                .orElseThrow(() -> new RuntimeException("Package construction not found for id: " + packageConstructionId));
    }

    double totalPrice(double volume, double packagePrice){
        return  packagePrice * volume;
    }

    void saveConstructionTasks(String constructionOrderId, String packageId) {
        List<PackageConstruction> packageConstructions = packageConstructionRepository.findByPackageId(packageId);
        for (PackageConstruction packageConstruction : packageConstructions) {
            ConstructionTasks task = ConstructionTasks.builder()
                    .constructionOrderId(constructionOrderId)
                    .packageConstructionId(packageConstruction.getPackageConstructionId())
                    .status(ConstructStatus.NOT_YET)
                    .build();
            constructionTasksRepository.save(task);
        }
    }

    List<String> constructionTasks(String packageId) {
        List<String> contentTasks = new ArrayList<>();
        List<PackageConstruction> packageConstructions = packageConstructionRepository.findByPackageId(packageId);
        for (PackageConstruction packageConstruction : packageConstructions) {
            contentTasks.add(findPackageConstruction
                    (packageConstruction.getPackageConstructionId()).getContent());
        }
        return contentTasks;
    }

    ConstructionOrder saveConstructionOrder(ConstructionOrder order, Quotation quotation ,ExportQuotationRequest request ,double totalPrice) {
        order.setQuotationId(quotation.getQuotationId());
        order.setCustomerRequest(request.getCustomerRequest());
        order.setTotal(totalPrice);
        return constructOrderRepository.save(order);
    }

    Quotation saveQuotation(ExportQuotationRequest request, double volume) {
        Quotation quotation = Quotation.builder()
                .volume(volume)
                .postedDate(LocalDateTime.now())
                .batch(QuotationBatch.STAGE_1)
                .paymentStatus(PaymentStatus.PENDING)
                .quotationStatus(QuotationStatus.QUOTED)
                .build();
        return quotationMapper.toQuotation(request, quotation);
    }

    Quotation updateQuotation(ExportQuotationRequest request, double volume, String quotationId) {
        Quotation quotation = quotationRepository.findById(quotationId).orElseThrow(() -> new RuntimeException("Quotation not found for id: " + quotationId));
        quotation.setPostedDate(LocalDateTime.now());
        quotation.setVolume(volume);
        quotation.setBatch(QuotationBatch.STAGE_1);
        quotation.setPaymentStatus(PaymentStatus.PENDING);
        quotation.setQuotationStatus(QuotationStatus.QUOTED);
        return quotationMapper.toQuotation(request, quotation);
    }

    String getStaffName(String staffId) {
        if (staffId != null && !staffId.isEmpty()) {
            return staffRepository.findById(staffId)
                    .orElseThrow(() -> new RuntimeException("Staff not found")).getStaffName();
        }
        return "";
    }

    ConstructionOrder findOrderById(String orderId){
        return constructOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    Customer findCustomerById(String customerId){
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public ConstructQuotationResponse viewQuotation(String constructionOrderId) {
        ConstructionOrder order = this.findOrderById(constructionOrderId);
        Quotation quotation = quotationRepository.findById(order.getQuotationId())
                .orElseThrow(() -> new RuntimeException("Quotation not found"));
        Customer customer = this.findCustomerById(order.getCustomerId());
        Packages packages = this.findPackage(quotation.getPackageId());
        ConstructQuotationResponse response = ConstructQuotationResponse.builder()
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .consultantName(this.getStaffName(order.getConsultantId()))
                .packageType(packages.getPackageType())
                .priceStage1((order.getTotal() * quotation.getPercentageStage1())/100)
                .priceStage2((order.getTotal() * quotation.getPercentageStage2())/100)
                .priceStage3((order.getTotal() * quotation.getPercentageStage3())/100)
                .content(this.constructionTasks(packages.getPackageId()))
                .build();
        constructionOrderMapper.toConstructQuotationResponse(order, response);
        return quotationMapper.toQuotationResponse(quotation, response);
    }

    @Transactional
    public Quotation updateQuotation(String quotationId, ExportQuotationRequest request) {
        Packages packages = this.findPackage(request.getPackageId());
        double volume = request.getHeight() * request.getWidth() * request.getLength();
        PackagePrice packagePrice = this.findPackagePrice(packages.getPackageId(), volume, volume);
        double totalPrice = this.totalPrice(volume, packagePrice.getPrice());
        ConstructionOrder order = constructOrderRepository.findByQuotationId(quotationId);
        constructionTasksRepository.deleteAllByConstructionOrderId(order.getConstructionOrderId());
        this.saveConstructionTasks(order.getConstructionOrderId(), request.getPackageId());
        Quotation quotation = quotationRepository.save(this.updateQuotation(request, volume, quotationId));
        constructOrderRepository.save(this.saveConstructionOrder(order, quotation, request, totalPrice));
        return quotation;
    }

    public ViewRejectedQuotationResponse viewRejectedQuotation(String quotationId) {
        ConstructionOrder order = constructOrderRepository.findByQuotationId(quotationId);
        Quotation quotation = quotationRepository.findById(quotationId)
                .orElseThrow(() -> new RuntimeException("Quotation not found"));
        Customer customer = this.findCustomerById(order.getCustomerId());
        Packages packages = this.findPackage(quotation.getPackageId());
        ViewRejectedQuotationResponse response = ViewRejectedQuotationResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .address(customer.getAddress())
                .phone(customer.getPhone())
                .packageId(packages.getPackageId())
                .consultantName(this.getStaffName(order.getConsultantId()))
                .customerRequest(order.getCustomerRequest())
                .build();
        return quotationMapper.toViewRejectedQuotationResponse(quotation, response);
    }

    public GeneratePDFResponse generatePDF(String constructionOrderId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow();
        Staff staff = staffRepository.findById(order.getConsultantId()).orElseThrow();
        Quotation quotation = quotationRepository.findById(order.getQuotationId()).orElseThrow();
        Customer customer = customerRepository.findById(order.getCustomerId()).orElseThrow();
        Packages packages = packageRepository.findById(quotation.getPackageId()).orElseThrow();
        List<PackageConstruction> listPackageConstruction = packageConstructionRepository.findByPackageId(packages.getPackageId());
        double volume = quotation.getVolume();
        PackagePrice packagePrice = this.findPackagePrice(packages.getPackageId(), volume, volume);
        double priceVolume = this.totalPrice(volume, packagePrice.getPrice());
        GeneratePDFResponse response = GeneratePDFResponse.builder()
                .consultant(staff.getStaffName())
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .address(customer.getAddress())
                .phone(customer.getPhone())
                .customerRequest(order.getCustomerRequest())
                .packageType(packages.getPackageType())
                .listPackageConstruction(listPackageConstruction)
                .total(order.getTotal())
                .priceVolume(priceVolume)
                .minVolume(packagePrice.getMinVolume())
                .maxVolume(packagePrice.getMaxVolume())
                .priceStage1((order.getTotal() * quotation.getPercentageStage1())/100)
                .priceStage2((order.getTotal() * quotation.getPercentageStage2())/100)
                .priceStage3((order.getTotal() * quotation.getPercentageStage3())/100)
                .build();
        return quotationMapper.toGeneratePdfResponse(quotation, response);
    }
}
