package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.Staff;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.CustomerRepository;
import com.swp_group4.back_end.repositories.StaffRepository;
import com.swp_group4.back_end.responses.ConstructionOrderInStepResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PACKAGE)
public class HelperService {

    @Autowired
    StaffRepository staffRepository;
    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    CustomerRepository customerRepository;

    List<ConstructionOrderInStepResponse> orderInStepResponses(List<ConstructionOrderStatus> orderStatuses, String note) {
        List<ConstructionOrder> orders;
        if (note.equals("statusAndStaffId")) {
            var context = SecurityContextHolder.getContext();
            String accountId = context.getAuthentication().getName();
            Staff staff = staffRepository.findByAccountId(accountId).orElseThrow(() -> new RuntimeException("ACCOUNT DOES NOT EXIST"));
            orders = constructOrderRepository.findByConstructionLeaderAndStatusIn(staff.getStaffId(), orderStatuses);
        } else {
            orders = constructOrderRepository.findByStatusIn(orderStatuses);
        }
        return orders.stream()
                .map(this::detailOfOrder)
                .toList();
    }

    ConstructionOrderInStepResponse detailOfOrder (ConstructionOrder order) {
        Customer customer = customerRepository.findById(order.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found for id: " + order.getCustomerId()));
        return ConstructionOrderInStepResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .status(order.getStatus())
                .build();
    }


}
