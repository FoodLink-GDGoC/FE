# 🏪 서비스 프로젝트 : FOODLINK

> **GRGoC Project** > 일반 사용자와 매장 사장님을 연결하는 마감 할인 음식 예약 및 상점 관리 플랫폼의 프론트엔드 리포지토리입니다.

---

## 📌 서비스 개요
본 서비스는 지역 상권의 마감 할인 상품이나 잔여 음식을 소비자가 효율적으로 예약 및 구매하고, 매장 사장님이 편리하게 물품을 등록하고 예약을 관리할 수 있도록 돕는 **양방향 매칭 플랫폼**입니다.

- **일반 사용자**는 지도를 기반으로 주변 매장의 잔여 아이템을 확인하고 실시간으로 예약할 수 있습니다.
- **매장 사장님**은 대시보드를 통해 실시간 물품 관리, 음식 등록, 예약 접수 및 픽업 완료 처리를 직관적으로 수행할 수 있습니다.

---

## 🚀 주요 기능 MVP

### 1. 공통 기능
- **회원가입 및 로그인**: 일반 유저와 매장 사장님 계정 유형 선택 분기 처리 및 세션 관리 (`POST /api/user/accounts/...`, `POST /api/store/accounts/...`)
- **스플래시 화면**: 서비스 진입 시 브랜드 아이덴티티 전달을 위한 인트로 인터페이스

### 2. 일반 사용자 모드
- **홈 (지도 + 목록)**: 위치 기반 주변 매장 잔여 아이템 및 특정 매장 잔여 아이템 목록 조회 (`GET /api/user/items/nearby`, `GET /api/user/items/stores/{storeId}`)
- **예약 프로세스**: 바텀시트(Bottom Sheet)를 통한 수량 선택 및 실시간 예약 생성 (`GET/POST /api/user/reserve/items/{itemId}`)
- **내 예약 관리**: 예약 완료 상태 확인, 예약 목록 및 상세 정보 조회 (`GET /api/user/reserve`, `GET /api/user/reserve/reservations/{reservationId}`)
- **마이페이지**: 유저 개인 정보 관리 및 로그아웃 기능

### 3. 매장 사장님 모드
- **대시보드**: 매장 프로필 관리 및 현재 등록된 물품 요약 인터페이스
- **음식 등록**: 판매할 잔여 음식 및 마감 상품 신규 등록 기능 (`POST /api/store/item/add`)
- **예약 목록 및 상태 관리**: 실시간 예약 목록 조회 및 예약 취소 요청, 고객 방문 시 픽업 완료 상태 변경 (`GET/PATCH /api/store/reservations/...`)

---

## 🛠 기술 스택

### Frontend
- **Framework**: `React` (with `TypeScript`) — 타입 안정성 확보 및 컴포넌트 기반 UI 개발
- **State Management**: `Zustand` — Flux 패턴 기반의 가볍고 직관적인 전역 상태 관리 (유저 세션 및 전역 상태 제어)
- **Styling**: `Tailwind CSS` — Utility-first 프레임워크를 활용한 신속하고 일관성 있는 디자인 시스템 구축 및 모바일/웹 레이아웃 구현

### Build Tool / Collaboration
- **Build Tool**: Vite
- **HTTP Client**: Axios (API 통신 및 에러 핸들링)

---

## 🗺 Information Architecture & User Flow

### 🔹 정보 구조도
├── 공통 (스플래시 ➔ 회원 유형 선택 ➔ 로그인/회원가입)
│
├── 일반 사용자
│   ├── 홈 (지도 + 목록)
│   ├── 예약하기 (바텀시트) ➔ 예약 완료
│   ├── 내 예약 목록 ➔ 예약 상세 / 취소
│   └── 마이페이지
│
└── 매장 사장님
├── 대시보드 (매장 프로필 + 물품 관리)
├── 음식 등록
└── 예약 목록 ➔ 픽업 완료 / 취소

### 🔹 유저 플로우
- **일반 사용자**: `스플래시` ➔ `로그인` ➔ `홈(지도)` ➔ `예약하기` ➔ `예약 완료` ➔ `내 예약` ➔ `마이페이지`
- **매장 사장님**: `회원가입` ➔ `대시보드` ➔ `음식 등록` ➔ `예약 목록` ➔ `픽업 완료 처리`

---

## 🔌 API 연동 및 UI 구현 현황

현재 주요 비즈니스 로직에 따른 **모든 핵심 UI 컴포넌트 구현 및 API 연동(100%)**이 정상적으로 완료되었습니다.

### [STORE] 매장/사장님 기능
- [x] `POST /api/store/item/add` — 상품 등록 UI 및 데이터 전송 완료
- [x] `GET /api/store/reservations` — 예약 목록 조회 및 실시간 카드 렌더링 완료
- [x] `PATCH /api/store/reservations/{reservationId}/cancel` — 예약 취소 요청 인터랙션 구현 완료
- [x] `PATCH /api/store/reservations/{reservationId}/pickup` — 사장님용 픽업 완료 처리 상태 업데이트 완료
- [x] `POST /api/store/accounts/signup` / `/login` / `/logout` — 사장님 계정 인증 및 토큰 관리 완료

### [USER] 일반 유저 기능
- [x] `GET /api/user/items/nearby` — 주변 매장 아이템 지도 및 목록 뷰 매핑 완료
- [x] `GET /api/user/items/stores/{storeId}` — 특정 매장 상세 잔여 아이템 리스트 조회 완료
- [x] `GET /api/user/reserve/items/{itemId}` — 바텀시트 내 아이템 예약 수량 선택 로직 연동 완료
- [x] `POST /api/user/reserve/items/{itemId}` — 예약하기 요청 및 성공 페이지 전환 완료
- [x] `GET /api/user/reserve` — 유저 예약 목록 데이터 바인딩 완료
- [x] `GET /api/user/reserve/reservations/{reservationId}` — 예약 상세 정보 모달/페이지 구현 완료
- [x] `POST /api/user/accounts/signup` / `/login` / `/logout` — 일반 유저 계정 권한 및 로그인 세션 관리 완료

---

## ⚙️ 시작하기

### 설치
npm install

### 실행
npm run dev