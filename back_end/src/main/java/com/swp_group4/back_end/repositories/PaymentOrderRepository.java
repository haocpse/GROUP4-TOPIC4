package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.PaymentOrder;
import com.swp_group4.back_end.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PaymentOrderRepository extends JpaRepository<PaymentOrder,String> {
    List<PaymentOrder> findByCustomerIdAndStatus(String customerId, PaymentStatus status);
    List<PaymentOrder> findByOrderId(String orderId);
    PaymentOrder findPaymentOrdersByOrderId(String orderId);
    List<PaymentOrder> findByStatus(PaymentStatus status);

    @Query("SELECT o FROM PaymentOrder o WHERE YEAR(o.paidDate) = :year AND o.status = :paymentStatus")
    List<PaymentOrder> findByYearAndStatus(int year, PaymentStatus paymentStatus);

    @Query("SELECT o FROM PaymentOrder o WHERE o.status = :status ORDER BY o.paidDate DESC")
    List<PaymentOrder> findByStatusOrderedByPaidDateDesc(@Param("status") PaymentStatus status);

    @Query("SELECT o FROM PaymentOrder o WHERE o.status = :status ORDER BY o.paidDate ASC")
    List<PaymentOrder> findByStatusOrderedByPaidDateAsc(@Param("status") PaymentStatus status);
}
