package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConstructOrderRepository extends JpaRepository<ConstructionOrder, String> {

    ConstructionOrder findByQuotationId(String quotationId);
    Optional<ConstructionOrder> findByDesignId(String designId);
    List<ConstructionOrder> findByConsultantIdAndQuotationIdIsNull(String consultant);
    List<ConstructionOrder> findByConsultantIdAndQuotationIdIsNotNull(String consultant);
    List<ConstructionOrder> findByDesignerLeaderIdAndDesignIdIsNull(String designLeader);
    List<ConstructionOrder> findByDesignerLeaderIdAndDesignIdIsNotNull(String designLeader);
    List<ConstructionOrder> findByConstructorLeaderId(String constructionLeader);
    List<ConstructionOrder> findByCustomerId(String customerId);
    List<ConstructionOrder> findByStatus(ConstructionOrderStatus status);
    List<ConstructionOrder> findByStatusNotIn(List<ConstructionOrderStatus> statuses);
    List<ConstructionOrder> findByQuotationIdIsNotNullAndStatusNot(ConstructionOrderStatus status);

    @Query("SELECT o FROM ConstructionOrder o ORDER BY o.startDate DESC")
    List<ConstructionOrder> findByStatusOrderedByStartDateDesc();

    @Query("SELECT o FROM ConstructionOrder o ORDER BY o.startDate ASC")
    List<ConstructionOrder> findByStatusOrderedByStartDateAsc();

    @Query("SELECT o FROM ConstructionOrder o WHERE YEAR(o.startDate) = :year")
    List<ConstructionOrder> findByYear(int year);

    @Query("SELECT o FROM ConstructionOrder o WHERE YEAR(o.startDate) = :year AND o.status = :status")
    List<ConstructionOrder> findByYearAndStatus(int year, ConstructionOrderStatus status);

    @Query("SELECT o FROM ConstructionOrder o WHERE YEAR(o.startDate) = :year AND o.status not in :statuses")
    List<ConstructionOrder> findByYearAndStatusNotIn(int year, List<ConstructionOrderStatus> statuses);

    @Query("SELECT co FROM ConstructionOrder co WHERE YEAR(co.startDate) = :year AND co.quotationId IS NOT NULL AND co.status <> :status")
    List<ConstructionOrder> findByYearAndQuotationIdIsNotNullAndStatusNot(int year, ConstructionOrderStatus status);
}
