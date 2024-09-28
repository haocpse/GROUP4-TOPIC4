package com.swp_group4.back_end.entities;

import com.swp_group4.back_end.enums.PaymentOrderStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.ZonedDateTime;

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
    ZonedDateTime date;
    @Enumerated(EnumType.STRING)
    PaymentOrderStatus status;
}
