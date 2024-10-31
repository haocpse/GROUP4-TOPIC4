package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.responses.*;
import com.swp_group4.back_end.services.DashboardService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class DashboardController {

    @Autowired
    DashboardService dashboardService;

    @GetMapping("/dashboard/projects/year")
    public ApiResponse<ProjectDashboardResponse> dashboardProjectsByYear() {
        return ApiResponse.<ProjectDashboardResponse>builder()
                .data(dashboardService.getDashboardProjectsByYear())
                .build();
    }

    @GetMapping("/dashboard/projects/month")
    public ApiResponse<ProjectDashboardResponse> dashboardProjectsByMonth(@RequestParam int year) {
        return ApiResponse.<ProjectDashboardResponse>builder()
                .data(dashboardService.getDashboardProjectsByMonth(year))
                .build();
    }

    @GetMapping("/dashboard/inProgressProjects")
    public ApiResponse<InProgressProjectDashboardResponse> dashboardInProgressProjects() {
        return ApiResponse.<InProgressProjectDashboardResponse>builder()
                .data(dashboardService.getDashboardInProgressProjects())
                .build();
    }

    @GetMapping("/dashboard/monthlyRevenue")
    public ApiResponse<MonthlyRevenueDashboardResponse> dashboardMonthlyRevenue(@RequestParam int year) {
        return ApiResponse.<MonthlyRevenueDashboardResponse>builder()
                .data(dashboardService.getDashboardMonthlyRevenue(year))
                .build();
    }

    @GetMapping("/dashboard/yearlyRevenue")
    public ApiResponse<YearlyRevenueDashboardResponse> dashboardYearlyRevenue() {
        return ApiResponse.<YearlyRevenueDashboardResponse>builder()
                .data(dashboardService.getDashboardYearlyRevenue())
                .build();
    }

}
