package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.enums.DesignStatus;
import com.swp_group4.back_end.enums.QuotationStatus;
import com.swp_group4.back_end.mapper.DesignMapper;
import com.swp_group4.back_end.mapper.QuotationMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.ManageReviewRequest;
import com.swp_group4.back_end.responses.ConstructDesignResponse;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import com.swp_group4.back_end.responses.QuotationAndDesignReviewResponse;
import com.swp_group4.back_end.responses.ConstructOrderDetailForManagerResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class QuotationAndDesignApprovalService {

    @Autowired
    QuotationRepository quotationRepository;
    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    QuotationMapper quotationMapper;
    @Autowired
    ConstructionTasksRepository constructionTasksRepository;
    @Autowired
    PackageConstructionRepository packageConstructionRepository;
    @Autowired
    PackageRepository packageRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    DesignRepository designRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    DesignMapper designMapper;

    public List<QuotationAndDesignReviewResponse<QuotationStatus>> listAllQuotation() {
        List<Quotation> quotations = quotationRepository.findByStatus(QuotationStatus.QUOTED);
        List<QuotationAndDesignReviewResponse<QuotationStatus>> responses = new ArrayList<>();
        for (Quotation quotation : quotations) {
            String orderId = constructOrderRepository
                    .findByQuotationId(quotation.getQuotationId())
                    .getConstructionOrderId();
            ConstructionOrder order = constructOrderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found for id: " + orderId));
            Customer customer = customerRepository.findById(order.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found for id: " + order.getCustomerId()));
            String packageId = quotation.getPackageId();
            Packages packages = packageRepository.findById(packageId)
                    .orElseThrow(() -> new RuntimeException("Package not found"));
            QuotationAndDesignReviewResponse<QuotationStatus> response = QuotationAndDesignReviewResponse.<QuotationStatus>builder()
                    .constructionOrderId(order.getConstructionOrderId())
                    .id(quotation.getQuotationId())
                    .customerName(customer.getFirstname() + " " + customer.getLastname())
                    .phone(customer.getPhone())
                    .address(customer.getAddress())
                    .leaderName(order.getConsultant())
                    .packageType(packages.getPackageType())
                    .volume(quotation.getVolume())
                    .totalPrice(order.getTotal())
                    .status(QuotationStatus.QUOTED)
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public List<QuotationAndDesignReviewResponse<DesignStatus>> listAllDesign() {
        List<Design> Designs = designRepository.findByStatus(DesignStatus.DESIGNED);
        List<QuotationAndDesignReviewResponse<DesignStatus>> responses = new ArrayList<>();
        for (Design design : Designs) {
            String orderId = constructOrderRepository
                    .findByDesignId(design.getDesignId())
                    .getConstructionOrderId();
            ConstructionOrder order = constructOrderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found for id: " + orderId));
            Customer customer = customerRepository.findById(order.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found for id: " + order.getCustomerId()));
            Quotation quotation = quotationRepository.findById(order.getQuotationId())
                    .orElseThrow(() -> new RuntimeException("Quotation not found for id: " + order.getQuotationId()));
            Packages packages = packageRepository.findById(quotation.getPackageId())
                    .orElseThrow(() -> new RuntimeException("Package not found"));
            QuotationAndDesignReviewResponse<DesignStatus> response = QuotationAndDesignReviewResponse.<DesignStatus>builder()
                    .constructionOrderId(order.getConstructionOrderId())
                    .id(design.getDesignId())
                    .customerName(customer.getFirstname() + " " + customer.getLastname())
                    .phone(customer.getPhone())
                    .address(customer.getAddress())
                    .leaderName(order.getDesignLeader())
                    .packageType(packages.getPackageType())
                    .volume(quotation.getVolume())
                    .totalPrice(order.getTotal())
                    .status(DesignStatus.DESIGNED)
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public ConstructQuotationResponse detailQuotation(String quotationId) {
        Quotation quotation = quotationRepository.findById(quotationId)
                .orElseThrow(() -> new RuntimeException("Quotation not found"));
        ConstructionOrder order = constructOrderRepository.findByQuotationId(quotationId);
        Customer customer = customerRepository.findById(order.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found for id: " + order.getCustomerId()));
        List<ConstructionTasks> tasks = constructionTasksRepository.findByConstructionOrderId(order.getConstructionOrderId());
        List<String> contentTask = new ArrayList<>();
        for (ConstructionTasks task : tasks) {
            PackageConstruction packageConstruction = packageConstructionRepository.findById(task.getPackageConstructionId())
                    .orElseThrow(() -> new RuntimeException("Package construction not found"));
            contentTask.add(packageConstruction.getContent());
        }
        ConstructQuotationResponse response = ConstructQuotationResponse.builder()
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .consultantName(staffRepository.findById(order.getConsultant())
                        .orElseThrow(() -> new RuntimeException("Error")).getStaffName())
                .packageType(packageRepository.findById(quotation.getPackageId())
                        .orElseThrow(() -> new RuntimeException("Error")).getPackageType())
                .content(contentTask)
                .totalPrice(order.getTotal())
                .customerRequest(order.getCustomerRequest())
                .build();
        quotationMapper.toQuotationResponse(quotation, response);
        return response;
    }

    public ConstructDesignResponse detailDesign(String designId) {
        Design design = designRepository.findById(designId)
                .orElseThrow(() -> new RuntimeException("Design not found"));
        ConstructionOrder order = constructOrderRepository.findByQuotationId(designId);
        Customer customer = customerRepository.findById(order.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found for id: " + order.getCustomerId()));
        ConstructDesignResponse response = ConstructDesignResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .designName(staffRepository.findById(order.getDesignLeader())
                        .orElseThrow(() -> new RuntimeException("Error")).getStaffName())
                .customerRequest(order.getCustomerRequest())
                .build();
        designMapper.toDesignResponse(design, response);
        return response;
    }

    public ConstructOrderDetailForManagerResponse manageQuotation(ManageReviewRequest request) {
        Quotation quotation = quotationRepository.findById(request.getId())
                .orElseThrow(() -> new RuntimeException("Quotation not found"));
        ConstructionOrder order = constructOrderRepository.findByQuotationId(quotation.getQuotationId());
        if (request.getStatus().name().equals("APPROVED")) {
            quotation.setStatus(QuotationStatus.CONFIRMED_QUOTATION);
            quotationRepository.save(quotation);
        }
        return ConstructOrderDetailForManagerResponse.<QuotationStatus>builder()
                .orderId(request.getId())
                .orderStatus(order.getStatus())
                .build();
    }

    public ConstructOrderDetailForManagerResponse manageDesign(ManageReviewRequest request) {
        Design design = designRepository.findById(request.getId())
                .orElseThrow(() -> new RuntimeException("Design not found"));
        ConstructionOrder order = constructOrderRepository.findByQuotationId(design.getDesignId());
        if (request.getStatus().name().equals("APPROVED")) {
            design.setStatus(DesignStatus.CONFIRMED_DESIGN);
            designRepository.save(design);
        }
        return ConstructOrderDetailForManagerResponse.<DesignStatus>builder()
                .orderId(request.getId())
                .orderStatus(order.getStatus())
                .build();
    }

}
