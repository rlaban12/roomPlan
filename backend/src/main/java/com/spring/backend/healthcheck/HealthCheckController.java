package com.spring.backend.healthcheck;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@Slf4j
/**
 * API가 살아있는지 확인
 */
public class HealthCheckController {
    @GetMapping("/status")
    public ResponseEntity<?> healthCheck() {

        return ResponseEntity.ok(
                Map.of(
                        "healthy", true,
                        "timestamp", LocalDateTime.now()
                )
        );
    }
}
