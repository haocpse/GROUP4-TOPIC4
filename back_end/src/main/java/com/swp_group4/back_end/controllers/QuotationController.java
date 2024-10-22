package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.Quotation;
import com.swp_group4.back_end.requests.ExportQuotationRequest;
import com.swp_group4.back_end.responses.*;
import com.swp_group4.back_end.services.QuotationService;
import com.swp_group4.back_end.services.PackageService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuotationController {

    @Autowired
    QuotationService quotationService;
    @Autowired
    PackageService packageService;

    @GetMapping("/staffs/{accountId}/quotations")
    public ApiResponse<List<OverviewQuotationResponse>> listQuotation(@PathVariable String accountId) {
        return ApiResponse.<List<OverviewQuotationResponse>>builder()
                .data(quotationService.listQuotation(accountId))
                .build();
    }

    @PostMapping("/constructionOrders/{constructionOrderId}/quotation")
    public ApiResponse<Quotation> exportQuotation(@PathVariable String constructionOrderId, @RequestBody ExportQuotationRequest request) {
        return ApiResponse.<Quotation>builder()
                .data(quotationService.exportQuotation(constructionOrderId, request))
                .build();
    }

    @GetMapping("/staffs/{accountId}/quotations/{constructionOrderId}")
    public ApiResponse<ConstructQuotationResponse> viewQuotation(@PathVariable String constructionOrderId, @PathVariable String accountId) {
        return ApiResponse.<ConstructQuotationResponse>builder()
                .data(quotationService.viewQuotation(constructionOrderId))
                .build();
    }

    @GetMapping("/packages")
    public ApiResponse<PackageDetailResponse> detailPackage() {
        return ApiResponse.<PackageDetailResponse>builder()
                .data(packageService.detailPackage())
                .build();
    }

    @GetMapping("/staffs/{accountId}/rejectedQuotations/{quotationId}")
    public ApiResponse<ViewRejectedQuotationResponse> viewRejectedQuotation(@PathVariable String quotationId, @PathVariable String accountId) {
        return ApiResponse.<ViewRejectedQuotationResponse>builder()
                .data(quotationService.viewRejectedQuotation(quotationId))
                .build();
    }

    @PutMapping("/staffs/{accountId}/rejectedQuotations/{quotationId}")
    public ApiResponse<Quotation> updateQuotation(@PathVariable String quotationId, @RequestBody ExportQuotationRequest request, @PathVariable String accountId) {
        return ApiResponse.<Quotation>builder()
                .data(quotationService.updateQuotation(quotationId, request))
                .build();
    }

}
