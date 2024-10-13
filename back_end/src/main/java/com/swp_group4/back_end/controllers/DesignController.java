package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.Design;
import com.swp_group4.back_end.requests.UrlDesignRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConstructOrderDetailForStaffResponse;
import com.swp_group4.back_end.services.DesignService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("/design")
public class DesignController {

    @Autowired
    DesignService designService;

    // Hàm để DESIGNER xem các task được gán bởi MANAGER
    // (Construction Order đang ở trạng thái DESIGNING)
    @GetMapping("/ownedTasks")
    public ApiResponse<List<ConstructOrderDetailForStaffResponse>> listTask() {
        return ApiResponse.<List<ConstructOrderDetailForStaffResponse>>builder()
                .data(designService.listOwnedDesignTask())
                .build();
    }

    // Hàm để DESIGNER thông tin Construction Order
    // (Construction Order đang ở trạng thái DESIGNING)
    @GetMapping("/ownedTasks/{constructionOrderId}")
    public ApiResponse<ConstructOrderDetailForStaffResponse> detailTask(@PathVariable String constructionOrderId) {
        return ApiResponse.<ConstructOrderDetailForStaffResponse>builder()
                .data(designService.detailOfOrder(constructionOrderId))
                .build();
    }

    // Hàm để DESIGNER upload các ảnh design
    // (Construction Order đang ở trạng thái DESIGNED)
    @PostMapping("/ownedTasks/{constructionOrderId}")
    public ApiResponse<Design> uploadDesign(@PathVariable String constructionOrderId, @RequestParam("image2D") MultipartFile image2D,
                                                                                      @RequestParam("image3D") MultipartFile image3D,
                                                                                      @RequestParam("frontView") MultipartFile frontView,
                                                                                      @RequestParam("rearView") MultipartFile rearView) {
        return ApiResponse.<Design>builder()
                .data(designService.saveDesign(constructionOrderId,image2D, image3D, frontView, rearView))
                .build();
    }


}
