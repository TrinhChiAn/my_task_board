package com.taskboard.controller;

import com.taskboard.dto.UserDTO;
import com.taskboard.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserDTO.LoginResponse> signup(@RequestBody UserDTO.SignupRequest request) {
        return ResponseEntity.ok(userService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO.LoginResponse> login(@RequestBody UserDTO.LoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }
} 