package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.enums.ConstructionOrderStatus;
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
    Date startDate;
    Date endDate;
    String consultantName;
    String designLeaderName;
    String constructorLeaderName;
    ConstructionOrderStatus orderStatus;

}
