package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.Quotation;
import com.swp_group4.back_end.enums.QuotationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuotationRepository extends JpaRepository<Quotation, String> {

    Optional<Quotation> findByQuotationIdAndQuotationStatusIn(String quotationId, List<QuotationStatus> statuses);
    List<Quotation> findByPackageId(String packageId);

    @Query("SELECT o FROM Quotation o WHERE YEAR(o.postedDate) = :year AND o.packageId = :packageId")
    List<Quotation> findByYearAndPackageId(int year, String packageId);
}
