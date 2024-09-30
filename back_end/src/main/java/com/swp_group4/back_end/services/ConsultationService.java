package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.ConstructStatus;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.enums.PaymentStatus;
import com.swp_group4.back_end.enums.QuotationBatch;
import com.swp_group4.back_end.mapper.QuotationMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.QuotationDetailRequest;
import com.swp_group4.back_end.responses.ConstructionOrderInStepResponse;
import com.swp_group4.back_end.responses.QuotationResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class ConsultationService {

    @Autowired
    StaffRepository staffRepository;
    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    QuotationMapper quotationMapper;
    @Autowired
    QuotationRepository quotationRepository;
    @Autowired
    ConstructionTasksRepository constructionTasksRepository;

    public List<ConstructionOrderInStepResponse> listOwnedConsultTask() {
        var context = SecurityContextHolder.getContext();
        String accountId = context.getAuthentication().getName();
        Staff staff = staffRepository.findByAccountId(accountId).orElseThrow(
                ()-> new RuntimeException("ACCOUNT DOES NOT EXIST"));
        List<ConstructionOrderStatus> statusList = List.of(ConstructionOrderStatus.CONSULTING,
                                                            ConstructionOrderStatus.QUOTATION);
        List<ConstructionOrder> orders = constructOrderRepository.findByConsultantAndStatusIn(staff.getStaffId(), statusList);
        return orders.stream()
                .map(order -> {
                    Customer customer = customerRepository.findById(order.getCustomerId())
                            .orElseThrow(() -> new RuntimeException("Customer not found for id: " + order.getCustomerId()));
                    return ConstructionOrderInStepResponse.builder()
                            .constructionOrderId(order.getConstructionOrderId())
                            .customerName(customer.getFirstname() + " " + customer.getLastname())
                            .startDate(order.getStartDate())
                            .phone(customer.getPhone())
                            .address(customer.getAddress())
                            .status(order.getStatus())
                            .build();
                })
                .toList();
    }

    private ConstructionOrderInStepResponse response (ConstructionOrder order) {
        Customer customer = customerRepository.findById(order.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found for id: " + order.getCustomerId()));
        return ConstructionOrderInStepResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .startDate(order.getStartDate())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .status(order.getStatus())
                .build();
    }

    public ConstructionOrderInStepResponse detailOfOrder(String constructionOrderId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow(
                () -> new RuntimeException("Order not found for id: " + constructionOrderId));
                return this.response(order);
    }

    public QuotationResponse exportQuotation(String constructionOrderId, QuotationDetailRequest request) {
        Quotation quotation = Quotation.builder()
                .batch(QuotationBatch.STAGE_1)
                .paymentStatus(PaymentStatus.PENDING)
                .build();
        quotationRepository.save(quotationMapper.toQuotation(request, quotation));
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow(
                () -> new RuntimeException("Order not found for id: " + constructionOrderId));
        order.setQuotationId(quotation.getQuotationId());
        order.setStatus(ConstructionOrderStatus.CONFIRMED_QUOTATION);
        order.setTotal(request.getTotalPrice());
        constructOrderRepository.save(order);
        QuotationResponse response = QuotationResponse.builder()
                .totalPrice(request.getTotalPrice())
                .packageConstructionId(request.getPackageConstructionId())
                .build();
        quotationMapper.toQuotationResponse(quotation, response);

        List<String> listPackageConstructionIds = response.getPackageConstructionId();

        for(String packConstructionId : listPackageConstructionIds) {
            ConstructionTasks tasks = ConstructionTasks.builder()
                    .constructionOrderId(constructionOrderId)
                    .packageConstructionId(packConstructionId)
                    .status(ConstructStatus.NOT_YET)
                    .build();
            constructionTasksRepository.save(tasks);
        }

        return response;
    }

}
