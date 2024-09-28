package com.swp_group4.back_end.entities;

import com.swp_group4.back_end.enums.QuotationBatch;
import com.swp_group4.back_end.enums.PaymentStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Quotation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String quotationId;
    QuotationBatch batch;
    PaymentStatus paymentStatus;
    double priceStage1;
    double priceStage2;
    double priceStage3;
    String promotionId;
    String packageId;

}
