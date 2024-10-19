package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.requests.ServiceRequest;
import com.swp_group4.back_end.requests.UpdateInfoRequest;
import com.swp_group4.back_end.responses.*;
import com.swp_group4.back_end.services.CustomerService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
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

    @GetMapping("/myInfo/orders")
    public ApiResponse<List<ConstructOrderDetailForCustomerResponse>> getCustomerQuotation() {
        return ApiResponse.<List<ConstructOrderDetailForCustomerResponse>>builder()
                .data(customerService.listOrders())
                .build();
    }   

    @GetMapping("/myInfo/orders/{constructionOrderId}/quotation")
    public ApiResponse<ConstructQuotationResponse> CustomerViewQuotation(@PathVariable String constructionOrderId) {
        return ApiResponse.<ConstructQuotationResponse>builder()
                .data(customerService.viewQuotation(constructionOrderId))
                .build();
    }

    @GetMapping("/myInfo/orders/{constructionOrderId}/design")
    public ApiResponse<ConstructDesignResponse> CustomerViewDesign(@PathVariable String constructionOrderId) {
        return ApiResponse.<ConstructDesignResponse>builder()
                .data(customerService.viewDesign(constructionOrderId))
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
