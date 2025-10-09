# 시스템 아키텍처

## 1. 문서 정보
- 버전: 0.1
- 변경 이력: 2025-10-06 초안 작성

## 2. 3계층 아키텍처 구성:
- 프레젠테이션 계층(Presentation Layer):
  - React로 작성된 회원가입/로그인 페이지, 회의 일정 캘린더 페이지
- 비즈니스 계층 (Business Logic Layer):
  - 회의 일정 작성, 수정, 삭제, 로직
- 데이터 계층(Data Layer):
  - user, email_verification, meeting_schedule 테이블

## 3. 기술 스텍
- 벡엔드:
    - Spring Boot(Java)
    - Spring JPA
    - Spring QueryDsl
    - Spring Security

- 프론트엔드:
    - React
    - React Router
    - JavaScript
    - Scss
    - Css

- 데이터베이스
    - MariaDB (RDBMS)

- API 통신:
    - ResTful API

- 도구:
    - Git/GitHub (버전 관리)
    - Postman (API 테스트)
    - Gradle (의존성 관리)
    - IntelliJ (IDE)

## 4. 시스템 구성도

```
사용자 (Browser)
   ↕︎  [HTTP 요청/응답]
프레젠테이션 계층 (Spring Boot Controller + JPA + QueryDsl)
   ↕︎  [메서드 호출]
비즈니스 계층 (Service Layer)
   ↕︎  [Repository 호출]
데이터 계층 (MariaDB)
```
