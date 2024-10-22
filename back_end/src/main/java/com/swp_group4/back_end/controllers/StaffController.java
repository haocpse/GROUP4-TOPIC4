package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.Quotation;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.requests.ExportQuotationRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConstructOrderDetailForStaffResponse;
import com.swp_group4.back_end.responses.ImportantInfoOfOrderResponse;
import com.swp_group4.back_end.responses.StaffResponse;
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
}
