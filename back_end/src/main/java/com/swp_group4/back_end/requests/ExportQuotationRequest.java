package com.swp_group4.back_end.requests;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ExportQuotationRequest {

    String packageId;
    double length;
    double height;
    double width;
    String customerRequest;
    Date startDate;
    Date endDate;
    String promotionId;

}
