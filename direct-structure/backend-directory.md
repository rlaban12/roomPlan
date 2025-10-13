# 벡엔드 프로젝트 디렉터리 구조

```
backend
├── gradle
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── spring
    │   │           └── backend
    │   │               ├── api
    │   │               ├── config
    │   │               ├── domain
    │   │               │   ├── dto
    │   │               │   │   ├── request
    │   │               │   │   └── response
    │   │               │   └── entity
    │   │               ├── healthcheck
    │   │               ├── jwt
    │   │               ├── repository
    │   │               └── service
    │   │
    │   │── BackendApplication.java
    │   │
    │   └── resources
    │       ├── static
    │       └── templates
    │
    │
    └── test
        └── java
            └── com
                └── spring 
                    └── backend     
                        └── repository

```