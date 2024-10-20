package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.PaymentOrder;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.services.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/payments")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @GetMapping("/{accountId}")
    public ApiResponse<List<PaymentOrder>> getAllPayments(@PathVariable String accountId) {
        return ApiResponse.<List<PaymentOrder>>builder()
                .data(paymentService.listALl(accountId))
                .build();
    }

    @PostMapping("/vnpay")
    public ResponseEntity<ApiResponse<String>> createPayment(@RequestParam("amount") Optional<Long> amount, HttpServletRequest request) {
        if (amount.isEmpty() || amount.get() <= 0) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Invalid amount", null));
        }

        try {
            String paymentUrl = paymentService.createVnPayPayment(request);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Payment URL generated successfully", paymentUrl));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error generating payment URL: " + e.getMessage(), null));
        }
    }

    // Callback endpoint to handle VNPay response
    @GetMapping("/vnpayCallback")
    public ResponseEntity<ApiResponse<String>> vnPayCallback(HttpServletRequest request,@RequestParam Map<String, String> allParams) {
        try {
            log.info("VNPay callback received with params: {}", allParams);
            String vnpResponseCode = allParams.get("vnp_ResponseCode");
            if ("00".equals(vnpResponseCode)) {
                return ResponseEntity.ok(ApiResponse.<String>builder()
                        .code(1000)
                        .message("Payment successfully processed")
                        .build());
            } else {
                return ResponseEntity.ok(ApiResponse.<String>builder()
                        .code(2002)
                        .message("Payment failed or canceled")
                        .build());
            }
        } catch (Exception e) {
            log.error("Error in VNPay callback: {}", e.getMessage());
            return ResponseEntity.status(500).body(
                    ApiResponse.<String>builder()
                            .code(2003)
                            .message("Error processing VNPay callback")
                            .build()
            );
        }
    }

}
