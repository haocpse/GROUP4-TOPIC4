package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConstructOrderRepository extends JpaRepository<ConstructionOrder, String> {

    List<ConstructionOrder> findByStatusIn(List<ConstructionOrderStatus> statuses);
    List<ConstructionOrder> findByConsultantAndStatusIn(String consultant, List<ConstructionOrderStatus> statuses);
    List<ConstructionOrder> findByConstructionLeaderAndStatusIn(String constructionLeader, List<ConstructionOrderStatus> statuses);
    List<ConstructionOrder> findByDesignLeaderAndStatusIn(String designLeader, List<ConstructionOrderStatus> statuses);

}
