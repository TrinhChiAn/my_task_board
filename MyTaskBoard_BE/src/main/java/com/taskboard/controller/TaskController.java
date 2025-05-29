package com.taskboard.controller;

import com.taskboard.dto.TaskDTO;
import com.taskboard.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping("/board/{boardId}")
    public ResponseEntity<TaskDTO.TaskResponse> createTask(
            @PathVariable Long boardId,
            @RequestBody TaskDTO.CreateTaskRequest request) {
        return ResponseEntity.ok(taskService.createTask(boardId, request));
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<TaskDTO.TaskResponse> getTask(@PathVariable Long taskId) {
        return ResponseEntity.ok(taskService.getTask(taskId));
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskDTO.TaskResponse> updateTask(
            @PathVariable Long taskId,
            @RequestBody TaskDTO.UpdateTaskRequest request) {
        return ResponseEntity.ok(taskService.updateTask(taskId, request));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }
} 