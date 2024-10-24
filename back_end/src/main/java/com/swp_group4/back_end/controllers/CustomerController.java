package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.enums.DesignStatus;
import com.swp_group4.back_end.enums.QuotationStatus;
import com.swp_group4.back_end.requests.CustomerConfirmRequest;
import com.swp_group4.back_end.requests.FinishConstructRequest;
import com.swp_group4.back_end.requests.ServiceRequest;
import com.swp_group4.back_end.responses.*;
import com.swp_group4.back_end.services.CustomerService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class CustomerController {

    @Autowired
    CustomerService customerService;

    // Gọi hàm gửi request từ Customer
    @PostMapping("/contact")
    public ApiResponse<ServiceResponse<?>> contactUs(@RequestBody ServiceRequest request) {
        return ApiResponse.<ServiceResponse<?>>builder()
                .data(customerService.contactUs(request))
                .build();
    }

    @GetMapping("/customer/{accountId}/constructionOrders")
    public ApiResponse<List<ConstructOrderDetailForCustomerResponse>> getCustomerOrders(@PathVariable String accountId) {
        return ApiResponse.<List<ConstructOrderDetailForCustomerResponse>>builder()
                .data(customerService.listOrders(accountId))
                .build();
    }   

    @GetMapping("/customer/{accountId}/constructionOrders/{constructionOrderId}/quotation")
    public ApiResponse<ConstructQuotationResponse> CustomerViewQuotation(@PathVariable String accountId, @PathVariable String constructionOrderId) {
        return ApiResponse.<ConstructQuotationResponse>builder()
                .data(customerService.viewQuotation(accountId, constructionOrderId))
                .build();
    }

    @GetMapping("/customer/{accountId}/constructionOrders/{constructionOrderId}/design")
    public ApiResponse<ConstructDesignResponse> CustomerViewDesign(@PathVariable String constructionOrderId, @PathVariable String accountId) {
        return ApiResponse.<ConstructDesignResponse>builder()
                .data(customerService.viewDesign(constructionOrderId, accountId))
                .build();
    }

    @PutMapping("/customer/{accountId}/constructionOrders/{constructionOrderId}/design")
    public ApiResponse<StatusOfQuotationOrDesign<DesignStatus>> confirmDesign(@RequestBody CustomerConfirmRequest<DesignStatus> request, @PathVariable String constructionOrderId, @PathVariable String accountId) {
        return ApiResponse.<StatusOfQuotationOrDesign<DesignStatus>>builder()
                .data(customerService.confirmDesign(request, constructionOrderId, accountId))
                .build();
    }

    @PutMapping("/customer/{accountId}/constructionOrders/{constructionOrderId}/quotation")
    public ApiResponse<StatusOfQuotationOrDesign<QuotationStatus>> confirmQuotation(@RequestBody CustomerConfirmRequest<QuotationStatus> request, @PathVariable String constructionOrderId, @PathVariable String accountId) {
        return ApiResponse.<StatusOfQuotationOrDesign<QuotationStatus>>builder()
                .data(customerService.confirmQuotation(request, constructionOrderId, accountId))
                .build();
    }

    @GetMapping("/customer/{accountId}/constructionOrders/{constructionOrderId}/payments")
    public ApiResponse<CustomerViewPaymentResponse> viewPayment(@PathVariable String constructionOrderId, @PathVariable String accountId) {
        return ApiResponse.<CustomerViewPaymentResponse>builder()
                .data(customerService.viewPaymentConstruction(constructionOrderId, accountId))
                .build();
    }

    @GetMapping("/maintenanceOrders/{maintenanceOrderId}/payments")
    public ApiResponse<CustomerViewPaymentResponse> viewMaintenancePayment(@PathVariable String maintenanceOrderId) {
        return ApiResponse.<CustomerViewPaymentResponse>builder()
                .data(customerService.viewPayment(maintenanceOrderId))
                .build();
    }
    
    @GetMapping("/customer/{accountId}/constructionOrders/{constructionOrderId}/progress")
    public ApiResponse<CustomerViewProgressResponse> viewProgress(@PathVariable String constructionOrderId, @PathVariable String accountId) {
        return ApiResponse.<CustomerViewProgressResponse>builder()
                .data(customerService.viewProgress(constructionOrderId))
                .build();
    }

    @PutMapping("/customer/{accountId}/constructionOrders/{constructionOrderId}/progress")
    public ApiResponse<ConstructionOrderStatus> finishConstructOrder(@PathVariable String constructionOrderId, @RequestBody FinishConstructRequest request, @PathVariable String accountId) {
        return ApiResponse.<ConstructionOrderStatus>builder()
                .data(customerService.finishConstructOrder(constructionOrderId, request, accountId))
                .build();
    }

    // Hàm để Customer xem thông tin cá nhân
//    @GetMapping("/ownedInfo")
//    public ApiResponse<CustomerResponse> getOwnedInfo() {
//        return ApiResponse.<CustomerResponse>builder()
//                .data(customerService.getOwnedInfo())
//                .build();
//    }

    // Hàm để Customer thay đổi thông tin cá nhân
//    @PutMapping("/ownedInfo/update")
//    public ApiResponse<CustomerResponse> updateOwnedInfo(@RequestBody UpdateInfoRequest request) {
//        return ApiResponse.<CustomerResponse>builder()
//                .data(customerService.updateOwnedInfo(request))
//                .build();
//    }


}
