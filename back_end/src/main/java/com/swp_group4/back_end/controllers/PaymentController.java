package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.PaymentOrder;
import com.swp_group4.back_end.enums.PaymentStatus;
import com.swp_group4.back_end.requests.PaymentRequest;
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

    // Endpoint để tạo thanh toán
    @PostMapping("/create")
    public PaymentResponse createPayment(@RequestBody PaymentRequest request) {
        PaymentOrder paymentOrder = PaymentOrder.builder()
                .serviceId(request.getServiceId())
                .date(ZonedDateTime.now())
                .paymentMethods(request.getMethod())
                .total(request.getTotal())
                .status(PaymentStatus.PENDING)
                .build();

        switch (request.getMethod()) {
            case VNPAY:
                return paymentService.createVNPayPayment(paymentOrder);
            case MOMO:
                return paymentService.createMomoPayment(paymentOrder);
            default:
                return PaymentResponse.builder()
                        .paymentId(null)
                        .message("Unsupported payment method")
                        .success(false)
                        .build();
        }
    }

    // Endpoint để xử lý callback từ cổng thanh toán (VNPAY/MOMO)
    @GetMapping("/return")
    public String handlePaymentReturn(@RequestParam Map<String, String> params) {
        String paymentId = params.get("paymentId");
        // Xử lý kết quả thanh toán và cập nhật trạng thái của PaymentOrder
        boolean paymentSuccess = paymentService.processPaymentReturn(params);
        if (paymentSuccess) {
            return "Payment successful!";
        } else {
            return "Payment failed!";
        }
    }
}
