package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.Design;
import com.swp_group4.back_end.enums.DesignStatus;
import com.swp_group4.back_end.enums.QuotationStatus;
import com.swp_group4.back_end.requests.ManageReviewRequest;
import com.swp_group4.back_end.responses.*;
import com.swp_group4.back_end.services.QuotationAndDesignApprovalService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/manage")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuotationAndDesignApprovalController {

    @Autowired
    QuotationAndDesignApprovalService quotationAndDesignApprovalService;

    // Hàm để MANAGER xem toàn bộ các quotation trên hệ thống đang chờ phê duyệt
    // (Construction Order đang ở trạng thái QUOTATION)
    @GetMapping("/quotations")
    public ApiResponse<List<QuotationAndDesignReviewResponse>> listAllQuotation(){
        return ApiResponse.<List<QuotationAndDesignReviewResponse>>builder()
                .data(quotationAndDesignApprovalService.listAllQuotation())
                .build();
    }

    // Hàm để MANAGER xem chi tiết 1 quotation
    // (Construction Order đang ở trạng thái QUOTATION)
    @GetMapping("/quotations/{quotationId}")
    public ApiResponse<ConstructQuotationResponse> getQuotation(@PathVariable String quotationId){
        return ApiResponse.<ConstructQuotationResponse>builder()
                .data(quotationAndDesignApprovalService.detailQuotation(quotationId))
                .build();
    }

    // Hàm để MANAGER quyết định APPROVE hay không
    // (Nếu APPROVE Construction Order chuyển sang trạng thái CONFIRMED_QUOTATION)
    @PostMapping("/quotations/{quotationId}")
    public ApiResponse<ConstructOrderDetailForManagerResponse> approveQuotation(@RequestBody ManageReviewRequest request, @PathVariable String quotationId){
        return ApiResponse.<ConstructOrderDetailForManagerResponse>builder()
                .data(quotationAndDesignApprovalService.manageQuotation(request, quotationId))
                .build();
    }

    // Hàm để MANAGER xem toàn bộ các design trên hệ thống đang chờ phê duyệt
    // (Construction Order đang ở trạng thái DESIGNED)
    @GetMapping("/designs")
    public ApiResponse<List<QuotationAndDesignReviewResponse>> listAllDesign(){
        return ApiResponse.<List<QuotationAndDesignReviewResponse>>builder()
                .data(quotationAndDesignApprovalService.listAllDesign())
                .build();
    }

    // Hàm để MANAGER xem chi tiết 1 design
    // (Construction Order đang ở trạng thái DESIGNED)
    @GetMapping("/designs/{designId}")
    public ApiResponse<ConstructDesignResponse> getDesign(@PathVariable String designId){
        return ApiResponse.<ConstructDesignResponse>builder()
                .data(quotationAndDesignApprovalService.detailDesign(designId))
                .build();
    }

    // Hàm để MANAGER quyết định APPROVE hay không
    // (Nếu APPROVE Construction Order chuyển sang trạng thái CONFIRMED_DESIGN)
    @PostMapping("/designs/{designId}")
    public ApiResponse<ConstructOrderDetailForManagerResponse> approveDesign(@RequestBody ManageReviewRequest request, @PathVariable String designId){
        return ApiResponse.<ConstructOrderDetailForManagerResponse>builder()
                .data(quotationAndDesignApprovalService.manageDesign(request, designId))
                .build();
    }

}
