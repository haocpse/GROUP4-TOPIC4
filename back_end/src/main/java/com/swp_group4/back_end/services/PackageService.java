package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.PackageConstruction;
import com.swp_group4.back_end.entities.PackagePrice;
import com.swp_group4.back_end.entities.Packages;
import com.swp_group4.back_end.repositories.PackageConstructionRepository;
import com.swp_group4.back_end.repositories.PackagePriceRepository;
import com.swp_group4.back_end.repositories.PackageRepository;
import com.swp_group4.back_end.responses.PackageResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class PackageService {


    @Autowired
    PackageRepository packageRepository;
    @Autowired
    PackageConstructionRepository packageConstructionRepository;

    public PackageResponse detailPackage(String constructionOrderId) {
        List<Packages> packagesList = packageRepository.findAll();
        List<PackageConstruction> packageConstructions = packageConstructionRepository.findAll();
        return PackageResponse.builder()
                .packagesList(packagesList)
                .packageConstructions(packageConstructions)
                .build();
    }
}
