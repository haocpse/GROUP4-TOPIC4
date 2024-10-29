package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.DashboardResponse;
import com.swp_group4.back_end.services.DashboardService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class DashboardController {

    @Autowired
    DashboardService dashboardService;

    @GetMapping("/dashboard")
    public ApiResponse<DashboardResponse> dashboard() {
        return ApiResponse.<DashboardResponse>builder()
                .data(dashboardService.getDashboard())
                .build();
    }

}
