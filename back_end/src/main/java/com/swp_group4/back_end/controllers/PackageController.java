package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.Packages;
import com.swp_group4.back_end.requests.PackageConstructionCreateRequest;
import com.swp_group4.back_end.requests.PackageCreateRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.PackageResponse;
import com.swp_group4.back_end.services.PackageService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("/manage/package")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PackageController {
    @Autowired
    PackageService packageService;

    //hàm liệt kê các package
    @GetMapping
    public ApiResponse<PackageResponse> getAllPackages() {
        return ApiResponse.<PackageResponse>builder()
                .data(packageService.getAllPackage())
                .build();
    }

    //Hàm thêm package
    @PostMapping
    public ApiResponse<Packages> createPackage(@RequestBody PackageCreateRequest request) {
        return ApiResponse.<Packages>builder()
                .data(packageService.createPackage(request))
                .build();
    }

    //Hàm chỉnh sửa package
    @PutMapping("/{packageId}")
    public ApiResponse<Packages> updatePackage(@PathVariable String packageId, @RequestBody PackageCreateRequest request) {
        return ApiResponse.<Packages>builder()
                .data(packageService.updatePackage(packageId, request))
                .build();
    }

    //Hàm xoá package
    @DeleteMapping("/{packageId}")
    public ApiResponse<Packages> deletePackage(@PathVariable String packageId) {
        return ApiResponse.<Packages>builder()
                .data(packageService.deletePackage(packageId))
                .build();
    }

    //Hàm chỉnh sửa package construction trong 1 package
    @PutMapping("/constructionPackage/{packageId}")
    public ApiResponse<Packages> updateConstructionPackage(@PathVariable String packageId, @RequestBody PackageConstructionCreateRequest request) {
        return ApiResponse.<Packages>builder()
                .data(packageService.updateConstructionPackage(packageId, request))
                .build();
    }

}
