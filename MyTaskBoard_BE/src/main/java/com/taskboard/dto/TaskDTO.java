package com.taskboard.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

public class TaskDTO {

    @Data
    @NoArgsConstructor
    public static class CreateTaskRequest {
        private String title;
        private String description;
        private String status;
        private String icon;
    }

    @Data
    @NoArgsConstructor
    public static class UpdateTaskRequest {
        private String title;
        private String description;
        private String status;
        private String icon;
    }

    @Data
    @NoArgsConstructor
    public static class TaskResponse {
        private Long id;
        private String title;
        private String description;
        private String status;
        private String icon;
        private Long boardId;
        private BoardDTO.UserSummary assignedTo;
    }
} 