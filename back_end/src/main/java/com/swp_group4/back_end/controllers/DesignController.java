package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.requests.QuotationDetailRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConstructionOrderInStepResponse;
import com.swp_group4.back_end.responses.QuotationResponse;
import com.swp_group4.back_end.services.DesignService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("/design")
public class DesignController {

    @Autowired
    DesignService designService;

    @GetMapping("/owned-tasks")
    public ApiResponse<List<ConstructionOrderInStepResponse>> listTask() {
        return ApiResponse.<List<ConstructionOrderInStepResponse>>builder()
                .data(designService.listOwnedDesignTask())
                .build();
    }

    @GetMapping("/owned-tasks/{constructionOrderId}")
    public ApiResponse<ConstructionOrderInStepResponse> detailTask(@PathVariable String constructionOrderId) {
        return ApiResponse.<ConstructionOrderInStepResponse>builder()
                .data(designService.detailOfOrder(constructionOrderId))
                .build();
    }

    @PostMapping("/owned-tasks/{constructionOrderId}/upload-design")
    public ApiResponse<QuotationResponse> exportQuotation(@PathVariable String constructionOrderId, @RequestBody UrlImgRequest request) {
        return ApiResponse.<QuotationResponse>builder()
                .data(designService.uploadDesign(constructionOrderId, request))
                .build();
    }


}
