package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import com.swp_group4.back_end.responses.StateTransitionResponse;
import com.swp_group4.back_end.services.ApprovalReviewService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/manage")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApprovalReviewController {

    @Autowired
    ApprovalReviewService approvalReviewService;

    @GetMapping("/review-quotation")
    public ApiResponse<List<ConstructQuotationResponse>> listAllQuotation(){
        return ApiResponse.<List<ConstructQuotationResponse>>builder()
                .data(approvalReviewService.listAllQuotation())
                .build();
    }

    @PostMapping("/approval/{quotationId}")
    public ApiResponse<StateTransitionResponse> approveQuotation(@PathVariable String quotationId){
        return ApiResponse.<StateTransitionResponse>builder()
                .data(approvalReviewService.approveQuotation(quotationId))
                .build();
    }

    @PostMapping("/reject/{quotationId}")
    public ApiResponse<StateTransitionResponse> rejectQuotation(@PathVariable String quotationId){
        return ApiResponse.<StateTransitionResponse>builder()
                .data(approvalReviewService.rejectQuotation(quotationId))
                .build();
    }

}
