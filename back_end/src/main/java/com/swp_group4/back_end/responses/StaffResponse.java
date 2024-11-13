package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.enums.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class StaffResponse {

    String staffId;
    String staffName;
    Role role;

}
