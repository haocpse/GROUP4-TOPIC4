package com.swp_group4.back_end.responses;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ViewRejectedDesignResponse {

    String constructionOrderId;
    String customerName;
    String designerName;
    String address;
    String phone;
    String customerRequest;
    String url2dDesign;
    String url3dDesign;
    String urlFrontDesign;

}
