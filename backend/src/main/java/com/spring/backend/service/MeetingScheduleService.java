package com.spring.backend.service;

import com.spring.backend.domain.dto.request.MeetingCreate;
import com.spring.backend.domain.dto.response.MeetingScheduleDetailResponse;
import com.spring.backend.domain.dto.response.MeetingScheduleResponse;
import com.spring.backend.domain.entity.MeetingSchedule;
import com.spring.backend.domain.entity.User;
import com.spring.backend.repository.MeetingScheduleRepository;
import com.spring.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MeetingScheduleService {

    private final MeetingScheduleRepository meetingScheduleRepository;
    private final UserRepository userRepository;

    // 전체 조회
    @Transactional(readOnly = true)
    public Map<String, Object> findAll(String email) {
        User user = getCurrentLoggedInUser(email);

        Slice<MeetingSchedule> meetingScheduleSlice = meetingScheduleRepository.findAllByUser(user);

        List<MeetingScheduleResponse> meetingSchedules = meetingScheduleSlice.getContent()
                .stream()
                .map(MeetingScheduleResponse::from)
                .collect(Collectors.toList());

        return Map.of(
                "meetingScheduleList", meetingSchedules
        );
    }

    // 회의 일정 생성
    public void saveMeetingSchedule(MeetingCreate dto, String email) {
        MeetingSchedule meetingSchedule = dto.toEntity();
        User foundUser = getCurrentLoggedInUser(email);
        meetingSchedule.setUser(foundUser);
        meetingScheduleRepository.save(meetingSchedule);
    }

    // 회의 일정 단일 조회
    @Transactional(readOnly = true)
    public MeetingScheduleDetailResponse findOne(Long id) {
        MeetingSchedule meetingSchedule = meetingScheduleRepository.findById(id).orElseThrow();
        return MeetingScheduleDetailResponse.from(meetingSchedule);
    }

    // 회의 일정 삭제
    public void deleteMeetingSchedule(Long id) {
        meetingScheduleRepository.deleteById(id);
    }

    // 회의 일정 수정
    public void modifyMeetingSchedule(MeetingCreate dto, Long id) {
        MeetingSchedule meetingSchedule = meetingScheduleRepository.findById(id).orElseThrow();
        meetingSchedule.changeMeeting(dto);
        meetingScheduleRepository.save(meetingSchedule);
    }

    // 로그인한 사용자의 엔터티정보를 불러오는 메서드
    private User getCurrentLoggedInUser(String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }

}
