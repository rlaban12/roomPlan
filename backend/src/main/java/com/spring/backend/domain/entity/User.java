package com.spring.backend.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@ToString(exclude = {"meetingList"})
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Role role = Role.COMMON;

    // 이메일 인증을 완료했는지 여부
    @Column(nullable = false)
    private boolean emailVerified;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    // NN을 안거는 이유 : SNS 로그인한 회원, 인증번호만 받고 회원가입을 마무리하지 않은 회원 때문
    @Column(length = 500)
    private String password;

    // 회의 일정과 양방향 연결
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<MeetingSchedule> meetingList = new ArrayList<>();

    // 이메일 인증을 완료하는 헬퍼함수
    public void completeVerifying() {
        this.emailVerified = true;
    }

    public void confirm(String password) {
        this.password = password;
        this.createdAt = LocalDateTime.now();
    }

}
