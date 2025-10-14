package com.spring.backend.domain.dto.request;

import lombok.Builder;

@Builder
public record SignupRequest(
        String email,
        String password
) {
}
