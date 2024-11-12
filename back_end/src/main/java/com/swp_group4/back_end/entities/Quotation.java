package com.swp_group4.back_end.entities;

import com.swp_group4.back_end.enums.QuotationBatch;
import com.swp_group4.back_end.enums.PaymentStatus;
import com.swp_group4.back_end.enums.QuotationStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


import java.time.LocalDateTime;
import java.util.Date;


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
    double length;
    double width;
    double height;
    double volume;
    double percentageStage1;
    double percentageStage2;
    double percentageStage3;
    String promotionId;
    String packageId;
    LocalDateTime postedDate;
    Date expectedStartDate;
    Date expectedEndDate;
    @Enumerated(EnumType.STRING)
    QuotationStatus quotationStatus;

}
