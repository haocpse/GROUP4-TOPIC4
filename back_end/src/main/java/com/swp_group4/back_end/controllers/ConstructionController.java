package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.requests.AssignTaskStaffRequest;
import com.swp_group4.back_end.requests.CompleteConstructTaskRequest;
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

    // Hàm để CONSTRUCTOR xem các task được MANAGER gán
    // (Construction Order đang ở trạng thái CONFIRMED_DESIGN)
    @GetMapping("/ownedTasks")
    public ApiResponse<List<ConstructionOrderInStepResponse>> listTask() {
        return ApiResponse.<List<ConstructionOrderInStepResponse>>builder()
                .data(constructionService.listOwnedConstructTask())
                .build();
    }

    // Hàm để CONSTRUCTOR xem chi tiết task
    // (Construction Order đang ở trạng thái CONFIRMED_DESIGN)
    @GetMapping("/ownedTasks/{constructionOrderId}")
    public ApiResponse<ConstructStepResponse> detailTask(@PathVariable String constructionOrderId) {
        return ApiResponse.<ConstructStepResponse>builder()
                .data(constructionService.detailOfConstruct(constructionOrderId))
                .build();
    }

    // Hàm để CONSTRUCTOR xem danh sách các construction staff
    // (Construction Order đang ở trạng thái CONFIRMED_DESIGN)
    @GetMapping("/ownedTasks/{constructionOrderId}/constructors")
    public ApiResponse<List<ConstructorStaffResponse>> listAllStaff(@PathVariable String constructionOrderId){
        return ApiResponse.<List<ConstructorStaffResponse>>builder()
                .data(constructionService.listAllStaff())
                .build();
    }

    // Hàm để CONSTRUCTOR gán task cho các staff
    // (Construction Order đang ở trạng thái CONSTRUCTING)
    @PostMapping("/ownedTasks/{constructionOrderId}/assignTask")
    public ApiResponse<AssignConstructionTaskResponse> assignTask(@PathVariable String constructionOrderId, @RequestBody AssignTaskStaffRequest request) {
        return ApiResponse.<AssignConstructionTaskResponse>builder()
                .data(constructionService.assignTask(constructionOrderId, request))
                .build();
    }

    // Hàm để CONSTRUCTOR xác nhận đã hoàn thành task
    // (Construction Order đang ở trạng thái CONSTRUCTING
    // nếu hoàn thành toàn bộ các task trạng thái của Construction Order sẽ chuyển sang CONSTRUCTED)
    @PostMapping("/ownedTasks/{constructionOrderId}/completeTask")
    public ApiResponse<CompleteConstructTaskResponse> completeTask(@PathVariable String constructionOrderId, @RequestBody CompleteConstructTaskRequest request){
        return ApiResponse.<CompleteConstructTaskResponse>builder()
                .data(constructionService.completeTask(constructionOrderId, request))
                .build();
    }


}
