package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.Account;
import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.Staff;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.mapper.ConstructionOrderMapper;
import com.swp_group4.back_end.repositories.AccountRepository;
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
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    HelperService helperService;

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
            statusList.add(ConstructionOrderStatus.CONFIRMED_QUOTATION);
            statusList.add(ConstructionOrderStatus.DESIGNING);
            statusList.add(ConstructionOrderStatus.DESIGNED);
        } else {
            statusList.add(ConstructionOrderStatus.CONFIRM_DESIGN);
            statusList.add(ConstructionOrderStatus.CONSTRUCTING);
            statusList.add(ConstructionOrderStatus.CONSTRUCTED);
        }
        return helperService.orderInStepResponses(statusList, "onlyStatus");
    }

    public StateTransitionResponse assignStaff(StaffAssignedRequest request){
        Staff staff = staffRepository.findById(request.getStaffId())
                .orElseThrow(() -> new RuntimeException("Staff not found for id: " + request.getStaffId()));
        Account acc = accountRepository.findById(staff.getAccountId()).orElseThrow(
                () -> new RuntimeException("ERROR"));
        ConstructionOrder order = constructOrderRepository.findById(request.getConstructionOrderId())
                .orElseThrow(() -> new RuntimeException("ConstructionOrder not found for id: " + request.getConstructionOrderId()));
        if (acc.getRole().name().equals("CONSULTANT")) {
            order.setConsultant(staff.getStaffId());
            order.setStatus(ConstructionOrderStatus.CONSULTING);
        } else if (acc.getRole().name().equals("DESIGN")) {
            order.setDesignLeader(staff.getStaffId());
            order.setStatus(ConstructionOrderStatus.DESIGNING);
        } else {
            order.setConstructionLeader(staff.getStaffId());
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
