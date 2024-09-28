package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.Package;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PackageRepository extends JpaRepository<Package, String> {
    Optional<Package> findByPackageId(String packageId);
}
