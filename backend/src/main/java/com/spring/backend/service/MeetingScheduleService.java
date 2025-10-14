package com.spring.backend.service;

import com.spring.backend.domain.entity.MeetingSchedule;
import com.spring.backend.domain.entity.User;
import com.spring.backend.repository.MeetingScheduleRepository;
import com.spring.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MeetingScheduleService {

    private final MeetingScheduleRepository meetingScheduleRepository;
    private final UserRepository userRepository;

    // 전체 조회
//    @Transactional(readOnly = true)
//    public Map<String, Object> getMeetingSchedules(String email) {
//
//        User currentLoggedInUser = getCurrentLoggedInUser(email);
//
//        List<>
//
//    }




    //---
    // 로그인한 사용자의 엔터티정보를 불러오는 메서드
    private User getCurrentLoggedInUser(String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }

}
