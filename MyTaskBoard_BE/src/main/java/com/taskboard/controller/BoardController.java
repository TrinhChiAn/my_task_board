package com.taskboard.controller;

import com.taskboard.dto.BoardDTO;
import com.taskboard.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @GetMapping("/me")
    public ResponseEntity<List<BoardDTO.BoardResponse>> getCurrentUserBoards() {
        return ResponseEntity.ok(boardService.getCurrentUserBoards());
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<BoardDTO.BoardResponse> getBoard(@PathVariable Long boardId) {
        return ResponseEntity.ok(boardService.getBoard(boardId));
    }

    @PostMapping
    public ResponseEntity<BoardDTO.BoardResponse> createBoard(@RequestBody BoardDTO.CreateBoardRequest request) {
        return ResponseEntity.ok(boardService.createBoard(request));
    }

    @PutMapping("/{boardId}")
    public ResponseEntity<BoardDTO.BoardResponse> updateBoard(
            @PathVariable Long boardId,
            @RequestBody BoardDTO.UpdateBoardRequest request) {
        return ResponseEntity.ok(boardService.updateBoard(boardId, request));
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long boardId) {
        boardService.deleteBoard(boardId);
        return ResponseEntity.noContent().build();
    }
} 