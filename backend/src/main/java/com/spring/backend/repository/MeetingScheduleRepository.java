package com.spring.backend.repository;

import com.spring.backend.domain.entity.MeetingSchedule;
import com.spring.backend.domain.entity.User;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MeetingScheduleRepository extends JpaRepository<MeetingSchedule, Long> {

    Optional<MeetingSchedule> findByMeetingId(Long userId);

    Slice<MeetingSchedule> findAllByUser(User user);
}
