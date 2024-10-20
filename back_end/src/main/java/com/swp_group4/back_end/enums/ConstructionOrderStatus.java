package com.swp_group4.back_end.enums;

public enum ConstructionOrderStatus {

    REQUESTED, // Trạng thái của CONSTRUCTION ORDER sau khi CUSTOMER gửi REQUEST
    CONSULTING,
    CONFIRMED_QUOTATION,
    PAID_STAGE_1,// Trạng thái của QUOTATION sau khi được phê duyệt từ MANAGER// Trạng thái của CONSTRUCTION ORDER sau khi MANAGER assign ORDER cho 1 CONSULTANT
    DESIGNING,
    CONFIRMED_DESIGN,
    PAID_STAGE_2,// Trạng thái của DESIGN sau khi được phê duyệt từ MANAGER// Trạng thái của CONSTRUCTION ORDER sau khi CUSTOMER thanh toán lần 1 và MANAGER assign 1 LEADER DESIGNER
    CONSTRUCTING, // Trạng thái của CONSTRUCTION ORDER sau khi CUSTOMER thanh toán lần 2 và MANAGER assign 1 LEADER CONSTRUCTOR
    CONSTRUCTED,
    PAID_STAGE_3,// Trạng thái của CONSTRUCTION ORDER sau khi LEADER CONSTRUCTOR xác nhận đã hoàn thành tất cả các TASK
    FINISHED, CANCELLED, NULL;

}
