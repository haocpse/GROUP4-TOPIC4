package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.enums.PaymentStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class PaymentInfoResponse {

    String paymentId;
    String paymentTitle;
    Date paidDate;
    Double price;
    PaymentStatus paymentStatus;
}
