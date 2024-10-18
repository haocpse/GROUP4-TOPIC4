package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.entities.Quotation;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.enums.QuotationStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ConstructOrderDetailForStaffResponse<T> {

    String constructionOrderId;
    String customerName;
    String staffName;
    String phone;
    String address;
    String customerRequest;
    T status;

}
