package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.Design;
import com.swp_group4.back_end.requests.ManageReviewRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import com.swp_group4.back_end.responses.OverallReviewResponse;
import com.swp_group4.back_end.responses.StateTransitionResponse;
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
    public ApiResponse<List<OverallReviewResponse>> listAllQuotation(){
        return ApiResponse.<List<OverallReviewResponse>>builder()
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
    public ApiResponse<StateTransitionResponse> approveQuotation(@RequestBody ManageReviewRequest request){
        return ApiResponse.<StateTransitionResponse>builder()
                .data(quotationAndDesignApprovalService.manageQuotation(request))
                .build();
    }

    // Hàm để MANAGER xem toàn bộ các design trên hệ thống đang chờ phê duyệt
    // (Construction Order đang ở trạng thái DESIGNED)
    @GetMapping("/designs")
    public ApiResponse<List<OverallReviewResponse>> listAllDesign(){
        return ApiResponse.<List<OverallReviewResponse>>builder()
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
    public ApiResponse<StateTransitionResponse> approveDesign(@RequestBody ManageReviewRequest request){
        return ApiResponse.<StateTransitionResponse>builder()
                .data(quotationAndDesignApprovalService.manageDesign(request))
                .build();
    }

}
