package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.PackagePrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PackagePriceRepository extends JpaRepository<PackagePrice, String> {
    Optional<PackagePrice> findByPackagePriceId(String packagePriceId);
}
