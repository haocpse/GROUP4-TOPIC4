package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.PackageConstruction;
import com.swp_group4.back_end.entities.PackagePrice;
import com.swp_group4.back_end.entities.Packages;
import com.swp_group4.back_end.repositories.PackageConstructionRepository;
import com.swp_group4.back_end.repositories.PackagePriceRepository;
import com.swp_group4.back_end.repositories.PackageRepository;
import com.swp_group4.back_end.requests.PackageConstructionCreateRequest;
import com.swp_group4.back_end.requests.PackageConstructionRequest;
import com.swp_group4.back_end.requests.PackageCreateRequest;
import com.swp_group4.back_end.requests.PackagePriceRequest;
import com.swp_group4.back_end.responses.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.constraintvalidators.bv.time.past.PastValidatorForCalendar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class PackageService {


    @Autowired
    PackageRepository packageRepository;
    @Autowired
    PackageConstructionRepository packageConstructionRepository;
    @Autowired
    PackagePriceRepository packagePriceRepository;

    public PackageResponse getAllPackage() {
        List<Packages> packagesList = packageRepository.findAll();
        return PackageResponse.builder()
                .packagesList(packagesList)
                .build();
    }


    public Packages createPackage(PackageCreateRequest request) {
        Packages packages = Packages.builder()
                .packageType(request.getPackageType())
                .build();
        packageRepository.save(packages);
        for (PackagePriceRequest priceRequest : request.getPackagePrices()) {
            PackagePrice packagePrice = PackagePrice.builder()
                    .packageId(packages.getPackageId())
                    .minVolume(priceRequest.getMinVolume())
                    .maxVolume(priceRequest.getMaxVolume())
                    .price(priceRequest.getPrice())
                    .build();
            packagePriceRepository.save(packagePrice);
        }

//        for (PackageConstructionRequest constructionRequest : request.getPackageConstructions()) {
//            PackageConstruction packageConstruction = PackageConstruction.builder()
//                    .packageId(packages.getPackageId())
//                    .content(constructionRequest.getContent())
//                    .build();
//            packageConstructionRepository.save(packageConstruction);
//        }

        return packages;
    }

    public Packages updatePackage(String packageId, PackageCreateRequest request) {
        Optional<Packages> existingPackageOpt = packageRepository.findById(packageId);
        if (existingPackageOpt.isPresent()) {
            Packages packages = existingPackageOpt.get();
            packages.setPackageType(request.getPackageType());
            packageRepository.save(packages);

            List<PackagePrice> existingPrices = packagePriceRepository.findPackagePriceByPackageId(packageId);
            List<PackagePriceRequest> incomingPrices = request.getPackagePrices();

            for (PackagePriceRequest priceRequest : incomingPrices) {
                Optional<PackagePrice> existingPriceOpt = existingPrices.stream()
                        .filter(p -> p.getMinVolume() == priceRequest.getMinVolume() &&
                                p.getMaxVolume() == priceRequest.getMaxVolume())
                        .findFirst();

                if (existingPriceOpt.isPresent()) {
                    PackagePrice existingPrice = existingPriceOpt.get();
                    existingPrice.setPrice(priceRequest.getPrice());
                    packagePriceRepository.save(existingPrice);
                } else {
                    PackagePrice newPrice = PackagePrice.builder()
                            .packageId(packageId)
                            .minVolume(priceRequest.getMinVolume())
                            .maxVolume(priceRequest.getMaxVolume())
                            .price(priceRequest.getPrice())
                            .build();
                    packagePriceRepository.save(newPrice);
                }
            }

            List<PackagePrice> pricesToDelete = existingPrices.stream()
                    .filter(p -> incomingPrices.stream().noneMatch(
                            priceReq -> priceReq.getMinVolume() == p.getMinVolume() &&
                                    priceReq.getMaxVolume() == p.getMaxVolume()))
                    .collect(Collectors.toList());
            packagePriceRepository.deleteAll(pricesToDelete);

//            List<PackageConstruction> existingConstructions = packageConstructionRepository.findByPackageId(packageId);
//            List<PackageConstructionRequest> incomingConstructions = request.getPackageConstructions();
//
//            for (PackageConstructionRequest constructionRequest : incomingConstructions) {
//                Optional<PackageConstruction> existingConstructionOpt = existingConstructions.stream()
//                        .filter(c -> c.getContent().equals(constructionRequest.getContent()))
//                        .findFirst();
//
//                if (existingConstructionOpt.isPresent()) {
//                    PackageConstruction existingConstruction = existingConstructionOpt.get();
//                    packageConstructionRepository.save(existingConstruction);
//                } else {
//                    PackageConstruction newConstruction = PackageConstruction.builder()
//                            .packageId(packageId)
//                            .content(constructionRequest.getContent())
//                            .build();
//                    packageConstructionRepository.save(newConstruction);
//                }
//            }
//
//            List<PackageConstruction> constructionsToDelete = existingConstructions.stream()
//                    .filter(c -> incomingConstructions.stream().noneMatch(
//                            consReq -> consReq.getContent().equals(c.getContent())))
//                    .collect(Collectors.toList());
//            packageConstructionRepository.deleteAll(constructionsToDelete);

            return packages;
        } else {
            throw new RuntimeException("Package not found with id: " + packageId);
        }
    }

    public Packages deletePackage(String packageId) {
        Packages packageToDelete = packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found with id: " + packageId));
        List<PackagePrice> packagePricesToDelete = packagePriceRepository.findPackagePriceByPackageId(packageId);
        packagePriceRepository.deleteAll(packagePricesToDelete);
        packageRepository.deleteById(packageId);
        return packageToDelete;
    }

    public PackageDetailResponse detailPackage() {
        List<Packages> packagesList = packageRepository.findAll();
        List<PackageConstruction> packageConstructions = packageConstructionRepository.findAll();
        return PackageDetailResponse.builder()
                .packagesList(packagesList)
                .packageConstructionList(packageConstructions)
                .build();
    }

    public Packages updateConstructionPackage(String packageId, PackageConstructionCreateRequest request) {
        List<PackageConstruction> existingConstructions = packageConstructionRepository.findByPackageId(packageId);
        List<PackageConstructionRequest> incomingConstructions = request.getPackageConstructions();
        for (PackageConstructionRequest constructionRequest : incomingConstructions) {
            Optional<PackageConstruction> existingConstructionOpt = existingConstructions.stream()
                    .filter(c -> c.getContent().equals(constructionRequest.getContent()))
                    .findFirst();

            if (existingConstructionOpt.isPresent()) {
                PackageConstruction existingConstruction = existingConstructionOpt.get();
                existingConstruction.setPrice(constructionRequest.getPrice());
                packageConstructionRepository.save(existingConstruction);
            } else {
                PackageConstruction newConstruction = PackageConstruction.builder()
                        .packageId(packageId)
                        .content(constructionRequest.getContent())
                        .price(constructionRequest.getPrice())
                        .build();
                packageConstructionRepository.save(newConstruction);
            }
        }

        List<PackageConstruction> constructionsToDelete = existingConstructions.stream()
                .filter(c -> incomingConstructions.stream().noneMatch(
                        consReq -> consReq.getContent().equals(c.getContent())))
                .collect(Collectors.toList());
        packageConstructionRepository.deleteAll(constructionsToDelete);
        return packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found with id: " + packageId));
    }

    public List<PackagePriceResponse> getAllPackagePrices() {
        List<Packages> packages = packageRepository.findAll();
        List<PackagePriceResponse> responses = new ArrayList<>();
        for (Packages pkg : packages) {
            List<PackagePrice> packagePrices = packagePriceRepository.findPackagePriceByPackageId(pkg.getPackageId());
            List<PackagePriceInfoResponse> infoResponses = new ArrayList<>();
            for (PackagePrice packagePrice : packagePrices) {
                PackagePriceInfoResponse infoResponse = PackagePriceInfoResponse.builder()
                        .packagePriceId(packagePrice.getPackagePriceId())
                        .maxVolume(packagePrice.getMaxVolume())
                        .minVolume(packagePrice.getMinVolume())
                        .price(packagePrice.getPrice())
                        .build();
                infoResponses.add(infoResponse);
            }
            PackagePriceResponse response = PackagePriceResponse.builder()
                    .packageId(pkg.getPackageId())
                    .packageType(pkg.getPackageType())
                    .packagePriceInfoResponseList(infoResponses)
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public List<PackageConstructionResponse> getAllPackageConstruction() {
        List<Packages> packages = packageRepository.findAll();
        List<PackageConstructionResponse> responses = new ArrayList<>();
        for (Packages pkg : packages) {
            List<PackageConstruction> packageConstructions = packageConstructionRepository.findByPackageId(pkg.getPackageId());
            List<PackageConstructionInfoResponse> infoResponses = new ArrayList<>();
            for (PackageConstruction packageConstruction : packageConstructions) {
                PackageConstructionInfoResponse infoResponse = PackageConstructionInfoResponse.builder()
                        .packageConstructionId(packageConstruction.getPackageConstructionId())
                        .content(packageConstruction.getContent())
                        .price(packageConstruction.getPrice())
                        .build();
                infoResponses.add(infoResponse);
            }
            PackageConstructionResponse response = PackageConstructionResponse.builder()
                    .packageId(pkg.getPackageId())
                    .packageType(pkg.getPackageType())
                    .constructionInfoResponseList(infoResponses)
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public List<PackageTypesResponse> getAllPackagesType() {
        List<PackageTypesResponse> responses = new ArrayList<>();
        List<Packages> packages = packageRepository.findAll();
        for (Packages pkg : packages) {
            List<PackageTypesPriceResponse> priceResponseList = new ArrayList<>();
            List<PackagePrice> packagePrices = packagePriceRepository.findPackagePriceByPackageId(pkg.getPackageId());
            for (PackagePrice packagePrice : packagePrices) {
                PackageTypesPriceResponse packageTypesPriceResponse = PackageTypesPriceResponse.builder()
                        .minVolume(packagePrice.getMinVolume())
                        .maxVolume(packagePrice.getMaxVolume())
                        .price(packagePrice.getPrice())
                        .build();
                priceResponseList.add(packageTypesPriceResponse);
            }
            priceResponseList = priceResponseList.stream()
                    .sorted(Comparator.comparingDouble(PackageTypesPriceResponse::getMinVolume))
                    .collect(Collectors.toList());
            List<PackageTypesConstructionContentResponse> constructionResponseList = new ArrayList<>();
            List<PackageConstruction> packageConstructions = packageConstructionRepository.findByPackageId(pkg.getPackageId());
            for (PackageConstruction packageConstruction : packageConstructions) {
                PackageTypesConstructionContentResponse packageTypesConstructionContentResponse = PackageTypesConstructionContentResponse.builder()
                        .content(packageConstruction.getContent())
                        .price(packageConstruction.getPrice())
                        .build();
                constructionResponseList.add(packageTypesConstructionContentResponse);
            }
            PackageTypesResponse response = PackageTypesResponse.builder()
                    .packageId(pkg.getPackageId())
                    .packageType(pkg.getPackageType())
                    .priceResponseList(priceResponseList)
                    .constructionContentResponses(constructionResponseList)
                    .build();
            responses.add(response);
        }
        return responses;
    }
}
