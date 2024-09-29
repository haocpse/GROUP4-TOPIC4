package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.Design;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesignRepository extends JpaRepository<Design, String> {
}
