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

    public ProjectDashboardResponse getDashboardProjectsByYear() {
        List<ProjectInfoBaseTimeResponse> projectInfoBaseTimeResponses = new ArrayList<>();
        List<PackageDashboardResponse> packageDashboardResponses = new ArrayList<>();
        ConstructionOrder firstOrder = constructOrderRepository.findByStatusOrderedByPaidDateDesc().getFirst();
        ConstructionOrder lastOrder = constructOrderRepository.findByStatusOrderedByPaidDateAsc().getFirst();
        int firstYear = firstOrder.getStartDate().getYear();
        int lastYear = lastOrder.getStartDate().getYear();
        for (int i = firstYear; i <= lastYear; i++) {
            int numberOfRequest = constructOrderRepository.findByYear(i).size();
            ProjectInfoBaseTimeResponse infoBaseTimeResponse = ProjectInfoBaseTimeResponse.builder()
                    .time(i)
                    .numberOfRequest(numberOfRequest)
                    .build();
            projectInfoBaseTimeResponses.add(infoBaseTimeResponse);
        }
        long allOrder = constructOrderRepository.findAll().size();
        long successOrder = constructOrderRepository.findByStatus(ConstructionOrderStatus.FINISHED).size();
        long failOrder = constructOrderRepository.findByStatus(ConstructionOrderStatus.CANCELLED).size();
        long inProgressOrder = constructOrderRepository.findByStatusNotIn(List.of(ConstructionOrderStatus.FINISHED, ConstructionOrderStatus.CANCELLED)).size();
        long allOrdersHaveQuotation = constructOrderRepository.findByQuotationIdIsNotNullAndStatusNot(ConstructionOrderStatus.CONSULTING).size();
        List<Packages> packages = packageRepository.findAll();
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
                .projectInfoBaseTimeResponses(projectInfoBaseTimeResponses)
                .PackageDashboardResponses(packageDashboardResponses)
                .build();
    }

    public ProjectDashboardResponse getDashboardProjectsByMonth(int year) {
        List<PackageDashboardResponse> packageDashboardResponses = new ArrayList<>();
        List<ProjectInfoBaseTimeResponse> projectInfoBaseTimeResponses = new ArrayList<>();
        List<ConstructionOrder> orders = constructOrderRepository.findByYear(year);
        for (int i = 1; i <= 12; i++) {
            int numberOfRequest = 0;
            for (ConstructionOrder order : orders) {
                if (order.getStartDate().getMonthValue() == i) {
                    numberOfRequest++;
                }
            }
            ProjectInfoBaseTimeResponse infoBaseTimeResponse = ProjectInfoBaseTimeResponse.builder()
                    .time(i)
                    .numberOfRequest(numberOfRequest)
                    .build();
            projectInfoBaseTimeResponses.add(infoBaseTimeResponse);
        }
        long allOrder = orders.size();
        long successOrder = constructOrderRepository.findByYearAndStatus(year, ConstructionOrderStatus.FINISHED).size();
        long failOrder = constructOrderRepository.findByYearAndStatus(year, ConstructionOrderStatus.CANCELLED).size();
        long inProgressOrder = constructOrderRepository.findByYearAndStatusNotIn(year, List.of(ConstructionOrderStatus.FINISHED, ConstructionOrderStatus.CANCELLED)).size();
        long allOrdersHaveQuotation = constructOrderRepository.findByYearAndQuotationIdIsNotNullAndStatusNot(year, ConstructionOrderStatus.CONSULTING).size();
        List<Packages> packages = packageRepository.findAll();
        for (Packages p : packages) {
            long numberOfPackage = quotationRepository.findByYearAndPackageId(year, p.getPackageId()).size();
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
                .projectInfoBaseTimeResponses(projectInfoBaseTimeResponses)
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
                    totalRevenue += payment.getTotal();
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

    private int getMonthFromDate(Date date) {
        LocalDate localDate = date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        return localDate.getMonthValue();
    }

//    public DashboardResponse getDashboard() {
//
//    }
}
