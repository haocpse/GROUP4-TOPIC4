package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.requests.AssignTaskStaffRequest;
import com.swp_group4.back_end.requests.CompleteConstructTaskRequest;
import com.swp_group4.back_end.requests.DeadlineConstructionRequest;
import com.swp_group4.back_end.responses.*;
import com.swp_group4.back_end.services.ConstructionService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ConstructionController {

    @Autowired
    ConstructionService constructionService;

    @GetMapping("/staffs/{accountId}/tasks/{constructionOrderId}")
    public ApiResponse<ConstructionTasksAndStatusResponse> detailTask(@PathVariable String constructionOrderId, @PathVariable String accountId) {
        return ApiResponse.<ConstructionTasksAndStatusResponse>builder()
                .data(constructionService.detailOfConstruct(constructionOrderId))
                .build();
    }

    @GetMapping("/staffs/workers")
    public ApiResponse<List<StaffResponse>> listAllStaff(){
        return ApiResponse.<List<StaffResponse>>builder()
                .data(constructionService.listAllStaffHasNoRole())
                .build();
    }

    @PutMapping("/staffs/{accountId}/construction/{constructionOrderId}/worker")
    public ApiResponse<AssignConstructionTaskResponse> assignTask(@PathVariable String constructionOrderId, @RequestBody AssignTaskStaffRequest request, @PathVariable String accountId) {
        return ApiResponse.<AssignConstructionTaskResponse>builder()
                .data(constructionService.assignTask(constructionOrderId, request))
                .build();
    }

    @PutMapping("/staffs/{accountId}/construction/{constructionOrderId}/date")
    public ApiResponse<DeadlineConstructionResponse> deadline(@PathVariable String constructionOrderId, @RequestBody DeadlineConstructionRequest request, @PathVariable String accountId) {
        return ApiResponse.<DeadlineConstructionResponse>builder()
                .data(constructionService.deadline(constructionOrderId, request))
                .build();
    }

    @PutMapping("/staffs/{accountId}/construction/{constructionOrderId}/status")
    public ApiResponse<CompleteConstructionTaskResponse> completeTask(@PathVariable String constructionOrderId, @RequestBody CompleteConstructTaskRequest request, @PathVariable String accountId){
        return ApiResponse.<CompleteConstructionTaskResponse>builder()
                .data(constructionService.completeTask(constructionOrderId, request))
                .build();
    }


}
