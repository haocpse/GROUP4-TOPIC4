package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.mapper.*;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.requests.*;
import com.swp_group4.back_end.responses.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class ManageConstructionOrderService {

    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    ConstructionOrderMapper constructionOrderMapper;
    @Autowired
    CustomerMapper customerMapper;
    @Autowired
    @Lazy
    CustomerService customerService;
    @Autowired
    StaffService staffService;

    public ConstructionOrder createOrder(ServiceRequest request, Customer customer) {
        ConstructionOrder constructionOrder = ConstructionOrder.builder()
                .customerId(customer.getCustomerId())
                .customerRequest(request.getCustomerRequest())
                .status(ConstructionOrderStatus.REQUESTED)
                .build();
        return constructOrderRepository.save(constructionOrder);
    }

    public List<ConstructOrderDetailForManagerResponse> listAllOrder() {
        List<ConstructOrderDetailForManagerResponse> responses = new ArrayList<>();
        List<ConstructionOrder> constructionOrders = constructOrderRepository.findAll();
        for (ConstructionOrder constructionOrder : constructionOrders) {
            Customer customer = customerService.findCustomer(constructionOrder.getCustomerId());
            ConstructOrderDetailForManagerResponse response = this.buildConstructOrderDetailForManagerResponse(constructionOrder, customer);
            responses.add(response);
        }
        return responses;
    }

    public ConstructOrderDetailForManagerResponse assignLeader(StaffAssignedRequest request){
        ConstructionOrder order = this.findConstructOrder(request.getConstructionOrderId());
        Customer customer = customerService.findCustomer(order.getCustomerId());
        constructOrderRepository.save(constructionOrderMapper.toConstructionOrder(request, order));
        return this.buildConstructOrderDetailForManagerResponse(order, customer);
    }

    ConstructOrderDetailForManagerResponse buildConstructOrderDetailForManagerResponse(ConstructionOrder order, Customer customer) {
        String consultantName = staffService.getStaffName(order.getConsultant());
        String designLeaderName = staffService.getStaffName(order.getDesignLeader());
        String constructorLeaderName = staffService.getStaffName(order.getConstructionLeader());
        ConstructOrderDetailForManagerResponse response = ConstructOrderDetailForManagerResponse.builder()
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .consultantName(consultantName)
                .designLeaderName(designLeaderName)
                .constructorLeaderName(constructorLeaderName)
                .build();
        constructionOrderMapper.toDetailForManager(order, response);
        customerMapper.toDetailForManager(customer, response);
        return response;
    }

    ServiceResponse<ConstructOrderResponse> contactUsForConstruction(ServiceRequest serviceRequest, ConstructionOrder constructionOrder) {
        ConstructOrderResponse response = new ConstructOrderResponse();
        constructionOrderMapper.constructOrderResponse(constructionOrder, response);
        return ServiceResponse.<ConstructOrderResponse>builder()
                .service(serviceRequest.getService())
                .data(response)
                .build();
    }

    ConstructionOrder findConstructOrder(String constructionOrderId) {
        return constructOrderRepository.findById(constructionOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    ConstructionOrder findConstructOrderByQuotationId(String quotationId) {
        return constructOrderRepository.findByQuotationId(quotationId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    ConstructionOrder findConstructOrderByDesignId(String designId) {
        return constructOrderRepository.findByDesignId(designId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
    //    public ServiceResponse<MaintenanceOrderResponse> contactUsForMaintenance(ServiceRequest serviceRequest) {
    // Your logic for maintenance service...
    //    }

}
