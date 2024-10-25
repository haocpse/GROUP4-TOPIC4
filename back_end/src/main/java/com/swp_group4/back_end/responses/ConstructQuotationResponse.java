package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.enums.QuotationStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ConstructQuotationResponse {

    String constructOrderId;
    String quotationId;
    String packageType;
    String customerName;
    String consultantName;
    double volume;
    double priceStage1;
    double priceStage2;
    double priceStage3;
    double totalPrice;
    QuotationStatus quotationStatus;
    String customerRequest;
    List<String> content;

}
