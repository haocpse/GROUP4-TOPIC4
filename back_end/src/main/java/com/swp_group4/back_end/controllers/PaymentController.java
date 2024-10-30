package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.MaintenanceOrder;
import com.swp_group4.back_end.entities.PaymentOrder;
import com.swp_group4.back_end.enums.MaintenanceOrderStatus;
import com.swp_group4.back_end.enums.PaymentStatus;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.MaintenanceOrderRepository;
import com.swp_group4.back_end.repositories.PaymentOrderRepository;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.services.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    PaymentOrderRepository paymentOrderRepository;
    @Autowired
    private ConstructOrderRepository constructOrderRepository;
    @Autowired
    private MaintenanceOrderRepository maintenanceOrderRepository;

    //hàm liệt kê các payment
//    @GetMapping("/{accountId}")
//    public ApiResponse<List<PaymentOrder>> getAllPayments(@PathVariable String accountId) {
//        return ApiResponse.<List<PaymentOrder>>builder()
//                .data(paymentService.listALl(accountId))
//                .build();
//    }

    //hàm khi customer nhấn sẽ redirect sang trang VNPAY để thanh toán
    @PostMapping("/{paymentId}/vnpay")
    public ApiResponse<String> createPayment(@RequestParam("amount") Optional<Long> amount, HttpServletRequest request, @PathVariable String paymentId) {
        if (amount.isEmpty() || amount.get() <= 0) {
            return ApiResponse.<String>builder()
                    .code(99999)
                    .data("Error")
                    .build();
        }
        try {
            return ApiResponse.<String>builder()
                    .data(paymentService.createVnPayPayment(request, paymentId))
                    .build();
        } catch (Exception e) {
            return ApiResponse.<String>builder()
                    .code(99999)
                    .data(e.getMessage())
                    .build();
        }
    }

    //hàm callback lại web khi hoàn thành thanh toán
    @GetMapping("/vnpayCallback")
    public void vnPayCallback(HttpServletResponse response, @RequestParam Map<String, String> allParams) {
        try {
            log.info("VNPay callback received with params: {}", allParams);
            String vnpResponseCode = allParams.get("vnp_ResponseCode");
            String paymentId = allParams.get("vnp_TxnRef");
            String orderId = paymentService.findOrderId(paymentId);
            PaymentOrder paymentOrder = paymentOrderRepository.findById(paymentId).orElse(null);
            if ("00".equals(vnpResponseCode)) {
                assert paymentOrder != null;
                paymentOrder.setStatus(PaymentStatus.SUCCESS);
                paymentOrderRepository.save(paymentOrder);
                if(constructOrderRepository.findById(orderId).isPresent()) {
                    paymentService.successPaid(orderId);
                    response.sendRedirect("http://localhost:3000/myInfo/orders/" + orderId + "/payments");
                }
                else {
                    MaintenanceOrder order = maintenanceOrderRepository.findById(orderId).orElse(null);
                    order.setStatus(MaintenanceOrderStatus.FINISHED);
                    response.sendRedirect("http://localhost:3000/myInfo/orders/maintenance/" + orderId);
                }
            } else {
                assert paymentOrder != null;
                paymentOrder.setStatus(PaymentStatus.FAILED);
                paymentOrderRepository.save(paymentOrder);
                paymentService.reCreatePayment(paymentId);
                if(constructOrderRepository.findById(orderId).isPresent())
                    response.sendRedirect("http://localhost:3000/myInfo/orders/" + orderId + "/payments");
                else
                    response.sendRedirect("http://localhost:3000/myInfo/orders/maintenance/" + orderId);
            }
        } catch (Exception e) {
            log.error("Error in VNPay callback: {}", e.getMessage());
        }
    }

    //hàm khi customer nhấn sẽ redirect sang trang VNPAY để thanh toán
    @PostMapping("/maintenance/{paymentId}")
    public ApiResponse<String> createPaymentForMaintenance(@RequestParam("amount") Optional<Long> amount, HttpServletRequest request, @PathVariable String paymentId) {
        if (amount.isEmpty() || amount.get() <= 0) {
            return ApiResponse.<String>builder()
                    .code(99999)
                    .data("Error")
                    .build();
        }
        try {
            return ApiResponse.<String>builder()
                    .data(paymentService.createVnPayPayment(request, paymentId))
                    .build();
        } catch (Exception e) {
            return ApiResponse.<String>builder()
                    .code(99999)
                    .data(e.getMessage())
                    .build();
        }
    }

}
