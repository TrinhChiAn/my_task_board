package com.taskboard.service;

import com.taskboard.dto.BoardDTO;
import com.taskboard.model.Board;
import com.taskboard.model.Task;
import com.taskboard.model.User;
import com.taskboard.repository.BoardRepository;
import com.taskboard.repository.UserRepository;
import com.taskboard.exception.ResourceNotFoundException;
import com.taskboard.exception.AccessDeniedException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public List<BoardDTO.BoardResponse> getCurrentUserBoards() {
        User currentUser = getCurrentUser();
        List<Board> boards = boardRepository.findByOwnerId(currentUser.getId());
        return boards.stream()
                .map(this::mapToBoardResponse)
                .collect(Collectors.toList());
    }

    public BoardDTO.BoardResponse getBoard(Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new ResourceNotFoundException("Board not found with id: " + boardId));
        
        User currentUser = getCurrentUser();
        if (!board.getOwner().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You don't have permission to view this board");
        }

        return mapToBoardResponse(board);
    }

    @Transactional
    public BoardDTO.BoardResponse createBoard(BoardDTO.CreateBoardRequest request) {
        User currentUser = getCurrentUser();

        Board board = new Board();
        board.setTitle(request.getTitle());
        board.setDescription(request.getDescription());
        board.setOwner(currentUser);

        board = boardRepository.save(board);
        return mapToBoardResponse(board);
    }

    @Transactional
    public BoardDTO.BoardResponse updateBoard(Long boardId, BoardDTO.UpdateBoardRequest request) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new ResourceNotFoundException("Board not found with id: " + boardId));

        User currentUser = getCurrentUser();
        if (!board.getOwner().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You don't have permission to update this board");
        }

        if (request.getTitle() != null) {
            board.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            board.setDescription(request.getDescription());
        }

        board = boardRepository.save(board);
        return mapToBoardResponse(board);
    }

    @Transactional
    public void deleteBoard(Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new ResourceNotFoundException("Board not found with id: " + boardId));

        User currentUser = getCurrentUser();
        if (!board.getOwner().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You don't have permission to delete this board");
        }

        boardRepository.delete(board);
    }

    private BoardDTO.BoardResponse mapToBoardResponse(Board board) {
        BoardDTO.BoardResponse response = new BoardDTO.BoardResponse();
        response.setId(board.getId());
        response.setTitle(board.getTitle());
        response.setDescription(board.getDescription());
        
        BoardDTO.UserSummary owner = new BoardDTO.UserSummary();
        owner.setId(board.getOwner().getId());
        owner.setUsername(board.getOwner().getUsername());
        owner.setFullName(board.getOwner().getFullName());
        response.setOwner(owner);

        response.setTasks(board.getTasks().stream()
                .map(this::mapToTaskSummary)
                .collect(Collectors.toList()));

        return response;
    }

    private BoardDTO.TaskSummary mapToTaskSummary(Task task) {
        BoardDTO.TaskSummary summary = new BoardDTO.TaskSummary();
        summary.setId(task.getId());
        summary.setTitle(task.getTitle());
        summary.setStatus(task.getStatus().name());
        summary.setIcon(task.getIcon().name());
        return summary;
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