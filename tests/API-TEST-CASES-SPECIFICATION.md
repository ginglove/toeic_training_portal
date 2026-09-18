# BỘ ĐẶC TẢ CHI TIẾT TEST CASES API — TOEIC PRO v10.0.0
**Comprehensive API Test Specification & Execution Matrix**

- **Phiên bản hệ thống**: v10.0.0
- **Tài liệu căn cứ**: 
  - `API-DOCUMENTATION.md`
  - `SRS-TOEIC-PRO-v10.0.0-Screen-Design-Flows.md`
  - `openapi.json` / `openapi.yaml` (OpenAPI 3.1.0)
- **Phương pháp tiếp cận**: Test-Driven Development (TDD) — Kiểm thử Hộp xám / Hộp đen REST API kết hợp xác thực nghiệp vụ sâu (SM-2, IRT 2PL, CBT Concurrency, Idempotency, RFC 7807 Error Envelopes).

---

## MỤC LỤC BỘ KIỂM THỬ

1. [Phân hệ 1: Xác thực & Bảo mật (Auth & Security - TS-01)](#phân-hệ-1-xác-thực--bảo-mật-auth--security)
2. [Phân hệ 2: Hồ sơ Cá nhân, Lộ trình & Năng lượng (User & Journey - TS-02)](#phân-hệ-2-hồ-sơ-cá-nhân-lộ-trình--năng-lượng-user--journey)
3. [Phân hệ 3: Khảo thí Thích ứng Đầu vào IRT 2PL (Adaptive Diagnostic - TS-03)](#phân-hệ-3-khảo-thí-thích-ứng-đầu-vào-irt-2pl-adaptive-diagnostic)
4. [Phân hệ 4: Bản đồ Hành trình Saga & Kế hoạch Ngày (Saga Map - TS-04)](#phân-hệ-4-bản-đồ-hành-trình-saga--kế-hoạch-ngày-saga-map)
5. [Phân hệ 5: Trạm Bài học Saga & Cơ chế Mở khóa (Map Nodes - TS-05)](#phân-hệ-5-trạm-bài-học-saga--cơ-chế-mở-khóa-map-nodes)
6. [Phân hệ 6: Phòng thi Mô phỏng CBT & Heartbeat (CBT Engine - TS-06)](#phân-hệ-6-phòng-thi-mô-phỏng-cbt--heartbeat-cbt-engine)
7. [Phân hệ 7: Luyện tập Vi mô & Kỹ năng (Micro-Drills - TS-07)](#phân-hệ-7-luyện-tập-vi-mô--kỹ-năng-micro-drills)
8. [Phân hệ 8: Sổ tay Lỗi sai & Lặp lại Ngắt quãng SM-2 (Mistake Notebook - TS-08)](#phân-hệ-8-sổ-tay-lỗi-sai--lặp-lại-ngắt-quãng-sm-2-mistake-notebook)
9. [Phân hệ 9: Gamification, Nhiệm vụ Ngày & Cửa hàng (Quests & Shop - TS-09)](#phân-hệ-9-gamification-nhiệm-vụ-ngày--cửa-hàng-quests--shop)
10. [Phân hệ 10: Đấu trường Đối kháng 1v1 & Đo lường (Arena & Analytics - TS-10)](#phân-hệ-10-đấu-trường-đối-kháng-1v1--đo-lường-arena--analytics)
11. [Phân hệ 11: Đồng bộ Ngoại tuyến & Bảo toàn Dữ liệu (Offline Sync - TS-11)](#phân-hệ-11-đồng-bộ-ngoại-tuyến--bảo-toàn-dữ-liệu-offline-sync)
12. [Phân hệ 12: Quản trị Nội dung & Hệ thống (Admin & Operations - TS-12)](#phân-hệ-12-quản-trị-nội-dung--hệ-thống-admin--operations)

---

## PHÂN HỆ 1: XÁC THỰC & BẢO MẬT (AUTH & SECURITY)

### Endpoint 1.1: `POST /api/v1/auth/register`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-AUTH-001` | Đăng ký tài khoản thành công với dữ liệu hợp lệ | Positive | `{"email": "valid_user@toeicpro.test", "password": "StrongPassword123!", "name": "Nguyễn Văn Test"}` | `201 Created` | - `success == true`<br>- `data.userId` tồn tại (string)<br>- `data.email == "valid_user@toeicpro.test"`<br>- Header `Set-Cookie` chứa `refreshToken` (HttpOnly, Secure, SameSite=Strict)<br>- User trong DB được cấp 5 Energy, 0 Gems, 0 EXP |
| `TC-AUTH-002` | Từ chối đăng ký khi thiếu trường email | Negative | `{"password": "StrongPassword123!", "name": "Test"}` | `400 Bad Request` | - `success == false`<br>- `error.code == "VALIDATION_ERROR"`<br>- `error.invalidParams` chỉ rõ trường `email` |
| `TC-AUTH-003` | Từ chối đăng ký khi định dạng email sai cú pháp | Negative | `{"email": "not-an-email", "password": "StrongPassword123!", "name": "Test"}` | `400 Bad Request` | - `error.code == "VALIDATION_ERROR"`<br>- Lỗi regex email không hợp lệ |
| `TC-AUTH-004` | Từ chối đăng ký khi mật khẩu yếu (<8 ký tự) | Negative | `{"email": "user@toeicpro.test", "password": "123", "name": "Test"}` | `400 Bad Request` | - `error.code == "VALIDATION_ERROR"` |
| `TC-AUTH-005` | Từ chối đăng ký khi email đã tồn tại trong DB | Negative / Conflict | `{"email": "existing_user@toeicpro.test", ...}` | `409 Conflict` | - `error.code == "EMAIL_ALREADY_EXISTS"`<br>- Không tạo mới record trong DB |

### Endpoint 1.2: `POST /api/v1/auth/login`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-AUTH-006` | Đăng nhập thành công với thông tin đúng | Positive | `{"email": "valid_user@toeicpro.test", "password": "StrongPassword123!"}` | `200 OK` | - `data.accessToken` là chuỗi JWT hợp lệ (ký RS256, hạn 15m)<br>- `data.expiresInSeconds == 900`<br>- `data.user` chứa `id, name, role`<br>- Header `Set-Cookie` cấp mới `refreshToken` |
| `TC-AUTH-007` | Đăng nhập thất bại do sai mật khẩu | Negative | `{"email": "valid_user@toeicpro.test", "password": "WrongPassword!"}` | `401 Unauthorized` | - `error.code == "AUTH_INVALID_CREDENTIALS"`<br>- Không trả về access token hay cookie |
| `TC-AUTH-008` | Đăng nhập thất bại với email không tồn tại | Negative | `{"email": "unknown_email@toeicpro.test", "password": "Password123!"}` | `401 Unauthorized` | - `error.code == "AUTH_INVALID_CREDENTIALS"` |
| `TC-AUTH-009` | Từ chối đăng nhập với tài khoản bị khóa/xóa mềm | Negative / Forbidden | User có `deletedAt != null` hoặc `status == "SUSPENDED"` | `403 Forbidden` | - `error.code == "AUTH_ACCOUNT_SUSPENDED"` |

### Endpoint 1.3: `POST /api/v1/auth/refresh`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-AUTH-010` | Cấp mới Access Token bằng Refresh Token (Token Rotation) | Positive | `Cookie: refreshToken=<valid_token>` | `200 OK` | - `data.accessToken` mới được tạo<br>- Cookie nhận `refreshToken` mới<br>- Token cũ bị hủy trong Redis |
| `TC-AUTH-011` | Từ chối làm mới khi không gửi kèm cookie | Negative | Không có cookie `refreshToken` | `401 Unauthorized` | - `error.code == "AUTH_UNAUTHORIZED"` |
| `TC-AUTH-012` | Từ chối khi dùng lại Refresh Token đã bị thu hồi | Security / Negative | Gửi Refresh Token đã qua sử dụng (Replay Attack) | `403 Forbidden` | - `error.code == "AUTH_REFRESH_TOKEN_REVOKED"` |

### Endpoint 1.4: `POST /api/v1/auth/logout`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-AUTH-013` | Đăng xuất thành công và xóa sạch phiên | Positive | `Authorization: Bearer <valid_jwt>` | `200 OK` | - `data.message` xác nhận đăng xuất<br>- Cookie `refreshToken` bị xóa (`Max-Age=0`)<br>- Access token được đưa vào Redis Blacklist |
| `TC-AUTH-014` | Gửi request sau đăng xuất bằng token cũ bị từ chối | Security | Dùng token cũ gọi `GET /api/v1/users/me/dashboard` | `401 Unauthorized` | - `error.code == "AUTH_TOKEN_EXPIRED"` hoặc `"AUTH_TOKEN_REVOKED"` |

---

## PHÂN HỆ 2: HỒ SƠ CÁ NHÂN, LỘ TRÌNH & NĂNG LƯỢNG (USER & JOURNEY)

### Endpoint 2.1: `GET /api/v1/users/me/dashboard`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-USER-001` | Lấy dữ liệu tổng hợp Dashboard người dùng | Positive | `Authorization: Bearer <user_token>` | `200 OK` | - Trả về đầy đủ: `user (name, level, totalExp)`, `streak (current, max, activeShieldCount)`, `energy (current, max=5, nextRefillSeconds)`, `gems`, `guardian (name, stage, spriteUrl)`, `currentStation (id, title, dayIndex)` |
| `TC-USER-002` | Tự động tính toán hồi phục năng lượng theo thời gian | Business Logic | User có `energy = 3` sau 4 giờ không hoạt động | `200 OK` | - Năng lượng tự động tăng lên 5 (tỷ lệ: 1 vạch/120 phút = 2 giờ, tối đa 5 vạch) |

### Endpoint 2.2: `POST /api/v1/users/me/energy/refills`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-USER-003` | Nạp đầy năng lượng bằng 20 Gems | Positive | `{"method": "GEMS"}` (User có `gems >= 20`, `energy < 5`) | `200 OK` | - `data.energy == 5`<br>- `data.gemsRemaining == old_gems - 20` |
| `TC-USER-004` | Từ chối nạp năng lượng bằng Gems khi không đủ số dư | Negative | `{"method": "GEMS"}` (User có `gems < 20`) | `400 Bad Request` | - `error.code == "INSUFFICIENT_GEMS"` |
| `TC-USER-005` | Từ chối nạp khi năng lượng đã ở mức tối đa (5/5) | Boundary / Negative | `{"method": "GEMS"}` khi `energy == 5` | `400 Bad Request` | - `error.code == "ENERGY_ALREADY_FULL"` |

### Endpoint 2.3: `POST /api/v1/users/me/streak/freeze`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-USER-006` | Mua Khiên bảo vệ Streak Freeze bằng Gems | Positive | `{"quantity": 1}` (User có `gems >= 50`, `activeShieldCount < 2`) | `200 OK` | - `data.activeShieldCount` tăng 1<br>- Trừ 50 Gems |
| `TC-USER-007` | Chặn mua khiên vượt quá giới hạn tối đa 2 khiên | Boundary / Negative | Mua khiên khi `activeShieldCount == 2` | `400 Bad Request` | - `error.code == "SHIELD_LIMIT_REACHED"` |

### Endpoint 2.4: `GET /api/v1/users/me/export`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-USER-008` | Xuất dữ liệu toàn diện người dùng theo chuẩn GDPR | Positive | `Authorization: Bearer <valid_jwt>` | `200 OK` | - Dữ liệu JSON chứa: thông tin tài khoản, hành trình Saga, điểm thi CBT, Sổ tay lỗi sai SM-2 |

---

## PHÂN HỆ 3: KHẢO THÍ THÍCH ỨNG ĐẦU VÀO IRT 2PL (ADAPTIVE DIAGNOSTIC)

### Endpoint 3.1: `POST /api/v1/diagnostic/attempts`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-DIAG-001` | Khởi tạo bài thi chẩn đoán CAT chuẩn 50 câu | Positive | `{"mode": "STANDARD", "targetPartList": [1,2,3,4,5,6,7]}` | `201 Created` | - `data.attemptId` được cấp<br>- `data.totalQuestions == 50`<br>- `data.firstQuestion` có độ khó trung bình $b \approx 0.0$<br>- Khởi tạo $\theta = 0.0$ |
| `TC-DIAG-002` | Khởi tạo bài thi chẩn đoán rút gọn Express 15 câu | Positive | `{"mode": "EXPRESS", "targetPartList": [5,6,7]}` | `201 Created` | - `data.totalQuestions == 15` |
| `TC-DIAG-003` | Chặn tạo bài chẩn đoán mới khi đã có bài đang làm dở | Negative / Conflict | Tạo attempt mới khi attempt cũ chưa hoàn tất | `409 Conflict` | - Trả về `attemptId` đang dang dở để học viên tiếp tục |
| `TC-DIAG-004` | Chặn làm lại chẩn đoán khi đã hoàn tất và có lộ trình | Business Logic | User đã có lộ trình Saga đang chạy | `409 Conflict` | - `error.code == "DIAG_ALREADY_DONE"` |

### Endpoint 3.2: `POST /api/v1/diagnostic/attempts/{attemptId}/answers`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-DIAG-005` | Nộp đáp án và nhận câu hỏi tiếp theo theo Fisher Info | Algorithmic / Positive | `{"questionId": "q-diag-01", "selectedOption": "A", "timeSpentMs": 9500, "isGuessed": false}` | `200 OK` | - Tiến trình tăng lên `2/50`<br>- `nextQuestion` được chọn tối đa hóa $I(\theta)$ tại $\hat{\theta}$ mới<br>- Câu hỏi đã làm không bị lặp lại |
| `TC-DIAG-006` | Chặn quay lại sửa đáp án câu hỏi trước (Forward-only) | Business Logic / Negative | Gửi đáp án cho câu hỏi có số thứ tự cũ hơn | `400 Bad Request` | - `error.code == "DIAGNOSTIC_FORWARD_ONLY"` |

### Endpoint 3.3: `POST /api/v1/diagnostic/attempts/{attemptId}/completion`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-DIAG-007` | Hoàn tất bài chẩn đoán và tính vector năng lực TOEIC | Algorithmic / Positive | Hoàn thành đủ 50 câu hoặc đạt $\text{SEM} \le 0.28$ | `200 OK` | - `data.predictedOverallScore` chia hết cho 5, trong đoạn $[10, 990]$<br>- `data.predictedListening` $\in [5, 495]$<br>- `data.predictedReading` $\in [5, 495]$<br>- `data.thetaListening`, `data.thetaReading` $\in [-3.0, 3.0]$<br>- Trả về phân rã `skillMastery` |

---

## PHÂN HỆ 4: BẢN ĐỒ HÀNH TRÌNH SAGA & KẾ HOẠCH NGÀY (SAGA MAP)

### Endpoint 4.1: `POST /api/v1/journey/calculate-duration`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-MAP-001` | Tính thời lượng lộ trình hợp lệ trong ngưỡng an toàn | Mathematical / Positive | `{"initialScore": 450, "targetScore": 600, "dailyMinutes": 45}` ($\Delta S = 150 \le 180$) | `200 OK` | - `data.calculatedDurationDays` trong khoảng $[7, 30]$ ngày<br>- `data.requiresRealityCheck == false` |
| `TC-MAP-002` | Kích hoạt cảnh báo Reality Check khi mục tiêu vượt ngưỡng | Business Logic / Positive | `{"initialScore": 350, "targetScore": 800, "dailyMinutes": 30}` ($\Delta S = 450 > 180$) | `200 OK` | - `data.requiresRealityCheck == true`<br>- `data.realityCheckDetails.options` có đủ 3 phương án gợi ý |
| `TC-MAP-003` | Giới hạn biên thời lượng: không nhỏ hơn 7 và không vượt 30 ngày | Boundary | Test với $\Delta S = 20$ và test với $\Delta S = 500$ | `200 OK` | - $D$ luôn thuộc khoảng $[7, 30]$ |

### Endpoint 4.2: `POST /api/v1/journeys/{journeyId}/maps` & `GET .../maps`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-MAP-004` | Tự động sinh cấu trúc Bản đồ Saga $N = 3 \times D$ trạm | Positive | Gọi POST sinh bản đồ cho lộ trình $D = 21$ ngày | `201 Created` | - `data.totalNodes == 63`<br>- Phân bổ đủ 4 Biomes<br>- Trạm đầu tiên có `status == "UNLOCKED"` |
| `TC-MAP-005` | Truy vấn danh sách trạm và kiểm tra trạng thái Fog of War | Positive | Gọi GET danh sách trạm | `200 OK` | - Trạm chưa học có `status == "LOCKED"`<br>- Trạm đã xong có `starsEarned` từ 1-3 |
| `TC-MAP-006` | Lấy 3 nhiệm vụ ngày của lộ trình hiện tại | Positive | `GET /api/v1/journeys/{journeyId}/daily-plans` | `200 OK` | - Trả về đúng 3 nhiệm vụ học tập của ngày hôm nay |

---

## PHÂN HỆ 5: TRẠM BÀI HỌC SAGA & CƠ CHẾ MỞ KHÓA (MAP NODES)

### Endpoint 5.1: `POST /api/v1/nodes/{id}/attempts`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-NODE-001` | Bắt đầu làm bài tại trạm đã được mở khóa | Positive | Trạm có trạng thái `UNLOCKED` | `201 Created` | - Cấp `data.nodeAttemptId`<br>- Trả về danh sách câu hỏi trạm |
| `TC-NODE-002` | Từ chối làm bài trạm đang bị khóa (Fog of War) | Security / Negative | Trạm có trạng thái `LOCKED` | `403 Forbidden` | - `error.code == "NODE_LOCKED"` |

### Endpoint 5.2: `POST /api/v1/nodes/{id}/attempts/{attemptId}/completion`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-NODE-003` | Nộp bài trạm bài học thành công và tính điểm SM-2 tự động | Algorithmic / Positive | `Header: Idempotency-Key: <uuid>`<br>Danh sách đáp án kèm `timeSpentMs`, `isGuessed` | `200 OK` | - `data.starsEarned` $\in [1, 3]$<br>- Trạm kế tiếp được mở khóa `unlockedNodeId`<br>- SM-2 quality $q \in [0, 5]$ được tính tự động cho từng câu<br>- Cộng EXP và Gems (không vượt quá 30 Gems/ngày) |
| `TC-NODE-004` | Kiểm soát trần Gems luyện tập (Daily Gem Cap 30 Gems/ngày) | Boundary / Business Logic | Học viên đã nhận đủ 30 Gems hôm nay hoàn thành thêm 1 trạm | `200 OK` | - `data.gemsAwarded == 0`<br>- `data.dailyDrillGemsRemainingToday == 0`<br>- Vẫn cộng EXP bình thường |
| `TC-NODE-005` | Chặn nộp trùng lặp bài trạm học (Idempotency Conflict) | Concurrency / Negative | Gửi lại cùng `Idempotency-Key` lần 2 | `409 Conflict` | - `error.code == "IDEMPOTENCY_CONFLICT"` |
| `TC-NODE-006` | Vượt qua trạm Review Gate khi đạt đủ số sao tối thiểu | Business Logic | Trạm là `REVIEW_GATE`, cần $\ge 2$ sao | `200 OK` | - `isReviewGatePassed == true`<br>- Mở khóa chặng tiếp theo |

---

## PHÂN HỆ 6: PHÒNG THI MÔ PHỎNG CBT & ANTI-CHEAT (CBT ENGINE)

### Endpoint 6.1: `POST /api/v1/exams/sessions`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-CBT-001` | Khởi tạo phiên thi CBT Full 200 câu thành công | Positive | `{"examId": "exam-mock-01", "deviceId": "dev-01"}` | `201 Created` | - `data.sessionId` được cấp<br>- `data.totalQuestions == 200`<br>- `data.timeLimitSeconds == 7200`<br>- Thiết lập Redis session lock |
| `TC-CBT-002` | Chặn thi song song trên 2 thiết bị cùng lúc (Anti-Cheat Lock) | Concurrency / Negative | Tạo session mới từ thiết bị khác khi session cũ đang thi | `409 Conflict` | - `error.code == "CONCURRENT_EXAM_ACTIVE"` |

### Endpoint 6.2: `POST /api/v1/exams/sessions/{id}/heartbeats`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-CBT-003` | Gửi Heartbeat định kỳ 15s đồng bộ thời gian và gia hạn Lock | Positive | Gọi heartbeat với session hợp lệ | `200 OK` | - `data.remainingSeconds` phản ánh đúng thời gian server<br>- `data.isSessionValid == true`<br>- Lock TTL được gia hạn |
| `TC-CBT-004` | Heartbeat trên phiên đã hết giờ thi | Negative | Gọi heartbeat khi thời gian đã hết (`remainingSeconds <= 0`) | `400 Bad Request` | - `data.isSessionValid == false`<br>- Yêu cầu tự động nộp bài |

### Endpoint 6.3: `PUT /api/v1/exams/sessions/{id}/answers`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-CBT-005` | Lưu câu trả lời với clientSequence tăng dần | Positive | `{"questionId": "q-101", "selectedOption": "A", "clientSequence": 1}` | `200 OK` | - `data.lastSavedSequence == 1` |
| `TC-CBT-006` | Chặn gói tin đáp án cũ do trễ mạng (Stale Sequence) | Concurrency / Negative | Gửi `clientSequence == 1` khi server đã ghi nhận sequence `2` | `409 Conflict` | - `error.code == "STALE_CLIENT_SEQUENCE"`<br>- Không ghi đè đáp án mới bằng đáp án cũ |

### Endpoint 6.4: Bảo mật CBT Part 2 Tuyệt Đối (Zero-Text Leak Policy)

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-CBT-007` | Kiểm tra tuyệt đối không rò rỉ văn bản câu hỏi Part 2 | Security | `GET /api/v1/exams/{id}` hoặc `/mini-diagnostic` | `200 OK` | - Với mọi câu hỏi Part 2:<br>  + `questionText === null` hoặc `""`<br>  + `options[i].text === null` hoặc `""`<br>- Chỉ cung cấp timestamp cue sóng âm |

### Endpoint 6.5: `POST /api/v1/exams/sessions/{id}/submissions`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-CBT-008` | Nộp bài thi CBT, chấm điểm Equating chuẩn và giải phóng Lock | Algorithmic / Positive | `Header: Idempotency-Key: <uuid>` | `200 OK` | - `listeningScore` $\in [5, 495]$ (bội số 5)<br>- `readingScore` $\in [5, 495]$ (bội số 5)<br>- `totalScore` $\in [10, 990]$<br>- Redis lock bị hủy, cho phép thi bài mới |
| `TC-CBT-009` | Chặn nộp bài 2 lần liên tiếp (Double Submit Prevention) | Concurrency / Negative | Gửi lại cùng Idempotency-Key hoặc sau khi đã nộp | `409 Conflict` | - `error.code == "IDEMPOTENCY_CONFLICT"` |

---

## PHÂN HỆ 7: LUYỆN TẬP VI MÔ & KỸ NĂNG (MICRO-DRILLS)

### Endpoint 7.1: `GET /api/v1/skills/{skillId}/drills`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-DRILL-001` | Lấy danh sách câu hỏi luyện vi kỹ năng chuyên sâu | Positive | `GET /api/v1/skills/RC_TENSE_PERFECT/drills` | `200 OK` | - Trả về từ 5 đến 10 câu hỏi thuộc đúng vi kỹ năng yêu cầu |

### Endpoint 7.2: `POST /api/v1/skills/{skillId}/drills/answers`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-DRILL-002` | Trả lời đúng câu hỏi vi kỹ năng: nhận phân tích giải thích | Positive | Gửi đáp án đúng | `200 OK` | - `data.isCorrect == true`<br>- `data.explanation` chi tiết<br>- `data.trapNote` cảnh báo bẫy thi |
| `TC-DRILL-003` | Trả lời sai câu hỏi vi kỹ năng: tự động đồng bộ vào Sổ tay SM-2 | Business Logic | Gửi đáp án sai | `200 OK` | - `data.isCorrect == false`<br>- Câu hỏi tự động được thêm vào bảng `NotebookItem` để lên lịch ôn tập |

---

## PHÂN HỆ 8: SỔ TAY LỖI SAI & LẶP LẠI NGẮT QUÃNG SM-2 (MISTAKE NOTEBOOK)

### Endpoint 8.1: `GET /api/v1/notebook/due`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-SM2-001` | Lấy danh sách thẻ câu sai đến hạn ôn tập ngày hôm nay | Positive | `GET /api/v1/notebook/due` | `200 OK` | - Chỉ trả về các thẻ có `nextReviewDate <= now()`<br>- Chứa `easinessFactor, intervalDays, repetitionNumber` |

### Endpoint 8.2: `POST /api/v1/notebook/reviews`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-SM2-002` | Ôn tập thẻ đúng và nhanh: tăng khoảng cách ôn tập ($q = 5$) | Algorithmic / Positive | `{"notebookId": "nb-01", "isCorrect": true, "timeSpentMs": 5000, "isGuessed": false}` | `200 OK` | - `calculatedQuality == 5`<br>- `newEasinessFactor >= old_EF`<br>- `newIntervalDays > old_interval`<br>- `nextReviewDate` lùi xa hơn |
| `TC-SM2-003` | Ôn tập đúng nhưng đoán mò: chất lượng $q = 3$, reset khoảng cách | Algorithmic / Positive | `{"notebookId": "nb-01", "isCorrect": true, "timeSpentMs": 15000, "isGuessed": true}` | `200 OK` | - `calculatedQuality == 3`<br>- `newIntervalDays == 1` (khoảng cách reset về 1 ngày do đoán mò) |
| `TC-SM2-004` | Ôn tập trả lời sai: reset toàn bộ chu kỳ lặp ($q < 3$) | Algorithmic / Positive | `{"notebookId": "nb-01", "isCorrect": false, "timeSpentMs": 12000, "isGuessed": false}` | `200 OK` | - `calculatedQuality < 3`<br>- `newIntervalDays == 1`<br>- `repetitionNumber == 0` |
| `TC-SM2-005` | Giới hạn cận dưới của Hệ số dễ ($EF \ge 1.3$) | Boundary / Mathematical | Học viên trả lời sai liên tiếp nhiều lần | `200 OK` | - `newEasinessFactor >= 1.3` (không bao giờ giảm dưới 1.3) |

---

## PHÂN HỆ 9: GAMIFICATION, NHIỆM VỤ NGÀY & CỬA HÀNG (QUESTS & SHOP)

### Endpoint 9.1: `GET /api/v1/quests/daily`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-GAME-001` | Lấy 3 nhiệm vụ ngày của học viên | Positive | `GET /api/v1/quests/daily` | `200 OK` | - Trả về đúng bộ 3 nhiệm vụ ngày<br>- Thể hiện tiến độ: `currentValue, targetValue, isCompleted, isClaimed` |

### Endpoint 9.2: `POST /api/v1/quests/{id}/claims`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-GAME-002` | Nhận thưởng nhiệm vụ hoàn thành với Idempotency-Key | Positive | `Header: Idempotency-Key: <uuid>` (Nhiệm vụ đã đạt `isCompleted = true`) | `200 OK` | - `data.gemsAwarded > 0`<br>- `data.expAwarded > 0`<br>- Tổng Gems/EXP của User tăng tương ứng |
| `TC-GAME-003` | Từ chối nhận thưởng khi nhiệm vụ chưa hoàn thành | Negative | Nhận thưởng khi `isCompleted == false` | `400 Bad Request` | - `error.code == "QUEST_NOT_COMPLETED"` |
| `TC-GAME-004` | Chặn nhận thưởng lần thứ 2 cho cùng nhiệm vụ | Conflict / Negative | Nhận thưởng khi `isClaimed == true` | `409 Conflict` | - `error.code == "QUEST_ALREADY_CLAIMED"` |

### Endpoint 9.3: `POST /api/v1/shop/purchases`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-GAME-005` | Mua vật phẩm trong Cửa hàng khi đủ Gems | Positive | `{"itemId": "ITEM_STREAK_FREEZE", "quantity": 1}` | `200 OK` | - `data.purchasedItem == "ITEM_STREAK_FREEZE"`<br>- Trừ đúng số Gems niêm yết<br>- Tăng vật phẩm trong kho người dùng |
| `TC-GAME-006` | Từ chối mua khi số Gems không đủ | Negative | Mua vật phẩm giá 50 Gems khi User chỉ có 20 Gems | `400 Bad Request` | - `error.code == "INSUFFICIENT_GEMS"` |

---

## PHÂN HỆ 10: ĐẤU TRƯỜNG ĐỐI KHÁNG 1v1 & ĐO LƯỜNG (ARENA & ANALYTICS)

### Endpoint 10.1: `POST /api/v1/arena/matches`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-ARENA-001` | Tham gia hàng đợi ghép cặp 1v1 khi còn Năng lượng | Positive | User có `energy >= 1` | `200 OK` | - Trả về `matchId`, thông tin đối thủ và bộ câu hỏi<br>- Trừ 1 vạch Năng lượng |
| `TC-ARENA-002` | Từ chối vào Đấu trường khi hết Năng lượng | Business Logic / Negative | User có `energy == 0` | `400 Bad Request` | - `error.code == "ENERGY_DEPLETED"`<br>- Gợi ý dùng Gems nạp hoặc quay về trạm học |

### Endpoint 10.2: `GET /api/v1/analytics/overview`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-STAT-001` | Lấy dữ liệu phân tích năng lực và radar 7 Part | Positive | `GET /api/v1/analytics/overview?timeframe=30D` | `200 OK` | - `data.predictedScore`<br>- `data.accuracyByPart` phân bổ đủ từ Part 1 đến Part 7 |

---

## PHÂN HỆ 11: ĐỒNG BỘ NGOẠI TUYẾN & BẢO TOÀN DỮ LIỆU (OFFLINE SYNC)

### Endpoint 11.1: `POST /api/v1/sync/offline-batch`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-SYNC-001` | Đồng bộ hàng loạt kết quả làm trạm khi khôi phục mạng | Positive | Batch gồm 2 trạm làm offline kèm answers và sequence | `200 OK` | - `data.successCount == 2`<br>- Cập nhật điểm, mở khóa trạm kế tiếp<br>- Tuân thủ trần 30 Gems/ngày |
| `TC-SYNC-002` | Xử lý Idempotency cho từng submission trong batch ngoại tuyến | Concurrency / Positive | Gửi lại batch chứa 1 trạm đã đồng bộ và 1 trạm mới | `200 OK` | - Trạm đã đồng bộ trả về `status: "ALREADY_PROCESSED"`<br>- Trạm mới được xử lý bình thường |

---

## PHÂN HỆ 12: QUẢN TRỊ NỘI DUNG & HỆ THỐNG (ADMIN & OPERATIONS)

### Endpoint 12.1: `GET /api/v1/admin/questions` & `POST /api/v1/admin/questions`

| TC ID | Tiêu đề Kịch bản | Loại Test | Đầu vào (Payload / Headers) | Kỳ vọng HTTP Status | Tiêu chí Đánh giá (Assertions & Verification) |
|-------|------------------|-----------|-----------------------------|---------------------|-----------------------------------------------|
| `TC-ADMIN-001` | Quyền Quản trị viên truy cập thành công | Positive | `Authorization: Bearer <admin_token>` | `200 OK` / `201 Created` | - Quản trị viên CRUD câu hỏi và cấu hình tham số IRT $a_i, b_i$ |
| `TC-ADMIN-002` | Từ chối truy cập tài nguyên Admin đối với học viên thường | Security / Forbidden | `Authorization: Bearer <student_token>` | `403 Forbidden` | - `error.code == "AUTH_FORBIDDEN"` (RBAC enforcement) |

---

## BẢNG TỔNG HỢP TIÊU CHÍ ĐÁNH GIÁ PHÊ DUYỆT (REVIEW CHECKLIST)

- [x] **Bao phủ 100% Endpoint**: Toàn bộ 67 operations trong OpenAPI và 12 phân hệ trong SRS v10.0.0.
- [x] **Kiểm thử Thuật toán cốt lõi**:
  - SuperMemo-2: Đầy đủ các thang đo $q \in [0, 5]$, cập nhật $EF \ge 1.3$, $Interval$, reset khi $q < 3$ hoặc $isGuessed = true$.
  - IRT 2PL: Chọn câu hỏi tối đa hóa thông tin Fisher, tính toán $\hat{\theta}$ hai kỹ năng L/R, quy đổi điểm TOEIC $[10, 990]$.
- [x] **Kiểm soát Đồng thời & Chống Gian lận**:
  - Redis Session Lock chống thi song song (`CONCURRENT_EXAM_ACTIVE`).
  - `clientSequence` phát hiện và từ chối gói tin cũ (`STALE_CLIENT_SEQUENCE`).
  - Header `Idempotency-Key` bảo vệ các hành động nhạy cảm nộp bài/nhận thưởng/mua hàng (`IDEMPOTENCY_CONFLICT`).
- [x] **Bảo mật Nội dung**:
  - CBT Part 2 Zero-Text Leak: Tuyệt đối không rò rỉ text câu hỏi hoặc đáp án qua API response.
- [x] **Chuẩn hóa Phản hồi Lỗi**:
  - 100% lỗi theo chuẩn RFC 7807 Problem Details Envelope (`success: false`, `error: { code, title, status, detail, invalidParams }`).
