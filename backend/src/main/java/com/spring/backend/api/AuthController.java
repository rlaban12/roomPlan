package com.spring.backend.api;

import com.spring.backend.domain.dto.request.LoginRequest;
import com.spring.backend.domain.dto.request.SignupRequest;
import com.spring.backend.service.MeetingUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final MeetingUserService meetingUserService;

    // email 중복확인 API 생성
    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(String email) {
        boolean isDuplicate = meetingUserService.checkEmailDuplicate(email);
        String message = isDuplicate ? "이메일이 중복되었습니다." : "사용 가능한 이메일입니다.";

        return ResponseEntity.ok().body(Map.of(
                "isDuplicate", isDuplicate,
                "message", message
        ));
    }

    // 인증 코드 검증 API
    @GetMapping("/code")
    public ResponseEntity<?> verifyCode(String email, String code) {
        log.info("{}'s verify code is [ {} ]", email, code);

        boolean isMatch = meetingUserService.isMatchCode(email, code);

        log.info("code matches? - {}", isMatch);

        return ResponseEntity.ok().body(Map.of(
                "isMatch", isMatch
        ));
    }

    // 회원가입 마무리 요청
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody SignupRequest dto) {

        log.info("save request user info - {}", dto);

        meetingUserService.confirmSignup(dto);

        return ResponseEntity.ok().body(Map.of(
                "message", "회원가입이 완료되었습니다."
        ));
    }

    // 로그인 검증 API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest dto) {

        try {
            return ResponseEntity.ok().body(meetingUserService.authenticate(dto));
        } catch (RuntimeException e) {
            return ResponseEntity.status(422).body(Map.of(
                    "message", e.getMessage()
            ));
        }
    }

}
