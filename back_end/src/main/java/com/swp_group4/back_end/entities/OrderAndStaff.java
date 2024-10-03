package com.swp_group4.back_end.entities;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class OrderAndStaff {

    ConstructionOrder order;
    Staff staff;

}
