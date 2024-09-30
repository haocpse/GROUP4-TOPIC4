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

    @GetMapping("/consultation-request")
    public ApiResponse<List<ConstructionOrderInStepResponse>> listConsultationRequest() {
        return ApiResponse.<List<ConstructionOrderInStepResponse>>builder()
                .data(constructOrderService.listAllOrderInStep("consult"))
                .build();
    }

    @GetMapping("/design-request")
    public ApiResponse<List<ConstructionOrderInStepResponse>> listDesignRequest() {
        return ApiResponse.<List<ConstructionOrderInStepResponse>>builder()
                .data(constructOrderService.listAllOrderInStep("design"))
                .build();
    }

    @GetMapping("/consultants")
    public ApiResponse<List<StaffResponse>> listAllConsultant(){
        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffService.listAllStaff("consultant"))
                .build();
    }

    @GetMapping("/designers")
    public ApiResponse<List<StaffResponse>> listAllDesigner(){
        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffService.listAllStaff("designer"))
                .build();
    }

    @PostMapping("/assign-consultant")
    public ApiResponse<StateTransitionResponse> assignConsultant(@RequestBody StaffAssignedRequest request) {
        return ApiResponse.<StateTransitionResponse>builder()
                .data(constructOrderService.assignStaff(request))
                .build();
    }

    @PostMapping("/assign-designer")
    public ApiResponse<StateTransitionResponse> assignDesigner(@RequestBody StaffAssignedRequest request) {
        return ApiResponse.<StateTransitionResponse>builder()
                .data(constructOrderService.assignStaff(request))
                .build();
    }
    @PostMapping("/assign-constructor")
    public ApiResponse<StateTransitionResponse> assignConstructor(@RequestBody StaffAssignedRequest request) {
        return ApiResponse.<StateTransitionResponse>builder()
                .data(constructOrderService.assignStaff(request))
                .build();
    }

}
