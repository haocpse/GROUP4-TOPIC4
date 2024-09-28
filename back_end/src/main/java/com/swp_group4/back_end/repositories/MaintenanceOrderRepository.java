package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.MaintenanceOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MaintenanceOrderRepository extends JpaRepository<MaintenanceOrder, String> {
}
