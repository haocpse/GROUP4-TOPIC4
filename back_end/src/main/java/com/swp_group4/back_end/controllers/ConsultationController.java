package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.Quotation;
import com.swp_group4.back_end.requests.QuotationDetailRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConsultConstructResponse;
import com.swp_group4.back_end.responses.QuotationResponse;
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
    public ApiResponse<List<ConsultConstructResponse>> listTask() {
        return ApiResponse.<List<ConsultConstructResponse>>builder()
                .data(consultationService.listOwnedTask())
                .build();
    }

    @GetMapping("/owned-tasks/{constructionOrderId}")
    public ApiResponse<ConsultConstructResponse> detailTask(@PathVariable String constructionOrderId) {
        return ApiResponse.<ConsultConstructResponse>builder()
                .data(consultationService.detailOfOrder(constructionOrderId))
                .build();
    }

    @PostMapping("/owned-tasks/{constructionOrderId}/export-quotation")
    public ApiResponse<QuotationResponse> exportQuotation(@PathVariable String constructionOrderId, @RequestBody QuotationDetailRequest request) {
        return ApiResponse.<QuotationResponse>builder()
                .data(consultationService.exportQuotation(constructionOrderId, request))
                .build();
    }


}
