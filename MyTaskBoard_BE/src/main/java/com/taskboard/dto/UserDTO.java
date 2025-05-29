package com.taskboard.dto;

import lombok.Data;

public class UserDTO {
    @Data
    public static class SignupRequest {
        private String username;
        private String password;
        private String email;
        private String fullName;
    }

    @Data
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @Data
    public static class LoginResponse {
        private String token;
        private String username;
        private Long userId;
    }
} 