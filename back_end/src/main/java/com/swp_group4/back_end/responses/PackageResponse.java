package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.entities.PackageConstruction;
import com.swp_group4.back_end.entities.PackagePrice;
import com.swp_group4.back_end.entities.Packages;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class PackageResponse {

    List<Packages> packagesList;
}
