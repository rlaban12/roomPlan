package com.spring.backend.api;

import com.spring.backend.domain.dto.request.MeetingCreate;
import com.spring.backend.domain.dto.response.MeetingScheduleDetailResponse;
import com.spring.backend.service.MeetingScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/meeting")
@Slf4j
@RequiredArgsConstructor
public class MeetingScheduleController {

    private final MeetingScheduleService meetingScheduleService;

    // 전체 조회 요청
    @GetMapping
    public ResponseEntity<?> getList(
            @RequestParam(defaultValue = "1") int page,
            @AuthenticationPrincipal String email
    ) {
        Map<String, Object> meetingSechedules = meetingScheduleService.findAll(email);

        return ResponseEntity.ok().body(meetingSechedules);
    }

    // 생성 요청
    @PostMapping
    public ResponseEntity<?> create(
            @RequestBody MeetingCreate dto,
            @AuthenticationPrincipal String email
    ) {
        meetingScheduleService.saveMeetingSchedule(dto, email);

        return ResponseEntity.ok().body(Map.of(
                "message", "회의 일정이 정상 등록되었습니다."
        ));
    }

    // 단일 조회 요청
    @GetMapping("/{meetingId}")
    public ResponseEntity<?> getMeetingSchedule(@PathVariable Long meetingId) {

        if (meetingId == null || meetingId < 1) {
            String errorMessage = "meetingId가 유효하지 않습니다.";
            log.warn(errorMessage);
            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message", errorMessage
                    ));
        }

        MeetingScheduleDetailResponse detailResponse = meetingScheduleService.findOne(meetingId);

        return ResponseEntity.ok().body(detailResponse);
    }

    // 삭제 요청
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMeetingSchedule(
            @PathVariable Long id
    ) {
        meetingScheduleService.deleteMeetingSchedule(id);

        return ResponseEntity.ok().body(Map.of(
                "message", "회의 일정이 삭제되었습니다. id - " + id
        ));
    }

    // 수정 요청
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMeetingSchedule(
            @PathVariable Long id
            , @RequestBody MeetingCreate dto
    ) {
        meetingScheduleService.modifyMeetingSchedule(dto, id);

        return ResponseEntity.ok().body(Map.of(
                "message", "회의 일정이 수정되었습니다. id - " + id
        ));
    }


}
