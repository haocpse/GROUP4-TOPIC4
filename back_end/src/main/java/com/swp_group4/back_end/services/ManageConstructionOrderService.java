package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.ConstructStatus;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.mapper.*;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.*;
import com.swp_group4.back_end.responses.*;
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
public class ManageConstructionOrderService {

    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    ConstructionOrderMapper constructionOrderMapper;
    @Autowired
    CustomerMapper customerMapper;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    PackageRepository packageRepository;
    @Autowired
    QuotationRepository quotationRepository;
    @Autowired
    ConstructionTasksRepository constructionTasksRepository;
    @Autowired
    PackageConstructionRepository packageConstructionRepository;
    @Autowired
    ConstructionTaskStaffRepository constructionTaskStaffRepository;
    @Autowired
    PaymentOrderRepository paymentOrderRepository;
    @Autowired
    ConstructionTasksMapper constructionTasksMapper;
    @Autowired
    PaymentMapper paymentMapper;
    private DesignRepository designRepository;

    public List<ConstructOrderDetailForManagerResponse> listAllOrder() {
        List<ConstructOrderDetailForManagerResponse> responses = new ArrayList<>();
        List<ConstructionOrder> constructionOrders = constructOrderRepository.findAll();
        for (ConstructionOrder constructionOrder : constructionOrders) {
            Customer customer = this.findCustomerById(constructionOrder.getCustomerId());
            ConstructOrderDetailForManagerResponse response = this.buildConstructOrderDetailForManagerResponse(constructionOrder, customer);
            if (constructionOrder.getQuotationId() != null) {
                String type = packageRepository.findById(quotationRepository.findById(constructionOrder.getQuotationId())
                                .orElseThrow().getPackageId())
                        .orElseThrow().getPackageType();
                response.setPackageType(type);
            }
            responses.add(response);
        }
        return responses;
    }

    public ConstructOrderDetailForManagerResponse assignLeader(StaffAssignedRequest request) {
        ConstructionOrder order = this.findConstructOrder(request.getConstructionOrderId());
        Customer customer = this.findCustomerById(order.getCustomerId());
        constructOrderRepository.save(constructionOrderMapper.toConstructionOrder(request, order));
        return this.buildConstructOrderDetailForManagerResponse(order, customer);
    }

    ConstructOrderDetailForManagerResponse buildConstructOrderDetailForManagerResponse(ConstructionOrder order, Customer customer) {
        ConstructOrderDetailForManagerResponse response = ConstructOrderDetailForManagerResponse.builder()
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .build();
        if (!order.getQuotationId().isEmpty()) {
            Quotation quotation = quotationRepository.findById(order.getQuotationId()).orElseThrow();
            response.setQuotationStatus(quotation.getQuotationStatus());
        }
        if (!order.getDesignId().isEmpty()) {
            Design design = designRepository.findById(order.getDesignId()).orElseThrow();
            response.setDesignStatus(design.getDesignStatus());
        }
        constructionOrderMapper.toDetailForManager(order, response);
        customerMapper.toDetailForManager(customer, response);
        return response;
    }


    Customer findCustomerById(String customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    ConstructionOrder findConstructOrder(String constructionOrderId) {
        return constructOrderRepository.findById(constructionOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<ProgressReviewResponse> listAllConstructionProgress() {
        List<ConstructionOrder> constructionOrders = constructOrderRepository.findAll();
        List<ProgressReviewResponse> responses = new ArrayList<>();
        for (ConstructionOrder constructionOrder : constructionOrders) {
            List<ConstructStatus> statuses = List.of(ConstructStatus.NOT_YET, ConstructStatus.IN_PROGRESS);
            List<ConstructionTasks> listInCompleteTasks = constructionTasksRepository.findByConstructionOrderIdAndStatusIn(constructionOrder.getConstructionOrderId(), statuses);
            Staff staff = staffRepository.findById(constructionOrder.getConstructorLeaderId()).orElseThrow();
            Customer customer = findCustomerById(constructionOrder.getCustomerId());
            ProgressReviewResponse response = ProgressReviewResponse.builder()
                    .leaderName(staff.getStaffName())
                    .customerName(customer.getFirstName() + " " + customer.getLastName())
                    .build();
            if (listInCompleteTasks.isEmpty()) {
                response.setStatus(ConstructionOrderStatus.CONSTRUCTED);
            } else {
                response.setStatus(ConstructionOrderStatus.CONSTRUCTING);
            }
            responses.add(constructionOrderMapper.toProgressReviewResponse(constructionOrder, response));
        }
        return responses;
    }

    public ViewProgressResponse detailProgress(String constructionOrderId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow();
        List<ListConstructProgressResponse> listConstructProgressResponses = new ArrayList<>();
        List<ConstructionTasks> constructionTasks = constructionTasksRepository.findByConstructionOrderId(constructionOrderId).orElseThrow();
        for (ConstructionTasks constructionTask : constructionTasks) {
            String content = packageConstructionRepository.findById(constructionTask.getPackageConstructionId()).orElseThrow().getContent();
            ListConstructProgressResponse response = ListConstructProgressResponse.builder()
                    .content(content)
                    .build();
            listConstructProgressResponses.add(constructionTasksMapper.toListConstructProgressResponse(constructionTask, response));
        }
        List<String> staffNames = constructionTaskStaffRepository.findStaffNamesByTaskId(constructionTasks.getFirst().getTaskId());
        return ViewProgressResponse.builder()
                .constructionOrderId(constructionOrderId)
                .listConstructProgressResponses(listConstructProgressResponses)
                .staffNames(staffNames)
                .status(order.getStatus())
                .build();
    }

    public List<PaymentReviewResponse> listAllPayments() {
        List<ConstructionOrder> constructionOrders = constructOrderRepository.findAll();
        List<PaymentReviewResponse> responses = new ArrayList<>();
        for (ConstructionOrder constructionOrder : constructionOrders) {
            Customer customer = findCustomerById(constructionOrder.getCustomerId());
            PaymentReviewResponse response = PaymentReviewResponse.builder()
                    .constructionOrderId(constructionOrder.getConstructionOrderId())
                    .customerName(customer.getFirstName() + " " + customer.getLastName())
                    .phone(customer.getPhone())
                    .address(customer.getAddress())
                    .total(constructionOrder.getTotal())
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public ViewPaymentResponse getPayments(String constructionOrderId) {
        List<PaymentInfoResponse> paymentInfoResponses = new ArrayList<>();
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow();
        List<PaymentOrder> paymentOrders = paymentOrderRepository.findByOrderId(constructionOrderId);
        Customer customer = customerRepository.findById(order.getCustomerId()).orElseThrow();
        Quotation quotation = quotationRepository.findById(order.getQuotationId()).orElseThrow();
        int count = 0;
        if (!paymentOrders.isEmpty()) {
            count = 1;
            for (PaymentOrder paymentOrder : paymentOrders) {
                PaymentInfoResponse infoResponse = new PaymentInfoResponse();
                if (count == 1) {
                    infoResponse.setPrice((long) (order.getTotal() * quotation.getPercentageStage1()));
                }
                else if (count == 2) {
                    infoResponse.setPrice((long) (order.getTotal() * quotation.getPercentageStage2()));
                } else {
                    infoResponse.setPrice((long) (order.getTotal() * quotation.getPercentageStage3()));
                }
                paymentInfoResponses.add(paymentMapper.toPaymentInfoResponse(paymentOrder, infoResponse));
                count++;
            }
        }
        return ViewPaymentResponse.builder()
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .paymentInfoResponseList(paymentInfoResponses)
                .build();
    }

    public List<ConstructOrderDetailForManagerResponse> listAllOrderByStatus(String status) {
        List<ConstructOrderDetailForManagerResponse> responses = new ArrayList<>();
        if (status.equals("requested")) {
            List<ConstructionOrder> constructionOrders = constructOrderRepository.findByStatus(ConstructionOrderStatus.REQUESTED);
            for (ConstructionOrder constructionOrder : constructionOrders) {
                Customer customer = this.findCustomerById(constructionOrder.getCustomerId());
                ConstructOrderDetailForManagerResponse response = this.buildConstructOrderDetailForManagerResponse(constructionOrder, customer);
                if (constructionOrder.getQuotationId() != null) {
                    String type = packageRepository.findById(quotationRepository.findById(constructionOrder.getQuotationId())
                                    .orElseThrow().getPackageId())
                            .orElseThrow().getPackageType();
                    response.setPackageType(type);
                }
                responses.add(response);
            }
        } else if (status.equals("consulting")) {
            List<ConstructionOrder> constructionOrders = constructOrderRepository.findByStatus(ConstructionOrderStatus.CONSULTING);
            for (ConstructionOrder constructionOrder : constructionOrders) {
                Customer customer = this.findCustomerById(constructionOrder.getCustomerId());
                ConstructOrderDetailForManagerResponse response = this.buildConstructOrderDetailForManagerResponse(constructionOrder, customer);
                if (constructionOrder.getQuotationId() != null) {
                    String type = packageRepository.findById(quotationRepository.findById(constructionOrder.getQuotationId())
                                    .orElseThrow().getPackageId())
                            .orElseThrow().getPackageType();
                    response.setPackageType(type);
                }
                responses.add(response);
            }
        } else if (status.equals("designing")) {
            List<ConstructionOrder> constructionOrders = constructOrderRepository.findByStatus(ConstructionOrderStatus.DESIGNING);
            for (ConstructionOrder constructionOrder : constructionOrders) {
                Customer customer = this.findCustomerById(constructionOrder.getCustomerId());
                ConstructOrderDetailForManagerResponse response = this.buildConstructOrderDetailForManagerResponse(constructionOrder, customer);
                if (constructionOrder.getQuotationId() != null) {
                    String type = packageRepository.findById(quotationRepository.findById(constructionOrder.getQuotationId())
                                    .orElseThrow().getPackageId())
                            .orElseThrow().getPackageType();
                    response.setPackageType(type);
                }
                responses.add(response);
            }
        } else if (status.equals("constructing")) {
            List<ConstructionOrder> constructionOrders = constructOrderRepository.findByStatus(ConstructionOrderStatus.CONSTRUCTING);
            for (ConstructionOrder constructionOrder : constructionOrders) {
                Customer customer = this.findCustomerById(constructionOrder.getCustomerId());
                ConstructOrderDetailForManagerResponse response = this.buildConstructOrderDetailForManagerResponse(constructionOrder, customer);
                if (constructionOrder.getQuotationId() != null) {
                    String type = packageRepository.findById(quotationRepository.findById(constructionOrder.getQuotationId())
                                    .orElseThrow().getPackageId())
                            .orElseThrow().getPackageType();
                    response.setPackageType(type);
                }
                responses.add(response);
            }
        } else if (status.equals("paid_1")) {
            List<ConstructionOrder> constructionOrders = constructOrderRepository.findByStatus(ConstructionOrderStatus.PAID_STAGE_1);
            for (ConstructionOrder constructionOrder : constructionOrders) {
                Customer customer = this.findCustomerById(constructionOrder.getCustomerId());
                ConstructOrderDetailForManagerResponse response = this.buildConstructOrderDetailForManagerResponse(constructionOrder, customer);
                if (constructionOrder.getQuotationId() != null) {
                    String type = packageRepository.findById(quotationRepository.findById(constructionOrder.getQuotationId())
                                    .orElseThrow().getPackageId())
                            .orElseThrow().getPackageType();
                    response.setPackageType(type);
                }
                responses.add(response);
            }
        } else if (status.equals("paid_2")) {
            List<ConstructionOrder> constructionOrders = constructOrderRepository.findByStatus(ConstructionOrderStatus.PAID_STAGE_2);
            for (ConstructionOrder constructionOrder : constructionOrders) {
                Customer customer = this.findCustomerById(constructionOrder.getCustomerId());
                ConstructOrderDetailForManagerResponse response = this.buildConstructOrderDetailForManagerResponse(constructionOrder, customer);
                if (constructionOrder.getQuotationId() != null) {
                    String type = packageRepository.findById(quotationRepository.findById(constructionOrder.getQuotationId())
                                    .orElseThrow().getPackageId())
                            .orElseThrow().getPackageType();
                    response.setPackageType(type);
                }
                responses.add(response);
            }
        } else if (status.equals("paid_3")) {
            List<ConstructionOrder> constructionOrders = constructOrderRepository.findByStatus(ConstructionOrderStatus.PAID_STAGE_3);
            for (ConstructionOrder constructionOrder : constructionOrders) {
                Customer customer = this.findCustomerById(constructionOrder.getCustomerId());
                ConstructOrderDetailForManagerResponse response = this.buildConstructOrderDetailForManagerResponse(constructionOrder, customer);
                if (constructionOrder.getQuotationId() != null) {
                    String type = packageRepository.findById(quotationRepository.findById(constructionOrder.getQuotationId())
                                    .orElseThrow().getPackageId())
                            .orElseThrow().getPackageType();
                    response.setPackageType(type);
                }
                responses.add(response);
            }
        } else if (status.equals("constructed")) {
            List<ConstructionOrder> constructionOrders = constructOrderRepository.findByStatus(ConstructionOrderStatus.CONSTRUCTED);
            for (ConstructionOrder constructionOrder : constructionOrders) {
                Customer customer = this.findCustomerById(constructionOrder.getCustomerId());
                ConstructOrderDetailForManagerResponse response = this.buildConstructOrderDetailForManagerResponse(constructionOrder, customer);
                if (constructionOrder.getQuotationId() != null) {
                    String type = packageRepository.findById(quotationRepository.findById(constructionOrder.getQuotationId())
                                    .orElseThrow().getPackageId())
                            .orElseThrow().getPackageType();
                    response.setPackageType(type);
                }
                responses.add(response);
            }
        } else if (status.equals("confirm_quotation")) {
            List<ConstructionOrder> constructionOrders = constructOrderRepository.findByStatus(ConstructionOrderStatus.CONFIRMED_QUOTATION);
            for (ConstructionOrder constructionOrder : constructionOrders) {
                Customer customer = this.findCustomerById(constructionOrder.getCustomerId());
                ConstructOrderDetailForManagerResponse response = this.buildConstructOrderDetailForManagerResponse(constructionOrder, customer);
                if (constructionOrder.getQuotationId() != null) {
                    String type = packageRepository.findById(quotationRepository.findById(constructionOrder.getQuotationId())
                                    .orElseThrow().getPackageId())
                            .orElseThrow().getPackageType();
                    response.setPackageType(type);
                }
                responses.add(response);
            }
        } else if (status.equals("confirm_design")) {
            List<ConstructionOrder> constructionOrders = constructOrderRepository.findByStatus(ConstructionOrderStatus.CONFIRMED_DESIGN);
            for (ConstructionOrder constructionOrder : constructionOrders) {
                Customer customer = this.findCustomerById(constructionOrder.getCustomerId());
                ConstructOrderDetailForManagerResponse response = this.buildConstructOrderDetailForManagerResponse(constructionOrder, customer);
                if (constructionOrder.getQuotationId() != null) {
                    String type = packageRepository.findById(quotationRepository.findById(constructionOrder.getQuotationId())
                                    .orElseThrow().getPackageId())
                            .orElseThrow().getPackageType();
                    response.setPackageType(type);
                }
                responses.add(response);
            }
        }
        return responses;
    }

    //    public ServiceResponse<MaintenanceOrderResponse> contactUsForMaintenance(ServiceRequest serviceRequest) {
    // Your logic for maintenance service...
    //    }

}
