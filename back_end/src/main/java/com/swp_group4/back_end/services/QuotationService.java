package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.*;
import com.swp_group4.back_end.mapper.QuotationMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.ExportQuotationRequest;
import com.swp_group4.back_end.responses.*;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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
        Quotation quotation = quotationRepository.findById(order.getQuotationId()).orElseThrow();
        Customer customer = this.findCustomerById(order.getCustomerId());
        return OverviewQuotationResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .quotationId(quotationId)
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .postedDate(quotation.getPostedDate())
                .quotationStatus(quotation.getQuotationStatus())
                .build();
    }

    public Quotation exportQuotation(String constructionOrderId, ExportQuotationRequest request) {
        Packages packages = this.findPackage(request.getPackageId());
        double volume = request.getHeight() * request.getWidth() * request.getLength();
        PackagePrice packagePrice = this.findPackagePrice(packages.getPackageId(), volume, volume);
        double totalPrice = this.totalPrice(volume, packagePrice.getPrice());
        ConstructionOrder order = this.findOrderById(constructionOrderId);
        this.saveConstructionTasks(constructionOrderId, request.getPackageId());
        Quotation quotation =  quotationRepository.save(this.saveQuotation(request, totalPrice, volume));
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
        order.setStartDate(request.getStartDate());
        order.setEndDate(request.getEndDate());
        return constructOrderRepository.save(order);
    }

    Quotation saveQuotation(ExportQuotationRequest request, double totalPrice, double volume) {
        Quotation quotation = Quotation.builder()
                .priceStage1(totalPrice*0.2)
                .priceStage2(totalPrice*0.3)
                .priceStage3(totalPrice*0.5)
                .width(request.getWidth())
                .height(request.getHeight())
                .length(request.getLength())
                .volume(volume)
                .batch(QuotationBatch.STAGE_1)
                .paymentStatus(PaymentStatus.PENDING)
                .quotationStatus(QuotationStatus.QUOTED)
                .build();
        quotationMapper.toQuotation(request, quotation);
        return quotation;
    }

    Quotation updateQuotation(ExportQuotationRequest request, double totalPrice, double volume, String quotationId) {
        Quotation quotation = quotationRepository.findById(quotationId).orElseThrow(() -> new RuntimeException("Quotation not found for id: " + quotationId));
        quotation.setPriceStage1(totalPrice * 0.2);
        quotation.setPriceStage2(totalPrice * 0.3);
        quotation.setPriceStage3(totalPrice * 0.5);
        quotation.setWidth(request.getWidth());
        quotation.setHeight(request.getHeight());
        quotation.setLength(request.getLength());
        quotation.setVolume(volume);
        quotation.setBatch(QuotationBatch.STAGE_1);
        quotation.setPaymentStatus(PaymentStatus.PENDING);
        quotation.setQuotationStatus(QuotationStatus.QUOTED);
        quotationMapper.toQuotation(request, quotation);
        return quotation;
    }

    String getStaffName(String staffId) {
        if (staffId != null && !staffId.isEmpty()) {
            return staffRepository.findById(staffId)
                    .orElseThrow(() -> new RuntimeException("Staff not found")).getStaffName();
        }
        return "";
    }

    Staff identifyStaff() {
        var context = SecurityContextHolder.getContext();
        String accountId = context.getAuthentication().getName();
        return staffRepository.findByAccountId(accountId)
                .orElseThrow(() -> new RuntimeException("Error"));
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
                .customerRequest(order.getCustomerRequest())
                .packageType(packages.getPackageType())
                .totalPrice(order.getTotal())
                .content(this.constructionTasks(packages.getPackageId()))
                .build();
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
        Quotation quotation = quotationRepository.save(this.updateQuotation(request, totalPrice, volume, quotationId));
        constructOrderRepository.save(this.saveConstructionOrder(order, quotation, request, totalPrice));
        return quotation;
    }

    public ViewRejectedQuotationResponse viewRejectedQuotation(String quotationId) {
        ConstructionOrder order = constructOrderRepository.findByQuotationId(quotationId);
        Quotation quotation = quotationRepository.findById(quotationId)
                .orElseThrow(() -> new RuntimeException("Quotation not found"));
        Customer customer = this.findCustomerById(order.getCustomerId());
        Packages packages = this.findPackage(quotation.getPackageId());
        return ViewRejectedQuotationResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .address(customer.getAddress())
                .phone(customer.getPhone())
                .width(quotation.getWidth())
                .height(quotation.getHeight())
                .length(quotation.getLength())
                .packageId(packages.getPackageId())
                .consultantName(this.getStaffName(order.getConsultantId()))
                .customerRequest(order.getCustomerRequest())
                .startDate(order.getStartDate())
                .endDate(order.getEndDate())
                .build();
    }
}
