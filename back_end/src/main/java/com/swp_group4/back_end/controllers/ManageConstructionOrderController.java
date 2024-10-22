package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.requests.ManageReviewRequest;
import com.swp_group4.back_end.requests.ServiceRequest;
import com.swp_group4.back_end.requests.StaffAssignedRequest;
import com.swp_group4.back_end.responses.*;
import com.swp_group4.back_end.services.ManageConstructionOrderService;
import com.swp_group4.back_end.services.QuotationAndDesignApprovalService;
import com.swp_group4.back_end.services.StaffService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ManageConstructionOrderController {

    @Autowired
    ManageConstructionOrderService manageConstructionOrderService;
    @Autowired
    QuotationAndDesignApprovalService quotationAndDesignApprovalService;


    @GetMapping("/requests")
    public ApiResponse<List<ConstructOrderDetailForManagerResponse>> listAllOrders() {
        return ApiResponse.<List<ConstructOrderDetailForManagerResponse>>builder()
                .data(manageConstructionOrderService.listAllOrder())
                .build();
    }

    @PutMapping("/requests")
    public ApiResponse<ConstructOrderDetailForManagerResponse> assignLeader(@RequestBody StaffAssignedRequest request) {
        return ApiResponse.<ConstructOrderDetailForManagerResponse>builder()
                .data(manageConstructionOrderService.assignLeader(request))
                .build();
    }

    @GetMapping("/quotations")
    public ApiResponse<List<QuotationAndDesignReviewResponse>> listAllQuotation(){
        return ApiResponse.<List<QuotationAndDesignReviewResponse>>builder()
                .data(quotationAndDesignApprovalService.listAllQuotation())
                .build();
    }

    @GetMapping("/quotations/{quotationId}")
    public ApiResponse<ConstructQuotationResponse> getQuotation(@PathVariable String quotationId){
        return ApiResponse.<ConstructQuotationResponse>builder()
                .data(quotationAndDesignApprovalService.detailQuotation(quotationId))
                .build();
    }

    @PutMapping("/quotations/{quotationId}")
    public ApiResponse<ConstructOrderDetailForManagerResponse> approveQuotation(@RequestBody ManageReviewRequest request, @PathVariable String quotationId){
        return ApiResponse.<ConstructOrderDetailForManagerResponse>builder()
                .data(quotationAndDesignApprovalService.manageQuotation(request, quotationId))
                .build();
    }

    @GetMapping("/designs")
    public ApiResponse<List<QuotationAndDesignReviewResponse>> listAllDesign(){
        return ApiResponse.<List<QuotationAndDesignReviewResponse>>builder()
                .data(quotationAndDesignApprovalService.listAllDesign())
                .build();
    }

    @GetMapping("/designs/{designId}")
    public ApiResponse<ConstructDesignResponse> getDesign(@PathVariable String designId){
        return ApiResponse.<ConstructDesignResponse>builder()
                .data(quotationAndDesignApprovalService.detailDesign(designId))
                .build();
    }

    @PutMapping("/designs/{designId}")
    public ApiResponse<ConstructOrderDetailForManagerResponse> approveDesign(@RequestBody ManageReviewRequest request, @PathVariable String designId){
        return ApiResponse.<ConstructOrderDetailForManagerResponse>builder()
                .data(quotationAndDesignApprovalService.manageDesign(request, designId))
                .build();
    }

}
