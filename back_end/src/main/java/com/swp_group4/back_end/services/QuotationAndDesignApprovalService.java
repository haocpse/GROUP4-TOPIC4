package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.DesignStatus;
import com.swp_group4.back_end.enums.QuotationStatus;
import com.swp_group4.back_end.mapper.QuotationMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.ManageReviewRequest;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import com.swp_group4.back_end.responses.OverallReviewResponse;
import com.swp_group4.back_end.responses.StateTransitionResponse;
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
public class QuotationAndDesignApprovalService<T> {

    @Autowired
    QuotationRepository quotationRepository;
    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    QuotationMapper quotationMapper;
    @Autowired
    ConstructionTasksRepository constructionTasksRepository;
    @Autowired
    PackageConstructionRepository packageConstructionRepository;
    @Autowired
    PackageRepository packageRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    DesignRepository designRepository;

    public List<OverallReviewResponse<QuotationStatus>> listAllQuotation() {
        List<Quotation> quotations = quotationRepository.findByStatus(QuotationStatus.QUOTATION);
        List<OverallReviewResponse<QuotationStatus>> responses = new ArrayList<>();
        for (Quotation quotation : quotations) {
            String orderId = constructOrderRepository
                    .findByQuotationId(quotation.getQuotationId())
                    .getConstructionOrderId();
            ConstructionOrder order = constructOrderRepository.findById(orderId).orElseThrow(
                    () -> new RuntimeException("Order not found for id: " + orderId));
            Customer customer = customerRepository.findById(order.getCustomerId()).orElseThrow(
                    () -> new RuntimeException("Customer not found for id: " + order.getCustomerId()));
            OverallReviewResponse<QuotationStatus> response = OverallReviewResponse.<QuotationStatus>builder()
                    .constructionOrderId(order.getConstructionOrderId())
                    .id(quotation.getQuotationId())
                    .customerName(customer.getFirstname() + " " + customer.getLastname())
                    .phone(customer.getPhone())
                    .address(customer.getAddress())
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public List<OverallReviewResponse<DesignStatus>> listAllDesign() {
        List<Design> designs = designRepository.findByStatus(DesignStatus.DESIGNED);
        List<OverallReviewResponse<DesignStatus>> responses = new ArrayList<>();
        for (Design design : designs) {
            String orderId = constructOrderRepository
                    .findByQuotationId(design.getDesignId())
                    .getConstructionOrderId();
            ConstructionOrder order = constructOrderRepository.findById(orderId).orElseThrow(
                    () -> new RuntimeException("Order not found for id: " + orderId));
            Customer customer = customerRepository.findById(order.getCustomerId()).orElseThrow(
                    () -> new RuntimeException("Customer not found for id: " + order.getCustomerId()));
            OverallReviewResponse<DesignStatus>
                    response = OverallReviewResponse.<DesignStatus>builder()
                    .constructionOrderId(orderId)
                    .id(design.getDesignId())
                    .customerName(customer.getFirstname() + " " + customer.getLastname())
                    .phone(customer.getPhone())
                    .address(customer.getAddress())
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public ConstructQuotationResponse detailQuotation(String quotationId) {
        Quotation quotation = quotationRepository.findById(quotationId).orElseThrow(
                () -> new RuntimeException("Quotation not found"));
        ConstructionOrder order = constructOrderRepository.findByQuotationId(quotationId);
        List<ConstructionTasks> tasks = constructionTasksRepository.findByConstructionOrderId(order.getConstructionOrderId());
        List<String> contentTask = new ArrayList<>();
        for (ConstructionTasks task : tasks) {
            PackageConstruction packageConstruction = packageConstructionRepository.findById(task.getPackageConstructionId()).orElseThrow(
                    () -> new RuntimeException("Package construction not found"));
            contentTask.add(packageConstruction.getContent());
        }
        ConstructQuotationResponse response = ConstructQuotationResponse.builder()
                .packageType(packageRepository.findById(quotation.getPackageId()).orElseThrow(
                        () -> new RuntimeException("Error")).getPackageType())
                .content(contentTask)
                .totalPrice(order.getTotal())
                .build();
        quotationMapper.toQuotationResponse(quotation, response);
        return response;
    }

    public Design detailDesign(String designId) {
        return designRepository.findById(designId).orElseThrow(
                () -> new RuntimeException("Error"));
    }

    public StateTransitionResponse<QuotationStatus> manageQuotation(ManageReviewRequest request) {
        Quotation quotation = quotationRepository.findById(request.getId()).orElseThrow(
                () -> new RuntimeException("Quotation not found"));
        if (request.getStatus().name().equals("APPROVED")) {
            quotation.setStatus(QuotationStatus.CONFIRMED_QUOTATION);
            quotationRepository.save(quotation);
        }
        return StateTransitionResponse.<QuotationStatus>builder()
                .orderId(request.getId())
                .status(quotation.getStatus())
                .build();
    }

    public StateTransitionResponse<DesignStatus> manageDesign(ManageReviewRequest request) {
        Design design = designRepository.findById(request.getId()).orElseThrow(
                () -> new RuntimeException("Design not found"));
        if (request.getStatus().name().equals("APPROVED")) {
            design.setStatus(DesignStatus.CONFIRMED_DESIGN);
            designRepository.save(design);
        }
        return StateTransitionResponse.<DesignStatus>builder()
                .orderId(request.getId())
                .status(design.getStatus())
                .build();
    }

}
