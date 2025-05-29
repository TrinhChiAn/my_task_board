package com.taskboard.service;

import com.taskboard.dto.BoardDTO;
import com.taskboard.dto.TaskDTO;
import com.taskboard.model.Board;
import com.taskboard.model.Task;
import com.taskboard.model.User;
import com.taskboard.repository.BoardRepository;
import com.taskboard.repository.TaskRepository;
import com.taskboard.repository.UserRepository;
import com.taskboard.exception.ResourceNotFoundException;
import com.taskboard.exception.AccessDeniedException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @Transactional
    public TaskDTO.TaskResponse createTask(Long boardId, TaskDTO.CreateTaskRequest request) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new ResourceNotFoundException("Board not found with id: " + boardId));

        User currentUser = getCurrentUser();
        if (!board.getOwner().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You don't have permission to create tasks in this board");
        }

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(Task.TaskStatus.valueOf(request.getStatus()));
        task.setBoard(board);
        task.setIcon(Task.TaskIcon.valueOf(request.getIcon()));
        task.setAssignedTo(board.getOwner());

        task = taskRepository.save(task);
        return mapToTaskResponse(task);
    }

    public TaskDTO.TaskResponse getTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));

        User currentUser = getCurrentUser();
        if (!task.getBoard().getOwner().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You don't have permission to view this task");
        }

        return mapToTaskResponse(task);
    }

    @Transactional
    public TaskDTO.TaskResponse updateTask(Long taskId, TaskDTO.UpdateTaskRequest request) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));

        User currentUser = getCurrentUser();
        if (!task.getBoard().getOwner().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You don't have permission to update this task");
        }

        if (request.getTitle() != null) {
            task.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            task.setDescription(request.getDescription());
        }
        if (request.getStatus() != null) {
            task.setStatus(Task.TaskStatus.valueOf(request.getStatus()));
        }
        if (request.getIcon() != null) {
            task.setIcon(Task.TaskIcon.valueOf(request.getIcon()));
        }

        task = taskRepository.save(task);
        return mapToTaskResponse(task);
    }

    @Transactional
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));

        User currentUser = getCurrentUser();
        if (!task.getBoard().getOwner().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Only board owner can delete tasks");
        }

        taskRepository.delete(task);
    }

    private TaskDTO.TaskResponse mapToTaskResponse(Task task) {
        TaskDTO.TaskResponse response = new TaskDTO.TaskResponse();
        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setStatus(task.getStatus().name());
        response.setIcon(task.getIcon().name());
        response.setBoardId(task.getBoard().getId());

        if (task.getAssignedTo() != null) {
            BoardDTO.UserSummary assignedTo = new BoardDTO.UserSummary();
            assignedTo.setId(task.getAssignedTo().getId());
            assignedTo.setUsername(task.getAssignedTo().getUsername());
            assignedTo.setFullName(task.getAssignedTo().getFullName());
            response.setAssignedTo(assignedTo);
        }

        return response;
    }

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        } else {
            username = principal.toString();
        }
        
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
} 