package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.PackageConstruction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PackageConstructionRepository extends JpaRepository<PackageConstruction, String> {
    Optional<PackageConstruction> findByPDetailId(String PDetailId);
}
