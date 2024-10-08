package com.swp_group4.back_end.requests;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UrlDesignRequest {

    String url2dDesign;
    String url3dDesign;
    String urlFrontDesign;
    String urlBackDesign;

}
