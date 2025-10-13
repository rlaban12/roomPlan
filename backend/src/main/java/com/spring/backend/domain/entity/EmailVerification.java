package com.spring.backend.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name = "email_verification")
public class EmailVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "verification_id")
    private Long id;

    @Column(nullable = false)
    private String verificationCode; // 인증코드

    @Column(nullable = false)
    private LocalDateTime expiryDate; // 인증 만료시간

    // 연관관계 설정
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    public void updateNewCode(String newCode) {
        this.verificationCode = newCode;
        this.expiryDate = LocalDateTime.now().plusMinutes(5);
    }

}
