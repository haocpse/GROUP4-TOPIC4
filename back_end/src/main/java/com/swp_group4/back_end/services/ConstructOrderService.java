package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.Staff;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.mapper.ConstructionOrderMapper;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.CustomerRepository;
import com.swp_group4.back_end.repositories.StaffRepository;
import com.swp_group4.back_end.requests.ServiceRequest;
import com.swp_group4.back_end.requests.StaffAssignedRequest;
import com.swp_group4.back_end.responses.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ConstructOrderService {

    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    ConstructionOrderMapper constructionOrderMapper;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    CustomerRepository customerRepository;

    ServiceResponse<ConstructOrderResponse> contactUsForConstruction(ServiceRequest serviceRequest, ConstructionOrder constructionOrder) {
        ConstructOrderResponse response = new ConstructOrderResponse();
        constructionOrderMapper.constructOrderResponse(constructionOrder, response);
        return ServiceResponse.<ConstructOrderResponse>builder()
                .service(serviceRequest.getService())
                .data(response)
                .build();
    }

    public ConstructionOrder createOrder(ServiceRequest request, Customer customer) {
        ConstructionOrder constructionOrder = ConstructionOrder.builder()
                .customerId(customer.getCustomerId())
                .customerRequest(request.getCustomerRequest())
                .startDate(ZonedDateTime.now())
                .status(ConstructionOrderStatus.REQUESTED)
                .build();
        return constructOrderRepository.save(constructionOrder);
    }

    public List<ConstructionOrderInStepResponse> listAllOrderInStep(String step) {
        List<ConstructionOrderStatus> statusList = new ArrayList<>();
        if (step.equals("consult")){
            statusList.add(ConstructionOrderStatus.REQUESTED);
            statusList.add(ConstructionOrderStatus.CONSULTING);
            statusList.add(ConstructionOrderStatus.QUOTATION);
        } else if (step.equals("design")) {
            statusList.add(ConstructionOrderStatus.DESIGNING);
            statusList.add(ConstructionOrderStatus.DESIGNED);
        }
        List<ConstructionOrder> constructionOrdersInConsultStep = constructOrderRepository.findByStatusIn(statusList);
        return constructionOrdersInConsultStep.stream()
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

    public StateTransitionResponse assignStaff(StaffAssignedRequest request){
        Staff staff = staffRepository.findById(request.getStaffId())
                .orElseThrow(() -> new RuntimeException("Staff not found for id: " + request.getStaffId()));
        ConstructionOrder order = constructOrderRepository.findById(request.getConstructionOrderId())
                .orElseThrow(() -> new RuntimeException("ConstructionOrder not found for id: " + request.getConstructionOrderId()));
        if (order.getStatus().equals(ConstructionOrderStatus.CONFIRMED_QUOTATION)) {
            order.setDesignLeader(staff.getStaffId());
            order.setStatus(ConstructionOrderStatus.DESIGNING);
        } else if (order.getStatus().equals(ConstructionOrderStatus.CONFIRM_DESIGN)) {
            order.setConstructionLeader(staff.getStaffId());
        } else {
            order.setConsultant(staff.getStaffId());
            order.setStatus(ConstructionOrderStatus.CONSULTING);
        }
        constructOrderRepository.save(order);
        return StateTransitionResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .staffName(staff.getStaffName())
                .status(order.getStatus())
                .build();
    }

//    public ServiceResponse<MaintenanceOrderResponse> contactUsForMaintenance(ServiceRequest serviceRequest) {
//        // Your logic for maintenance service...
//    }
}
