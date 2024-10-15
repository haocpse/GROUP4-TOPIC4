package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.PackagePrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface PackagePriceRepository extends JpaRepository<PackagePrice, String> {

    PackagePrice findFirstByPackageIdAndMinVolumeLessThanEqualAndMaxVolumeGreaterThanEqual(String packageId, double minVolume, double maxVolume);
    List<PackagePrice> findPackagePriceByPackageId(String packageId);
}
