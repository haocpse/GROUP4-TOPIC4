package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.PaymentOrder;
import com.swp_group4.back_end.requests.MaintenanceStaffAssignedRequest;
import com.swp_group4.back_end.requests.PaymentCreateRequest;
import com.swp_group4.back_end.requests.StaffAssignedRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConstructOrderDetailForManagerResponse;
import com.swp_group4.back_end.responses.MaintenanceOrderDetailForManagerResponse;
import com.swp_group4.back_end.responses.StaffResponse;
import com.swp_group4.back_end.services.MaintenanceOrderService;
import com.swp_group4.back_end.services.PaymentService;
import com.swp_group4.back_end.services.StaffService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/maintenance")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MaintenanceOrderController {
    @Autowired
    MaintenanceOrderService maintenanceOrderService;
    @Autowired
    StaffService staffService;
    @Autowired
    PaymentService paymentService;

    @PostMapping("/{orderId}")
    public ApiResponse<PaymentOrder> createPayment(@PathVariable String orderId,@RequestBody PaymentCreateRequest request){
        return ApiResponse.<PaymentOrder>builder()
                .data(paymentService.createPayment(request, orderId))
                .build();
    }

    //hàm để manager xem toàm bộ maintenance order
    @GetMapping()
    public ApiResponse<List<MaintenanceOrderDetailForManagerResponse>> listMaintenanceRequest() {
        return ApiResponse.<List<MaintenanceOrderDetailForManagerResponse>>builder()
                .data(maintenanceOrderService.listAllOrder())
                .build();
    }

    //hàm để manager xem toàn bộ staff có role: Constructor
    @GetMapping("/constructors")
    public ApiResponse<List<StaffResponse>> listConstructors() {
        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffService.listAllStaff("constructor"))
                .build();
    }

    @PutMapping()
    public ApiResponse<MaintenanceOrderDetailForManagerResponse> assignLeader(@RequestBody MaintenanceStaffAssignedRequest request) {
        return ApiResponse.<MaintenanceOrderDetailForManagerResponse>builder()
                .data(maintenanceOrderService.assignLeader(request))
                .build();
    }
}
