package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.requests.QuotationDetailRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import com.swp_group4.back_end.responses.ConstructionOrderInStepResponse;
import com.swp_group4.back_end.services.ConsultationService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consult")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ConsultationController {

    @Autowired
    ConsultationService consultationService;

    @GetMapping("/owned-tasks")
    public ApiResponse<List<ConstructionOrderInStepResponse>> listTask() {
        return ApiResponse.<List<ConstructionOrderInStepResponse>>builder()
                .data(consultationService.listOwnedConsultTask())
                .build();
    }

    @GetMapping("/owned-tasks/{constructionOrderId}")
    public ApiResponse<ConstructionOrderInStepResponse> detailTask(@PathVariable String constructionOrderId) {
        return ApiResponse.<ConstructionOrderInStepResponse>builder()
                .data(consultationService.detailOfOrder(constructionOrderId))
                .build();
    }

    @PostMapping("/owned-tasks/{constructionOrderId}/export-quotation")
    public ApiResponse<ConstructQuotationResponse> exportQuotation(@PathVariable String constructionOrderId, @RequestBody QuotationDetailRequest request) {
        return ApiResponse.<ConstructQuotationResponse>builder()
                .data(consultationService.exportQuotation(constructionOrderId, request))
                .build();
    }
}
