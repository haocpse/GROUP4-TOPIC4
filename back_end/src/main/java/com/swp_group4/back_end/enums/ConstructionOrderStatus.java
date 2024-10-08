package com.swp_group4.back_end.enums;

public enum ConstructionOrderStatus {

    REQUESTED, // Trạng thái của CONSTRUCTION ORDER sau khi CUSTOMER gửi REQUEST
    CONSULTING,
    QUOTED, // Trạng thái của QUOTATION sau khi CONSULTANT export 1 QUOTATION
    CONFIRMED_QUOTATION, // Trạng thái của QUOTATION sau khi được phê duyệt từ MANAGER// Trạng thái của CONSTRUCTION ORDER sau khi MANAGER assign ORDER cho 1 CONSULTANT
    DESIGNING,
    DESIGNED, // Trạng thái của DESIGN sau khi DESIGNER upload các design
    CONFIRMED_DESIGN, // Trạng thái của DESIGN sau khi được phê duyệt từ MANAGER// Trạng thái của CONSTRUCTION ORDER sau khi CUSTOMER thanh toán lần 1 và MANAGER assign 1 LEADER DESIGNER
    CONSTRUCTING, // Trạng thái của CONSTRUCTION ORDER sau khi CUSTOMER thanh toán lần 2 và MANAGER assign 1 LEADER CONSTRUCTOR
    CONSTRUCTED, // Trạng thái của CONSTRUCTION ORDER sau khi LEADER CONSTRUCTOR xác nhận đã hoàn thành tất cả các TASK
    FINISHED, CANCELLED, NULL;

}
