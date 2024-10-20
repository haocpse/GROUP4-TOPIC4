package com.swp_group4.back_end.responses;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ViewRejectedQuotationResponse {

    String constructionOrderId;
    String customerName;
    String consultantName;
    String address;
    String phone;
    String customerRequest;
    double length;
    double height;
    double width;
    String packageId;
    Date startDate;
    Date endDate;
}