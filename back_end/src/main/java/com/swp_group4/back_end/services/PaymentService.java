package com.swp_group4.back_end.services;

import com.swp_group4.back_end.configuration.VNPAYConfig;
import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.MaintenanceOrder;
import com.swp_group4.back_end.entities.PaymentOrder;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.enums.MaintenanceOrderStatus;
import com.swp_group4.back_end.enums.PaymentMethods;
import com.swp_group4.back_end.enums.PaymentStatus;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.MaintenanceOrderRepository;
import com.swp_group4.back_end.repositories.PaymentOrderRepository;
import com.swp_group4.back_end.requests.PaymentCreateRequest;
import com.swp_group4.back_end.util.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class PaymentService {

    @Autowired
    PaymentOrderRepository paymentOrderRepository;
    private final VNPAYConfig vnPayConfig;
    @Autowired
    private ConstructOrderRepository constructOrderRepository;
    @Autowired
    private MaintenanceOrderRepository maintenanceOrderRepository;

    public void reCreatePayment(String paymentId){
        PaymentOrder paymentOrder = paymentOrderRepository.findById(paymentId).orElse(null);
        assert paymentOrder != null;
        PaymentOrder paymentOrder1 = PaymentOrder.builder()
                .orderId(paymentOrder.getOrderId())
                .customerId(paymentOrder.getCustomerId())
                .paymentMethods(PaymentMethods.VNPAY)
                .total(paymentOrder.getTotal())
                .status(PaymentStatus.PENDING)
                .build();
        paymentOrderRepository.save(paymentOrder1);
    }

    public PaymentOrder createPayment(PaymentCreateRequest request, String orderId){
        MaintenanceOrder order = maintenanceOrderRepository.findById(orderId).orElseThrow();
        order.setStatus(MaintenanceOrderStatus.PAYMENT_CREATED);
        PaymentOrder paymentOrder = PaymentOrder.builder()
                .customerId(request.getAccountId())
                .orderId(orderId)
                .paymentMethods(PaymentMethods.VNPAY)
                .status(PaymentStatus.PENDING)
                .total(request.getTotalPrice())
                .build();
        maintenanceOrderRepository.save(order);
        return paymentOrderRepository.save(paymentOrder);
    }

    public List<PaymentOrder> listALl(String accountId){
        return paymentOrderRepository.findByCustomerIdAndStatus(accountId, PaymentStatus.PENDING);
    }

    public String createVnPayPayment(HttpServletRequest request, String paymentId) {
        long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
        String bankCode = request.getParameter("bankCode");
        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig(paymentId);
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", "NCB");
        }
        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        return vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;
    }

    public String findOrderId(String paymentId) {
        return paymentOrderRepository.findById(paymentId).orElseThrow().getOrderId();
    }

    public void successPaid(String orderId) {
        ConstructionOrder order = constructOrderRepository.findById(orderId).orElseThrow();
        if (order.getStatus().name().equals("CONFIRMED_QUOTATION")) {
            order.setStatus(ConstructionOrderStatus.PAID_STAGE_1);
        } else if (order.getStatus().name().equals("CONFIRMED_DESIGN")) {
            order.setStatus(ConstructionOrderStatus.PAID_STAGE_2);
        } else {
            order.setStatus(ConstructionOrderStatus.PAID_STAGE_3);
        }
        constructOrderRepository.save(order);
    }
//
//    public void successPayment(String paymentId) {
//        PaymentOrder paymentOrder = paymentOrderRepository.findById(paymentId).orElseThrow();
//        paymentOrder.setStatus(PaymentStatus.SUCCESS);
//        paymentOrderRepository.save(paymentOrder);
//        ConstructionOrder order = ConstructionOrder.builder()
//                .status(ConstructionOrderStatus.PAID_STAGE_1)
//                .build();
//    }
//
//    public void failPayment(String paymentId) {
//        PaymentOrder paymentOrder = paymentOrderRepository.findById(paymentId).orElseThrow();
//        paymentOrder.setStatus(PaymentStatus.FAILED);
//        paymentOrderRepository.save(paymentOrder);
//    }
}
