package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.*;
import com.swp_group4.back_end.mapper.QuotationMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.ExportQuotationRequest;
import com.swp_group4.back_end.responses.*;
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
public class ConsultationService {

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
    private CustomerRepository customerRepository;

    public List<ConstructOrderDetailForStaffResponse> listOwnedConsultTask() {
        List<ConstructOrderDetailForStaffResponse> responses = new ArrayList<>();
        String id = "bc68fbf7-8729-11ef-bf00-c85acfa9b517";
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found"));
//        Staff staff = this.identifyStaff();
        List<ConstructionOrder> orders = constructOrderRepository.findByConsultantId(staff.getStaffId());
        for (ConstructionOrder order : orders) {
            ConstructOrderDetailForStaffResponse response = this.detailOfOrder(order.getConstructionOrderId());
            response.setStaffName(staff.getStaffName());
            responses.add(response);
        }
        return responses;
    }

    public Quotation exportQuotation(String constructionOrderId, ExportQuotationRequest request) {
        Packages packages = this.findPackage(request.getPackageId());
        double volume = request.getHeight() * request.getWidth() * request.getLength();
        PackagePrice packagePrice = this.findPackagePrice(packages.getPackageId(), volume, volume);
        double totalPrice = this.totalPrice(volume, packagePrice.getPrice());
        ConstructionOrder order = this.findOrderById(constructionOrderId);
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

    List<String> saveConstructionTasks(String constructionOrderId, String packageId) {
        List<String> contentTasks = new ArrayList<>();
        List<PackageConstruction> packageConstructions = packageConstructionRepository.findByPackageId(packageId);
        for (PackageConstruction packageConstruction : packageConstructions) {
            ConstructionTasks task = ConstructionTasks.builder()
                    .constructionOrderId(constructionOrderId)
                    .packageConstructionId(packageConstruction.getPackageConstructionId())
                    .status(ConstructStatus.NOT_YET)
                    .build();
            constructionTasksRepository.save(task);
            contentTasks.add(findPackageConstruction
                    (packageConstruction.getPackageConstructionId()).getContent());
        }
        return contentTasks;
    }

    ConstructionOrder saveConstructionOrder(ConstructionOrder order, Quotation quotation ,ExportQuotationRequest request ,double totalPrice) {
        order.setQuotationId(quotation.getQuotationId());
        order.setTotal(totalPrice);
        order.setStartDate(request.getStartDate());
        order.setEndDate(request.getEndDate());
        order.setStatus(ConstructionOrderStatus.QUOTED);
        return constructOrderRepository.save(order);
    }

    Quotation saveQuotation(ExportQuotationRequest request, double totalPrice, double volume) {
        Quotation quotation = Quotation.builder()
                .priceStage1(totalPrice*0.2)
                .priceStage2(totalPrice*0.3)
                .priceStage3(totalPrice*0.5)
                .volume(volume)
                .batch(QuotationBatch.STAGE_1)
                .paymentStatus(PaymentStatus.PENDING)
                .status(QuotationStatus.QUOTED)
                .build();
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

    public ConstructOrderDetailForStaffResponse detailOfOrder(String constructionOrderId) {
        ConstructionOrder order = this.findOrderById(constructionOrderId);
        Customer customer = this.findCustomerById(order.getCustomerId());
        return ConstructOrderDetailForStaffResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .customerRequest(order.getCustomerRequest())
                .status(order.getStatus())
                .build();
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
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .consultantName(this.getStaffName(order.getConsultantId()))
                .customerRequest(order.getCustomerRequest())
                .packageType(packages.getPackageType())
                .totalPrice(order.getTotal())
                .content(this.saveConstructionTasks(constructionOrderId, packages.getPackageId()))
                .build();
        return quotationMapper.toQuotationResponse(quotation, response);
    }
}
