package com.spring.backend.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.spring.backend.domain.entity.MeetingSchedule;

import java.time.LocalDate;
import java.time.LocalTime;

public record meetingCreate(
        String department,
        String meetingDetails,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate usageDate,
        @JsonFormat(pattern = "HH:mm")
        LocalTime startTime,
        @JsonFormat(pattern = "HH:mm")
        LocalTime endTime
) {
    public MeetingSchedule toEntity() {
        return MeetingSchedule.builder()
                .department(department)
                .meetingDetails(meetingDetails)
                .usageDate(usageDate)
                .startTime(startTime)
                .endTime(endTime)
                .build();
    }
}
