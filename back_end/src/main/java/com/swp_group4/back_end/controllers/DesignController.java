package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.Design;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.enums.DesignStatus;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.ConstructOrderDetailForStaffResponse;
import com.swp_group4.back_end.responses.ViewRejectedDesignResponse;
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
    public ApiResponse<List<ConstructOrderDetailForStaffResponse<ConstructionOrderStatus>>> listTask() {
        return ApiResponse.<List<ConstructOrderDetailForStaffResponse<ConstructionOrderStatus>>>builder()
                .data(designService.listOwnedDesignTask())
                .build();
    }

    @GetMapping("/designs")
    public ApiResponse<List<ConstructOrderDetailForStaffResponse<DesignStatus>>> listDesign() {
        return ApiResponse.<List<ConstructOrderDetailForStaffResponse<DesignStatus>>>builder()
                .data(designService.listDesign())
                .build();
    }

    // Hàm để DESIGNER thông tin Construction Order
    // (Construction Order đang ở trạng thái DESIGNING)
    @GetMapping("/ownedTasks/{constructionOrderId}")
    public ApiResponse<ConstructOrderDetailForStaffResponse<ConstructionOrderStatus>> detailTask(@PathVariable String constructionOrderId) {
        return ApiResponse.<ConstructOrderDetailForStaffResponse<ConstructionOrderStatus>>builder()
                .data(designService.constructionOrderStatusConstructOrderDetailForStaffResponse(constructionOrderId))
                .build();
    }

    @GetMapping("/designs/{designId}")
    public ApiResponse<ViewRejectedDesignResponse> detailRejectedDesign(@PathVariable String designId) {
        return ApiResponse.<ViewRejectedDesignResponse>builder()
                .data(designService.viewRejectedDesign(designId))
                .build();
    }

    @PutMapping("/designs/{designId}")
    public ApiResponse<Design> detailRejectedDesign(@PathVariable String designId,
                                                    @RequestParam(value = "image2D", required = false) MultipartFile image2D,
                                                    @RequestParam(value = "image3D", required = false) MultipartFile image3D,
                                                    @RequestParam(value = "frontView", required = false) MultipartFile frontView) {
        return ApiResponse.<Design>builder()
                .data(designService.updateDesign(designId,image2D, image3D, frontView))
                .build();
    }

    // Hàm để DESIGNER upload các ảnh design
    // (Construction Order đang ở trạng thái DESIGNED)
    @PostMapping("/ownedTasks/{constructionOrderId}")
    public ApiResponse<Design> uploadDesign(@PathVariable String constructionOrderId, @RequestParam("image2D") MultipartFile image2D,
                                                                                      @RequestParam("image3D") MultipartFile image3D,
                                                                                      @RequestParam("frontView") MultipartFile frontView ) {
//                                                                                      @RequestParam("rearView") MultipartFile rearView) {
        return ApiResponse.<Design>builder()
                .data(designService.saveDesign(constructionOrderId,image2D, image3D, frontView))
                .build();
    }


}
