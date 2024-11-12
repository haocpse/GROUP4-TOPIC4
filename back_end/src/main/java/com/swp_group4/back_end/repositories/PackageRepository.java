package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.Packages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PackageRepository extends JpaRepository<Packages, String> {

}
