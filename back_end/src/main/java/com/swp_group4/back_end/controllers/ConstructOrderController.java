package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.requests.StaffAssignedRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConsultConstructResponse;
import com.swp_group4.back_end.responses.StaffResponse;
import com.swp_group4.back_end.responses.StateTransitionResponse;
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
    public ApiResponse<List<ConsultConstructResponse>> listConsultationRequest() {
        return ApiResponse.<List<ConsultConstructResponse>>builder()
                .data(constructOrderService.listAllConsult())
                .build();
    }

    @GetMapping("/consultants")
    public ApiResponse<List<StaffResponse>> listAllConsultant(){
        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffService.listAllConsultant())
                .build();
    }

    @PostMapping("/assign")
    public ApiResponse<StateTransitionResponse> assignConsultant(@RequestBody StaffAssignedRequest request) {
        return ApiResponse.<StateTransitionResponse>builder()
                .data(constructOrderService.assignConsultant(request))
                .build();
    }


}
