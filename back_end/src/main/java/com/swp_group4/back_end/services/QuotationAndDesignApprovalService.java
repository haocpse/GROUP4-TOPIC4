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
import org.springframework.context.annotation.Lazy;
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
    DesignRepository designRepository;
    @Autowired
    DesignMapper designMapper;
    @Autowired
    ManageConstructionOrderService manageConstructionOrderService;
    @Autowired
    @Lazy
    CustomerService customerService;
    @Autowired
    @Lazy
    ConsultationService consultationService;
    @Autowired
    @Lazy
    StaffService staffService;
    @Autowired
    @Lazy
    ConstructionService constructionService;
    @Autowired
    @Lazy
    DesignService designService;

    public List<QuotationAndDesignReviewResponse<QuotationStatus>> listAllQuotation() {
        List<Quotation> quotations = quotationRepository.findByStatus(QuotationStatus.QUOTED);
        List<QuotationAndDesignReviewResponse<QuotationStatus>> responses = new ArrayList<>();
        for (Quotation quotation : quotations) {
            ConstructionOrder order = manageConstructionOrderService
                    .findConstructOrderByQuotationId(quotation.getQuotationId());
            Customer customer = customerService.findCustomer(order.getCustomerId());
            Packages packages = consultationService.findPackage(quotation.getPackageId());
            QuotationAndDesignReviewResponse<QuotationStatus> response = QuotationAndDesignReviewResponse.<QuotationStatus>builder()
                    .constructionOrderId(order.getConstructionOrderId())
                    .id(quotation.getQuotationId())
                    .customerName(customer.getFirstname() + " " + customer.getLastname())
                    .phone(customer.getPhone())
                    .address(customer.getAddress())
                    .leaderName(staffService.getStaffName(order.getConsultant()))
                    .packageType(packages.getPackageType())
                    .volume(quotation.getVolume())
                    .totalPrice(order.getTotal())
                    .status(QuotationStatus.QUOTED)
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public List<QuotationAndDesignReviewResponse<DesignStatus>> listAllDesign() {
        List<Design> Designs = designRepository.findByStatus(DesignStatus.DESIGNED);
        List<QuotationAndDesignReviewResponse<DesignStatus>> responses = new ArrayList<>();
        for (Design design : Designs) {
            ConstructionOrder order = manageConstructionOrderService
                    .findConstructOrderByQuotationId(design.getDesignId());
            Customer customer =  customerService.findCustomer(order.getCustomerId());
            Quotation quotation = consultationService.findQuotation(order.getQuotationId());
            Packages packages = consultationService.findPackage(quotation.getPackageId());
            QuotationAndDesignReviewResponse<DesignStatus> response = QuotationAndDesignReviewResponse.<DesignStatus>builder()
                    .constructionOrderId(order.getConstructionOrderId())
                    .id(design.getDesignId())
                    .customerName(customer.getFirstname() + " " + customer.getLastname())
                    .phone(customer.getPhone())
                    .address(customer.getAddress())
                    .leaderName(staffService.getStaffName(order.getDesignLeader()))
                    .packageType(packages.getPackageType())
                    .volume(quotation.getVolume())
                    .totalPrice(order.getTotal())
                    .status(DesignStatus.DESIGNED)
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public ConstructQuotationResponse detailQuotation(String quotationId) {
        Quotation quotation = consultationService.findQuotation(quotationId);
        ConstructionOrder order = manageConstructionOrderService.findConstructOrderByQuotationId(quotationId);
        Customer customer = customerService.findCustomer(order.getCustomerId());
        List<ConstructionTasks> tasks = constructionService.findConstructionTasks(order.getConstructionOrderId());
        ConstructQuotationResponse response = ConstructQuotationResponse.builder()
                .constructOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .consultantName(staffService.getStaffName(order.getConsultant()))
                .packageType(consultationService.findPackage(quotation.getPackageId()).getPackageType())
                .content(this.contentTasks(tasks))
                .totalPrice(order.getTotal())
                .customerRequest(order.getCustomerRequest())
                .build();
        quotationMapper.toQuotationResponse(quotation, response);
        return response;
    }

    public ConstructDesignResponse detailDesign(String designId) {
        Design design = designService.findDesign(designId);
        ConstructionOrder order = manageConstructionOrderService.findConstructOrderByDesignId(designId);
        Customer customer = customerService.findCustomer(order.getCustomerId());
        ConstructDesignResponse response = ConstructDesignResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .designName(staffService.getStaffName(order.getDesignLeader()))
                .customerRequest(order.getCustomerRequest())
                .build();
        designMapper.toDesignResponse(design, response);
        return response;
    }

    public ConstructOrderDetailForManagerResponse manageQuotation(ManageReviewRequest request, String quotationId) {
        Quotation quotation = consultationService.findQuotation(quotationId);
        ConstructionOrder order = manageConstructionOrderService.findConstructOrderByQuotationId(quotationId);
        if (request.getStatus().name().equals("APPROVED")) {
            quotation.setStatus(QuotationStatus.CONFIRMED_QUOTATION);
            quotationRepository.save(quotation);
            order.setStatus(ConstructionOrderStatus.CONFIRMED_QUOTATION);
            constructOrderRepository.save(order);
        }
        return this.buildConstructOrderDetailForManagerResponse(order);
    }

    public ConstructOrderDetailForManagerResponse manageDesign(ManageReviewRequest request, String designId) {
        Design design = designService.findDesign(designId);
        ConstructionOrder order = manageConstructionOrderService.findConstructOrderByDesignId(designId);
        if (request.getStatus().name().equals("APPROVED")) {
            design.setStatus(DesignStatus.CONFIRMED_DESIGN);
            designRepository.save(design);
            order.setStatus(ConstructionOrderStatus.CONFIRMED_DESIGN);
            constructOrderRepository.save(order);
        }
        return this.buildConstructOrderDetailForManagerResponse(order);
    }

    ConstructOrderDetailForManagerResponse buildConstructOrderDetailForManagerResponse(ConstructionOrder order) {
        return ConstructOrderDetailForManagerResponse.builder()
                .orderId(order.getConstructionOrderId())
                .orderStatus(order.getStatus())
                .build();
    }

    List<String> contentTasks(List<ConstructionTasks> tasks) {
        List<String> contentTasks = new ArrayList<>();
        for (ConstructionTasks task : tasks) {
            PackageConstruction packageConstruction = constructionService.findPackageConstruction(task.getPackageConstructionId());
            contentTasks.add(packageConstruction.getContent());
        }
        return contentTasks;
    }

}
