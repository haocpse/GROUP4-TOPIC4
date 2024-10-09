package com.swp_group4.back_end.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum ErrorCode {

    USER_NOT_EXIST(1001, "User doesn't exist"),
    PASSWORD_WRONG(1002, "Password is incorrect"),
    USERNAME_NOT_VALID_1(1003, "Username must be at least 8 characters long"),
    USERNAME_NOT_VALID_2(1004, "Username must contain both letters and numbers"),
    PASSWORD_NOT_VALID(1005, "Password must be at least 8 characters long"),
    ;

    int code;
    String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
