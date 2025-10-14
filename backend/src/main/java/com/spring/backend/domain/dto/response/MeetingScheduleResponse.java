package com.spring.backend.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.spring.backend.domain.entity.MeetingSchedule;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalTime;

@Builder
public record MeetingScheduleResponse(
        String meetingId,
        String department,
        @JsonFormat(pattern = "yyyy년 MM월 dd일")
        LocalDate usageDate,
        @JsonFormat(pattern = "HH:mm")
        LocalTime startTime,
        @JsonFormat(pattern = "HH:mm")
        LocalTime endTime
) {
    // 엔터티를 DTO로 바꿔주는 편의 메서드
    public static MeetingScheduleResponse from(MeetingSchedule meetingSchedule) {
        return MeetingScheduleResponse.builder()
                .meetingId(meetingSchedule.getMeetingId().toString())
                .department(meetingSchedule.getDepartment())
                .usageDate(meetingSchedule.getUsageDate())
                .startTime(meetingSchedule.getStartTime())
                .endTime(meetingSchedule.getEndTime())
                .build();
    }
}
