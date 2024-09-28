package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConsultConstructResponse;
import com.swp_group4.back_end.services.ConsultationService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consult")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ConsultationController {

    @Autowired
    ConsultationService consultationService;

    @GetMapping("/owned-tasks")
    public ApiResponse<List<ConsultConstructResponse>> listTask() {
        return ApiResponse.<List<ConsultConstructResponse>>builder()
                .data(consultationService.listOwnedTask())
                .build();
    }

//    @GetMapping("/owned-tasks/{constructionOrderId}")
//    public ApiResponse<> detailTask(@PathVariable String constructionOrderId) {
//
//    }
//
//    @PostMapping("/owned-tasks/{constructionOrderId}/export-quotation")
//    public ApiResponse<> exportQuotation(@RequestBody ){
//
//    }


}
