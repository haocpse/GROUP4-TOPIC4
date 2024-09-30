package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Quotation;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.QuotationRepository;
import com.swp_group4.back_end.responses.QuotationResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApprovalReviewService {

    @Autowired
    QuotationRepository quotationRepository;
    @Autowired
    ConstructOrderRepository constructOrderRepository;

    public List<QuotationResponse> listAllQuotation() {

        List<ConstructionOrder> orders = constructOrderRepository
                .findByStatus(ConstructionOrderStatus.QUOTATION);


        return null;
    }
}
