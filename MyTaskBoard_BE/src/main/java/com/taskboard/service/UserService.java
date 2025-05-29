package com.taskboard.service;

import com.taskboard.dto.UserDTO;
import com.taskboard.model.User;
import com.taskboard.model.Board;
import com.taskboard.repository.UserRepository;
import com.taskboard.repository.BoardRepository;
import com.taskboard.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public UserDTO.LoginResponse signup(UserDTO.SignupRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());

        user = userRepository.save(user);

        // Create default board for new user
        Board defaultBoard = new Board();
        defaultBoard.setTitle("My First Board");
        defaultBoard.setDescription("Welcome to your first board!");
        defaultBoard.setOwner(user);
        boardRepository.save(defaultBoard);

        String token = jwtUtil.generateToken(user.getUsername(), user.getId());

        return createLoginResponse(user, token);
    }

    public UserDTO.LoginResponse login(UserDTO.LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getId());
        return createLoginResponse(user, token);
    }

    private UserDTO.LoginResponse createLoginResponse(User user, String token) {
        UserDTO.LoginResponse response = new UserDTO.LoginResponse();
        response.setToken(token);
        response.setUsername(user.getUsername());
        response.setUserId(user.getId());
        return response;
    }
} 