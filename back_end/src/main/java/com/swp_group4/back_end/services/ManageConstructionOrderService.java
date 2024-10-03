package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.mapper.ConstructionOrderMapper;
import com.swp_group4.back_end.mapper.CustomerMapper;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.CustomerRepository;
import com.swp_group4.back_end.requests.ServiceRequest;
import com.swp_group4.back_end.requests.StaffAssignedRequest;
import com.swp_group4.back_end.responses.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ManageConstructionOrderService {

    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    ConstructionOrderMapper constructionOrderMapper;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    CustomerMapper customerMapper;

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
            String orderId = constructionOrder.getConstructionOrderId();
            Customer customer = customerRepository.findById(constructOrderRepository.findById(orderId).orElseThrow(
                    () -> new RuntimeException("Can't find order")).getCustomerId()).orElseThrow(
                            () -> new RuntimeException("Can't find customer"));
            ConstructOrderDetailForManagerResponse response = ConstructOrderDetailForManagerResponse.builder()
                    .customerName(customer.getFirstname() + " " + customer.getLastname())
                    .build();
            customerMapper.toDetailForManager(customer, response);
            constructionOrderMapper.toDetailForManager(constructionOrder, response);
            responses.add(response);
        }
        return responses;
    }

    public ConstructOrderDetailForManagerResponse assignLeader(StaffAssignedRequest request){
        ConstructOrderDetailForManagerResponse response = new ConstructOrderDetailForManagerResponse();
        ConstructionOrder order = constructOrderRepository.findById(request.getConstructionOrderId())
                .orElseThrow(() -> new RuntimeException("Can't find order"));
        constructOrderRepository.save(constructionOrderMapper.toConstructionOrder(request, order));
        return constructionOrderMapper.toDetailForManager(order, response);
    }

//    public ServiceResponse<MaintenanceOrderResponse> contactUsForMaintenance(ServiceRequest serviceRequest) {
//        // Your logic for maintenance service...
//    }

    ServiceResponse<ConstructOrderResponse> contactUsForConstruction(ServiceRequest serviceRequest, ConstructionOrder constructionOrder) {
        ConstructOrderResponse response = new ConstructOrderResponse();
        constructionOrderMapper.constructOrderResponse(constructionOrder, response);
        return ServiceResponse.<ConstructOrderResponse>builder()
                .service(serviceRequest.getService())
                .data(response)
                .build();
    }
}
