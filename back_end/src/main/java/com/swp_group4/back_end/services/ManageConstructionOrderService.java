package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.mapper.ConstructionOrderMapper;
import com.swp_group4.back_end.mapper.CustomerMapper;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.CustomerRepository;
import com.swp_group4.back_end.repositories.StaffRepository;
import com.swp_group4.back_end.requests.ServiceRequest;
import com.swp_group4.back_end.requests.StaffAssignedRequest;
import com.swp_group4.back_end.responses.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
    CustomerRepository customerRepository;
    @Autowired
    CustomerMapper customerMapper;
    @Autowired
    private StaffRepository staffRepository;

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
            ConstructionOrder order = constructOrderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));
            Customer customer = customerRepository.findById(constructOrderRepository.findById(orderId).orElseThrow(
                    () -> new RuntimeException("Can't find order")).getCustomerId()).orElseThrow(
                            () -> new RuntimeException("Can't find customer"));
            log.info(order.toString());
            String consultantName = "";
            String designLeaderName = "";
            String constructorLeaderName = "";
            if (order.getConsultant()!=null && !order.getConsultant().isEmpty()) {
                consultantName = staffRepository.findById(order.getConsultant())
                        .orElseThrow(() -> new RuntimeException("Error")).getStaffName();
            }
            if (order.getDesignLeader()!=null && !order.getDesignLeader().isEmpty()) {
                designLeaderName = staffRepository.findById(order.getDesignLeader())
                        .orElseThrow(() -> new RuntimeException("Error")).getStaffName();
            }
            if (order.getConstructionLeader()!=null && !order.getConstructionLeader().isEmpty()) {
                constructorLeaderName = staffRepository.findById(order.getConstructionLeader())
                        .orElseThrow(() -> new RuntimeException("Error")).getStaffName();
            }
            ConstructOrderDetailForManagerResponse response = ConstructOrderDetailForManagerResponse.builder()
                    .orderId(orderId)
                    .customerName(customer.getFirstname() + " " + customer.getLastname())
                    .consultantName(consultantName)
                    .designLeaderName(designLeaderName)
                    .constructorLeaderName(constructorLeaderName)
                    .totalPrice(constructionOrder.getTotal())
                    .orderStatus(constructionOrder.getStatus())
                    .build();
            customerMapper.toDetailForManager(customer, response);
            constructionOrderMapper.toDetailForManager(constructionOrder, response);
            responses.add(response);
        }
        return responses;
    }

    public ConstructOrderDetailForManagerResponse assignLeader(StaffAssignedRequest request){
        ConstructionOrder order = constructOrderRepository.findById(request.getConstructionOrderId())
                .orElseThrow(() -> new RuntimeException("Can't find order"));
        constructOrderRepository.save(constructionOrderMapper.toConstructionOrder(request, order));
        log.info(order.toString());
        Customer customer = customerRepository.findById(order.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Can't find customer"));
        String consultantName = "";
        String designerLeader = "";
        String constructorLeader = "";
        if (order.getConsultant()!=null && !order.getConsultant().isEmpty()){
            consultantName = staffRepository.findById(order.getConsultant())
                    .orElseThrow(() -> new RuntimeException("Error")).getStaffName();
        }
        if (order.getDesignLeader()!=null && !order.getDesignLeader().isEmpty()) {
            designerLeader = staffRepository.findById(order.getDesignLeader())
                    .orElseThrow(() -> new RuntimeException("Error")).getStaffName();
        }
        if (order.getConstructionLeader()!=null && !order.getConstructionLeader().isEmpty()) {
            constructorLeader = staffRepository.findById(order.getConstructionLeader())
                    .orElseThrow(() -> new RuntimeException("Error")).getStaffName();
        }

        return ConstructOrderDetailForManagerResponse.builder()
                .orderId(order.getConstructionOrderId())
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .startDate(order.getStartDate())
                .endDate(order.getEndDate())
                .totalPrice(order.getTotal())
                .consultantName(consultantName)
                .designLeaderName(designerLeader)
                .constructorLeaderName(constructorLeader)
                .orderStatus(order.getStatus())
                .build();
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
