package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.Staff;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.exception.AppException;
import com.swp_group4.back_end.exception.ErrorCode;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.CustomerRepository;
import com.swp_group4.back_end.repositories.StaffRepository;
import com.swp_group4.back_end.requests.StaffAssignedRequest;
import com.swp_group4.back_end.responses.ConstructOrderStatusTransitionResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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

    List<ConstructOrderStatusTransitionResponse<ConstructionOrderStatus>> listAllOrder() {
        List<ConstructionOrder> orders = constructOrderRepository.findAll();
        return orders.stream()
                .map(this::detailOfOrder)
                .toList();
    }

    List<ConstructOrderStatusTransitionResponse<ConstructionOrderStatus>> orderInStepResponses(List<ConstructionOrderStatus> orderStatuses) {
        List<ConstructionOrder> orders;
        var context = SecurityContextHolder.getContext();
        String accountId = context.getAuthentication().getName();
        Staff staff = staffRepository.findByAccountId(accountId).orElseThrow(() -> new RuntimeException("ACCOUNT DOES NOT EXIST"));
        orders = constructOrderRepository.findByConstructionLeaderAndStatusIn(staff.getStaffId(), orderStatuses);
        return orders.stream()
                .map(this::detailOfOrder)
                .toList();
    }

    ConstructOrderStatusTransitionResponse<ConstructionOrderStatus> detailOfOrder (ConstructionOrder order) {
        Customer customer = customerRepository.findById(order.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found for id: " + order.getCustomerId()));
        return ConstructOrderStatusTransitionResponse.<ConstructionOrderStatus>builder()
                .orderId(order.getConstructionOrderId())
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .status(order.getStatus())
                .build();
    }

    Customer identifyCustomer() {
        var context = SecurityContextHolder.getContext();
        String accountId = context.getAuthentication().getName();
        return customerRepository.findByAccountId(accountId).orElseThrow(()
                -> new AppException(ErrorCode.USER_NOT_EXIST));
    }

    ConstructionOrder findOrder(StaffAssignedRequest request){
        return constructOrderRepository.findById(request.getConstructionOrderId())
                        .orElseThrow(() -> new RuntimeException("ConstructionOrder not found for id: " + request.getConstructionOrderId()));
    }

//    ConstructOrderStatusTransitionResponse<ConstructionOrderStatus> response(OrderAndStaff helOrderAndStaff){
//        return ConstructOrderStatusTransitionResponse.<ConstructionOrderStatus>builder()
//                .orderId(helOrderAndStaff.getOrder().getConstructionOrderId())
//                .(helOrderAndStaff.getStaff().getStaffName())
//                .status(helOrderAndStaff.getOrder().getStatus())
//                .build();
//    }


}
