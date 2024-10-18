package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.Design;
import com.swp_group4.back_end.enums.DesignStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DesignRepository extends JpaRepository<Design, String> {

    List<Design> findByDesignStatus(DesignStatus status);

}
