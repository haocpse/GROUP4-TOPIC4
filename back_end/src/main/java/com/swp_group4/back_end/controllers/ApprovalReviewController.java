package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.Design;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import com.swp_group4.back_end.responses.OverallReviewResponse;
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
    public ApiResponse<List<OverallReviewResponse>> listAllQuotation(){
        return ApiResponse.<List<OverallReviewResponse>>builder()
                .data(approvalReviewService.listAllQuotation())
                .build();
    }

    @GetMapping("/review-quotation/{quotationId}")
    public ApiResponse<ConstructQuotationResponse> getQuotation(@PathVariable String quotationId){
        return ApiResponse.<ConstructQuotationResponse>builder()
                .data(approvalReviewService.detailQuotation(quotationId))
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

    @GetMapping("/review-design")
    public ApiResponse<List<OverallReviewResponse>> listAllDesign(){
        return ApiResponse.<List<OverallReviewResponse>>builder()
                .data(approvalReviewService.listAllDesign())
                .build();
    }

    @GetMapping("/review-design/{designId}")
    public ApiResponse<Design> getDesign(@PathVariable String designId){
        return ApiResponse.<Design>builder()
                .data(approvalReviewService.detailDesign(designId))
                .build();
    }

    @PostMapping("/approval/{designId}")
    public ApiResponse<StateTransitionResponse> approveDesign(@PathVariable String designId){
        return ApiResponse.<StateTransitionResponse>builder()
                .data(approvalReviewService.approveDesign(designId))
                .build();
    }

    @PostMapping("/reject/{designId}")
    public ApiResponse<StateTransitionResponse> rejectDesign(@PathVariable String designId){
        return ApiResponse.<StateTransitionResponse>builder()
                .data(approvalReviewService.rejectDesign(designId))
                .build();
    }

}
