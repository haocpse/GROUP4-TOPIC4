package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.entities.PackageConstruction;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class GeneratePDFResponse {

    String consultant;
    String customerName;
    String phone;
    String address;
    String customerRequest;
    double volume;
    double total;
    String packageType;
    List<PackageConstruction> listPackageConstruction;
    LocalDateTime constructionStartDate;
    LocalDateTime constructionEndDate;
    LocalDateTime postedDate;

}
