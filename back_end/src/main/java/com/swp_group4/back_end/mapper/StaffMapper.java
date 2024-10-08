package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.Staff;
import com.swp_group4.back_end.responses.StaffResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface StaffMapper {

    StaffResponse toStaffResponse(Staff staff, @MappingTarget StaffResponse staffResponse);

}
