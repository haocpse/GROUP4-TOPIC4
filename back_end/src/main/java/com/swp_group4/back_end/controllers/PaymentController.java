package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.requests.PaymentRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.PaymentResponse;
import com.swp_group4.back_end.services.PaymentService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.Map;

@RestController
@RequestMapping("/payment")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    // Tạo yêu cầu thanh toán (theo định dạng bạn yêu cầu)
    @PostMapping("/create")
    public ApiResponse<PaymentResponse> createPayment(@RequestBody PaymentRequest request) {
        return ApiResponse.<PaymentResponse>builder()
                .data(paymentService.createPayment(request).getData()) // Lấy data từ service trả về
                .build();
    }

    // Xử lý callback từ cổng thanh toán (theo định dạng bạn yêu cầu)
    @GetMapping("/return")
    public ApiResponse<String> handlePaymentReturn(@RequestParam Map<String, String> params) {
        return ApiResponse.<String>builder()
                .data(paymentService.handlePaymentReturn(params).getData()) // Lấy data từ service trả về
                .build();
    }
}
