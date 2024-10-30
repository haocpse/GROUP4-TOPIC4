package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.Packages;
import com.swp_group4.back_end.entities.PaymentOrder;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.enums.PaymentStatus;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.responses.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Service
@Slf4j
public class DashboardService {

    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    private PackageRepository packageRepository;
    @Autowired
    private QuotationRepository quotationRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private PaymentOrderRepository paymentOrderRepository;

    public ProjectDashboardResponse getDashboardProjects() {
        long allOrder = constructOrderRepository.findAll().size();
        long successOrder = constructOrderRepository.findByStatus(ConstructionOrderStatus.FINISHED).size();
        long failOrder = constructOrderRepository.findByStatus(ConstructionOrderStatus.CANCELLED).size();
        long inProgressOrder = constructOrderRepository.findByStatusNotIn(List.of(ConstructionOrderStatus.FINISHED, ConstructionOrderStatus.CANCELLED)).size();
        long allOrdersHaveQuotation = constructOrderRepository.findByQuotationIdIsNotNullAndStatusNot(ConstructionOrderStatus.CONSULTING).size();
        List<Packages> packages = packageRepository.findAll();
        List<PackageDashboardResponse> packageDashboardResponses = new ArrayList<>();
        for (Packages p : packages) {
            long numberOfPackage = quotationRepository.findByPackageId(p.getPackageId()).size();
            PackageDashboardResponse packageDashboardResponse = PackageDashboardResponse.builder()
                    .packageType(p.getPackageType())
                    .usePercentage((double) numberOfPackage / allOrdersHaveQuotation)
                    .build();
            packageDashboardResponses.add(packageDashboardResponse);
        }
        return ProjectDashboardResponse.builder()
                .totalProjects(allOrder)
                .successPercentage(((double) successOrder / allOrder))
                .failedPercentage(((double) failOrder / allOrder))
                .inProgressPercentage(((double) inProgressOrder / allOrder))
                .PackageDashboardResponses(packageDashboardResponses)
                .build();
    }

    public InProgressProjectDashboardResponse getDashboardInProgressProjects() {
        List<ConstructionOrderStatus> statusList = List.of(
                ConstructionOrderStatus.REQUESTED,
                ConstructionOrderStatus.CONSULTING,
                ConstructionOrderStatus.CONFIRMED_QUOTATION,
                ConstructionOrderStatus.PAID_STAGE_1,
                ConstructionOrderStatus.DESIGNING,
                ConstructionOrderStatus.CONFIRMED_DESIGN,
                ConstructionOrderStatus.PAID_STAGE_2,
                ConstructionOrderStatus.CONSTRUCTING,
                ConstructionOrderStatus.CONSTRUCTED,
                ConstructionOrderStatus.PAID_STAGE_3
        );
        List<ConstructionOrder> inProgressOrder = constructOrderRepository.findByStatusNotIn(List.of(ConstructionOrderStatus.FINISHED, ConstructionOrderStatus.CANCELLED));
        List<InProgressProjectInfoDashboardResponse> responses = new ArrayList<>();
        for (ConstructionOrder c : inProgressOrder) {
            Customer customer = customerRepository.findById(c.getCustomerId()).orElseThrow();
            InProgressProjectInfoDashboardResponse response = InProgressProjectInfoDashboardResponse.builder()
                    .nameOfOrder(customer.getFirstName() + " " + customer.getLastName() + " " + customer.getPhone().substring(customer.getPhone().length() - 3))
                    .status(c.getStatus())
                    .build();
            responses.add(response);
        }
        return InProgressProjectDashboardResponse.builder()
                .statusList(statusList)
                .projectInfoDashboardResponseList(responses)
                .build();
    }

    public MonthlyRevenueDashboardResponse getDashboardMonthlyRevenue(int year) {
        List<MonthlyRevenueInfoDashboardResponse> responses = new ArrayList<>();
        List<PaymentOrder> payments = paymentOrderRepository.findByYearAndStatus(year, PaymentStatus.SUCCESS);
        log.info(payments.toString());
        long total = 0;
        for (int i = 1; i <= 12; i++) {
            long revenue = 0;

            for (PaymentOrder payment : payments) {
                int month = payment.getPaidDate().getMonthValue();
                if (month == i) {
                    revenue += payment.getTotal();
                }
            }
            total += revenue;
            MonthlyRevenueInfoDashboardResponse response = MonthlyRevenueInfoDashboardResponse.builder()
                    .month(i)
                    .revenue(revenue)
                    .build();
            responses.add(response);
        }
        return MonthlyRevenueDashboardResponse.builder()
                .total(total)
                .monthlyRevenueInfoDashboardResponseList(responses)
                .build();
    }

    public YearlyRevenueDashboardResponse getDashboardYearlyRevenue() {
        List<YearlyRevenueInfoDashboardResponse> responses = new ArrayList<>();
        PaymentOrder oldestPayment = paymentOrderRepository.findByStatusOrderedByPaidDateDesc(PaymentStatus.SUCCESS).getFirst();
        int oldestYear = oldestPayment.getPaidDate().getYear();
        PaymentOrder lastPayment = paymentOrderRepository.findByStatusOrderedByPaidDateAsc(PaymentStatus.SUCCESS).getFirst();
        int lastYear = lastPayment.getPaidDate().getYear();
        List<PaymentOrder> paymentOrders = paymentOrderRepository.findByStatus(PaymentStatus.SUCCESS);
        long total = 0;
        for (int i = oldestYear; i <= lastYear; i++) {
            long totalRevenue = 0;
            for (PaymentOrder payment : paymentOrders) {
                if (payment.getPaidDate().getYear() == i) {
                    totalRevenue +=  payment.getTotal();
                }
            }
            YearlyRevenueInfoDashboardResponse response = YearlyRevenueInfoDashboardResponse.builder()
                    .year(i)
                    .totalRevenue(totalRevenue)
                    .build();
            responses.add(response);
            total += totalRevenue;
        }
        return YearlyRevenueDashboardResponse.builder()
                .total(total)
                .yearlyRevenueInfoDashboardResponseList(responses)
                .build();
    }

//    public DashboardResponse getDashboard() {
//
//    }
}
