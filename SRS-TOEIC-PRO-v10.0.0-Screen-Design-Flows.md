# ĐẶC TẢ THIẾT KẾ MÀN HÌNH & LUỒNG — TOEIC PRO

**Screen Design Specification & Flows**

Mỗi màn hình: Mô tả · Bố cục · Thành phần · Chức năng · Kiểm tra · API · Thông báo · Điều hướng · Trạng thái
\+ Screen Flow · Business Logic Flow · Integration Flow · API Flow

**Phiên bản 10.0.0 (Comprehensive Screen, Flow, API, DB & Validation Spec)**

> **MỌI TÍNH NĂNG HOÀN TOÀN MIỄN PHÍ.** Không có gói Premium, không có paywall, không có thanh toán. Mọi màn hình, API và chức năng đều mở cho tất cả người dùng.

---

## Mục lục

- 0\. Cách đọc tài liệu
- 1\. Đặc tả Màn hình — Xác thực & Onboarding (S-01 → S-09)
- 2\. Đặc tả Màn hình — Học tập cốt lõi (S-10 → S-19)
- 3\. Đặc tả Màn hình — Bản đồ Saga & Nút trạm (S-27 → S-30) *(MỚI v10)*
- 4\. Đặc tả Màn hình — Động lực, Hỗ trợ & Quản trị (S-20 → S-23, S-25, S-26, A-01 → A-09)
- A\. Sơ đồ luồng Màn hình (Screen Flow Map)
- B\. Luồng Nghiệp vụ / Logic (Business Logic Flows)
- C\. Luồng Tích hợp Hệ thống (Integration System Flows)
- D\. Luồng API đầu-cuối (API Flows)
- E\. Lược đồ Cơ sở dữ liệu (Database Schema)
- F\. Ma trận Kịch bản Biên (Edge Case Matrix)
- G\. Yêu cầu Chức năng & Phi Chức năng (FR/NFR)

---

## 0. Cách đọc tài liệu

Mỗi màn hình được đặc tả theo **11 mục thống nhất** + 2 mục bổ sung v10:

| # | Mục | Nội dung |
|---|-----|----------|
| 1 | Mô tả (Description) | Mục đích, đối tượng, ngữ cảnh |
| 2 | Điểm vào (Entry points) | Từ đâu người dùng đến màn hình này |
| 3 | Bố cục (Layout) | Bảng vùng và thành phần |
| 4 | Thành phần UI (Components) | Bảng chi tiết: loại, nhãn, hành vi, trạng thái |
| 5 | Chức năng (Functions) | Bảng: chức năng, mô tả, kích hoạt, kết quả |
| 6 | Trường & Kiểm tra (Fields & Validation) | Bảng: trường, bắt buộc, quy tắc UI, quy tắc API, thông báo lỗi |
| 7 | Business logic | Quy tắc nghiệp vụ riêng cho màn hình |
| 8 | API sử dụng (API flow) | Bảng: thời điểm gọi, endpoint, thành công, lỗi chính |
| 9 | Thông báo (Messages) | Bảng: tình huống, loại, thông điệp & vị trí |
| 10 | Điều hướng ra (Navigation out) | Danh sách màn hình đích |
| 11 | Trạng thái & Edge cases | Các trạng thái và trường hợp biên |
| 12 | Bảng CSDL liên quan (Database Tables) | Bảng đọc/ghi bởi màn hình *(MỚI v10)* |
| 13 | Chi tiết API Request/Response | Payload JSON cho từng endpoint *(MỚI v10)* |

### Quy chuẩn Kiến trúc API & Nguyên lý Thiết kế (RESTful & Architecture Standards)

Hệ thống tuân thủ nghiêm ngặt các nguyên lý thiết kế API hiện đại (`/api-design-principles`), kiến trúc backend phân tán (`/backend-architect`), và cấu trúc tài liệu tham chiếu (`/docs-architect`):

1. **Định danh Phiên bản URL (Strict URL Versioning)**:
   - 100% endpoint được đặt dưới tiền tố `/api/v1/` (ví dụ: `/api/v1/auth/login`, `/api/v1/exams/sessions`).
   - Tham số đường dẫn sử dụng định dạng chuẩn OpenAPI: `{id}`, `{skillId}`, `{taskId}`, `{attemptId}`.
2. **Định hướng Tài nguyên (Resource-Oriented Modeling)**:
   - URI chỉ chứa danh từ số nhiều đại diện cho tài nguyên (`/exams`, `/nodes`, `/questions`), **tuyệt đối không dùng động từ hành động** trong đường dẫn.
   - Thao tác nghiệp vụ được thể hiện bằng phương thức HTTP (`GET` = Read/Idempotent, `POST` = Create, `PUT` = Replace/Idempotent, `PATCH` = Partial Update, `DELETE` = Remove/Idempotent).
   - Với các hành vi trạng thái phức tạp, sử dụng tài nguyên con hoặc thực thể chuyển trạng thái (ví dụ: `POST /api/v1/exams/sessions/{id}/submissions`, `POST /api/v1/quests/{id}/claims`).
3. **Tiêu chuẩn Mã trạng thái HTTP**:
   - `200 OK` — Yêu cầu thành công (truy vấn, cập nhật thành công).
   - `201 Created` — Tài nguyên mới được khởi tạo thành công (bắt đầu bài thi, tạo tài khoản).
   - `204 No Content` — Thao tác thành công không cần trả về body.
   - `400 Bad Request` — Tham số đầu vào không hợp lệ hoặc lỗi cấu trúc JSON.
   - `401 Unauthorized` — Chưa xác thực hoặc Access Token đã hết hạn.
   - `403 Forbidden` — Đã xác thực nhưng không đủ quyền hạn (RBAC) hoặc tài nguyên bị khóa.
   - `404 Not Found` — Tài nguyên không tồn tại.
   - `409 Conflict` — Trạng thái xung đột (Double submit bài thi, Email đã tồn tại, Stale sequence).
   - `422 Unprocessable Entity` — Dữ liệu chuẩn cú pháp nhưng vi phạm quy tắc logic nghiệp vụ.
   - `429 Too Many Requests` — Vượt quá hạn ngạch Rate Limit.
   - `500 Internal Server Error` — Lỗi hệ thống nội bộ server.
4. **Header Kiểm soát Đồng thời & Phục hồi (Concurrency & Idempotency Headers)**:
   - `Idempotency-Key`: Bắt buộc với các tác vụ nhạy cảm (`POST /api/v1/exams/sessions/{id}/submissions`, `POST /api/v1/quests/{id}/claims`, `POST /api/v1/shop/purchases`) để chống double-submit khi mạng lag.
   - `X-Correlation-ID`: Mã UUID theo dõi luồng request xuyên suốt các micro-services và logs.
   - `clientSequence`: Số nguyên tăng dần trong phiên thi để xử lý xung đột gói tin bất đồng bộ.
5. **Hạn ngạch Tần suất (Rate Limiting Tiers)**:
   - Nhóm Xác thực (`/api/v1/auth/*`): 5 req/min (chống brute-force).
   - Nhóm Heartbeat & Telemetry (`/api/v1/exams/sessions/{id}/heartbeats`): 120 req/min per session.
   - Nhóm Nghiệp vụ thông thường (`/api/v1/nodes/*`, `/api/v1/drills/*`): 60 req/min per user.

**Response Envelope Thành công Chuẩn (hỗ trợ phân trang):**
```json
{
  "success": true,
  "data": {
    "items": [ "..." ]
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

**Response Envelope Lỗi Chuẩn RFC 7807 (Problem Details for HTTP APIs):**
```json
{
  "success": false,
  "data": null,
  "meta": null,
  "error": {
    "type": "https://api.toeicpro.com/v1/errors/AUTH_INVALID_CREDENTIALS",
    "title": "Invalid Credentials",
    "status": 401,
    "code": "AUTH_INVALID_CREDENTIALS",
    "detail": "Email hoặc mật khẩu không đúng.",
    "instance": "/api/v1/auth/login",
    "invalidParams": [],
    "timestamp": "2026-09-16T08:00:00.000Z",
    "traceId": "c62b2e3e-4fa6-4d2a-8bf3-78ad4e6f9b20"
  }
}
```

---

# 1. Đặc tả Màn hình — Xác thực & Onboarding

---

## S-01 · Trang giới thiệu (Landing / Guest)

**Route:** `/`
**Quyền truy cập:** Khách & mọi vai trò

### 1. Mô tả
Màn hình công khai đầu tiên, giới thiệu giá trị sản phẩm (luyện TOEIC 30 ngày thích ứng, sưu tập linh vật, bản đồ Saga 2.5D) và điều hướng khách tới đăng ký hoặc làm thử bài chẩn đoán. **Mọi tính năng hoàn toàn miễn phí.**

### 2. Điểm vào
- Truy cập trực tiếp domain gốc.
- Đăng xuất → quay về đây.
- Link chiến dịch marketing/mạng xã hội.

### 3. Bố cục màn hình

| Vùng | Chi tiết bố trí & thành phần |
|------|------------------------------|
| Header (sticky) | Logo trái; menu 'Tính năng/Đăng nhập'; nút CTA 'Bắt đầu miễn phí' phải. |
| Hero | Tiêu đề giá trị + phụ đề; 2 CTA ('Làm test chẩn đoán', 'Xem cách hoạt động'); minh hoạ linh vật + bản đồ Saga. |
| Khối tính năng | 4 card: Chẩn đoán chính xác · Lộ trình thích ứng · CBT chuẩn ETS · Bản đồ Saga 2.5D & Sưu tập linh vật. |
| Social proof | Con số (đề/câu hỏi/mức tăng điểm ước lượng) + đánh giá. |
| Footer | Điều khoản, Chính sách bảo mật (PDPD), liên hệ, chọn ngôn ngữ VI/EN. |

### 4. Thành phần UI

| Thành phần | Loại | Nhãn / Placeholder | Hành vi & Trạng thái |
|-----------|------|---------------------|----------------------|
| CTA chính | Button primary | 'Bắt đầu miễn phí' | hover/focus/active; → S-02 |
| CTA phụ | Button ghost | 'Làm test chẩn đoán' | → S-02 (ý định diagnostic) |
| Bộ chọn ngôn ngữ | Select | VI/EN | đổi i18n, lưu localStorage |

### 5. Chức năng

| Chức năng | Mô tả | Kích hoạt | Kết quả |
|-----------|-------|-----------|---------|
| Điều hướng đăng ký | Đưa khách vào luồng tạo tài khoản | Bấm CTA chính | Mở S-02 |
| Làm thử chẩn đoán | Bắt đầu luồng test đầu vào | Bấm CTA phụ | S-02 rồi S-06 |
| Đổi ngôn ngữ | Chuyển VI/EN toàn trang | Chọn ngôn ngữ | Cập nhật chuỗi, lưu lựa chọn |

### 6. Trường nhập & Kiểm tra
Không có trường nhập.

### 7. Business logic
- Nếu đã đăng nhập → CTA đổi thành **'Vào học' (S-10)**.
- Nội dung tĩnh phải render kể cả khi API động lỗi.

### 8. API sử dụng

| Thời điểm gọi | API | Thành công → | Lỗi chính → |
|---------------|-----|-------------|-------------|
| Khi tải trang | `GET /api/v1/content/landing` (CDN) | Hiển thị nội dung | Toast lỗi, vẫn hiện tĩnh |

### 9. Thông báo

| Tình huống | Loại | Thông điệp & vị trí |
|-----------|------|---------------------|
| Tải trang | loading | Skeleton hero + card. |
| Lỗi nội dung động | error | Toast: 'Không tải được nội dung, vui lòng làm mới trang.' |

### 10. Điều hướng ra
- S-02 (đăng ký/đăng nhập)
- S-10 (nếu đã đăng nhập)

### 11. Trạng thái & Edge cases
- Khách (mặc định) / Đã đăng nhập (CTA đổi) / Offline (banner).

### 12. Bảng CSDL liên quan

| Bảng | Đọc/Ghi | Mục đích |
|------|---------|----------|
| — | — | Nội dung tĩnh/CDN, không truy cập DB |

### 13. Chi tiết API

```
GET /content/landing
Authorization: không cần
Response 200:
{
  "success": true,
  "data": {
    "heroTitle": "string",
    "heroSubtitle": "string",
    "features": [{ "icon": "string", "title": "string", "desc": "string" }],
    "stats": { "totalExams": 0, "totalQuestions": 0, "avgScoreIncrease": 0 },
    "reviews": [{ "name": "string", "score": 0, "text": "string" }]
  }
}
```

---

## S-02 · Đăng ký (Sign Up)

**Route:** `/signup`
**Quyền truy cập:** Khách

### 1. Mô tả
Tạo tài khoản mới qua Google OAuth, Email+mật khẩu, hoặc Email OTP. Hỗ trợ liên kết khi email đã tồn tại ở phương thức khác. Bắt buộc đồng ý điều khoản (PDPD).

### 2. Điểm vào
- Từ Landing (CTA) / Từ S-03 (link 'Chưa có tài khoản?').

### 3. Bố cục màn hình

| Vùng | Chi tiết bố trí & thành phần |
|------|------------------------------|
| Panel trái (desktop) | Minh hoạ + 3 lợi ích; ẩn trên mobile. |
| Form | Nút 'Tiếp tục với Google' → phân cách 'hoặc' → Email → Mật khẩu (hiện/ẩn) → 'Tạo tài khoản'. |
| Tuỳ chọn OTP | Link 'Đăng ký bằng mã OTP'. |
| Đồng ý | Checkbox điều khoản & bảo mật (bắt buộc). |
| Chân form | 'Đã có tài khoản? Đăng nhập' → S-03. |

### 4. Thành phần UI

| Thành phần | Loại | Nhãn / Placeholder | Hành vi & Trạng thái |
|-----------|------|---------------------|----------------------|
| Nút Google | Button oauth | 'Tiếp tục với Google' | redirect OAuth |
| Email | Input email | 'Email của bạn' | validate on blur |
| Mật khẩu | Input password | 'Tạo mật khẩu' | nút hiện/ẩn, strength meter |
| Checkbox điều khoản | Checkbox | 'Tôi đồng ý…' | chưa tick → nút disabled |
| Nút tạo tài khoản | Button primary | 'Tạo tài khoản' | spinner khi gửi |

### 5. Chức năng

| Chức năng | Mô tả | Kích hoạt | Kết quả |
|-----------|-------|-----------|---------|
| Đăng ký Email+PW | Tạo tài khoản, gửi OTP | Bấm 'Tạo tài khoản' | POST /auth/register → S-04 |
| Đăng ký Google | OAuth tạo/liên kết | Bấm nút Google | Callback → S-05 |
| Đăng ký OTP | Tạo tài khoản không mật khẩu | Bấm link OTP | Gửi OTP → S-04 |

### 6. Trường nhập & Kiểm tra

| Trường | Bắt buộc | Quy tắc UI | Quy tắc API | Thông báo lỗi |
|--------|---------|-----------|-------------|---------------|
| email | Có | Định dạng email hợp lệ | normalizedEmail unique | UI: 'Email không hợp lệ.' / API: 'Email đã được đăng ký.' |
| password | Có (PW) | ≥8 ký tự gồm chữ+số | Argon2 hash | 'Mật khẩu cần ≥ 8 ký tự, gồm chữ và số.' |
| termsAgreed | Có | Phải = true | Server reject nếu false | 'Bạn cần đồng ý để tiếp tục.' |

### 7. Business logic
- Email trùng → gợi ý đăng nhập/liên kết, **KHÔNG lộ chi tiết tài khoản** (bảo mật).
- Disable nút khi đang gửi (chống double-submit).
- normalizedEmail = lowercase + trim + remove dots in gmail.

### 8. API sử dụng

| Thời điểm gọi | API | Thành công → | Lỗi chính → |
|---------------|-----|-------------|-------------|
| Submit | `POST /api/v1/auth/register` | Toast → S-04 | 409 AUTH_EMAIL_EXISTS |
| Google | `GET /api/v1/auth/oauth/google/start` | Redirect | — |

### 9. Thông báo

| Tình huống | Loại | Thông điệp & vị trí |
|-----------|------|---------------------|
| Email sai | error | Inline: 'Email không hợp lệ.' |
| Mật khẩu yếu | error | Inline: 'Mật khẩu cần ≥ 8 ký tự, gồm chữ và số.' |
| Chưa đồng ý | warn | Inline: 'Bạn cần đồng ý để tiếp tục.' |
| Thành công | success | Toast: 'Đã gửi mã xác thực tới email.' |
| Email tồn tại | error | Inline: 'Email này đã được đăng ký. Hãy đăng nhập hoặc dùng Google.' |
| Đang gửi | loading | Spinner trên nút, form disabled. |

### 10. Điều hướng ra
S-04 (OTP) · S-05 (OAuth) · S-03 (đăng nhập)

### 11. Trạng thái & Edge cases
Nhàn rỗi / Đang gửi / Lỗi trường / Thành công.

### 12. Bảng CSDL liên quan

| Bảng | Đọc/Ghi | Mục đích |
|------|---------|----------|
| User | Ghi | Tạo bản ghi user mới |
| OtpVerification (Redis) | Ghi | Lưu OTP 6 số, TTL 5' |
| SecurityAuditLog | Ghi | Ghi log đăng ký |

### 13. Chi tiết API

```
POST /auth/register
Request:
{
  "email": "user@example.com",
  "password": "Abc12345",       // null nếu OTP flow
  "method": "PASSWORD" | "OTP",
  "termsAgreed": true
}
Response 201:
{
  "success": true,
  "data": {
    "userId": "uuid",
    "nextStep": "VERIFY_OTP",
    "maskedEmail": "u***@example.com"
  }
}
Error 409:
{ "error": { "code": "AUTH_EMAIL_EXISTS", "message": "Email này đã được đăng ký." } }
```

---

## S-03 · Đăng nhập (Login)

**Route:** `/login`
**Quyền truy cập:** Khách

### 1. Mô tả
Xác thực người dùng đã có tài khoản (Google OAuth/Email+PW/Email OTP). Sau xác thực → cấp Access Token (RAM) + Refresh Token (Cookie HttpOnly) → điều hướng theo trạng thái.

### 2. Điểm vào
- Landing / S-02 (link) / redirect khi chưa xác thực / email khôi phục.

### 3. Bố cục màn hình

| Vùng | Chi tiết |
|------|----------|
| Panel trái | Minh hoạ; ẩn trên mobile. |
| Tiêu đề | 'Đăng nhập' + 'Tiếp tục hành trình TOEIC'. |
| Nút Google | 'Tiếp tục với Google'. |
| Phân cách | 'hoặc đăng nhập bằng email'. |
| Ô Email | Input email. |
| Ô Mật khẩu | Input password + hiện/ẩn. |
| Hàng tiện ích | 'Ghi nhớ đăng nhập' (checkbox) · 'Quên mật khẩu?' (link). |
| Nút Đăng nhập | Button primary full-width. |
| Link OTP | 'Đăng nhập bằng mã OTP'. |
| Chân form | 'Chưa có tài khoản? Đăng ký' → S-02. |

### 4. Thành phần UI

| Thành phần | Loại | Nhãn | Hành vi |
|-----------|------|------|---------|
| Nút Google | Button oauth | 'Tiếp tục với Google' | redirect OAuth |
| Ô Email | Input email | 'Email của bạn' | validate on blur; autofocus |
| Ô Mật khẩu | Input password | 'Mật khẩu' | hiện/ẩn; Enter submit |
| Ghi nhớ | Checkbox | 'Ghi nhớ đăng nhập' | kéo dài refresh TTL |
| Quên PW | Link | 'Quên mật khẩu?' | mở luồng đặt lại |
| Nút Đăng nhập | Button primary | 'Đăng nhập' | spinner khi xử lý |
| Link OTP | Link | 'Đăng nhập bằng mã OTP' | → nhập email → S-04 |
| CAPTCHA | Widget ẩn | — | hiện sau 5 lần sai |

### 5. Chức năng

| Chức năng | Mô tả | Kích hoạt | Kết quả |
|-----------|-------|-----------|---------|
| Đăng nhập Email/PW | Xác thực | Bấm 'Đăng nhập' / Enter | POST /auth/login → cấp token → điều hướng |
| Đăng nhập Google | OAuth 2.0 | Bấm Google | redirect → callback → S-10/05/06 |
| Đăng nhập OTP | Mã email | Bấm link OTP | POST /auth/otp/request → S-04 |
| Ghi nhớ | Refresh TTL dài hơn | Tick checkbox | 30 ngày thay vì 7 |
| Quên PW | Reset mật khẩu | Bấm link | POST /auth/password/forgot |

### 6. Trường nhập & Kiểm tra

| Trường | Bắt buộc | Quy tắc UI | Quy tắc API | Thông báo lỗi |
|--------|---------|-----------|-------------|---------------|
| email | Có | Định dạng email | normalizedEmail lookup | 'Email không hợp lệ.' |
| password | Có | Không rỗng | verifyArgon2 | 'Vui lòng nhập mật khẩu.' |
| rememberMe | Không | boolean | Ảnh hưởng refresh TTL | — |

### 7. Business logic
- Sai thông tin → **'Email hoặc mật khẩu không đúng'** (trung tính, không tiết lộ email tồn tại).
- Sai > 5 lần → CAPTCHA + khoá 15' (ghi SecurityAuditLog).
- `isSuspended` → chặn, hiện liên hệ hỗ trợ.
- Điều hướng: `needsOnboarding`→S-05, `needsDiagnostic`→S-06, `ready`→S-10.
- Chống double-submit. Chỉ 01 phiên thi tích cực.

### 8. API sử dụng

| Thời điểm | API | Thành công → | Lỗi chính → |
|-----------|-----|-------------|-------------|
| Submit | `POST /api/v1/auth/login` | Token → điều hướng | 401 AUTH_INVALID_CREDENTIALS |
| OTP | `POST /api/v1/auth/otp` | → S-04 | 429 RATE_LIMITED |
| Google | `GET /api/v1/auth/oauth/google/start` | Redirect | — |
| Quên PW | `POST /api/v1/auth/password/reset-requests` | Toast | 429 RATE_LIMITED |

### 9. Thông báo

| Tình huống | Loại | Thông điệp |
|-----------|------|-----------|
| Sai thông tin | error | 'Email hoặc mật khẩu không đúng.' |
| Tài khoản khoá | error | 'Tài khoản đang tạm khoá. Liên hệ hỗ trợ.' |
| Quá nhiều lần | error | 'Đăng nhập sai nhiều lần. Thử lại sau 15 phút.' |
| Đang đăng nhập | loading | Spinner + khoá form. |
| Thành công | success | Toast 'Chào mừng trở lại!' |
| Gửi reset PW | success | 'Nếu email tồn tại, chúng tôi đã gửi hướng dẫn đặt lại.' |

### 10. Điều hướng ra
S-10 (ready) · S-05 (onboarding) · S-06 (diagnostic) · S-04 (OTP) · S-02 (đăng ký)

### 11. Trạng thái & Edge cases
Nhàn rỗi / Đang xử lý / Lỗi / Bị khoá (CAPTCHA) / Thành công.

### 12. Bảng CSDL liên quan

| Bảng | Đọc/Ghi | Mục đích |
|------|---------|----------|
| User | Đọc | Tìm user theo normalizedEmail |
| Session | Ghi | Tạo/cập nhật phiên |
| SecurityAuditLog | Ghi | LOGIN_OK / LOGIN_FAIL |
| RateLimitCounter (Redis) | Đọc/Ghi | Đếm sai, khoá 15' |

### 13. Chi tiết API

```
POST /auth/login
Request:
{
  "email": "user@example.com",
  "password": "Abc12345",
  "rememberMe": true,
  "captchaToken": "string?"
}
Response 200:
{
  "success": true,
  "data": {
    "accessToken": "jwt...",
    "nextStep": "READY" | "NEEDS_ONBOARDING" | "NEEDS_DIAGNOSTIC",
    "user": { "id": "uuid", "displayName": "string", "email": "string", "avatar": "string?" }
  }
}
// Refresh token → Cookie HttpOnly/Secure/SameSite=Strict

Error 401: { "error": { "code": "AUTH_INVALID_CREDENTIALS", "message": "Email hoặc mật khẩu không đúng." } }
Error 403: { "error": { "code": "AUTH_ACCOUNT_SUSPENDED", "message": "Tài khoản đang tạm khoá. Liên hệ hỗ trợ." } }
Error 429: { "error": { "code": "RATE_LIMITED", "message": "Thử lại sau 15 phút." } }
```

```
POST /auth/password/forgot
Request: { "email": "user@example.com" }
Response 200: { "success": true, "data": { "message": "Nếu email tồn tại, chúng tôi đã gửi hướng dẫn đặt lại." } }
```

---

## S-04 · Xác thực OTP (OTP Verification)

**Route:** `/verify-otp`
**Quyền truy cập:** Khách (trong luồng OTP)

### 1. Mô tả
Nhập mã 6 chữ số gửi qua email để hoàn tất đăng ký hoặc đăng nhập OTP. Đếm ngược gửi lại. Khoá khi sai nhiều.

### 2. Điểm vào
S-02 (đăng ký OTP) · S-03 (đăng nhập OTP).

### 3. Bố cục

| Vùng | Chi tiết |
|------|----------|
| Tiêu đề | 'Nhập mã xác thực' + 'Đã gửi tới a***@mail.com'. |
| Ô OTP | 6 ô rời, auto-focus, tự nhảy, dán chuỗi. |
| Đếm ngược | 'Gửi lại mã sau 60s' → nút 'Gửi lại'. |
| Nút | 'Xác nhận' (disabled khi chưa đủ 6 số). |

### 4. Thành phần UI

| Thành phần | Loại | Nhãn | Hành vi |
|-----------|------|------|---------|
| Ô OTP | Input group (6) | — | auto-advance; dán; chỉ số |
| Nút gửi lại | Button ghost | 'Gửi lại mã' | đếm ngược 60s |
| Nút xác nhận | Button primary | 'Xác nhận' | auto khi đủ 6 số |

### 5. Chức năng

| Chức năng | Mô tả | Kích hoạt | Kết quả |
|-----------|-------|-----------|---------|
| Xác thực OTP | Kiểm tra mã | Đủ 6 số / bấm Xác nhận | POST /auth/otp/verify → token → điều hướng |
| Gửi lại | OTP mới | Bấm 'Gửi lại' (sau 60s) | POST /auth/otp/request |

### 6. Trường nhập & Kiểm tra

| Trường | Bắt buộc | Quy tắc UI | Quy tắc API | Thông báo lỗi |
|--------|---------|-----------|-------------|---------------|
| otp | Có | 6 chữ số | Khớp Redis; TTL 5'; ≤5 sai | 'Mã không đúng. Còn N lần.' / 'Mã hết hạn.' |

### 7. Business logic
- Sai > 5 lần → khoá 15' + audit.
- OTP hết hạn 5' → gửi lại.
- Mỗi OTP dùng 1 lần (xoá Redis key).

### 8. API sử dụng

| Thời điểm | API | Thành công → | Lỗi chính → |
|-----------|-----|-------------|-------------|
| Đủ 6 số | `POST /api/v1/auth/otp/verifications` | → S-05/06/10 | 400 AUTH_INVALID_OTP / 410 EXPIRED |
| Gửi lại | `POST /api/v1/auth/otp` | Toast | 429 quá nhiều |

### 9. Thông báo

| Tình huống | Loại | Thông điệp |
|-----------|------|-----------|
| OTP sai | error | 'Mã không đúng. Còn N lần thử.' |
| Hết hạn | error | 'Mã đã hết hạn. Bấm Gửi lại mã.' |
| Khoá | error | 'Thử lại sau 15 phút.' |
| Thành công | success | Toast 'Xác thực thành công!' |
| Mã mới | success | Toast 'Đã gửi mã mới.' |

### 10. Điều hướng ra
S-05 (onboarding) · S-06 (diagnostic) · S-10 (ready).

### 11. Trạng thái & Edge cases
Chờ nhập / Đang xác thực / Lỗi / Hết hạn / Bị khoá.

### 12. Bảng CSDL

| Bảng | Đọc/Ghi | Mục đích |
|------|---------|----------|
| OtpVerification (Redis) | Đọc/Ghi | So khớp, đếm sai, xoá |
| User | Đọc | Xác minh user tồn tại |
| Session | Ghi | Tạo phiên mới |
| SecurityAuditLog | Ghi | OTP_VERIFY_OK/FAIL |

### 13. Chi tiết API

```
POST /auth/otp/verify
Request: { "email": "user@example.com", "otp": "123456" }
Response 200:
{
  "success": true,
  "data": {
    "accessToken": "jwt...",
    "nextStep": "NEEDS_ONBOARDING" | "NEEDS_DIAGNOSTIC" | "READY",
    "user": { "id": "uuid", "displayName": "string" }
  }
}
Error 400: { "error": { "code": "AUTH_INVALID_OTP", "message": "Mã không đúng. Còn 3 lần thử." } }
Error 410: { "error": { "code": "AUTH_OTP_EXPIRED", "message": "Mã đã hết hạn." } }
Error 429: { "error": { "code": "AUTH_OTP_LOCKED", "message": "Thử lại sau 15 phút." } }
```

---

## S-05 · Onboarding — Nhập điểm mục tiêu & Cam kết thời gian

**Route:** `/onboarding/target`
**Quyền truy cập:** Học viên (lần đầu)

### 1. Mô tả
Bước BẮT BUỘC đầu tiên: nhập targetScore (250–990) + dailyCommitMinutes (30/45/60/90). Đầu vào để tính lộ trình D ngày (D∈[7,30]) sau diagnostic.

> **Mới v10:** Thêm `dailyCommitMinutes` + preview D ước tính realtime.

### 2. Điểm vào
Sau xác thực lần đầu (needsOnboarding) / OAuth lần đầu.

### 3. Bố cục

| Vùng | Chi tiết |
|------|----------|
| Thanh tiến trình | Bước 1/2: Mục tiêu → Bước 2/2: Chẩn đoán. |
| Câu hỏi chính | 'Bạn muốn đạt bao nhiêu điểm TOEIC?' + slider/nhập số. |
| Chip nhanh | 450/600/750/900. |
| Cam kết thời gian | 'Học bao lâu mỗi ngày?' + chip 30/45/60/90'. |
| Preview lộ trình | Card: 'Lộ trình ước tính: ~N ngày'. |
| Nút | 'Tiếp tục' → S-06. |

### 4. Thành phần UI

| Thành phần | Loại | Nhãn | Hành vi |
|-----------|------|------|---------|
| Slider điểm | Range slider | 250–990 | snap bội 5; cập nhật preview |
| Input điểm | Number | 'Nhập điểm' | validate on blur |
| Chip điểm | Chip group | 450/600/750/900 | cập nhật slider |
| Chip thời gian | Chip group | 30'/45'/60'/90' | cập nhật cam kết |
| Preview | Card info | 'Lộ trình ước tính: ~N ngày' | tính realtime |
| Nút Tiếp tục | Button primary | 'Tiếp tục' | disabled khi chưa chọn |

### 5. Chức năng

| Chức năng | Mô tả | Kích hoạt | Kết quả |
|-----------|-------|-----------|---------|
| Đặt mục tiêu | Lưu target + commitment | Bấm 'Tiếp tục' | PATCH /user/journey/target → S-06 |
| Chọn nhanh điểm | Điền nhanh | Bấm chip | Cập nhật slider + preview |
| Chọn thời gian | Điền cam kết | Bấm chip | Cập nhật preview |
| Preview tự động | Hiển thị D ước tính | Thay đổi giá trị | Tính D client-side |

### 6. Trường nhập & Kiểm tra

| Trường | Bắt buộc | Quy tắc UI | Quy tắc API | Thông báo lỗi |
|--------|---------|-----------|-------------|---------------|
| targetScore | Có | 250–990, bội 5 | clamp + mod 5 | 'Chọn mục tiêu 250–990.' |
| dailyCommitMinutes | Có | Enum {30,45,60,90} | Phải thuộc enum | 'Chọn thời gian cam kết.' |

### 7. Business logic
- Không cho vào màn khác khi chưa đặt mục tiêu.
- D_preview = min(30, max(7, round(7 + ΔS/12 × W_band × 45/T_daily))); S_initial giả = 500 cho preview.
- W_band = 1.0 + S_initial/1000.

### 8. API sử dụng

| Thời điểm | API | Thành công → | Lỗi → |
|-----------|-----|-------------|-------|
| Tiếp tục | `PATCH /api/v1/users/me/journey/targets` | → S-06 | 400 JOURNEY_TARGET_RANGE |

### 9. Thông báo

| Tình huống | Loại | Thông điệp |
|-----------|------|-----------|
| Ngoài khoảng | error | 'Chọn mục tiêu 250–990.' |
| Chưa chọn thời gian | error | 'Chọn thời gian cam kết.' |
| Lưu lỗi | error | Toast: 'Không lưu được. Thử lại.' |
| Thành công | — | Chuyển mượt sang S-06. |

### 10. Điều hướng ra
S-24 (Onboarding Micro-Win < 60s) → S-06 (Chẩn đoán).

### 11. Trạng thái & Edge cases
Nhập / Đang lưu / Lỗi.

### 12. Bảng CSDL

| Bảng | Đọc/Ghi | Mục đích |
|------|---------|----------|
| UserJourney | Ghi | Lưu targetScore, dailyCommitMinutes |
| User | Đọc | Trạng thái onboarding |

### 13. Chi tiết API

```
PATCH /user/journey/target
Request: { "targetScore": 750, "dailyCommitMinutes": 45 }
Response 200:
{
  "success": true,
  "data": {
    "targetScore": 750,
    "dailyCommitMinutes": 45,
    "estimatedDurationDays": null,
    "nextStep": "MICRO_WIN"
  }
}
Error 400: { "error": { "code": "JOURNEY_TARGET_RANGE", "message": "Mục tiêu 250–990, bội số 5." } }
```

---

## S-24 · Onboarding Micro-Win — Chiến Thắng Đầu Tiên <60s (First Victory & Mini-Evolution)

**Route:** `/onboarding/micro-win`  
**Quyền truy cập:** Học viên mới (sau khi thiết lập mục tiêu và chọn Thần Thức ở S-05)

### 1. Mục Tiêu Nghiệp Vụ & Tâm Lý Học Viên (Core UX Motivation)
- **Khắc phục lỗi phễu Onboarding:** Thay vì ép người dùng mới vừa vào app phải làm ngay bài chẩn đoán 20–30 phút căng thẳng (dễ gây nản và drop phễu), S-24 trao ngay một **Chiến thắng tức thì (Instant Win < 60 giây)**.
- Người học giải thử 1 câu hỏi mẫu siêu dễ cùng Thần Thức vừa chọn. Khi trả lời đúng, giao diện kích hoạt ngay **Candy Juice bùng nổ**: Pháo hoa hạt kẹo, âm thanh thắng cuộc vui vẻ, +10 XP đầu tiên và hiệu ứng Thần Thức thức tỉnh hào quang Mini-Evolution.

### 2. Bố Cục Giao Diện
- **Header:** Lời chào từ Thần Thức vừa chọn ("Chào bạn! Hãy cùng tôi khởi động bằng 1 câu hỏi khởi động siêu nhanh nhé!").
- **Thẻ Câu Hỏi:** 1 câu trắc nghiệm từ vựng cơ bản (Part 5 - Level 250+), chữ to rõ 18px.
- **Phản hồi Đúng:** Nút A/B/C/D phát sáng màu xanh Emerald, nút nhận thưởng kiểu `btn-candy` bừng sáng: **"Nhận 10 XP & Thức Tỉnh Linh Thức ➔"**.
- **Chuyển tiếp:** Bấm tiếp tục chuyển sang màn giới thiệu bài chẩn đoán S-06 với tinh thần phấn chấn.

---

## S-06 · Giới thiệu bài Chẩn đoán (Diagnostic Intro)

**Route:** `/diagnostic/intro`
**Quyền truy cập:** Học viên (chưa có kết quả)

### 1. Mô tả
Giải thích bài test chẩn đoán năng lực thích ứng IRT 2PL, kiểm tra âm thanh, khởi tạo lượt thi. Cung cấp 2 lựa chọn phù hợp quỹ thời gian của học viên:
1. **Khảo thí Thích ứng Chuẩn (Standard CAT IRT 2PL - Tối đa 50 câu, dừng sớm khi $\text{SEM} \le 0.28$, ~30-40 phút)**: Đo lường chính xác ma trận năng lực theo từng Part và vi kỹ năng TOEIC. Quy trình làm bài là **Chỉ-tiến (Forward-only)** để bảo toàn tính thích ứng tuần tự (mỗi câu hỏi tiếp theo được máy chủ chọn lọc tức thì theo hàm thông tin Fisher từ năng lực $\hat{\theta}$ vừa cập nhật).
2. **Khảo thí Siêu tốc (Express CAT - 15 câu, ~12-15 phút)**: Thuật toán IRT 2PL chọn các câu hỏi có độ phân biệt $a$ cao, phù hợp học viên bận rộn trên điện thoại.
- **Ràng buộc Mạng & Khôi phục Phiên**: Bắt buộc kết nối trực tuyến (Online Required) để máy chủ phân tích năng lực thời gian thực. Hỗ trợ **Tạm dừng & Lưu phiên (Pause & Resume)** an toàn trên Dexie và Redis nếu học viên cần tạm ngắt quãng.

> **Mới v10:** Thêm 'Tự khai báo điểm' và 'Chẩn đoán Siêu tốc 15 câu' triệt tiêu tỷ lệ rời rụng cho user mới.

### 2. Điểm vào
Sau S-05 · Dashboard (banner nhắc).

### 3. Bố cục

| Vùng | Chi tiết |
|------|----------|
| Tiêu đề | 'Bài kiểm tra đầu vào thích ứng IRT 2PL' + 3 lợi ích đo lường. |
| Thông số | Tối đa 50 câu (ngừng khi SEM ≤ 0.28; trần phân bổ: 2P1/6P2/9P3/8P4/8P5/4P6/13P7). |
| Lưu ý | Bài thi thích ứng tuần tự (chỉ-tiến); yêu cầu kết nối mạng, tai nghe & nơi yên tĩnh. |
| Nút chính | 'Bắt đầu ngay'. |
| Thay thế | 'Tôi đã có điểm TOEIC' → dialog nhập điểm. |
| Nút phụ | 'Để sau' → S-10. |

### 4. Thành phần UI

| Thành phần | Loại | Nhãn | Hành vi |
|-----------|------|------|---------|
| Bắt đầu | Button primary | 'Bắt đầu ngay' | spinner khởi tạo |
| Để sau | Button ghost | 'Để sau' | → S-10 |
| Tự khai báo | Link | 'Tôi đã có điểm' | dialog slider 250–990 |
| Thử audio | Button icon | 'Thử loa/tai nghe' | phát đoạn ngắn |

### 5. Chức năng

| Chức năng | Mô tả | Kích hoạt | Kết quả |
|-----------|-------|-----------|---------|
| Bắt đầu | Khởi tạo lượt thi | Bấm nút | POST /exams/diagnostic/start → S-07 |
| Để sau | Hoãn | Bấm | S-10 (banner nhắc) |
| Tự khai | Nhập điểm có sẵn | Nhập + xác nhận | PATCH /user/journey/declare-score → S-10 |
| Thử audio | Kiểm tra loa | Bấm | Phát đoạn ngắn |

### 6. Trường nhập & Kiểm tra

| Trường | Bắt buộc | Quy tắc | Thông báo lỗi |
|--------|---------|---------|---------------|
| declaredScore | Có (nếu tự khai) | 250–990, bội 5 | 'Nhập điểm 250–990.' |

### 7. Business logic
- Không phát audio → cảnh báo kiểm tra tai nghe.
- Ngoại tuyến (offline) → Vô hiệu hóa nút Bắt đầu, hiển thị thông báo: "Cần kết nối mạng để làm bài thi thích ứng".
- Tự khai → theta ước tính thấp hơn, SEM rộng hơn.
- Ma trận đề ETS: 2P1/6P2/9P3/8P4/8P5/4P6/13P7 = 50 câu.

### 8. API sử dụng

| Thời điểm | API | Thành công → | Lỗi → |
|-----------|-----|-------------|-------|
| Bắt đầu | `POST /api/v1/diagnostic/attempts` | → S-07 | 409 DIAG_ALREADY_DONE |
| Tự khai | `PATCH /api/v1/users/me/journey/declared-scores` | → S-10 | 400 SCORE_RANGE_INVALID |

### 9. Thông báo

| Tình huống | Loại | Thông điệp |
|-----------|------|-----------|
| Không audio | warn | Modal: 'Kiểm tra âm lượng/tai nghe.' |
| Lỗi khởi tạo | error | 'Không bắt đầu được. Thử lại.' |
| Đã làm | info | 'Bạn đã làm. Xem kết quả.' → S-09 |
| Khai báo OK | success | 'Đã ghi nhận. Lộ trình đang tạo...' |

### 10. Điều hướng ra
S-07 · S-10 · S-09.

### 11. Trạng thái & Edge cases
Sẵn sàng / Đang khởi tạo / Lỗi / Đã có kết quả.

### 12. Bảng CSDL

| Bảng | Đọc/Ghi | Mục đích |
|------|---------|----------|
| Exam | Đọc | Lấy đề Mini-Diagnostic |
| ExamAttempt | Ghi | Tạo lượt thi |
| Question | Đọc | Câu hỏi (lược đáp án) |
| StimulusGroup | Đọc | Audio/ảnh |
| DiagnosticProfile | Ghi | Tạo nếu tự khai |
| UserJourney | Ghi | baselineScore |

### 13. Chi tiết API

```
POST /exams/diagnostic/start
Response 201:
{
  "success": true,
  "data": {
    "attemptId": "uuid",
    "attemptToken": "jwt...",
    "durationMinutes": 40,
    "sections": [
      {
        "section": "LISTENING",
        "questions": [
          {
            "id": 1, "stimulusGroupId": 1, "questionNumber": 1, "part": 1,
            "questionText": "...",  // null cho Part 2
            "optionA": "...", "optionB": "...", "optionC": "...", "optionD": null,
            "imageUrls": ["..."], "audioUrl": "signed-s3-url",
            "audioCuePointsJson": "[...]"
            // KHÔNG có: correctOption, explanation, audioScript
          }
        ]
      },
      { "section": "READING", "questions": [...] }
    ]
  }
}
Error 409: { "error": { "code": "DIAG_ALREADY_DONE", "message": "Bạn đã làm bài chẩn đoán." } }
```

```
PATCH /user/journey/declare-score
Request: { "declaredScore": 650 }
Response 200:
{
  "success": true,
  "data": { "baselineScore": 650, "method": "DECLARED", "durationDays": 14, "nextStep": "READY" }
}
```

---

## S-07 / S-08 · Bài Chẩn đoán Nghe + Đọc (Diagnostic Run)

**Route:** `/diagnostic/run`
**Quyền truy cập:** Học viên đang trong lượt chẩn đoán

### 1. Mô tả
Khảo thí thích ứng tuần tự (Sequential CAT): Listening (tuyến tính, audio phát tự động không tua) nối tiếp Reading (chỉ-tiến theo thuật toán chọn câu CAT tối ưu hàm thông tin Fisher). Bắt buộc kết nối trực tuyến (Online Required) để máy chủ chọn câu hỏi kế tiếp theo năng lực tức thời $\hat{\theta}$. Bộ nhớ đệm cục bộ Dexie lưu trữ dự phòng phiên làm bài để phục hồi ngay khi mạng chập chờn. Tự động dừng và nộp bài khi đạt ngưỡng tin cậy $SEM \le 0.28$ hoặc hoàn thành tối đa 50 câu (hoặc hết 40 phút).

> **Mới v10:** `audioCuePointsJson` cho Part 3/4 · Part 2 API loại bỏ questionText/options · `clozeIndex` Part 6 · `clientSequence` thay LWW · Luồng Chỉ-tiến (Forward-only) chuẩn khảo thí CAT (điều hướng tự do và gắn cờ chỉ áp dụng cho phòng thi Full CBT S-12/S-13).

### 2. Điểm vào
Từ S-06.

### 3. Bố cục

| Vùng | Chi tiết |
|------|----------|
| Thanh trên | Đồng hồ 40'; tiến trình câu/tối đa 50; nút 'Tạm dừng bài thi' (Lưu phiên vào Dexie & Redis). |
| Thanh cảm xúc | Lời động viên ấm áp của Guardian sau mỗi 5 câu ("Nhịp độ rất tốt, năng lực ước tính đang dần rõ nét!"). |
| LC kích thích | Ảnh P1/tiêu đề; audio không tua/pause; **P2: chỉ A/B/C zero-text (kèm aria-label trợ thính)**. |
| LC audio cue | Highlight câu đang đọc (P3/4) theo `audioCuePointsJson`. |
| LC đáp án | A–D (P2: A–C); phím tắt 1–4. Nút A/B/C/D đạt 56dp, kèm aria-label rõ ràng cho screen reader. |
| RC split-view | Trái: đoạn văn (tab multi-passage); Phải: câu hỏi thích ứng hiện tại + lựa chọn A-D. |
| RC Part 6 | Auto-scroll tới `clozeIndex`. |

### 4. Thành phần UI

| Thành phần | Loại | Nhãn | Hành vi |
|-----------|------|------|---------|
| Đồng hồ | Timer | 'MM:SS' | đếm ngược; đỏ < 5'; aria-live="polite" |
| Tiến trình cảm xúc | Progress Bar | 'Câu X / ~N câu' | Cập nhật độ hội tụ SEM; Guardian động viên mỗi 5 câu |
| Đáp án | Radio group | A/B/C(/D) | highlight; phím tắt; aria-label="Lựa chọn X" |
| Nút Xác nhận | Button primary | 'Tiếp tục ➔' | Gửi đáp án -> Nạp câu kế từ server |
| Nút Tạm dừng | Button ghost | 'Tạm dừng & Lưu' | Lưu phiên vào Dexie & Redis -> Về S-10 (Có thẻ Resume) |
| Audio player | Custom | — | không seek/pause; aria-label="Phát audio đề thi" |
| Cue highlight | Visual | — | highlight P3/4 |
| Highlighter (RC) | Tool | — | bôi vàng P7 |

### 5. Chức năng

| Chức năng | Mô tả | Kích hoạt | Kết quả |
|-----------|-------|-----------|---------|
| Chọn đáp án | Ghi lựa chọn | Chạm/phím | Ghi tạm bộ nhớ đệm Dexie; aria đọc phương án chọn |
| Xác nhận câu | Gửi câu & nhận câu kế | Bấm nút 'Tiếp tục' | POST /diagnostic/attempts/{id}/answers -> Render câu mới |
| Động viên Guardian | Lời khích lệ tâm lý | Mỗi 5 câu | Popup thoại nhỏ 3 giây giúp giảm mỏi nhận thức |
| Tạm dừng & Lưu | Tạm nghỉ buổi thi | Bấm 'Tạm dừng & Lưu' | Lưu phiên vào Dexie & Redis -> Điều hướng S-10 kèm thẻ Resume |
| Tự nộp bài | Kết thúc & chấm | Đạt SEM / Hết giờ | POST submit -> S-09 |
| Auto-scroll P6 | Cuộn đến chỗ trống | Chọn câu P6 | scrollTo clozeIndex |
| Audio sync | Highlight câu đang đọc | Auto khi phát | audioCuePointsJson |

### 6. Trường nhập & Kiểm tra

| Trường | Bắt buộc | Quy tắc | Thông báo |
|--------|---------|---------|-----------|
| userChoice | Không | A/B/C/D (P2: A/B/C) | — |
| isFlagged | Không | boolean | — |
| isGuessed | Không | boolean | — |

### 7. Business logic
- LC tuyến tính, RC tự do.
- Phím D/4 vô hiệu ở Part 2.
- Hết 40' → auto submit.
- **Part 2**: KHÔNG chứa questionText/options trên API.
- **Audio**: 5s pause P1/2, 8s P3/4 (chuẩn ETS).
- **Autosave**: clientSequence tăng đơn điệu.

### 8. API sử dụng

| Thời điểm | API | Thành công → | Lỗi → |
|-----------|-----|-------------|-------|
| 10s interval | `PUT /api/v1/exams/sessions/{id}/answers` | 'Đã lưu' | offline → queue |
| Nộp | `POST /api/v1/exams/sessions/{id}/submissions` | → S-09 | 409 ALREADY_SUBMITTED |

### 9. Thông báo

| Tình huống | Loại | Thông điệp |
|-----------|------|-----------|
| Mất mạng | warn | Banner: 'Mất kết nối — vẫn lưu, đồng bộ khi có mạng.' |
| Sắp hết giờ | warn | Toast: 'Còn 5 phút.' |
| Câu trống | warn | Modal: 'Còn N câu chưa trả lời. Vẫn nộp?' |
| Tự nộp | info | Toast: 'Hết giờ — bài nộp tự động.' |
| Xung đột tab | error | Modal: 'Bài thi đang ở thiết bị khác. Chuyển sang đây?' |
| Quy chế P2 | info | Toast (1 lần): 'Part 2: Chỉ nghe.' |

### 10. Điều hướng ra
S-09 (kết quả).

### 11. Trạng thái & Edge cases
LC / RC / Xác nhận nộp / Đang chấm / Mất mạng / Multi-tab.

### 12. Bảng CSDL

| Bảng | Đọc/Ghi | Mục đích |
|------|---------|----------|
| ExamAttempt | Đọc/Ghi | Trạng thái, thời gian |
| AttemptDetail | Ghi | Đáp án + clientSequence |
| Question | Đọc | Câu hỏi (lược đáp án) |
| StimulusGroup | Đọc | Audio URL, cue points |
| MistakeNotebook | Ghi | Đẩy câu sai (sau submit) |
| DiagnosticProfile | Ghi | Tạo hồ sơ năng lực |

### 13. Chi tiết API

```
PATCH /attempts/:id/autosave
Request:
{
  "answers": [
    { "questionId": 1, "userChoice": "B", "isFlagged": false, "isGuessed": false,
      "responseTimeSeconds": 15, "clientSequence": 3 }
  ],
  "deviceId": "uuid"
}
Response 200: { "success": true, "data": { "savedCount": 5, "serverTime": "ISO" } }
Error 409: { "error": { "code": "CONFLICT_STALE_SESSION", "message": "Bài thi ở thiết bị khác." } }
```

```
POST /attempts/:id/submit
Request:
{
  "answers": [...],
  "submittedAt": "ISO",
  "autoSubmitted": false,
  "deviceId": "uuid"
}
Response 200:
{
  "success": true,
  "data": {
    "attemptId": "uuid", "status": "COMPLETED",
    "scaledListening": 350, "scaledReading": 320, "totalScaled": 670,
    "scoreBand": { "low": 620, "high": 720 }, "sem": 50,
    "integrityHash": "hmac...", "nextStep": "DIAGNOSTIC_RESULT"
  }
}
```

---

## S-09 · Kết quả Chẩn đoán + Tạo lộ trình (Diagnostic Result)

**Route:** `/diagnostic/result`
**Quyền truy cập:** Học viên

### 1. Mô tả
Điểm ước lượng dạng **KHOẢNG**, phân tích kỹ năng yếu, Reality Check. Từ điểm + mục tiêu + cam kết → tính D → sinh Saga Map + gán linh vật.

> **Mới v10:** D = min(30, max(7, round(7 + ΔS/12 × W_band × 45/T_daily))). Reality Check khi ΔS > 180. ΔS ≤ 0 → "Speed Drill 7 Ngày". Preview Saga Map.

### 2. Điểm vào
Sau S-08 (nộp diagnostic).

### 3. Bố cục

| Vùng | Chi tiết |
|------|----------|
| Khối điểm | Khoảng (vd 450–520) + LC/RC + 'ước lượng ± sai số'. |
| Radar | 7 trục kỹ năng; tô đậm 2 yếu nhất. |
| Lộ trình | 'Lộ trình N ngày · M phút/ngày · 3×N nút trạm'. |
| Reality Check | Khả thi → xác nhận; ΔS>180 → mốc chặng (khích lệ). |
| Edge case ΔS≤0 | 'Chế độ Rèn Phản Xạ Cấp Tốc 7 Ngày'. |
| Preview Map | Mini-map Saga hình chữ S. |
| CTA | 'Tạo lộ trình của tôi' → thưởng → S-10. |

### 4. Thành phần UI

| Thành phần | Loại | Nhãn | Hành vi |
|-----------|------|------|---------|
| Score band | Card | '450–520' | gradient theo mức |
| Radar | SVG | 7 trục | tô đậm 2 yếu |
| Reality Check | Info card | — | xanh/cam |
| Mini-map | SVG | S-curve | 4 biome colors |
| CTA | Button primary | 'Tạo lộ trình của tôi' | animation |

### 5. Chức năng

| Chức năng | Mô tả | Kích hoạt | Kết quả |
|-----------|-------|-----------|---------|
| Xem kết quả | Tải phân tích | Vào màn | GET /diagnostic/result |
| Chọn phương án | Giữ mục tiêu / mốc chặng | Chọn + CTA | PATCH /user/journey/plan |
| Nhận thưởng | Linh vật + Gems + huy hiệu | Tự động khi tạo lộ trình | Animation |
| Tạo Map | Sinh 3×D nút | Tự động | POST /journey/generate-map |

### 6. Trường nhập & Kiểm tra
Không (chỉ chọn phương án).

### 7. Business logic
- Điểm luôn dạng **khoảng** (low–high), không số đơn.
- Reality Check khích lệ, không tiêu cực.
- **Công thức D:** ΔS = max(0, target − baseline); W_band = 1.0 + baseline/1000; D = min(30, max(7, round(7 + ΔS/12 × W_band × 45/dailyMinutes))).
- **ΔS ≤ 0:** D = 7, mode = SPEED_DRILL.
- **ΔS > 180:** milestone1 = baseline + 180, D = 30.

### 8. API sử dụng

| Thời điểm | API | Thành công → | Lỗi → |
|-----------|-----|-------------|-------|
| Vào màn | `GET /api/v1/diagnostic/results` | Hiển thị | 404 NOT_READY |
| Tạo lộ trình | `PATCH /api/v1/users/me/journey/plans` | → S-10 | 400 PLAN_MODE_INVALID |
| Tạo Map | `POST /api/v1/journeys/{journeyId}/maps` | Map data | 500 MAP_GENERATION_FAILED |

### 9. Thông báo

| Tình huống | Loại | Thông điệp |
|-----------|------|-----------|
| Khả thi | success | 'Mục tiêu N ngày khả thi! ~X phút/ngày.' |
| ΔS>180 | warn | 'Đây là đích lớn 💪 Mốc chặng 1: ~Y điểm.' |
| ΔS≤0 | info | 'Bạn đã đạt mục tiêu! 🎯 Rèn phản xạ 7 ngày.' |
| Thưởng | success | Animation + 'Mở khoá linh vật! +50 Gems' |
| Đang tạo | loading | 'Đang tạo bản đồ Saga...' |

### 10. Điều hướng ra
S-10 (Dashboard).

### 11. Trạng thái & Edge cases
Khả thi / Cần điều chỉnh / Speed Drill / Đang tạo.

### 12. Bảng CSDL

| Bảng | Đọc/Ghi | Mục đích |
|------|---------|----------|
| ExamAttempt | Đọc | Kết quả diagnostic |
| DiagnosticProfile | Đọc/Ghi | theta, skillMastery |
| UserJourney | Ghi | D, mode |
| MapNode | Ghi | Sinh 3×D nút |
| UserNodeProgress | Ghi | Khởi tạo trạng thái |
| GemTransaction | Ghi | +50 Gems khởi đầu |
| JourneyCharacter | Ghi | Map ngày → linh vật |
| Badge | Ghi | JOURNEY_STARTED |

### 13. Chi tiết API

```
GET /diagnostic/result
Response 200:
{
  "success": true,
  "data": {
    "scoreBand": { "low": 450, "high": 520 },
    "scaledListening": 250, "scaledReading": 220,
    "sem": 35, "thetaEstimate": -0.5,
    "weakAbilities": ["LC_PART3_INFERENCE", "RC_TENSE_AGREEMENT"],
    "skillMastery": { "LC_PART1_PHOTO": 0.85, "LC_PART2_INDIRECT": 0.60, ... },
    "realityCheck": {
      "feasibleIn30Days": true,
      "suggestedMilestone": null,
      "estimatedDurationDays": 16,
      "mode": "STANDARD"
    }
  }
}
```

```
PATCH /user/journey/plan
Request: { "mode": "STANDARD" | "MILESTONE" | "SPEED_DRILL" }
Response 200:
{
  "success": true,
  "data": {
    "journeyId": "uuid", "durationDays": 16, "totalNodes": 48,
    "guardianLexling": { "id": "uuid", "name": "Spark", "stage": 1 },
    "starterRewards": { "gems": 50, "badge": "JOURNEY_STARTED", "lexling": { "id": "uuid", "name": "Spark" } }
  }
}
```

```
POST /journey/generate-map
Request: { "journeyId": "uuid" }
Response 201:
{
  "success": true,
  "data": {
    "totalNodes": 48,
    "nodes": [
      {
        "id": "uuid", "dayIndex": 1, "nodeIndex": 1, "nodeType": "WARMUP",
        "title": "Khởi động Part 5", "biomeTheme": "SUNRISE_VALLEY",
        "coordXPercent": 20.0, "coordYIndex": 1,
        "targetPart": 5, "targetSkillId": "RC_TENSE_AGREEMENT",
        "questionCount": 5, "status": "CURRENT"
      }
    ],
    "biomes": [
      { "theme": "SUNRISE_VALLEY", "startNode": 1, "endNode": 12, "label": "Thung lũng Bình minh" }
    ]
  }
}
```

---

# 2. Đặc tả Màn hình — Dashboard & Trải nghiệm Học tập Saga Map

---

## S-10 · Bảng điều khiển Học tập (Dashboard / Home)

### 1. Mô tả
Trung tâm điều phối toàn bộ hoạt động học tập hàng ngày của học viên. Tích hợp thanh tiến độ ngày, widget thu nhỏ bản đồ Saga Map (Minimap), linh thú hộ mệnh Guardian Lexling hiển thị theo giai đoạn tiến hóa, nhiệm vụ hàng ngày (Daily Quests), trạng thái chuỗi học tập (Streak & Shield), và lối tắt vào trạm học hiện tại. Toàn bộ tính năng 100% miễn phí cho tất cả học viên.

### 2. Điểm vào
- Đăng nhập thành công từ S-03.
- Hoàn thành bài chẩn đoán và nhận lộ trình từ S-09.
- Nhấp biểu tượng "Trang chủ" trên thanh điều hướng chính (Bottom Nav hoặc Sidebar).
- Hoàn thành một nút trạm từ S-29 bấm "Về trang chủ".

### 3. Bố cục màn hình
- **Header cố định**:
  - Avatar học viên, Tên hiển thị, Cấp độ Level hiện tại.
  - Bộ đếm Gems (Kim cương) và Energy (Năng lượng tia sét ⚡ x/5).
  - Chuỗi ngày học Streak (ngọn lửa 🔥 số ngày + biểu tượng khiên bảo vệ 🛡️).
- **Banner hành trình (Journey Hero Banner)**:
  - Tên lộ trình: "Chinh phục TOEIC [Target Score] trong [D] ngày".
  - Thanh tiến độ ngày: "Ngày [d]/[D] — [progress]% chặng đường".
  - Nút CTA nổi bật: "Tiếp tục trạm hiện tại: Trạm [nodeIndex] — [Node Title]" kèm biểu tượng sao (0-3⭐).
- **Khu vực Linh thú & Bản đồ thu nhỏ (Guardian & Saga Minimap Widget)**:
  - Cột trái (hoặc card chính): Linh thú Guardian Lexling cử động 2D với bong bóng thoại cổ vũ ("Hôm nay cùng vượt ải Part 5 nhé!").
  - Cột phải: Bản đồ Saga thu nhỏ 3 trạm gần nhất (Trạm trước đã xong, Trạm hiện tại đang sáng nhấp nháy, Trạm kế tiếp đang khóa 🔒).
  - Nút "Mở toàn bộ Bản đồ Saga 🗺️" chuyển hướng sang S-27.
- **Nhiệm vụ hàng ngày (Daily Quests Card)**:
  - Thanh hoàn thành tổng thể: [x]/3 nhiệm vụ (Thưởng rương bảo vật khi đạt 3/3).
  - Danh sách 3 nhiệm vụ:
    1. Vượt 1 trạm kiến thức mới (hoàn thành tối thiểu 1⭐).
    2. Ôn tập 5 từ vựng/lỗi sai trong Sổ tay thông minh (SM-2 review).
    3. Hoàn thành 1 bài Micro-drill nghe/đọc.
- **Thống kê nhanh (Quick Analytics)**:
  - Dự báo điểm hiện tại: [Predicted Score] (Nghe: [LC], Đọc: [RC]).
  - Kỹ năng cần củng cố nhất hôm nay (Weakest Micro-skill badge).
- **Lối tắt luyện tập tự do (Quick Practice Shortcuts)**:
  - Luyện theo Part (S-15).
  - Thi thử CBT mô phỏng ETS (S-12/S-13).
  - Sổ tay lỗi sai thông minh (S-18).
  - Đấu trường xếp hạng (S-20).

### 4. Thành phần UI
- `UserProfileHeader`: Avatar, Level, Gems counter, Streak badge, Energy meter.
- `JourneyProgressHero`: Card gradient hiển thị ngày d/D, điểm mục tiêu, nút Start Current Node button.
- `LexlingCompanionWidget`: Avatar linh thú tương tác (chạm vào sẽ đổi animation/thoại), hiển thị Stage hiện tại (Stage 1→4).
- `SagaMinimapPreview`: Canvas/SVG hiển thị 3 node liên kề với hiệu ứng glow ở node CURRENT.
- `DailyQuestList`: 3 QuestItem với progress bar và nút "Nhận thưởng" (Claim).
- `StreakShieldModal`: Modal giải thích cơ chế bảo vệ chuỗi ngày và nút kích hoạt khiên.

### 5. Chức năng
- **Bắt đầu trạm học tức thì**: Nhấp CTA chính để mở trực tiếp S-28 (Node Exercise) của trạm `activeNodeId`.
- **Xem toàn cảnh hành trình**: Nhấp vào minimap hoặc nút "Bản đồ Saga" chuyển đến S-27.
- **Điểm danh tự động & Cập nhật chuỗi (Streak Update)**: Khi người dùng tương tác hoàn thành bài học đầu tiên trong ngày, tự động tính chuỗi theo múi giờ UTC và server-side validation.
- **Nhận thưởng nhiệm vụ hàng ngày**: Nhấp "Nhận" khi hoàn thành quest, cộng Gems vào tài khoản với hiệu ứng pháo hoa, chống double-click bằng Idempotency-Key.
- **Hồi phục năng lượng tự động**: Hiển thị đếm ngược thời gian hồi 1 Năng lượng (mỗi 30 phút hồi 1 Energy, tối đa 5).

### 6. Trường nhập & Kiểm tra
- Màn hình chủ yếu là hiển thị (Read-only) và tương tác nút (Actions).
- Kiểm tra Client:
  - Nếu `Energy == 0`: Khi nhấp "Tiếp tục trạm hiện tại" hoặc bài tập mới, hiển thị modal thông báo: "Bạn đã hết năng lượng học tập. Bạn có thể:
    1. Đổi 20 Gems để nạp đầy 5/5 ngay lập tức (Gems hoàn toàn kiếm được từ nỗ lực học tập).
    2. Chờ tự hồi phục: 1 Năng lượng sau mỗi 30 phút.
    3. **Luyện tập Hồi Năng lượng (Practice to Recharge - 100% Miễn phí)**: Làm đúng 5 câu vi mô Part 5 liên tiếp để hồi ngay 1 điểm Năng lượng!"
    Cam kết 100% Miễn phí: Học viên luôn có thể tiếp tục học và không bao giờ bị khóa bài tập.
  - Chống bấm nhận quà liên tiếp: Disable button ngay khi click và gửi request kèm header `Idempotency-Key: uuidv4()`.

### 7. Business logic
- **Xác định trạm hiện tại (`activeNodeId`)**: Lấy node đầu tiên trong bảng `MapNode` có status là `CURRENT` thuộc `UserJourney` đang active.
- **Cập nhật trạng thái chuỗi ngày (Streak)**:
  - Nếu lần cuối học là hôm qua (theo UTC day): Giữ nguyên chuỗi, sau khi làm bài tăng +1.
  - Nếu lần cuối học là hôm nay: Giữ nguyên chuỗi.
  - Nếu lần cuối học cách > 1 ngày:
    - Nếu người dùng có `activeShieldCount > 0`: Tiêu hao 1 khiên, bảo lưu chuỗi, gửi thông báo chúc mừng bảo toàn chuỗi.
    - Nếu không có khiên: Đặt `currentStreak = 0`, hiển thị gợi ý dùng 300 Gems khôi phục trong vòng 48h (Streak Recovery).
- **Tính toán hiển thị Guardian Lexling**:
  - Giai đoạn dựa trên tỷ lệ hoàn thành node:
    - 0% - 24%: Stage 1 (Trứng / Sơ sinh - Baby Spark).
    - 25% - 69%: Stage 2 (Thiếu niên - Brave Spark).
    - 70% - 99%: Stage 3 (Trưởng thành - Fierce Spark).
    - 100%: Stage 4 (Thần thú tối thượng - Ascended Spark).

### 8. API sử dụng
- `GET /api/v1/users/me/dashboard`: Lấy thông tin tổng hợp trang chủ (Hành trình, linh thú, nhiệm vụ, chuỗi, điểm số).
- `POST /api/v1/quests/{id}/claims`: Nhận phần thưởng nhiệm vụ ngày.
- `POST /api/v1/users/me/energy/refills`: Dùng Gems đổi năng lượng học tập.

### 9. Thông báo (UI Messages)
- `DASH_WELCOME_BACK`: "Chào mừng bạn trở lại! Hãy hoàn thành mục tiêu ngày hôm nay."
- `DASH_STREAK_PROTECTED`: "Khiên bảo vệ đã cứu chuỗi ngày học của bạn hôm qua! Bạn còn lại {count} khiên."
- `DASH_STREAK_LOST`: "Bạn đã lỡ mất chuỗi học tập hôm qua. Hãy dùng 300 Gems để khôi phục trong 48h!"
- `DASH_ENERGY_DEPLETED`: "Bạn đã dùng hết năng lượng. Chờ 30 phút để hồi phục hoặc đổi bằng 20 Gems."
- `DASH_QUEST_CLAIM_SUCCESS`: "Nhận thưởng thành công! +{gems} Gems đã được cộng vào túi đồ."

### 10. Điều hướng ra
- Nhấp "Tiếp tục học" → S-28 (Node Exercise).
- Nhấp "Bản đồ Saga" → S-27 (Saga Map Full View).
- Nhấp "Luyện theo Part" → S-15 (Practice by Part).
- Nhấp "Thi thử CBT" → S-12 (CBT Intro).
- Nhấp "Sổ tay lỗi sai" → S-18 (Mistake Notebook).
- Nhấp "Đấu trường" → S-20 (Arena Leaderboard).
- Nhấp "Avatar / Cài đặt" → S-22 hoặc S-23.

### 11. Trạng thái & Edge cases
- **EC-DASH-01: Học viên ngủ đông (Dormant Learner quay lại sau >7 ngày)**: Giữ nguyên vị trí trạm `CURRENT` trên Saga Map, gom toàn bộ từ vựng đến hạn SM-2 vào danh sách ưu tiên ôn tập, hiển thị popup "Mừng bạn quay lại! Chúng tôi đã tối ưu lại bài khởi động cho bạn."
- **EC-DASH-02: Đồng hồ máy trôi (Clock Drift)**: Toàn bộ streak, cooldown nhiệm vụ, thời gian năng lượng tính hoàn toàn dựa vào timestamp trả về từ server, không dùng `Date.now()` của trình duyệt.
- **EC-DASH-03: Không có kết nối mạng**: Hiển thị banner Offline Mode. Cho phép truy cập trạm hiện tại nếu đã được Service Worker & Dexie cache sẵn.

### 12. Bảng CSDL liên quan
- `User`: id, name, email, level.
- `UserJourney`: id, currentDay, durationDays, targetScore, status, activeNodeId.
- `MapNode`: id, nodeIndex, title, nodeType, status, starsEarned.
- `GamificationState`: currentStreak, maxStreak, activeShieldCount, gems, energy, lastActivityDate.
- `UserQuest`: id, questType, targetCount, currentCount, isClaimed.
- `GuardianLexling`: id, name, stage, evolutionProgress.

### 13. Chi tiết API
```
GET /user/dashboard
Headers: { Authorization: "Bearer <token>" }
Response 200 OK:
{
  "success": true,
  "data": {
    "user": {
      "id": "u-123456",
      "name": "Nguyễn Văn A",
      "avatarUrl": "https://cdn.toeicpro.com/avatars/u1.png",
      "level": 12,
      "gems": 450,
      "energy": { "current": 4, "max": 5, "nextRefillSeconds": 840 },
      "streak": { "current": 7, "protectedByShield": false, "activeShields": 2 }
    },
    "journey": {
      "id": "j-789012",
      "targetScore": 750,
      "currentDay": 5,
      "durationDays": 16,
      "progressPercent": 31.2,
      "activeNode": {
        "id": "node-015",
        "nodeIndex": 15,
        "title": "Bẫy đại từ sở hữu trong Part 5",
        "nodeType": "SKILL_DRILL",
        "biomeTheme": "ECHO_FOREST",
        "starsEarned": 0,
        "status": "CURRENT"
      },
      "recentNodes": [
        { "id": "node-014", "nodeIndex": 14, "title": "Phân biệt Thì Quá khứ & Hiện tại hoàn thành", "starsEarned": 3, "status": "COMPLETED" },
        { "id": "node-015", "nodeIndex": 15, "title": "Bẫy đại từ sở hữu trong Part 5", "starsEarned": 0, "status": "CURRENT" },
        { "id": "node-016", "nodeIndex": 16, "title": "Trạm kiểm soát Review Gate 1", "starsEarned": 0, "status": "LOCKED" }
      ],
      "guardian": {
        "id": "lex-001",
        "name": "Sparky",
        "stage": 2,
        "stageTitle": "Brave Spark",
        "dialogue": "Bạn đang tiến bộ rất nhanh! Vượt trạm 15 để chuẩn bị vào Cổng kiểm soát nào!",
        "spriteUrl": "https://cdn.toeicpro.com/lexlings/spark_stage2.png"
      }
    },
    "dailyQuests": [
      { "id": "q-1", "title": "Vượt trạm học tập hôm nay", "current": 0, "target": 1, "rewardGems": 30, "isClaimed": false },
      { "id": "q-2", "title": "Ôn tập 5 thẻ từ vựng SM-2", "current": 3, "target": 5, "rewardGems": 20, "isClaimed": false },
      { "id": "q-3", "title": "Hoàn thành 1 Micro-drill đạt trên 80%", "current": 1, "target": 1, "rewardGems": 25, "isClaimed": true }
    ],
    "predictions": {
      "predictedTotal": 685,
      "predictedLC": 370,
      "predictedRC": 315,
      "weakestMicroSkill": { "id": "RC_PRONOUN_TRAP", "name": "Bẫy đại từ Part 5", "accuracy": 0.42 }
    }
  }
}
```

```
POST /gamification/claim-quest
Headers: { Authorization: "Bearer <token>", Idempotency-Key: "c6a2b8e4-8f19-4d2a-8ef7-32bb194ac5e9" }
Request: { "questId": "q-3" }
Response 200 OK:
{
  "success": true,
  "data": {
    "questId": "q-3",
    "rewardGems": 25,
    "newGemsBalance": 475,
    "allDailyCompleted": false
  }
}
Error 400: { "success": false, "code": "QUEST_NOT_COMPLETED", "message": "Nhiệm vụ chưa đạt điều kiện hoàn thành." }
Error 409: { "success": false, "code": "QUEST_ALREADY_CLAIMED", "message": "Nhiệm vụ này đã được nhận thưởng." }
```

---

## S-11 · Kế hoạch & Nhiệm vụ Học tập Chi tiết (Daily Learning Plan)

### 1. Mô tả
Giao diện danh sách nhiệm vụ học tập theo cấu trúc bài giảng của ngày học hiện tại `Day d/D`. Dành cho học viên ưa chuộng phong cách checklist truyền thống bên cạnh giao diện Saga Map 2.5D. Liệt kê tuần tự các giai đoạn: Khởi động (Warm-up) → Luyện kỹ năng mục tiêu (Target Skill Drill) → Trạm ôn tập ngắt quãng (Spaced Repetition Review) → Kiểm tra trạm (Checkpoint / Mini Boss).

### 2. Điểm vào
- Từ tab "Lộ trình" trên thanh điều hướng.
- Nhấp vào "Chi tiết ngày học" từ Banner ở S-10.

### 3. Bố cục màn hình
- **Header ngày học**: "Ngày 5 trên 16 ngày" — Chủ đề ngày: "Làm chủ liên từ và bẫy mệnh đề quan hệ trong Part 5 & 6".
- **Thanh tiến độ học tập trong ngày (Daily Progress Bar)**: Thời gian cam kết học (Ví dụ: 45 phút, đã học 20 phút).
- **Danh sách 4 chặng nhiệm vụ trong ngày**:
  1. *Khởi động (Warm-up)*: 5 câu hỏi nhanh củng cố từ vựng TOEIC thường gặp. (Trạng thái: Hoàn thành ✔️).
  2. *Luyện trọng tâm (Skill Core)*: 15 câu chuyên sâu về kỹ năng yếu nhất phát hiện từ bài chẩn đoán. (Trạng thái: Đang làm ⏳).
  3. *Sổ tay ôn tập (Spaced Repetition)*: 10 thẻ lỗi sai đến hạn giải thuật SM-2. (Trạng thái: Chưa mở).
  4. *Trùm chặng (Mini Boss Challenge)*: 10 câu áp lực thời gian (ETS timing 30s/câu). (Trạng thái: Khóa 🔒).
- **Footer**: Nút "Chuyển sang xem trên Bản đồ Saga 🗺️".

### 4. Thành phần UI
- `DaySelectorCarousel`: Thanh cuộn ngang hiển thị các ngày Day 1 → Day D (Ngày quá khứ xem lại được kết quả; Ngày tương lai bị khóa).
- `TaskCardGroup`: Các card nhiệm vụ có icon phân loại, thời lượng ước tính, số lượng câu hỏi, số sao đạt được.
- `DailyCommitmentMeter`: Vòng tròn tiến độ hiển thị thời gian học thực tế so với mục tiêu cam kết lúc onboarding (30/45/60/90 phút).

### 5. Chức năng
- Chọn ngày học trong quá khứ để làm lại hoặc xem lịch sử.
- Khởi chạy bài tập tương ứng của từng chặng nhiệm vụ.
- Đánh dấu hoàn thành tự động khi người dùng kết thúc trạm bài tập.

### 6. Trường nhập & Kiểm tra
- Click vào nhiệm vụ đã mở khóa: Chuyển hướng đến màn hình làm bài tương ứng (`S-28` hoặc `S-14` hoặc `S-18`).
- Click vào nhiệm vụ đang khóa: Hiển thị tooltip "Hãy hoàn thành các nhiệm vụ trước để mở khóa nhiệm vụ này".

### 7. Business logic
- Mở khóa tuần tự (Sequential Unlocking): Nhiệm vụ sau chỉ được mở khi nhiệm vụ trước đạt tối thiểu 1 sao (độ chính xác ≥ 60%).
- Tính toán thời gian học tích lũy (Active Study Time): Chỉ đếm thời gian khi tab ở trạng thái active (`document.visibilityState === 'visible'`) và có tương tác của người dùng.

### 8. API sử dụng
- `GET /api/v1/journeys/{journeyId}/daily-plans?day=5`: Lấy danh sách nhiệm vụ chi tiết và tiến độ của ngày chỉ định.
- `POST /api/v1/tasks/{taskId}/attempts`: Bắt đầu một nhiệm vụ con.

### 9. Thông báo
- `PLAN_TASK_LOCKED`: "Vui lòng hoàn thành nhiệm vụ trước để mở khóa nội dung này."
- `PLAN_DAY_COMPLETED`: "Chúc mừng! Bạn đã hoàn thành toàn bộ mục tiêu của Ngày {day}!"

### 10. Điều hướng ra
- Bấm vào Task Card → S-28 (Node Exercise) hoặc S-14 (Micro-drill).
- Bấm "Xem bản đồ Saga" → S-27.

### 11. Trạng thái & Edge cases
- Học viên không học ngày hôm trước: Nhiệm vụ ngày cũ vẫn được bảo lưu, không phạt trừ điểm; hệ thống tự động dời các node chưa học trên bản đồ Saga theo giải thuật thích ứng.

### 12. Bảng CSDL liên quan
- `UserJourney`, `MapNode`, `UserNodeProgress`, `MistakeNotebook`.

### 13. Chi tiết API
```
GET /journey/daily-plan?day=5
Headers: { Authorization: "Bearer <token>" }
Response 200 OK:
{
  "success": true,
  "data": {
    "journeyId": "j-789012",
    "selectedDay": 5,
    "totalDays": 16,
    "committedMinutes": 45,
    "spentMinutes": 22,
    "tasks": [
      {
        "id": "task-501", "type": "WARMUP", "title": "Khởi động: 5 cụm từ Collocation then chốt",
        "questionCount": 5, "estimatedMinutes": 5, "status": "COMPLETED", "stars": 3, "score": "5/5"
      },
      {
        "id": "task-502", "type": "SKILL_DRILL", "title": "Chuyên đề: Đại từ phản thân & Bẫy bồi ngữ",
        "questionCount": 15, "estimatedMinutes": 20, "status": "IN_PROGRESS", "stars": 0, "score": null
      },
      {
        "id": "task-503", "type": "REVIEW_GATE", "title": "Ôn tập SM-2: 10 từ vựng hay quên",
        "questionCount": 10, "estimatedMinutes": 10, "status": "LOCKED", "stars": 0, "score": null
      },
      {
        "id": "task-504", "type": "BOSS_CHALLENGE", "title": "Thử thách trùm: Đua tốc độ Part 5",
        "questionCount": 10, "estimatedMinutes": 10, "status": "LOCKED", "stars": 0, "score": null
      }
    ]
  }
}
```

---

## S-27 · Saga Map — Bản đồ Hành trình 2.5D (Saga Journey Map)

### 1. Mô tả
Giao diện trung tâm mang tính đột phá của TOEIC PRO, chuyển hóa toàn bộ lộ trình học tập thích ứng cá nhân hóa (D ngày, 3*D trạm) thành một thế giới bản đồ S-Curve dạng 2.5D sống động. Học viên du hành qua 4 quần xã sinh thái (Biomes: Thung lũng Bình Minh → Rừng Nguyên Sinh → Hẻm Núi Pha Lê → Đỉnh Núi Huyền Thoại). Trên đường đi có các Trạm Khởi động, Trạm Chuyên sâu kỹ năng, Trạm Cổng kiểm soát (Review Gate yêu cầu 2⭐ mới qua), và Trạm Trùm (Boss Battle). Linh thú Guardian Lexling di chuyển theo bước chân của học viên và tiến hóa tại các mốc trọng đại. 100% miễn phí, toàn bộ bản đồ và quần xã mở cho tất cả học viên.

### 2. Điểm vào
- Nhấp tab "Bản đồ Saga" trên thanh điều hướng chính.
- Nhấp "Mở toàn bộ Bản đồ Saga" từ S-10.
- Nút chuyển chế độ xem từ S-11.

### 3. Bố cục màn hình
- **Thanh trạng thái đầu trang (Map HUD Header)**:
  - Nút quay lại Dashboard.
  - Tên Quần xã hiện tại (Ví dụ: "Quần xã II: Rừng Xanh Tri Thức — Vùng Listening Part 2 & 3").
  - Tổng số Sao thu thập: ⭐ [earnedStars]/[totalPossibleStars].
  - Mốc tiến hóa tiếp theo của Lexling: "Tiến hóa Stage 3 sau [n] trạm nữa".
- **Vùng Canvas Bản đồ 2.5D (Isometric S-Curve Scrollable View & Antigravity Spatial Depth)**:
  - **Thông số Khung nhìn Đẳng cự (Isometric 3D Spec)**: Container áp dụng thuộc tính CSS 3D:
    ```css
    perspective: 1200px;
    transform: rotateX(42deg) rotateZ(-12deg);
    will-change: transform;
    ```
  - **Độ sâu Không gian & Bề mặt Lơ lửng (Weightless Stepping Stones)**: Các trạm bài học là các phiến đá nổi với bóng đổ khuếch tán đa tầng:
    ```css
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04);
    ```
  - **Hệ thống Hạt Môi trường 4 Quần xã (Living Biomes Particle Effects)**:
    - *Quần xã I (Thung lũng Bình Minh)*: Hạt phấn hoa phát quang vàng kim bay dập dờn (`Floating Pollen Particles`).
    - *Quần xã II (Rừng Xanh Tri Thức)*: Luồng tia sáng xuyên qua tán lá (`God-rays`) và đom đóm xanh ngọc nhấp nháy.
    - *Quần xã III (Hẻm Núi Pha Lê)*: Bụi tinh thể thạch anh tím lấp lánh với hiệu ứng khúc xạ tán sắc (`Chromatic Aberration`).
    - *Quần xã IV (Đỉnh Núi Huyền Thoại)*: Biển mây cuồn cuộn đa tầng và dải cực quang (`Aurora Borealis`) biến đổi nhịp nhàng.
  - Vị trí các Node:
    - Node đã hoàn thành: Sáng rõ, hiển thị 1-3 sao vàng lấp lánh.
    - Node hiện tại (`CURRENT`): Có vòng hào quang phát sáng (Pulse ring glow), linh thú Lexling đang đứng cạnh vẫy tay.
    - Node Review Gate: Biểu tượng Cổng thành kiên cố với ổ khóa ma thuật, hiển thị "Cần tối thiểu 2⭐".
    - Node Boss: Biểu tượng Vương miện gai phát ra sét đỏ.
    - Node tương lai (`LOCKED`): Xám mờ sương mù chiến tranh (Fog of war).
- **Thanh trượt mini điều hướng nhanh (Minimap Rail)**: Cột bên phải cho phép trượt nhanh giữa các Biome.
- **Nút hành động cố định (Floating HUD Action)**:
  - Nút "Tìm vị trí tôi": Đưa màn hình cuộn ngay về node `CURRENT`.
  - Nút "Vào bài học ngay": Mở nhanh S-28 của node `CURRENT`.

### 4. Thành phần UI
- `SagaCanvasViewport`: Khung render Canvas/SVG hoặc WebGL hỗ trợ tương tác zoom, pan, trượt mượt.
- `MapNodeElement`: Thành phần biểu diễn từng trạm gồm: Icon loại trạm, Nhãn tên kỹ năng, Khung 3 sao, Avatar linh thú (nếu ở vị trí này).
- `BiomeTransitionDivider`: Dải ranh giới chuyển tiếp huyền ảo giữa 2 quần xã môi trường.
- `ReviewGateLockOverlay`: Hiệu ứng dây xích ổ khóa ma thuật trên cổng Review Gate.
- `LexlingMapAvatar`: Linh thú cử động nhấp nháy, có câu thoại thoại nổi lên định kỳ.
- `NodePreviewSheet`: Bảng tóm tắt nội dung khi nhấp vào bất kỳ node nào (Tên bài, kỹ năng, số câu, độ khó, điểm cao nhất đạt được, nút "Bắt đầu").

### 5. Chức năng
- **Tương tác xem chi tiết trạm**: Nhấp vào node bất kỳ mở Sheet xem thông tin tóm tắt:
  - Nếu là trạm COMPLETED: Cho phép "Luyện tập lại để săn thêm sao" (Replay for stars).
  - Nếu là trạm CURRENT: Nút "Bắt đầu chinh phục".
  - Nếu là trạm LOCKED: Hiển thị điều kiện mở khóa ("Cần vượt qua Trạm X").
- **Tự động cuộn đến trạm hiện tại**: Khi mở màn hình, camera bản đồ tự động lướt mượt đến vị trí node `CURRENT`.
- **Hiệu ứng mở đường (Path Unlock Particle Animation)**: Khi học viên vừa hoàn thành node trước và quay lại bản đồ, một chùm hạt ánh sáng vàng sẽ chạy dọc con đường uốn lượn từ node cũ sang mở khóa node mới.

### 6. Trường nhập & Kiểm tra
- Kiểm tra trạng thái node khi nhấp:
  - Nếu node status == `LOCKED`: Không gọi API bài làm, rung lắc nhẹ (Shake animation) và hiển thị thông báo "Trạm này đang bị khóa ma thuật!".
  - Nếu node status == `REVIEW_GATE` và node trước chưa đạt: Chặn truy cập.

### 7. Business logic
- **Thuật toán sinh tọa độ S-Curve**:
  - Với mỗi node $i \in [1, N]$:
    $$coordXPercent = 50 + 35 \times \sin\left(\frac{i \times \pi}{3}
\r\r\right)$$
    $$coordYIndex = i$$
  - Tạo nên con đường zíc zắc mềm mại, cân đối trên màn hình điện thoại và máy tính.
- **Quy tắc phân bổ 4 Quần xã (Biome Assignment)**:
  - Biome 1: `SUNRISE_VALLEY` (0% - 25% tổng node): Củng cố kiến thức nền, Part 1 & Part 5 cơ bản.
  - Biome 2: `ECHO_FOREST` (26% - 50% tổng node): Phát triển phản xạ nghe Part 2 và bẫy liên từ Part 5/6.
  - Biome 3: `GRAMMAR_CANYON` (51% - 75% tổng node): Đột phá tốc độ đọc hiểu Part 7 đoạn đơn và Part 3 đối thoại.
  - Biome 4: `APEX_SUMMIT` (76% - 100% tổng node): Làm chủ đoạn kép/ba Part 7, đối thoại đa người Part 4, và bài tốt nghiệp chặng (Exit Exam).
- **Quy tắc trạm kiểm soát (Review Gate Lock Rule)**:
  - Cứ mỗi 6-8 node sẽ có 1 Review Gate.
  - Điều kiện qua cổng: Học viên phải đạt tối thiểu 2 sao (độ chính xác $\ge 80\%$) tại trạm Review Gate này. Nếu chỉ đạt 1 sao, trạm tiếp theo không mở khóa và học viên phải làm lại bài ôn tập.
- **Tiến hóa Linh thú (Lexling Evolution Trigger)**:
  - Hệ thống kiểm tra ngưỡng tiến hóa khi kết thúc mỗi trạm:
    - Hoàn thành trạm thứ $\lceil 0.25 \times N 
\rceil$: Kích hoạt Tiến hóa Stage 2.
    - Hoàn thành trạm thứ $\lceil 0.70 \times N 
\rceil$: Kích hoạt Tiến hóa Stage 3.
    - Hoàn thành trạm cuối $N$: Kích hoạt Tiến hóa Stage 4 tối thượng.

### 8. API sử dụng
- `GET /api/v1/journeys/{journeyId}/maps`: Tải toàn bộ cấu trúc các node, biomes, tiến độ sao và vị trí hiện tại.
- `POST /api/v1/nodes/{id}/attempts`: Bắt đầu làm bài tại trạm chỉ định.

### 9. Thông báo
- `MAP_GATE_LOCKED`: "Cổng kiểm soát yêu cầu tối thiểu 2 sao (≥80% chính xác) để mở lối đi tiếp theo!"
- `MAP_NODE_LOCKED`: "Bạn cần hoàn thành trạm trước đó để tiến bước trên bản đồ."
- `MAP_EVOLUTION_READY`: "Linh thú Guardian đã tích lũy đủ năng lượng để tiến hóa! Hãy xem ngay!"

### 10. Điều hướng ra
- Nhấp "Bắt đầu" trạm mở khóa → S-28 (Node Exercise).
- Hoàn tất chặng cuối cùng → S-30 (Exit Milestone Test).
- Nút quay lại → S-10 (Dashboard).

### 11. Trạng thái & Edge cases
- **EC-MAP-01: Offline Node Completion**: Học viên đang di chuyển trên tàu xe bị mất mạng khi làm bài. Trình duyệt dùng Dexie lưu kết quả tạm, cấp sao cục bộ và cho phép di chuyển tiếp trạm kế tiếp. Khi có mạng trở lại, hàng đợi `syncQueue` tự động đồng bộ lên server.
- **EC-MAP-02: Bản đồ quá dài**: Áp dụng cơ chế Virtual DOM / Windowing, chỉ render 15 node xung quanh viewport để đảm bảo tốc độ 60 FPS trên thiết bị di động yếu.

### 12. Bảng CSDL liên quan
- `UserJourney`, `MapNode`, `UserNodeProgress`, `GuardianLexling`.

### 13. Chi tiết API
```
GET /api/v1/journeys/{journeyId}/maps
Headers: { Authorization: "Bearer <token>" }
Response 200 OK:
{
  "success": true,
  "data": {
    "journeyId": "j-789012",
    "totalNodes": 48,
    "completedNodes": 14,
    "totalStarsEarned": 38,
    "maxStarsPossible": 144,
    "activeNodeId": "node-015",
    "guardian": {
      "id": "lex-001", "name": "Sparky", "stage": 2,
      "currentNodeId": "node-015", "evolutionProgressPercent": 56.0
    },
    "biomes": [
      { "id": "b-1", "theme": "SUNRISE_VALLEY", "title": "Thung lũng Bình Minh", "startNode": 1, "endNode": 12, "isUnlocked": true },
      { "id": "b-2", "theme": "ECHO_FOREST", "title": "Rừng Vọng Âm", "startNode": 13, "endNode": 24, "isUnlocked": true },
      { "id": "b-3", "theme": "GRAMMAR_CANYON", "title": "Hẻm Núi Cổ Tự", "startNode": 25, "endNode": 36, "isUnlocked": false },
      { "id": "b-4", "theme": "APEX_SUMMIT", "title": "Đỉnh Quang Vinh", "startNode": 37, "endNode": 48, "isUnlocked": false }
    ],
    "nodes": [
      {
        "id": "node-014", "nodeIndex": 14, "dayIndex": 5, "nodeType": "SKILL_DRILL",
        "title": "Bẫy đại từ sở hữu", "coordXPercent": 80.3, "coordYIndex": 14,
        "biomeTheme": "ECHO_FOREST", "starsEarned": 3, "bestAccuracy": 1.0, "status": "COMPLETED"
      },
      {
        "id": "node-015", "nodeIndex": 15, "dayIndex": 5, "nodeType": "SKILL_DRILL",
        "title": "Mệnh đề danh ngữ nâng cao", "coordXPercent": 50.0, "coordYIndex": 15,
        "biomeTheme": "ECHO_FOREST", "starsEarned": 0, "bestAccuracy": null, "status": "CURRENT"
      },
      {
        "id": "node-016", "nodeIndex": 16, "dayIndex": 5, "nodeType": "REVIEW_GATE",
        "title": "Cổng kiểm soát Rừng Sâu", "coordXPercent": 19.7, "coordYIndex": 16,
        "biomeTheme": "ECHO_FOREST", "starsEarned": 0, "bestAccuracy": null, "status": "LOCKED",
        "gateRequirement": { "minStarsRequired": 2 }
      }
    ]
  }
}
```

---

## S-28 · Nút Trạm Bài học — Trải nghiệm Vượt ải (Node Exercise)

### 1. Mô tả
Giao diện làm bài thi trắc nghiệm tương tác trực tiếp bên trong từng trạm của Bản đồ Saga. Tùy theo loại trạm (`WARMUP`, `SKILL_DRILL`, `REVIEW_GATE`, `BOSS_CHALLENGE`), giao diện điều chỉnh số lượng câu hỏi (5 đến 15 câu), thời gian giới hạn và cơ chế phản hồi (ngay lập tức hoặc sau khi nộp). Tích hợp chế độ Tập trung (Focus Mode) ẩn linh thú, phát âm thanh ETS audio mượt mà, và tự động lưu tiến độ chống mất điện/mất mạng.

### 2. Điểm vào
- Chọn trạm `CURRENT` từ S-27 hoặc S-10.
- Chọn lại một trạm đã vượt qua để thi cải thiện số sao.

### 3. Bố cục màn hình
- **Top Bar**:
  - Nút Thoát bài (có cảnh báo lưu tiến độ).
  - Tên loại trạm & Tên kỹ năng đang rèn luyện.
  - Bộ đếm câu hỏi dạng vạch phân đoạn (Segmented Progress Bar): Ví dụ Vạch 1/10.
  - Đồng hồ đếm ngược trôi mượt (ETS pace indicator, ví dụ 45 giây/câu).
  - Nút bật/tắt Focus Mode (ẩn mascot).
- **Vùng nội dung câu hỏi (Question Workspace)**:
  - Nếu là câu Listening: Audio Player chuẩn ETS với sóng âm thanh động, tự động phát 1 lần duy nhất theo chuẩn thi thực tế; hiển thị nhãn loa nhấp nháy khi đang đọc.
  - Nếu là câu Reading Part 6/7: Chia đôi màn hình (Split screen) — Cột trái là văn bản bài đọc (Stimulus Passages), Cột phải là các câu hỏi gắn liền; hỗ trợ highlight từ khóa, tự cuộn tới chỗ trống điền từ (`clozeIndex`).
  - Nội dung câu hỏi và 4 lựa chọn (A, B, C, D) dạng thẻ bấm lớn, thân thiện với ngón tay trên điện thoại.
- **Khu vực phản hồi linh thú (Companion Feedback Area)**:
  - Góc dưới bên phải: Linh thú cổ vũ khi chọn đúng hoặc an ủi phân tích khi chọn sai (nếu là trạm luyện tập có Instant Feedback).
- **Bottom Navigation Bar**:
  - Nút "Xem giải thích chi tiết" (chỉ sáng khi đã chọn đáp án ở chế độ luyện tập).
  - Nút "Câu kế tiếp" / "Nộp bài hoàn thành trạm".

### 4. Thành phần UI
- `NodeExerciseHeader`: Thanh tiến độ vạch, đồng hồ, nút Thoát, nút Focus Mode.
- `ListeningStimulusPlayer`: Trình phát âm thanh ETS audio tích hợp `audioCuePointsJson` kiểm soát phát chính xác từng câu.
- `ReadingSplitPane`: Khung chia bài đọc văn bản dài và câu hỏi trắc nghiệm.
- `RadioOptionCard`: Thẻ lựa chọn A/B/C/D với các trạng thái: Bình thường, Đã chọn, Đúng (Xanh lục), Sai (Đỏ), Đáp án chính xác gợi ý (Viền xanh sáng).
- `InstantExplanationDrawer`: Bảng trượt giải thích đáp án tức thì gồm: Dịch nghĩa tiếng Việt, Từ khóa tín hiệu (Clue Words), và Bẫy ETS cần tránh.

### 5. Chức năng
- **Nghe và làm bài**: Nghe audio chuẩn giọng ETS (Mỹ, Anh, Úc, Canada) và chọn đáp án.
- **Lưu cục bộ tức thời**: Mỗi lượt chọn đáp án được lưu ngay vào `Dexie.nodeExerciseProgress` kèm chuỗi tuần tự `clientSequence`.
- **Phản hồi tức thì (Instant Explanation)**: Với trạm `SKILL_DRILL` và `WARMUP`, sau khi chọn đáp án, hệ thống hiển thị ngay giải thích vì sao đúng/sai để khắc sâu trí nhớ. Với trạm `BOSS_CHALLENGE` và `REVIEW_GATE`, áp dụng hình thức thi kín: làm liên tục đến cuối mới xem báo cáo để rèn áp lực phòng thi.

### 6. Trường nhập & Kiểm tra
- Người dùng chọn 1 trong 4 lựa chọn A, B, C, D.
- Kiểm tra tính hợp lệ: Đáp án gửi lên phải thuộc `["A", "B", "C", "D"]`.
- Thời gian làm bài (`timeSpentMs`): Phải là số nguyên dương $\ge 500$ ms (chặn bot bấm ngẫu nhiên trong 0.1s).
- Đánh dấu tự đoán (`isGuessed`): Checkbox tùy chọn "Tôi không chắc câu này, đang đoán mò" để hệ thống nạp dữ liệu chính xác vào thuật toán IRT và SM-2.

### 7. Business logic
- **Thuật toán chấm điểm 3 Sao (3-Star Grading Algorithm)**:
  - Gọi $Acc$ là tỷ lệ câu đúng ($n_{correct} / n_{total}$).
  - Gọi $t_{avg}$ là thời gian trung bình trả lời một câu, $t_{standard}$ là chuẩn ETS (Part 5: 30s, Part 6: 45s, Part 7: 60s).
  - Tỷ lệ thời gian: $R_{time} = \min\left(1.5, \frac{t_{avg}}{t_{standard}}
\r\right)$.
  - Quy tắc phân sao:
    - ⭐⭐⭐ (3 Sao): $Acc \ge 90\%$ VÀ $R_{time} \le 1.0$ (Đúng xuất sắc và tốc độ chuẩn).
    - ⭐⭐ (2 Sao): $80\% \le Acc < 90\%$ (hoặc $Acc \ge 90\%$ nhưng làm chậm $R_{time} > 1.0$).
    - ⭐ (1 Sao): $60\% \le Acc < 80\%$.
    - ❌ (0 Sao - Thất bại): $Acc < 60\%$. Bắt buộc phải làm lại trạm nếu là trạm Review Gate.
- **Tự động đưa câu sai vào Sổ tay thông minh (Auto Mistake Ingestion)**:
  - Bất kỳ câu nào trả lời sai ($isCorrect == false$) hoặc có tích $isGuessed == true$ sẽ được tự động thêm vào `MistakeNotebook` với trạng thái ban đầu của giải thuật SM-2.
- **Tính toán chất lượng ôn tập $q$ tự động (Automated SM-2 Quality Scoring)**:
  - Nếu đúng nhanh ($R_{time} \le 1.0$) và không đoán: $q = 5$.
  - Nếu đúng nhưng làm chậm ($R_{time} > 1.0$) và không đoán: $q = 4$.
  - Nếu đúng nhưng có tích "Tôi đoán mò": $q = 3$.
  - Nếu sai nhưng mất nhiều thời gian suy nghĩ: $q = 2$.
  - Nếu sai hoàn toàn: $q = 1$.

### 8. API sử dụng
- `GET /api/v1/nodes/{id}/questions`: Tải danh sách câu hỏi của trạm.
- `POST /api/v1/nodes/{id}/attempts/{attemptId}/answers`: Gửi kết quả từng câu hỏi (real-time telemetry).
- `POST /api/v1/nodes/{id}/attempts/{attemptId}/completion`: Nộp toàn bộ bài của trạm, nhận số sao và mở khóa đường đi tiếp theo.

### 9. Thông báo
- `NODE_ANSWER_CORRECT`: "Chính xác! +10 EXP."
- `NODE_ANSWER_INCORRECT`: "Chưa chính xác! Hãy đọc kỹ gợi ý từ khóa bên dưới."
- `NODE_LEAVE_CONFIRM`: "Bạn có chắc muốn tạm dừng? Tiến độ các câu đã làm sẽ được lưu lại."

### 10. Điều hướng ra
- Sau khi trả lời hết các câu và xác nhận nộp bài → S-29 (Node Result).
- Nhấp Thoát bài → Quay lại S-27.

### 11. Trạng thái & Edge cases
- **EC-NODE-01: Mất mạng giữa chừng khi nộp câu hỏi**: Lưu `answer` vào hàng đợi Dexie offline. Giao diện vẫn cho phép học viên làm câu tiếp theo bình thường không bị khựng lại. Khi nộp trạm cuối cùng, client tự động retry kết nối.
- **EC-NODE-02: Âm thanh bị dừng do mạng chậm**: Service Worker đã pre-cache toàn bộ file âm thanh của trạm ngay từ lúc bấm vào node từ S-27. Đảm bảo âm thanh phát mượt mà 100% không bị buffering.

### 12. Bảng CSDL liên quan
- `MapNode`, `Question`, `Option`, `UserNodeProgress`, `AttemptDetail`, `MistakeNotebook`.

### 13. Chi tiết API
```
GET /nodes/:id/questions
Headers: { Authorization: "Bearer <token>" }
Response 200 OK:
{
  "success": true,
  "data": {
    "nodeId": "node-015",
    "nodeType": "SKILL_DRILL",
    "title": "Mệnh đề danh ngữ nâng cao",
    "targetSkillId": "RC_CLAUSE_NOUN",
    "questionCount": 10,
    "timeLimitSeconds": 600,
    "questions": [
      {
        "id": "q-1001",
        "partNumber": 5,
        "clozeIndex": 1,
        "questionText": "The board of directors requested that the marketing team _______ a comprehensive report by Friday.",
        "audioUrl": null,
        "stimulusText": null,
        "options": [
          { "label": "A", "text": "submits" },
          { "label": "B", "text": "submit" },
          { "label": "C", "text": "submitted" },
          { "label": "D", "text": "will submit" }
        ],
        "hints": {
          "grammarTopic": "Giả định thức (Subjunctive Mood)",
          "clueWords": ["requested that", "by Friday"]
        }
      }
    ]
  }
}
```

```
POST /api/v1/nodes/{id}/attempts/{attemptId}/answers
Headers: { Authorization: "Bearer <token>" }
Request:
{
  "questionId": "q-1001",
  "selectedOption": "B",
  "timeSpentMs": 14200,
  "isGuessed": false,
  "clientSequence": 1
}
Response 200 OK:
{
  "success": true,
  "data": {
    "questionId": "q-1001",
    "isCorrect": true,
    "correctOption": "B",
    "explanation": "Cấu trúc giả định thức với động từ 'request that + S + (should) + V_bare'. Do đó chọn 'submit'.",
    "clueWordsFound": ["requested that"],
    "trapNote": "Học viên thường nhầm chủ ngữ 'the marketing team' là số ít nên chọn 'submits' (A). Đây là bẫy ngữ pháp kinh điển của ETS!",
    "autoSm2Quality": 5,
    "expEarned": 15
  }
}
```

```
POST /api/v1/nodes/{id}/attempts/{attemptId}/completion
Headers: { Authorization: "Bearer <token>" }
Request:
{
  "nodeId": "node-015",
  "totalQuestions": 10,
  "correctCount": 9,
  "totalDurationSeconds": 245
}
Response 200 OK:
{
  "success": true,
  "data": {
    "nodeId": "node-015",
    "accuracy": 0.90,
    "starsEarned": 3,
    "isFirstCompletion": true,
    "gemsAwarded": 20,
    "expAwarded": 120,
    "unlockedNextNodeId": "node-016",
    "guardianEvolution": {
      "hasEvolved": false,
      "currentStage": 2,
      "progressToNextStage": 62.5
    }
  }
}
```

---

## S-29 · Kết quả Vượt trạm & Tiến hóa Linh thú (Node Result)

### 1. Mô tả
Màn hình tôn vinh thành tích ngay sau khi hoàn thành một trạm trên Bản đồ Saga. Hiển thị số sao đạt được (1-3 sao) kèm hiệu ứng âm thanh và hạt pháo hoa, tỷ lệ chính xác, tốc độ trung bình mỗi câu so với chuẩn ETS, phần thưởng nhận được (Gems, EXP), danh sách các kỹ năng vừa tiến bộ, và đặc biệt là sự kiện Tiến hóa của Guardian Lexling (nếu chạm mốc).

### 2. Điểm vào
- Tự động chuyển hướng từ S-28 sau khi nộp bài trạm thành công.

### 3. Bố cục màn hình
- **Phần chúc mừng chiến thắng (Victory Header)**:
  - Biểu tượng 3 ngôi sao lớn với animation xuất hiện tuần tự (Pop & Shine).
  - Tiêu đề chúc mừng: "Xuất sắc vượt trạm!" hoặc "Đạt chuẩn hoàn thành!".
- **Khung Linh thú Guardian ăn mừng (Lexling Celebration Frame)**:
  - Linh thú nhảy múa phấn khích, tung hoa giấy.
  - Nếu đạt mốc tiến hóa: Chuyển sang màn hình đặc biệt "Linh thú tiến hóa thành [Tên mới]!".
- **Thẻ thống kê hiệu suất bài làm (Performance Summary Card)**:
  - Số câu đúng: `[x]/[n]` câu ([accuracy]%).
  - Tốc độ làm bài: `[t_avg]` giây/câu (So sánh với chuẩn ETS: "Nhanh hơn 12% so với mức yêu cầu").
  - Phần thưởng đạt được: `+[gems]` Gems 💎, `+[exp]` EXP ⚡.
- **Thẻ phân tích kỹ năng & Lỗi sai (Skill & Mistake Review Snapshot)**:
  - Thanh tiến độ kỹ năng chính tăng: Ví dụ "Mệnh đề danh ngữ: 45% → 72% (+27%)".
  - Số lỗi sai vừa được đồng bộ vào Sổ tay thông minh: "[k] câu sai đã được lưu vào Sổ tay để ôn tập SM-2".
- **Hành động dưới cùng (Footer Action Buttons)**:
  - Nút chính: "Tiếp tục hành trình 🗺️" (Quay về Saga Map S-27 với animation mở khóa node kế tiếp).
  - Nút phụ: "Xem lại bài làm chi tiết 🔍" (Mở xem lại các câu vừa làm).
  - Nút phụ: "Làm lại để săn 3 sao 🔄".

### 4. Thành phần UI
- `StarRatingHero`: 3 icon ngôi sao có âm thanh chuông leng keng khi rơi vào vị trí.
- `RewardPillGroup`: Huy hiệu Gems và EXP nhận được.
- `SpeedComparisonDial`: Đồng hồ đo tốc độ so sánh với thời gian chuẩn ETS.
- `EvolutionTriggerModal`: Modal toàn màn hình với hiệu ứng luồng sáng thần thoại khi Lexling thăng cấp.
- `ActionNavRow`: Cụm nút bấm tiếp tục hành trình.

### 5. Chức năng
- Nhận phần thưởng vào tài khoản và cập nhật số sao trên bản đồ.
- Tự động kích hoạt chuỗi animation mở khóa lối đi tiếp theo trên bản đồ khi người dùng bấm "Tiếp tục".
- Cho phép người dùng chuyển thẳng sang xem danh sách lỗi sai vừa mắc phải.

### 6. Trường nhập & Kiểm tra
- Read-only màn hình báo cáo kết quả.
- Nút "Làm lại trạm": Nếu `Energy == 0`, thông báo cần nạp năng lượng. Nếu còn năng lượng, cho phép làm lại bài mới từ ngân hàng câu hỏi cùng taxonomy.

### 7. Business logic
- Cập nhật kỷ lục sao cao nhất (`bestStars`): Nếu lần trước làm đạt 2 sao, lần này đạt 3 sao, hệ thống chỉ cộng thêm phần thưởng chênh lệch (Delta Gems = 3 sao - 2 sao = 10 Gems). Không cộng trùng lặp để chống cày gem vô tận.
- Cập nhật độ thành thạo kỹ năng (`skillMastery`): Áp dụng công thức Bayesian Update cho độ thuần thục của kỹ năng tương ứng.

### 8. API sử dụng
- `GET /api/v1/nodes/{id}/results`: Lấy báo cáo chi tiết và phần thưởng của trạm vừa hoàn thành.

### 9. Thông báo
- `RESULT_PERFECT`: "Hoàn hảo! Bạn đã chinh phục 3 sao danh giá!"
- `RESULT_PASSED`: "Đạt chuẩn! Con đường phía trước đã được mở rộng."
- `RESULT_FAILED_GATE`: "Chưa đạt chuẩn Cổng kiểm soát (Cần tối thiểu 2 sao). Hãy ôn tập lại và thử sức lần nữa nhé!"

### 10. Điều hướng ra
- Bấm "Tiếp tục hành trình" → S-27 (Saga Map).
- Bấm "Xem lại giải thích" → S-17 (Review Solution).
- Bấm "Về trang chủ" → S-10 (Dashboard).

### 11. Trạng thái & Edge cases
- **EC-RES-01: Tiến hóa linh thú trùng lúc hoàn thành chặng**: Hiển thị ưu tiên hoạt ảnh tiến hóa trước, sau đó mới đến bảng điểm để tạo cảm xúc thăng hoa cao trào cho học viên.

### 12. Bảng CSDL liên quan
- `UserNodeProgress`, `GamificationState`, `GuardianLexling`, `DiagnosticProfile`.

### 13. Chi tiết API
```
GET /nodes/:id/result
Headers: { Authorization: "Bearer <token>" }
Response 200 OK:
{
  "success": true,
  "data": {
    "nodeId": "node-015",
    "starsEarned": 3,
    "previousBestStars": 0,
    "accuracy": 0.90,
    "correctCount": 9,
    "totalQuestions": 10,
    "averageTimePerQuestionSeconds": 24.5,
    "etsStandardPaceSeconds": 30.0,
    "rewards": { "gems": 20, "exp": 120 },
    "skillImprovement": {
      "skillId": "RC_CLAUSE_NOUN",
      "skillName": "Mệnh đề danh ngữ",
      "previousMastery": 0.45,
      "newMastery": 0.72
    },
    "mistakesRecorded": 1,
    "nextAction": {
      "unlockedNodeId": "node-016",
      "isReviewGate": true
    }
  }
}
```

---

## S-30 · Bài thi Tốt nghiệp Chặng — Đánh giá Ra (Exit Milestone Test)

### 1. Mô tả
Cột mốc quan trọng bậc nhất của hành trình: Bài thi tốt nghiệp chặng diễn ra vào ngày thứ $D$ (hoặc tại node cuối cùng của bản đồ Saga). Đánh giá tổng hợp toàn diện sự tiến bộ của học viên sau toàn bộ lộ trình rèn luyện cá nhân hóa, so sánh trực tiếp điểm thực tế đạt được so với Điểm mục tiêu (Target Score) đã cam kết ở Onboarding. Tùy chọn bài thi: Mini Test chuẩn hóa (50 câu - 45 phút) hoặc Full CBT Test (200 câu - 120 phút). 100% miễn phí, cấp Chứng nhận hoàn thành chặng (Milestone Certificate) và Linh thú Guardian biến đổi lên Thần thú tối thượng Stage 4.

### 2. Điểm vào
- Hoàn thành trạm áp chót trên Saga Map S-27.
- Nhấp vào thông báo "Ngày tốt nghiệp của bạn đã đến!" trên Dashboard S-10.

### 3. Bố cục màn hình
- **Giao diện Trước thi (Pre-exam Briefing)**:
  - Biểu tượng Cúp vàng vô địch chặng đường.
  - Nhắc lại mục tiêu xuất phát: Điểm khởi điểm [S_initial] → Điểm mục tiêu [S_target].
  - Chọn định dạng kiểm tra:
    - Lựa chọn A: Bài kiểm tra chuẩn hóa tinh gọn (50 câu: 25 LC + 25 RC — 45 phút).
    - Lựa chọn B: Bài thi thử đầy đủ chuẩn ETS (200 câu: 100 LC + 100 RC — 120 phút).
  - Nút CTA: "Bắt đầu làm bài thi tốt nghiệp 🎓".
- **Giao diện Làm bài (Exam Session)**:
  - Kế thừa toàn bộ giao diện mô phỏng phòng thi CBT tiêu chuẩn ETS của S-12/S-13.
- **Giao diện Báo cáo Tốt nghiệp (Exit Graduation Report)**:
  - Điểm số đạt được chính thức: `[Actual Exit Score]` / 990 (LC: `[LC]`, RC: `[RC]`).
  - So sánh đối chiếu với Mục tiêu ban đầu: "Vượt mục tiêu +35 điểm!" hoặc "Đạt 98% mục tiêu cam kết".
  - Radar biểu đồ mạng nhện so sánh sự cải thiện của từng Part (Lúc bắt đầu vs Lúc tốt nghiệp).
  - Chứng nhận vinh danh số (Digital Completion Certificate) có mã xác thực và nút chia sẻ mạng xã hội (Facebook, LinkedIn).
  - Lễ thăng cấp Linh thú: Guardian Lexling đạt Stage 4 tối thượng và được vinh danh trong Tủ trưng bày linh thú (Hall of Fame).
  - Nút định hướng: "Thiết lập lộ trình mới chinh phục mốc điểm cao hơn" (Ví dụ từ 650 lên 800).

### 4. Thành phần UI
- `GraduationHeroBanner`: Khung vinh danh trang trọng với hiệu ứng ánh hào quang.
- `ScoreComparisonDelta`: Thẻ hiển thị mức tăng trưởng $\Delta S = S_{exit} - S_{initial}$ với màu xanh lục nổi bật.
- `BeforeAfterRadarChart`: Biểu đồ trực quan so sánh 7 Part trước và sau khóa học.
- `DigitalCertificateCard`: Giấy chứng nhận hoàn thành có tên học viên, ngày tốt nghiệp, điểm số đạt được, chữ ký điện tử của TOEIC PRO.
- `LexlingStage4Reveal`: Hoạt họa 3D/2D biến hình lộng lẫy của linh thú tối thượng.

### 5. Chức năng
- Tổ chức thi tốt nghiệp với thuật toán ETS Equating quy đổi điểm chính xác.
- Tính toán mức độ hoàn thành cam kết mục tiêu học tập ban đầu.
- Cấp chứng chỉ số và lưu trữ vĩnh viễn trong Hồ sơ học viên (S-22).
- Khởi tạo hành trình tiếp theo nếu học viên muốn tiếp tục nâng cao trình độ.

### 6. Trường nhập & Kiểm tra
- Người dùng chọn loại bài thi (50 câu hoặc 200 câu).
- Xác nhận thiết bị âm thanh tai nghe trước khi bắt đầu bài nghe.

### 7. Business logic
- **Xác định tỷ lệ thành công của lộ trình (Journey Success Rate)**:
  - Nếu $S_{exit} \ge S_{target}$: Lộ trình được đánh giá là Hoàn thành Xuất sắc (Target Achieved). Cấp Huy hiệu vàng "Người chinh phục mục tiêu", tặng 500 Gems.
  - Nếu $S_{target} - 50 \le S_{exit} < S_{target}$: Hoàn thành Tốt (Near Target). Hệ thống đề xuất kế hoạch "Tăng tốc nước rút 7 ngày" (Speed Drill Mode) để bù đắp nốt khoảng cách điểm còn lại.
  - Nếu $S_{exit} < S_{target} - 50$: Đề xuất tạo lộ trình mới với thời gian học điều chỉnh hợp lý hơn dựa trên dữ liệu thực tế vừa đo lường.

### 8. API sử dụng
- `POST /api/v1/journeys/{journeyId}/exit-exam/attempts`: Khởi tạo phiên thi tốt nghiệp.
- `POST /api/v1/journeys/{journeyId}/exit-exam/attempts/{attemptId}/submissions`: Nộp bài thi và tính toán điểm tổng kết chặng.
- `GET /api/v1/journeys/{journeyId}/exit-exam/certificates`: Lấy thông tin chứng chỉ hoàn thành.

### 9. Thông báo
- `EXIT_CONGRATS`: "Chúc mừng bạn đã xuất sắc tốt nghiệp hành trình TOEIC {targetScore}!"
- `EXIT_CERTIFICATE_READY`: "Chứng nhận hoàn thành của bạn đã được khởi tạo thành công."

### 10. Điều hướng ra
- Bấm "Chia sẻ chứng nhận" → Tạo ảnh chứng chỉ chia sẻ lên mạng xã hội.
- Bấm "Lập lộ trình mới" → S-05 (Onboarding Goal Setting).
- Bấm "Về trang chủ" → S-10 (Dashboard).

### 11. Trạng thái & Edge cases
- Học viên rớt mạng trong lúc thi tốt nghiệp: Áp dụng cơ chế khôi phục phiên thi chống mất bài của S-12/S-13 (BullMQ grace period 5 phút).

### 12. Bảng CSDL liên quan
- `UserJourney`, `Attempt`, `AttemptDetail`, `DiagnosticProfile`, `GuardianLexling`.

### 13. Chi tiết API
```
POST /journey/exit-exam/start
Headers: { Authorization: "Bearer <token>" }
Request: { "journeyId": "j-789012", "format": "MINI_50" | "FULL_200" }
Response 201 Created:
{
  "success": true,
  "data": {
    "attemptId": "att-exit-999",
    "format": "MINI_50",
    "totalQuestions": 50,
    "timeLimitSeconds": 2700,
    "firstQuestionIndex": 1
  }
}
```

```
POST /api/v1/journeys/{journeyId}/exit-exam/attempts/{attemptId}/submissions
Headers: { Authorization: "Bearer <token>" }
Request: { "attemptId": "att-exit-999" }
Response 200 OK:
{
  "success": true,
  "data": {
    "journeyId": "j-789012",
    "initialScore": 450,
    "targetScore": 650,
    "exitScore": 680,
    "exitLC": 365,
    "exitRC": 315,
    "scoreDelta": 230,
    "isTargetAchieved": true,
    "certificate": {
      "certificateId": "CERT-2026-TOEIC-88912",
      "issueDate": "2026-09-16T08:00:00Z",
      "downloadUrl": "https://cdn.toeicpro.com/certs/cert_88912.pdf"
    },
    "guardianFinalEvolution": {
      "newStage": 4,
      "title": "Ascended Spark",
      "hallOfFameUnlocked": true
    },
    "rewardGems": 500
  }
}
```

---

## S-12 / S-13 · Phòng thi Mô phỏng CBT Nghe & Đọc (CBT Exam Simulation)

### 1. Mô tả
Giao diện thi thử trực tuyến mô phỏng 100% phần mềm thi TOEIC trên máy tính (Computer-Based Test) theo chuẩn khảo thí của Viện Khảo thí Giáo dục Hoa Kỳ (ETS). Gồm 2 phần liên tục: Listening (Part 1-4, 100 câu, 45 phút) và Reading (Part 5-7, 100 câu, 75 phút). Tích hợp phát âm thanh chuẩn ETS với cơ chế `audioCuePointsJson` kiểm soát phát đúng khoảng dừng tiêu chuẩn (5s Part 1/2, 8s Part 3/4), đồng bộ dữ liệu thời gian thực theo cơ chế chuỗi tuần tự `clientSequence`, bảo vệ phiên làm bài chống mở nhiều tab qua `BroadcastChannel` và Redis lock, cùng Service Worker pre-cache âm thanh chống đứt gãy mạng. Hoàn toàn miễn phí, truy cập toàn bộ kho đề thi ETS không giới hạn.

### 2. Điểm vào
- Từ S-10 chọn "Thi thử CBT".
- Từ S-15 chọn "Thi thử trọn vẹn 200 câu".
- Từ S-30 chọn định dạng Full Test cho bài tốt nghiệp chặng.

### 3. Bố cục màn hình
- **Khung Điều hướng kỳ thi trên cùng (Exam Navigation Bar)**:
  - Mã đề thi & Tên phần thi (Ví dụ: "TP-FORM-03 (Định dạng chuẩn ETS) — Listening Section").
  - **Huy hiệu Lưu Nháp Liên Tục (Autosave Indicator Badge)**: Biểu tượng đám mây xanh nhấp nháy êm dịu hiển thị: *"Đã lưu an toàn (Vừa xong)"*, kèm thông báo thời gian thi của thí sinh được bảo lưu tuyệt đối nếu xảy ra ngắt kết nối mạng.
  - Đồng hồ đếm ngược tổng thời gian (Countdown Timer): Hiển thị dạng `MM:SS` (font Monospace), tích hợp `aria-live="polite"`, chuyển sang màu đỏ cảnh báo khi còn dưới 5 phút.
  - **Công tắc Zen Exam Mode**: Tùy chọn ẩn 100% avatar Thần Thức và các hiệu ứng thị giác thừa, bảo đảm 0% phân tâm cho thí sinh nhạy cảm/ADHD.
  - Nút "Hướng dẫn làm bài (Directions)" mở modal tóm tắt quy chế.
  - Nút "Tạm dừng" (chỉ khả dụng trong chế độ tự luyện, bị khóa trong chế độ thi thật).
  - Nút "Nộp bài (Submit Exam)".
- **Vùng Hiển thị Đề bài & Tương tác (Exam Workspace)**:
  - *Với Listening (S-12)*:
    - Audio waveform trực quan thể hiện âm thanh đang phát. Không có thanh tua/seek bar (đảm bảo tính nghiêm ngặt của ETS: chỉ nghe 1 lần duy nhất).
    - Part 1: Ảnh chụp chất lượng cao, 4 nút tròn đáp án A, B, C, D (không in chữ lời thoại).
    - Part 2: Không in câu hỏi và lựa chọn; chỉ hiển thị 3 nút tròn A, B, C (bảo mật đề thi chuẩn ETS).
    - Part 3 & 4: In sẵn cụm 3 câu hỏi và hình ảnh/biểu đồ đi kèm nếu có.
  - *Với Reading (S-13)*:
    - Chia 2 cột (Split-pane layout) có thanh trượt co giãn tỷ lệ (Draggable divider).
    - **Thanh Công Cụ Đọc Chống Mỏi Mắt (Reading Ergonomics Bar)**:
      - Nút chuyển đổi **"Chế độ Giấy (Paper Mode)"**: Chuyển khung bài đọc sang nền ngà `#F8F6F0` và chữ mực đen `#1E293B` tương phản cao 12.8:1, giúp thí sinh đọc liên tục 75 phút mà không mỏi mắt.
      - Bộ chỉnh cỡ chữ **[A- / A+]**: Cho phép phóng to/thu nhỏ văn bản bài đọc ($14\text{ px} \to 20\text{ px}$, mặc định $16\text{ px}$), line-height $1.65$.
    - Cột trái: Văn bản bài đọc chất lượng cao, công cụ đánh dấu highlight màu vàng cho từ khóa.
    - Cột phải: Danh sách các câu hỏi liên kết, tự động cuộn đến câu hỏi tương ứng (`clozeIndex` Part 6).
- **Khung Danh sách câu hỏi dưới chân màn hình (Question Palette Footer)**:
  - Thanh cuộn lưới 100 nút số câu hỏi:
    - Màu xám: Chưa làm.
    - Màu xanh dương: Đã chọn đáp án.
    - Biểu tượng cờ vàng 🚩: Đã gắn cờ xem lại (Flag for review).
  - Nút "Câu trước (Back)" và "Câu tiếp (Next)".

### 4. Thành phần UI
- `CbtTimerDisplay`: Đồng hồ đếm ngược chính xác micro-second, đồng bộ định kỳ với server heartbeat.
- `AudioStreamingEngine`: Module phát âm thanh qua Web Audio API, giám sát sự kiện buffer, ngắt tiếng và kết thúc qua `audioCuePointsJson`.
- `EtsQuestionPalette`: Lưới 100 câu hỏi cho phép nhảy nhanh đến câu bất kỳ (chỉ trong Reading; trong Listening bị khóa theo tiến độ băng).
- `FlagToggleCheckbox`: Nút cắm cờ câu hỏi khó để quay lại kiểm tra sau.
- `SplitViewDivider`: Thanh kéo chia đôi không gian văn bản và câu hỏi cho Part 6 & 7.

### 5. Chức năng
- **Nghe âm thanh chuẩn ETS**: Tự động phát âm thanh theo đúng nhịp thi thực tế, không cho phép tua lại hay tạm dừng trong chế độ thi chuẩn.
- **Tự động lưu tiến độ (Autosave with clientSequence)**: Mỗi thao tác chọn đáp án hoặc gắn cờ được lưu ngay vào bộ nhớ đệm Dexie của trình duyệt và gửi lên server kèm số thứ tự tăng dần `clientSequence`. Server áp dụng cơ chế xử lý tuần tự chống ghi đè phiên cũ (Stale write protection).
- **Bảo vệ đa tab (BroadcastChannel Multi-tab Protection)**: Sử dụng `BroadcastChannel('toeic_exam_channel')` để phát hiện nếu học viên mở đề thi ở tab thứ 2; lập tức khóa tab mới và cảnh báo để tránh gian lận và xung đột phiên.

### 6. Trường nhập & Kiểm tra
- Chọn đáp án: Lựa chọn A, B, C (Part 2) hoặc A, B, C, D (các Part khác).
- Cờ xem lại: Giá trị boolean `isFlagged: true/false`.
- Ghi chú thời gian: `timeSpentMs` tính từ lúc câu hỏi xuất hiện đến khi chọn đáp án.

### 7. Business logic
- **Quản lý thời gian thi nghiêm ngặt**:
  - Hết giờ Listening (45 phút): Tự động khóa phần Nghe và tự động chuyển sang phần Đọc (Reading 75 phút). Không cho phép quay lại sửa đáp án phần Nghe (đúng chuẩn ETS).
  - Hết giờ Reading (75 phút): Hệ thống tự động thu bài và gửi request nộp bài lên server kể cả khi người dùng không kịp bấm Nộp.
- **Xử lý sập trình duyệt sát giờ (BullMQ Grace Period Job)**:
  - Khi tạo phiên thi, server tạo 1 BullMQ delayed job hẹn giờ sau 120 phút + 5 phút gia hạn dự phòng. Nếu học viên gặp sự cố sập nguồn hoặc tắt máy sát nút, server vẫn tự động chấm điểm bài thi dựa trên các câu trả lời đã autosave thành công.
- **Tính điểm chuẩn hóa ETS Equating**:
  - Điểm không tính theo tỷ lệ phần trăm tuyến tính mà ánh xạ qua Bảng quy đổi chuẩn hóa ETS (ETS Equating Scaled Score Table) từ số câu đúng sang thang điểm 5 - 495 cho mỗi kỹ năng.

### 8. API sử dụng
- `POST /api/v1/exams/sessions`: Khởi tạo phiên thi mới hoặc khôi phục phiên đang dang dở.
- `PUT /api/v1/exams/sessions/{id}/answers`: Lưu đáp án từng câu (Autosave theo chuỗi `clientSequence`).
- `POST /api/v1/exams/sessions/{id}/heartbeats`: Báo hiệu phiên sống và cập nhật đồng bộ đồng hồ đếm ngược.
- `POST /api/v1/exams/sessions/{id}/submissions`: Nộp bài thi hoàn tất để tính điểm.

### 9. Thông báo
- `CBT_TIME_WARNING_5MIN`: "Thời gian làm bài chỉ còn 5 phút! Vui lòng kiểm tra lại các câu đã gắn cờ."
- `CBT_MULTI_TAB_DETECTED`: "Phát hiện bài thi đang mở ở một cửa sổ khác. Cửa sổ này đã bị tạm khóa để đảm bảo tính minh bạch."
- `CBT_AUDIO_ERROR`: "Không thể tải tệp âm thanh. Hệ thống đang chuyển sang nguồn dự phòng..."
- `CBT_SUBMIT_CONFIRM`: "Bạn còn {unansweredCount} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài thi?"

### 10. Điều hướng ra
- Bấm nộp bài và xác nhận → S-16 (Exam Result).
- Hết giờ tự động nộp bài → S-16 (Exam Result).

### 11. Trạng thái & Edge cases
- **EC-CBT-01 (Mất âm thanh streaming)**: Service Worker kích hoạt bộ đệm âm thanh offline đã tải trước đó từ Cache Storage (`caches.open('toeic-audio-v1')`).
- **EC-CBT-02 (Bấm nút Back của trình duyệt)**: Bắt sự kiện `window.onpopstate` hiển thị cảnh báo: "Rời khỏi màn hình này sẽ làm gián đoạn bài thi! Bạn có chắc muốn thoát?".
- **EC-CBT-03 (Mất mạng lúc bấm nộp bài)**: Client lưu toàn bộ payload nộp bài vào bảng `Dexie.pendingSubmissions` và chạy cơ chế Exponential Backoff gửi lại mỗi 5s, 10s, 30s. Màn hình hiển thị modal "Đang lưu bài thi, vui lòng không tắt trình duyệt...".

### 12. Bảng CSDL liên quan
- `Exam`, `StimulusGroup`, `Question`, `Option`, `Attempt`, `AttemptDetail`.

### 13. Chi tiết API
```
POST /exam/sessions
Headers: { Authorization: "Bearer <token>" }
Request:
{
  "examId": "exam-ets-2024-03",
  "mode": "FULL_SIMULATION",
  "deviceId": "dev-mac-chrome-991"
}
Response 201 Created:
{
  "success": true,
  "data": {
    "sessionId": "ses-998811",
    "examId": "exam-ets-2024-03",
    "title": "ETS TOEIC 2024 Test 03",
    "currentSection": "LISTENING",
    "remainingTimeSeconds": 7200,
    "currentSequence": 0,
    "audioManifest": {
      "baseUrl": "https://cdn.toeicpro.com/audio/ets2024-03/",
      "part1Audio": "part1_master.mp3",
      "cuePointsPart1": [ { "qIndex": 1, "startMs": 12000, "endMs": 35000 } ]
    },
    "existingAnswers": []
  }
}
```

```
PUT /api/v1/exams/sessions/{id}/answers
Headers: { Authorization: "Bearer <token>" }
Request:
{
  "questionId": "q-055",
  "selectedOption": "C",
  "isFlagged": false,
  "clientSequence": 14,
  "timeSpentMs": 28400
}
Response 200 OK:
{
  "success": true,
  "data": {
    "questionId": "q-055",
    "recordedSequence": 14,
    "serverTimestamp": "2026-09-16T08:14:22.100Z"
  }
}
Error 409 Conflict:
{
  "success": false,
  "code": "STALE_SEQUENCE_CONFLICT",
  "message": "Phiên làm bài đã được ghi nhận thao tác mới hơn từ thiết bị khác."
}
```

```
POST /api/v1/exams/sessions/{id}/heartbeats
Headers: { Authorization: "Bearer <token>" }
Request: { "remainingSeconds": 6840, "lastSequence": 14 }
Response 200 OK:
{
  "success": true,
  "data": {
    "serverRemainingSeconds": 6838,
    "status": "IN_PROGRESS"
  }
}
```

```
POST /api/v1/exams/sessions/{id}/submissions
Headers: { Authorization: "Bearer <token>" }
Request: { "forceSubmit": false }
Response 200 OK:
{
  "success": true,
  "data": {
    "attemptId": "att-2026-8812",
    "examId": "exam-ets-2024-03",
    "submittedAt": "2026-09-16T09:45:00Z",
    "status": "COMPLETED",
    "redirectUrl": "/exam/results/att-2026-8812"
  }
}
```

---

# 3. Đặc tả Màn hình — Luyện tập Chuyên sâu, Sổ tay Lỗi sai & Tiện ích Học viên

---

## S-14 · Luyện tập Vi mô theo Kỹ năng (Micro-drill Session)

### 1. Mô tả
Giao diện rèn luyện tập trung cao độ vào từng tiểu kỹ năng vi mô cụ thể (Micro-skill), ví dụ: "Bẫy câu hỏi Who/Where trong Part 2", "Từ vựng đồng nghĩa trong Part 7", "Đảo ngữ câu điều kiện Part 5". Mỗi bài drill gồm 5 đến 10 câu hỏi ngắn gọn, hỗ trợ chế độ Tập trung (Focus Mode) ẩn toàn bộ linh thú và hình ảnh chuyển động để người học tối đa hóa sự chú ý. Tích hợp tính toán chất lượng ghi nhớ tự động ($q \in [1, 5]$) cho thuật toán lặp lại ngắt quãng SM-2. 100% miễn phí cho tất cả học viên.

### 2. Điểm vào
- Từ S-10 (Dashboard): Nhấp vào đề xuất kỹ năng yếu nhất hôm nay.
- Từ S-19 (Analytics): Nhấp vào một ô đỏ trên Bản đồ nhiệt kỹ năng (Skill Heatmap).
- Từ S-11 (Daily Plan): Chọn nhiệm vụ Micro-drill của ngày.

### 3. Bố cục màn hình
- **Top Header tối giản**:
  - Tên kỹ năng đang rèn: "Micro-skill: [Skill Name]".
  - Thanh tiến độ vạch mảnh (Micro progress line).
  - Nút chuyển chế độ Tập trung (Focus Mode Toggle 🎯).
  - Đồng hồ đếm giờ mỗi câu (Pace clock: 30s/câu).
- **Vùng Luyện tập Trung tâm (Drill Center Canvas)**:
  - Nếu là bài Nghe: Nút phát âm thanh mini (chỉ phát 1 lần hoặc lặp lại tùy cấu hình luyện).
  - Khung câu hỏi nổi bật với phông chữ lớn, tương phản cao.
  - 4 lựa chọn đáp án tương tác (chạm để chọn, chuyển màu xanh/đỏ tức thì kèm âm thanh ngắn).
  - Hộp kiểm: "Tôi đoán mò câu này" (Guessed checkbox) giúp thuật toán thích ứng định hình độ tự tin của học viên.
- **Bảng Phân tích Tức thì (Instant Solution Card)**:
  - Xuất hiện ngay sau khi chọn đáp án:
    - Nhãn đúng/sai.
    - Công thức ngữ pháp / Từ khóa then chốt (Clue Words Highl\r\right).
    - Cảnh báo bẫy ETS (Trap Warning).
  - Nút "Tiếp tục" hoặc nhấn phím cách (Spacebar) để chuyển câu.

### 4. Thành phần UI
- `MicroDrillHeader`: Tên kỹ năng, nút Focus Mode, tiến độ câu.
- `HighContrastQuestionBox`: Khung hiển thị câu hỏi chữ to rõ ràng.
- `ConfidenceCheckbox`: Hộp kiểm "Tôi đoán mò".
- `InstantExplanationDrawer`: Ngăn giải thích chi tiết có dịch nghĩa và chỉ rõ dấu hiệu nhận biết đáp án.
- `FocusModeOverlay`: Lớp làm mờ các chi tiết thừa xung quanh khi bật Focus Mode.

### 5. Chức năng
- Luyện câu hỏi theo vi kỹ năng mục tiêu.
- Thu thập dữ liệu vi mô (Micro-telemetry): Đo lường chính xác mili-giây thời gian phản hồi ($timeSpentMs$) và hành vi đoán mò ($isGuessed$).
- Tự động nạp dữ liệu vào công cụ SM-2 cho các câu trả lời chưa thuần thục.

### 6. Trường nhập & Kiểm tra
- Đáp án lựa chọn: `["A", "B", "C", "D"]`.
- `isGuessed`: Boolean (mặc định `false`).
- `timeSpentMs`: Số nguyên dương $\ge 500$ ms.

### 7. Business logic
- **Thuật toán tự động tính hệ số chất lượng $q$ (Automated SM-2 Quality Calculation)**:
  - $R_{time} = timeSpentMs / (t_{standard} \times 1000)$.
  - Trạng thái 1: Đúng, $R_{time} \le 1.0$, không đoán mò $
\rightarrow q = 5$ (Hoàn hảo).
  - Trạng thái 2: Đúng, $R_{time} > 1.0$, không đoán mò $
\rightarrow q = 4$ (Đúng nhưng do dự).
  - Trạng thái 3: Đúng, nhưng $isGuessed == true 
\rightarrow q = 3$ (May mắn đúng, cần ôn lại sớm).
  - Trạng thái 4: Sai, $R_{time} > 1.0 
\rightarrow q = 2$ (Đã suy nghĩ nhưng trả lời sai).
  - Trạng thái 5: Sai, $R_{time} \le 1.0 
\rightarrow q = 1$ (Sai hoàn toàn hoặc chưa nắm kiến thức).
- Không giới hạn số lượng bài drill mỗi ngày (bỏ hoàn toàn giới hạn 15 phút của bản cũ, 100% miễn phí).

### 8. API sử dụng
- `GET /api/v1/skills/{skillId}/drills`: Lấy 5-10 câu hỏi theo taxonomy kỹ năng.
- `POST /api/v1/skills/{skillId}/drills/answers`: Gửi câu trả lời, nhận phân tích và cập nhật độ thành thạo.

### 9. Thông báo
- `DRILL_FOCUS_ON`: "Đã kích hoạt Chế độ Tập trung. Toàn bộ hình ảnh động đã được ẩn."
- `DRILL_MASTERY_UP`: "Độ thuần thục kỹ năng {skillName} đã tăng lên {percent}%!"

### 10. Điều hướng ra
- Hoàn thành bài drill → Popup tổng kết điểm, nút "Luyện tiếp bài khác" hoặc "Về Trang chủ".

### 11. Trạng thái & Edge cases
- **EC-DRILL-01: Ngân hàng câu hỏi của kỹ năng bị thiếu (Sparse Question Bank)**: Tự động fallback lấy các câu hỏi thuộc kỹ năng cha (Parent Skill Taxonomy) thay vì báo lỗi trống đề.

### 12. Bảng CSDL liên quan
- `SkillTaxonomy`, `QuestionSkillAssignment`, `Question`, `AttemptDetail`, `MistakeNotebook`.

### 13. Chi tiết API
```
GET /drills/RC_TENSE_PERFECT
Headers: { Authorization: "Bearer <token>" }
Response 200 OK:
{
  "success": true,
  "data": {
    "skillId": "RC_TENSE_PERFECT",
    "skillName": "Thì Hiện tại hoàn thành & Quá khứ hoàn thành",
    "part": 5,
    "questions": [
      {
        "id": "q-drill-101",
        "questionText": "Ms. Tanaka _______ as the chief financial officer since the company was founded in 2015.",
        "options": [
          { "label": "A", "text": "serves" },
          { "label": "B", "text": "has served" },
          { "label": "C", "text": "served" },
          { "label": "D", "text": "is serving" }
        ],
        "standardPaceSeconds": 30
      }
    ]
  }
}
```

```
POST /drills/RC_TENSE_PERFECT/answer
Headers: { Authorization: "Bearer <token>" }
Request:
{
  "questionId": "q-drill-101",
  "selectedOption": "B",
  "isGuessed": false,
  "timeSpentMs": 11200
}
Response 200 OK:
{
  "success": true,
  "data": {
    "isCorrect": true,
    "correctOption": "B",
    "autoSm2Quality": 5,
    "explanation": "Dấu hiệu 'since + mốc thời gian trong quá khứ' là công thức đặc trưng của thì Hiện tại hoàn thành (has/have + V3/ed). Chọn 'has served'.",
    "clueWords": ["since the company was founded"],
    "newSkillMastery": 0.82
  }
}
```

---

## S-15 · Luyện tập Tự do theo Part (Practice by Part)

### 1. Mô tả
Trung tâm luyện tập tự do theo từng phần thi riêng biệt của TOEIC (Part 1 đến Part 7). Học viên có thể tự do lựa chọn làm theo từng Part, chọn mức độ khó (Cơ bản 350-500, Trung cấp 500-750, Nâng cao 750-990), chọn số lượng câu muốn làm (10, 20, 30 câu). **Đặc biệt: Toàn bộ 7 Parts và 100% ngân hàng câu hỏi đều mở khóa hoàn toàn miễn phí cho tất cả học viên**, không có bất kỳ biểu tượng khóa hay yêu cầu nâng cấp gói trả phí nào.

### 2. Điểm vào
- Từ S-10 (Dashboard): Nhấp lối tắt "Luyện theo Part".
- Từ thanh điều hướng chính (Bottom Bar / Sidebar).

### 3. Bố cục màn hình
- **Header**: "Luyện tập theo Part — Tự do chọn phần thi và độ khó mong muốn".
- **Lưới 7 Thẻ Phần thi (7 Part Grid Cards)**:
  - Part 1: Mô tả hình ảnh (Photographs) — 6 câu/đề chuẩn.
  - Part 2: Hỏi & Đáp (Question-Response) — 25 câu/đề chuẩn.
  - Part 3: Đoạn hội thoại (Short Conversations) — 39 câu/đề chuẩn.
  - Part 4: Bài nói ngắn (Short Talks) — 30 câu/đề chuẩn.
  - Part 5: Hoàn thành câu (Incomplete Sentences) — 30 câu/đề chuẩn.
  - Part 6: Hoàn thành đoạn văn (Text Completion) — 16 câu/đề chuẩn.
  - Part 7: Đọc hiểu văn bản (Reading Comprehension) — 54 câu/đề chuẩn.
  - Mỗi thẻ hiển thị: Tỷ lệ chính xác trung bình của học viên trên Part đó (Accuracy %), Tổng số câu đã luyện, và Huy hiệu cấp độ.
- **Bộ lọc tùy chỉnh (Practice Customizer Drawer)**: Khi nhấp vào 1 Part, bảng trượt mở ra cho phép chọn:
  - Độ khó: Cơ bản (Easy), Chuẩn ETS (Medium), Khó phân loại điểm 800+ (Hard).
  - Số lượng câu: 10 câu (Luyện nhanh 10 phút), 20 câu, hoặc Toàn bộ số câu của Part.
  - Chế độ phản hồi: "Xem giải thích ngay sau mỗi câu" (Chế độ học) HOẶC "Chấm điểm sau khi nộp toàn bộ" (Chế độ thi thử).
  - Nút CTA lớn: "Bắt đầu làm bài".

### 4. Thành phần UI
- `PartCard`: Thẻ phần thi tương tác, có icon đại diện, chỉ số phong độ và thanh màu tiến độ.
- `DifficultySelectorPills`: Nút chọn độ khó (Dễ / Vừa / Khó).
- `QuestionCountSlider`: Thanh trượt hoặc nút chọn số câu hỏi.
- `ModeToggleSwitch`: Công tắc chuyển đổi giữa Chế độ Học (Instant Feedback) và Chế độ Thi (Exam Mode).

### 5. Chức năng
- Tùy biến bộ đề luyện tập linh hoạt theo quỹ thời gian của học viên.
- Khởi chạy phiên làm bài với ngân hàng đề phong phú được chuẩn hóa theo tiêu chuẩn ETS.
- Lưu lại lịch sử làm bài vào bảng `Attempt` để phục vụ phân tích năng lực.

### 6. Trường nhập & Kiểm tra
- `partNumber`: Số nguyên từ 1 đến 7.
- `difficulty`: Enum `["EASY", "MEDIUM", "HARD"]`.
- `questionCount`: Số nguyên $\in [5, 100]$.
- `feedbackMode`: Enum `["INSTANT", "EXAM"]`.

### 7. Business logic
- **100% Free Access**: Không giới hạn số lần tạo đề, không giới hạn Part 3, 4, 7 (bản v9.0 cũ có khóa trả phí, bản v10.0 xóa bỏ 100% paywall).
- **Phân bổ câu hỏi theo thuật toán IRT (Difficulty Matching)**:
  - Nếu chọn EASY: Lấy các câu có $irtDifficulty < -0.5$.
  - Nếu chọn MEDIUM: Lấy các câu có $-0.5 \le irtDifficulty \le 0.5$.
  - Nếu chọn HARD: Lấy các câu có $irtDifficulty > 0.5$.

### 8. API sử dụng
- `GET /api/v1/practice/parts/overview`: Lấy thống kê phong độ của 7 Part.
- `POST /api/v1/practice/sessions`: Tạo phiên luyện tập tùy chỉnh theo cấu hình đã chọn.

### 9. Thông báo
- `PRACTICE_SESSION_READY`: "Đã khởi tạo bài luyện tập {count} câu thành công."

### 10. Điều hướng ra
- Nhấp "Bắt đầu làm bài":
  - Nếu `feedbackMode == INSTANT` → S-28 (hoặc S-14 format).
  - Nếu `feedbackMode == EXAM` → S-12/S-13 (CBT Simulation format).

### 11. Trạng thái & Edge cases
- Không có câu hỏi nào thỏa mãn bộ lọc độ khó khắt khe: Tự động mở rộng dải độ khó lân cận và hiển thị thông báo "Đã bổ sung câu hỏi phù hợp nhất cho bạn".

### 12. Bảng CSDL liên quan
- `Question`, `Option`, `StimulusGroup`, `Attempt`, `UserStatistics`.

### 13. Chi tiết API
```
GET /practice/parts/overview
Headers: { Authorization: "Bearer <token>" }
Response 200 OK:
{
  "success": true,
  "data": {
    "parts": [
      { "partNumber": 1, "title": "Mô tả hình ảnh", "totalPracticed": 120, "accuracy": 0.85, "masteryLevel": "EXCELLENT" },
      { "partNumber": 2, "title": "Hỏi & Đáp", "totalPracticed": 250, "accuracy": 0.68, "masteryLevel": "GOOD" },
      { "partNumber": 5, "title": "Hoàn thành câu", "totalPracticed": 480, "accuracy": 0.72, "masteryLevel": "GOOD" },
      { "partNumber": 7, "title": "Đọc hiểu", "totalPracticed": 150, "accuracy": 0.54, "masteryLevel": "NEEDS_IMPROVEMENT" }
    ]
  }
}
```

```
POST /practice/generate
Headers: { Authorization: "Bearer <token>" }
Request:
{
  "partNumber": 5,
  "difficulty": "MEDIUM",
  "questionCount": 20,
  "feedbackMode": "INSTANT"
}
Response 201 Created:
{
  "success": true,
  "data": {
    "sessionId": "ses-prac-5541",
    "partNumber": 5,
    "totalQuestions": 20,
    "feedbackMode": "INSTANT",
    "firstQuestionId": "q-8819"
  }
}
```

---

## S-16 · Báo cáo & Phân tích Kết quả Thi (Exam Result & ETS Score Report)

### 1. Mô tả
Màn hình báo cáo kết quả toàn diện sau khi hoàn thành một bài thi thử Full Test (200 câu) hoặc bài thi Mini Test. Hiển thị điểm thi chuẩn hóa ETS Equating (thang điểm 10 - 990), điểm thành phần Nghe (5 - 495) và Đọc (5 - 495), vị trí bách phân vị (Percentile rank), bảng phân tích chi tiết độ chính xác theo từng Part và nhóm kỹ năng, thời gian làm bài trung bình so với chuẩn. Cung cấp lối tắt xem lại từng câu giải thích chi tiết (S-17) và nạp toàn bộ câu sai vào Sổ tay thông minh (S-18).

### 2. Điểm vào
- Tự động chuyển hướng sau khi nộp bài thi thành công từ S-12/S-13.
- Xem lại lịch sử thi từ Hồ sơ cá nhân (S-22).

### 3. Bố cục màn hình
- **Khung Điểm tổng quan (Score Hero Banner)**:
  - Vòng tròn điểm tổng thể lớn: `[Total Score]` / 990 (Ví dụ: 785/990).
  - Điểm thành phần: Nghe `[LC Score]` / 495 | Đọc `[RC Score]` / 495.
  - Vị trí xếp hạng: "Top [x]% thí sinh toàn hệ thống".
  - So sánh với Mục tiêu: "Đã đạt [percent]% mục tiêu TOEIC [Target Score]!".
- **Thẻ Phân tích Năng lực từng Part (Part Breakdown Cards)**:
  - 7 thanh tiến độ cho Part 1 → Part 7 (Số câu đúng/tổng số câu, tỷ lệ %).
  - Tô màu trực quan: Xanh lục ($\ge 80\%$), Vàng ($60\% - 79\%$), Đỏ ($< 60\%$).
- **Phân tích Bẫy & Lỗi sai thường gặp (ETS Trap Analysis Summary)**:
  - Tổng số câu sai: `[n]` câu.
  - Phân loại lỗi sai: Sai do từ vựng (40%), Sai do bẫy thì/ngữ pháp (35%), Sai do phân bổ thời gian/hết giờ (25%).
- **Cụm Nút Hành động dưới cùng (Bottom Actions)**:
  - Nút chính: "Xem lại bài làm & Lời giải chi tiết 🔍" (Chuyển sang S-17).
  - Nút: "Lưu tất cả câu sai vào Sổ tay ôn tập 📝" (Tự động nạp vào S-18).
  - Nút: "Về Trang chủ 🏠".

### 4. Thành phần UI
- `ScoreGauge`: Vòng cung đo điểm số với hiệu ứng kim quay và số nhảy mượt mà.
- `PartPerformanceTable`: Bảng đối chiếu số câu đúng, câu sai, câu bỏ trống và thời gian trung bình mỗi Part.
- `StrengthWeaknessList`: Thẻ vinh danh kỹ năng làm tốt nhất và kỹ năng cần cải thiện khẩn cấp.
- `BulkAddToNotebookButton`: Nút đồng bộ nhanh tất cả câu sai vào giải thuật SM-2.

### 5. Chức năng
- Quy đổi số câu đúng thô (Raw Score) sang Điểm chuẩn hóa (Scaled Score) theo Bảng quy đổi ETS Equating chính thức của đề thi tương ứng.
- Phân tích điểm mạnh, điểm yếu dựa trên taxonomy vi kỹ năng.
- Đồng bộ toàn bộ câu sai vào Sổ tay lỗi sai chỉ bằng một chạm.

### 6. Trường nhập & Kiểm tra
- Read-only màn hình tổng kết.
- Nút "Lưu câu sai vào sổ tay": Nếu đã lưu trước đó, disable nút và hiển thị "Đã đồng bộ".

### 7. Business logic
- **Bảng quy đổi điểm ETS Equating Table**: Điểm số được lấy trực tiếp từ bảng ánh xạ cấu hình trong CSDL theo mã đề thi (không dùng công thức nhân chia tuyến tính thô).
- Cập nhật điểm dự báo (`predictedScore`) trên hồ sơ học viên theo thuật toán trọng số lũy tiến (Exponential Moving Average).

### 8. API sử dụng
- `GET /api/v1/exams/attempts/{attemptId}/results`: Lấy toàn bộ báo cáo kết quả bài thi.
- `POST /api/v1/exams/attempts/{attemptId}/mistake-synchronizations`: Đồng bộ tất cả câu sai của bài thi vào Sổ tay thông minh.

### 9. Thông báo
- `SYNC_MISTAKES_SUCCESS`: "Đã thêm {count} câu sai vào Sổ tay thông minh để ôn tập theo giải thuật SM-2!"

### 10. Điều hướng ra
- Nhấp "Xem lời giải chi tiết" → S-17 (Review Solution).
- Nhấp "Về trang chủ" → S-10 (Dashboard).

### 11. Trạng thái & Edge cases
- Bài thi bị nộp do hết giờ (Force submitted): Hiển thị nhãn cảnh báo "Bài thi tự động thu khi hết giờ. Hãy chú ý rèn luyện thêm về tốc độ làm bài."

### 12. Bảng CSDL liên quan
- `Attempt`, `AttemptDetail`, `Exam`, `MistakeNotebook`, `User`.

### 13. Chi tiết API
```
GET /exam/attempts/:attemptId/result
Headers: { Authorization: "Bearer <token>" }
Response 200 OK:
{
  "success": true,
  "data": {
    "attemptId": "att-2026-8812",
    "examTitle": "ETS TOEIC 2024 Test 03",
    "totalScore": 785,
    "listeningScore": 415,
    "readingScore": 370,
    "rawListeningCorrect": 84,
    "rawReadingCorrect": 76,
    "percentileRank": 82.4,
    "totalDurationMinutes": 118,
    "partsBreakdown": [
      { "part": 1, "correct": 6, "total": 6, "percentage": 1.0 },
      { "part": 2, "correct": 21, "total": 25, "percentage": 0.84 },
      { "part": 3, "correct": 32, "total": 39, "percentage": 0.82 },
      { "part": 4, "correct": 25, "total": 30, "percentage": 0.83 },
      { "part": 5, "correct": 24, "total": 30, "percentage": 0.80 },
      { "part": 6, "correct": 11, "total": 16, "percentage": 0.68 },
      { "part": 7, "correct": 41, "total": 54, "percentage": 0.75 }
    ],
    "weakestSkills": [
      { "skillId": "RC_PART6_INSERTION", "name": "Điền câu vào đoạn văn Part 6", "accuracy": 0.40 },
      { "skillId": "RC_PART7_TRIPLE", "name": "Đọc hiểu đoạn ba Part 7", "accuracy": 0.58 }
    ]
  }
}
```

---

## S-17 · Xem lại Bài thi & Lời giải Chi tiết (Review & Explanations)

### 1. Mô tả
Giao diện soi chiếu chi tiết từng câu hỏi trong bài thi đã làm. Cung cấp bản dịch song ngữ Việt - Anh, lời thoại bài nghe (Audio Transcript) kèm timestamp đồng bộ, đánh dấu trực quan từ khóa quyết định đáp án (Clue Words Highl\right), giải thích cặn kẽ công thức ngữ pháp, và phân tích các bẫy đề thi kinh điển mà ETS thường cài cắm. Hỗ trợ lọc danh sách theo: "Tất cả câu", "Chỉ câu làm sai", "Chỉ câu đã gắn cờ", "Câu đoán mò".

### 2. Điểm vào
- Từ S-16 (Exam Result): Nhấp "Xem lại bài làm & Lời giải chi tiết".
- Từ S-29 (Node Result): Nhấp "Xem lại bài làm".
- Từ S-22 (Profile): Chọn một bài thi trong lịch sử.

### 3. Bố cục màn hình
- **Thanh Công cụ lọc câu hỏi trên cùng (Filter Header)**:
  - Cụm nút bấm lọc nhanh: Tất cả (200) | Câu sai (40) ❌ | Câu cắm cờ (12) 🚩 | Câu đoán mò (8) ❓.
  - Bộ lọc chọn nhanh theo Part: Part 1 đến Part 7.
- **Vùng Hiển thị Lời giải Chi tiết (Explanation Canvas)**:
  - Với phần Nghe:
    - Audio Player có thanh tua đến đúng vị trí phát của câu hỏi đó.
    - Full Audio Transcript với bản dịch tiếng Việt đối chiếu câu đối câu.
    - Đánh dấu từ khóa quyết định đáp án (ví dụ in đậm màu vàng cụm từ khóa).
  - Với phần Đọc:
    - Bài đọc gốc có highlight đoạn văn chứa thông tin trả lời.
    - Đáp án học viên chọn hiển thị rõ: `❌ [Chưa đúng]` (kèm màu đỏ + icon) vs Đáp án chính xác: `✅ [Chính xác]` (kèm màu xanh + icon), bảo đảm người mù màu không nhầm lẫn.
  - **Khung Lời Giải Chuẩn Hóa 3 Phần (Pedagogical 3-Part Framework)**:
    1. *Phần 1 — Vì sao đúng*: Dẫn chứng trực tiếp từ bài đọc/bài nghe, phân tích ngữ nghĩa và từ vựng cốt lõi.
    2. *Phần 2 — Mổ xẻ bẫy phương án nhiễu*: Chỉ rõ lý do từng đáp án sai (ví dụ: bẫy phát âm tương đồng, bẫy thông tin ngoại suy, bẫy thì quá khứ vs hiện tại hoàn thành).
    3. *Phần 3 — Chiến thuật & Điểm ngữ pháp cốt lõi*: Công thức ngữ pháp tóm tắt, collocations quan trọng và mẹo xử lý nhanh khi gặp dạng câu tương tự.
  - **Khung Tự Động Sinh Thẻ Ôn Tập SM-2 (Automated Spaced Repetition Integration)**:
    - Mọi câu hỏi làm sai được hệ thống **tự động kết nạp vào hàng đợi ôn tập SM-2** với nhãn *"Sinh từ bài thi ngày DD/MM"*, kèm trạng thái ghi nhớ `interval: 1 ngày`. Học viên có thể bấm *"Đã thành thạo (Bỏ qua ôn tập)"* nếu không muốn ôn lại câu này.
- **Thanh chuyển câu hỏi dưới cùng (Bottom Navigation)**:
  - Nút "Câu trước", "Câu tiếp", và danh sách số câu hỏi cuộn ngang.

### 4. Thành phần UI
- `ReviewFilterBar`: Nút phân loại câu sai/cắm cờ/đoán mò.
- `TranscriptInteractivePlayer`: Trình phát âm thanh có tô màu câu thoại tương ứng đang phát (Karaoke-style highlight).
- `ClueHighlightContainer`: Vùng văn bản bài đọc có đánh dấu đoạn trích bằng màu dạ quang.
- `ThreePartExplanationBox`: Khung lời giải sư phạm 3 phần (Căn cứ đúng / Bẫy phương án sai / Chiến thuật cốt lõi).
- `AutoSm2Badge`: Huy hiệu báo hiệu *"Đã tự động đẩy vào Sổ tay SM-2"*.

### 5. Chức năng
- Xem lại toàn bộ câu hỏi, đáp án đã chọn, đáp án đúng và phân tích lý do theo chuẩn sư phạm 3 phần.
- Nghe lại chính xác phân đoạn audio liên quan của câu hỏi (Audio seek point).
- Tự động đồng bộ câu làm sai vào Sổ tay lỗi sai SM-2 để khép kín chu trình học tập.

### 6. Trường nhập & Kiểm tra
- Read-only; hỗ trợ tìm kiếm từ khóa trong transcript bài nghe hoặc bài đọc.

### 7. Business logic
- Giữ nguyên trạng thái câu trả lời ban đầu của học viên, không cho phép sửa đổi điểm số bài thi lịch sử.
- Mỗi câu hỏi làm sai tự động khởi tạo 1 bản ghi `MistakeNotebookItem` với trạng thái `nextReviewAt = now() + 1 ngày`, `repetitionCount = 0`, `easinessFactor = 2.5`.

### 8. API sử dụng
- `GET /api/v1/exams/attempts/{attemptId}/reviews?filter=INCORRECT&part=5`: Lấy danh sách câu hỏi kèm lời giải chi tiết.
- `POST /api/v1/notebook/auto-sync`: Tự động đồng bộ toàn bộ câu làm sai trong attempt vào hàng đợi SM-2.

### 9. Thông báo
- `AUTO_SM2_SYNCED`: "Hệ thống đã tự động thêm các câu sai vào Sổ tay SM-2 để bạn ôn tập ngắt quãng!"

### 10. Điều hướng ra
- Bấm nút Thoát xem lại → Quay lại S-16 hoặc S-22.

### 11. Trạng thái & Edge cases
- Câu hỏi thuộc phần nghe Part 2 không có hình ảnh và không in văn bản lúc thi: Trong màn hình Review, toàn bộ nội dung câu hỏi và 3 lựa chọn sẽ được in chữ đầy đủ kèm bản dịch để học viên hiểu tận gốc rễ lỗi sai.

### 12. Bảng CSDL liên quan
- `AttemptDetail`, `Question`, `Option`, `StimulusGroup`, `MistakeNotebook`.

### 13. Chi tiết API
```
GET /exam/attempts/:attemptId/review?filter=INCORRECT
Headers: { Authorization: "Bearer <token>" }
Response 200 OK:
{
  "success": true,
  "data": {
    "totalFiltered": 40,
    "questions": [
      {
        "questionId": "q-142",
        "partNumber": 2,
        "audioUrl": "https://cdn.toeicpro.com/audio/ets2024-03/p2_q142.mp3",
        "audioTranscript": "Where is the annual shareholders' meeting being held this year?",
        "options": [
          { "label": "A", "transcript": "At the Grand Central Hotel.", "isCorrect": true },
          { "label": "B", "transcript": "Yes, every year in October.", "isCorrect": false },
          { "label": "C", "transcript": "The meeting was very productive.", "isCorrect": false }
        ],
        "userSelectedOption": "B",
        "isCorrect": false,
        "isFlagged": true,
        "isGuessed": false,
        "explanation": "Câu hỏi bắt đầu bằng từ để hỏi 'Where' (Ở đâu), yêu cầu thông tin về địa điểm. Lựa chọn (A) 'Tại khách sạn Grand Central' là câu trả lời trực tiếp chính xác.",
        "trapAnalysis": "Bẫy Yes/No kinh điển trong Part 2: Câu hỏi bắt đầu bằng Wh-question (Where/When/Who/Why) tuyệt đối không được trả lời bằng Yes/No. Lựa chọn (B) bắt đầu bằng 'Yes' nên loại ngay lập tức!",
        "clueWords": ["Where", "being held", "Grand Central Hotel"]
      }
    ]
  }
}
```

---

## S-18 · Sổ tay Lỗi sai & Từ vựng Thông minh (Smart Mistake Notebook with SM-2)

### 1. Mô tả
Trung tâm quản lý tri thức cá nhân hóa, áp dụng giải thuật lặp lại ngắt quãng SM-2 (SuperMemo 2 cải tiến) với cơ chế tự động tính toán chất lượng nhớ ($q \in [1, 5]$). Tự động gom toàn bộ các câu làm sai, các câu có gắn cờ nghi vấn, và từ vựng mới từ tất cả các bài thi và bài drill. Hệ thống tự động tính toán ngày đến hạn ôn tập tiếp theo ($nextReviewDate$) để đảm bảo kiến thức được đưa vào trí nhớ dài hạn mà không bị quá tải. **Hoàn toàn không giới hạn số lượng thẻ (Unlimited storage, xóa bỏ giới hạn 30 thẻ của bản cũ), 100% miễn phí.**

### 2. Điểm vào
- Nhấp tab "Sổ tay" trên thanh điều hướng chính.
- Nhấp "Ôn tập lỗi sai hôm nay" từ S-10 (Dashboard).
- Nhấp xem Sổ tay sau bài thi từ S-16.

### 3. Bố cục màn hình
- **Header Sổ tay**:
  - Tổng số thẻ đã lưu: `[Total Items]` thẻ.
  - Số thẻ Cần ôn tập hôm nay (Due Today): `[n]` thẻ (sáng màu cam kèm nút CTA: "Bắt đầu phiên ôn tập ngay 🧠").
  - Tỷ lệ đã ghi nhớ vĩnh viễn (Mastered %): Ví dụ 68%.
- **Thanh Lọc & Tìm kiếm (Filter & Search Rail)**:
  - Ô tìm kiếm từ khóa, dạng câu.
  - Lọc theo Trạng thái: Cần ôn hôm nay (Due) | Đang học (Learning) | Đã thuần thục (Mastered).
  - Lọc theo Kỹ năng / Part: Part 1 đến Part 7.
- **Danh sách Thẻ Flashcard Lỗi sai thông minh (Notebook Item Cards)**:
  - Mỗi thẻ hiển thị:
    - Nội dung câu hỏi gốc & chỗ trống.
    - Nhãn kỹ năng (Skill Tag, ví dụ: `#Part5 #MenhDeQuanHe`).
    - Lịch sử ôn tập gần nhất (Lần ôn cuối, Lần ôn kế tiếp, Hệ số dễ $EF$, Khoảng cách ngày $Interval$).
    - Nút "Ôn tập ngay", nút "Xóa khỏi sổ tay".
- **Chế độ Ôn tập Tương tác (SM-2 Flashcard Review Mode)**:
  - Khi bấm "Bắt đầu phiên ôn tập": Mở giao diện thẻ lật (Flip card) toàn màn hình:
    - Mặt trước: Câu hỏi, các phương án lựa chọn, nút bấm chọn đáp án.
    - Mặt sau (Lật sau khi chọn): Giải thích chi tiết, công thức nhận diện bẫy.
    - Hệ thống tự động tính điểm $q$ và hiển thị: "Hẹn gặp lại thẻ này sau [I] ngày nữa!"

### 4. Thành phần UI
- `DueItemsHeroBadge`: Thẻ nổi bật số lượng câu hỏi đến hạn giải thuật SM-2 hôm nay.
- `Sm2FlipCard`: Thẻ flashcard 3D lật mượt mà mặt trước/mặt sau.
- `IntervalProgressBar`: Thanh hiển thị chu kỳ ngắt quãng (Ngày 1 → 6 → 15 → 35 ngày).
- `NotebookFilterTags`: Cụm tag phân loại theo chủ điểm ngữ pháp và từ vựng.

### 5. Chức năng
- Duyệt, tìm kiếm và quản lý toàn bộ kho câu hỏi sai của cá nhân.
- Thực hiện phiên ôn tập thông minh hàng ngày theo thuật toán lặp lại ngắt quãng.
- Tự động ghi nhận lịch sử vào bảng `ReviewHistory` và cập nhật $EF$ (Easiness Factor) cùng $Interval$.

### 6. Trường nhập & Kiểm tra
- Trong phiên ôn tập: Chọn đáp án trắc nghiệm A/B/C/D.
- Tự động đo thời gian phản hồi ($timeSpentMs$) để máy tính $q$.
- Xóa thẻ: Yêu cầu xác nhận "Bạn có chắc muốn xóa câu hỏi này khỏi Sổ tay?".

### 7. Business logic
- **Công thức giải thuật SM-2 tự động hoàn toàn (Automated SM-2 Formula)**:
  - Chất lượng phản hồi $q \in [1, 5]$ được máy tính tự động theo bảng 6 trạng thái dựa vào tính đúng/sai, thời gian phản hồi so với chuẩn ETS ($R_{time}$), và cờ đoán mò ($isGuessed$).
  - Cập nhật hệ số dễ mới:
    $$EF' = \max\left(1.3, EF + (0.1 - (5 - q) \times (0.08 + (5 - q) \times 0.02))
\r\r\right)$$
  - Cập nhật khoảng cách ngày ôn tập tiếp theo ($Interval$ tính bằng ngày):
    - Nếu $q < 3$: Trả lời thất bại, đặt lại vòng lặp:
      $$Repetition = 0, \quad Interval = 1 \text{ ngày}$$
    - Nếu $q \ge 3$: Trả lời đạt yêu cầu:
      - Khi $Repetition == 0 
\rightarrow Interval = 1 \text{ ngày}$.
      - Khi $Repetition == 1 
\rightarrow Interval = 6 \text{ ngày}$.
      - Khi $Repetition \ge 2 
\rightarrow Interval = \text{round}(Interval_{cũ} \times EF')$.
      - Tăng $Repetition = Repetition + 1$.
  - Tính ngày đến hạn tiếp theo: $nextReviewDate = currentDate + Interval \text{ ngày}$.

### 8. API sử dụng
- `GET /api/v1/notebook/due`: Lấy danh sách các thẻ lỗi sai đến hạn ôn tập hôm nay.
- `GET /api/v1/notebook/items`: Lấy toàn bộ danh sách thẻ có phân trang và bộ lọc.
- `POST /api/v1/notebook/reviews`: Gửi kết quả lượt ôn tập thẻ để tính toán chu kỳ SM-2 mới.
- `DELETE /api/v1/notebook/items/{id}`: Xóa thẻ khỏi sổ tay.

### 9. Thông báo
- `NOTEBOOK_ALL_CAUGHT_UP`: "Tuyệt vời! Bạn đã hoàn thành toàn bộ thẻ ôn tập của ngày hôm nay!"
- `NOTEBOOK_DELETE_SUCCESS`: "Đã xóa câu hỏi khỏi Sổ tay."

### 10. Điều hướng ra
- Hoàn thành hết thẻ ôn tập → Popup chúc mừng kèm số EXP nhận được, trở về S-10.

### 11. Trạng thái & Edge cases
- **EC-SM2-01: Tồn đọng thẻ do nghỉ học nhiều ngày (Dormant Backlog)**: Khi học viên nghỉ học 1 tuần, số thẻ đến hạn có thể dồn lên hàng chục câu. Hệ thống tự động giới hạn tối đa 20 thẻ ưu tiên nhất mỗi phiên ôn tập để tránh gây nản lòng cho học viên; các thẻ còn lại được chia đều cho các ngày tiếp theo.

### 12. Bảng CSDL liên quan
- `MistakeNotebook`, `ReviewHistory`, `Question`, `Option`, `User`.

### 13. Chi tiết API
```
GET /api/v1/notebook/due
Headers: { Authorization: "Bearer <token>" }
Response 200 OK:
{
  "success": true,
  "data": {
    "dueCount": 8,
    "items": [
      {
        "notebookId": "nb-8812",
        "questionId": "q-142",
        "partNumber": 2,
        "questionText": "Where is the annual shareholders' meeting being held this year?",
        "easinessFactor": 2.5,
        "repetitionNumber": 1,
        "previousIntervalDays": 1,
        "lastReviewedAt": "2026-09-15T08:00:00Z"
      }
    ]
  }
}
```

```
POST /api/v1/notebook/reviews
Headers: { Authorization: "Bearer <token>" }
Request:
{
  "notebookId": "nb-8812",
  "selectedOption": "A",
  "timeSpentMs": 4200,
  "isGuessed": false
}
Response 200 OK:
{
  "success": true,
  "data": {
    "notebookId": "nb-8812",
    "isCorrect": true,
    "calculatedQuality": 5,
    "newEasinessFactor": 2.6,
    "newRepetitionNumber": 2,
    "nextIntervalDays": 6,
    "nextReviewDate": "2026-09-22T08:00:00Z",
    "remainingDueCount": 7
  }
}
```

---

## S-19 · Thống kê & Phân tích Năng lực Chuyên sâu (Deep Analytics & Skill Heatmap)

### 1. Mô tả
Giao diện phân tích dữ liệu học tập thông minh toàn diện của học viên. Cung cấp: Biểu đồ biến động điểm số theo thời gian, Bản đồ nhiệt kỹ năng (Skill Heatmap) phân cấp chi tiết theo 7 Part và hàng chục vi kỹ năng (Micro-skills), Tỷ lệ phân bổ thời gian làm bài thực tế so với chuẩn ETS, và Khuyến nghị lộ trình thông minh. **100% miễn phí: Toàn bộ Bản đồ nhiệt kỹ năng và các báo cáo chuyên sâu đều mở khóa cho tất cả người dùng, xóa bỏ hoàn toàn rào cản trả phí của bản cũ.**

### 2. Điểm vào
- Nhấp tab "Tiến độ / Thống kê" trên thanh điều hướng chính.
- Nhấp vào widget phân tích từ S-10 (Dashboard).

### 3. Bố cục màn hình
- **Header Thống kê (Analytics Header)**:
  - Tổng số câu hỏi đã làm: `[Total Questions]`.
  - Tổng thời gian học tập tích lũy: `[Total Hours]` giờ.
  - Điểm dự báo năng lực hiện tại: `[Predicted Score]` (Độ tin cậy 95%).
- **Biểu đồ Đường Lũy tiến Điểm số (Score Trend Line Chart)**:
  - Trục tung: Điểm TOEIC (10 - 990).
  - Trục hoành: Các mốc thời gian (Tuần 1, Tuần 2, ...).
  - 3 đường: Điểm Tổng, Điểm Nghe (LC), Điểm Đọc (RC).
- **Bản đồ Nhiệt Kỹ năng Vi mô (Interactive Skill Heatmap)**:
  - Ma trận lưới các ô vuông đại diện cho từng kỹ năng thuộc 7 Part.
  - Mã màu trực quan:
    - Xanh đậm: Rất thành thạo ($\ge 85\%$).
    - Xanh nhạt: Khá ($70\% - 84\%$).
    - Vàng: Trung bình ($50\% - 69\%$).
    - Đỏ: Kỹ năng yếu, báo động đỏ ($< 50\%$).
  - Nhấp vào bất kỳ ô nào để mở popup xem chi tiết và nút "Luyện ngay kỹ năng này (Micro-drill)".
- **Phân tích Tốc độ & Quản lý Thời gian (Pacing & Time Allocation)**:
  - Biểu đồ cột so sánh thời gian làm trung bình của học viên trên từng câu với chuẩn ETS khuyến nghị (ví dụ: Part 5 học viên làm 38s so với chuẩn 30s $
\rightarrow$ Chậm 8s).
- **Top 5 Lỗ hổng Kiến thức Cần Vá Ngay (Critical Weakness Radar)**:
  - Danh sách 5 vi kỹ năng có tỷ lệ sai nhiều nhất trong 7 ngày qua.

### 4. Thành phần UI
- `ScoreTrendChart`: Biểu đồ đường tương tác hiển thị điểm thi thử và điểm bài chẩn đoán.
- `SkillHeatmapGrid`: Lưới ma trận các ô kỹ năng với tooltip hiển thị số câu đã làm và độ chính xác.
- `PacingBarComparison`: Biểu đồ so sánh thời gian thực tế vs chuẩn ETS.
- `QuickFixDrillButton`: Nút bấm trực tiếp chuyển sang bài tập khắc phục điểm yếu.

### 5. Chức năng
- Trực quan hóa dữ liệu lớn của học viên thành các chỉ số hành động rõ ràng.
- Cho phép bấm vào bất kỳ điểm yếu nào để chuyển ngay sang chế độ luyện tập sửa sai (S-14).
- Xuất báo cáo năng lực dạng tệp PDF/ảnh để chia sẻ.

### 6. Trường nhập & Kiểm tra
- Bộ lọc thời gian: "7 ngày qua", "30 ngày qua", "Toàn thời gian".
- Bộ lọc kỹ năng: Tất cả / Chỉ phần Nghe / Chỉ phần Đọc.

### 7. Business logic
- **Thuật toán ước lượng năng lực IRT ($\theta$) và Điểm dự báo**:
  - Hệ thống tính toán chỉ số năng lực tiềm ẩn $\theta_{LC}$ và $\theta_{RC}$ từ các bài tập đã làm qua mô hình 2PL IRT (Item Response Theory 2 tham số).
  - Ánh xạ $\theta$ sang thang điểm dự đoán $S_{predicted} = f(\theta_{LC}, \theta_{RC})$ với khoảng tin cậy $S \pm 25$ điểm.

### 8. API sử dụng
- `GET /api/v1/analytics/overview?timeframe=30D`: Lấy chỉ số tổng hợp và biểu đồ xu hướng điểm.
- `GET /api/v1/analytics/heatmap`: Lấy dữ liệu toàn bộ ma trận bản đồ nhiệt kỹ năng.

### 9. Thông báo
- `HEATMAP_LOADED`: "Dữ liệu phân tích năng lực đã được cập nhật theo bài làm mới nhất."

### 10. Điều hướng ra
- Nhấp vào ô kỹ năng yếu trên Heatmap → Chuyển sang S-14 (Micro-drill).
- Nhấp "Thi thử ngay" → S-12/S-13.

### 11. Trạng thái & Edge cases
- Học viên mới chưa làm đủ số câu (dưới 50 câu): Bản đồ nhiệt hiển thị trạng thái "Đang thu thập dữ liệu - Cần hoàn thành thêm {n} câu để phân tích chính xác".

### 12. Bảng CSDL liên quan
- `DiagnosticProfile`, `Attempt`, `AttemptDetail`, `SkillTaxonomy`, `UserStatistics`.

### 13. Chi tiết API
```
GET /analytics/heatmap
Headers: { Authorization: "Bearer <token>" }
Response 200 OK:
{
  "success": true,
  "data": {
    "totalSkillsTracked": 42,
    "categories": [
      {
        "part": 5,
        "name": "Hoàn thành câu",
        "skills": [
          { "skillId": "RC_PART5_TENSES", "name": "Các thì động từ", "accuracy": 0.88, "status": "MASTERED", "colorHex": "#22C55E" },
          { "skillId": "RC_PART5_PREPOSITIONS", "name": "Giới từ & Cụm từ", "accuracy": 0.46, "status": "CRITICAL", "colorHex": "#EF4444" },
          { "skillId": "RC_PART5_VOCAB", "name": "Từ vựng công sở", "accuracy": 0.65, "status": "AVERAGE", "colorHex": "#EAB308" }
        ]
      }
    ]
  }
}
```

---

## S-20 · Đấu trường & Bảng Xếp hạng (Arena & Weekly Leaderboard)

### 1. Mô tả
Giao diện thi đấu và gamification tạo động lực học tập hàng ngày. Bao gồm: Bảng xếp hạng tuần (Weekly League) chia thành các hạng đấu (Đồng, Bạc, Vàng, Kim Cương, Cao Thủ) với cơ chế thăng hạng/trụ hạng vào 23:59 Chủ Nhật hàng tuần; Đấu trường sinh tử 1v1 (Live Arena Quiz) thi đấu đối kháng 5 câu hỏi nhanh thời gian thực; và Quản lý Chuỗi ngày học tập (Streak Flame & Shield). 100% miễn phí, toàn bộ giải đấu và đấu trường đều tham gia tự do.

### 2. Điểm vào
- Từ S-10 (Dashboard): Nhấp biểu tượng Cúp vàng hoặc bấm vào số ngày Streak.
- Từ thanh điều hướng chính (Bottom Bar / Sidebar).

### 3. Bố cục màn hình
- **Header Giải đấu Tuần (Weekly League Header)**:
  - Tên hạng đấu hiện tại: "Giải đấu Kim Cương 💎" (Bảng 30 người đồng trình độ mục tiêu ETS $\pm 50$ điểm).
  - Thời gian còn lại của mùa giải: "Kết thúc sau 2 ngày 14 giờ".
  - Vị trí của tôi: Hạng `#4` trên 30 người trong bảng đấu (Vùng thăng hạng Xanh lá: Top 1-5).
  - **Công tắc "Thi Đua Với Chính Mình (Personal Best Mode)"**: Cho phép người dùng chuyển sang theo dõi biểu đồ tiến bộ cá nhân thay vì so sánh xã hội nếu cảm thấy áp lực.
- **Danh sách Bảng Xếp hạng 30 người (Leaderboard Table)**:
  - Top 1, 2, 3: Có vương miện Vàng/Bạc/Đồng, avatar viền sáng lấp lánh.
  - Vạch thăng hạng (Promotion Zone, Top 5 thăng hạng lên giải đấu cao hơn).
  - Vạch an toàn (Safe Zone).
  - Vạch nguy hiểm rớt hạng (Demotion Zone, Top 5 dưới cùng rớt hạng).
  - Mỗi dòng hiển thị: Hạng, Avatar, Tên học viên, Số EXP tuần, Huy hiệu chuỗi ngày.
- **Khu vực Đấu trường Trực tiếp 1v1 (Live 1v1 Arena Mode)**:
  - Thẻ thách đấu: "Tìm đối thủ ngẫu nhiên cùng trình độ".
  - Luật thi đấu: 5 câu hỏi trắc nghiệm tốc độ, mỗi câu 15 giây; người trả lời đúng và nhanh hơn sẽ ghi nhiều điểm hơn; người thắng nhận 50 Gems.
  - Nút CTA: "Tìm trận đấu ngay ⚔️".
- **Khu vực Quản lý Chuỗi Streak Nhân Văn (Human-centric Streak & Freeze)**:
  - Chuỗi ngày hiện tại: `[n]` ngày 🔥.
  - **Tính năng Đóng băng Chuỗi (Streak Freeze / Ngày Nghỉ Tự Nhiên)**:
    - Cung cấp miễn phí 1–2 lượt đóng băng chuỗi mỗi tuần. Nếu học viên có ngày bận rộn/nghỉ ngơi cuối tuần, chuỗi Streak không bị gãy.
    - Quy định ngưỡng tối thiểu: Chỉ cần hoàn thành 1 câu Micro-Win hoặc 5 thẻ SM-2 là được tính duy trì ngọn lửa.
  - Số khiên bảo vệ hiện có: `[x]` / 3 khiên 🛡️.
  - Lịch sử chuỗi 30 ngày qua (Calendar dots).

### 4. Thành phần UI
- `LeaguePodium`: Bục vinh danh Top 3 học viên cao nhất bảng đấu.
- `LeaderboardList`: Danh sách cuộn mượt 30 thí sinh, tự động cố định dòng của chính người dùng ở đáy màn hình nếu nằm ngoài khung nhìn.
- `PersonalBestToggle`: Nút chuyển đổi giao diện bảng thi đua xã hội sang thi đua kỷ lục cá nhân.
- `StreakFreezeCard`: Thẻ kích hoạt ngày nghỉ tự động bảo vệ chuỗi Streak.
- `ArenaMatchmakingModal`: Khung tìm kiếm đối thủ với animation radar quét đối thủ.
- `StreakCalendarHeatmap`: Lưới hiển thị các ngày đã thắp sáng ngọn lửa học tập.

### 5. Chức năng
- Tham gia bảng xếp hạng thi đua hàng tuần tích điểm qua việc học bài, hoàn thành node bản đồ, và luyện đề.
- Chuyển đổi linh hoạt giữa BXH nhóm và Kỷ lục bản thân (Personal Best) để tránh áp lực so sánh độc hại.
- Kích hoạt ngày nghỉ Streak Freeze để duy trì động lực bền vững lâu dài.
- Tham gia thi đấu đối kháng trực tiếp 1v1 với người học khác qua kết nối WebSocket.

### 6. Trường nhập & Kiểm tra
- Khởi chạy trận đấu 1v1: Kiểm tra kết nối mạng ổn định (Ping $< 300$ ms).
- Chống hack điểm EXP: Toàn bộ EXP chỉ được cộng từ server sau khi kiểm chứng bài tập hoàn thành hợp lệ.

### 7. Business logic
- **Cơ chế Thăng / Rớt hạng tuần**:
  - Mỗi bảng đấu gồm đúng 30 người có trình độ tương đương.
  - Top 5 thí sinh điểm cao nhất: Thăng lên hạng cao hơn vào 00:00 thứ Hai tuần mới, nhận thưởng Gems và Huy hiệu.
  - Thí sinh hạng 6 đến 25: Trụ hạng.
  - Thí sinh hạng 26 đến 30: Rớt xuống hạng thấp hơn (trừ hạng Đồng không bị rớt).
- **Cơ chế Điểm Đấu trường 1v1 (Arena Scoring)**:
  - Điểm câu = $isCorrect \times (100 + \text{max}(0, 15 - t_{seconds}) \times 10)$.

### 8. API sử dụng
- `GET /api/v1/gamification/leaderboard`: Lấy bảng xếp hạng của bảng đấu hiện tại.
- `POST /api/v1/arena/matches`: Tìm trận đối kháng 1v1 (kết nối WebSocket server).
- `POST /api/v1/gamification/shields/purchases`: Dùng Gems đổi khiên bảo vệ Streak.

### 9. Thông báo
- `ARENA_MATCH_FOUND`: "Đã tìm thấy đối thủ! Trận đấu bắt đầu sau 3... 2... 1!"
- `LEADERBOARD_PROMOTED`: "Chúc mừng! Bạn đã thăng hạng lên Giải đấu Kim Cương!"

### 10. Điều hướng ra
- Bắt đầu trận 1v1 → Mở màn hình thi đấu đối kháng trực tiếp.
- Bấm vào tên học viên khác → Xem tóm tắt hồ sơ công khai và bộ sưu tập huy hiệu.

### 11. Trạng thái & Edge cases
- Mất kết nối mạng khi đang thi đấu 1v1: Hệ thống tính xử thua bài đối kháng sau 30 giây mất tín hiệu heartbeat.

### 12. Bảng CSDL liên quan
- `GamificationState`, `LeaderboardEntry`, `User`, `ArenaMatch`.

### 13. Chi tiết API
```
GET /gamification/leaderboard
Headers: { Authorization: "Bearer <token>" }
Response 200 OK:
{
  "success": true,
  "data": {
    "league": "DIAMOND",
    "seasonEndsInSeconds": 224100,
    "userRank": 4,
    "userExp": 1850,
    "entries": [
      { "rank": 1, "userId": "u-01", "name": "Minh Tuấn", "avatarUrl": "...", "exp": 2420, "streak": 45 },
      { "rank": 2, "userId": "u-02", "name": "Thùy Trang", "avatarUrl": "...", "exp": 2190, "streak": 30 },
      { "rank": 3, "userId": "u-03", "name": "Hoàng Nam", "avatarUrl": "...", "exp": 1980, "streak": 14 },
      { "rank": 4, "userId": "u-123456", "name": "Nguyễn Văn A (Tôi)", "avatarUrl": "...", "exp": 1850, "streak": 7 }
    ]
  }
}
```

---

## S-21 · Cửa hàng Vật phẩm Đổi quà (Gems Shop — 100% In-Game Currency)

### 1. Mô tả
Cửa hàng vật phẩm và tiện ích phục vụ học tập, **sử dụng 100% bằng đồng tiền ảo trong game (Gems kiếm được qua việc chăm chỉ làm bài tập và hoàn thành nhiệm vụ). HOÀN TOÀN KHÔNG CÓ TIỀN THẬT, KHÔNG CÓ THẺ TÍN DỤNG, KHÔNG CÓ GÓI PREMIUM.** Học viên dùng Gems để đổi lấy: Khiên bảo vệ chuỗi ngày học (Streak Freeze Shield), Bình hồi phục năng lượng tức thì (Energy Refill Potion), Trang phục phụ kiện làm đẹp cho linh thú Guardian Lexling, và Đổi quà tặng học tập thực tế (Sách từ vựng PDF độc quyền, Voucher thi thử chuẩn ETS).

### 2. Điểm vào
- Từ S-10 (Dashboard): Nhấp vào số Gems đang có trên Header.
- Từ S-20 (Arena): Nhấp "Mua khiên bảo vệ".
- Từ thanh điều hướng chính.

### 3. Bố cục màn hình
- **Header Cửa hàng**:
  - Số dư hiện tại của bạn: `[Current Balance]` Gems 💎.
  - Lịch sử kiếm Gems: "Hôm nay bạn đã kiếm được +65 Gems từ học tập!".
- **Danh sách Nhóm Vật phẩm (Shop Category Tabs)**:
  - Tab 1: Vật phẩm Hỗ trợ Học tập (Booster & Utility).
  - Tab 2: Phụ kiện Linh thú (Lexling Cosmetics & Skins).
  - Tab 3: Phần thưởng Đổi quà Tri ân (Study Rewards & Ebooks).
- **Lưới Sản phẩm (Product Card Grid)**:
  - Mỗi sản phẩm gồm: Hình ảnh 3D bắt mắt, Tên vật phẩm, Mô tả công dụng, Giá bán bằng Gems, Nút "Đổi ngay (Exchange)".
  - Các vật phẩm tiêu biểu:
    1. *Khiên Bảo Vệ Chuỗi (Streak Shield)*: 200 Gems (Giữ nguyên chuỗi ngày nếu lỡ quên học 1 ngày, tối đa tích lũy 3 khiên).
    2. *Bình Hồi Phục Năng Lượng (Energy Refill Potion)*: 20 Gems (Hồi đầy ngay 5/5 Energy).
    3. *Khôi Phục Chuỗi Đã Mất (Streak Recovery)*: 300 Gems (Khôi phục lại chuỗi ngày đã đứt trong vòng 48h).
    4. *Trang phục Lexling Thám Hiểm (Explorer Skin)*: 500 Gems (Khoác áo mới cho linh thú trên bản đồ Saga).
    5. *Ebook 500 Bẫy TOEIC Part 7 Độc quyền (PDF)*: 1,000 Gems (Tải về máy miễn phí).

### 4. Thành phần UI
- `GemsBalanceHeader`: Bộ đếm số dư Gems với biểu tượng kim cương sáng bóng.
- `ShopItemCard`: Thẻ vật phẩm có hình minh họa, giá Gems, nút đổi và trạng thái (Đang bán / Đã sở hữu).
- `PurchaseConfirmationModal`: Modal xác nhận giao dịch bằng Gems để tránh bấm nhầm.

### 5. Chức năng
- Tra cứu danh mục các vật phẩm hỗ trợ học tập và phụ kiện giải trí.
- Thực hiện giao dịch mua bán bằng đơn vị tiền tệ Gems an toàn, có kiểm tra số dư và trừ điểm server-side.
- Trang bị trực tiếp phụ kiện vừa đổi cho Guardian Lexling.

### 6. Trường nhập & Kiểm tra
- Kiểm tra số dư Gems: Nếu `userGems < itemPrice`, vô hiệu hóa nút đổi và hiển thị thông báo "Bạn còn thiếu {diff} Gems! Hãy chăm chỉ làm thêm bài tập để tích lũy."
- Kiểm tra giới hạn sở hữu: Với Khiên bảo vệ, nếu học viên đã có 3 khiên (mức tối đa), khóa nút mua kèm thông báo "Túi đồ đã chứa tối đa 3 khiên."

### 7. Business logic
- **100% Miễn phí tiền mặt (Zero Real-Money Monetization)**: Không tích hợp bất kỳ cổng thanh toán ngân hàng (VNPay, Momo, Stripe) hay nạp tiền nào. Gems chỉ sinh ra từ sự kiên trì nỗ lực học tập thực sự của học sinh.
- Chống gian lận click liên tục (Double-click prevention): Mỗi request gửi kèm `Idempotency-Key` dạng UUID và thực hiện giao dịch atomic qua Redis lock + PostgreSQL transaction.

### 8. API sử dụng
- `GET /api/v1/shop/items`: Lấy danh sách các vật phẩm đang mở bán và giá Gems.
- `POST /api/v1/shop/purchases`: Thực hiện giao dịch đổi vật phẩm bằng Gems.

### 9. Thông báo
- `SHOP_PURCHASE_SUCCESS`: "Đổi vật phẩm thành công! Đã thêm vào túi đồ của bạn."
- `SHOP_INSUFFICIENT_GEMS`: "Số dư Gems không đủ. Cần thêm {diff} Gems."
- `SHOP_MAX_INVENTORY`: "Bạn đã sở hữu số lượng tối đa của vật phẩm này (Tối đa 3 khiên)."

### 10. Điều hướng ra
- Mua xong phụ kiện linh thú → Cho phép bấm "Trang bị ngay" hoặc quay về S-10.

### 11. Trạng thái & Edge cases
- Mất mạng lúc đang giao dịch: Nhờ có `Idempotency-Key`, việc gửi lại request khi có mạng sẽ không bao giờ làm trừ Gems hai lần.

### 12. Bảng CSDL liên quan
- `UserInventory`, `GamificationState`, `ShopItem`, `User`.

### 13. Chi tiết API
```
POST /shop/purchase
Headers: {
  Authorization: "Bearer <token>",
  "Idempotency-Key": "4c9e8211-789a-41df-a567-bc8901234567"
}
Request:
{
  "itemId": "item-streak-shield-01",
  "quantity": 1
}
Response 200 OK:
{
  "success": true,
  "data": {
    "transactionId": "tx-88129",
    "itemId": "item-streak-shield-01",
    "itemTitle": "Khiên bảo vệ Chuỗi ngày học",
    "gemsDeducted": 200,
    "remainingGems": 250,
    "newShieldCount": 3
  }
}
Error 400:
{
  "success": false,
  "code": "INSUFFICIENT_GEMS",
  "message": "Số dư Gems không đủ để thực hiện giao dịch."
}
```

---

## S-22 · Hồ sơ Cá nhân & Bộ sưu tập Huy hiệu (Profile & Achievements)

### 1. Mô tả
Giao diện quản lý thông tin tài khoản học viên, tổng kết toàn bộ hành trình rèn luyện, xem Tủ trưng bày linh thú Guardian Lexling (Hall of Fame), bộ sưu tập các danh hiệu/huy hiệu đã đạt được, lịch sử các bài thi đã làm kèm chứng chỉ hoàn thành chặng (Completion Certificates). 100% miễn phí.

### 2. Điểm vào
- Nhấp vào Avatar học viên ở Header tại S-10.
- Nhấp tab "Hồ sơ" trên thanh điều hướng chính.

### 3. Bố cục màn hình
- **Header Hồ sơ Học viên**:
  - Avatar, Tên học viên, Email, Ngày gia nhập hệ thống.
  - Cấp độ (Level [x]), Huy hiệu danh hiệu (Ví dụ: "Chiến binh Part 5").
  - Nút "Chỉnh sửa hồ sơ" (Đổi tên, đổi avatar).
- **Bộ sưu tập Linh thú Hộ mệnh (Guardian Lexling Showcase)**:
  - Linh thú đồng hành hiện tại: Ảnh 2D, Tên, Giai đoạn tiến hóa (Stage 1→4).
  - Tủ vinh danh các linh thú từ các chặng trước đã tốt nghiệp.
- **Thành tích & Kỷ lục Cá nhân (Milestone Achievements)**:
  - Lưới các Huy hiệu đã mở khóa và còn khóa (Ví dụ: "Học đêm chăm chỉ", "Chuỗi 30 ngày bất tử", "Thợ săn bẫy ETS").
- **Lịch sử Bài thi & Chứng chỉ Tốt nghiệp (Certificates & Test History)**:
  - Danh sách các bài thi CBT và bài tốt nghiệp chặng đã làm.
  - Nút xem lại bài làm (S-17).
  - Nút tải tệp PDF Chứng chỉ số có chữ ký điện tử xác thực.

### 4. Thành phần UI
- `ProfileHeaderCard`: Thẻ thông tin cá nhân và cấp độ level.
- `LexlingShowcaseCard`: Bục trưng bày linh thú 3D/2D.
- `BadgeGrid`: Lưới các icon huy hiệu danh giá.
- `CertificateHistoryList`: Danh sách chứng nhận khóa học có mã QR xác minh.

### 5. Chức năng
- Xem lại toàn bộ lộ trình phát triển của bản thân.
- Tải về và chia sẻ chứng nhận tốt nghiệp lên các mạng xã hội.
- Chỉnh sửa thông tin cá nhân và mật khẩu.

### 6. Trường nhập & Kiểm tra
- Tên hiển thị: 2 - 50 ký tự, không chứa ký tự đặc biệt độc hại.
- Đổi mật khẩu: Mật khẩu cũ chính xác, mật khẩu mới tối thiểu 8 ký tự gồm chữ hoa, chữ thường và số.

### 7. Business logic
- Tính toán cấp độ (Level Formula): Cấp độ Level $L$ tính theo tổng số EXP tích lũy:
  $$L = \lfloor \sqrt{EXP / 100} 
floor + 1$$

### 8. API sử dụng
- `GET /api/v1/users/me/profile`: Lấy đầy đủ thông tin hồ sơ, linh thú, huy hiệu, chứng chỉ.
- `PUT /api/v1/users/me/profile`: Cập nhật tên hiển thị hoặc avatar.

### 9. Thông báo
- `PROFILE_UPDATE_SUCCESS`: "Đã cập nhật thông tin cá nhân thành công."

### 10. Điều hướng ra
- Nhấp Cài đặt → S-23.
- Nhấp vào bài thi trong lịch sử → S-16 hoặc S-17.

### 11. Trạng thái & Edge cases
- Không có lỗi đặc biệt.

### 12. Bảng CSDL liên quan
- `User`, `GamificationState`, `GuardianLexling`, `UserBadge`, `Certificate`.

### 13. Chi tiết API
```
GET /user/profile
Headers: { Authorization: "Bearer <token>" }
Response 200 OK:
{
  "success": true,
  "data": {
    "user": {
      "id": "u-123456",
      "name": "Nguyễn Văn A",
      "email": "vana@example.com",
      "level": 12,
      "totalExp": 14500,
      "joinedAt": "2026-08-01T10:00:00Z"
    },
    "activeGuardian": {
      "id": "lex-001", "name": "Sparky", "stage": 2, "stageName": "Brave Spark"
    },
    "badges": [
      { "id": "badge-streak-7", "title": "Tuần lễ Vàng", "description": "Duy trì chuỗi 7 ngày", "unlockedAt": "2026-09-10T12:00:00Z" },
      { "id": "badge-cbt-first", "title": "Lên Sàn Đấu", "description": "Hoàn thành bài thi CBT đầu tiên", "unlockedAt": "2026-09-12T15:00:00Z" }
    ],
    "certificates": [
      {
        "certificateId": "CERT-2026-TOEIC-88912",
        "title": "Chứng nhận Hoàn thành Lộ trình TOEIC 650+",
        "scoreAchieved": 680,
        "issuedAt": "2026-09-16T08:00:00Z",
        "downloadUrl": "https://cdn.toeicpro.com/certs/cert_88912.pdf"
      }
    ]
  }
}
```

---

## S-23 · Cài đặt Hệ thống & Tùy chọn Học tập (Settings)

### 1. Mô tả
Giao diện quản lý các thiết lập của học viên, bao gồm: Cài đặt tốc độ và giọng đọc âm thanh ETS (Audio settings), Nhắc nhở học tập hàng ngày qua Push Notification/Email, Chế độ giao diện (Sáng/Tối/Tự động), Quản lý tải trước âm thanh offline (Service Worker Cache Management), Tùy chọn trợ năng (Calm Mode, Zen Exam Mode) và Bảo mật tài khoản. **Lưu ý: Hệ thống 100% miễn phí — không có bất kỳ tính năng gói cước thuê bao hay cổng thanh toán nào; mã định danh S-24 trong hệ thống chính thức là màn hình Onboarding Micro-Win (<60s First Victory).**

### 2. Điểm vào
- Từ S-10 hoặc S-22: Nhấp biểu tượng Bánh răng cài đặt (⚙️).

### 3. Bố cục màn hình
- **Header**: "Cài đặt & Tùy chọn".
- **Cài đặt Phát âm thanh (Audio & Playback)**:
  - Tốc độ đọc chuẩn thi: 1.0x (Chuẩn ETS) | 0.8x (Chậm cho người mới) | 1.2x (Thử thách phản xạ nhanh).
  - Tự động phát âm thanh khi vào câu hỏi mới (Bật/Tắt).
  - Quản lý tải trước dữ liệu âm thanh ngoại tuyến: Nút "Tải trước toàn bộ âm thanh chặng học (Dung lượng: ~45MB)" để học khi mất mạng.
- **Nhắc nhở Học tập (Study Reminders)**:
  - Giờ nhắc học hàng ngày (Ví dụ: 20:00 mỗi tối).
  - Kênh nhận thông báo: Thông báo đẩy trình duyệt (Web Push), Email tóm tắt tiến độ tuần.
- **Giao diện & Trải nghiệm (Appearance & UX)**:
  - Chủ đề: Tối (Dark Mode) / Sáng (Light Mode) / Theo hệ điều hành.
  - Bật/Tắt hiệu ứng rung (Haptic feedback trên điện thoại).
  - Tùy chọn chế độ Tập trung (Focus Mode): Luôn ẩn linh thú khi làm bài.
- **Bảo mật & Dữ liệu (Security & Data)**:
  - Đổi mật khẩu.
  - Đăng xuất khỏi các thiết bị khác.
  - Xóa tài khoản vĩnh viễn (GDPR Compliance).
  - Nút "Đăng xuất".

### 4. Thành phần UI
- `SettingsSection`: Các nhóm cài đặt có tiêu đề phân tách rõ ràng.
- `ToggleSwitch`: Công tắc bật tắt tính năng.
- `TimePicker`: Bộ chọn giờ nhắc học tập.
- `CacheManagerCard`: Hiển thị dung lượng cache âm thanh và nút xóa cache/tải trước.

### 5. Chức năng
- Điều chỉnh các tham số cá nhân hóa quá trình học tập.
- Kích hoạt Service Worker tải sẵn tài nguyên để luyện tập mượt mà ở chế độ ngoại tuyến.
- Đổi mật khẩu và quản lý các phiên đăng nhập.

### 6. Trường nhập & Kiểm tra
- `audioSpeed`: Float $\in [0.8, 1.2]$.
- `dailyReminderTime`: Định dạng `HH:mm`.
- `theme`: Enum `["LIGHT", "DARK", "SYSTEM"]`.

### 7. Business logic
- Lưu các tùy chọn giao diện và âm thanh vào `localStorage` của trình duyệt để có hiệu lực tức thời, đồng thời đồng bộ lên server để dùng đa thiết bị.

### 8. API sử dụng
- `GET /api/v1/users/me/settings`: Lấy cấu hình hiện tại.
- `PUT /api/v1/users/me/settings`: Lưu các thay đổi cấu hình.

### 9. Thông báo
- `SETTINGS_SAVED`: "Đã lưu thiết lập thành công."

### 10. Điều hướng ra
- Bấm Đăng xuất → Xóa token ở client, gọi API thu hồi phiên, chuyển về S-01.

### 11. Trạng thái & Edge cases
- Thiết bị chặn thông báo Web Push: Hiển thị hướng dẫn mở quyền thông báo trong cài đặt trình duyệt.

### 12. Bảng CSDL liên quan
- `User`, `UserSettings`.

### 13. Chi tiết API
```
GET /user/settings
Headers: { Authorization: "Bearer <token>" }
Response 200 OK:
{
  "success": true,
  "data": {
    "audioSpeed": 1.0,
    "autoPlayAudio": true,
    "dailyReminderTime": "20:00",
    "enableWebPush": true,
    "theme": "SYSTEM",
    "focusModeDefault": false,
    "offlineAudioCached": true,
    "cacheSizeMb": 42.5
  }
}
```

---

## S-25 · Quản trị Nội dung & Ngân hàng Đề thi (Admin Content & Question Bank)

### 1. Mô tả
Giao diện dành riêng cho Ban chuyên môn và Quản trị viên (Admin/Editor). Quản lý toàn diện ngân hàng câu hỏi phân cấp theo chuẩn ETS: Quản lý Stimulus Groups (Đoạn văn bài đọc Part 6/7, File âm thanh Listening Part 1-4), Cấu hình mốc âm thanh `audioCuePointsJson`, Quản lý câu hỏi trắc nghiệm với vị trí điền từ `clozeIndex`, Phân loại vi kỹ năng (`SkillTaxonomy`), và Hiệu chuẩn tham số độ khó IRT 2 tham số (`irtDifficulty`, `irtDiscrimination`).

### 2. Điểm vào
- Đăng nhập bằng tài khoản có vai trò `ADMIN` hoặc `CONTENT_CREATOR`.
- Đường dẫn: `/admin/content`.

### 3. Bố cục màn hình
- **Thanh Công cụ Quản trị (Admin Topbar)**:
  - Chọn phân hệ: Ngân hàng Đề thi (Exams) | Kho Câu hỏi (Questions) | Nhóm Kích thích (Stimulus Groups) | Cây Kỹ năng (Taxonomy).
  - Nút "Nhập đề thi từ Excel/ZIP (Import ETS Exam Package)".
  - Nút "Thêm câu hỏi mới".
- **Bộ lọc Ngân hàng Câu hỏi (Question Filter Toolbar)**:
  - Lọc theo Part: 1 đến 7.
  - Lọc theo Bộ đề: TP-MOCK-2024 (Định dạng ETS), TP-MOCK-2023, Hacker-format,...
  - Lọc theo Dải độ khó IRT: Dễ ($b < -0.5$), Vừa ($-0.5 \le b \le 0.5$), Khó ($b > 0.5$).
  - Lọc theo Vi kỹ năng (Micro-skill taxonomy).
- **Bảng Dữ liệu Câu hỏi (Questions Data Table)**:
  - Các cột: Mã câu, Part, Trích đoạn câu hỏi, Đáp án đúng, Chỉ số IRT $b$ (Độ khó) & $a$ (Độ phân biệt), Kỹ năng chính gán kèm, Trạng thái (Đã duyệt / Nháp), Hành động (Sửa, Xem thử, Xóa).
- **Trình Chỉnh sửa Câu hỏi Nâng cao (Advanced Question Editor Modal)**:
  - Nhập văn bản câu hỏi hỗ trợ định dạng Markdown và `clozeIndex` (cho Part 6).
  - Nhập 4 lựa chọn đáp án và chọn đáp án chính xác.
  - Nhập Lời giải chi tiết, Phân tích bẫy đề thi, và Từ khóa nhận biết (Clue Words).
  - Thiết lập tham số IRT 2PL: `irtDifficulty` (-3.0 đến +3.0) và `irtDiscrimination` (0.2 đến 2.5).
  - Trình gán Audio Cue Points: Nghe âm thanh và gắn mốc `startMs` - `endMs` cho từng câu hỏi thuộc bài nghe.

### 4. Thành phần UI
- `AdminDataTable`: Bảng dữ liệu hỗ trợ lọc, sắp xếp, chọn hàng loạt, và phân trang.
- `AudioCueEditor`: Trình gắn thẻ thời gian trên sóng âm thanh để cắt đoạn phát chuẩn ETS.
- `MarkdownRichEditor`: Trình soạn thảo văn bản bài đọc và câu hỏi.
- `TaxonomyTreePicker`: Cây thư mục chọn vi kỹ năng liên kết.

### 5. Chức năng
- CRUD (Tạo, Đọc, Cập nhật, Xóa) toàn bộ câu hỏi và đề thi.
- Nhập tệp nén hàng loạt đề thi ETS (âm thanh mp3, văn bản json, ảnh minh họa png).
- Hiệu chuẩn tự động các tham số IRT từ dữ liệu làm bài thực tế của hàng nghìn học viên.

### 6. Trường nhập & Kiểm tra
- `partNumber`: Số nguyên 1 đến 7.
- `correctOption`: Enum `["A", "B", "C", "D"]`.
- `irtDifficulty`: Số thực $\in [-3.0, 3.0]$.
- `irtDiscrimination`: Số thực $\in [0.1, 3.0]$.
- `clozeIndex`: Bắt buộc đối với Part 6 (vị trí từ 1 đến 4).

### 7. Business logic
- Đề thi hoàn chỉnh phải có đúng 200 câu (100 LC + 100 RC) trước khi chuyển trạng thái sang `PUBLISHED`.
- Khi cập nhật `audioCuePointsJson`, hệ thống tự động kiểm tra xem các khoảng thời gian có bị chồng lấn (overlap) hay không.

### 8. API sử dụng
- `GET /api/v1/admin/questions`: Danh sách câu hỏi có phân trang và bộ lọc.
- `POST /api/v1/admin/questions`: Tạo câu hỏi mới kèm tham số IRT và kỹ năng.
- `PUT /api/v1/admin/questions/{id}`: Cập nhật nội dung và tham số câu hỏi.
- `POST /api/v1/admin/exams/imports`: Nhập gói đề thi ETS.

### 9. Thông báo
- `ADMIN_QUESTION_SAVED`: "Đã lưu câu hỏi thành công."
- `ADMIN_IMPORT_COMPLETE`: "Đã nhập thành công 200 câu hỏi cho đề thi {examCode}."

### 10. Điều hướng ra
- Chuyển sang xem trước giao diện thi như học viên (Preview Mode).

### 11. Trạng thái & Edge cases
- Xóa câu hỏi đã có học viên làm: Hệ thống áp dụng xóa mềm (`isDeleted = true`) để không làm hỏng dữ liệu lịch sử bài làm trong bảng `AttemptDetail`.

### 12. Bảng CSDL liên quan
- `Question`, `Option`, `StimulusGroup`, `SkillTaxonomy`, `QuestionSkillAssignment`, `Exam`.

### 13. Chi tiết API
```
POST /admin/questions
Headers: { Authorization: "Bearer <admin-token>" }
Request:
{
  "partNumber": 5,
  "stimulusGroupId": null,
  "clozeIndex": null,
  "questionText": "The seminar on digital marketing _______ by more than two hundred attendees yesterday.",
  "options": [
    { "label": "A", "text": "attended" },
    { "label": "B", "text": "was attended", "isCorrect": true },
    { "label": "C", "text": "is attending" },
    { "label": "D", "text": "attends" }
  ],
  "primarySkillId": "RC_VOICE_PASSIVE",
  "irtDifficulty": -0.25,
  "irtDiscrimination": 1.40,
  "explanation": "Dấu hiệu 'by + tân ngữ' và 'yesterday' chỉ câu bị động ở thì quá khứ đơn. Chọn 'was attended'.",
  "trapNote": "Học viên dễ vội vàng chọn 'attended' vì thấy đứng sau chủ ngữ.",
  "clueWords": ["by more than", "yesterday"]
}
Response 201 Created:
{
  "success": true,
  "data": { "questionId": "q-99102", "status": "DRAFT" }
}
```

---

## S-26 · Quản trị Người dùng & Phân tích Hệ thống (Admin Users & System Analytics)

### 1. Mô tả
Giao diện dành cho ban điều hành và kỹ sư hệ thống. Giám sát các chỉ số hoạt động toàn diện của nền tảng: Số lượng học viên đăng ký, Số lượng người học tích cực hàng ngày (DAU/MAU), Tỷ lệ hoàn thành lộ trình (Journey Completion Rate), Giám sát hàng đợi tiến trình nền (BullMQ Queue Monitor), Giám sát xung đột phiên thi (Concurrent Session & Multi-tab conflicts), và Quản lý tài khoản học viên (Khóa/Mở khóa, Đặt lại mật khẩu).

### 2. Điểm vào
- Đăng nhập bằng tài khoản có vai trò `ADMIN` hoặc `SUPER_ADMIN`.
- Đường dẫn: `/admin/system`.

### 3. Bố cục màn hình
- **Bảng Chỉ số Tổng quan (KPI Metric Cards)**:
  - Tổng số học viên: `[Total Users]`.
  - Học viên tích cực hôm nay (DAU): `[DAU]`.
  - Tỷ lệ tốt nghiệp chặng thành công: `[x]%`.
  - Số bài thi CBT đang diễn ra đồng thời: `[Active Sessions]`.
- **Giám sát Hàng đợi & Trạng thái Hệ thống (Queue & Worker Health)**:
  - BullMQ Queue Status: `exam-grace-period` (0 failed, 4 active), `sm2-scheduler` (Completed).
  - Tỷ lệ xung đột phiên thi đa tab (EC-03 conflicts): [n] trường hợp đã được chặn thành công.
- **Danh sách Quản lý Học viên (User Management Table)**:
  - Cột: ID, Tên, Email, Trình độ hiện tại, Mục tiêu, Ngày tham gia, Trạng thái tài khoản (Hoạt động / Bị khóa), Thao tác.
- **Thống kê Độ chuẩn xác Đề thi (ETS Item Calibration Report)**:
  - Báo cáo phân tích các câu hỏi có tỷ lệ sai bất thường hoặc chỉ số phân biệt kém để ban chuyên môn điều chỉnh lại nội dung.

### 4. Thành phần UI
- `KpiGrid`: Lưới hiển thị các thẻ số liệu thống kê thời gian thực.
- `SystemHealthPills`: Trạng thái kết nối Redis, PostgreSQL, BullMQ, Cloud Storage.
- `UserActionDropdown`: Menu thao tác trên từng học viên (Khóa tài khoản, Gửi lại OTP kích hoạt, Xem lịch sử làm bài).

### 5. Chức năng
- Theo dõi sức khỏe toàn hệ thống và phát hiện sớm các sự cố kỹ thuật.
- Hỗ trợ học viên khi gặp sự cố tài khoản hoặc lỗi kỹ thuật trong phòng thi.
- Xuất dữ liệu thống kê phục vụ báo cáo định kỳ.

### 6. Trường nhập & Kiểm tra
- Tìm kiếm học viên theo Email, ID, hoặc Tên.
- Thao tác khóa tài khoản: Bắt buộc nhập lý do khóa.

### 7. Business logic
- Chặn hành vi gian lận: Nếu phát hiện tài khoản đăng nhập từ > 5 IP khác nhau trong 1 giờ hoặc có dấu hiệu làm bài tự động bằng bot, tự động đánh dấu cờ cảnh báo (Flagged for Review).

### 8. API sử dụng
- `GET /api/v1/admin/system/stats`: Lấy các chỉ số KPI thời gian thực.
- `GET /api/v1/admin/users`: Danh sách học viên có lọc và phân trang.
- `PATCH /api/v1/admin/users/{id}/status`: Khóa hoặc mở khóa tài khoản người dùng.

### 9. Thông báo
- `ADMIN_USER_STATUS_UPDATED`: "Đã cập nhật trạng thái tài khoản học viên."

### 10. Điều hướng ra
- Bấm vào học viên → Xem chi tiết toàn bộ hồ sơ và lịch sử làm bài của học viên đó.

### 11. Trạng thái & Edge cases
- Không có lỗi đặc biệt.

### 12. Bảng CSDL liên quan
- `User`, `UserJourney`, `Attempt`, `GamificationState`.

### 13. Chi tiết API
```
GET /admin/system/stats
Headers: { Authorization: "Bearer <admin-token>" }
Response 200 OK:
{
  "success": true,
  "data": {
    "totalLearners": 14250,
    "activeLearnersToday": 3820,
    "currentActiveExams": 145,
    "completedJourneys": 2105,
    "averageTargetScoreAchievementRate": 0.86,
    "systemHealth": {
      "redisStatus": "CONNECTED",
      "postgresConnectionPool": "HEALTHY",
      "activeBullMqJobs": 145,
      "failedJobsLast24h": 0
    }
  }
}
```

---

# 4. Đặc tả Chi tiết Luồng Nghiệp vụ (Business Logic Flows — Section B)

---

## B.1 · Luồng Thiết lập Mục tiêu & Cam kết Onboarding (Onboarding & Target Setting Flow)

### 1. Mục tiêu & Ý nghĩa
Xác lập mục tiêu điểm số ($S_{target}$), thời gian cam kết học mỗi ngày ($T_{daily} \in \{30, 45, 60, 90\}$ phút) và dự báo sơ bộ lộ trình học tập, đảm bảo tính khả thi sư phạm ngay từ điểm chạm đầu tiên.

### 2. Sơ đồ tuần tự (Sequence Diagram / Pseudocode)
```
Học viên (Client)              Hệ thống (Server)                  Cơ sở dữ liệu (Database)
      |                                |                                   |
      |-- 1. Nhập S_target, T_daily -->|                                   |
      |                                |-- 2. Kiểm tra tính hợp lệ ------->|
      |                                |      Target in [250, 990]         |
      |                                |      Commit in [30, 90]           |
      |                                |                                   |
      |                                |-- 3. Tính Reality Check dự bộ --->|
      |                                |      Ước lượng D_preview          |
      |                                |                                   |
      |<- 4. Trả về kết quả xác nhận --|                                   |
      |      kèm gợi ý bài chẩn đoán   |                                   |
```

### 3. Quy tắc nghiệp vụ chi tiết
- **Rule B1-01 (Mục tiêu hợp lệ)**: $S_{target} \in [250, 990]$, bội số của 5.
- **Rule B1-02 (Thời gian học cam kết)**: $T_{daily} \in \{30, 45, 60, 90\}$ phút/ngày.
- **Rule B1-03 (Khởi tạo bản ghi hành trình)**: Tạo bản ghi `UserJourney` với trạng thái `INITIALIZING`, liên kết với `User` đang đăng nhập.

---

## B.2 · Luồng Kiểm tra Chẩn đoán Thích ứng IRT (Adaptive Diagnostic Testing Flow)

### 1. Mục tiêu & Ý nghĩa
Đánh giá chính xác năng lực khởi điểm ($S_{initial}, \theta_{LC}, \theta_{RC}$) chỉ trong 20-30 phút (50 câu hỏi) thông qua mô hình Item Response Theory 2PL thay vì phải làm trọn vẹn 200 câu.

### 2. Thuật toán chọn câu hỏi kế tiếp (Item Selection Algorithm)
- Tại bước $k$: Ước lượng năng lực hiện tại $\hat{\theta}_k$ theo phương pháp Maximum Likelihood Estimation (MLE) hoặc Expected A Posteriori (EAP).
- Chọn câu hỏi $i$ trong ngân hàng đề chưa làm sao cho Hàm thông tin Fisher $I_i(\hat{\theta}_k)$ đạt giá trị cực đại:
  $$I_i(\theta) = a_i^2 \cdot P_i(\theta) \cdot (1 - P_i(\theta))$$
  Trong đó: $P_i(\theta) = \frac{1}{1 + e^{-a_i(\theta - b_i)}}$, $a_i$ là độ phân biệt (`irtDiscrimination`), $b_i$ là độ khó (`irtDifficulty`).

### 3. Quy tắc nghiệm thu & Dừng bài thi (Stopping Criteria)
- Học viên hoàn thành đủ 50 câu (25 câu LC, 25 câu RC), HOẶC sai số chuẩn của phép đo đạt ngưỡng tin cậy cao:
  $$SE(\hat{\theta}) = \frac{1}{\sqrt{\sum_{i=1}^k I_i(\hat{\theta})}} \le 0.28$$
- Ghi nhận `thetaListening`, `thetaReading` và trích xuất vector độ thuần thục của từng vi kỹ năng `skillMasteryJson`.

---

## B.3 · Luồng Quy đổi Điểm Chuẩn hóa ETS & Chấm điểm Equating (ETS Equating & Scoring Flow)

### 1. Mục tiêu & Ý nghĩa
Đảm bảo điểm số thi thử của học viên phản ánh chính xác 100% độ khó của từng đề thi ETS thực tế, loại bỏ sai lệch do đề dễ/đề khó.

### 2. Thuật toán quy đổi Equating
- Đếm số câu đúng thô (Raw Score): $R_{LC} \in [0, 100]$, $R_{RC} \in [0, 100]$.
- Tra cứu bảng quy đổi Equating Table được cấu hình riêng cho từng mã đề:
  $$S_{LC} = \text{LookupTable}(ExamId, \text{"LC"}, R_{LC})$$
  $$S_{RC} = \text{LookupTable}(ExamId, \text{"RC"}, R_{RC})$$
  $$S_{total} = S_{LC} + S_{RC} \in [10, 990]$$
- **Xử lý đồng thời (Concurrency Control)**: Mỗi lượt chọn đáp án gửi kèm `clientSequence`. Server so sánh với `lastSequence` đã lưu trong `Attempt`:
  - Nếu `clientSequence > lastSequence`: Chấp nhận ghi nhận và cập nhật `lastSequence = clientSequence`.
  - Nếu `clientSequence \le lastSequence`: Từ chối ghi đè (Stale sequence conflict, HTTP 409).
- **Thưởng Gamification**: Cộng cố định $+15$ EXP cho mỗi câu đúng, $+100$ EXP khi hoàn thành bài thi Full Test. Toàn bộ học viên nhận cùng một tỷ lệ chuẩn (không có tỷ lệ nhân tiền Premium).

---

## B.4 · Luồng Phân bổ Nội dung Học tập Thích ứng (Adaptive Content Assembler Flow)

### 1. Mục tiêu & Ý nghĩa
Tự động lắp ghép bài giảng và bài tập mỗi ngày dựa trên điểm yếu phát hiện từ bài chẩn đoán và các thẻ từ vựng/lỗi sai đến hạn SM-2.

### 2. Quy tắc phân bổ ngân sách câu hỏi trong ngày (Daily Question Budget Allocation)
- Tổng số câu hỏi trong ngày: $N_{daily} = \text{round}(T_{daily} / 2.5)$ (ví dụ 45 phút học $
\rightarrow$ khoảng 18 câu).
- Cơ cấu thành phần:
  - 20% Ngân sách: Khởi động (Warm-up) củng cố lại kiến thức ngày hôm trước.
  - 50% Ngân sách: Luyện sâu vi kỹ năng yếu nhất (`weakestMicroSkills` có độ thành thạo thấp nhất).
  - 30% Ngân sách: Ôn tập ngắt quãng Spaced Repetition từ `MistakeNotebook`.
- **Fallback Rule**: Nếu số thẻ SM-2 đến hạn $< 30\%$ ngân sách, phần thiếu hụt được tự động chuyển dịch sang bổ sung cho các câu luyện kỹ năng yếu.

---

## B.5 · Luồng Luyện Vi mô & Vòng lặp Phản hồi Tức thì (Micro-drill & Instant Feedback Loop)

### 1. Mục tiêu & Ý nghĩa
Giúp học viên khắc phục tận gốc từng lỗ hổng ngữ pháp/từ vựng trong thời gian ngắn nhất thông qua chu kỳ: Câu hỏi $
\rightarrow$ Trả lời $
\rightarrow$ Bóc tách bản chất bẫy đề $
\rightarrow$ Ghi nhớ.

### 2. Thuật toán đo lường Telemetry
- Khi học viên bấm chọn phương án:
  - Tính thời gian phản hồi: $t_{resp} = \text{Timestamp}_{click} - \text{Timestamp}_{render}$.
  - Ghi nhận cờ đoán mò: $isGuessed$.
  - Tính tỷ lệ thời gian so với chuẩn ETS: $R_{time} = t_{resp} / (t_{standard} \times 1000)$.
- Gửi dữ liệu về backend tính toán điểm chất lượng ghi nhớ $q$ và trả về phân tích:
  - Dịch nghĩa câu văn.
  - Dấu hiệu nhận biết (Clue Words).
  - Phân tích bẫy đề thi (Trap Note).

---

## B.6 · Luồng Thi thử Mô phỏng CBT & Kiểm soát Gian lận (Full CBT Simulation & Proctoring Flow)

### 1. Mục tiêu & Ý nghĩa
Tạo môi trường thi thử nghiêm ngặt tương đương phòng thi thật của IIG/ETS, kiểm soát thời gian tuyệt đối và ngăn chặn gian lận mở nhiều cửa sổ.

### 2. Quy tắc kiểm soát phòng thi
- **Kiểm soát nhịp âm thanh ETS (Audio Cue Management)**: File âm thanh Listening được quản lý bởi `audioCuePointsJson`. Trình duyệt tự động chèn khoảng lặng chuẩn:
  - 5 giây giữa các câu của Part 1 và Part 2.
  - 8 giây giữa các bài nói của Part 3 và Part 4.
  - Không cung cấp thanh tua hoặc nút tạm dừng trong chế độ thi mô phỏng.
- **Phát hiện đa tab qua BroadcastChannel (EC-03)**:
  - Khi mở đề thi, client mở kênh `new BroadcastChannel('toeic_exam_' + sessionId)`.
  - Nếu có tab khác gửi thông điệp `CLAIM_ACTIVE_TAB`, tab cũ lập tức hiển thị overlay phong tỏa và gửi cờ cảnh báo lên server.
  - Redis duy trì phân tán khóa `exam:lock:<userId>` với TTL 30 giây được gia hạn liên tục qua Heartbeat.
- **Xử lý sập nguồn sát giờ qua BullMQ (EC-04)**:
  - Khởi tạo BullMQ delayed job với độ trễ: $T_{exam} + 5 \text{ phút dự phòng}$.
  - Nếu học viên không nộp bài khi hết giờ (do sập máy, mất điện), BullMQ Worker tự động quét bảng `AttemptDetail`, tổng hợp các câu đã autosave và hoàn tất phiên chấm điểm tự động.

---

## B.7 · Giải thuật Lặp lại Ngắt quãng Thông minh (Automated SM-2 Spaced Repetition Engine)

### 1. Mục tiêu & Ý nghĩa
Tối ưu hóa khả năng ghi nhớ dài hạn từ vựng và bẫy đề thi, tự động tính toán chất lượng nhớ $q$ mà không bắt người học phải tự đánh giá chủ quan.

### 2. Ma trận tính toán chất lượng $q$ tự động (6 Trạng thái)

| Trạng thái | Đúng/Sai ($isCorrect$) | Tốc độ ($R_{time} = t_{resp}/t_{std}$) | Cờ đoán ($isGuessed$) | Hệ số $q$ | Diễn giải sư phạm |
|------------|------------------------|----------------------------------------|-----------------------|-----------|-------------------|
| **ST-1**   | `true`                 | $R_{time} \le 1.0$                     | `false`               | **5**     | Nhớ hoàn hảo, phản xạ tức thì |
| **ST-2**   | `true`                 | $1.0 < R_{time} \le 1.5$               | `false`               | **4**     | Nhớ chính xác sau một chút do dự |
| **ST-3**   | `true`                 | $R_{time} > 1.5$                       | `false`               | **3**     | Nhớ đúng nhưng phải suy nghĩ rất lâu |
| **ST-4**   | `true`                 | Bất kỳ                                 | `true`                | **3**     | Đúng do đoán mò may mắn, cần ôn lại sớm |
| **ST-5**   | `false`                | $R_{time} > 1.0$                       | Bất kỳ                | **2**     | Nhớ sai nhưng đã có tư duy phân tích |
| **ST-6**   | `false`                | $R_{time} \le 1.0$                     | Bất kỳ                | **1**     | Hoàn toàn chưa nắm vững kiến thức |

### 3. Công thức toán học cập nhật chu kỳ SM-2
- Cập nhật hệ số dễ mới ($EF'$):
  $$EF' = \max\left(1.3, EF + \left(0.1 - (5 - q) \times (0.08 + (5 - q) \times 0.02)
\right)
\r\r\right)$$
- Cập nhật khoảng cách lặp lại ($Interval$ tính theo ngày):
  $$\text{Nếu } q < 3: \quad Repetition = 0, \quad Interval = 1$$
  $$\text{Nếu } q \ge 3: \quad Interval = \begin{cases} 1 & \text{khi } Repetition = 0 \ 6 & \text{khi } Repetition = 1 \ \text{round}(Interval_{prev} \times EF') & \text{khi } Repetition \ge 2 \end{cases}$$
  $$Repetition = Repetition + 1$$
- Ngày đến hạn tiếp theo: $nextReviewDate = currentDate + Interval \text{ (ngày)}$.

---

## B.8 · Luồng Gamification: Chuỗi ngày, Kim cương & Năng lượng (Gamification Economy Flow)

### 1. Mục tiêu & Ý nghĩa
Tạo động lực nội tại mạnh mẽ giúp học viên duy trì kỷ luật học tập hàng ngày mà không áp dụng cơ chế nạp tiền mua chuộc.

### 2. Quy tắc kinh tế trong game (100% In-Game Economy)
- **Năng lượng (Energy)**:
  - Giới hạn tối đa: 5 ⚡.
  - Tự động hồi phục: Mỗi 30 phút hồi 1 Energy khi $< 5$.
  - **Quy tắc Tiếp cận Không Paywall**: Các trạm học chính thuộc Lộ trình ngày (Core Saga Stations) và các đợt ôn tập thẻ Sổ tay SM-2 **HOÀN TOÀN KHÔNG TIÊU HAO NĂNG LƯỢNG**.
  - **Cơ chế Điều nhịp (Anti-Burnout / Well-being Pacing)**: Chỉ tiêu hao 1 Energy khi tham gia 1 trận Đấu trường 1v1 hoặc mở một phiên luyện tập tự do vô hạn ngoài lộ trình để phòng chống học dồn quá tải.
  - Mua hồi đầy ngay lập tức bằng 20 Gems kiếm được từ việc học tập thực tế (tuyệt đối không nạp tiền mặt).
- **Kim cương (Gems)**:
  - Kiếm được qua: Hoàn thành nhiệm vụ ngày (+20 đến +30 Gems), Đạt 3 sao tại trạm (+20 Gems), Thắng trận đấu trường 1v1 (+50 Gems), Tốt nghiệp lộ trình (+500 Gems).
  - Sử dụng để: Đổi Khiên bảo vệ Streak (200 Gems), Khôi phục chuỗi đã mất trong 48h (300 Gems), Mua skin ngoại trang cho Lexling (500 Gems), Hồi năng lượng chơi Đấu trường (20 Gems).
- **Chuỗi ngày học (Streak)**:
  - **Tính theo Múi giờ Địa phương (Local Timezone)**: Mốc ngày được chốt lúc **04:00 AM sáng theo múi giờ địa phương** của người học (mặc định `Asia/Ho_Chi_Minh`), được máy chủ xác thực và đồng bộ tự động.
  - Thiết kế này bảo vệ trọn vẹn quyền lợi của học viên học đêm khuya (từ 23:00 đến 03:59 sáng hôm sau) không bị tính tách đôi ngày hay đứt chuỗi vô lý.
  - Khiên bảo vệ chuỗi (Streak Shield): Tự động kích hoạt tiêu hao 1 khiên nếu người dùng vắng mặt 1 ngày. Tối đa tích trữ 3 khiên.

---

## B.9 · Luồng Tính toán Động Thời lượng Lộ trình (Dynamic Journey Duration Calculation — D ∈ [7, 30])

### 1. Mục tiêu & Ý nghĩa
Thay vì áp dụng lộ trình đóng khung 30 ngày cố định, hệ thống tự động tính toán thời lượng tối ưu $D \in [7, 30]$ ngày dựa trên khoảng cách điểm cần tăng ($\Delta S$) và cam kết thời gian học mỗi ngày ($T_{daily}$).

### 2. Công thức toán học chi tiết
- Khoảng cách điểm: $\Delta S = \max(0, S_{target} - S_{initial})$.
- Trọng số dải điểm (Band Difficulty Weight $W_{band}$): Càng ở dải điểm cao, việc tăng 100 điểm càng đòi hỏi nhiều công sức hơn:
  $$W_{band} = 1.0 + \frac{S_{initial}}{1000}$$
  *(Ví dụ: Tăng từ 300 lên 500 có $W_{band} = 1.3$; Tăng từ 700 lên 850 có $W_{band} = 1.7$).*
- Thời lượng tính toán sơ bộ ($D_{calc}$):
  $$D_{calc} = \text{round}\left(7 + \frac{\Delta S}{12} \times W_{band} \times \frac{45}{T_{daily}}
\r\r\right)$$
- Giới hạn chặn biên thực tế:
  $$D = \min(30, \max(7, D_{calc}))$$

### 3. Xử lý các trường hợp biên đặc thù
- **Trường hợp EC-09: $\Delta S \le 0$ (Điểm chẩn đoán cao hơn hoặc bằng mục tiêu)**:
  - Tự động kích hoạt **"Chế độ Luyện Tốc độ Nước rút 7 ngày" (Speed Drill Mode 7 Days)**: $D = 7$, tập trung 100% vào việc rèn luyện tốc độ xử lý Part 7 và bẫy phân loại điểm 900+.
- **Trường hợp Reality Check: $\Delta S > 180$ điểm**:
  - Tăng trên 180 điểm trong 30 ngày là phi thực tế đối với người học thông thường.
  - Hệ thống tự động phân tách lộ trình thành 2 Chặng Milestone:
    - Chặng 1 (Hiện tại): $S_{milestone\_1} = S_{initial} + 150$ điểm (thực hiện trong $D = 30$ ngày).
    - Chặng 2 (Kế tiếp): Từ $S_{milestone\_1} 
\rightarrow S_{target}$.

---

## B.10 · Luồng Lắp ráp Nội dung Bản đồ Thích ứng (Adaptive Content Assembler & Node Population)

### 1. Mục tiêu & Ý nghĩa
Sinh ra chính xác $N = 3 \times D$ trạm bài học cá nhân hóa trên Bản đồ Saga, đảm bảo phân bổ độ khó tịnh tiến mượt mà từ ngày 1 đến ngày $D$.

### 2. Thuật toán phân bổ độ khó mục tiêu theo ngày ($\theta_d$)
- Với ngày thứ $d \in [1, D]$:
  $$\theta_d = \theta_{initial} + \frac{d}{D} \times (\theta_{target} - \theta_{initial})$$
- Mỗi ngày $d$ gồm đúng 3 Node:
  - Node 1: `WARMUP` (Độ khó $\theta_d - 0.3$).
  - Node 2: `SKILL_DRILL` (Độ khó $\theta_d$, tập trung vào vi kỹ năng có `mastery` thấp nhất trong vector kỹ năng).
  - Node 3: `REVIEW_GATE` (nếu rơi vào chu kỳ 6 trạm) HOẶC `BOSS_CHALLENGE` (vào cuối ngày, độ khó $\theta_d + 0.2$).

### 3. Thuật toán Fallback khi ngân hàng câu hỏi phân mảnh (Sparse Bank Fallback)
```python
def select_questions_for_skill(skill_id, target_theta, count):
    questions = db.query(Question).filter(
        Question.skill_id == skill_id,
        Question.irt_difficulty.between(target_theta - 0.4, target_theta + 0.4)
    ).limit(count)
    
    if len(questions) < count:
        # Fallback 1: Mở rộng dải độ khó
        questions = db.query(Question).filter(Question.skill_id == skill_id).limit(count)
        
    if len(questions) < count:
        # Fallback 2: Lấy câu hỏi thuộc Taxonomy kỹ năng cha (Parent Skill)
        parent_id = db.query(SkillTaxonomy).get(skill_id).parent_id
        questions = db.query(Question).filter(Question.skill.parent_id == parent_id).limit(count)
        
    return questions
```

---

## B.11 · Luồng Tiến trình Bản đồ Saga & Mở khóa Trạm (Saga Map Progression & Node Engine)

### 1. Mục tiêu & Ý nghĩa
Điều phối trải nghiệm phiêu lưu nhập vai trên Bản đồ Saga 2.5D: tính toán tọa độ đường cong S-Curve, kiểm soát đóng/mở trạm, phân bổ quần xã sinh thái (Biomes), và thực thi luật kiểm soát Cổng Review Gate.

### 2. Sơ đồ logic mở khóa trạm
```
[Học viên hoàn thành bài tập tại Trạm k]
                   |
                   v
     [Tính toán số Sao: 0, 1, 2, hoặc 3 Sao]
                   |
        +----------+----------+
        |                     |
   Stars == 0             Stars >= 1
  (Acc < 60%)                 |
        |                     v
  [Báo thất bại]    [Trạm k là REVIEW_GATE?]
  [Yêu cầu làm lại]           |
                     +--------+--------+
                     |                 |
                   ĐÚNG              KHÔNG
                     |                 |
             [Stars >= 2 ?]            v
                     |        [Mở khóa Trạm k+1]
           +---------+---------+  [Tạo hạt sáng Path Particle]
           |                   |
         ĐÚNG                KHÔNG
           |                   |
  [Mở khóa Trạm k+1]    [Giữ khóa Trạm k+1]
  [Phát hiệu ứng Cổng]  [Yêu cầu ôn tập lại đạt 2 Sao]
```

---

## B.12 · Động cơ Tiến hóa Linh thú Guardian Lexling (Lexling Evolution Engine)

### 1. Mục tiêu & Ý nghĩa
Tạo sự gắn kết cảm xúc sâu sắc giữa người học và hành trình của mình thông qua linh thú hộ mệnh đồng hành, biến đổi hình dạng tương ứng với sự trưởng thành về năng lực TOEIC.

### 2. Quy tắc các giai đoạn tiến hóa (4 Stages)
- **Stage 1: Thể Sơ sinh (Egg / Baby Form)**:
  - Điều kiện: Khởi đầu hành trình (0% trạm hoàn thành).
  - Trạng thái tâm lý: Tò mò, vụng về, câu thoại ngắn cổ vũ tinh thần.
- **Stage 2: Thể Thiếu niên (Brave Form)**:
  - Điều kiện: Vượt qua $\lceil 0.25 \times N 
\rceil$ trạm (hoàn thành Quần xã I).
  - Trạng thái tâm lý: Nhanh nhẹn, trang bị thêm giáp nhẹ, bắt đầu nhắc nhở các bẫy ngữ pháp.
- **Stage 3: Thể Trưởng thành (Fierce Form)**:
  - Điều kiện: Vượt qua $\lceil 0.70 \times N 
\rceil$ trạm (hoàn thành Quần xã III).
  - Trạng thái tâm lý: Mạnh mẽ, có hào quang tinh thể, câu thoại sắc bén về chiến thuật giải đề nhanh.
- **Stage 4: Thể Thần thú Tối thượng (Ascended Ultimate Form)**:
  - Điều kiện: Vượt qua bài thi Tốt nghiệp chặng S-30 ($100\%$ hành trình).
  - Trạng thái: Cánh ánh sáng vĩnh cửu, được vinh danh vĩnh viễn trong Tủ trưng bày Hall of Fame của hồ sơ học viên.

---

# 5. Đặc tả Chi tiết Luồng Tích hợp Hệ thống (Integration Flows — Section C)

---

## C.1 · Luồng Toàn vẹn Vòng đời Học viên (End-to-End Learner Journey)
1. Học viên đăng ký tài khoản (S-02) $
\rightarrow$ Xác thực OTP (S-04).
2. Thiết lập mục tiêu điểm số và cam kết thời gian học $T_{daily}$ (S-05).
3. Làm bài kiểm tra Chẩn đoán thích ứng IRT 50 câu (S-06, S-07, S-08).
4. Nhận báo cáo phân tích năng lực và hệ thống tự động sinh Bản đồ Saga $3 \times D$ trạm (S-09).
5. Thực hiện chu kỳ học tập hàng ngày qua Bản đồ Saga (S-27) hoặc Nhiệm vụ ngày (S-11):
   - Làm trạm bài tập (S-28).
   - Nhận sao và xem linh thú tiến hóa (S-29).
   - Ôn tập thẻ nhớ ngắt quãng SM-2 (S-18).
6. Thi thử mô phỏng CBT định kỳ (S-12/S-13) $
\rightarrow$ Xem phân tích chuyên sâu (S-16, S-17, S-19).
7. Thi Tốt nghiệp chặng (S-30) $
\rightarrow$ Nhận Chứng chỉ số và nâng cấp linh thú lên Stage 4.

---

## C.2 · Luồng Phát Âm thanh Thời gian thực Chuẩn ETS & Kiểm soát Khoảng lặng
1. Client yêu cầu tệp âm thanh nghe qua giao thức HTTP Range Requests (`Accept-Ranges: bytes`).
2. Tệp âm thanh đính kèm siêu dữ liệu `audioCuePointsJson` chứa chính xác các mốc miligiây:
   ```json
   {
     "cuePoints": [
       { "questionNumber": 1, "startMs": 0, "audioEndMs": 14000, "silenceEndMs": 19000 },
       { "questionNumber": 2, "startMs": 19000, "audioEndMs": 31000, "silenceEndMs": 36000 }
     ]
   }
   ```
3. Bộ phát Web Audio API của client tự động dừng đếm giờ làm bài chuẩn xác 5 giây (Part 1/2) hoặc 8 giây (Part 3/4) sau khi giọng đọc dứt, tạo áp lực phòng thi chân thực 100%.

---

## C.3 · Luồng Đồng bộ Dữ liệu Ngoại tuyến & Giải quyết Xung đột (Dexie + clientSequence)
1. Khi học viên làm bài ở chế độ offline, mọi thao tác trả lời được lưu vào bảng cục bộ `Dexie.offlineAnswers` với cấu trúc:
   `{ questionId, selectedOption, clientSequence: localSeq++, timestamp }`.
2. Khi thiết bị phát hiện có kết nối mạng (`window.ononline`):
   - Kích hoạt trình phát hàng đợi `syncQueue`.
   - Gửi payload hàng loạt lên endpoint `POST /api/v1/sync/answers`.
   - Server thực thi transaction: Kiểm tra `clientSequence`. Nếu `clientSequence > currentSequence` trong CSDL, chấp nhận cập nhật; nếu không, bỏ qua bản ghi cũ để bảo toàn tính toàn vẹn dữ liệu.

---

## C.4 · Luồng Lập lịch Ôn tập Ngắt quãng SM-2 qua BullMQ Queue
1. Mỗi khi người dùng hoàn thành một thẻ ôn tập hoặc làm sai câu hỏi mới trong hệ thống:
   - Bản ghi `MistakeNotebook` được cập nhật `nextReviewDate`.
2. Hàng ngày vào lúc 01:00 UTC, một BullMQ Cron Job `sm2-daily-aggregator` tự động quét cơ sở dữ liệu:
   - Lọc toàn bộ các bản ghi có `nextReviewDate <= CURRENT_DATE`.
   - Tổng hợp số lượng thẻ đến hạn và cập nhật trường `dueNotebookItemsCount` trên bảng `UserStatistics`.
   - Gửi sự kiện Web Push Notification thông báo đến thiết bị học viên: "Bạn có {count} thẻ kiến thức cần củng cố hôm nay!".

---

## C.5 · Luồng Đồng bộ Bảng Xếp hạng Tuần qua Redis Sorted Sets & WebSocket
1. Mỗi khi học viên tích lũy EXP từ bài học:
   - Server gọi lệnh Redis atomic: `ZINCRBY leaderboard:league:<leagueId> <expGained> <userId>`.
2. WebSocket Server định kỳ mỗi 5 giây phát thông báo cập nhật Top 10 đến kênh phòng của giải đấu:
   `broadcastToRoom("league_" + leagueId, { topEntries, userCurrentRank })`.
3. Đúng 23:59:59 Chủ Nhật hàng tuần:
   - Worker chạy batch phân loại Top 5 thăng hạng, Top 5 rớt hạng.
   - Chuyển `userId` sang key giải đấu mới trong Redis.
   - Thưởng Gems vào tài khoản người dùng tương ứng.

---

## C.6 · Luồng Trích xuất & Phân nhóm Lỗ hổng Kiến thức Tự động (AI Weakness Pipeline)
1. Khi học viên tích lũy đủ 100 câu trả lời trong hệ thống:
   - Hệ thống kích hoạt pipeline phân tích thống kê năng lực.
   - Gom cụm các câu trả lời sai theo phân cấp `SkillTaxonomy`.
   - Tính toán tỷ lệ sai cục bộ $ErrorRate(Skill) = n_{incorrect} / n_{total}$.
   - Tự động gán nhãn mức độ nghiêm trọng: `CRITICAL` (Sai $\ge 50\%$), `WARNING` (Sai $30\% - 49\%$), `STABLE` (Sai $< 30\%$).
   - Nạp kết quả vào bảng `DiagnosticProfile.skillMasteryJson` để cấp nguyên liệu cho Động cơ Lắp ráp Nội dung thích ứng B.10.

---

## C.7 · Luồng Tải trước Âm thanh Dự phòng qua Service Worker (Audio Pre-caching)
1. Khi học viên truy cập vào bài thi thử S-12 hoặc bắt đầu một chặng bản đồ S-27:
   - Service Worker chạy ngầm lệnh `caches.open('toeic-audio-v1')`.
   - Gửi yêu cầu nạp trước (Pre-fetch) danh mục file âm thanh chất lượng cao của bài thi vào bộ nhớ đệm Cache API của trình duyệt.
2. Khi trình phát audio kích hoạt, Service Worker đánh chặn yêu cầu mạng `fetch(audioUrl)`:
   - Nếu mạng thông suốt: Tải stream bình thường từ CDN.
   - Nếu phát hiện mất kết nối (`navigator.onLine === false`) hoặc request timeout $> 3000$ ms: Lập tức trả về luồng âm thanh từ Cache API. Đảm bảo bài thi không bị dừng đột ngột giữa chừng.

---

## C.8 · Luồng Bảo vệ Phòng thi Đa tab & Đồng bộ Nhịp tim Heartbeat (BroadcastChannel)
1. Khi vào phòng thi CBT, client tạo kết nối:
   - Local: `const channel = new BroadcastChannel('toeic_exam_' + examId)`.
   - Remote: Gửi heartbeat định kỳ mỗi 15 giây lên server `POST /api/v1/exams/sessions/{id}/heartbeats`.
2. Nếu học viên cố tình mở tab thứ 2 trong cùng trình duyệt:
   - Tab 2 phát thông điệp `PING_EXAM_SESSION` trên BroadcastChannel.
   - Tab 1 phản hồi `SESSION_ALREADY_ACTIVE`.
   - Tab 2 lập tức khóa màn hình kèm thông báo vi phạm EC-03 và từ chối khởi tạo giao diện làm bài.
3. Server duy trì khóa Redis `SET exam:session:<userId> <sessionId> EX 45 NX`. Nếu không nhận được heartbeat sau 45 giây, khóa tự động giải phóng để hỗ trợ trường hợp học viên đổi máy khi gặp sự cố phần cứng.

---

## C.9 · Luồng Vượt trạm Ngoại tuyến & Đồng bộ Cục bộ (Offline Saga Node Sync)
1. Toàn bộ cấu trúc câu hỏi của trạm `CURRENT` được tải sẵn vào bộ nhớ Dexie ngay khi mở bản đồ.
2. Khi học viên làm bài trên xe buýt hoặc khu vực mất sóng:
   - Client tự tính toán tỷ lệ đúng, tốc độ và cấp số Sao (1-3 sao) tạm thời cục bộ.
   - Cho phép học viên xem màn hình kết quả S-29 và tiếp tục mở khóa trạm kế tiếp trong bộ nhớ đệm.
   - Đóng gói toàn bộ kết quả vào hàng đợi `Dexie.pendingNodeCompletions`.
3. Khi có kết nối mạng:
   - Hệ thống tự động đẩy gói dữ liệu lên `POST /api/v1/nodes/{id}/offline-completions`.
   - Server kiểm chứng chữ ký dữ liệu, cập nhật bảng `UserNodeProgress` và đồng bộ số Gems/EXP chính thức vào cơ sở dữ liệu.

---

# 6. Đặc tả Chi tiết Luồng API Hệ thống (API Flows — Section D)

---

## D.1 · Luồng Xác thực & Vòng đời Mã truy cập (Auth & Token Lifecycle Flow)

| Bước | Client (Frontend) | Server (Backend API) | Cơ sở dữ liệu / Redis | Mã phản hồi |
|------|-------------------|----------------------|-----------------------|-------------|
| 1 | `POST /api/v1/auth/login` kèm email/mật khẩu | Kiểm tra hash argon2id | Truy vấn bảng `User` | 200 OK / 401 Unauthorized |
| 2 | Nhận Access Token (JWT 15m) & Refresh Token (Cookie HttpOnly 30d) | Ký token với RSA private key | Lưu phiên vào Redis `session:<userId>` | 200 OK |
| 3 | Gửi Access Token trong header `Authorization: Bearer <token>` | Xác thực chữ ký public key | Kiểm tra danh sách đen token trong Redis | 200 OK / 401 Token Expired |
| 4 | Khi Access Token hết hạn $
\rightarrow$ gọi `POST /api/v1/auth/refresh` | Xác thực Refresh Token trong cookie | Đổi mã mới (Token Rotation), thu hồi mã cũ | 200 OK / 403 Forbidden |
| 5 | `POST /api/v1/auth/logout` | Thu hồi Refresh Token | Xóa phiên Redis, thêm Access Token vào blacklist | 200 OK |

---

## D.2 · Luồng Phiên thi CBT & Heartbeat Đồng bộ (CBT Session & Concurrency Flow)

| Bước | Client (Frontend) | Server (Backend API) | Cơ sở dữ liệu / Redis | Mã phản hồi |
|------|-------------------|----------------------|-----------------------|-------------|
| 1 | `POST /api/v1/exams/sessions` kèm `examId`, `deviceId` | Khởi tạo phiên làm bài | Tạo `Attempt`, đặt Redis lock `exam:lock:<userId>` | 201 Created |
| 2 | Định kỳ mỗi 15s: `POST /api/v1/exams/sessions/{id}/heartbeats` | Cập nhật đồng hồ còn lại | Gia hạn TTL 45s trên Redis key | 200 OK |
| 3 | Khi chọn đáp án: `PUT /api/v1/exams/sessions/{id}/answers` kèm `clientSequence` | So sánh `clientSequence` với bản ghi | Cập nhật `AttemptDetail` nếu chuỗi tuần tự mới hơn | 200 OK / 409 Stale Sequence |
| 4 | Khi hết giờ hoặc bấm nộp: `POST /api/v1/exams/sessions/{id}/submissions` | Tính điểm theo Bảng Equating | Cập nhật `Attempt.totalScore`, giải phóng Redis lock | 200 OK |

---

## D.3 · Luồng Sinh Đề & Chấm điểm Chẩn đoán Thích ứng IRT (Adaptive Diagnostic Flow)

| Bước | Client (Frontend) | Server (Backend API) | Cơ sở dữ liệu / Redis | Mã phản hồi |
|------|-------------------|----------------------|-----------------------|-------------|
| 1 | `POST /api/v1/diagnostic/attempts` | Khởi tạo vector năng lực $\theta = 0.0$ | Tạo `Attempt` loại `DIAGNOSTIC` | 201 Created |
| 2 | Nhận câu hỏi đầu tiên có độ khó trung bình ($b \approx 0$) | Lấy câu hỏi tối đa hóa thông tin Fisher | Truy vấn bảng `Question` | 200 OK |
| 3 | `POST /api/v1/diagnostic/attempts/{attemptId}/answers` kèm đáp án và thời gian | Ước lượng lại $\hat{\theta}$, chọn câu kế tiếp | Cập nhật `AttemptDetail`, tính EAP theta | 200 OK |
| 4 | Sau 50 câu: `POST /api/v1/diagnostic/attempts/{attemptId}/completion` | Quy đổi $\theta$ sang thang điểm TOEIC | Ghi `DiagnosticProfile`, kích hoạt sinh Saga Map | 200 OK |

---

## D.4 · Luồng Vi đo lường Luyện tập Tức thì (Micro-drill Telemetry Flow)

| Bước | Client (Frontend) | Server (Backend API) | Cơ sở dữ liệu / Redis | Mã phản hồi |
|------|-------------------|----------------------|-----------------------|-------------|
| 1 | `GET /api/v1/skills/{skillId}/drills` | Tải 5-10 câu hỏi theo vi kỹ năng | Truy vấn `QuestionSkillAssignment` | 200 OK |
| 2 | `POST /api/v1/skills/{skillId}/drills/answers` kèm `timeSpentMs`, `isGuessed` | Tính tự động hệ số $q \in [1, 5]$ | Lưu `AttemptDetail`, cập nhật `SkillMastery` | 200 OK |
| 3 | Nhận phân tích tức thì: Dịch nghĩa, Từ khóa, Bẫy ETS | Trả về giải thích chi tiết | Đọc từ bảng `Question` | 200 OK |
| 4 | Tự động đồng bộ câu sai vào sổ tay | Tạo bản ghi SM-2 khởi điểm | Thêm bản ghi `MistakeNotebook` | 201 Created |

---

## D.5 · Luồng Toàn vẹn Vòng đời Bản đồ Saga (Saga Journey Map Lifecycle Flow)

| Bước | Client (Frontend) | Server (Backend API) | Cơ sở dữ liệu / Redis | Mã phản hồi |
|------|-------------------|----------------------|-----------------------|-------------|
| 1 | `POST /api/v1/journeys/{journeyId}/maps` kèm `journeyId` | Tính $D \in [7, 30]$, sinh $3 \times D$ nodes | Sinh hàng loạt bảng `MapNode`, phân bổ 4 Biomes | 201 Created |
| 2 | `GET /api/v1/journeys/{journeyId}/maps` | Tải toàn bộ cấu trúc bản đồ và tọa độ | Truy vấn `MapNode`, `UserNodeProgress` | 200 OK |
| 3 | `POST /api/v1/nodes/{id}/attempts` | Kiểm tra điều kiện mở khóa | Cập nhật trạng thái node sang `IN_PROGRESS` | 200 OK / 403 Locked |
| 4 | `POST /api/v1/nodes/{id}/attempts/{attemptId}/answers` | Ghi nhận đáp án câu hỏi | Cập nhật `AttemptDetail` của trạm | 200 OK |
| 5 | `POST /api/v1/nodes/{id}/attempts/{attemptId}/completion` | Tính thuật toán 3 Sao, mở trạm tiếp | Cập nhật `UserNodeProgress`, kiểm tra tiến hóa Lexling | 200 OK |
| 6 | Khi chạm node cuối: `POST /api/v1/journeys/{journeyId}/exit-exam/attempts/{attemptId}/submissions` | Đánh giá so với mục tiêu ban đầu | Cấp chứng chỉ số, thăng cấp Lexling Stage 4 | 200 OK |

---

## D.6 · Luồng Đo lường Ôn tập Sổ tay Ngắt quãng SM-2 (Automated SM-2 Review Flow)

| Bước | Client (Frontend) | Server (Backend API) | Cơ sở dữ liệu / Redis | Mã phản hồi |
|------|-------------------|----------------------|-----------------------|-------------|
| 1 | `GET /api/v1/notebook/due` | Lấy danh sách thẻ có `nextReviewDate <= Now` | Truy vấn `MistakeNotebook` kèm `limit: 20` | 200 OK |
| 2 | `POST /api/v1/notebook/reviews` kèm `notebookId`, `timeSpentMs`, `isGuessed` | Áp dụng ma trận 6 trạng thái tính $q$ | Cập nhật $EF'$, $Interval$, $nextReviewDate$ | 200 OK |
| 3 | Nhận chu kỳ ôn tập kế tiếp (ví dụ: Hẹn gặp sau 6 ngày) | Lưu vào bảng lịch sử | Tạo bản ghi `ReviewHistory` | 200 OK |

---

# 7. Cấu trúc Cơ sở Dữ liệu Toàn diện (Prisma Schema & Data Models)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// --------------------------------------------------------
// ENUMS HỆ THỐNG
// --------------------------------------------------------

enum Role {
  STUDENT
  CONTENT_CREATOR
  ADMIN
  SUPER_ADMIN
}

enum JourneyStatus {
  INITIALIZING
  ACTIVE
  COMPLETED
  DORMANT
  RESET
}

enum JourneyMode {
  STANDARD
  MILESTONE
  SPEED_DRILL
}

enum MapNodeType {
  WARMUP
  SKILL_DRILL
  REVIEW_GATE
  DAILY_BOSS
  FINAL_EXAM
  BOSS_CHALLENGE // Tương thích ngược với DAILY_BOSS
}

enum NodeStatus {
  LOCKED
  CURRENT
  IN_PROGRESS
  COMPLETED
}

enum BiomeTheme {
  SUNRISE_VALLEY  // 0% - 25% tiến trình
  ECHO_FOREST     // 26% - 50% tiến trình
  GRAMMAR_CANYON  // 51% - 75% tiến trình
  APEX_SUMMIT     // 76% - 100% tiến trình
}

enum ExamMode {
  FULL_SIMULATION
  MINI_TEST
  DIAGNOSTIC
  PRACTICE_PART
  EXIT_EXAM
}

enum AttemptStatus {
  IN_PROGRESS
  SUBMITTED
  FORCE_SUBMITTED
  ABANDONED
}

enum LeagueTier {
  BRONZE
  SILVER
  GOLD
  DIAMOND
  MASTER
}

// --------------------------------------------------------
// BẢNG NGƯỜI DÙNG & HỒ SƠ
// --------------------------------------------------------

model User {
  id               String          @id @default(uuid())
  email            String          @unique
  passwordHash     String
  name             String
  avatarUrl        String?
  role             Role            @default(STUDENT)
  isEmailVerified  Boolean         @default(false)
  level            Int             @default(1)
  totalExp         Int             @default(0)
  timezone         String          @default("UTC") // Chuẩn UTC đối soát múi giờ
  deletedAt        DateTime?       // Soft-delete pattern
  createdAt        DateTime        @default(now())
  updatedAt        DateTime        @updatedAt

  journeys         UserJourney[]
  diagnosticProfile DiagnosticProfile?
  attempts         Attempt[]
  mistakes         MistakeNotebook[]
  gamification     GamificationState?
  dailyQuests      UserDailyQuest[]
  arenaMatches     ArenaParticipant[]
  inventory        UserInventory[]
  badges           UserBadge[]
  certificates     Certificate[]
  settings         UserSettings?

  @@index([email])
  @@index([role, createdAt])
}

model UserSettings {
  id                  String   @id @default(uuid())
  userId              String   @unique
  user                User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  audioSpeed          Float    @default(1.0)
  autoPlayAudio       Boolean  @default(true)
  dailyReminderTime   String   @default("20:00")
  enableWebPush       Boolean  @default(true)
  theme               String   @default("SYSTEM")
  focusModeDefault    Boolean  @default(false)
}

// --------------------------------------------------------
// BẢNG HÀNH TRÌNH, LỘ TRÌNH SAGA & LINH THÚ
// --------------------------------------------------------

model UserJourney {
  id                  String         @id @default(uuid())
  userId              String
  user                User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  targetScore         Int
  initialScore        Int?
  predictedScore      Int?
  dailyCommitMinutes  Int            @default(45)
  durationDays        Int            @default(16)
  currentDay          Int            @default(1)
  status              JourneyStatus  @default(ACTIVE)
  mode                JourneyMode    @default(STANDARD)
  activeNodeId        String?
  createdAt           DateTime       @default(now())
  updatedAt           DateTime       @updatedAt

  nodes               MapNode[]
  guardian            GuardianLexling?

  @@index([userId, status])
}

model GuardianLexling {
  id                  String       @id @default(uuid())
  journeyId           String       @unique
  journey             UserJourney  @relation(fields: [journeyId], references: [id], onDelete: Cascade)
  name                String       @default("Sparky")
  stage               Int          @default(1) // 1: Baby, 2: Brave, 3: Fierce, 4: Ascended
  spriteUrl           String
  evolutionProgress   Float        @default(0.0)
  updatedAt           DateTime     @updatedAt
}

model MapNode {
  id                  String       @id @default(uuid())
  journeyId           String
  journey             UserJourney  @relation(fields: [journeyId], references: [id], onDelete: Cascade)
  dayIndex            Int
  nodeIndex           Int
  nodeType            MapNodeType
  title               String
  coordXPercent       Float        // Tọa độ S-Curve
  coordYIndex         Int
  biomeTheme          BiomeTheme
  targetPart          Int
  targetSkillId       String?
  questionCount       Int          @default(10)
  minStarsRequired    Int          @default(1) // Đối với REVIEW_GATE là 2
  status              NodeStatus   @default(LOCKED)
  createdAt           DateTime     @default(now())

  progress            UserNodeProgress?

  @@unique([journeyId, nodeIndex])
  @@index([journeyId, status])
  @@index([journeyId, dayIndex])
}

model UserNodeProgress {
  id                  String       @id @default(uuid())
  nodeId              String       @unique
  node                MapNode      @relation(fields: [nodeId], references: [id], onDelete: Cascade)
  starsEarned         Int          @default(0) // 0-3 sao
  bestAccuracy        Float?
  totalAttempts       Int          @default(0)
  bestDurationSeconds Int?
  isCompleted         Boolean      @default(false)
  lastCompletedAt     DateTime?
}

model DiagnosticProfile {
  id                  String   @id @default(uuid())
  userId              String   @unique
  user                User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  overallScore        Int
  listeningScore      Int
  readingScore        Int
  thetaListening      Float    // Khảo thí IRT 2PL
  thetaReading        Float
  skillMasteryJson    Json     // Vector độ thành thạo vi kỹ năng
  testedAt            DateTime @default(now())
}

// --------------------------------------------------------
// BẢNG NGÂN HÀNG CÂU HỎI & ĐỀ THI ETS
// --------------------------------------------------------

model Exam {
  id                  String       @id @default(uuid())
  code                String       @unique
  title               String
  description         String?
  totalQuestions      Int          @default(200)
  timeLimitMinutes    Int          @default(120)
  equatingTableJson   Json         // Bảng quy đổi điểm ETS chính thức
  audioManifestJson   Json?        // Danh mục tệp âm thanh nghe
  isPublished         Boolean      @default(false)
  createdAt           DateTime     @default(now())

  stimulusGroups      StimulusGroup[]
  questions           Question[]
  attempts            Attempt[]
}

model StimulusGroup {
  id                  String       @id @default(uuid())
  examId              String?
  exam                Exam?        @relation(fields: [examId], references: [id], onDelete: Cascade)
  partNumber          Int
  passageText         String?      @db.Text
  imageUrl            String?
  audioUrl            String?
  audioCuePointsJson  Json?        // Mốc mili-giây chuẩn ETS: [{qIndex, startMs, endMs}]
  audioCueTimestamps  Json?        // Chuẩn âm thanh ETS: { introEndMs, questionCueTimestamps: [{ qId, startMs, endMs, intervalMs }] }
  
  questions           Question[]
}

model Question {
  id                  String       @id @default(uuid())
  examId              String?
  exam                Exam?        @relation(fields: [examId], references: [id], onDelete: Cascade)
  stimulusGroupId     String?
  stimulusGroup       StimulusGroup? @relation(fields: [stimulusGroupId], references: [id], onDelete: SetNull)
  partNumber          Int
  questionNumber      Int
  questionText        String?      @db.Text
  clozeIndex          Int?         // Vị trí điền từ trong Part 6
  explanation         String?      @db.Text
  trapNote            String?      @db.Text
  clueWordsJson       Json?
  irtDifficulty       Float        @default(0.0) // Tham số b (-3.0 đến +3.0)
  irtDiscrimination   Float        @default(1.0) // Tham số a (0.2 đến 2.5)
  isDeleted           Boolean      @default(false)

  options             Option[]
  skills              QuestionSkillAssignment[]
  attemptDetails      AttemptDetail[]
  notebookItems       MistakeNotebook[]

  @@index([partNumber, irtDifficulty])
  @@index([examId, partNumber, questionNumber])
  @@index([stimulusGroupId])
}

model Option {
  id                  String       @id @default(uuid())
  questionId          String
  question            Question     @relation(fields: [questionId], references: [id], onDelete: Cascade)
  label               String       // "A", "B", "C", "D"
  text                String?      @db.Text
  transcript          String?      @db.Text // Cho Part 2 review
  isCorrect           Boolean      @default(false)

  @@unique([questionId, label])
}

model SkillTaxonomy {
  id                  String       @id // e.g. "RC_TENSE_PERFECT"
  partNumber          Int
  name                String
  description         String?
  parentId            String?
  parent              SkillTaxonomy? @relation("TaxonomyTree", fields: [parentId], references: [id])
  children            SkillTaxonomy[] @relation("TaxonomyTree")

  questions           QuestionSkillAssignment[]
}

model QuestionSkillAssignment {
  id                  String        @id @default(uuid())
  questionId          String
  question            Question      @relation(fields: [questionId], references: [id], onDelete: Cascade)
  skillId             String
  skill               SkillTaxonomy @relation(fields: [skillId], references: [id], onDelete: Cascade)
  weight              Float         @default(1.0)

  @@unique([questionId, skillId])
}

// --------------------------------------------------------
// BẢNG BÀI THI & CHI TIẾT BÀI LÀM (ATTEMPTS & TELEMETRY)
// --------------------------------------------------------

model Attempt {
  id                  String         @id @default(uuid())
  userId              String
  user                User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  examId              String?
  exam                Exam?          @relation(fields: [examId], references: [id], onDelete: SetNull)
  mode                ExamMode
  status              AttemptStatus  @default(IN_PROGRESS)
  totalScore          Int?
  listeningScore      Int?
  readingScore        Int?
  totalDurationSeconds Int           @default(0)
  lastSequence        Int            @default(0) // Concurrency sequence check
  autoSubmitted       Boolean        @default(false) // Đánh dấu thu bài tự động quá hạn
  integrityHash       String?        // Mã hash xác thực tính toàn vẹn bài thi
  startedAt           DateTime       @default(now())
  completedAt         DateTime?

  details             AttemptDetail[]

  @@index([userId, status])
  @@index([userId, mode, startedAt(sort: Desc)])
  @@index([examId, status])
}

model AttemptDetail {
  id                  String       @id @default(uuid())
  attemptId           String
  attempt             Attempt      @relation(fields: [attemptId], references: [id], onDelete: Cascade)
  questionId          String
  question            Question     @relation(fields: [questionId], references: [id], onDelete: Cascade)
  selectedOption      String?      // "A", "B", "C", "D"
  isCorrect           Boolean      @default(false)
  isFlagged           Boolean      @default(false)
  isGuessed           Boolean      @default(false)
  timeSpentMs         Int          @default(0)
  clientSequence      Int          @default(1) // Số phiên bản tăng đơn điệu chống tranh chấp
  answeredAt          DateTime     @default(now())

  @@unique([attemptId, questionId])
  @@index([attemptId, clientSequence])
  @@index([questionId, isCorrect])
}

// --------------------------------------------------------
// BẢNG SỔ TAY LỖI SAI & SM-2 SPACED REPETITION
// --------------------------------------------------------

model MistakeNotebook {
  id                  String       @id @default(uuid())
  userId              String
  user                User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  questionId          String
  question            Question     @relation(fields: [questionId], references: [id], onDelete: Cascade)
  easinessFactor      Float        @default(2.5) // EF trong SM-2
  repetitionNumber    Int          @default(0)   // Số lần ôn đạt chuẩn
  intervalDays        Int          @default(1)   // Khoảng cách ngày lặp
  nextReviewDate      DateTime     @default(now())
  createdAt           DateTime     @default(now())
  updatedAt           DateTime     @updatedAt

  reviews             ReviewHistory[]

  @@unique([userId, questionId])
  @@index([userId, nextReviewDate])
}

model ReviewHistory {
  id                  String          @id @default(uuid())
  notebookId          String
  notebook            MistakeNotebook @relation(fields: [notebookId], references: [id], onDelete: Cascade)
  calculatedQuality   Int             // SM-2 q in [0, 5] dựa trên isCorrect, R_time, isGuessed
  timeSpentMs         Int
  isCorrect           Boolean
  reviewedAt          DateTime        @default(now())
}

// --------------------------------------------------------
// BẢNG GAMIFICATION, KHO VẬT PHẨM & CHỨNG NHẬN
// --------------------------------------------------------

model GamificationState {
  id                    String     @id @default(uuid())
  userId                String     @unique
  user                  User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  gems                  Int        @default(50)  // 100% In-Game currency
  energy                Int        @default(5)   // Max 5
  lastEnergyRefill      DateTime   @default(now())
  currentStreak         Int        @default(0)
  maxStreak             Int        @default(0)
  activeShieldCount     Int        @default(0)   // Max 3
  lastActivityDateUtc   DateTime?
  dailyDrillGemsEarned  Int        @default(0)   // Trần cày cuốc (Anti-Grinding Cap: tối đa 30 Gems/ngày)
  lastDrillGemsResetUtc DateTime?  // Mốc reset trần Gems theo UTC
  leagueTier            LeagueTier @default(BRONZE)
  weeklyExp             Int        @default(0)
}

model ShopItem {
  id                  String       @id
  title               String
  description         String
  category            String       // "BOOSTER", "COSMETIC", "EBOOK"
  gemsPrice           Int
  imageUrl            String
  isAvailable         Boolean      @default(true)
}

model UserInventory {
  id                  String       @id @default(uuid())
  userId              String
  user                User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  itemId              String
  quantity            Int          @default(1)
  purchasedAt         DateTime     @default(now())
}

model UserBadge {
  id                  String       @id @default(uuid())
  userId              String
  user                User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  badgeCode           String
  title               String
  unlockedAt          DateTime     @default(now())

  @@unique([userId, badgeCode])
}

model Certificate {
  id                  String       @id @default(uuid())
  certificateCode     String       @unique
  userId              String
  user                User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  title               String
  scoreAchieved       Int
  issuedAt            DateTime     @default(now())
  pdfUrl              String
}

// --------------------------------------------------------
// BẢNG NHIỆM VỤ HÀNG NGÀY (DAILY QUESTS)
// --------------------------------------------------------

model DailyQuest {
  id                  String          @id @default(uuid())
  code                String          @unique // e.g. "QUEST_COMPLETE_1_NODE"
  title               String
  description         String
  targetCount         Int             @default(1)
  rewardGems          Int             @default(10)
  rewardExp           Int             @default(50)
  isActive            Boolean         @default(true)
  createdAt           DateTime        @default(now())

  userQuests          UserDailyQuest[]
}

model UserDailyQuest {
  id                  String          @id @default(uuid())
  userId              String
  user                User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  questId             String
  quest               DailyQuest      @relation(fields: [questId], references: [id], onDelete: Cascade)
  assignedDate        DateTime        @db.Date
  currentCount        Int             @default(0)
  isCompleted         Boolean         @default(false)
  isClaimed           Boolean         @default(false)
  claimedAt           DateTime?

  @@unique([userId, questId, assignedDate])
  @@index([userId, assignedDate])
}

// --------------------------------------------------------
// BẢNG ĐẤU TRƯỜNG ĐỐI KHÁNG THỜI GIAN THỰC (ARENA 1V1)
// --------------------------------------------------------

enum MatchStatus {
  WAITING
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

model ArenaMatch {
  id                  String             @id @default(uuid())
  status              MatchStatus        @default(WAITING)
  examId              String?
  exam                Exam?              @relation(fields: [examId], references: [id], onDelete: SetNull)
  timeLimitSec        Int                @default(90)
  totalQuestions      Int                @default(10)
  startedAt           DateTime?
  endedAt             DateTime?
  createdAt           DateTime           @default(now())

  participants        ArenaParticipant[]

  @@index([status, createdAt])
}

model ArenaParticipant {
  id                  String             @id @default(uuid())
  matchId             String
  match               ArenaMatch         @relation(fields: [matchId], references: [id], onDelete: Cascade)
  userId              String
  user                User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  score               Int                @default(0)
  correctCount        Int                @default(0)
  mmrDelta            Int                @default(0)
  isWinner            Boolean            @default(false)
  joinedAt            DateTime           @default(now())

  @@unique([matchId, userId])
  @@index([userId])
}
```

---

# 8. Ma trận Xử lý Biên Hệ thống (Edge Case Matrix — EC-01 → EC-11)

| Mã | Tình huống Ngoại lệ | Cơ chế Phát hiện | Giải pháp Kiến trúc & Kỹ thuật | Phản hồi UI phía Học viên | Cơ chế Dự phòng (Fallback) |
|----|---------------------|-------------------|---------------------------------|---------------------------|----------------------------|
| **EC-01** | Mất tín hiệu tệp âm thanh Streaming khi thi Listening | Lắng nghe sự kiện `HTML5Audio.onError` hoặc fetch timeout $> 3000$ ms | Service Worker tự động nạp luồng âm thanh từ Cache Storage offline | Biểu tượng sóng âm thanh chuyển nhẹ sang vàng, âm thanh tiếp tục phát không ngắt quãng | Nếu cache hỏng: Tự động chuyển sang CDN server phụ |
| **EC-02** | Học viên vô tình bấm nút Back của trình duyệt khi đang thi | Bắt sự kiện `window.onpopstate` | Intercept sự kiện, gọi `history.pushState(null, document.title, location.href)` | Hiển thị Dialog cảnh báo toàn màn hình: "Rời khỏi màn hình sẽ tạm dừng bài thi! Bạn có chắc muốn thoát?" | Nếu người dùng cố tình đóng tab: Trạng thái bài thi vẫn được bảo lưu qua autosave |
| **EC-03** | Mở bài thi đồng thời trên 2 tab hoặc 2 thiết bị | `BroadcastChannel` phát hiện phiên trùng + Redis lock `exam:session:<userId>` | Tab mới gửi thông điệp yêu cầu sở hữu phiên. Redis từ chối cấp quyền | Tab 2 hiển thị màn hình khóa: "Bài thi đang mở ở tab khác. Cửa sổ này bị phong tỏa để tránh xung đột" | Cho phép bấm nút "Chuyển phiên làm bài sang thiết bị này" (vô hiệu hóa tab cũ) |
| **EC-04** | Sập nguồn/Tắt máy đột ngột khi còn dưới 10 giây làm bài | Worker BullMQ quét các `Attempt` quá hạn chưa nộp | BullMQ tạo delayed job $T_{exam} + 5$ phút tự động gọi hàm chấm điểm tổng hợp | Khi học viên mở lại máy: Thấy bài thi đã được chấm điểm hoàn tất ở màn hình Kết quả | Tính điểm dựa trên tất cả các câu hỏi đã kịp autosave với `clientSequence` |
| **EC-05** | Học viên cố tình đổi giờ hệ thống trên máy tính để hack Streak | So sánh thời gian client với Server local timezone của user (`Asia/Ho_Chi_Minh`) | Mốc ngày được chốt lúc 04:00 AM sáng theo múi giờ địa phương của người học, được máy chủ tính toán và lưu vết độc quyền (`timezone` do tài khoản cấu hình, mặc định `Asia/Ho_Chi_Minh`). Giúp các phiên học khuya (đến 03:59 AM) vẫn thuộc chuỗi ngày hôm trước | Hiển thị thông báo: "Thời gian chuỗi ngày học được đồng bộ theo mốc 04:00 AM giờ địa phương của bạn" | Không cho phép client gửi bất kỳ tham số ngày tháng nào lên API chuỗi ngày |
| **EC-06** | Mất mạng Internet đúng lúc bấm nút Nộp bài thi | Bắt lỗi `fetch NetworkError` hoặc `navigator.onLine === false` | Client lưu toàn bộ payload nộp bài vào `Dexie.pendingSubmissions`, kích hoạt Exponential Backoff (5s, 10s, 30s) | Modal hiển thị: "Mất kết nối mạng! Đang tự động lưu bài thi vào bộ nhớ máy, vui lòng không tắt trình duyệt..." | Nút bấm "Xuất tệp bài làm mã hóa .toeic" để học viên gửi thủ công nếu mạng mất lâu |
| **EC-07** | Nhấp đúp chuột liên tục vào nút Nhận thưởng nhiệm vụ/Gems | Kiểm tra mã `Idempotency-Key` trên HTTP Header | Redis thực thi `SETNX idempotency:<key> 1 EX 10`. PostgreSQL chạy transaction trừ/cộng nguyên tử | Nút bấm bị vô hiệu hóa (disabled + spinner) ngay sau cú click đầu tiên | Trả về kết quả của giao dịch đầu tiên kèm HTTP 200, ngăn chặn việc nhân bản Gems |
| **EC-08** | Học viên nghỉ học nhiều ngày (Dormant Learner quay lại sau >7 ngày) | So sánh `lastActivityDate` với thời điểm hiện tại $> 7$ ngày | Giữ nguyên tọa độ trạm `CURRENT` trên Saga Map. Không xóa tiến độ. Thuật toán SM-2 giới hạn tải tối đa 20 thẻ ưu tiên | Banner chúc mừng: "Mừng bạn quay lại! Lộ trình đã được tối ưu lại nhẹ nhàng cho ngày đầu khởi động." | Tự động phân bổ lại các thẻ lỗi sai dồn ứ chia đều cho các ngày học tiếp theo |
| **EC-09** | Điểm chẩn đoán cao hơn điểm mục tiêu ($\Delta S \le 0$) | Tính $\Delta S = S_{target} - S_{initial} \le 0$ | Kích hoạt tự động **Chế độ Luyện Tốc độ Nước rút 7 ngày (Speed Drill Mode 7 Days)** | Popup chúc mừng: "Nền tảng của bạn đã vượt mốc mục tiêu! Hãy tham gia lộ trình 7 ngày nước rút săn điểm 900+." | Thiết lập $D = 7$, tập trung 100% vào Part 7 và bẫy phân loại nâng cao |
| **EC-10** | Ngân hàng đề thi bị thiếu câu hỏi cho một tiểu kỹ năng hiếm | Truy vấn ngân hàng trả về số lượng câu hỏi $< n_{target}$ | Thuật toán Fallback tự động truy vấn mở rộng dải độ khó $
\rightarrow$ Fallback lấy câu hỏi thuộc Kỹ năng cha (Parent Skill) | Học viên làm bài bình thường không hề hay biết sự phân mảnh dữ liệu | Hệ thống tự động ghi log cảnh báo để Ban chuyên môn bổ sung câu hỏi vào kho |
| **EC-11** | Hoàn thành trạm bài học Saga Map khi đang ngoại tuyến | Client phát hiện mất mạng trong quá trình gọi `/nodes/:id/complete` | Client tự động chấm điểm theo thuật toán 3 Sao cục bộ, mở khóa trạm tiếp theo trên Dexie, lưu vào `syncQueue` | Hiển thị màn hình Kết quả S-29 bình thường kèm nhãn nhỏ: "Đã lưu offline — Sẽ đồng bộ khi có mạng" | Khi có kết nối mạng: Tự động gửi gói hoàn thành lên server, cập nhật lại Gems/EXP |

---

# 9. Đặc tả Yêu cầu Chức năng & Phi chức năng (FR & NFR with Gherkin)

---

## 9.1 Yêu cầu Chức năng (Functional Requirements — FR)

### FR-EX-01 · Kiểm Soát Nhịp Độ Khảo Thí Âm Thanh Chuẩn ETS
- **Mô tả**: Bộ phát âm thanh tự động điều phối các khoảng lặng tiêu chuẩn (5s cho Part 1, 2; 8s cho Part 3, 4) dựa trên cấu trúc `audioCueTimestamps` (`introEndMs`, `startMs`, `endMs`, `intervalMs`). Khóa hoàn toàn thanh tua thời gian và nút dừng/phát lại trong chế độ thi mô phỏng CBT.
- **Kịch bản Gherkin**:
  ```gherkin
  Scenario: Phát âm thanh Listening Part 1 đúng khoảng dừng ETS
    Given học viên đang làm bài thi Listening Part 1
    When câu hỏi số 1 kết thúc phát giọng đọc audio
    Then hệ thống phải duy trì khoảng lặng đúng 5000 mili-giây
    And không hiển thị thanh tua thời gian (scrubber bar) cho học viên
    And tự động chuyển sang phát câu hỏi số 2 ngay sau khi hết khoảng lặng
  ```

### FR-EX-02 · Tự Động Chấm Điểm Equating & Bóc Tách Bảo Mật Đề Thi Part 2
- **Mô tả**: Điểm số thi thử được tính dựa trên Bảng quy đổi Equating chuẩn của mã đề thi ETS tương ứng. Đặc biệt đối với Part 2, đề thi giấy thật không in câu hỏi và đáp án; do đó hệ thống bóc tách payload ở API, bảo đảm các trường văn bản (`questionText`, `optionA`, `optionB`, `optionC`) đều mang giá trị `null` hoặc chuỗi rỗng trên client trong quá trình làm bài thi CBT để phòng chống gian lận inspect source.
- **Kịch bản Gherkin**:
  ```gherkin
  Scenario: Chấm điểm bài thi thử định dạng chuẩn ETS
    Given học viên hoàn thành bài thi Full Test "TP-FORM-03 (định dạng ETS)"
    And số câu đúng phần Nghe là 84 câu
    And số câu đúng phần Đọc là 76 câu
    When hệ thống xử lý chấm điểm bài thi
    Then điểm phần Nghe phải được quy đổi chính xác là 415 điểm
    And điểm phần Đọc phải được quy đổi chính xác là 370 điểm
    And tổng điểm bài thi phải hiển thị là 785 điểm

  Scenario: Ẩn văn bản câu hỏi và phương án Part 2 trong đề thi CBT
    Given thí sinh đang làm bài thi CBT Part 2
    When kiểm tra JSON payload nhận về từ API GET /exams/:id/questions
    Then các trường questionText, optionA, optionB, optionC đều mang giá trị null hoặc rỗng
    And optionD có giá trị null (Part 2 chỉ có 3 lựa chọn A, B, C)
  ```

### FR-EX-03 · Tự Động Hóa Chấm Điểm Thuật Toán SM-2 ($q \in [0, 5]$)
- **Mô tả**: Loại bỏ việc nhập điểm $q$ thủ công. Hệ thống tự động tính toán chất lượng ghi nhớ $q \in [0, 5]$ dựa trên kết quả đúng/sai (`isCorrect`), tỷ lệ thời gian làm bài $R_{time} = \frac{t_{spent}}{t_{baseline}}$, và cờ phân vân (`isGuessed`):
  - Đúng, $R_{time} \le 1.0$, `!isGuessed` $\rightarrow q = 5$ (Phản xạ xuất sắc).
  - Đúng, $1.0 < R_{time} \le 2.0$, `!isGuessed` $\rightarrow q = 4$ (Hiểu bài tốt).
  - Đúng, $R_{time} > 2.0$ hoặc `isGuessed = true` $\rightarrow q = 3$ (Đúng do may mắn/do dự; reset chu kỳ về 1 ngày).
  - Sai, `isGuessed = true` $\rightarrow q = 2$ (Nhận biết mình phân vân, tiếp thu nhanh).
  - Sai, `!isGuessed`, $R_{time} \le 2.0$ $\rightarrow q = 1$ (Mắc bẫy ETS, sai kiến thức nền).
  - Sai, bất kỳ, $R_{time} > 2.0$ $\rightarrow q = 0$ (Bế tắc hoàn toàn).
- **Kịch bản Gherkin**:
  ```gherkin
  Scenario: Tự động tính q = 5 cho câu trả lời xuất sắc
    Given người học trả lời đúng câu hỏi Part 5 trong 15s mà không bật cờ phân vân
    When ghi nhận kết quả làm bài
    Then hệ thống tự động gán q = 5 và tính chu kỳ ngày ôn mới với EF tăng lên

  Scenario: Tự động tính q = 3 và reset chu kỳ khi đúng nhờ may mắn
    Given người học trả lời đúng câu hỏi nhưng có bật cờ phân vân isGuessed = true
    When ghi nhận kết quả làm bài
    Then hệ thống gán q = 3, đặt chu kỳ ôn tập tiếp theo là 1 ngày
  ```

### FR-EX-04 · Kiểm Soát Lưu Bài Tự Động Chống Tranh Chấp (Question-Level OCC)
- **Mô tả**: Sử dụng số phiên bản tăng đơn điệu `clientSequence` trên từng câu hỏi khi gửi autosave, loại bỏ cơ chế Last-Write-Wins theo giờ client. Máy chủ chỉ chấp nhận bản ghi có `clientSequence > currentSequence` trong cơ sở dữ liệu.
- **Kịch bản Gherkin**:
  ```gherkin
  Scenario: Từ chối bản ghi lưu tạm cũ khi có tranh chấp đồng thời
    Given hai thiết bị cùng gửi lưu tạm cho cùng một câu hỏi trong bài thi
    When bản ghi có clientSequence nhỏ hơn hoặc bằng gửi tới máy chủ
    Then hệ thống từ chối ghi đè, trả về mã HTTP 409 hoặc cảnh báo phiên bản cũ
    And dữ liệu có clientSequence lớn hơn được bảo toàn nguyên vẹn
  ```

### FR-EX-05 · Khôi Phục Chuỗi Học Hồi Tố (Streak Recovery)
- **Mô tả**: Cung cấp tính năng khôi phục chuỗi học trong vòng 48 giờ sau khi bị đứt bằng cách tiêu 300 Gems (hoàn toàn miễn phí) hoặc hoàn thành bài kiểm tra phục hồi 30 câu hỏi đạt $\ge 80\%$.
- **Kịch bản Gherkin**:
  ```gherkin
  Scenario: Khôi phục chuỗi ngày học bằng Gems trong vòng 48 giờ
    Given học viên có chuỗi 30 ngày bị đứt 36 giờ trước
    And tài khoản học viên có 450 Gems
    When học viên truy cập ứng dụng và nhấn "Cứu Chuỗi Bằng 300 Gems"
    Then số dư Gems giảm còn 150 Gems
    And chuỗi ngày học được phục hồi nguyên vẹn thành 31 ngày
  ```

### FR-EX-06 · Chuẩn Hóa Cấu Trúc Đề Mini-Diagnostic (50 Câu)
- **Mô tả**: Cố định thuật toán bốc đề Mini-Diagnostic đúng ma trận chuẩn ETS: 2 Part 1, 6 Part 2, 9 Part 3, 8 Part 4, 8 Part 5, 4 Part 6, 13 Part 7 (Tổng cộng 25 câu Listening + 25 câu Reading = 50 câu). Áp dụng bảng quy đổi Equating chuẩn hóa kết hợp ước lượng tâm trắc học IRT 2PL.
- **Kịch bản Gherkin**:
  ```gherkin
  Scenario: Khởi tạo đề thi Mini-Diagnostic chuẩn ma trận
    Given thí sinh bắt đầu làm bài thi Mini-Diagnostic
    When hệ thống khởi tạo đề thi 50 câu
    Then ma trận đề gồm đúng 2 P1, 6 P2, 9 P3, 8 P4, 8 P5, 4 P6, 13 P7
    And thời gian làm bài tối đa là 40 phút (tự động kết thúc sớm khi đạt SEM ≤ 0.28)
  ```

### FR-DYN-01 · Tự Động Tính Thời Lượng Lộ Trình $D \in [7, 30]$ Ngày
- **Mô tả**: Thời lượng lộ trình học tập được tự động tính toán dựa trên độ chênh lệch điểm $\Delta S = \max(0, S_{target} - S_{initial})$, hệ số độ khó dải điểm $W_{band} = 1.0 + \frac{S_{initial}}{1000}$, và cam kết thời gian học mỗi ngày $T_{daily}$:
  $$D_{calc} = \text{round}\left( 7 + \frac{\Delta S}{12} \times W_{band} \times \frac{45}{T_{daily}} \right)$$
  $$D = \min(30, \max(7, D_{calc}))$$
- **Kịch bản Gherkin**:
  ```gherkin
  Scenario: Tính toán thời lượng lộ trình chuẩn
    Given học viên có điểm đầu vào 450
    When chọn mục tiêu 550 với cam kết 45 phút/ngày
    Then hệ thống tính toán ra lộ trình đúng 19 ngày và lưu vào UserJourney.durationDays
    And sinh đúng 57 trạm bài học trên Bản đồ Saga (3 trạm/ngày)
  ```
- **Bảng Dữ liệu Kiểm thử Hồi quy (Regression Test Fixtures)**:
  | Bộ Test Fixture | Điểm Khởi điểm ($S_{initial}$) | Điểm Mục tiêu ($S_{target}$) | Cam kết ($T_{daily}$) | $\Delta S$ | $W_{band}$ | $D_{calc}$ | $D$ Thực tế | Số trạm ($3 \times D$) |
  |-----------------|---------------------------------|------------------------------|------------------------|------------|------------|------------|-------------|-------------------------|
  | **Fixture 1** (Chuẩn 200đ) | 450 | 650 | 45 phút/ngày | 200 | 1.45 | 31.17 | **30 ngày** (chặn trần 30) | **90 trạm** |
  | **Fixture 2** (Chuẩn 100đ) | 450 | 550 | 45 phút/ngày | 100 | 1.45 | 19.08 | **19 ngày** | **57 trạm** |
  | **Fixture 3** (Nâng cao 100đ) | 600 | 700 | 60 phút/ngày | 100 | 1.60 | 17.00 | **17 ngày** | **51 trạm** |
  | **Fixture 4** (Cơ bản 100đ) | 350 | 450 | 30 phút/ngày | 100 | 1.35 | 23.88 | **24 ngày** | **72 trạm** |
  | **Fixture 5** (Speed Drill) | 700 | 700 | 45 phút/ngày | 0 | 1.70 | 7.00 | **7 ngày** (chế độ tốc độ) | **21 trạm** |

### FR-DYN-02 · Cảnh Báo Can Thiệp Sư Phạm Mục Tiêu Khả Thi (Reality Check)
- **Mô tả**: Can thiệp sư phạm khi khoảng cách tăng điểm $\Delta S > 180$ điểm trong khung 30 ngày. Hệ thống tự động đặt lại mục tiêu Chặng 1 khả thi ($S_{initial} + 180$) kèm thông báo giải thích khoa học, đặt $D = 30$ ngày.
- **Kịch bản Gherkin**:
  ```gherkin
  Scenario: Can thiệp khi mục tiêu tăng điểm vượt quá giới hạn sư phạm 30 ngày
    Given học viên đạt 300 điểm đầu vào
    When nhập mục tiêu 850 điểm trong 30 ngày (chênh lệch 550 điểm)
    Then hệ thống hiển thị Modal cảnh báo sư phạm Reality Check
    And tự động điều chỉnh mục tiêu Chặng 1 thành 480 điểm
    And gán thời lượng lộ trình D = 30 ngày
  ```

### FR-MAP-01 · Sinh Bản Đồ Saga 2.5D Động & Phân Bổ 4 Vùng Đất
- **Mô tả**: Tự động tính toán tọa độ $(X, Y)$ hình chữ S cho toàn bộ $3 \times D$ nút trạm ngay khi khởi tạo hành trình. Phân chia bản đồ thành 4 Vùng đất (Biomes): `SUNRISE_VALLEY` (0% - 25%), `ECHO_FOREST` (26% - 50%), `GRAMMAR_CANYON` (51% - 75%), `APEX_SUMMIT` (76% - 100%).
- **Kịch bản Gherkin**:
  ```gherkin
  Scenario: Khởi tạo bản đồ Saga cho lộ trình 10 ngày
    Given lộ trình học được xác định là 10 ngày
    When hệ thống gọi API POST /api/v1/journey/generate-map
    Then đúng 30 nút trạm được sinh ra với tọa độ S-Curve uốn lượn liên tục
    And các nút được gán chính xác theo 4 theme Biome tương ứng
  ```

### FR-MAP-02 · Trạm Chặn Ôn Tập (Review Gate Lock)
- **Mô tả**: Khóa toàn bộ các nút trạm phía sau nếu người học chưa vượt qua nút `REVIEW_GATE` của ngày hôm đó với tối thiểu 2 sao ($\ge 80\%$ chính xác).
- **Kịch bản Gherkin**:
  ```gherkin
  Scenario: Chặn vượt cấp khi chưa hoàn thành Review Gate
    Given người học đã hoàn thành Nút 1 của Ngày 2
    When người học click vào Nút 3 (Skill Drill / Boss)
    Then hệ thống chặn truy cập và hiển thị thông báo: "Bạn cần hoàn thành Trạm Ôn Tập Lỗi Sai trước"
    And nút 3 tiếp tục duy trì trạng thái LOCKED
  ```

### FR-MAP-03 · Đánh Giá Nút Trạm Theo Chuẩn 3 Sao
- **Mô tả**: Chấm sao tự động sau mỗi trạm bài học dựa trên độ chính xác và phản xạ thời gian thực tế so với baseline của ETS:
  - 3 Sao: Độ chính xác $\ge 90\%$ và $R_{time} \le 1.0$.
  - 2 Sao: Độ chính xác $\ge 75\%$ (hoặc $\ge 80\%$ cho Review Gate).
  - 1 Sao: Độ chính xác $\ge 60\%$.
  - 0 Sao: Độ chính xác $< 60\%$ (chưa đạt yêu cầu).
- **Kịch bản Gherkin**:
  ```gherkin
  Scenario: Chấm 3 sao vàng cho bài tập Part 5 xuất sắc
    Given học viên làm 8 câu hỏi Part 5 tại trạm Skill Drill
    When học viên làm đúng 8/8 câu trong thời gian trung bình 15s/câu
    Then trạm bài học được chấm 3 sao vàng
    And kích hoạt hoạt họa vinh danh và mở khóa trạm kế tiếp
  ```

### FR-LEX-01 · Tiến Hóa Linh Vật Theo 4 Cột Mốc Hành Trình
- **Mô tả**: Linh vật Guardian Lexling tự động tiến hóa ngoại hình qua 4 giai đoạn dựa trên tỷ lệ trạm hoàn thành trên Bản đồ Saga ($0\%, 25\%, 70\%, 100\%$):
  - Stage 1: Sơ sinh / Baby Spirit (0% - Sunrise Valley)
  - Stage 2: Thiếu niên / Juvenile (25% - Echo Forest)
  - Stage 3: Thức tỉnh / Awakened (70% - Grammar Canyon)
  - Stage 4: Thần thức Tối thượng / Ascended Celestial (100% - Apex Summit)
- **Kịch bản Gherkin**:
  ```gherkin
  Scenario: Kích hoạt hoạt họa tiến hóa linh vật ở mốc 25%
    Given người học có lộ trình 14 ngày (tổng 42 nút trạm)
    When học viên hoàn thành nút trạm thứ 11 (~26% tiến độ)
    Then linh vật tự động kích hoạt hiệu ứng tiến hóa từ Giai đoạn 1 sang Giai đoạn 2
    And cập nhật GuardianLexling.stage = 2 trong cơ sở dữ liệu
  ```

### FR-CAT-01 · Yêu Cầu Kết Nối Mạng Bài Thi Chẩn Đoán Thích Ứng & Ranh Giới Ngoại Tuyến
- **Mô tả**: Chỉ riêng bài thi chẩn đoán thích ứng CAT (IRT 2PL) yêu cầu kết nối mạng bắt buộc thời gian thực để máy chủ tính toán năng lực $\hat{\theta}$ và lựa chọn câu hỏi kế tiếp theo Fisher Information. Ngược lại, bài thi thử CBT 200 câu là đề thi cố định chấm theo Equating nên sau khi nạp đề có thể chạy hoàn toàn ngoại tuyến trong 120 phút (tuân thủ NFR-RELI-02); các hoạt động tĩnh (trạm Saga đã nạp, 20 thẻ SM-2) được lưu trữ offline tại IndexedDB.
- **Kịch bản Gherkin**:
  ```gherkin
  Scenario: Chặn làm bài chẩn đoán thích ứng khi mất kết nối mạng
    Given học viên đang mất kết nối Internet (offline)
    When học viên mở bài thi chẩn đoán năng lực thích ứng IRT
    Then hệ thống phải hiển thị thông báo "Bài thi chẩn đoán thích ứng cần kết nối mạng để định cỡ năng lực"
    And ngăn chặn việc bắt đầu bài thi mới
    But học viên vẫn có thể làm bài thi Full CBT 200 câu đã nạp trước, mở trạm Saga hoặc ôn tập 20 thẻ Sổ tay SM-2 ngoại tuyến
  ```

### FR-STRK-01 · Tính Chuỗi Ngày Học Theo Múi Giờ Địa Phương & Server Anti-Cheat
- **Mô tả**: Chu trình kiểm tra Streak và cấp thưởng đăng nhập được máy chủ tính toán độc quyền theo mốc **04:00 AM sáng theo múi giờ địa phương của người học** (`User.timezone`, mặc định `Asia/Ho_Chi_Minh`). Mọi phiên học hoàn thành trước 04:00 AM đều được tính vào chuỗi ngày hôm trước (hỗ trợ người học khuya). Nghiêm cấm client gửi tham số ngày tháng lên API; máy chủ đối soát timestamp của request với mốc 04:00 AM địa phương để chống gian lận chỉnh lùi đồng hồ hệ điều hành.
- **Kịch bản Gherkin**:
  ```gherkin
  Scenario: Chống gian lận chỉnh lùi đồng hồ máy tính để giữ chuỗi Streak
    Given người dùng chỉnh lùi đồng hồ trên máy tính cá nhân 24 giờ
    When gửi yêu cầu hoàn thành bài học để duy trì chuỗi Streak
    Then máy chủ quy chiếu theo timestamp thực tế của máy chủ và mốc 04:00 AM của User.timezone
    And từ chối cấp bù ngày cũ
    And ghi nhận cảnh báo chênh lệch thời gian vào SecurityAuditLog
  ```

### FR-PDPD-01 · Xác Thực Độ Tuổi & Đồng Thuận Người Giám Hộ (< 18 tuổi)
- **Mô tả**: Tuân thủ Nghị định 13/2023/NĐ-CP (PDPD), hệ thống yêu cầu xác thực năm sinh và kích hoạt luồng đồng thuận của người giám hộ đối với người học dưới 18 tuổi trước khi lưu trữ telemetry học tập.
- **Kịch bản Gherkin**:
  ```gherkin
  Scenario: Yêu cầu xác nhận người giám hộ khi học viên dưới 18 tuổi
    Given người dùng nhập năm sinh cho thấy độ tuổi dưới 18 tuổi khi đăng ký
    When hoàn tất biểu mẫu đăng ký tài khoản
    Then hệ thống phải hiển thị màn hình yêu cầu nhập email của cha mẹ hoặc người giám hộ
    And gửi email xác nhận đồng thuận thu thập dữ liệu học tập theo quy định PDPD
    And chỉ kích hoạt lưu trữ telemetry cá nhân hóa sau khi người giám hộ nhấn xác nhận
  ```

---

## 9.2 Yêu cầu Phi chức năng (Non-Functional Requirements — NFR)

### NFR-PERF-01 · Băng Thông & Tải Trước Tệp Âm Thanh Chuẩn Khảo Thí
- **Tiêu chuẩn**:
  - Dung lượng tải trước (Pre-caching buffer) mỗi đoạn âm thanh $< 2$ MB thông qua Service Worker.
  - Sử dụng Web Audio API để giải mã âm thanh không nén trực tiếp trong bộ nhớ, bảo đảm độ trễ phát (Audio Latency) $< 100$ mili-giây.
  - Tốc độ phản hồi giao dịch chấm câu hỏi trắc nghiệm tức thì (`POST /api/v1/nodes/{id}/attempts/{attemptId}/answers`) đạt $< 200$ mili-giây ở 95% request.

### NFR-PERF-02 · Tải Trước Âm Thanh & Trải Nghiệm 60 FPS
- **Tiêu chuẩn**: Giao diện cuộn Bản đồ Saga 2.5D phải duy trì ổn định tốc độ khung hình **60 FPS** trên các thiết bị di động tầm trung. Toàn bộ tệp âm thanh của trạm bài tập phải được tải sẵn vào Cache Storage trong vòng **$< 3$ giây** kể từ khi mở bài học.

### NFR-SEC-01 · Bảo Vệ Tính Toàn Vẹn Dữ Liệu, Integrity Hash & Idempotency Key
- **Tiêu chuẩn**:
  - Toàn bộ điểm số, lượt cộng Gems, lượt cộng EXP, và chuỗi ngày học phải được tính toán và kiểm chứng độc quyền tại máy chủ (Server-side calculation).
  - Khi nộp bài thi CBT, hệ thống tính toán mã băm `integrityHash` bảo mật để bảo đảm bài làm không bị can thiệp.
  - Toàn bộ API nhận thưởng (Claim Gems / Quests) bắt buộc gửi kèm header `Idempotency-Key` dạng UUID; Redis thực thi khóa nguyên tử `SETNX`, chặn đứng rủi ro double-click abuse.

### NFR-RELI-02 · Vận Hành Ngoại Tuyến Bài Thi CBT 120 Phút & Hàng Đợi Dexie
- **Tiêu chuẩn**:
  - Khi học viên đã nạp xong bài thi CBT 200 câu, hệ thống bảo đảm vận hành liên tục **120 phút hoàn toàn không có kết nối Internet**.
  - Kết quả trả lời và trạng thái câu hỏi được lưu trữ an toàn trong IndexedDB (`Dexie.answers` và `Dexie.pendingSubmissions`).
  - Khi có mạng trở lại, tiến trình nền tự động đồng bộ theo thuật toán Exponential Backoff mà không làm mất bài thi của học viên.

### NFR-COMP-03 · Tương Thích Trình Duyệt Web & Chuẩn Tiếp Cận WCAG 2.2 AA
- **Tiêu chuẩn**:
  - Vận hành chính xác các hàm Web Audio API, Service Worker, và IndexedDB trên Chrome $\ge 100$, Safari $\ge 15.4$, Firefox $\ge 100$, Edge $\ge 100$.
  - Khẳng định độ chính xác đo lường: Bài thi chẩn đoán thích ứng IRT 2PL ước lượng năng lực với sai số đo lường tiêu chuẩn thực tế **SEM $\pm 35 - 50$ điểm TOEIC**.
  - Toàn bộ giao diện người dùng phải đạt tỷ lệ tương phản tối thiểu 4.5:1, hỗ trợ điều hướng hoàn toàn bằng bàn phím theo tiêu chuẩn tiếp cận **WCAG 2.2 Cấp độ AA**.

### NFR-PDPD-04 · Bảo Vệ Dữ Liệu Cá Nhân & Trẻ Vị Thành Niên (Nghị định 13/2023/NĐ-CP)
- **Tiêu chuẩn**:
  - Hệ thống tuân thủ toàn diện Nghị định 13/2023/NĐ-CP về Bảo vệ Dữ liệu Cá nhân (PDPD).
  - Tích hợp cổng khai báo năm sinh (Age Gate). Người học $< 18$ tuổi phải có xác nhận đồng thuận từ phụ huynh/người giám hộ thông qua liên kết bảo mật gửi qua email trước khi kích hoạt thu thập telemetry học tập chi tiết.
  - Tối thiểu hóa dữ liệu (Data Minimization): Chỉ lưu trữ dữ liệu cần thiết phục vụ thuật toán IRT và SM-2, không chia sẻ cho bên thứ ba.
  - Cung cấp tính năng "Yêu cầu xóa dữ liệu cá nhân" (Right to be Forgotten) cho phép hủy bỏ vĩnh viễn tài khoản và ẩn danh hóa lịch sử làm bài trong vòng 72 giờ.

---

# 10. Tuyên bố Khẳng định Nền tảng: 100% Miễn phí & Xóa bỏ Paywall

> [!IMPORTANT]
> **TOEIC PRO là nền tảng luyện thi chất lượng cao hoàn toàn miễn phí cho cộng đồng học sinh, sinh viên.**
> - **Cam kết 100% Miễn Phí (Không Paywall / Thuê bao)**: Không có bảng so sánh gói Free vs VIP, không có nút nâng cấp tài khoản, không có cổng thanh toán tiền mặt; mã màn hình S-24 được chuyển đổi công năng hoàn toàn thành **S-24 Onboarding Micro-Win (<60s First Victory)** mang lại chiến thắng tức thì cho học viên mới.
> - **Mô hình Bền vững Tài trợ Hạ tầng**: Toàn bộ chi phí vận hành hạ tầng (Redis in-memory, BullMQ worker, WebSocket server, CDN âm thanh) được tài trợ thông qua quan hệ đối tác đào tạo B2B với các trường Đại học/Cao đẳng, các quỹ tài trợ phát triển giáo dục, và các vật phẩm ngoại trang danh dự thuần túy không khóa nội dung học.
> - **100% Ngân hàng câu hỏi mở khóa tự do**: Toàn bộ 7 Parts, toàn bộ kho đề định dạng chuẩn ETS, toàn bộ giải thích chi tiết, toàn bộ phân tích bẫy đề thi đều phục vụ miễn phí không giới hạn.
> - **Năng lượng (Energy) là công cụ Điều nhịp Tâm lý (Well-being & Anti-Burnout)**: Năng lượng (tối đa 5⚡, hồi 1⚡/30 phút) **TUYỆT ĐỐI KHÔNG BAO GIỜ CHẶN** các trạm học chính của lộ trình ngày (Core Saga stations) và ôn tập Sổ tay lỗi sai (SM-2). Năng lượng chỉ áp dụng điều tiết nhịp độ trong Đấu trường 1v1 và các bài luyện tập vô tận tự do ngoài lộ trình nhằm bảo vệ sức khỏe học tập của học viên.
> - **Không giới hạn thời gian học**: Xóa bỏ hoàn toàn quy định giới hạn 15 phút/ngày của phiên bản cũ; học viên có thể hoàn thành toàn bộ lộ trình ngày mà không gặp bất kỳ rào cản thời gian nào.
> - **Không giới hạn Sổ tay lỗi sai**: Học viên được lưu trữ không giới hạn số lượng câu hỏi và từ vựng trong Sổ tay thông minh SM-2 (xóa bỏ giới hạn 30 thẻ của bản cũ).
> - **Toàn bộ Bản đồ Saga 2.5D & Linh thú**: Mọi học viên đều được trải nghiệm trọn vẹn 4 Quần xã sinh thái, 4 giai đoạn tiến hóa của Guardian Lexling, và nhận Chứng chỉ số vinh danh khi tốt nghiệp.
> - **Kinh tế trong game (Gamification) thuần túy bằng nỗ lực**: Kim cương (Gems) chỉ sinh ra từ việc chăm chỉ học tập và hoàn thành nhiệm vụ, tuyệt đối không thể nạp tiền để mua.
> - **Trần Thu Hoạch Gems (Daily Anti-Grinding Cap)**: Giới hạn số Gems tối đa kiếm được từ hình thức Micro-drills ở mức **30 Gems/ngày** nhằm ngăn chặn hành vi lặp lại câu hỏi ngắn Part 5 để cày cuốc. Các bài tập đọc hiểu dài Part 7 hoặc bài nghe phức tạp Part 3, 4 được gán trọng số phần thưởng gấp **3 đến 5 lần** so với câu đơn lẻ Part 5.

---

# 11. Hướng dẫn & Tiêu chuẩn Thiết kế Trải nghiệm Người dùng (UI/UX Design System & Ergonomics Standards)

---

## 11.1 Hệ thống Thiết kế Thị giác Chuẩn mực Cao cấp (Design System & Anti-Slop Principles)

Tuân thủ nghiêm ngặt kỹ năng thiết kế giao diện hiện đại (`/design-taste-frontend`), hệ thống loại bỏ triệt để các phong cách dập khuôn (AI-slop tells), thiết lập chuẩn thẩm mỹ sắc bén, công năng cao và tôn trọng thị giác học viên:

### 1. Quy tắc Cốt lõi & Bài trừ Cliché (Anti-Slop Directives)
- **Cấm Ánh sáng Tím AI (The Lila/Purple Ban)**: Tuyệt đối không sử dụng hiệu ứng phát sáng tím, gradient tím neon hay nút bấm đổ bóng màu tím. Hệ thống sử dụng nền trung tính tuyệt đối (Slate Void `#0F172A`, Slate Dark `#1E293B`, Soft Porcelain `#F8FAFC`) kết hợp duy nhất **1 gam màu chủ đạo (Single Accent < 80% Saturation)**:
  - `--accent-primary`: Deep Indigo `#4F46E5` cho nút hành động chính (CTA).
  - `--accent-success`: Emerald Green `#10B981` cho trạng thái trả lời đúng, đạt 3 sao, bảo toàn chuỗi Streak.
  - `--accent-warning`: Amber Flame `#F59E0B` cho ngọn lửa Streak, câu hỏi gắn cờ 🚩.
  - `--accent-danger`: Crimson Red `#EF4444` cho đáp án sai, đồng hồ còn dưới 5 phút.
- **Cấm Bố cục 3 Thẻ Ngang Rập khuôn (Anti-Card Overuse & Anti-3-Column)**: Không thiết kế các hàng 3 thẻ đồng dạng nhàm chán. Sử dụng bố cục Bento 2.0 bất đối xứng (Asymmetric Bento Grid), kết hợp đường kẻ ngăn tóc ranh giới (`border-slate-200/50` trong Light Mode, `border-slate-800/60` trong Dark Mode) và khoảng trắng chủ động (Negative Space).
- **Độ ổn định Khung nhìn Tuyệt đối (Viewport Stability Guard)**: Tuyệt đối không sử dụng `h-screen` cho Hero hay Màn hình làm bài CBT. **Bắt buộc dùng `min-h-[100dvh]`** để ngăn chặn hoàn toàn hiện tượng nhảy bố cục khi thanh điều hướng của trình duyệt di động (Safari iOS / Chrome Android) co giãn.
- **Quy tắc Typography Đẳng cấp**:
  - **Display / Big Numbers**: `Outfit` (hoặc `Geist`) với `tracking-tight leading-none` tạo ấn tượng công nghệ sắc nét.
  - **Reading Passages (Part 6, Part 7)**: `Plus Jakarta Sans` hoặc `Inter` với độ cao x-height lớn, `leading-relaxed (1.6)`, độ dài dòng tối ưu $60 - 75$ ký tự trên desktop để đọc lướt nhanh không mỏi mắt.
  - **Telemetry & Timer**: `JetBrains Mono` (`font-mono`) cho đồng hồ đếm ngược `MM:SS`, tọa độ bản đồ, mã định danh câu hỏi.

### 2. Kiến trúc Bento 2.0 & Động cơ Vi tương tác (Motion-Engine Bento Paradigm)
Ứng dụng trực tiếp trên Dashboard (S-10) và Báo cáo Phân tích (S-18):
- **Vật liệu Bề mặt**: Bo góc lớn `rounded-[2rem]` hoặc `rounded-[2.5rem]`, hiệu ứng bóng khuếch tán siêu nhẹ (`shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]`).
- **Viền Tinh thể Lỏng (Liquid Glass Refraction)**: Khi sử dụng tấm mờ `backdrop-blur-md`, bổ sung viền trong mờ `border-white/10` và đổ bóng nội tại `shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]` để tái hiện độ khúc xạ vật lý chân thực.
- **Vật lý Lò xo (Spring Physics)**: Mọi chuyển động tương tác sử dụng thông số lò xo tự nhiên (`type: "spring", stiffness: 100, damping: 20`), bài trừ chuyển động thẳng đều (linear easing).
- **Phản hồi Xúc giác Khi Chạm (Tactile Push)**: Khi người dùng bấm nút hoặc chọn phương án trắc nghiệm, phần tử co nhẹ `active:scale-[0.98]` hoặc `-translate-y-[1px]` tạo cảm giác nhấn cơ học thỏa mãn.

### 3. Bảng màu Tối ưu Thị giác (Curated Harmonious Color Palette)
Hệ thống sử dụng bảng màu HSL được cân chỉnh đặc thù cho môi trường học tập tập trung cao độ, giảm thiểu mỏi mắt khi học lâu:

| Token | Tên màu | Giá trị HEX | HSL | Ứng dụng & Ý nghĩa Tâm lý |
|-------|---------|-------------|-----|---------------------------|
| `--primary-600` | Deep Indigo | `#4F46E5` | `hsl(244, 75%, 59%)` | Màu chủ đạo thương hiệu, nút CTA chính, trạng thái active |
| `--primary-500` | Bright Iris | `#6366F1` | `hsl(239, 84%, 67%)` | Hover states, hiệu ứng phát sáng nhẹ trạm Saga hiện tại |
| `--success-500` | Emerald Green | `#10B981` | `hsl(160, 84%, 39%)` | Đáp án đúng, đạt 3 sao, thăng hạng Leaderboard, Streak bảo toàn |
| `--warning-500` | Amber Flame | `#F59E0B` | `hsl(38, 92%, 50%)` | Ngọn lửa Streak, câu hỏi gắn cờ xem lại 🚩, thẻ SM-2 đến hạn |
| `--danger-500` | Crimson Red | `#EF4444` | `hsl(0, 84%, 60%)` | Đáp án sai, đồng hồ đếm ngược dưới 5 phút, cảnh báo bẫy ETS |
| `--neutral-900` | Slate Void | `#0F172A` | `hsl(222, 47%, 11%)` | Nền Dark Mode chuẩn, thanh điều hướng chính |
| `--neutral-800` | Slate Dark | `#1E293B` | `hsl(217, 33%, 17%)` | Nền thẻ Bento trong Dark Mode, Surface Elevation 1 |
| `--neutral-50` | Soft Porcelain | `#F8FAFC` | `hsl(210, 40%, 98%)` | Nền Light Mode nhẹ dịu, không gây chói mắt |

---

## 11.2 Công thái học Di động vs Máy tính (Mobile vs Desktop Ergonomics)

### 1. Xử lý Trải nghiệm Đọc hiểu Văn bản dài (Part 6 & Part 7) trên Màn hình Nhỏ
- **Vấn đề tồn tại**: Trên màn hình máy tính, bố cục chia đôi 50/50 (Split Pane) hiển thị bài đọc bên trái và câu hỏi bên phải là tối ưu. Tuy nhiên trên điện thoại (màn hình hẹp 360px - 414px), việc chia đôi cột khiến cột bài đọc chỉ còn ~170px, gây vỡ bố cục, phải cuộn ngang liên tục và làm giảm 40% tốc độ đọc hiểu của học viên.
- **Giải pháp UX Tối ưu cho Mobile (Adaptive Sheet & Tabbed View)**:
  - *Chế độ 1: Tabbed Synchronized View (Chế độ Tab đồng bộ)*: Hai tab chuyển đổi nhanh cố định trên đầu: `[📄 Bài đọc]` và `[❓ Câu hỏi (1/4)]`. Khi chuyển sang Tab Câu hỏi, trên đầu luôn có một thanh ghim nhỏ (Sticky Passage Peeker) hiển thị 2 dòng trích đoạn chứa từ khóa liên quan, chạm nhẹ vào thanh này sẽ bung toàn màn hình bài đọc.
  - *Chế độ 2: Bottom Sheet có thể kéo vuốt (Interactive Sliding Sheet)*: Bài đọc nằm ở nền sau, cụm câu hỏi nằm trên một Bottom Sheet hỗ trợ 3 nấc kéo:
    - Nấc 30% (Chỉ thấy câu hỏi tóm tắt, 70% diện tích để đọc văn bản).
    - Nấc 60% (Cân bằng giữa văn bản và 4 lựa chọn đáp án A/B/C/D).
    - Nấc 100% (Che kín bài đọc để học viên tập trung chọn đáp án).
  - *Tự động cuộn đến chỗ trống (Auto-scroll to Cloze)*: Trong Part 6, khi học viên chuyển câu hỏi số 131, đoạn văn tự động cuộn mượt và đánh dấu ánh vàng vào ô trống `[ 131 ]`.

### 2. Vùng Chạm An toàn & Kích thước Nút bấm (Touch Targets)
- Toàn bộ các lựa chọn đáp án trắc nghiệm A, B, C, D trên di động có chiều cao tối thiểu **52dp** và khoảng cách đệm (Padding) tối thiểu **12dp** giữa các nút để triệt tiêu hoàn toàn hiện tượng bấm nhầm (Fat finger error).
- Thanh điều hướng chính (Bottom Navigation) đặt ở vùng đáy ngón tay cái thuận tiện (Thumb Zone), không đặt các nút quan trọng ở góc trên cùng bên trái màn hình.

---

## 11.3 Trải nghiệm Âm thanh Nghe (Listening Player UX)

### 0. Hồ sơ 5 Linh thú Hộ mệnh Độc bản (Guardian Lexling Character System)

Mỗi học viên khi bắt đầu Hành trình được đồng hành cùng một Linh thú Hộ mệnh sở hữu cá tính và kỹ năng chuyên biệt:

| Tên Linh thú | Biểu tượng Đại diện | Kỹ năng & Thần thái | Chuyển động Vi mô & Hành vi Tương tác |
|--------------|---------------------|---------------------|----------------------------------------|
| **Sparky** | Sóc Tia Chớp | Tốc độ Part 5 & Bấm giờ | Di chuyển thoăn thoắt; đuôi phát tia sét vàng khi học viên hoàn thành câu dưới 10 giây. |
| **Echlet** | Cú Mèo Sóng Âm | Nghe hiểu Part 2 & 3 | Lắc lư theo nhịp âm thanh Audio; đôi tai vểnh lên phát ra sóng âm tròn khi gặp bẫy đồng âm. |
| **Lumink** | Chồn Tinh Tú | Đọc hiểu Part 7 | Cầm kính lúp ma thuật; quét tia sáng vàng làm nổi bật từ khóa giải đố trong bài đọc dài. |
| **Streaklyn** | Rồng Lửa Bền Bỉ | Giữ chuỗi Streak ngày | Ôm ngọn lửa Streak rực cháy; thở ra vòng khói hình trái tim khi học viên đăng nhập học đúng giờ. |
| **Verbil** | Rùa Thông Thái | Từ vựng & Sổ tay SM-2 | Mai rùa phát quang cổ tự; gật đầu khen ngợi khi học viên vượt qua đợt ôn tập thẻ 5 sao. |

**4 Cấp bậc Tiến hóa Trọng đại (Evolution Stages):**
- **Stage 1 (Baby)**: Dễ thương, mắt to tròn, lơ lửng bập bềnh cạnh trạm hiện tại (`y: [-3px, 3px]`, chu kỳ 2.4s).
- **Stage 2 (Brave - Mở khóa tại 25% Bản đồ)**: Khoác áo choàng phiêu lưu, có phụ kiện trang bị nhỏ, vẫy tay chào khi mở app.
- **Stage 3 (Fierce - Mở khóa tại 70% Bản đồ)**: Uy dũng, phát ra hào quang nguyên tố quanh chân, nhào lộn ăn mừng khi đạt 3 sao.
- **Stage 4 (Ascended - Hoàn thành Bản đồ & Exit Exam)**: Hóa thân Thần thú huyền thoại với sải cánh rực rỡ, vinh danh trên Chứng chỉ số số.

---

### 1. Phân biệt Trải nghiệm Thi thử (CBT) và Tự Luyện (Practice/Drill)
- **Trong Chế độ Thi thử Mô phỏng CBT (S-12/S-13)**:
  - Tuân thủ nghiêm ngặt ETS: **Không có thanh tua (No Seekbar)**, **Không có nút tạm dừng**, chỉ phát đúng 1 lần.
  - Phản hồi thị giác: Hiển thị sóng âm thanh chuyển động (Animated Waveform Pill) và biểu tượng loa phát sáng để học viên nhận biết âm thanh đang chạy kể cả trong môi trường ồn.
- **Trong Chế độ Tự Luyện, Vi mô & Xem lại Lời giải (S-14, S-15, S-17)**:
  - Cung cấp thanh tua âm thanh dạng sóng (Waveform Scrubber) kèm các mốc đánh dấu câu hỏi.
  - Nút tua lại nhanh 5 giây (`Replay -5s`).
  - Nút nghe lại riêng phân đoạn của câu hỏi hiện tại (`Listen Sentence Segment`).
  - Bộ điều chỉnh tốc độ đọc 3 nấc: `0.8x` (học phát âm), `1.0x` (chuẩn ETS), `1.2x` (luyện phản xạ siêu tốc).
  - Lời thoại Karaoke (Synced Audio Transcript): Từ ngữ đang phát được tô sáng đồng bộ theo thời gian thực (Interactive Karaoke Highlighting). Chạm vào bất kỳ từ nào trong lời thoại để phát ngay từ vị trí đó.

---

## 11.4 Chế độ Tập trung Cao độ (Focus Mode 🎯)

### 1. Mục tiêu UX
Loại bỏ 100% các yếu tố gây xao nhãng thị giác (visual clutter), giảm áp lực thời gian và điểm số ảo, đưa não bộ học viên vào trạng thái dòng chảy (Flow State) tối ưu cho việc tiếp thu kiến thức.

### 2. Cơ chế Biến đổi Giao diện khi Kích hoạt Focus Mode
- **Ẩn hoàn toàn**: Linh thú Guardian Lexling, khung chat đối thoại, các thanh chỉ số Gamification (Gems, Energy, EXP, Rank).
- **Làm tối viền (Vignette Background Dimming)**: Không gian xung quanh màn hình hạ độ sáng 40%, đưa ánh mắt người học tập trung tuyệt đối vào khung câu hỏi trung tâm.
- **Đồng hồ tối giản (Ambient Timer)**: Thay vì đồng hồ đếm ngược đỏ nhấp nháy gây căng thẳng, chuyển thành một vòng tròn viền mảnh chạy êm dịu.
- **Phím tắt chuyển đổi**: Học viên trên máy tính có thể bấm phím tắt `Z` để bật/tắt tức thời Focus Mode mà không cần rê chuột.

---

## 11.5 Tối ưu hóa Hiệu năng & Tương tác Bản đồ Saga 2.5D

### 1. Duy trì 60 FPS trên Thiết bị Di động
- **DOM Virtualization**: Bản đồ gồm 21 đến 90 trạm uốn lượn. Nếu render toàn bộ cùng lúc sẽ làm tràn RAM trên điện thoại yếu. Hệ thống áp dụng ảo hóa DOM: chỉ render 12 trạm trong khung nhìn và lân cận ($\pm 3$ trạm).
- **GPU Acceleration**: Toàn bộ chuyển động cuộn và hạt ánh sáng dùng thuộc tính CSS `transform: translate3d()` và `will-change: transform` để tận dụng bộ tăng tốc phần cứng của chip đồ họa.

### 2. Khả năng Tiếp cận cho Người mù màu (Colorblind Accessibility)
- Trạng thái trạm trên bản đồ không chỉ phân biệt bằng màu sắc:
  - **Trạm Đã Hoàn Thành**: Màu Vàng Gold + 1 đến 3 Ngôi sao đặc + Đường nối nét liền sáng rõ.
  - **Trạm Hiện Tại (CURRENT)**: Vòng hào quang nhấp nháy Pulse Ring + Linh thú đứng cạnh vẫy tay + Nút CTA to bản.
  - **Trạm Cổng Kiểm Soát (Review Gate)**: Biểu tượng Ổ khóa cổng thành đồ sộ + Dây xích ma thuật.
  - **Trạm Đang Khóa (LOCKED)**: Biểu tượng Ổ khóa nhỏ + Đường nối nét đứt xám mờ sương mù.

---

## 11.6 Phím tắt Bàn phím cho Phòng thi CBT trên Máy tính (Keyboard Ergonomics)

Hỗ trợ đầy đủ cho học viên thao tác bằng bàn phím tương tự phần mềm khảo thí chuyên nghiệp, tối ưu hóa tốc độ làm bài:

| Phím tắt | Thao tác tương ứng | Ghi chú |
|----------|-------------------|---------|
| `A`, `B`, `C`, `D` hoặc `1`, `2`, `3`, `4` | Chọn nhanh phương án trả lời | Tự động cập nhật trạng thái đã làm |
| `Space` hoặc `Enter` | Xác nhận đáp án / Chuyển câu tiếp theo | Áp dụng trong Micro-drill và Review |
| `ArrowRight` (Phím mũi tên phải) | Chuyển sang câu hỏi kế tiếp | Duyệt bài nhanh trong phần Reading |
| `ArrowLeft` (Phím mũi tên trái) | Quay lại câu hỏi trước đó | Xem lại câu hỏi trước |
| `F` | Cắm cờ / Gỡ cờ câu hỏi xem lại (Flag Toggle 🚩) | Giúp đánh dấu câu phân vân trong 0.1s |
| `Z` | Bật / Tắt Chế độ Tập trung (Focus Mode) | Ẩn/hiện linh thú và giao diện thừa |
| `Esc` | Đóng bảng giải thích / Đóng modal | Tránh phải rê chuột tìm nút X |

---

## 11.7 Phản hồi Xúc giác, Cập nhật Lạc quan & Chỉ báo Ngoại tuyến

### 1. Phản hồi Xúc giác (Haptic Feedback trên Di động)
- Khi chạm chọn phương án trắc nghiệm: Rung siêu nhẹ `10ms` (Light tap).
- Khi chọn đúng phương án: Rung xác nhận `25ms` (Success feedback).
- Khi chọn sai: Rung đúp ngắn `15ms - pause 10ms - 15ms` (Warning feedback).
- Khi mở khóa Trạm mới hoặc Thăng cấp Linh thú: Rung nhịp điệu ăn mừng.
- *Lưu ý: Học viên có thể tắt toàn bộ phản hồi xúc giác trong Cài đặt (S-23).*

### 2. Cập nhật Giao diện Lạc quan (Optimistic UI Updates)
- Khi học viên bấm chọn đáp án, bấm nhận quà nhiệm vụ, hoặc mua khiên trong Shop: Giao diện cập nhật ngay lập tức trạng thái thành công ($0 \text{ ms delay}$), không chờ đợi 150-300ms của network request.
- Nếu request mạng thất bại: Tự động rollback trạng thái nhẹ nhàng kèm thông báo Toast: "Mạng chập chờn, đã tự động lưu vào hàng đợi đồng bộ".

### 3. Huy hiệu Trạng thái Ngoại tuyến Tinh tế (Discreet Offline Pill)
- Khi mất kết nối Internet, thay vì chặn màn hình bằng popup phiền phức, hệ thống hiển thị một huy hiệu viên thuốc (Pill badge) nhỏ gọn màu ghi xám ở góc trên màn hình: `📶 Ngoại tuyến • 4 câu đang chờ đồng bộ`.
- Khi kết nối phục hồi: Huy hiệu chuyển sang màu xanh lục nhấp nháy `Đã đồng bộ toàn bộ dữ liệu! ✓` trong 3 giây rồi biến mất nhẹ nhàng.

---

# 12. Chỉ số Thành công của Sản phẩm & Định vị Khảo thí (Product KPIs & Scope Boundary)

Nhằm đảm bảo tính đo lường được và định hướng vận hành dài hạn sau nghiệm thu, toàn bộ hệ thống TOEIC PRO v10 được định hình xoay quanh bộ khung chỉ số hiệu năng (KPIs) và ranh giới khảo thí rõ ràng:

## 12.1 Bộ Chỉ số Định lượng Trọng yếu (Key Performance Indicators)

### 1. Chỉ số Ngôi sao Bắc đẩu (North Star Metric)
- **Định nghĩa**: Số lượng người học tích cực hàng tuần hoàn thành trọn vẹn ít nhất 1 lộ trình học tập hàng ngày (Weekly Active Completers — WAC).
- **Mục tiêu**: $\ge 60\%$ tổng số người học có hoạt động trong tuần (WAU).

### 2. Các Chỉ số Dẫn dắt & Giữ chân (Leading & Retention Guardrails)
- **Tỷ lệ Hoàn thành Bài Chẩn đoán (Diagnostic Completion Rate)**:
  - Khảo thí Chuẩn (Standard CAT Mode): $\ge 70\%$.
  - Khảo thí Siêu tốc (Express Mode 15 câu): $\ge 88\%$ (Chế độ phòng vệ giảm tỷ lệ rời bỏ người dùng mới).
- **Tỷ lệ Giữ chân Học viên (Retention Rate)**:
  - Day 1 Retention ($D_1$): $\ge 50\%$.
  - Day 7 Retention ($D_7$): $\ge 30\%$ (Ngưỡng sống còn của ứng dụng EdTech tự học).
  - Day 30 Retention ($D_{30}$): $\ge 15\%$.
- **Tỷ lệ Rời bỏ theo Trạm (Per-station Drop-off Rate)**: $< 3\%$ ở mỗi trạm thông thường và $< 6\%$ tại trạm Cổng kiểm soát (Review Gate).

### 3. Chỉ số Kiểm chứng Khảo thí & Tính Trung thực Đo lường (Psychometric Validity Metrics)
- **Độ lệch Sai số Trung vị (Median Absolute Error - MAE)**: Độ lệch giữa Điểm TOEIC Dự đoán từ bài chẩn đoán/lộ trình và Điểm Thi Thử CBT 200 câu thực tế phải nằm trong khoảng $\le 40$ điểm.
- **Tỷ lệ Trùng lắp & Phơi nhiễm Câu hỏi (Item Exposure Rate)**: Mỗi câu hỏi trong kho đề thích ứng chỉ xuất hiện tối đa ở $\le 20\%$ tổng số lượt làm bài chẩn đoán, đảm bảo kho câu hỏi luôn được luân phiên bảo mật.

### 4. Chỉ số Vận hành & Trải nghiệm (Operational & Trust Metrics)
- **Tỷ lệ Khiếu nại Mất Chuỗi Ngày (Streak Complaint Ticket Rate)**: Phải duy trì $< 0.2\%$ trên tổng số lượt người dùng tích cực hàng tuần nhờ cơ chế chốt ngày 04:00 AM giờ địa phương (`Asia/Ho_Chi_Minh`).
- **Tỷ lệ Giao dịch Đồng bộ Ngoại tuyến Thành công (Offline Sync Success Rate)**: $\ge 99.9\%$ gói dữ liệu `syncQueue` được giải quyết thành công mà không gây xung đột dữ liệu.

## 12.2 Ranh giới Phạm vi Sản phẩm (Product Scope Boundary)
- **Tập trung Tuyệt đối vào Khảo thí TOEIC**: Toàn bộ hệ thống, thuật toán IRT, ngân hàng câu hỏi, ma trận độ khó và giao diện CBT được thiết kế riêng biệt 100% cho bài thi quốc tế **TOEIC Listening & Reading**.
- **Không thuộc phạm vi sản phẩm (Explicit Out-of-Scope)**: Kỳ thi IELTS, TOEFL, hoặc các chứng chỉ tiếng Anh khác không thuộc phạm vi phát triển của TOEIC PRO v10.0.0. Mọi dẫn chiếu kiến trúc hoặc thuật toán đều phục vụ chuẩn hóa thang điểm 10–990 của TOEIC.
