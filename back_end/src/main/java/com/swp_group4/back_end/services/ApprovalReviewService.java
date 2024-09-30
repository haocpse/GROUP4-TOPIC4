package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.mapper.QuotationMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import com.swp_group4.back_end.responses.OverallQuotationResponse;
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
public class ApprovalReviewService {

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

    public List<OverallQuotationResponse> listAllQuotation(){
        List<ConstructionOrder> orders = constructOrderRepository
                .findByStatus(ConstructionOrderStatus.QUOTATION);
        List<OverallQuotationResponse> responses = new ArrayList<>();
        for (ConstructionOrder order : orders) {
            Customer customer = customerRepository.findById(order.getCustomerId()).orElseThrow(
                    () -> new RuntimeException("Customer not found"));
            OverallQuotationResponse response = OverallQuotationResponse.builder()
                    .constructionOrderId(order.getConstructionOrderId())
                    .quotationId(order.getQuotationId())
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

    public StateTransitionResponse approveQuotation(String quotationId) {
        ConstructionOrder order = constructOrderRepository.findByQuotationId(quotationId);
        order.setStatus(ConstructionOrderStatus.CONFIRMED_QUOTATION);
        constructOrderRepository.save(order);
        return StateTransitionResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .status(order.getStatus())
                .build();
    }

    public StateTransitionResponse rejectQuotation(String quotationId) {
        ConstructionOrder order = constructOrderRepository.findByQuotationId(quotationId);
        order.setQuotationId(null);
        return StateTransitionResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .status(order.getStatus())
                .build();
    }
}
