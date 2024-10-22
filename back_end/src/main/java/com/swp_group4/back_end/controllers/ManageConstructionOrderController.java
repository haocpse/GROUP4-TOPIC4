package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.requests.ServiceRequest;
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

    // Hàm để MANAGER xem toàn bộ Construction Order
    @GetMapping()
    public ApiResponse<List<ConstructOrderDetailForManagerResponse>> listConsultationRequest() {
        return ApiResponse.<List<ConstructOrderDetailForManagerResponse>>builder()
                .data(manageConstructionOrderService.listAllOrder())
                .build();
    }

    // Hàm để MANAGER gán các leader cho từng giai đoạn của Construction Order
    @PutMapping()
    public ApiResponse<ConstructOrderDetailForManagerResponse> assignLeader(@RequestBody StaffAssignedRequest request) {
        return ApiResponse.<ConstructOrderDetailForManagerResponse>builder()
                .data(manageConstructionOrderService.assignLeader(request))
                .build();
    }

}
