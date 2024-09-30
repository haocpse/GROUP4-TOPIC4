package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import com.swp_group4.back_end.services.ApprovalReviewService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
