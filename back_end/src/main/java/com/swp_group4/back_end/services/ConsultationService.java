package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.ConstructStatus;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.enums.PaymentStatus;
import com.swp_group4.back_end.enums.QuotationBatch;
import com.swp_group4.back_end.mapper.QuotationMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.QuotationDetailRequest;
import com.swp_group4.back_end.responses.ConstructOrderStatusTransitionResponse;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class ConsultationService {

    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    QuotationMapper quotationMapper;
    @Autowired
    QuotationRepository quotationRepository;
    @Autowired
    ConstructionTasksRepository constructionTasksRepository;
    @Autowired
    PackageConstructionRepository packageConstructionRepository;
    @Autowired
    PackageRepository packageRepository;
    @Autowired
    PackagePriceRepository packagePriceRepository;
    @Autowired
    HelperService helperService;

    public List<ConstructOrderStatusTransitionResponse<ConstructionOrderStatus>> listOwnedConsultTask() {
        List<ConstructionOrderStatus> statusList = List.of(ConstructionOrderStatus.CONSULTING);
        return helperService.orderInStepResponses(statusList);
    }

    public ConstructOrderStatusTransitionResponse<ConstructionOrderStatus> detailOfOrder(String constructionOrderId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow(
                () -> new RuntimeException("Order not found for id: " + constructionOrderId));
        return helperService.detailOfOrder(order);
    }

    public ConstructQuotationResponse exportQuotation(String constructionOrderId, QuotationDetailRequest request) {
        PackagePrice packagePrice = packagePriceRepository.findById(request.getPackagePriceId()).orElseThrow(
                () -> new RuntimeException("Package price not found for id: " + request.getPackagePriceId()));
        Quotation quotation = Quotation.builder()
                .batch(QuotationBatch.STAGE_1)
                .paymentStatus(PaymentStatus.PENDING)
                .volume(packagePrice.getVolume())
                .build();
        quotationRepository.save(quotationMapper.toQuotation(request, quotation));
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow(
                () -> new RuntimeException("Order not found for id: " + constructionOrderId));
        order.setQuotationId(quotation.getQuotationId());
        order.setTotal(request.getTotalPrice());
        constructOrderRepository.save(order);
        List<String> listPackageConstructionId = request.getPackageConstructionId();
        List<String> contentList = new ArrayList<>();
        for (String packageConstructionId : listPackageConstructionId){
            PackageConstruction packageConstruction = packageConstructionRepository.findById(packageConstructionId).orElseThrow(
                    () -> new RuntimeException("Package construction not found for id: " + packageConstructionId));
            contentList.add(packageConstruction.getContent());
        }
        Packages packages = packageRepository.findById(quotation.getPackageId()).orElseThrow(
                () -> new RuntimeException("Package not found for id: " + quotation.getPackageId()));
        ConstructQuotationResponse response = ConstructQuotationResponse.builder()
                .packageType(packages.getPackageType())
                .totalPrice(request.getTotalPrice())
                .content(contentList)
                .build();
        quotationMapper.toQuotationResponse(quotation, response);
        List<String> packageConstructionIds = request.getPackageConstructionId();
        for(String packConstructionId : packageConstructionIds) {
            ConstructionTasks tasks = ConstructionTasks.builder()
                    .constructionOrderId(constructionOrderId)
                    .packageConstructionId(packConstructionId)
                    .status(ConstructStatus.NOT_YET)
                    .build();
            constructionTasksRepository.save(tasks);
        }
        return response;
    }

}
