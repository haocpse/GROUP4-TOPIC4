package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.*;
import com.swp_group4.back_end.mapper.QuotationMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.ExportQuotationRequest;
import com.swp_group4.back_end.responses.ConstructOrderDetailForStaffResponse;
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
    StaffService staffService;

    public List<ConstructOrderDetailForStaffResponse> listOwnedConsultTask() {
        return staffService.listOwnedStaffTask();
    }

    public ConstructOrderDetailForStaffResponse detailOfOrder(String constructionOrderId) {
        return staffService.detailOfOrder(constructionOrderId);
    }

    public ConstructQuotationResponse exportQuotation(String constructionOrderId, ExportQuotationRequest request) {
        String packageId = request.getPackageId();
        Packages packages = packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found for id: " + packageId));
        String packageType = packages.getPackageType();
        double volume = request.getVolume();
        PackagePrice packagePrice = packagePriceRepository
                .findFirstByPackageIdAndMinVolumeLessThanEqualAndMaxVolumeGreaterThanEqual
                        (packageId, volume, volume);
        double totalPrice = packagePrice.getPrice() * volume;
        List<String> listPackageConstructionId = request.getPackageConstructionId();
        List<String> contentList = new ArrayList<>();
        for (String packageConstructionId : listPackageConstructionId){
            PackageConstruction packageConstruction = packageConstructionRepository.findById(packageConstructionId)
                    .orElseThrow(() -> new RuntimeException("Package construction not found for id: " + packageConstructionId));
            totalPrice += packageConstruction.getPrice();
            contentList.add(packageConstruction.getContent());
            ConstructionTasks tasks = ConstructionTasks.builder()
                    .constructionOrderId(constructionOrderId)
                    .packageConstructionId(packageConstructionId)
                    .status(ConstructStatus.NOT_YET)
                    .build();
            constructionTasksRepository.save(tasks);
        }
        Quotation quotation = Quotation.builder()
                .batch(QuotationBatch.STAGE_1)
                .paymentStatus(PaymentStatus.PENDING)
                .status(QuotationStatus.QUOTED)
                .build();
        quotationMapper.toQuotation(request, quotation);
        quotationRepository.save(quotation);
        ConstructQuotationResponse response = ConstructQuotationResponse.builder()
                .packageType(packageType)
                .totalPrice(totalPrice)
                .content(contentList)
                .build();
        return quotationMapper.toQuotationResponse(quotation, response);
    }



}
