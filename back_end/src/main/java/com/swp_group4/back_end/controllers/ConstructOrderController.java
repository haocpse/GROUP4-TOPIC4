package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.requests.StaffAssignedRequest;
import com.swp_group4.back_end.responses.*;
import com.swp_group4.back_end.services.ConstructOrderService;
import com.swp_group4.back_end.services.StaffService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/manage")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ConstructOrderController {

    @Autowired
    ConstructOrderService constructOrderService;
    @Autowired
    StaffService staffService;

    // Hàm để MANAGER xem toàn bộ Construction Order đang ở các trạng thái
    // REQUESTED, CONSULTING, QUOTATION
    @GetMapping("/requests/consultation")
    public ApiResponse<List<ConstructionOrderInStepResponse>> listConsultationRequest() {
        return ApiResponse.<List<ConstructionOrderInStepResponse>>builder()
                .data(constructOrderService.listAllOrderInStep("consult"))
                .build();
    }

    // Hàm để MANAGER xem toàn bộ Construction Order đang ở các trạng thái
    // CONFIRMED_QUOTATION, DESIGNING, DESIGNED
    @GetMapping("/requests/design")
    public ApiResponse<List<ConstructionOrderInStepResponse>> listDesignRequest() {
        return ApiResponse.<List<ConstructionOrderInStepResponse>>builder()
                .data(constructOrderService.listAllOrderInStep("design"))
                .build();
    }

    // Hàm để MANAGER xem toàn bộ Construction Order đang ở các trạng thái
    // CONFIRMED_DESIGNED, CONSTRUCTING, CONSTRUCTED
    @GetMapping("/requests/construction")
    public ApiResponse<List<ConstructionOrderInStepResponse>> listConstructRequest() {
        return ApiResponse.<List<ConstructionOrderInStepResponse>>builder()
                .data(constructOrderService.listAllOrderInStep("construct"))
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
    @PostMapping("/assignStaff")
    public ApiResponse<StateTransitionResponse> assignStaff(@RequestBody StaffAssignedRequest request) {
        return ApiResponse.<StateTransitionResponse>builder()
                .data(constructOrderService.assignStaff(request))
                .build();
    }

}
