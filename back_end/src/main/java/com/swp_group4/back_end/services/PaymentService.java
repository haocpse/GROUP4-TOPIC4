package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.PaymentOrder;
import com.swp_group4.back_end.enums.PaymentStatus;
import com.swp_group4.back_end.repositories.CustomerRepository;
import com.swp_group4.back_end.repositories.PaymentOrderRepository;
import com.swp_group4.back_end.requests.PaymentRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.PaymentResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentService {

    @Autowired
    PaymentOrderRepository paymentOrderRepository;
    @Autowired
    CustomerRepository customerRepository;

    // VNPAY Configuration
    @Value("${vnpay.tmnCode}")
    private String vnpTmnCode;

    @Value("${vnpay.hashSecret}")
    private String vnpHashSecret;

    @Value("${vnpay.url}")
    private String vnpUrl;

    @Value("${vnpay.returnUrl}")
    private String vnpReturnUrl;

    // MOMO Configuration
    @Value("${momo.partnerCode}")
    private String momoPartnerCode;

    @Value("${momo.accessKey}")
    private String momoAccessKey;

    @Value("${momo.secretKey}")
    private String momoSecretKey;

    @Value("${momo.endpoint}")
    private String momoEndpoint;

    @Value("${momo.returnUrl}")
    private String momoReturnUrl;

    public List<PaymentOrder> listALl(){
        var context = SecurityContextHolder.getContext();
        String accountId = context.getAuthentication().getName();
        Customer customer = customerRepository.findByAccountId(accountId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return paymentOrderRepository.findByCustomerId(accountId);
    }


    // Xử lý tạo thanh toán
    public PaymentResponse createPayment(PaymentRequest request) {
        PaymentOrder paymentOrder = PaymentOrder.builder()
                .serviceId(request.getServiceId())
//                .date()
                .paymentMethods(request.getMethod())
                .total(request.getTotal())
                .status(PaymentStatus.PENDING)
                .build();

        PaymentResponse response = new PaymentResponse();

        switch (request.getMethod()) {
            case VNPAY:
                response = createVNPayPayment(paymentOrder);
                break;
            case MOMO:
                response = createMomoPayment(paymentOrder);
                break;
            default:
        }

        return response;
    }

    // Xử lý phản hồi (callback) từ cổng thanh toán
    public ApiResponse<String> handlePaymentReturn(Map<String, String> params) {
        boolean paymentSuccess = processPaymentReturn(params);

        if (paymentSuccess) {
            return ApiResponse.<String>builder()
                    .code(1000)  // Mã thành công
                    .message("Payment successful!")
                    .data("Payment completed successfully")
                    .build();
        } else {
            return ApiResponse.<String>builder()
                    .code(2000)  // Mã lỗi
                    .message("Payment failed!")
                    .data("Payment failed to process")
                    .build();
        }
    }

    // Tạo yêu cầu thanh toán qua VNPAY
    private PaymentResponse createVNPayPayment(PaymentOrder paymentOrder) {
        paymentOrderRepository.save(paymentOrder);
        String vnPayUrl = generateVNPayUrl(paymentOrder);
        return PaymentResponse.builder()
                .paymentId(paymentOrder.getPaymentId())
                .redirectUrl(vnPayUrl)
                .message("Redirect to VNPAY for payment")
                .success(true)
                .build();
    }

    // Tạo yêu cầu thanh toán qua MOMO
    private PaymentResponse createMomoPayment(PaymentOrder paymentOrder) {
        paymentOrderRepository.save(paymentOrder);
        String momoUrl = generateMomoUrl(paymentOrder);
        return PaymentResponse.builder()
                .paymentId(paymentOrder.getPaymentId())
                .redirectUrl(momoUrl)
                .message("Redirect to MOMO for payment")
                .success(true)
                .build();
    }

    // Phương thức xử lý phản hồi từ cổng thanh toán
    private boolean processPaymentReturn(Map<String, String> params) {
        String paymentId = params.get("paymentId");
        PaymentOrder paymentOrder = paymentOrderRepository.findById(paymentId).orElse(null);
        if (paymentOrder == null) {
            return false;
        }
        String resultCode = params.get("resultCode");
        if ("0".equals(resultCode)) {  // Mã '0' là thành công
            paymentOrder.setStatus(PaymentStatus.SUCCESS);
        } else {
            paymentOrder.setStatus(PaymentStatus.FAILED);
        }
        paymentOrderRepository.save(paymentOrder);
        return "0".equals(resultCode);
    }

    private String generateVNPayUrl(PaymentOrder paymentOrder) {
        return "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?params";
    }

    private String generateMomoUrl(PaymentOrder paymentOrder) {
        return "https://test-payment.momo.vn/pay?params";
    }
}
