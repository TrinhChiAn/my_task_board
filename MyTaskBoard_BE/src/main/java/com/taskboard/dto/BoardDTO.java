package com.taskboard.dto;

import lombok.Data;
import java.util.List;

public class BoardDTO {
    @Data
    public static class CreateBoardRequest {
        private String title;
        private String description;
    }

    @Data
    public static class UpdateBoardRequest {
        private String title;
        private String description;
    }

    @Data
    public static class BoardResponse {
        private Long id;
        private String title;
        private String description;
        private UserSummary owner;
        private List<TaskSummary> tasks;
    }

    @Data
    public static class UserSummary {
        private Long id;
        private String username;
        private String fullName;
    }

    @Data
    public static class TaskSummary {
        private Long id;
        private String title;
        private String status;
        private String icon;
    }
} 