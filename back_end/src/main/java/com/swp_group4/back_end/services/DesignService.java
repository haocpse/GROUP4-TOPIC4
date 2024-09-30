package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.Staff;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.CustomerRepository;
import com.swp_group4.back_end.repositories.StaffRepository;
import com.swp_group4.back_end.requests.UrlDesignRequest;
import com.swp_group4.back_end.responses.ConstructionOrderInStepResponse;
import com.swp_group4.back_end.responses.QuotationResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Service
public class DesignService {

    @Autowired
    StaffRepository staffRepository;
    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    CustomerRepository customerRepository;

    public List<ConstructionOrderInStepResponse> listOwnedDesignTask() {
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

//    public QuotationResponse uploadDesign(String constructionOrderId, UrlDesignRequest request) {
//    }
}
