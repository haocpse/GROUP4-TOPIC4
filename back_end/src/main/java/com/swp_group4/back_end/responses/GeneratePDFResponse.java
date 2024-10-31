package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.entities.PackageConstruction;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Date;
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
    double priceVolume;
    double minVolume;
    double maxVolume;
    double priceStage1;
    double priceStage2;
    double priceStage3;
    double percentageStage1;
    double percentageStage2;
    double percentageStage3;
    String packageType;
    List<PackageConstruction> listPackageConstruction;
    Date constructionStartDate;
    Date constructionEndDate;
    LocalDateTime postedDate;

}
