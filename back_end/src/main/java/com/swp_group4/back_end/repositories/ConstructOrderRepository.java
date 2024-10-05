package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConstructOrderRepository extends JpaRepository<ConstructionOrder, String> {

    ConstructionOrder findByQuotationId(String quotationId);
    ConstructionOrder findByDesignId(String designId);
    List<ConstructionOrder> findByConsultant(String consultant);
    List<ConstructionOrder> findByDesignLeader(String designLeader);
    List<ConstructionOrder> findByConstructionLeader(String constructionLeader);

}
