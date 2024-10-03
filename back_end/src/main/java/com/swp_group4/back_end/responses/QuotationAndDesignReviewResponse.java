package com.swp_group4.back_end.responses;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class QuotationAndDesignReviewResponse<T> {

    String constructionOrderId;
    String id;
    String customerName;
    String phone;
    String address;
    String leaderName;
    String packageType;
    double volume;
    double totalPrice;
    T status;

}
