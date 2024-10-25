package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.*;
import com.swp_group4.back_end.mapper.CustomerMapper;
import com.swp_group4.back_end.mapper.QuotationMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.CustomerConfirmRequest;
import com.swp_group4.back_end.requests.FinishConstructRequest;
import com.swp_group4.back_end.requests.ServiceRequest;
import com.swp_group4.back_end.responses.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    CustomerMapper customerMapper;
    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    QuotationRepository quotationRepository;
    @Autowired
    PackageRepository packageRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    ConstructionTasksRepository constructionTasksRepository;
    @Autowired
    PackageConstructionRepository packageConstructionRepository;
    @Autowired
    QuotationMapper quotationMapper;
    @Autowired
    DesignRepository designRepository;
    @Autowired
    PaymentOrderRepository paymentOrderRepository;
    @Autowired
    ConstructionTaskStaffRepository constructionTaskStaffRepository;
    @Autowired
    MaintenanceOrderRepository maintenanceOrderRepository;


    public void createCustomer(String accountId, String firstname) {
        customerRepository.save(Customer.builder()
                .accountId(accountId)
                .firstName(firstname)
                .build());
    }

    public ServiceResponse<?> contactUs(ServiceRequest serviceRequest) {
        var context = SecurityContextHolder.getContext();
        String id = context.getAuthentication().getName();
        Customer customer = customerRepository.findByAccountId(id).orElseThrow();
        customerMapper.serviceRequestToCustomer(serviceRequest, customer);
        customerRepository.save(customer);
        if (serviceRequest.getService().name().equals("CONSTRUCTION_SERVICE")) {
            ConstructionOrder order = ConstructionOrder.builder()
                    .customerId(customer.getCustomerId())
                    .customerRequest(serviceRequest.getCustomerRequest())
                    .startDate(Date.valueOf(LocalDate.now()))
                    .status(ConstructionOrderStatus.REQUESTED)
                    .build();
            constructOrderRepository.save(order);
        }
        if (serviceRequest.getService().name().equals("MAINTENANCE_SERVICE")) {
          MaintenanceOrder order = MaintenanceOrder.builder()
                  .customerId(customer.getCustomerId())
                  .status(MaintenanceOrderStatus.REQUESTED)
                  .build();
          maintenanceOrderRepository.save(order);
        }
        return null;
    }

//    public CustomerResponse getOwnedInfo(){
//        Customer customer = this.identifyCustomer();
//        CustomerResponse response = new CustomerResponse();
//        return customerMapper.customerToResponse(customer, response);
//    }

//    public CustomerResponse updateOwnedInfo(UpdateInfoRequest request) {
//        Customer customer = this.identifyCustomer();
//        customerMapper.updateInfoToCustomer(request, customer);
//        customerRepository.save(customer);
//        CustomerResponse response = new CustomerResponse();
//        return customerMapper.customerToResponse(customer, response);
//    }

    public List<ConstructOrderDetailForCustomerResponse> listOrders(String accountId) {
        Customer customer = customerRepository.findByAccountId(accountId).orElseThrow();
        List<ConstructionOrder> orderList = constructOrderRepository.findByCustomerId(customer.getCustomerId());
        List<ConstructOrderDetailForCustomerResponse> responses = new ArrayList<>();
        for (ConstructionOrder order : orderList) {

            String designId = "";
            String quotationId = "";
            if (designRepository.findByDesignIdAndDesignStatus(order.getDesignId(), DesignStatus.CONFIRMED).isPresent()) {
                Design design = designRepository.findByDesignIdAndDesignStatus(order.getDesignId(), DesignStatus.CONFIRMED).orElseThrow();
                designId = design.getDesignId();
            }
            if (quotationRepository.findByQuotationIdAndQuotationStatus(order.getQuotationId(), QuotationStatus.CONFIRMED).isPresent()) {
                Quotation quotation = quotationRepository.findByQuotationIdAndQuotationStatus(order.getQuotationId(), QuotationStatus.CONFIRMED)
                        .orElseThrow();
                quotationId = quotation.getQuotationId();
            }

            ConstructOrderDetailForCustomerResponse response = ConstructOrderDetailForCustomerResponse.builder()
                    .constructionOrderId(order.getConstructionOrderId())
                    .customerName(customer.getFirstName() + " " + customer.getLastName())
                    .quotationId(quotationId)
                    .designId(designId)
                    .startDate(order.getStartDate())
                    .endDate(order.getEndDate())
                    .status(order.getStatus())
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public ConstructQuotationResponse viewQuotation(String accountId, String constructionOrderId) {
        Customer customer = customerRepository.findByAccountId(accountId).orElseThrow();
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow();
        Quotation quotation = quotationRepository.findById(order.getQuotationId())
                .orElseThrow(() -> new RuntimeException("Quotation not found"));
        Packages packages = packageRepository.findById(quotation.getPackageId()).orElseThrow();
        ConstructQuotationResponse response = ConstructQuotationResponse.builder()
                .constructOrderId(constructionOrderId)
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .consultantName(staffRepository.findById(order.getConsultantId()).orElseThrow().getStaffName())
                .customerRequest(order.getCustomerRequest())
                .packageType(packages.getPackageType())
                .totalPrice(order.getTotal())
                .content(this.findContentOfTask(constructionOrderId))
                .build();
        return quotationMapper.toQuotationResponse(quotation, response);
    }

    private List<String> findContentOfTask(String constructionOrderId){
        List<ConstructionTasks> tasks = constructionTasksRepository.findByConstructionOrderId(constructionOrderId).orElseThrow();
        List<String> taskList = new ArrayList<>();
        for (ConstructionTasks task : tasks) {
            String content = packageConstructionRepository.findById(task.getPackageConstructionId()).orElseThrow().getContent();
            taskList.add(content);
        }
        return taskList;
    }

    public ConstructDesignResponse viewDesign(String constructionOrderId, String accountId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow();
        Design design = designRepository.findById(order.getDesignId()).orElseThrow();
        Customer customer = customerRepository.findByAccountId(accountId).orElseThrow();
        return ConstructDesignResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .designId(design.getDesignId())
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .designName(staffRepository.findById(order.getDesignerLeaderId()).orElseThrow().getStaffName())
                .customerRequest(order.getCustomerRequest())
                .url2dDesign(design.getUrl2dDesign())
                .url3dDesign(design.getUrl3dDesign())
                .urlFrontDesign(design.getUrlFrontDesign())
                .urlBackDesign(design.getUrlBackDesign())
                .build();
    }

    public StatusOfQuotationOrDesign<DesignStatus> confirmDesign(CustomerConfirmRequest<DesignStatus> request, String constructionOrderId, String accountId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow();
        Design design = designRepository.findById(order.getDesignId()).orElseThrow();
        if (request.getStatus().equals(DesignStatus.CONFIRMED)) {
            order.setStatus(ConstructionOrderStatus.CONFIRMED_DESIGN);
            constructOrderRepository.save(order);
            Customer customer = customerRepository.findByAccountId(accountId).orElseThrow();
            Quotation quotation = quotationRepository.findById(order.getQuotationId()).orElseThrow();
            PaymentOrder paymentOrder = PaymentOrder.builder()
                    .orderId(constructionOrderId)
                    .customerId(customer.getCustomerId())
                    .paymentTitle("Khach hang thanh toan giai doan 2")
                    .total(quotation.getPriceStage2())
                    .status(PaymentStatus.PENDING)
                    .build();
            paymentOrderRepository.save(paymentOrder);
        } else {
            design.setDesignStatus(DesignStatus.REJECTED);
            designRepository.save(design);
        }
        return StatusOfQuotationOrDesign.<DesignStatus>builder()
                .id(design.getDesignId())
                .status(design.getDesignStatus())
                .build();
    }

    public StatusOfQuotationOrDesign<QuotationStatus> confirmQuotation(CustomerConfirmRequest<QuotationStatus> request, String constructionOrderId, String accountId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow();
        Quotation quotation = quotationRepository.findById(order.getQuotationId()).orElseThrow();
        if (request.getStatus().equals(QuotationStatus.CONFIRMED)) {
            order.setStatus(ConstructionOrderStatus.CONFIRMED_QUOTATION);
            constructOrderRepository.save(order);
            Customer customer = customerRepository.findByAccountId(accountId).orElseThrow();
            PaymentOrder paymentOrder = PaymentOrder.builder()
                    .orderId(constructionOrderId)
                    .customerId(customer.getCustomerId())
                    .paymentTitle("Khach hang thanh toan giai doan 1")
                    .total(quotation.getPriceStage1())
                    .status(PaymentStatus.PENDING)
                    .build();
            paymentOrderRepository.save(paymentOrder);
        } else {
            quotation.setQuotationStatus(QuotationStatus.REJECTED);
            quotationRepository.save(quotation);
        }
        return StatusOfQuotationOrDesign.<QuotationStatus>builder()
                .id(quotation.getQuotationId())
                .status(quotation.getQuotationStatus())
                .build();
    }

    public CustomerViewPaymentResponse viewPaymentConstruction(String constructionOrderId, String accountId) {
        Customer customer = customerRepository.findByAccountId(accountId).orElseThrow();
        List<PaymentOrder> paymentOrders = paymentOrderRepository.findByOrderId(constructionOrderId);
        List<PaymentInfoResponse> paymentInfoResponses = new ArrayList<>();
        for (PaymentOrder paymentOrder : paymentOrders) {
            PaymentInfoResponse response = PaymentInfoResponse.builder()
                    .paymentId(paymentOrder.getPaymentId())
                    .paidDate(paymentOrder.getDate())
                    .price(paymentOrder.getTotal())
                    .paymentTitle(paymentOrder.getPaymentTitle())
                    .paymentStatus(paymentOrder.getStatus())
                    .build();
            paymentInfoResponses.add(response);
        }
        return CustomerViewPaymentResponse.builder()
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .paymentInfoResponseList(paymentInfoResponses)
                .build();
    }

    public CustomerViewPaymentResponse viewPayment(String constructionOrderId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow();
        Customer customer = customerRepository.findById(order.getCustomerId()).orElseThrow();
        List<PaymentOrder> paymentOrders = paymentOrderRepository.findByOrderId(constructionOrderId);
        List<PaymentInfoResponse> paymentInfoResponses = new ArrayList<>();
        for (PaymentOrder paymentOrder : paymentOrders) {
            PaymentInfoResponse response = PaymentInfoResponse.builder()
                    .paymentId(paymentOrder.getPaymentId())
                    .paidDate(paymentOrder.getDate())
                    .price(paymentOrder.getTotal())
                    .paymentTitle(paymentOrder.getPaymentTitle())
                    .paymentStatus(paymentOrder.getStatus())
                    .build();
            paymentInfoResponses.add(response);
        }
        return CustomerViewPaymentResponse.builder()
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .paymentInfoResponseList(paymentInfoResponses)
                .build();
    }


    public CustomerViewProgressResponse viewProgress(String constructionOrderId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow();
        List<ConstructionTasks> constructionTasksList = constructionTasksRepository
                .findByConstructionOrderId(constructionOrderId).orElseThrow();
        List<ListConstructProgressResponse> listConstructProgressResponses = new ArrayList<>();
        for (ConstructionTasks constructionTasks : constructionTasksList) {
            ConstructionTaskStaff taskStaff = constructionTaskStaffRepository.findById(constructionTasks.getTaskId())
                    .orElse(null);
            PackageConstruction packageConstruction = packageConstructionRepository
                    .findById(constructionTasks.getPackageConstructionId()).orElseThrow();
            ListConstructProgressResponse statusResponse = ListConstructProgressResponse.builder()
                    .packageConstructionId(constructionTasks.getPackageConstructionId())
                    .taskId(constructionTasks.getTaskId())
                    .content(packageConstruction.getContent())
                    .status(constructionTasks.getStatus())
                    .build();
            if (taskStaff != null) {
                statusResponse.setStaffName(staffRepository.findById(taskStaff.getStaffId()).orElseThrow().getStaffName());
            } else {
                statusResponse.setStaffName("");
            }
            listConstructProgressResponses.add(statusResponse);
        }
        return CustomerViewProgressResponse.builder()
                .constructionOrderId(constructionOrderId)
                .listConstructProgressResponses(listConstructProgressResponses)
                .constructionOrderStatus(order.getStatus())
                .status(order.getStatus())
                .build();
    }

    public ConstructionOrderStatus finishConstructOrder(String constructionOrderId, FinishConstructRequest request, String accountId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow();
        order.setStatus(request.getStatus());
        constructOrderRepository.save(order);
        Customer customer = customerRepository.findByAccountId(accountId).orElseThrow();
        Quotation quotation = quotationRepository.findById(order.getQuotationId()).orElseThrow();
        PaymentOrder paymentOrder = PaymentOrder.builder()
                .orderId(constructionOrderId)
                .customerId(customer.getCustomerId())
                .paymentTitle("Khach hang thanh toan giai doan 3")
                .total(quotation.getPriceStage3())
                .status(PaymentStatus.PENDING)
                .build();
        paymentOrderRepository.save(paymentOrder);
        return order.getStatus();
    }

//    Customer identifyCustomer() {
//        var context = SecurityContextHolder.getContext();
//        String accountId = context.getAuthentication().getName();
//        return customerRepository.findByAccountId(accountId)
//                .orElseThrow(() -> new RuntimeException("Customer not found"));
//    }

}
