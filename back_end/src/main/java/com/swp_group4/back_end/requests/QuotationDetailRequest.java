package com.swp_group4.back_end.requests;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class QuotationDetailRequest {

    String packageId;
    List<String> packageConstructionId;
    String packagePriceId;
    String promotionId;
    double totalPrice;
    double priceStage1;
    double priceStage2;
    double priceStage3;

}
