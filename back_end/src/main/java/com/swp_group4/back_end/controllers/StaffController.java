package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConstructOrderDetailForStaffResponse;
import com.swp_group4.back_end.responses.StaffResponse;
import com.swp_group4.back_end.services.StaffService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class StaffController {

    @Autowired
    StaffService staffService;

    @GetMapping("/staff/{accountId}/tasks")
    public ApiResponse<List<ConstructOrderDetailForStaffResponse>> getTasks(@PathVariable String accountId) {
        return ApiResponse.<List<ConstructOrderDetailForStaffResponse>>builder()
                .data(staffService.getTasks(accountId))
                .build();
    }

    @GetMapping("/staff/consultants")
    public ApiResponse<List<StaffResponse>> listAllConsultant(){
        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffService.listAllStaff("consultant"))
                .build();
    }

    @GetMapping("/staff/designers")
    public ApiResponse<List<StaffResponse>> listAllDesigner(){
        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffService.listAllStaff("designer"))
                .build();
    }

    @GetMapping("/staff/constructors")
    public ApiResponse<List<StaffResponse>> listAllConstructor(){
        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffService.listAllStaff("constructor"))
                .build();
    }
}
