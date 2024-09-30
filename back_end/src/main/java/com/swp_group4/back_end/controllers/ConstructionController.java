package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.requests.AssignTaskStaffRequest;
import com.swp_group4.back_end.responses.*;
import com.swp_group4.back_end.services.ConstructionService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/construct")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ConstructionController {

    @Autowired
    ConstructionService constructionService;

    @GetMapping("/owned-tasks")
    public ApiResponse<List<ConstructionOrderInStepResponse>> listTask() {
        return ApiResponse.<List<ConstructionOrderInStepResponse>>builder()
                .data(constructionService.listOwnedConstructTask())
                .build();
    }

    @GetMapping("/owned-tasks/{constructionOrderId}")
    public ApiResponse<ConstructStepResponse> detailTask(@PathVariable String constructionOrderId) {
        return ApiResponse.<ConstructStepResponse>builder()
                .data(constructionService.detailOfConstruct(constructionOrderId))
                .build();
    }

    @GetMapping("/owned-tasks/{constructionOrderId}/constructors")
    public ApiResponse<List<ConstructorStaffResponse>> listAllStaff(@PathVariable String constructionOrderId){
        return ApiResponse.<List<ConstructorStaffResponse>>builder()
                .data(constructionService.listAllStaff())
                .build();
    }

    @PostMapping("/owned-tasks/{constructionOrderId}/assign-task")
    public ApiResponse<AssignConstructionTaskResponse> assignTask(@PathVariable String constructionOrderId, @RequestBody AssignTaskStaffRequest request) {
        return ApiResponse.<AssignConstructionTaskResponse>builder()
                .data(constructionService.assignTask(constructionOrderId, request))
                .build();
    }

}
