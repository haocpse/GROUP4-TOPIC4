package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.Packages;
import com.swp_group4.back_end.requests.PackageCreateRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.services.PackageService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/manage/package")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PackageController {
    @Autowired
    PackageService packageService;

    @GetMapping
    public List<Packages> getAllPackages() {
        return packageService.getAllPackage();
    }

    @PostMapping
    public Packages createPackage(@RequestBody PackageCreateRequest request) {
        return packageService.createPackage(request);
    }

    @PutMapping("/{packageId}")
    public Packages updatePackage(@PathVariable String packageId, @RequestBody PackageCreateRequest request) {
        return packageService.updatePackage(packageId, request);
    }

    @DeleteMapping("/{packageId}")
    public void deletePackage(@PathVariable String packageId) {
        packageService.deletePackage(packageId);
    }
}
