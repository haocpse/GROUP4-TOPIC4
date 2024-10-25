package com.swp_group4.back_end.responses;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class PackagePriceResponse {

    String packageId;
    String packagePriceId;
    String packageType;
    double minVolume;
    double maxVolume;
    double price;

}
