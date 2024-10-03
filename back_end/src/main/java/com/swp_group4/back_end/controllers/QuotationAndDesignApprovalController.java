package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.Design;
import com.swp_group4.back_end.enums.DesignStatus;
import com.swp_group4.back_end.enums.QuotationStatus;
import com.swp_group4.back_end.requests.ManageReviewRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import com.swp_group4.back_end.responses.OverallReviewResponse;
import com.swp_group4.back_end.responses.ConstructOrderStatusTransitionResponse;
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
    public ApiResponse<List<OverallReviewResponse<QuotationStatus>>> listAllQuotation(){
        return ApiResponse.<List<OverallReviewResponse<QuotationStatus>>>builder()
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
    @PostMapping("/quotations/manageQuotation")
    public ApiResponse<ConstructOrderStatusTransitionResponse<QuotationStatus>> approveQuotation(@RequestBody ManageReviewRequest request){
        return ApiResponse.<ConstructOrderStatusTransitionResponse<QuotationStatus>>builder()
                .data(quotationAndDesignApprovalService.manageQuotation(request))
                .build();
    }

    // Hàm để MANAGER xem toàn bộ các design trên hệ thống đang chờ phê duyệt
    // (Construction Order đang ở trạng thái DESIGNED)
    @GetMapping("/designs")
    public ApiResponse<List<OverallReviewResponse<DesignStatus>>> listAllDesign(){
        return ApiResponse.<List<OverallReviewResponse<DesignStatus>>>builder()
                .data(quotationAndDesignApprovalService.listAllDesign())
                .build();
    }

    // Hàm để MANAGER xem chi tiết 1 design
    // (Construction Order đang ở trạng thái DESIGNED)
    @GetMapping("/designs/{designId}")
    public ApiResponse<Design> getDesign(@PathVariable String designId){
        return ApiResponse.<Design>builder()
                .data(quotationAndDesignApprovalService.detailDesign(designId))
                .build();
    }

    // Hàm để MANAGER quyết định APPROVE hay không
    // (Nếu APPROVE Construction Order chuyển sang trạng thái CONFIRMED_DESIGN)
    @PostMapping("/designs/manageDesign")
    public ApiResponse<ConstructOrderStatusTransitionResponse<DesignStatus>> approveDesign(@RequestBody ManageReviewRequest request){
        return ApiResponse.<ConstructOrderStatusTransitionResponse<DesignStatus>>builder()
                .data(quotationAndDesignApprovalService.manageDesign(request))
                .build();
    }

}
