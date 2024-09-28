package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.MaintenanceOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MaintenanceOrderRepository extends JpaRepository<MaintenanceOrder, String> {
    Optional<MaintenanceOrder> findByMaintenanceOrderId(String MaintenanceorderId);
}
