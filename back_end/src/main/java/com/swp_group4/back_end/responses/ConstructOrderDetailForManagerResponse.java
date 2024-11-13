package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.enums.DesignStatus;
import com.swp_group4.back_end.enums.QuotationStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ConstructOrderDetailForManagerResponse {

    String orderId;
    String customerName;
    String phone;
    String address;
    double totalPrice;
    String packageType;
    Date startDate;
    Date endDate;
    String consultantId;
    String designerLeaderId;
    String constructorLeaderId;
    ConstructionOrderStatus status;
    QuotationStatus quotationStatus;
    DesignStatus designStatus;

}
