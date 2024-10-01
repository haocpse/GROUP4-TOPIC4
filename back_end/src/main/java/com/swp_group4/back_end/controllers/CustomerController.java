package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.requests.ServiceRequest;
import com.swp_group4.back_end.requests.UpdateInfoRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.CustomerResponse;
import com.swp_group4.back_end.responses.ServiceResponse;
import com.swp_group4.back_end.services.CustomerService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerController {

    @Autowired
    CustomerService customerService;

    // Gọi hàm gửi request từ Customer (URL: localhost:8080/contact-us)
    @PostMapping("/contact-us")
    public ApiResponse<ServiceResponse<?>> contactUs(@RequestBody ServiceRequest request) {
        return ApiResponse.<ServiceResponse<?>>builder()
                .data(customerService.contactUs(request))
                .build();
    }

    @GetMapping("/owned-info")
    public ApiResponse<CustomerResponse> getOwnedInfo() {
        return ApiResponse.<CustomerResponse>builder()
                .data(customerService.getOwnedInfo())
                .build();
    }

    @PutMapping("/owned-info/update")
    public ApiResponse<CustomerResponse> updateOwnedInfo(@RequestBody UpdateInfoRequest request) {
        return ApiResponse.<CustomerResponse>builder()
                .data(customerService.updateOwnedInfo(request))
                .build();
    }


}
