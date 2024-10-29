package com.swp_group4.back_end.repositories;

import com.swp_group4.back_end.entities.Quotation;
import com.swp_group4.back_end.enums.QuotationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuotationRepository extends JpaRepository<Quotation, String> {

    List<Quotation> findByQuotationStatus(QuotationStatus status);
    Optional<Quotation> findByQuotationIdAndQuotationStatusIn(String quotationId, List<QuotationStatus> statuses);
    List<Quotation> findByPackageId(String packageId);
}
