package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.DesignStatus;
import com.swp_group4.back_end.mapper.*;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.UrlDesignRequest;
import com.swp_group4.back_end.responses.ConstructOrderDetailForStaffResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Service
public class DesignService {

    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    DesignRepository designRepository;
    @Autowired
    DesignMapper designMapper;
    @Autowired
    ConstructionOrderMapperImpl constructionOrderMapper;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    CustomerRepository customerRepository;


    public List<ConstructOrderDetailForStaffResponse> listOwnedDesignTask() {
        List<ConstructOrderDetailForStaffResponse> responses = new ArrayList<>();
        Staff staff = this.identifyStaff();
        List<ConstructionOrder> orders = constructOrderRepository.findByConsultant(staff.getStaffId());
        for (ConstructionOrder order : orders) {
            ConstructOrderDetailForStaffResponse response = this.detailOfOrder(order.getConstructionOrderId());
            response.setStaffName(staff.getStaffName());
            responses.add(response);
        }
        return responses;
    }

    public Design uploadDesign(String constructionOrderId, UrlDesignRequest request) {
        Design design = Design.builder()
                .status(DesignStatus.DESIGNED)
                .build();
        designRepository.save(designMapper.toDesgin(request, design));
        ConstructionOrder order = this.findOrderById(constructionOrderId);
        constructOrderRepository.save(constructionOrderMapper.toConstructionOrder(design, order));
        return design;
    }

    public ConstructOrderDetailForStaffResponse detailOfOrder(String constructionOrderId) {
        ConstructionOrder order = this.findOrderById(constructionOrderId);
        Customer customer = this.findCustomerById(order.getCustomerId());
        return ConstructOrderDetailForStaffResponse.builder()
                .constructOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .customerRequest(order.getCustomerRequest())
                .build();
    }

    Staff identifyStaff() {
        var context = SecurityContextHolder.getContext();
        String accountId = context.getAuthentication().getName();
        return staffRepository.findByAccountId(accountId)
                .orElseThrow(() -> new RuntimeException("Error"));
    }

    ConstructionOrder findOrderById(String orderId){
        return constructOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    Customer findCustomerById(String customerId){
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

}
