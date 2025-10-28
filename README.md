# RoomPlan - 회의실 일정 관리 시스템

## 프로젝트 개요
RoomPlan은 조직이 회의실 일정을 관리하고 공유할 수 있도록 도와주는 웹 애플리케이션입니다. 사용자는 회의 일정을 생성, 수정, 조회 및 삭제할 수 있어 조직 내 회의실 사용을 쉽게 조율할 수 있습니다.

## 기능
- **사용자 인증**: 회원가입 및 로그인 기능
- **회의 일정 관리**: 회의 일정 생성, 조회, 수정 및 삭제
- **캘린더 뷰**: 모든 회의 일정을 캘린더 형식으로 조회

## 사용 방법
1. 새 계정을 등록하거나 기존 계정으로 로그인
2. 캘린더를 통해 기존 회의 일정 확인
3. 부서명, 회의 내용, 날짜, 시작 시간, 종료 시간을 입력하여 새 회의 일정 생성
4. 필요에 따라 기존 회의 일정 수정 또는 삭제

## 개발 일정
- [sprints](sprints) - 개발 일정 스프린트
- [개발 일정 마일드스톤](mild-stone/roomPlan_mild_stone.png) - 개발 일정 마일드스톤

## 프로젝트 구조
```
roomPlan/
├── backend/               # 스프링 부트 백엔드 애플리케이션
│   ├── src/               # 소스 코드
│   ├── build.gradle       # Gradle 빌드 설정
│   └── ...
├── frontend/              # React 프론트엔드 애플리케이션
│   ├── src/               # 소스 코드
│   ├── public/            # 정적 자산
│   ├── package.json       # NPM 패키지 설정
│   └── ...
└── docs/                  # 프로젝트 문서
    ├── 1_requirements.md  # 요구사항 명세
    ├── 2_architecture.md  # 시스템 아키텍처
    ├── 3_api-spec-openapi.md # API 명세
    ├── 4_concept_erd.png  # 개념적 ERD
    ├── 5_logical_erd.png  # 논리적 ERD
    └── 6_wireframe.png    # UI 와이어프레임
```

### 프로젝트 자세한 구조
- [backend](direct-structure/backend-directory.md) - 벡엔드 디렉토리 구조
- [frontend](direct-structure/frontend-directory.md) - 프론트엔드 디렉토리 구조

## 프로젝트 개발 문서
- [요구사항 명세서](docs/1_requirements.md) - 프로젝트의 기능 및 비기능 요구사항
- [시스템 아키텍처](docs/2_architecture.md) - 시스템의 3계층 아키텍처 구성 및 기술 스택
- [API 명세서](docs/3_api-spec-openapi.md) - RESTful API 엔드포인트 및 JSON 형식
- [개념 ERD](docs/4_concept_erd.png) - 데이터베이스 개념 다이어그램
- [논리 ERD](docs/5_logical_erd.png) - 데이터베이스 논리 다이어그램
- [UI 와이어프레임](docs/6_wireframe.png) - UI 와이어프레임

## 기술 스택
### 백엔드
- Spring Boot (Java)
- Spring JPA
- Spring QueryDsl
- Spring Security
- MariaDB (RDBMS)

### 프론트엔드
- React
- React Router
- JavaScript
- SCSS/CSS

### 도구
- Git/GitHub (버전 관리)
- Postman (API 테스트)
- Gradle (의존성 관리)
- IntelliJ (IDE)

## 설치 및 설정

### 사전 요구사항
- Java 11
- Node.js(v24.2.0)
- MariaDB(v10.11.13)

### 백엔드 설정
1. 백엔드 디렉토리로 이동:
   ```
   cd backend
   ```
2. 프로젝트 빌드:
   ```
   ./gradlew build
   ```
3. 애플리케이션 실행:
   ```
   ./gradlew bootRun
   ```

### 프론트엔드 설정
1. 프론트엔드 디렉토리로 이동:
   ```
   cd frontend
   ```
2. 의존성 설치:
   ```
   npm install
   ```
3. 개발 서버 시작:
   ```
   npm run dev
   ```

## 트러블 슈팅
- [벡엔드 트러블 슈팅](trouble-shooting/backend-trouble-shooting.png) - 백엔드 트러블 슈팅
- [프론트엔드 트러블 슈팅](trouble-shooting/frontend-trouble-shooting.png) - 프론트엔드 트러블 슈팅
