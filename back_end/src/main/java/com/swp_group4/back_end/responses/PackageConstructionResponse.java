package com.swp_group4.back_end.responses;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class PackageConstructionResponse {

    String packageId;
    String packageType;
    List<PackageConstructionInfoResponse> constructionInfoResponseList;
}
