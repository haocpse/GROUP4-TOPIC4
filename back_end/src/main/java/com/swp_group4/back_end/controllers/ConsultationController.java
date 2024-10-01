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

    // Hàm để CONSULTANT xem các task được Customer gán
    // (Construction Order đang ở trạng thái CONSULTING)
    @GetMapping("/ownedTasks")
    public ApiResponse<List<ConstructionOrderInStepResponse>> listTask() {
        return ApiResponse.<List<ConstructionOrderInStepResponse>>builder()
                .data(consultationService.listOwnedConsultTask())
                .build();
    }

    // Hàm để CONSULTANT xem chi tiết Construction Order
    // (Construction Order đang ở trạng thái CONSULTING)
    @GetMapping("/ownedTasks/{constructionOrderId}")
    public ApiResponse<ConstructionOrderInStepResponse> detailTask(@PathVariable String constructionOrderId) {
        return ApiResponse.<ConstructionOrderInStepResponse>builder()
                .data(consultationService.detailOfOrder(constructionOrderId))
                .build();
    }

    // Hàm để CONSULTANT xuất 1 quotation
    // (Construction Order đang ở trạng thái QUOTATION)
    @PostMapping("/ownedTasks/{constructionOrderId}/exportQuotation")
    public ApiResponse<ConstructQuotationResponse> exportQuotation(@PathVariable String constructionOrderId, @RequestBody QuotationDetailRequest request) {
        return ApiResponse.<ConstructQuotationResponse>builder()
                .data(consultationService.exportQuotation(constructionOrderId, request))
                .build();
    }
}
