package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.ConstructionTasks;
import com.swp_group4.back_end.entities.PackageConstruction;
import com.swp_group4.back_end.entities.Quotation;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.mapper.QuotationMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApprovalReviewService {

    @Autowired
    QuotationRepository quotationRepository;
    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    QuotationMapper quotationMapper;
    private PackageRepository packageRepository;
    @Autowired
    private ConstructionTasksRepository constructionTasksRepository;
    @Autowired
    private PackageConstructionRepository packageConstructionRepository;

    public List<ConstructQuotationResponse> listAllQuotation() {
        List<ConstructionOrder> orders = constructOrderRepository
                .findByStatus(ConstructionOrderStatus.QUOTATION);
        List<ConstructQuotationResponse> responses = new ArrayList<>();
        for (ConstructionOrder order : orders) {
            Quotation quotation = quotationRepository.findById(order.getQuotationId()).orElseThrow(
                    () -> new RuntimeException("Quotation not found"));
            List<ConstructionTasks> constructionTasksList = constructionTasksRepository
                    .findByConstructionOrderId(order.getConstructionOrderId());
            List<String> contentTask = new ArrayList<>();
            for (ConstructionTasks constructionTasks : constructionTasksList) {
                PackageConstruction packageConstruction = packageConstructionRepository.findById(constructionTasks
                        .getPackageConstructionId()).orElseThrow(() ->new RuntimeException("Error"));
                contentTask.add(packageConstruction.getContent());
            }
            ConstructQuotationResponse response = ConstructQuotationResponse.builder()
                    .packageType(packageRepository.findById(quotation.getPackageId()).orElseThrow(
                            () ->new RuntimeException("Error")).getPackageType())
                    .content(contentTask)
                    .volume(quotation.getVolume())
                    .build();
            responses.add(quotationMapper.toQuotationResponse(quotation, response));
        }
        return responses;
    }
}
