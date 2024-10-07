package com.swp_group4.back_end.entities;

//import com.swp_group4.back_end.enums.PaymentOrderStatus;
import com.swp_group4.back_end.enums.PaymentMethods;
import com.swp_group4.back_end.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.ZonedDateTime;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class PaymentOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String paymentId;
    String serviceId;
    String customerId;
    Date date;
    PaymentMethods paymentMethods;
    Double total;
    @Enumerated(EnumType.STRING)
    PaymentStatus status;
}
