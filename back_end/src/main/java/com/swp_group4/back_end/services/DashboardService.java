package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.Packages;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.CustomerRepository;
import com.swp_group4.back_end.repositories.PackageRepository;
import com.swp_group4.back_end.repositories.QuotationRepository;
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

    public List<MonthlyRevenueDashboardResponse> getDashboardMonthlyRevenue(int year) {
        List<MonthlyRevenueDashboardResponse> responses = new ArrayList<>();
        List<ConstructionOrder> order = constructOrderRepository.findByYearAndStatus(year, ConstructionOrderStatus.FINISHED);;
        for (int i = 1; i <= 12; i++) {
            long revenue = 0;
            long total = 0;
            for (ConstructionOrder c : order) {
                Date date = c.getConstructionEndDate();
                int month = getMonthFromDate(date);
                if (month == i) {
                    revenue += (long) c.getTotal();
                }
            }
            total += revenue;
            MonthlyRevenueDashboardResponse response = MonthlyRevenueDashboardResponse.builder()
                    .month(i)
                    .revenue(revenue)
                    .total(total)
                    .build();
            responses.add(response);
            i++;
        }
        return responses;
    }

    private int getMonthFromDate(Date date) {
        LocalDate localDate = date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        return localDate.getMonthValue(); // Returns the month (1-12)
    }

    public List<YearlyRevenueDashboardResponse> getDashboardYearlyRevenue() {
        List<YearlyRevenueDashboardResponse> responses = new ArrayList<>();
        ConstructionOrder oldestOrder = constructOrderRepository.findTopByConstructionEndDateDescAndStatus(ConstructionOrderStatus.FINISHED);
        ConstructionOrder lastOrder = constructOrderRepository.findTopByConstructionEndDateAscAndStatus(ConstructionOrderStatus.FINISHED);
        return responses;
    }

//    public DashboardResponse getDashboard() {
//
//    }
}
