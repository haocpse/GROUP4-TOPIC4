package com.swp_group4.back_end.entities;

import com.swp_group4.back_end.enums.QuotationBatch;
import com.swp_group4.back_end.enums.PaymentStatus;
import com.swp_group4.back_end.enums.QuotationStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

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
    @Enumerated(EnumType.STRING)
    QuotationBatch batch;
    @Enumerated(EnumType.STRING)
    PaymentStatus paymentStatus;
    double volume;
    double priceStage1;
    double priceStage2;
    double priceStage3;
    String promotionId;
    String packageId;
    @Enumerated(EnumType.STRING)
    QuotationStatus status;

}
