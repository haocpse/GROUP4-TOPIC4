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
    DesignRepository designRepository;;
    @Autowired
    private DesignMapperImpl designMapperImpl;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private ConstructionTasksRepository constructionTasksRepository;

    public List<QuotationAndDesignReviewResponse> listAllQuotation() {
        List<Quotation> quotations = quotationRepository.findByStatus(QuotationStatus.QUOTED);
        List<QuotationAndDesignReviewResponse> responses = new ArrayList<>();
        for (Quotation quotation : quotations) {
            ConstructionOrder order = manageConstructionOrderService
                    .findConstructOrderByQuotationId(quotation.getQuotationId());
            Customer customer = customerService.findCustomer(order.getCustomerId());
            Packages packages = consultationService.findPackage(quotation.getPackageId());
            QuotationAndDesignReviewResponse response = QuotationAndDesignReviewResponse.builder()
                    .constructionOrderId(order.getConstructionOrderId())
                    .id(quotation.getQuotationId())
                    .customerName(customer.getFirstname() + " " + customer.getLastname())
                    .phone(customer.getPhone())
                    .address(customer.getAddress())
                    .leaderName(staffService.getStaffName(order.getConsultant()))
                    .packageType(packages.getPackageType())
                    .volume(quotation.getVolume())
                    .totalPrice(order.getTotal())
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public List<QuotationAndDesignReviewResponse> listAllDesign() {
        List<Design> designs = designRepository.findByStatus(DesignStatus.DESIGNED);
        List<QuotationAndDesignReviewResponse> responses = new ArrayList<>();
        for (Design design : designs) {
            ConstructionOrder order = constructOrderRepository
                    .findByDesignId(design.getDesignId()).orElseThrow();
            Customer customer = customerRepository.findById(order.getCustomerId()).orElseThrow();
            QuotationAndDesignReviewResponse response = QuotationAndDesignReviewResponse.builder()
                    .constructionOrderId(order.getConstructionOrderId())
                    .id(design.getDesignId())
                    .phone(customer.getPhone())
                    .address(customer.getAddress())
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
        Design design = designRepository.findById(designId).orElseThrow();
        ConstructionOrder order = constructOrderRepository.findById(designId).orElseThrow();
        Customer customer = customerRepository.findById(order.getCustomerId()).orElseThrow();
        ConstructDesignResponse response = ConstructDesignResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .designName(staffService.getStaffName(order.getDesignLeader()))
                .customerRequest(order.getCustomerRequest())
                .url2dDesign(design.getUrl2dDesign())
                .url3dDesign(design.getUrl3dDesign())
                .urlFrontDesign(design.getUrlFrontDesign())
                .urlBackDesign(design.getUrlBackDesign())
                .build();
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
        Design design = designRepository.findById(designId).orElseThrow();
        ConstructionOrder order = constructOrderRepository.findById(designId).orElseThrow();
        if(request.getStatus().name().equals("APPROVED")) {
            design.setStatus(DesignStatus.CONFIRMED_DESIGN);
            designRepository.save(design);
            order.setStatus(ConstructionOrderStatus.CONFIRMED_DESIGN);
            designRepository.save(design);
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
