# API 명세서 (OpenAPI)

## 1. 문서 정보
- 버전: 0.1
    - 변경 이력: 2025-10-06 초안 작성

## 2. API 명세
| ID  | HTTP Method | URL                    | 설명     | 요청데이터                         | 응답데이터     |
|-----|-------------|------------------------|--------|-------------------------------|-----------|
| A01 | GET    | /api/auth/check-email  | email 중복확인 | 이메일                           | 이메일 중복 아닐 때 인증 코드 |
| A02 | GET    | /api/auth/code         | 이메일 인증 코드 검증 | 이메일, 이메일 인증코드                 | 인증 성공 여부  |
| A03 | POST   | /api/auth/join         | 회원가입 마무리 요청 | 회원가입 정보(이메일, 이메일 인증코드, 비밀번호)  | 회원가입 성공 여부 |
| A04 | POST   | /api/auth/login        | 로그인 검증 | 이메일, 비밀번호                     | 로그인 성공 여부 |
| A05 | GET    | /api/meeting           | 회의 일정 전체 조회 요청 | 요청 페이지, 이메일                   | 회의 일정 목록     | 
| A06 | POST   | /api/meeting           | 회의 일정 생성 요청 | 부서명, 미팅내용, 사용 날짜, 시작 시간, 끝 시간 | 회의 일정 정상 등록 여부 |
| A07 | GET    | /api/meeting/{meetingId} | 회의 일정 단일 조회 요청 | meetingId(조회할 회의 일정 id)       | 회의 일정 상세 정보  |
| A08 | DELETE | /api/meeting/{id}      | 회의 일정 삭제 요청 | id(삭제할 회의 일정 id)              | 회의 일정 삭제 성공 여부 |
| A09 | PUT   | /api/meeting/{id}      | 회의 일정 수정 요청 | id(수정할 회의 일정 id), 회의 일정 수정 내용 | 회의 일정 수정 성공 여부 | 

## 3. API JSON 형식
### A01: email 중복확인(GET)
```
none
```

### A02: 이메일 인증 코드 검증(GET)
```
none
```

### A03: 회원가입 마무리 요청(POST)
```
{
    "email": "example@naver.com",
    "password": "ABC12345678@"
}
```

### A04: 로그인 검증(POST)
```
{
    "email": "example@naver.com",
    "password": "ABC12345678@"
}
```

### A05: 회의 일정 전체 조회 요청(GET)
```
{
    "department": "개발부",
    "meetingDetails": "오전에 티타임 및 회의 합니다.",
    "usageDate": "2025-09-18",
    "startTime": "10:00",
    "endTime": "11:00"
}

.
.
.

{
    "department": "영업부",
    "meetingDetails": "외부 회사와 회의 합니다.",
    "usageDate": "2025-09-18",
    "startTime": "16:00",
    "endTime": "17:00"
}
```

### A06: 회의 일정 생성 요청(POST)
```
{
    "department": "개발부",
    "meetingDetails": "오전에 티타임 및 회의 합니다.",
    "usageDate": "2025-09-18",
    "startTime": "10:00",
    "endTime": "11:00"
}
```

### A07: 회의 일정 단일 조회 요청(GET)
```
{
    "department": "개발부",
    "meetingDetails": "오전에 티타임 및 회의 합니다.",
    "usageDate": "2025-09-18",
    "startTime": "10:00",
    "endTime": "11:00"
}
```

### A08: 회의 일정 삭제 요청(DELETE)
```
none
```

### A09: 회의 일정 수정 요청(PUT)
```
{
    "department": "개발부",
    "meetingDetails": "오후로 회의시간이 변경되었습니다.",
    "usageDate": "2025-09-18",
    "startTime": "14:00",
    "endTime": "15:00"
}
```
