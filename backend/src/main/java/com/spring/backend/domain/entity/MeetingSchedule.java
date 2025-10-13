package com.spring.backend.domain.entity;

import com.spring.backend.domain.dto.request.meetingCreate;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@ToString(exclude = {"user"})
@EqualsAndHashCode(of = "meetingId")
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name = "meeting_schedule")
public class MeetingSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meeting_id")
    private Long meetingId;

    @CreationTimestamp
    private LocalDateTime createdAt; // 회의 일정 등록 날짜

    @Column(name = "usage_date")
    private LocalDate usageDate; // 회의 일정 작성 날짜

    @Column(name = "department", nullable = false, length = 50)
    private String department; // 부서 제목

    @Column(name = "meeting_details")
    private String meetingDetails; // 회의 내용

    @Column(name = "start_time")
    private LocalTime startTime; // 회의 시작 시간

    @Column(name = "end_time")
    private LocalTime endTime; // 회의 끝 시간

    // 회원과 연관관계를 성정 - 단방향 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @Setter
    private User user;

    // 수정 편의 메서드
    public void changeMeeting(meetingCreate dto) {
        this.department = dto.department();
        this.meetingDetails = dto.meetingDetails();
        this.usageDate = dto.usageDate();
        this.startTime = dto.startTime();
        this.endTime = dto.endTime();
    }

}
