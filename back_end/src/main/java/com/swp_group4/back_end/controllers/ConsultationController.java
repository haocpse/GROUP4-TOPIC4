package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.Quotation;
import com.swp_group4.back_end.requests.ExportQuotationRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConstructOrderDetailForStaffResponse;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import com.swp_group4.back_end.responses.PackageDetailResponse;
import com.swp_group4.back_end.services.ConsultationService;
import com.swp_group4.back_end.services.PackageService;
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
    @Autowired
    PackageService packageService;

    // Hàm để CONSULTANT xem các task được Customer gán
    // (Construction Order đang ở trạng thái CONSULTING)
    @GetMapping("/ownedTasks")
    public ApiResponse<List<ConstructOrderDetailForStaffResponse>> listTask() {
        return ApiResponse.<List<ConstructOrderDetailForStaffResponse>>builder()
                .data(consultationService.listOwnedConsultTask())
                .build();
    }

    // Hàm để CONSULTANT xem chi tiết Construction Order
    // (Construction Order đang ở trạng thái CONSULTING)
    @GetMapping("/ownedTasks/{constructionOrderId}")
    public ApiResponse<ConstructOrderDetailForStaffResponse> detailTask(@PathVariable String constructionOrderId) {
        return ApiResponse.<ConstructOrderDetailForStaffResponse>builder()
                .data(consultationService.detailOfOrder(constructionOrderId))
                .build();
    }

    // Hàm để CONSULTANT xem chi các package và package price
    @GetMapping("/ownedTasks/{constructionOrderId}/packages")
    public ApiResponse<PackageDetailResponse> detailPackage(@PathVariable String constructionOrderId) {
        return ApiResponse.<PackageDetailResponse>builder()
                .data(packageService.detailPackage(constructionOrderId))
                .build();
    }

    // Hàm để CONSULTANT xuất 1 quotation
    // (Construction Order đang ở trạng thái QUOTATION)
    @PostMapping("/ownedTasks/{constructionOrderId}")
    public ApiResponse<Quotation> exportQuotation(@PathVariable String constructionOrderId, @RequestBody ExportQuotationRequest request) {
        return ApiResponse.<Quotation>builder()
                .data(consultationService.exportQuotation(constructionOrderId, request))
                .build();
    }

    @GetMapping("/ownedTasks/{constructionOrderId}/quotation")
    public ApiResponse<ConstructQuotationResponse> viewQuotation(@PathVariable String constructionOrderId) {
        return ApiResponse.<ConstructQuotationResponse>builder()
                .data(consultationService.viewQuotation(constructionOrderId))
                .build();
    }
}
