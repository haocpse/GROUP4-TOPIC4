package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.PaymentOrder;
import com.swp_group4.back_end.enums.PaymentStatus;
import com.swp_group4.back_end.repositories.PaymentOrderRepository;
import com.swp_group4.back_end.responses.PaymentResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentService {
    @Autowired
    PaymentOrderRepository paymentOrderRepository;
    // Tạo yêu cầu thanh toán qua VNPAY
    public PaymentResponse createVNPayPayment(PaymentOrder paymentOrder) {
        // Lưu đơn hàng vào database với trạng thái PENDING
        paymentOrderRepository.save(paymentOrder);

        // Tạo URL thanh toán VNPAY với các tham số cần thiết
        String vnPayUrl = generateVNPayUrl(paymentOrder);

        // Trả về URL để frontend redirect tới VNPAY
        return PaymentResponse.builder()
                .paymentId(paymentOrder.getPaymentId())
                .redirectUrl(vnPayUrl)
                .message("Redirect to VNPAY for payment")
                .success(true)
                .build();
    }

    // Tạo yêu cầu thanh toán qua MOMO
    public PaymentResponse createMomoPayment(PaymentOrder paymentOrder) {
        // Lưu đơn hàng vào database với trạng thái PENDING
        paymentOrderRepository.save(paymentOrder);

        // Tạo URL thanh toán MOMO với các tham số cần thiết
        String momoUrl = generateMomoUrl(paymentOrder);

        // Trả về URL để frontend redirect tới MOMO
        return PaymentResponse.builder()
                .paymentId(paymentOrder.getPaymentId())
                .redirectUrl(momoUrl)
                .message("Redirect to MOMO for payment")
                .success(true)
                .build();
    }

    // Xử lý phản hồi từ VNPAY hoặc MOMO sau khi thanh toán
    public boolean processPaymentReturn(Map<String, String> params) {
        // Xác thực phản hồi và cập nhật trạng thái thanh toán
        String paymentId = params.get("paymentId"); // Lấy ID đơn hàng từ callback

        // Tìm đơn hàng trong database
        PaymentOrder paymentOrder = paymentOrderRepository.findById(paymentId).orElse(null);
        if (paymentOrder == null) {
            return false;
        }

        // Xử lý kết quả dựa trên tham số phản hồi từ cổng thanh toán
        String resultCode = params.get("resultCode"); // Giả sử từ MOMO
        if ("0".equals(resultCode)) {  // '0' là thành công với MOMO
            paymentOrder.setStatus(PaymentStatus.SUCCESS);
        } else {
            paymentOrder.setStatus(PaymentStatus.FAILED);
        }

        // Cập nhật trạng thái đơn hàng trong database
        paymentOrderRepository.save(paymentOrder);

        // Trả về kết quả xử lý thanh toán (thành công hoặc thất bại)
        return "0".equals(resultCode);
    }

    // Phương thức giả định để tạo URL thanh toán VNPAY (bạn cần bổ sung logic thực tế)
    private String generateVNPayUrl(PaymentOrder paymentOrder) {
        // Xây dựng URL để chuyển hướng người dùng tới trang thanh toán của VNPAY
        return "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?params";
    }

    // Phương thức giả định để tạo URL thanh toán MOMO (bạn cần bổ sung logic thực tế)
    private String generateMomoUrl(PaymentOrder paymentOrder) {
        // Xây dựng URL để chuyển hướng người dùng tới trang thanh toán của MOMO
        return "https://test-payment.momo.vn/pay?params";
    }
}
