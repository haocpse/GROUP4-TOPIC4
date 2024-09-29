package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.Quotation;
import com.swp_group4.back_end.entities.Staff;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.enums.PaymentStatus;
import com.swp_group4.back_end.enums.QuotationBatch;
import com.swp_group4.back_end.mapper.QuotationMapper;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.CustomerRepository;
import com.swp_group4.back_end.repositories.QuotationRepository;
import com.swp_group4.back_end.repositories.StaffRepository;
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

    public List<ConstructionOrderInStepResponse> listOwnedConsultTask() {
        var context = SecurityContextHolder.getContext();
        String accountId = context.getAuthentication().getName();
        Staff consultant = staffRepository.findByAccountId(accountId).orElseThrow(
                ()-> new RuntimeException("ACCOUNT DOES NOT EXIST"));
        List<ConstructionOrderStatus> statusList = List.of(ConstructionOrderStatus.CONSULTING,
                                                            ConstructionOrderStatus.QUOTATION);
        List<ConstructionOrder> orders = constructOrderRepository.findByConsultantAndStatusIn(consultant.getStaffId(), statusList);
        return orders.stream()
                .map(this::response)
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
        Customer customer = customerRepository.findById(order.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found for id: " + order.getCustomerId()));;
                return ConstructionOrderInStepResponse.builder()
                        .constructionOrderId(order.getConstructionOrderId())
                        .customerName(customer.getFirstname() + " " + customer.getLastname())
                        .startDate(order.getStartDate())
                        .phone(customer.getPhone())
                        .address(customer.getAddress())
                        .status(order.getStatus())
                        .build();
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
        return quotationMapper.toQuotationResponse(quotation, response);
    }

}
