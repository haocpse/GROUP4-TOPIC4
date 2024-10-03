package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.requests.StaffAssignedRequest;
import com.swp_group4.back_end.responses.*;
import com.swp_group4.back_end.services.ManageConstructionOrderService;
import com.swp_group4.back_end.services.StaffService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/manage/requests")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ManageConstructionOrderController {

    @Autowired
    ManageConstructionOrderService manageConstructionOrderService;
    @Autowired
    StaffService staffService;

    // Hàm để MANAGER xem toàn bộ Construction Order đang ở các trạng thái
    // REQUESTED, CONSULTING, QUOTATION
    @GetMapping()
    public ApiResponse<List<ConstructionOrderInStepResponse>> listConsultationRequest() {
        return ApiResponse.<List<ConstructionOrderInStepResponse>>builder()
                .data(manageConstructionOrderService.listAllOrder())
                .build();
    }

    // Hàm để MANAGER xem toàn bộ các staff có ROLE: CONSULTANT
    @GetMapping("/consultants")
    public ApiResponse<List<StaffResponse>> listAllConsultant(){
        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffService.listAllStaff("consultant"))
                .build();
    }

    // Hàm để MANAGER xem toàn bộ các staff có ROLE: DESIGNER
    @GetMapping("/designers")
    public ApiResponse<List<StaffResponse>> listAllDesigner(){
        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffService.listAllStaff("designer"))
                .build();
    }

    // Hàm để MANAGER xem toàn bộ các staff có ROLE: CONSTRUCTOR
    @GetMapping("/constructors")
    public ApiResponse<List<StaffResponse>> listAllConstructor(){
        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffService.listAllStaff("constructor"))
                .build();
    }

    // Hàm để MANAGER gán các leader cho từng giai đoạn của Construction Order
    @PostMapping("/assignConsultLeader")
    public ApiResponse<StateTransitionResponse<ConstructionOrderStatus>> assignConsultLeader(@RequestBody StaffAssignedRequest request) {
        return ApiResponse.<StateTransitionResponse<ConstructionOrderStatus>>builder()
                .data(manageConstructionOrderService.assignConsultLeader(request))
                .build();
    }

    @PostMapping("/assignDesignLeader")
    public ApiResponse<StateTransitionResponse<ConstructionOrderStatus>> assignDesignLeader(@RequestBody StaffAssignedRequest request) {
        return ApiResponse.<StateTransitionResponse<ConstructionOrderStatus>>builder()
                .data(manageConstructionOrderService.assignDesignLeader(request))
                .build();
    }

    @PostMapping("/assignConstructLeader")
    public ApiResponse<StateTransitionResponse<ConstructionOrderStatus>> assignConstructLeader(@RequestBody StaffAssignedRequest request) {
        return ApiResponse.<StateTransitionResponse<ConstructionOrderStatus>>builder()
                .data(manageConstructionOrderService.assignConstructLeader(request))
                .build();
    }

}
