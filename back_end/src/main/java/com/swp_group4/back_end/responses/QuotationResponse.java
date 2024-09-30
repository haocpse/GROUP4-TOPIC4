package com.swp_group4.back_end.responses;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class QuotationResponse {

    String quotationId;
    String packageType;
    double volume;
    double priceStage1;
    double priceStage2;
    double priceStage3;
    double totalPrice;
    List<String> content;

}
