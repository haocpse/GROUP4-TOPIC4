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
import org.springframework.context.annotation.Lazy;
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
    @Lazy
    StaffService staffService;
    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    ManageConstructionOrderService manageConstructionOrderService;
    @Autowired
    @Lazy
    CustomerService customerService;

    public List<ConstructOrderDetailForStaffResponse> listOwnedConsultTask() {
        return staffService.listOwnedStaffTask();
    }

    public ConstructOrderDetailForStaffResponse detailOfOrder(String constructionOrderId) {
        Staff staff = staffService.identifyStaff();
        return staffService.detailOfOrder(constructionOrderId, staff.getStaffName());
    }

    public ConstructQuotationResponse exportQuotation(String constructionOrderId, ExportQuotationRequest request) {
        Packages packages = this.findPackage(request.getPackageId());
        PackagePrice packagePrice = this.findPackagePrice(packages.getPackageId(), request.getVolume(), request.getVolume());
        List<String> listPackageConstructionId = request.getPackageConstructionId();
        double totalPrice = this.totalPrice(request.getVolume(), packagePrice.getPrice(), listPackageConstructionId);
        ConstructionOrder order = manageConstructionOrderService.findConstructOrder(constructionOrderId);
        Quotation quotation =  quotationRepository.save(this.saveQuotation(request));
        constructOrderRepository
                .save(this.saveConstructionOrder(order, quotation, request, totalPrice));
        Customer customer = customerService.findCustomer(order.getCustomerId());
        ConstructQuotationResponse response = ConstructQuotationResponse.builder()
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .consultantName(staffService.getStaffName(order.getConsultant()))
                .customerRequest(order.getCustomerRequest())
                .packageType(packages.getPackageType())
                .totalPrice(totalPrice)
                .content(this.saveConstructionTasks(constructionOrderId, listPackageConstructionId))
                .build();
        return quotationMapper.toQuotationResponse(quotation, response);
    }

    Quotation findQuotation(String quotationId){
        return quotationRepository.findById(quotationId)
                .orElseThrow(() -> new RuntimeException("Quotation not found"));
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

    double totalPrice(double volume, double packagePrice, List<String> listPackageConstructionId){
        double totalPrice = packagePrice * volume;
        for (String packageConstructionId : listPackageConstructionId){
            PackageConstruction packageConstruction = this.findPackageConstruction(packageConstructionId);
            totalPrice += packageConstruction.getPrice();
        }
        return totalPrice;
    }

    List<String> saveConstructionTasks(String constructionOrderId, List<String> packageConstructionIds) {
        List<String> contentTasks = new ArrayList<>();
        for (String packageConstructionId : packageConstructionIds) {
            ConstructionTasks task = ConstructionTasks.builder()
                    .constructionOrderId(constructionOrderId)
                    .packageConstructionId(packageConstructionId)
                    .status(ConstructStatus.NOT_YET)
                    .build();
            constructionTasksRepository.save(task);
            contentTasks.add(findPackageConstruction
                    (packageConstructionId).getContent());
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

    Quotation saveQuotation(ExportQuotationRequest request){
        Quotation quotation = Quotation.builder()
                .batch(QuotationBatch.STAGE_1)
                .paymentStatus(PaymentStatus.PENDING)
                .status(QuotationStatus.QUOTED)
                .build();
        quotationMapper.toQuotation(request, quotation);
        return quotation;
    }

}
