package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.responses.*;
import com.swp_group4.back_end.services.StaffService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class StaffController {

    @Autowired
    StaffService staffService;

    @GetMapping("/staffs/{accountId}/orders")
    public ApiResponse<List<ConstructOrderDetailForStaffResponse>> getTasks(@PathVariable String accountId) {
        return ApiResponse.<List<ConstructOrderDetailForStaffResponse>>builder()
                .data(staffService.getTasks(accountId))
                .build();
    }

    @GetMapping("/staffs/{accountId}/maintenanceOrders")
    public ApiResponse<List<MaintenanceOrderDetailForManagerResponse>> getMaintenanceOrders(@PathVariable String accountId) {
        return ApiResponse.<List<MaintenanceOrderDetailForManagerResponse>>builder()
                .data(staffService.getMaintenanceTask(accountId))
                .build();
    }

    @GetMapping("/informationCustomer/{constructionOrderId}")
    public ApiResponse<ImportantInfoOfOrderResponse> viewInfo(@PathVariable String constructionOrderId) {
        return ApiResponse.<ImportantInfoOfOrderResponse>builder()
                .data(staffService.viewInfoCustomer(constructionOrderId))
                .build();
    }

    @GetMapping("/staffs/consultants")
    public ApiResponse<List<StaffResponse>> listAllConsultant(){
        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffService.listAllStaff("consultant"))
                .build();
    }

    @GetMapping("/staffs/designers")
    public ApiResponse<List<StaffResponse>> listAllDesigner(){
        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffService.listAllStaff("designer"))
                .build();
    }

    @GetMapping("/staffs/constructors")
    public ApiResponse<List<StaffResponse>> listAllConstructor(){
        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffService.listAllStaff("constructor"))
                .build();
    }

    @GetMapping("/staffs")
    public ApiResponse<List<StaffResponse>> listAll(){
        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffService.listAllStaff(""))
                .build();
    }
}
