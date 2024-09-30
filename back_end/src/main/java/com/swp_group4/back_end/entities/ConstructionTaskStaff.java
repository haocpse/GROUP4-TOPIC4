package com.swp_group4.back_end.entities;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ConstructionTaskStaff {

    @EmbeddedId
    ConstructionTaskStaffKey id;
    String staffName;

}
