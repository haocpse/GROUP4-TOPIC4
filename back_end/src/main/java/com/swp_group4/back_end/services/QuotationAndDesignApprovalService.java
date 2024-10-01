package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.mapper.QuotationMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.ManageReviewRequest;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import com.swp_group4.back_end.responses.OverallReviewResponse;
import com.swp_group4.back_end.responses.StateTransitionResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuotationAndDesignApprovalService {

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

    public List<OverallReviewResponse> listAllQuotation(){
        return responseList(ConstructionOrderStatus.QUOTATION);
    }

    public List<OverallReviewResponse> listAllDesign() {
        return responseList(ConstructionOrderStatus.DESIGNED);
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

    public StateTransitionResponse manageQuotation(ManageReviewRequest request) {
        ConstructionOrder order = constructOrderRepository.findByQuotationId(request.getId());
        if (request.getStatus().name().equals("APPROVED")) {
            order.setStatus(ConstructionOrderStatus.CONFIRMED_QUOTATION);
        } else {
            order.setQuotationId(null);
        }
        constructOrderRepository.save(order);
        return response(order.getConstructionOrderId(), order.getStatus());
    }

    public StateTransitionResponse manageDesign(ManageReviewRequest request) {
        ConstructionOrder order = constructOrderRepository.findByDesignId(request.getId());
        if (request.getStatus().name().equals("APPROVED")) {
            order.setStatus(ConstructionOrderStatus.CONFIRM_DESIGN);
        } else {
            order.setDesignId(null);
        }
        constructOrderRepository.save(order);
        return response(order.getConstructionOrderId(), order.getStatus());
    }

    List<ConstructionOrder> constructionOrders (ConstructionOrderStatus status) {
        return constructOrderRepository.findByStatus(status);
    }

    List<OverallReviewResponse> responseList (ConstructionOrderStatus status){
        List<ConstructionOrder> orders = constructionOrders(status);
        List<OverallReviewResponse> responses = new ArrayList<>();
        for (ConstructionOrder order : orders) {
            Customer customer = customerRepository.findById(order.getCustomerId()).orElseThrow(
                    () -> new RuntimeException("Customer not found"));
            OverallReviewResponse response = OverallReviewResponse.builder()
                    .constructionOrderId(order.getConstructionOrderId())
                    .id(order.getQuotationId())
                    .customerName(customer.getFirstname() + " " + customer.getLastname())
                    .phone(customer.getPhone())
                    .address(customer.getAddress())
                    .build();
            responses.add(response);
        }
        return responses;
    }

    StateTransitionResponse response (String id, ConstructionOrderStatus status) {
        return StateTransitionResponse.builder()
                .constructionOrderId(id)
                .status(status)
                .build();
    }

}
