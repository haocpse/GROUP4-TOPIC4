package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.MaintenanceOrder;
import com.swp_group4.back_end.enums.MaintenanceOrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaintenanceOrderRepository extends JpaRepository<MaintenanceOrder, String> {
    List<MaintenanceOrder> findByConstructorLeaderIdAndStatus(String constructionLeader, MaintenanceOrderStatus status);
    List<MaintenanceOrder> findByCustomerId(String customerId);
}
