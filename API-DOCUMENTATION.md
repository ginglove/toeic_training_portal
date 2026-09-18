# TÀI LIỆU KỸ THUẬT & HƯỚNG DẪN TÍCH HỢP API — TOEIC PRO v10.0.0
**Comprehensive Developer Guide & REST API Reference Manual**

Phiên bản: **10.0.0**  
Base URL Production: `https://api.toeicpro.com/v1`  
Base URL Staging: `https://staging-api.toeicpro.com/v1`  
Đặc tả OpenAPI: [openapi.yaml](./openapi.yaml) · [openapi.json](./openapi.json)  
Cam kết Nền tảng: **100% Miễn phí — Zero Paywall — Mọi tài nguyên mở cho học viên.**

---

## Mục lục

1. [Tổng quan Kiến trúc API](#1-tổng-quan-kiến-trúc-api)
2. [Cơ chế Xác thực & Quản lý Phiên (Authentication & Session)](#2-cơ-chế-xác-thực--quản-lý-phiên)
3. [Cấu trúc Response Envelope & Xử lý Lỗi RFC 7807](#3-cấu-trúc-response-envelope--xử-lý-lỗi-rfc-7807)
4. [Kiểm soát Đồng thời, Chống Gian lận & Idempotency](#4-kiểm-soát-đồng-thời-chống-gian-lận--idempotency)
5. [Hạn ngạch Tần suất Yêu cầu (Rate Limiting Tiers)](#5-hạn-ngạch-tần-suất-yêu-cầu-rate-limiting-tiers)
6. [Danh mục Endpoint Chi tiết theo Phân hệ](#6-danh-mục-endpoint-chi-tiết-theo-phân-hệ)
   - 6.1 [Xác thực & Bảo mật (Auth & Security)](#61-xác-thực--bảo-mật-auth)
   - 6.2 [Hồ sơ Cá nhân & Thiết lập Lộ trình (User & Journey Settings)](#62-hồ-sơ-cá-nhân--thiết-lập-lộ-trình)
   - 6.3 [Khảo thí Thích ứng Đầu vào IRT 2PL (Adaptive Diagnostic)](#63-khảo-thí-thích-ứng-đầu-vào-irt-2pl)
   - 6.4 [Bản đồ Hành trình Saga & Nhiệm vụ Ngày (Saga Map & Journey)](#64-bản-đồ-hành-trình-saga--nhiệm-vụ-ngày)
   - 6.5 [Trạm Bài học Saga (Map Nodes)](#65-trạm-bài-học-saga-nodes)
   - 6.6 [Phòng thi Mô phỏng CBT & Heartbeat (CBT Examination Engine)](#66-phòng-thi-mô-phỏng-cbt--heartbeat)
   - 6.7 [Luyện tập Vi mô & Kỹ năng (Micro-drills & Skill Practice)](#67-luyện-tập-vi-mô--kỹ-năng)
   - 6.8 [Sổ tay Lỗi sai & Lặp lại Ngắt quãng SM-2 (Mistake Notebook)](#68-sổ-tay-lỗi-sai--lặp-lại-ngắt-quãng-sm-2)
   - 6.9 [Gamification, Nhiệm vụ Ngày & Cửa hàng (Quests & Shop)](#69-gamification-nhiệm-vụ-ngày--cửa-hàng)
   - 6.10 [Đấu trường Đối kháng Thời gian thực (Real-time 1v1 Arena)](#610-đấu-trường-đối-kháng-thời-gian-thực-1v1-arena)
   - 6.11 [Phân tích Năng lực & Chỉ số Đo lường (Analytics & Telemetry)](#611-phân-tích-năng-lực--chỉ-số-đo-lường)
   - 6.12 [Quản trị Nội dung & Đồng bộ Ngoại tuyến (Admin & Offline Sync)](#612-quản-trị-nội-dung--đồng-bộ-ngoại-tuyến)
7. [Mã Lỗi Hệ thống Chuẩn hóa (System Error Code Catalog)](#7-mã-lỗi-hệ-thống-chuẩn-hóa)
8. [Mã Nguồn Mẫu Tích hợp Client (TypeScript SDK Client)](#8-mã-nguồn-mẫu-tích-hợp-client-typescript-sdk)

---

## 1. Tổng quan Kiến trúc API

Hệ thống API của **TOEIC PRO** được xây dựng theo chuẩn RESTful Resource-Oriented Architecture kết hợp cơ chế Event-Driven bất đồng bộ:

- **Strict URL Versioning**: 100% endpoint được bảo vệ dưới tiền tố `/api/v1/...`.
- **Resource-Oriented Naming**: Sử dụng danh từ số nhiều cho collection (`/exams`, `/nodes`, `/questions`), không sử dụng động từ hành động trên URI.
- **Ký hiệu Tham số Chuẩn OpenAPI**: Sử dụng `{id}`, `{skillId}`, `{taskId}`, `{attemptId}`.
- **Tách biệt Đồng bộ (Sync) & Bất đồng bộ (Async Worker)**: Các tác vụ nộp bài chỉ xử lý tính điểm tức thời (Critical Path latency $\le 100	ext{ms}$); toàn bộ tác vụ đồng bộ câu sai vào sổ tay SM-2, tích lũy EXP, kiểm tra tiến hóa Lexling được chuyển tiếp qua hàng đợi BullMQ / Redis Streams.
- **Pre-warmed In-Memory Cache**: Toàn bộ tham số IRT $a_i, b_i$ (2PL) của kho câu hỏi thích ứng (quy mô tối thiểu $\ge 1.000+$ câu đã hiệu chuẩn, bảo đảm tỷ lệ phơi nhiễm câu $\le 20\%$) được nạp sẵn vào Redis RAM để thuật toán chọn câu hỏi kế tiếp theo Fisher Information đạt tốc độ phản hồi $<30\text{ms}$.

---

## 2. Cơ chế Xác thực & Quản lý Phiên

Hệ thống sử dụng cơ chế xác thực kép phân tách trách nhiệm (Dual-Token Pattern):

```
+----------------+                +-------------------+                +---------------+
|  Client (App)  |                |  Edge API Gateway |                |  Redis State  |
+----------------+                +-------------------+                +---------------+
       |                                    |                                  |
       |--- POST /api/v1/auth/login ------->|                                  |
       |    {email, password}               |--- Kiểm tra hash Argon2id ------>|
       |                                    |--- Lưu session:<userId> -------->|
       |<-- 200 OK -------------------------|                                  |
       |    Header: Set-Cookie (Refresh)    |                                  |
       |    Body: { accessToken (JWT 15m) } |                                  |
       |                                    |                                  |
       |--- GET /api/v1/users/me/dashboard -|                                  |
       |    Header: Authorization: Bearer   |--- Xác thực chữ ký RS256 ------->|
       |<-- 200 OK {data} ------------------|                                  |
       |                                    |                                  |
       |    [Khi Access Token hết hạn 401]  |                                  |
       |--- POST /api/v1/auth/refresh ----->|                                  |
       |    Cookie: refreshToken            |--- Token Rotation (Thu hồi cũ) ->|
       |<-- 200 OK {newAccessToken} --------|                                  |
```

- **Access Token**: JSON Web Token (JWT) được ký bằng thuật toán mã hóa bất đối xứng **RS256** (Private key ký tại Auth Service, Public key xác thực tại Gateway). Thời hạn: **15 phút**.
- **Refresh Token**: Chuỗi ngẫu nhiên bảo mật cao được lưu trữ trong **HttpOnly Secure SameSite=Strict Cookie**, thời hạn: **30 ngày**.
- **Token Rotation**: Mỗi khi gọi `/api/v1/auth/refresh`, server tự động cấp một Refresh Token mới và thu hồi Refresh Token cũ trong Redis để ngăn chặn tấn công replay.

---

## 3. Cấu trúc Response Envelope & Xử lý Lỗi RFC 7807

### 3.1 Cấu trúc Phản hồi Thành công (Success Envelope)
```json
{
  "success": true,
  "data": {
    "id": "node-day5-02",
    "title": "Chuyên đề: Mệnh đề Quan hệ Rút gọn",
    "targetPart": 5,
    "questionCount": 10
  },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 120,
    "totalPages": 6,
    "hasNextPage": true,
    "hasPrevPage": false,
    "cursor": "eyJpZCI6MTIwLCJzZXEiOjV9"
  },
  "error": null
}
```

### 3.2 Cấu trúc Phản hồi Lỗi Chuẩn RFC 7807 (Problem Details)
```json
{
  "success": false,
  "data": null,
  "meta": null,
  "error": {
    "type": "https://api.toeicpro.com/v1/errors/STALE_CLIENT_SEQUENCE",
    "title": "Stale Sequence Conflict",
    "status": 409,
    "code": "STALE_CLIENT_SEQUENCE",
    "detail": "Gói tin đáp án câu hỏi có số tuần tự 14 cũ hơn phiên bản đã lưu (15).",
    "instance": "/api/v1/exams/sessions/sess-9021/answers",
    "invalidParams": [
      {
        "name": "clientSequence",
        "reason": "Sequence must be strictly greater than last saved sequence (15)"
      }
    ],
    "timestamp": "2026-09-16T08:14:22.100Z",
    "traceId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
  }
}
```

---

## 4. Kiểm soát Đồng thời, Chống Gian lận & Idempotency

### 4.1 Header Idempotency-Key
Đối với các thao tác nhạy cảm:
- Nộp bài thi: `POST /api/v1/exams/sessions/{id}/submissions`
- Nhận thưởng nhiệm vụ: `POST /api/v1/quests/{id}/claims`
- Mua vật phẩm: `POST /api/v1/shop/purchases`
- Hoàn thành trạm Saga: `POST /api/v1/nodes/{id}/attempts/{attemptId}/completion`

Client **bắt buộc** truyền header `Idempotency-Key: <UUIDv4>`. Nếu mạng lag và request bị gửi lặp lại trong vòng 60 giây, server sẽ trả về kết quả đã xử lý trước đó mà không thực hiện trừ Gems hoặc tính điểm lần hai.

### 4.2 Chuỗi Tuần tự Tăng dần (Monotonic Client Sequence)
Trong suốt bài thi, mỗi lần chọn đáp án, client tăng biến `localSeq++` và gửi qua `PUT /api/v1/exams/sessions/{id}/answers`:
```json
{
  "questionId": "q-part5-101",
  "selectedOption": "B",
  "clientSequence": 42,
  "timeSpentMs": 8500
}
```
Server chỉ chấp nhận nếu `clientSequence > attempt.lastSequence`. Điều này đảm bảo khi gói tin mạng 4G đến trễ sau gói tin mạng Wifi, dữ liệu mới nhất không bao giờ bị ghi đè bởi dữ liệu cũ.

### 4.3 Khóa Phân tán Redis (Distributed Exam Lock)
Khi bắt đầu thi CBT, server tạo khóa `SET exam:lock:{userId} {sessionId} NX EX 45`. Mỗi 15 giây, client gửi Heartbeat để gia hạn khóa thêm 45s. Nếu học viên mở tab thứ hai hoặc thiết bị khác, hệ thống từ chối với lỗi `409 CONCURRENT_EXAM_ACTIVE`.

### 4.4 Chuẩn Hóa Múi Giờ & Chống Gian Lận Đồng Hồ (Timezone Anti-Cheat Normalization)
Mọi tài khoản người dùng lưu trữ trường `User.timezone` (chuỗi định danh IANA chuẩn, ví dụ: `"Asia/Ho_Chi_Minh"`, `"UTC"`).
- **Chu kỳ đặt lại ngày học (Midnight Cycle):** Thời điểm chuyển ngày tính chuỗi Streak, làm mới nhiệm vụ ngày, và đặt lại hạn mức 30 Đá quý luyện tập (`dailyDrillGemsEarned`) được tính toán độc lập tại Server bằng cách ánh xạ Server UTC sang múi giờ `User.timezone`.
- **Chống tua thời gian client:** Server **tuyệt đối không tin cậy** trường thời gian `Date.now()` do client gửi lên. Mọi mốc thời gian hoàn thành đều đối chiếu với Server Time; các gói tin có chênh lệch thời gian bất thường ($> 120\text{s}$) hoặc cố tình tua lùi giờ hệ thống sẽ bị Gateway từ chối hoặc chuẩn hóa về UTC hiện tại.

---

## 5. Hạn ngạch Tần suất Yêu cầu (Rate Limiting Tiers)

| Nhóm API | Giới hạn | Thuật toán | Hành vi khi vượt hạn ngạch |
|----------|----------|------------|----------------------------|
| **Xác thực (`/api/v1/auth/*`)** | 5 requests / phút / IP | Sliding Window | HTTP 429 Too Many Requests kèm `Retry-After: 60` |
| **Heartbeat (`/api/v1/exams/sessions/{id}/heartbeats`)** | 120 requests / phút / Session | Token Bucket | HTTP 429 (Chỉ cảnh báo, không ngắt kết nối bài làm) |
| **Luyện tập & Trạm (`/api/v1/nodes/*`, `/api/v1/drills/*`)** | 60 requests / phút / User | Leaky Bucket | HTTP 429 kèm thông báo làm chậm nhịp thao tác |
| **Ngoại tuyến Sync (`/api/v1/sync/answers`)** | 10 requests / phút / User | Fixed Window | Chờ 10 giây trước khi thử đợt đồng bộ tiếp theo |

---

## 6. Danh mục Endpoint Chi tiết theo Phân hệ

### 6.1 Xác thực & Bảo mật (Auth & Security)

#### `POST /api/v1/auth/register`
Đăng ký tài khoản học viên mới.
- **Request Body**:
  ```json
  {
    "email": "student@toeicpro.com",
    "password": "SecurePassword123!",
    "name": "Nguyễn Văn A"
  }
  ```
- **Response 201 Created**:
  ```json
  {
    "success": true,
    "data": {
      "userId": "usr-101",
      "email": "student@toeicpro.com",
      "isEmailVerified": false
    },
    "error": null
  }
  ```

#### `POST /api/v1/auth/login`
Đăng nhập hệ thống, cấp Access Token và Cookie Refresh Token.
- **Request Body**:
  ```json
  {
    "email": "student@toeicpro.com",
    "password": "SecurePassword123!"
  }
  ```
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresInSeconds": 900,
      "user": {
        "id": "usr-101",
        "name": "Nguyễn Văn A",
        "role": "STUDENT"
      }
    },
    "error": null
  }
  ```

#### `POST /api/v1/auth/refresh`
Cấp mới Access Token bằng Refresh Token trong Cookie (Token Rotation).
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbGciOiJSUzI1NiIs...",
      "expiresInSeconds": 900
    },
    "error": null
  }
  ```

#### `POST /api/v1/auth/logout`
Thu hồi Refresh Token và đưa Access Token vào danh sách đen Redis.
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": { "message": "Đăng xuất thành công." },
    "error": null
  }
  ```

---

### 6.2 Hồ sơ Cá nhân & Thiết lập Lộ trình (User & Journey Settings)

#### `GET /api/v1/users/me/dashboard`
Lấy toàn bộ dữ liệu trang chủ: thông tin người dùng, chuỗi streak, năng lượng, linh thú, 3 nhiệm vụ ngày và tiến độ trạm hiện tại.
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "user": { "name": "Nguyễn Văn A", "level": 3, "totalExp": 850 },
      "streak": { "current": 5, "max": 14, "activeShieldCount": 1 },
      "energy": { "current": 4, "max": 5, "nextRefillSeconds": 720 },
      "gems": 180,
      "guardian": { "name": "Sparky", "stage": 2, "spriteUrl": "/lexlings/sparky-stage2.png" },
      "currentStation": { "id": "node-day5-02", "title": "Đại từ phản thân", "dayIndex": 5 }
    },
    "error": null
  }
  ```

#### `POST /api/v1/users/me/energy/refills`
Nạp đầy năng lượng học tập bằng 20 Gems hoặc kích hoạt chế độ Luyện tập Hồi Năng lượng.
- **Request Body**:
  ```json
  { "method": "GEMS" }
  ```
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": { "energy": 5, "gemsRemaining": 160 },
    "error": null
  }
  ```

---

### 6.3 Khảo thí Thích ứng Đầu vào IRT 2PL (Adaptive Diagnostic)

> **Ràng buộc Mạng (Network Constraint)**: Bài thi Chẩn đoán Thích ứng CAT (IRT 2PL) là dịch vụ **Bắt buộc Trực tuyến (Online-Only)**. Thuật toán Fisher Information ước lượng $\hat{\theta}$ và chọn câu hỏi kế tiếp theo thời gian thực trên máy chủ. Toàn bộ tiến trình làm bài là **Chỉ-tiến (Forward-only)**. Bộ nhớ đệm IndexedDB/Dexie trên client chỉ đóng vai trò bộ đệm khôi phục phiên (Pause & Resume) khi mất mạng tạm thời.

#### `POST /api/v1/diagnostic/attempts`
Khởi tạo bài thi chẩn đoán năng lực thích ứng (hỗ trợ cả bản Chuẩn tối đa 50 câu và Express 15 câu).
- **Request Body**:
  ```json
  {
    "mode": "STANDARD", 
    "targetPartList": [1, 2, 3, 4, 5, 6, 7]
  }
  ```
- **Response 201 Created**:
  ```json
  {
    "success": true,
    "data": {
      "attemptId": "diag-att-801",
      "totalQuestions": 50,
      "firstQuestion": {
        "id": "q-diag-01",
        "partNumber": 5,
        "questionNumber": 1,
        "questionText": "The seminar on digital marketing will begin promptly _______ 9:00 AM.",
        "options": [
          {"label": "A", "text": "at"},
          {"label": "B", "text": "on"},
          {"label": "C", "text": "in"},
          {"label": "D", "text": "for"}
        ]
      }
    },
    "error": null
  }
  ```

#### `POST /api/v1/diagnostic/attempts/{attemptId}/answers`
Gửi đáp án câu hỏi chẩn đoán và nhận câu hỏi tiếp theo được chọn lọc theo Fisher Information.
- **Request Body**:
  ```json
  {
    "questionId": "q-diag-01",
    "selectedOption": "A",
    "timeSpentMs": 11200,
    "isGuessed": false
  }
  ```
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "progress": "2/50",
      "nextQuestion": {
        "id": "q-diag-02",
        "partNumber": 5,
        "questionNumber": 2,
        "questionText": "Participants are encouraged to ask questions _______ the presentation.",
        "options": [
          {"label": "A", "text": "during"},
          {"label": "B", "text": "while"},
          {"label": "C", "text": "between"},
          {"label": "D", "text": "throughout"}
        ]
      }
    },
    "error": null
  }
  ```

#### `POST /api/v1/diagnostic/attempts/{attemptId}/completion`
Hoàn tất bài chẩn đoán, tính toán vector năng lực $\hat{	heta}$ và điểm TOEIC dự đoán.
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "predictedOverallScore": 620,
      "predictedListening": 330,
      "predictedReading": 290,
      "thetaListening": 0.42,
      "thetaReading": 0.15,
      "skillMastery": {
        "GRAMMAR_PREPOSITION": 0.85,
        "VOCABULARY_BUSINESS": 0.58,
        "LISTENING_SHORT_TALK": 0.62
      }
    },
    "error": null
  }
  ```

---

### 6.4 Bản đồ Hành trình Saga & Nhiệm vụ Ngày (Saga Map & Journey)

#### `POST /api/v1/journey/calculate-duration`
Tính toán thời lượng lộ trình cá nhân hóa linh hoạt theo công thức sư phạm chuẩn hóa:
$$D = \min\left(30, \max\left(7, \text{round}\left(7 + \frac{\Delta S}{12} \times W_{band} \times \frac{45}{T_{daily}}\right)\right)\right)$$
trong đó $W_{band} = 1.0 + \frac{S_{initial}}{1000}$. Nếu khoảng cách $\Delta S = S_{target} - S_{initial} > 180$, hệ thống tự động trả về cảnh báo `requiresRealityCheck: true`.
- **Request Body**:
  ```json
  {
    "initialScore": 420,
    "targetScore": 750,
    "dailyMinutes": 45
  }
  ```
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "calculatedDurationDays": 30,
      "scoreDelta": 330,
      "bandWeight": 1.42,
      "dailyMinutes": 45,
      "totalNodes": 90,
      "requiresRealityCheck": true,
      "realityCheckDetails": {
        "reason": "Chênh lệch điểm mục tiêu (330đ) vượt quá giới hạn an toàn sư phạm 180đ cho lộ trình 30 ngày.",
        "options": [
          { "type": "EXTEND_DURATION", "recommendedDays": 45, "label": "Kéo dài thời gian lên 45 ngày (Khuyến nghị)" },
          { "type": "ADJUST_INTERMEDIATE_TARGET", "recommendedTarget": 600, "label": "Điều chỉnh mục tiêu Giai đoạn 1 về 600+" },
          { "type": "INTENSIFY_REGIMEN", "recommendedDailyMinutes": 90, "label": "Tăng cường độ học lên 90 phút/ngày" }
        ]
      }
    },
    "error": null
  }
  ```

#### `POST /api/v1/journeys/{journeyId}/maps`
Tự động sinh cấu trúc Bản đồ Saga 2.5D gồm $N = 3 \times D$ trạm bài học cá nhân hóa phân bố qua 4 Quần xã sinh thái (Biomes).
- **Response 201 Created**:
  ```json
  {
    "success": true,
    "data": {
      "journeyId": "jrn-01",
      "durationDays": 21,
      "totalNodes": 63,
      "biomes": [
        {"name": "SUNRISE_VALLEY", "label": "Bình Minh Khởi Động (0% - 25%)", "nodeRange": [1, 16]},
        {"name": "ECHO_FOREST", "label": "Rừng Phản Xạ Sóng Âm (26% - 50%)", "nodeRange": [17, 32]},
        {"name": "GRAMMAR_CANYON", "label": "Hẻm Núi Cú Pháp & Logic (51% - 75%)", "nodeRange": [33, 48]},
        {"name": "APEX_SUMMIT", "label": "Đỉnh Cao Tốc Độ & Thử Thách (76% - 100%)", "nodeRange": [49, 63]}
      ],
      "nodeTypesSummary": {
        "WARMUP": 18,
        "REVIEW_GATE": 4,
        "SKILL_DRILL": 35,
        "DAILY_BOSS": 5,
        "FINAL_EXAM": 1
      }
    },
    "error": null
  }
  ```

#### `GET /api/v1/journeys/{journeyId}/maps`
Lấy toàn bộ danh sách các node, tọa độ S-Curve, trạng thái mở khóa và vị trí của Linh thú.
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "currentNodeId": "node-day5-02",
      "nodes": [
        {
          "id": "node-day1-01",
          "nodeIndex": 1,
          "nodeType": "WARMUP",
          "biome": "SUNRISE_VALLEY",
          "title": "Khởi động: Part 1 Ảnh người",
          "coordXPercent": 67.5,
          "coordYIndex": 1,
          "status": "COMPLETED",
          "starsEarned": 3
        },
        {
          "id": "node-day2-06",
          "nodeIndex": 6,
          "nodeType": "REVIEW_GATE",
          "biome": "SUNRISE_VALLEY",
          "title": "Khóa cửa Ôn tập: Kiểm tra 6 dạng bẫy",
          "minStarsRequired": 2,
          "coordXPercent": 45.0,
          "coordYIndex": 2,
          "status": "UNLOCKED",
          "starsEarned": 0
        }
      ]
    },
    "error": null
  }
  ```

---

### 6.5 Trạm Bài học Saga (Map Nodes)

#### `POST /api/v1/nodes/{id}/attempts`
Bắt đầu làm bài tại trạm học tập chỉ định.
- **Response 201 Created**:
  ```json
  {
    "success": true,
    "data": {
      "nodeAttemptId": "node-att-402",
      "nodeId": "node-day5-02",
      "questions": [
        {
          "id": "q-1051",
          "questionNumber": 1,
          "questionText": "Ms. Tanaka prepared the proposal _______ without any external help.",
          "options": [
            {"label": "A", "text": "she"},
            {"label": "B", "text": "her"},
            {"label": "C", "text": "herself"},
            {"label": "D", "text": "hers"}
          ]
        }
      ]
    },
    "error": null
  }
  ```

#### `POST /api/v1/nodes/{id}/attempts/{attemptId}/completion`
[Bắt buộc Header: `Idempotency-Key`]: Nộp bài làm trạm bài học, tính điểm, cập nhật SM-2 tự động theo $(isCorrect, R_{time}, isGuessed)$, kiểm tra hạn ngạch Đá quý hằng ngày (tối đa 30 Gems/ngày), mở khóa trạm tiếp theo và kiểm tra tiến hóa Linh thú.
- **Request Body**:
  ```json
  {
    "answers": [
      {
        "questionId": "q-1051",
        "selectedOption": "C",
        "clientSequence": 1,
        "timeSpentMs": 7200,
        "isGuessed": false
      },
      {
        "questionId": "q-1052",
        "selectedOption": "A",
        "clientSequence": 2,
        "timeSpentMs": 18500,
        "isGuessed": true
      }
    ]
  }
  ```
- **Quy tắc Tính SM-2 Tự Động ($q \in [0, 5]$)**:
  - Nếu trả lời sai: $q = 0$ (hoặc $q = 1$ nếu $R_{time} > 2.0$, $q = 2$ nếu $R_{time} \le 2.0$).
  - Nếu trả lời đúng:
    - Phỏng đoán ($isGuessed = true$) hoặc làm quá chậm ($R_{time} > 2.0$): $q = 3$, reset khoảng cách lặp lại về 1 ngày!
    - Tốc độ chuẩn ($1.0 < R_{time} \le 2.0$): $q = 4$.
    - Phản xạ nhanh vượt trội ($R_{time} \le 1.0$): $q = 5$.
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "nodeId": "node-day5-02",
      "starsEarned": 3,
      "accuracyPercentage": 100.0,
      "gemsAwarded": 10,
      "dailyDrillGemsEarnedToday": 20,
      "dailyDrillGemsRemainingToday": 10,
      "expAwarded": 45,
      "sm2Updates": [
        { "questionId": "q-1051", "calculatedQuality": 5, "nextIntervalDays": 3 },
        { "questionId": "q-1052", "calculatedQuality": 3, "nextIntervalDays": 1 }
      ],
      "unlockedNodeId": "node-day5-03",
      "isReviewGatePassed": true,
      "isEvolutionTriggered": false
    },
    "error": null
  }
  ```

---

### 6.6 Phòng thi Mô phỏng CBT & Heartbeat (CBT Examination Engine)

> **Cơ chế Ngoại Tuyến Toàn Phần (Offline-First CBT Engine)**: Khác với Bài thi Chẩn đoán Thích ứng CAT (bắt buộc duy trì kết nối mạng thời gian thực để ước lượng $\hat{\theta}$ theo Fisher Information), Bài thi Full CBT 200 câu là đề thi chuẩn hóa cố định được chấm theo thang điểm Equating độc lập. Sau khi thí sinh nạp đề và audio manifest, toàn bộ bài thi 200 câu có thể làm liên tục **120 phút hoàn toàn không cần Internet**; trạng thái lựa chọn và cờ review được lưu trữ bền vững tại IndexedDB (Dexie) và tự động đồng bộ lên máy chủ khi kết nối mạng được phục hồi theo NFR-RELI-02.

#### `GET /api/v1/exams/{id}/mini-diagnostic`
Tải đề kiểm tra chẩn đoán rút gọn chuẩn 50 câu (Thời lượng tối đa 40 phút, dừng sớm khi $\text{SEM} \le 0.28$, bao phủ 7 Part theo tỷ lệ vàng: P1: 2, P2: 6, P3: 9, P4: 8, P5: 8, P6: 4, P7: 13).
- **Bảo Mật CBT Part 2 Tuyệt Đối (Zero-Text Leak Policy)**: Đối với Part 2, toàn bộ văn bản câu hỏi và phương án đều là `null`/rỗng trong payload client nhằm chống rò rỉ đề qua DevTools. Audio cue timestamps được cung cấp để đồng bộ sóng âm.
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "examId": "mini-diag-50q",
      "title": "TOEIC Pro Mini-Diagnostic Test (50 Questions)",
      "totalQuestions": 50,
      "timeLimitSeconds": 2400,
      "sections": [
        {
          "part": 2,
          "directionAudioUrl": "https://cdn.toeicpro.com/audio/diag/p2_dir.mp3",
          "audioCueTimestamps": {
            "introEndMs": 2500,
            "questionCueTimestamps": [
              { "qId": "q-diag-04", "startMs": 2500, "endMs": 13800, "intervalMs": 5000 }
            ]
          },
          "questions": [
            {
              "id": "q-diag-04",
              "part": 2,
              "questionNumber": 4,
              "questionText": null,
              "options": [
                { "label": "A", "text": null },
                { "label": "B", "text": null },
                { "label": "C", "text": null }
              ]
            }
          ]
        }
      ]
    },
    "error": null
  }
  ```

#### `POST /api/v1/exams/sessions`
Khởi tạo phiên làm bài thi CBT định dạng chuẩn ETS hoặc khôi phục phiên đang dang dở.
- **Request Body**:
  ```json
  {
    "examId": "exam-tp-mock-01",
    "deviceId": "macbook-pro-chrome-v122"
  }
  ```
- **Response 201 Created**:
  ```json
  {
    "success": true,
    "data": {
      "sessionId": "sess-cbt-9021",
      "totalQuestions": 200,
      "timeLimitSeconds": 7200,
      "audioManifest": {
        "part1AudioUrl": "https://cdn.toeicpro.com/audio/mock01/part1.mp3",
        "cuePoints": [{"qIndex": 1, "startMs": 12000, "endMs": 28000}]
      }
    },
    "error": null
  }
  ```

#### `POST /api/v1/exams/sessions/{id}/heartbeats`
Gửi tín hiệu sống định kỳ mỗi 15 giây để đồng bộ đồng hồ còn lại và gia hạn Redis lock.
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "serverTimestamp": "2026-09-16T08:14:22.100Z",
      "remainingSeconds": 6480,
      "isSessionValid": true
    },
    "error": null
  }
  ```

#### `PUT /api/v1/exams/sessions/{id}/answers`
Lưu câu trả lời từng câu hỏi với kiểm tra chuỗi thứ tự tuần tự `clientSequence`.
- **Request Body**:
  ```json
  {
    "questionId": "q-101",
    "selectedOption": "C",
    "clientSequence": 18,
    "isFlagged": false,
    "timeSpentMs": 9500
  }
  ```
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": { "lastSavedSequence": 18, "savedAt": "2026-09-16T08:14:30.000Z" },
    "error": null
  }
  ```

#### `POST /api/v1/exams/sessions/{id}/submissions`
[Bắt buộc Header: `Idempotency-Key`]: Nộp bài thi hoàn tất, tính điểm TOEIC theo Bảng Equating chính thức và giải phóng Redis lock.
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "attemptId": "att-cbt-9021",
      "totalScore": 790,
      "listeningScore": 415,
      "readingScore": 375,
      "totalCorrect": 164,
      "totalQuestions": 200
    },
    "error": null
  }
  ```

---

### 6.7 Luyện tập Vi mô & Kỹ năng (Micro-drills & Skill Practice)

#### `GET /api/v1/skills/{skillId}/drills`
Lấy 5-10 câu hỏi chuyên sâu theo vi kỹ năng (ví dụ: `RC_TENSE_PERFECT`).
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "skillId": "RC_TENSE_PERFECT",
      "skillName": "Thì Hiện tại Hoàn thành & Quá khứ Hoàn thành",
      "questions": [ "..." ]
    },
    "error": null
  }
  ```

#### `POST /api/v1/skills/{skillId}/drills/answers`
Gửi đáp án câu vi mô, nhận phân tích giải thích, bẫy đề thi và tự động lưu vào Sổ tay SM-2 nếu sai.
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "isCorrect": true,
      "explanation": "Động từ 'since' ở mệnh đề phụ đòi hỏi mệnh đề chính chia thì hiện tại hoàn thành...",
      "trapNote": "Bẫy thì quá khứ đơn do có mốc thời gian năm 2020.",
      "qualityScoreQ": 5
    },
    "error": null
  }
  ```

---

### 6.8 Sổ tay Lỗi sai & Lặp lại Ngắt quãng SM-2 (Mistake Notebook)

#### `GET /api/v1/notebook/due`
Lấy danh sách các thẻ câu hỏi sai đã đến hạn ôn tập ngày hôm nay theo thuật toán SuperMemo-2.
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "dueCardCount": 14,
      "cards": [
        {
          "notebookId": "nb-item-301",
          "questionId": "q-142",
          "partNumber": 5,
          "easinessFactor": 2.36,
          "repetitionNumber": 2,
          "intervalDays": 6
        }
      ]
    },
    "error": null
  }
  ```

#### `POST /api/v1/notebook/reviews`
Gửi kết quả lượt ôn tập thẻ để tính toán chu kỳ lặp mới ($EF', Interval', nextReviewDate$).
- **Request Body**:
  ```json
  {
    "notebookId": "nb-item-301",
    "isCorrect": true,
    "timeSpentMs": 14000,
    "isGuessed": false
  }
  ```
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "calculatedQuality": 4,
      "newEasinessFactor": 2.36,
      "newIntervalDays": 14,
      "nextReviewDate": "2026-09-30T08:00:00.000Z"
    },
    "error": null
  }
  ```

---

### 6.9 Gamification, Nhiệm vụ Ngày & Cửa hàng (Quests & Shop)

#### `POST /api/v1/quests/{id}/claims`
[Bắt buộc Header: `Idempotency-Key`]: Nhận phần thưởng Gems và EXP của nhiệm vụ hàng ngày đã hoàn thành.
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "questId": "quest-daily-01",
      "gemsAwarded": 10,
      "expAwarded": 50,
      "newTotalGems": 190
    },
    "error": null
  }
  ```

#### `POST /api/v1/shop/purchases`
[Bắt buộc Header: `Idempotency-Key`]: Dùng Gems trong game đổi Khiên bảo vệ Streak (Streak Freeze) hoặc thẻ nhân đôi EXP.
- **Request Body**:
  ```json
  { "itemId": "ITEM_STREAK_FREEZE", "quantity": 1 }
  ```
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "purchasedItem": "ITEM_STREAK_FREEZE",
      "activeShieldCount": 2,
      "gemsRemaining": 140
    },
    "error": null
  }
  ```

---

### 6.10 Đấu trường Đối kháng Thời gian thực (1v1 Arena)

#### `POST /api/v1/arena/matches`
Tham gia hàng đợi tìm đối thủ ghép cặp thi đấu đối kháng 1v1 trong 90 giây.
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "matchId": "match-arena-4401",
      "status": "IN_PROGRESS",
      "opponent": {
        "name": "Trần Thị B",
        "avatarUrl": "/avatars/user-b.png",
        "mmr": 1240
      },
      "timeLimitSec": 90,
      "questions": [ "..." ]
    },
    "error": null
  }
  ```

---

### 6.11 Phân tích Năng lực & Chỉ số Đo lường (Analytics & Telemetry)

#### `GET /api/v1/analytics/overview?timeframe=30D`
Lấy dữ liệu tổng hợp xu hướng tăng điểm, thời lượng học tập trung bình và dự báo điểm thi chính thức.
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "predictedScore": 765,
      "scoreDelta": 145,
      "totalStudyMinutes": 1380,
      "accuracyByPart": {
        "part1": 88.5,
        "part2": 82.0,
        "part3": 74.5,
        "part4": 71.0,
        "part5": 84.0,
        "part6": 78.0,
        "part7": 69.5
      }
    },
    "error": null
  }
  ```

---

### 6.12 Quản trị Nội dung & Đồng bộ Ngoại tuyến (Admin & Offline Sync)

#### `POST /api/v1/sync/offline-batch`
[Bắt buộc Header: `Idempotency-Key`]: Đồng bộ hàng loạt kết quả làm bài tập trạm Saga được tích lũy trong cơ sở dữ liệu IndexedDB/Dexie khi thiết bị ở chế độ ngoại tuyến. Server duyệt từng bài nộp theo thứ tự tuần tự `clientSequence`, áp dụng thuật toán SM-2, cộng EXP/Gems (tuân thủ giới hạn 30 Gems/ngày) và trả về kết quả chi tiết từng phần.
- **Request Body**:
  ```json
  {
    "batchId": "dexie-batch-8802",
    "deviceTimezone": "Asia/Ho_Chi_Minh",
    "submissions": [
      {
        "nodeId": "node-day3-01",
        "attemptId": "att-offline-01",
        "idempotencyKey": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "completedAtUtc": "2026-09-16T14:30:00.000Z",
        "clientSequence": 5,
        "answers": [
          { "questionId": "q-501", "selectedOption": "A", "timeSpentMs": 6200, "isGuessed": false },
          { "questionId": "q-502", "selectedOption": "C", "timeSpentMs": 8100, "isGuessed": false }
        ]
      }
    ]
  }
  ```
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "batchId": "dexie-batch-8802",
      "totalSubmitted": 1,
      "successCount": 1,
      "failedCount": 0,
      "results": [
        {
          "nodeId": "node-day3-01",
          "status": "PROCESSED",
          "starsEarned": 3,
          "gemsAwarded": 10,
          "expAwarded": 30,
          "unlockedNodeId": "node-day3-02"
        }
      ]
    },
    "error": null
  }
  ```

#### `POST /api/v1/sync/answers`
Đồng bộ hàng loạt gói tin câu trả lời khi thiết bị kết nối mạng trở lại từ chế độ ngoại tuyến.
- **Request Body**:
  ```json
  {
    "batch": [
      {
        "attemptId": "att-cbt-9021",
        "questionId": "q-102",
        "selectedOption": "A",
        "clientSequence": 19,
        "answeredAt": "2026-09-16T08:14:40.000Z"
      }
    ]
  }
  ```
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "syncedCount": 1,
      "rejectedCount": 0
    },
    "error": null
  }
  ```

---

## 7. Mã Lỗi Hệ thống Chuẩn hóa (System Error Code Catalog)

| Mã Lỗi (Code) | HTTP Status | Tiêu đề Lỗi | Ý nghĩa & Giải pháp cho Client |
|---------------|-------------|-------------|--------------------------------|
| `AUTH_INVALID_CREDENTIALS` | 401 | Invalid Credentials | Email hoặc mật khẩu sai. Yêu cầu nhập lại. |
| `AUTH_TOKEN_EXPIRED` | 401 | Access Token Expired | Gọi ngay `POST /api/v1/auth/refresh` để đổi mã mới. |
| `AUTH_REFRESH_TOKEN_REVOKED` | 403 | Refresh Token Revoked | Phiên đăng nhập bị hủy. Điều hướng về màn S-02. |
| `CONCURRENT_EXAM_ACTIVE` | 409 | Concurrent Exam Session | Học viên đang làm bài trên tab/máy khác. |
| `STALE_CLIENT_SEQUENCE` | 409 | Stale Concurrency Sequence | Bỏ qua gói tin cũ, không ghi đè dữ liệu mới. |
| `DIAG_ALREADY_DONE` | 409 | Diagnostic Completed | Học viên đã có lộ trình, điều hướng về S-10. |
| `IDEMPOTENCY_CONFLICT` | 409 | Duplicate Submission | Thao tác đang xử lý hoặc đã hoàn tất trước đó. |
| `NODE_LOCKED` | 403 | Node Locked By Fog of War | Chưa đạt yêu cầu mở khóa trạm trước đó. |
| `ENERGY_DEPLETED` | 400 | Out of Energy | Hết năng lượng trong Đấu trường 1v1 hoặc Luyện vô tận. Trạm học ngày và SM-2 không bị ảnh hưởng. |
| `OFFLINE_CAT_DISALLOWED` | 400 | Offline CAT Disallowed | Bài thi thích ứng yêu cầu kết nối trực tuyến để tính toán Fisher Information. |
| `RATE_LIMIT_EXCEEDED` | 429 | Rate Limit Exceeded | Tạm dừng gửi request theo thời gian `Retry-After`. |

---

## 8. Mã Nguồn Mẫu Tích hợp Client (TypeScript SDK)

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';

export class ToeicProApiClient {
  private client: AxiosInstance;
  private accessToken: string | null = null;

  constructor(baseURL = 'https://api.toeicpro.com/v1') {
    this.client = axios.create({
      baseURL,
      withCredentials: true, // Gửi cookie HttpOnly cho Refresh Token
      headers: { 'Content-Type': 'application/json' }
    });

    // Request Interceptor: Đính kèm JWT
    this.client.interceptors.request.use((config) => {
      if (this.accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      }
      return config;
    });

    // Response Interceptor: Tự động refresh khi 401
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
          (originalRequest as any)._retry = true;
          try {
            const refreshRes = await axios.post(
              `${baseURL}/auth/refresh`,
              {},
              { withCredentials: true }
            );
            this.accessToken = refreshRes.data.data.accessToken;
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${this.accessToken}`;
            }
            return this.client(originalRequest);
          } catch (refreshErr) {
            window.location.href = '/login';
            return Promise.reject(refreshErr);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Phương thức nộp đáp án thi CBT có bảo vệ Sequence
  async submitAnswer(sessionId: string, questionId: string, option: string, clientSequence: number) {
    return this.client.put(`/exams/sessions/${sessionId}/answers`, {
      questionId,
      selectedOption: option,
      clientSequence,
      timeSpentMs: 12000
    });
  }

  // Nộp bài thi có bảo vệ Idempotency
  async submitExam(sessionId: string, idempotencyKey: string) {
    return this.client.post(
      `/exams/sessions/${sessionId}/submissions`,
      {},
      { headers: { 'Idempotency-Key': idempotencyKey } }
    );
  }
}
```
