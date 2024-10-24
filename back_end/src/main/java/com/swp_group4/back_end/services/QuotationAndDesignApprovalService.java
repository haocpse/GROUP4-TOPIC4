package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.*;
import com.swp_group4.back_end.mapper.*;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.ManageReviewRequest;
import com.swp_group4.back_end.responses.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class QuotationAndDesignApprovalService {

    @Autowired
    QuotationRepository quotationRepository;
    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    QuotationMapper quotationMapper;
    @Autowired
    DesignRepository designRepository;;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    PackageRepository packageRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    PackageConstructionRepository packageConstructionRepository;
    @Autowired
    ConstructionTasksRepository constructionTasksRepository;

    public List<QuotationAndDesignReviewResponse> listAllQuotation() {
        List<Quotation> quotations = quotationRepository.findByQuotationStatus(QuotationStatus.QUOTED);
        List<QuotationAndDesignReviewResponse> responses = new ArrayList<>();
        for (Quotation quotation : quotations) {
            ConstructionOrder order = this.findOrderByQuotationId(quotation.getQuotationId());
            Customer customer = this.findCustomerById(order.getCustomerId());
            Packages packages = this.findPackageById(quotation.getPackageId());
            QuotationAndDesignReviewResponse response = QuotationAndDesignReviewResponse.builder()
                    .constructionOrderId(order.getConstructionOrderId())
                    .id(quotation.getQuotationId())
                    .customerName(customer.getFirstName() + " " + customer.getLastName())
                    .phone(customer.getPhone())
                    .address(customer.getAddress())
                    .leaderName(this.getStaffName(order.getConsultantId()))
                    .packageType(packages.getPackageType())
                    .volume(quotation.getVolume())
                    .totalPrice(order.getTotal())
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public List<QuotationAndDesignReviewResponse> listAllDesign() {
        List<Design> designs = designRepository.findByDesignStatus(DesignStatus.DESIGNED);
        List<QuotationAndDesignReviewResponse> responses = new ArrayList<>();
        for (Design design : designs) {
            ConstructionOrder order = constructOrderRepository
                    .findByDesignId(design.getDesignId()).orElseThrow();
            Customer customer = customerRepository.findById(order.getCustomerId()).orElseThrow();
            QuotationAndDesignReviewResponse response = QuotationAndDesignReviewResponse.builder()
                    .constructionOrderId(order.getConstructionOrderId())
                    .id(design.getDesignId())
                    .customerName(customer.getFirstName() + " " + customer.getLastName())
                    .phone(customer.getPhone())
                    .address(customer.getAddress())
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public ConstructQuotationResponse detailQuotation(String quotationId) {
        Quotation quotation = this.findQuotationById(quotationId);
        ConstructionOrder order = this.findOrderByQuotationId(quotationId);
        Customer customer = this.findCustomerById(order.getCustomerId());
        List<ConstructionTasks> tasks = this.findConstructionTasks(order.getConstructionOrderId());
        ConstructQuotationResponse response = ConstructQuotationResponse.builder()
                .constructOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .consultantName(this.getStaffName(order.getConsultantId()))
                .packageType(this.findPackageById(quotation.getPackageId()).getPackageType())
                .content(this.contentTasks(tasks))
                .totalPrice(order.getTotal())
                .customerRequest(order.getCustomerRequest())
                .build();
        quotationMapper.toQuotationResponse(quotation, response);
        return response;
    }

    public ConstructDesignResponse detailDesign(String designId) {
        log.info(designId);
        Design design = designRepository.findById(designId).orElseThrow();
        ConstructionOrder order = constructOrderRepository.findByDesignId(designId).orElseThrow();
        Customer customer = customerRepository.findById(order.getCustomerId()).orElseThrow();
        return ConstructDesignResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .designName(this.getStaffName(order.getDesignerLeaderId()))
                .customerRequest(order.getCustomerRequest())
                .url2dDesign(design.getUrl2dDesign())
                .url3dDesign(design.getUrl3dDesign())
                .urlFrontDesign(design.getUrlFrontDesign())
                .urlBackDesign(design.getUrlBackDesign())
                .build();
    }

    public ConstructOrderDetailForManagerResponse manageQuotation(ManageReviewRequest request, String quotationId) {
        Quotation quotation = this.findQuotationById(quotationId);
        ConstructionOrder order = this.findOrderByQuotationId(quotationId);
        if (request.getStatus().name().equals("APPROVED")) {
            quotation.setQuotationStatus(QuotationStatus.CONFIRMED);
            quotationRepository.save(quotation);
        } else {
            quotation.setQuotationStatus(QuotationStatus.REJECTED);
            quotationRepository.save(quotation);
        }
        return this.buildConstructOrderDetailForManagerResponse(order);
    }

    public ConstructOrderDetailForManagerResponse manageDesign(ManageReviewRequest request, String designId) {
        Design design = designRepository.findById(designId).orElseThrow();
        ConstructionOrder order = constructOrderRepository.findByDesignId(designId).orElseThrow();
        if(request.getStatus().name().equals("APPROVED")) {
            design.setDesignStatus(DesignStatus.CONFIRMED);
            designRepository.save(design);
        } else {
            design.setDesignStatus(DesignStatus.REJECTED);
            designRepository.save(design);
        }
        return this.buildConstructOrderDetailForManagerResponse(order);
    }

    ConstructOrderDetailForManagerResponse buildConstructOrderDetailForManagerResponse(ConstructionOrder order) {
        return ConstructOrderDetailForManagerResponse.builder()
                .orderId(order.getConstructionOrderId())
                .status(order.getStatus())
                .build();
    }

    List<String> contentTasks(List<ConstructionTasks> tasks) {
        List<String> contentTasks = new ArrayList<>();
        for (ConstructionTasks task : tasks) {
            PackageConstruction packageConstruction = this.findPackageConstruction(task.getPackageConstructionId());
            contentTasks.add(packageConstruction.getContent());
        }
        return contentTasks;
    }

    PackageConstruction findPackageConstruction(String packageConstructionId) {
        return packageConstructionRepository.findById(packageConstructionId)
                .orElseThrow(() -> new RuntimeException("Package construction not found for id: " + packageConstructionId));
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

    ConstructionOrder findOrderByQuotationId(String quotationId){
        return constructOrderRepository.findByQuotationId(quotationId)
             ;
    }

    Customer findCustomerById(String customerId){
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    Packages findPackageById(String packageId){
        return packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found"));
    }

    Quotation findQuotationById(String quotationId){
        return quotationRepository.findById(quotationId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    List<ConstructionTasks> findConstructionTasks(String constructionOrderId) {
        return constructionTasksRepository.findByConstructionOrderId(constructionOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found for id: " + constructionOrderId));
    }

}
