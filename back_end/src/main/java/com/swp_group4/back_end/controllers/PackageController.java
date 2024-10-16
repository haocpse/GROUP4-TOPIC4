package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.Packages;
import com.swp_group4.back_end.requests.PackageCreateRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.PackageResponse;
import com.swp_group4.back_end.services.PackageService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/manage/package")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PackageController {
    @Autowired
    PackageService packageService;

    @GetMapping
    public ApiResponse<PackageResponse> getAllPackages() {
        return ApiResponse.<PackageResponse>builder()
                .data(packageService.getAllPackage())
                .build();
    }

    @PostMapping
    public ApiResponse<Packages> createPackage(@RequestBody PackageCreateRequest request) {
        return ApiResponse.<Packages>builder()
                .data(packageService.createPackage(request))
                .build();
    }

    @PutMapping("/{packageId}")
    public ApiResponse<Packages> updatePackage(@PathVariable String packageId, @RequestBody PackageCreateRequest request) {
        return ApiResponse.<Packages>builder()
                .data(packageService.updatePackage(packageId, request))
                .build();
    }

    @DeleteMapping("/{packageId}")
    public ApiResponse<Packages> deletePackage(@PathVariable String packageId) {
        return ApiResponse.<Packages>builder()
                .data(packageService.deletePackage(packageId))
                .build();
    }
}
