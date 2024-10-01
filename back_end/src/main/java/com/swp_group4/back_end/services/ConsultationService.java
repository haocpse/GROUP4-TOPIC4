package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.ConstructStatus;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.enums.PaymentStatus;
import com.swp_group4.back_end.enums.QuotationBatch;
import com.swp_group4.back_end.mapper.QuotationMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.QuotationDetailRequest;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import com.swp_group4.back_end.responses.ConstructionOrderInStepResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class ConsultationService {

    @Autowired
    StaffRepository staffRepository;
    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    CustomerRepository customerRepository;
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

    public List<ConstructionOrderInStepResponse> listOwnedConsultTask() {
        var context = SecurityContextHolder.getContext();
        String accountId = context.getAuthentication().getName();
        Staff staff = staffRepository.findByAccountId(accountId).orElseThrow(
                ()-> new RuntimeException("ACCOUNT DOES NOT EXIST"));
        List<ConstructionOrderStatus> statusList = List.of(ConstructionOrderStatus.CONSULTING,
                                                            ConstructionOrderStatus.QUOTATION);
        List<ConstructionOrder> orders = constructOrderRepository.findByConsultantAndStatusIn(staff.getStaffId(), statusList);
        return orders.stream()
                .map(order -> {
                    Customer customer = customerRepository.findById(order.getCustomerId())
                            .orElseThrow(() -> new RuntimeException("Customer not found for id: " + order.getCustomerId()));
                    return ConstructionOrderInStepResponse.builder()
                            .constructionOrderId(order.getConstructionOrderId())
                            .customerName(customer.getFirstname() + " " + customer.getLastname())
                            .startDate(order.getStartDate())
                            .phone(customer.getPhone())
                            .address(customer.getAddress())
                            .status(order.getStatus())
                            .build();
                })
                .toList();
    }

    private ConstructionOrderInStepResponse response (ConstructionOrder order) {
        Customer customer = customerRepository.findById(order.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found for id: " + order.getCustomerId()));
        return ConstructionOrderInStepResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .startDate(order.getStartDate())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .status(order.getStatus())
                .build();
    }

    public ConstructionOrderInStepResponse detailOfOrder(String constructionOrderId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow(
                () -> new RuntimeException("Order not found for id: " + constructionOrderId));
                return this.response(order);
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
        order.setStatus(ConstructionOrderStatus.QUOTATION);
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
