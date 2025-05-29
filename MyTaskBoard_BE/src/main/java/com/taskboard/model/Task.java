package com.taskboard.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @Enumerated(EnumType.STRING)
    private TaskIcon icon;

    @ManyToOne
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

    public enum TaskStatus {
        WONT_DO,
        IN_PROGRESS,
        DONE
    }

    public enum TaskIcon {
        USER,
        CHAT,
        COFFEE,
        TROPHY,
        BOOK,
        CLOCK
    }
} 