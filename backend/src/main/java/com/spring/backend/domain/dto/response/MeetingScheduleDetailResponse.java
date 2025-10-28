package com.spring.backend.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.spring.backend.domain.entity.MeetingSchedule;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalTime;

@Builder
public record MeetingScheduleDetailResponse(
        String id,
        String department,
        String meetingDetails,
        @JsonProperty("usageDate")
        @JsonFormat(pattern = "yyyy년 MM월 dd일")
        LocalDate usageDate,
        @JsonFormat(pattern = "HH:mm")
        LocalTime startTime,
        @JsonFormat(pattern = "HH:mm")
        LocalTime endTime

) {
    public static MeetingScheduleDetailResponse from(MeetingSchedule meetingSchedule) {
        return MeetingScheduleDetailResponse.builder()
                .id(meetingSchedule.getMeetingId().toString())
                .department(meetingSchedule.getDepartment())
                .meetingDetails(meetingSchedule.getMeetingDetails())
                .usageDate(meetingSchedule.getUsageDate())
                .startTime(meetingSchedule.getStartTime())
                .endTime(meetingSchedule.getEndTime())
                .build();
    }

}
