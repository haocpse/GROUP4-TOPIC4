package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.PaymentOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder,String> {
    Optional<PaymentOrder> findByPaymentId(String paymentId);
}
