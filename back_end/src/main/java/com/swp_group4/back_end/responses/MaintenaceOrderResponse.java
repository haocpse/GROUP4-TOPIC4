package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.enums.MaintenanceOrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class MaintenaceOrderResponse {
    String constructionOrderId;
    String customerId;
    Double total;
    MaintenanceOrderStatus status;
}
