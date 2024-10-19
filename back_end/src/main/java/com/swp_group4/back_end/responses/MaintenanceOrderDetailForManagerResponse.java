package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.enums.MaintenanceOrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class MaintenanceOrderDetailForManagerResponse {
    String orderId;
    String customerName;
    String phone;
    String address;
    double totalPrice;
    Date startDate;
    Date endDate;
    String constructorLeaderId;
    MaintenanceOrderStatus orderStatus;
}
