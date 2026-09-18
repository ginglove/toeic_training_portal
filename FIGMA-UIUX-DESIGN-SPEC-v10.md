# ĐẶC TẢ THIẾT KẾ UI/UX FIGMA-FIRST (FIGMA DESIGN SYSTEM & BLUEPRINT) — TOEIC PRO v10.0.0

> **Quy Chuẩn Thiết Kế:** Figma Enterprise Design System · Auto Layout 5.0 (Direction, Gap, Padding, Hug/Fill/Fixed) · Component Sets & Variants · Design Tokens (Color, Typography, Elevation, Glassmorphism) · Smart Animate Prototyping · Mobile Thumb Zone Ergonomics · Anime Guardian Lexling Rigging.  
> **Mục Đích Sử Dụng:** Cẩm nang kiến trúc trực quan giúp UI/UX Designer và Frontend Engineer mở Figma là dựng chuẩn xác 100% từng Frame, Layer, Component và Prototype mà không cần đoán mò.  
> **Phiên Bản:** v10.0.0-FIGMA-MASTER.

---

## MỤC LỤC TỔNG QUAN FIGMA ARCHITECTURE

- [0. CẤU TRÚC FILE FIGMA & THƯ VIỆN DESIGN TOKENS](#0-cấu-trúc-file-figma--thư-viện-design-tokens)
  - [0.1 Cấu Trúc Trang (Pages Hierarchy) Trong File Figma](#01-cấu-trúc-trang-pages-hierarchy-trong-file-figma)
  - [0.2 Hệ Thống Canvas, Grid & Breakpoints Chuẩn](#02-hệ-thống-canvas-grid--breakpoints-chuẩn)
  - [0.3 Bảng Styles & Variables (Figma Tokens)](#03-bảng-styles--variables-figma-tokens)
  - [0.4 Quy Chuẩn Component & Variant States (Default, Hover, Active, Disabled, Focus)](#04-quy-chuẩn-component--variant-states)
  - [0.5 Quy Chuẩn Prototyping & Smart Animate Curves](#05-quy-chuẩn-prototyping--smart-animate-curves)
- [PHẦN I: XÁC THỰC & ONBOARDING (S-01 → S-05)](#phần-i-xác-thực--onboarding-s-01--s-05)
  - [S-01 · Trang Giới Thiệu Không Trọng Lực (Landing / Guest)](#s-01--trang-giới-thiệu-không-trọng-lực-landing--guest)
  - [S-02 · Đăng Ký Tài Khoản (Sign Up Modal / Screen)](#s-02--đăng-ký-tài-khoản-sign-up-modal--screen)
  - [S-03 · Đăng Nhập Hệ Thống (Login Portal)](#s-03--đăng-nhập-hệ-thống-login-portal)
  - [S-04 · Xác Thực OTP Thời Gian Thực (OTP Verification Keypad)](#s-04--xác-thực-otp-thời-gian-thực-otp-verification-keypad)
  - [S-05 · Onboarding — Thiết Lập Mục Tiêu & Linh Thú Anime (Goal & Companion Setup)](#s-05--onboarding--thiết-lập-mục-tiêu--linh-thú-anime-goal--companion-setup)
- [PHẦN II: KIỂM TRA CHẨN ĐOÁN & THÍCH ỨNG IRT (S-06 → S-09)](#phần-ii-kiểm-tra-chẩn-đoán--thích-ứng-irt-s-06--s-09)
  - [S-06 · Giới Thiệu Bài Chẩn Đoán (Diagnostic Briefing Room)](#s-06--giới-thiệu-bài-chẩn-đoán-diagnostic-briefing-room)
  - [S-07 / S-08 · Phòng Thi Chẩn Đoán Thích Ứng Nghe & Đọc (Diagnostic Adaptive Arena)](#s-07--s-08--phòng-thi-chẩn-đoán-thích-ứng-nghe--đọc-diagnostic-adaptive-arena)
  - [S-09 · Kết Quả Chẩn Đoán & Sinh Lộ Trình (Diagnostic Result & Genesis Morph)](#s-09--kết-quả-chẩn-đoán--sinh-lộ-trình-diagnostic-result--genesis-morph)
- [PHẦN III: DASHBOARD & HÀNH TRÌNH SAGA MAP (S-10, S-11, S-27 → S-30)](#phần-iii-dashboard--hành-trình-saga-map-s-10-s-11-s-27--s-30)
  - [S-10 · Bảng Điều Khiển Học Tập Trung Tâm (Antigravity Dashboard Bento)](#s-10--bảng-điều-khiển-học-tập-trung-tâm-antigravity-dashboard-bento)
  - [S-11 · Kế Hoạch & Nhiệm Vụ Học Tập Chi Tiết (Daily Task Orbit & Pomodoro)](#s-11--kế-hoạch--nhiệm-vụ-học-tập-chi-tiết-daily-task-orbit--pomodoro)
  - [S-27 · Saga Map — Bản Đồ Hành Trình 2.5D Isometric (2.5D Isometric Saga World)](#s-27--saga-map--bản-đồ-hành-trình-25d-isometric-25d-isometric-saga-world)
  - [S-28 · Nút Trạm Bài Học — Vượt Ải (Saga Node Exercise Stage)](#s-28--nút-trạm-bài-học--vượt-ải-saga-node-exercise-stage)
  - [S-29 · Kết Quả Vượt Trạm & Tiến Hóa Linh Thú Anime (Victory Stage & Evolution)](#s-29--kết-quả-vượt-trạm--tiến-hóa-linh-thú-anime-victory-stage--evolution)
  - [S-30 · Bài Thi Tốt Nghiệp Chặng (Exit Milestone Exam)](#s-30--bài-thi-tốt-nghiệp-chặng-exit-milestone-exam)
- [PHẦN IV: THI MÔ PHỎNG CBT & LUYỆN TẬP CHUYÊN SÂU (S-12/13, S-14, S-15, S-16, S-17)](#phần-iv-thi-mô-phỏng-cbt--luyện-tập-chuyên-sâu-s-1213-s-14-s-15-s-16-s-17)
  - [S-12 / S-13 · Phòng Thi Mô Phỏng CBT Chuẩn ETS (ETS CBT Exam Simulation)](#s-12--s-13--phòng-thi-mô-phỏng-cbt-chuẩn-ets-ets-cbt-exam-simulation)
  - [S-14 · Luyện Tập Vi Mô Theo Kỹ Năng (Micro-Drill Focus Pod)](#s-14--luyện-tập-vi-mô-theo-kỹ-năng-micro-drill-focus-pod)
  - [S-15 · Luyện Tập Tự Do Theo Part (Free Practice Part Hub)](#s-15--luyện-tập-tự-do-theo-part-free-practice-part-hub)
  - [S-16 · Báo Cáo & Phân Tích Điểm ETS Dự Đoán (Score Certificate & Analytics)](#s-16--báo-cáo--phân-tích-điểm-ets-dự-đoán-score-certificate--analytics)
  - [S-17 · Xem Lại Bài Thi & Karaoke Âm Thanh Đồng Bộ (Explanations & Synced Audio)](#s-17--xem-lại-bài-thi--karaoke-âm-thanh-đồng-bộ-explanations--synced-audio)
- [PHẦN V: TIỆN ÍCH HỌC VIÊN & XÃ HỘI HÓA (S-18, S-19, S-20, S-21, S-22, S-23)](#phần-v-tiện-ích-học-viên--xã-hội-hóa-s-18-s-19-s-20-s-21-s-22-s-23)
  - [S-18 · Sổ Tay Lỗi Sai & Lật Thẻ SM-2 (Smart Mistake Flashcard Deck)](#s-18--sổ-tay-lỗi-sai--lật-thẻ-sm-2-smart-mistake-flashcard-deck)
  - [S-19 · Thống Kê & Bản Đồ Nhiệt Kỹ Năng (Competency Heatmap & Telemetry)](#s-19--thống-kê--bản-đồ-nhiệt-kỹ-năng-competency-heatmap--telemetry)
  - [S-20 · Đấu Trường & Bảng Xếp Hạng Tuần (Colosseum Leaderboard)](#s-20--đấu-trường--bảng-xếp-hạng-tuần-colosseum-leaderboard)
  - [S-21 · Cửa Hàng Vật Phẩm Đổi Quà (Gems In-Game Bazaar)](#s-21--cửa-hàng-vật-phẩm-đổi-quà-gems-in-game-bazaar)
  - [S-22 · Hồ Sơ Học Viên & Bộ Sưu Tập Huy Hiệu (Astral Profile & Trophies)](#s-22--hồ-sơ-học-viên--bộ-sưu-tập-huy-hiệu-astral-profile--trophies)
  - [S-23 · Cài Đặt Hệ Thống & Tùy Chọn Trợ Năng (Control Center & Settings)](#s-23--cài-đặt-hệ-thống--tùy-chọn-trợ-năng-control-center--settings)
- [PHẦN VI: TRUNG TÂM QUẢN TRỊ ADMIN (S-25, S-26)](#phần-vi-trung-tâm-quản-trị-admin-s-25-s-26)
  - [S-25 · Quản Trị Nội Dung & Ngân Hàng Đề Thi (Admin Item Bank)](#s-25--quản-trị-nội-dung--ngân-hàng-đề-thi-admin-item-bank)
  - [S-26 · Quản Trị Người Dùng & Phân Tích Hệ Thống (Admin User Telemetry)](#s-26--quản-trị-người-dùng--phân-tích-hệ-thống-admin-user-telemetry)

---

## 0. CẤU TRÚC FILE FIGMA & THƯ VIỆN DESIGN TOKENS

### 0.1 Cấu Trúc Trang (Pages Hierarchy) Trong File Figma

```text
📁 TOEIC_PRO_v10_DESIGN_SYSTEM.fig
│
├── 📄 00. Cover & Project Guidelines (Phiên bản, Tác giả, Nguyên tắc Antigravity)
├── 📄 01. Foundations & Tokens (Colors, Typography, Elevation, Grids, Spacing)
├── 📄 02. UI Primitives & Components (Buttons, Inputs, Cards, Badges, Modals)
├── 📄 03. Anime Guardian Lexlings (5 Nhân vật, Expressions, Rigging Assets)
├── 📄 04. Screens - Desktop 1440px (26 Màn hình Bento 3D hoàn chỉnh)
├── 📄 05. Screens - Mobile 393px (26 Màn hình Touch-First iPhone 15 Pro)
└── 📄 06. Interactive Prototype Flows (Sơ đồ nối dây tương tác Smart Animate)
```

---

### 0.2 Hệ Thống Canvas, Grid & Breakpoints Chuẩn

| Thiết Bị | Tên Frame Figma | Kích Thước Frame | Layout Grid Cấu Hình | Lề Ngoài (Margins) | Rãnh Cột (Gutters) |
|:---|:---|:---|:---|:---|:---|
| **Desktop Pro** | `[Screen-ID] Desktop 1440` | **1440 × 900 px** (Auto-height) | 12 Cột (Columns) | Margin: `80px` | Gutter: `24px` |
| **Mobile Pro** | `[Screen-ID] Mobile 393` | **393 × 852 px** (iPhone 15/16 Pro) | 4 Cột (Columns) | Margin: `16px` | Gutter: `12px` |
| **Tablet** | `[Screen-ID] Tablet 834` | **834 × 1194 px** (iPad Pro 11") | 8 Cột (Columns) | Margin: `32px` | Gutter: `16px` |

---

### 0.3 Bảng Styles & Variables (Figma Tokens) — Hiệu Chuẩn WCAG 2.2 AA & /design-taste-frontend

#### 1. Color Styles (`Fill` & `Stroke`) & Phối Màu Khắc Khắt Không Tím AI (Anti-Lila Directive)
- **Quy tắc hiệu chuẩn màu (/design-taste-frontend):** Bãi bỏ hoàn toàn ánh sáng tím neon AI (The Lila Ban). Sử dụng bảng màu trung tính Slate/Zinc với duy nhất 1 Accent chính có độ bão hòa $< 80\%$:
- `Color/Brand/Primary-600`: `#4F46E5` (Deep Indigo - Nền nút bấm CTA chính, tương phản chữ trắng `#FFFFFF` đạt **6.29:1** ✅ WCAG AA)
- `Color/Brand/Primary-400`: `#818CF8` (Iris Muted - Text liên kết & Viền Focus Ring, tương phản trên `#090D16` đạt **6.51:1** ✅ WCAG AA)
- `Color/Brand/Primary-500`: `#6366F1` (Bright Iris - Icon $\ge 24\text{px}$, đường kẻ accent, trạm hiện tại trên Saga Map)
- `Color/Feedback/Success-500`: `#10B981` (Emerald Green - Đáp án đúng, đạt 3 sao, tương phản chữ `Emerald-950` `#022C22` đạt **7.20:1** ✅ WCAG AAA)
- `Color/Feedback/Warning-500`: `#F59E0B` (Amber Flame - Ngọn lửa Streak, câu gắn cờ 🚩, tương phản chữ than `Slate-900` `#0F172A` đạt **8.31:1** ✅ WCAG AAA)
- `Color/Feedback/Danger-500`: `#EF4444` (Crimson Red - Lỗi, câu sai, bẫy ETS, tương phản trên `#090D16` đạt **5.16:1** ✅ WCAG AA)
- `Color/Background/Void-950`: `#090D16` (Deep Space Canvas - Nền ứng dụng chính, tương phản chữ trắng `#FFFFFF` đạt **19.43:1** ✅ WCAG AAA)
- `Color/Background/Slate-900`: `#0F172A` (Slate Void - Nền Sidebar, Bottom Dock, HUD ghim)
- `Color/Surface/Elevated-800`: `rgba(30, 41, 59, 0.70)` (Glassmorphism Bento Card, `backdrop-filter: blur(16px)`)
- `Color/Border/Glass-10`: `rgba(255, 255, 255, 0.10)` (Đường viền trong mờ 1px Liquid Glass Refraction)
- `Color/Border/Glass-12`: `rgba(255, 255, 255, 0.12)` (Đường viền kính ngoài phản quang không trọng lực)
- `Color/Focus/Ring-400`: `#818CF8` (Viền Focus Ring trợ năng bàn phím: `outline: 2px solid #818CF8, offset: 2px`)

#### 2. Typography Styles (Font Stack: Geist / Satoshi / Plus Jakarta Sans / JetBrains Mono)
- **Quy tắc Typography Đẳng cấp (/design-taste-frontend):** Bãi bỏ Inter cho phong cách Creative/Premium. Bắt buộc Serif không dùng trên Dashboard.
  - `Typography/Display-Hero`: Size: `56px` | Line-height: `1.0` | Font: `Geist` / `Satoshi` | Weight: `800 ExtraBold` | Tracking: `-0.03em` | Tương phản: `19.43:1`
  - `Typography/Display-Large`: Size: `40px` | Line-height: `48px` | Font: `Geist` / `Satoshi` | Weight: `800 Bold` | Tracking: `-0.025em` | Tương phản: `19.43:1`
  - `Typography/Heading-1`: Size: `32px` | Line-height: `40px` | Font: `Geist` / `Satoshi` | Weight: `700 Bold` | Tracking: `-0.02em` | Tương phản: `19.43:1`
  - `Typography/Heading-2`: Size: `24px` | Line-height: `32px` | Font: `Geist` / `Satoshi` | Weight: `700 Bold` | Tracking: `-0.015em` | Tương phản: `19.43:1`
  - `Typography/Heading-3`: Size: `18px` | Line-height: `26px` | Font: `Satoshi` / `Plus Jakarta Sans` | Weight: `600 SemiBold` | Tracking: `-0.01em` | Tương phản: `17.74:1`
  - `Typography/Body-Large`: Size: `16px` | Line-height: `26px` | Font: `Plus Jakarta Sans` | Weight: `400 Regular / 600 SemiBold` | Max-width: `65ch` | Tương phản: `17.74:1`
  - `Typography/Body-Medium`: Size: `14px` | Line-height: `22px` | Font: `Plus Jakarta Sans` | Weight: `400 Regular / 500 Medium` | Tương phản: `13.09:1`
  - `Typography/Caption-Small`: Size: `12px` | Line-height: `16px` | Font: `Plus Jakarta Sans` | Weight: `500 Medium / 600 SemiBold` | Tương phản: `7.58:1`
  - `Typography/Telemetry-Mono`: Size: `13px` | Line-height: `18px` | Font: `JetBrains Mono` (`font-mono`) | Weight: `500 Medium` | Cho Timer đếm ngược, tọa độ map, mã câu hỏi

#### 3. Effect Styles (Elevation, Diffusion Shadow & Liquid Glass Refraction)
- `Effect/Shadow/Diffusion`: Drop Shadow `X: 0, Y: 20, Blur: 40, Spread: -15, Color: rgba(0,0,0,0.05)` (Bóng khuếch tán Bento không gây ô nhiễm thị giác)
- `Effect/Shadow/Elevation-1`: Drop Shadow `X: 0, Y: 8, Blur: 24, Spread: -4, Color: rgba(0,0,0,0.30)` (Thẻ phụ, ô trắc nghiệm)
- `Effect/Shadow/Elevation-2-Hover`: Drop Shadow `X: 0, Y: 16, Blur: 36, Spread: -6, Color: rgba(0,0,0,0.40)` (Thẻ Bento đang Hover)
- `Effect/Shadow/Elevation-3-Hero`: Drop Shadow `X: 0, Y: 24, Blur: 60, Spread: -8, Color: rgba(0,0,0,0.55)` (Sân khấu 3D Thần Thức Anime)
- `Effect/Glass/LiquidRefraction`: Inner Shadow `X: 0, Y: 1, Blur: 0, Color: rgba(255,255,255,0.10)` + Inner Border `1px solid rgba(255,255,255,0.10)` + Background Blur `16px` (Tái tạo mép kính vật lý lỏng khúc xạ chân thực)

#### 4. Phân Tầng Chiều Sâu Không Gian Z-Axis (Antigravity Spatial Stacking)
- **Layer 0 (`z-index: 0`):** Lưới không gian vũ trụ Deep Space Canvas (`#090D16`) + Ambient Mesh Gradient chuyển động chậm.
- **Layer 1 (`z-index: 10`):** Mặt phẳng kính mờ kết cấu (`backdrop-filter: blur(16px)`), viền kính `rgba(255, 255, 255, 0.12)`.
- **Layer 2 (`z-index: 20`):** Các module Bento Interactive Pods, góc nghiêng 3D Isometric `transform: rotateX(60deg) rotateZ(-45deg)` trên Saga Map và `rotateX(6deg) rotateY(-6deg)` khi Hover.
- **Layer 3 (`z-index: 30`):** Thần Thức Anime Hộ Mệnh 3D Hologram, dao động hình sin $\Delta y = 8\sin(2\pi t / 3.2)\text{px}$ kèm hạt nguyên tố.
- **Layer 4 (`z-index: 40`):** Thanh điều hướng nổi (Floating HUD / Mobile Bottom Dock / Focus Mode Pill) ghim an toàn trong Thumb Zone.

#### 5. Quy Chuẩn Không Trọng Lực & Chống Lỗi Thời Bắt Buộc
- **Quy tắc Viewport Stability:** Bắt buộc sử dụng `min-h-[100dvh]` cho tất cả các Frame toàn màn hình (Landing, CBT Exam, Saga Map). Tuyệt đối cấm dùng `h-screen`.
- **Chính sách Anti-Emoji (Banned):** Tuyệt đối cấm sử dụng Emoji trong code, nhãn hiển thị và nội dung bài tập. Thay thế hoàn toàn bằng Icon vector đồng bộ từ `@phosphor-icons/react` hoặc `@radix-ui/react-icons` với `strokeWidth = 1.5` hoặc `2.0`.
- **Vật lý Lò Xo (Spring Physics):** Áp dụng cấu hình lò xo mượt mà (`type: "spring", stiffness: 100, damping: 20`) cho tất cả các chuyển động Smart Animate.
- **Phản hồi Xúc giác Khi Chạm (Tactile Feedback):** Khi bấm nút chọn hoặc thẻ trắc nghiệm, phần tử co nhẹ `scale: 0.98` hoặc `-translate-y-[1px]` để tạo độ nảy vật lý.

---

### 0.4 Ma Trận Thành Phần UI & Đầy Đủ 8 Trạng Thái Tương Tác (Component States Matrix)

Mọi phần tử UI trong hệ thống đều được thiết kế đầy đủ **8 trạng thái tương tác** nhằm đáp ứng chuẩn UX hiện đại và WCAG 2.2 AA:

| Thành Phần Component | Default (Mặc định) | Hover (Lướt chuột) | Active / Pressed (Nhấn) | Focus-Visible (Bàn phím) | Disabled (Vô hiệu hóa) | Loading (Đang tải) | Error (Lỗi nhập/chọn) | Empty (Trống dữ liệu) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Button/Primary** | Nền `#4F46E5`, chữ trắng, bo góc 14px, cao 52/56dp | Nền sáng hơn 8%, nâng `Elevation-2`, scale 1.02 | Nền tối hơn 10%, scale 0.98, lún 2px | Viền ngoài `outline: 2px solid #818CF8, offset: 2px` | Opacity 40%, cursor not-allowed, tắt click | Skeleton pulse hoặc spinner viền cyan xoay 360° | Viền đỏ `#EF4444`, rung nhẹ lắc lư 3 chu kỳ | N/A |
| **Answer/QuizOption** | Nền kính `Elevated-800`, viền `Glass-12`, chữ Slate-100 | Viền sáng `#818CF8`, nền xanh nhạt 5% | Lún nhẹ 1px, âm thanh phản hồi haptic | Focus Ring 2px màu xanh `#818CF8` rõ rệt | Chữ mờ xám Slate-500, viền trong suốt | Skeleton placeholder gợn sóng shimmer | N/A | N/A |
| **Card/BentoPod** | Nền kính mờ 70%, `Elevation-1`, viền mờ 12% | Nghiêng 3D Magnetic Tilt $6^\circ$, sáng viền Neon | Scale 0.995, bóng đổ co lại | Viền sáng báo hiệu đang chọn bằng phím Tab | Nền xám mờ mịt, biểu tượng khóa ổ khóa | Khung Skeleton xương cá lấp lánh | Viền đỏ nhấp nháy khi dữ liệu fetch lỗi | Thần Thức Anime hiện ra an ủi kèm CTA gợi ý |
| **Input/TextField** | Nền Slate-900, viền `Glass-12`, placeholder Slate-400 | Viền sáng hơn 20%, con trỏ đổi `text` | Nền sáng nhẹ, con trỏ nhấp nháy cyan | Viền đôi `#818CF8` phát sáng hào quang | Nền xám chì, icon khóa | Con quay spinner thu nhỏ bên góc phải | Viền đỏ rực `#EF4444`, nhãn báo lỗi dưới chân | N/A |

---

### 0.5 Quy Chuẩn Prototyping, Smart Animate & Công Thái Học Cảm Ứng

```text
[ Trigger ] ─── (On Click / While Hovering / Touch Tap)
  └─► [ Action ] ─── (Smart Animate)
        ├─► Easing: Custom Spring ─── Mass: 1, Stiffness: 120, Damping: 14
        ├─► Hoặc Cubic-Bezier: (0.16, 1, 0.3, 1) — Easing công thái học mượt mà
        ├─► Duration: 300ms - 450ms
        └─► Mobile Fallback: Khi 'prefers-reduced-motion: reduce' ➔ Thay bằng Fade In 200ms
```

- **Quy Chuẩn Vùng Chạm Di Động (Mobile Ergonomics):**
  - Chiều cao chạm tối thiểu: **$48\text{ dp}$** (Chuẩn WCAG), khuyến nghị **$52 - 56\text{ dp}$** cho các lựa chọn đề thi.
  - Vùng chạm an toàn ngón cái (Thumb Zone): 100% các nút thao tác chính (Tiếp tục, Nộp bài, Phát lại âm thanh) nằm trong **40% diện tích đáy màn hình**.
---

### 0.6 Cẩm Nang Hợp Nhất Phong Cách 1 Trang (Fusion Style Guide: Candy Crush × 2.5D Cosmic Anime)

Cẩm nang hợp nhất phong cách chuẩn hóa ranh giới thẩm mỹ giữa hai trường phái: **Nền tối vũ trụ Anime thanh lịch (Cosmic Anime)** và **Casual kẹo ngọt bùng nổ (Candy Juice)** nhằm bảo đảm tính nhất quán trên toàn bộ 26+ màn hình:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        FUSION ART-DIRECTION MATRIX & BOUNDARIES                        │
├────────────────────────────────────────┬───────────────────────────────────────────────┤
│    TRỤ CỘT 1: 2.5D COSMIC ANIME        │         TRỤ CỘT 2: CANDY CRUSH JUICE          │
│    (Chế độ Tập Trung & Phòng Thi)      │         (Khoảnh Khắc Thắng Lợi & Thưởng)      │
├────────────────────────────────────────┼───────────────────────────────────────────────┤
│ • Không gian áp dụng: S-06..S-08, S-12 │ • Không gian áp dụng: S-24 Micro-Win, S-27    │
│   đến S-17, S-25..S-26, S-30.          │   Saga Stations, S-28/29 Thắng ải, S-21 Bazar │
│ • Màu chủ đạo: Deep Void #090D16,      │ • Màu chủ đạo: Gradient Kẹo Ấm #FF6B9D dâu,   │
│   Slate-900, Iris #6366F1, Emerald.    │   #FFC15E hoàng kim, #FFE66D chanh phát quang │
│ • Hình khối: Kính phẳng mờ 16px, viền  │ • Hình khối: Nút 3D vát đáy 4-6px (Bevel),    │
│   tinh thể mỏng 1px, đổ bóng khuếch tán│   highlight đỉnh sáng mọng nước, bóng ấm      │
│ • Chuyển động: Lơ lửng hình sin êm đềm,│ • Chuyển động: Lò xo nảy mạnh (Spring Bounce: │
│   Focus Freeze khi đang đọc đề thi     │   Stiffness 140, Damping 10), Screen-shake    │
│ • Âm thanh: Sóng âm ngân trong trẻo,   │ • Âm thanh: Chuỗi hợp âm Fanfare tăng cấp     │
│   hợp âm phong cầm thiền định          │   tưng bừng theo số sao 1 -> 2 -> 3 sao       │
└────────────────────────────────────────┴───────────────────────────────────────────────┘
```

#### 1. Nguyên Tắc Ứng Dụng Chi Tiết (Application Rules)
1. **Nền tảng Sân khấu (The Canvas Rule):**
   - Nền tối vũ trụ `Deep Void #090D16` luôn đóng vai trò là **khung nền sân khấu vĩnh cửu** để bảo vệ mắt học viên khi đọc lâu và tạo chiều sâu không gian cao cấp.
   - Các hiệu ứng Candy Juice **KHÔNG BAO GIỜ** thay thế toàn bộ nền đen thành màu sáng chói mắt; mà xuất hiện dưới dạng **Lớp Phủ Bùng Nổ (Burst Accent Layer)** tại đúng thời khắc: trả lời đúng, qua trạm, nhận đá quý, mở rương.

2. **Quy Tắc Component Nút Bấm (Button Role Separation):**
   - `Button/StandardPrimary`: Nền phẳng Iris `#4F46E5`, bo góc 14px, lún 2px khi bấm $\to$ Dành cho các tác vụ nghiêm túc (Nộp bài thi CBT, Tiếp tục kiểm tra, Cài đặt).
   - `Button/CandyPrimary`: Nền Gradient dâu-cam (`#FF6B9D` $\to$ `#FFC15E`), vát đáy 3D dày 5px, inner top highlight 1.5px trắng 60%, lò xo đàn hồi $\to$ Dành riêng cho nút Nhận thưởng, Thức tỉnh linh thú, Bắt đầu ải Saga.

3. **Cơ Chế Combo Chuỗi Đúng Liên Tiếp (Combo Flame Meter):**
   - Khi trả lời đúng liên tiếp $\ge 3$ câu: Kích hoạt thanh lửa nhiệt huyết của Streaklyn ở góc trên, nhân hệ số kinh nghiệm $1.2\times \to 1.5\times \to 2.0\times\text{ XP}$. Khi trả lời sai, thanh lửa dịu lại về mức cơ bản mà không phạt âm điểm.

4. **Trợ Năng An Toàn (Calm & Zen Fallback):**
   - Người học có thể bật `Calm Mode` hoặc `Zen Exam Mode` tại [S-23] để tắt 100% hiệu ứng rung nổ hạt kẹo, đưa app về trạng thái tối giản tĩnh lặng.

---

### 0.7 Quy Chuẩn Xuất Asset Anime Guardian & Cấu Trúc Component Set (Figma Export & Component Specs)

> **P0 Blocker Specification:** Toàn bộ nhân vật hộ mệnh trên Page `03. Anime Guardian Lexlings` phải được thiết lập Frame có nền trong suốt (`Fill: None`) và cấu hình Export chuẩn WebP/PNG có Alpha Channel. Nghiêm cấm hoàn toàn định dạng JPEG.

#### 1. Cấu Hình Xuất Asset Chuẩn (Figma Export Settings)
- **Định dạng xuất chính (Primary Export):** `WebP` với kênh **Alpha trong suốt 100%**, chất lượng 85%.
- **Định dạng dự phòng (Fallback Export):** `PNG-24` (Alpha enabled).
- **CẤM XUẤT:** `JPEG` ❌ (Không hỗ trợ Alpha Channel, sinh viền hộp mờ đục đè bẹp thiết kế Liquid Glass).
- **Kích thước Artboard Master:** $1024 \times 1024\text{ px}$ (Retina 3x).
- **Dung lượng kiểm soát (Budget):** $\le 150\text{ KB}$ / file WebP.

#### 2. Cấu Trúc Component Set: `❖ Component Set: AnimeGuardian`
- **Variants Properties:**
  - `Character`: `Sparky` | `Echlet` | `Lumink` | `Streaklyn` | `Verbil`
  - `Stage`: `1` *(Khóa phạm vi MVP: Stage 1 Sơ Tâm. Stages 2-4 mở rộng ở v10.2+)*
  - `Expression`: `idle` | `focus` | `victory` | `comfort` | `evolution` *(5 biểu cảm MVP)*
  - `Size`: `SM (64px)` | `MD (112px)` | `LG (176px)` | `Hero (288px)`
  - `State`: `Default` | `Hover` | `FocusFreeze` | `MeditativeRest`
- **Tổng số Asset Tĩnh MVP:** **$1\text{ Stage} \times 5\text{ Biểu cảm} \times 5\text{ Thần Thức} = 25\text{ File WebP Alpha}$**.
- **Quy ước đặt tên Layer & Tệp Xuất:**
  ```text
  lexlings/{character}_{expression}.webp
  Ví dụ: sparky_idle.webp, echlet_focus.webp, streaklyn_victory.webp
  Fallback MVP: {character}_anime.webp
  ```
- **Lộ trình Chuyển giao Kỹ thuật (Vector-Skeletal Rig):**
  - *Phase 1 (MVP):* WebP tĩnh + CSS/GSAP zero-g floating.
  - *Phase 2 (v10.2):* Lottie JSON Animation (Xuất After Effects Bodymovin).
  - *Phase 3 (v10.3):* Spine 2D Skeletal Rig (Runtime Mesh Deformation).
  - *Phase 4 (v11.0):* Rive State Machine (Interactive GPU Branching Runtime).

---

## S-01 · Trang Giới Thiệu Không Trọng Lực (Landing / Guest)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Hero Section không gian vũ trụ, giới thiệu hệ sinh thái 100% Free không paywall, Bản đồ Saga 2.5D và 5 Anime Guardian Spirits.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 1280 px · Clip content: Off · Fill: Color/Background/Void-950`
- **📱 Frame Mobile:** `Frame Mobile 393 × 1640 px · Clip content: Off · Fill: Color/Background/Void-950`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-01] Landing_Desktop_1440 (Auto Layout: Vertical, Gap: 64px, Padding: [0, 80, 80, 80], Fill container)
├── # Frame: TopNavigation_Bar (Auto Layout: Horizontal, Gap: Auto, Padding: [16, 0, 16, 0], Fill container, Height: 72px)
│   ├── # Frame: BrandLogo_Group (Auto Layout: Horizontal, Gap: 12px, Hug content)
│   │   ├── ❖ Component: LogoIcon (36x36px, Fill: Primary-500)
│   │   └── T Text: "TOEIC PRO" (Heading-2, White) + ❖ Badge: "100% FREE" (Success-500)
│   ├── # Frame: NavLinks_Row (Auto Layout: Horizontal, Gap: 32px, Hug content)
│   │   ├── T Text: "Lộ Trình Saga" · T Text: "Đấu Trường" · T Text: "Linh Thú Anime"
│   └── # Frame: NavActions_Row (Auto Layout: Horizontal, Gap: 16px, Hug content)
│       ├── ❖ Component: Button/Ghost ("Đăng Nhập", MD 44dp)
│       └── ❖ Component: Button/Primary ("Bắt Đầu Miễn Phí", MD 44dp, Primary-500)
│
├── # Frame: Hero_Section (Auto Layout: Horizontal, Gap: 48px, Padding: [48, 0, 48, 0], Fill container)
│   ├── # Frame: Hero_LeftContent (Auto Layout: Vertical, Gap: 24px, Fill container [Width: 620px])
│   │   ├── ❖ Component: PillBadge ("🚀 100% MIỄN PHÍ · XÓA BỎ HOÀN TOÀN PAYWALL", Iris-500)
│   │   ├── T Text: "CHINH PHỤC TOEIC 990 BẰNG TRÍ TUỆ NHÂN TẠO & LINH THÚ HỘ MỆNH" (Display-Large)
│   │   ├── T Text: "Lộ trình thích ứng IRT 2 tham số Logistic. 4 Quần xã sinh thái, bản đồ 2.5D co giãn tối đa 90 trạm. Đồng hành cùng 5 Anime Guardian Spirits." (Body-Large, Slate-300)
│   │   └── # Frame: CTA_ButtonGroup (Auto Layout: Horizontal, Gap: 16px, Hug content)
│   │       ├── ❖ Component: Button/Primary ("Làm Bài Test Chẩn Đoán Ngay", LG 56dp)
│   │       └── ❖ Component: Button/Secondary ("Khám Phá Bản Đồ 2.5D", LG 56dp)
│   │
│   └── # Frame: Hero_RightStage_3D (Auto Layout: Center, Fixed: 600x520px, Effect: Elevation-3)
│       ├── ❖ Instance: Anime_Streaklyn_Stage1 (480x480px, Floating Animation Hook)
│       └── # Frame: MiniSagaMap_FloatingCard (Fixed: 320x180px, Glassmorphism, Rotate: -6deg)
│
└── # Frame: Bento_FeaturesGrid (Auto Layout: Horizontal, Gap: 24px, Fill container [4 Cột Bento])
    ├── ❖ Component: BentoCard ("🔮 Chẩn Đoán IRT Thích Ứng", Col: 3, Fill container)
    ├── ❖ Component: BentoCard ("🗺️ Bản Đồ Saga 2.5D", Col: 3, Fill container)
    ├── ❖ Component: BentoCard ("⚡ CBT Chuẩn ETS Quốc Tế", Col: 3, Fill container)
    └── ❖ Component: BentoCard ("🦊 5 Anime Guardian Spirits", Col: 3, Fill container)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: Button/Primary (Variants: Size=LG/MD, State=Default/Hover/Pressed) · Component: BentoCard (Variants: Elevation=Level-2, Theme=DarkGlass) · Component: Anime_Avatar (Variants: Character=Streaklyn, Stage=1)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bấm CTA 'Làm Bài Test Chẩn Đoán' ➔ Navigate to [S-02] Đăng Ký (Smart Animate, 300ms ease-out) · Hover vào Hero_RightStage ➔ Scale 1.03, Card ngả phẳng 0deg (Spring: Mass 1, Stiffness 140).

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Streaklyn Anime (Tóc đỏ lửa, áo gấm hoàng tử) lơ lửng ở vị trí X: 840, Y: 180 của Frame Hero Desktop. Có bóng thoại: 'Bắt đầu hành trình cùng tớ nhé!'.

---

## S-02 · Đăng Ký Tài Khoản (Sign Up Modal / Screen)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Tạo tài khoản học viên nhanh chóng với Google, GitHub hoặc Email, giao diện Split-Pod đối xứng bằng kính mờ.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Centered Modal: 880 × 580 px · Fill: Color/Background/Void-950`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Full-screen Form · Fill: Color/Background/Void-950`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-02] SignUp_Modal (Auto Layout: Horizontal, Gap: 0, Fixed: 880x580px, Radius: 24px, Glassmorphism)
├── # Frame: LeftShowcase_Column (Auto Layout: Vertical, Gap: 24px, Padding: [48, 40, 48, 40], Fixed: 380px, Fill: Slate-900/80)
│   ├── ❖ Component: BrandBadge ("HÀNH TRÌNH TỰ HÀO")
│   ├── T Text: "Chào Mừng Đến Với Vũ Trụ TOEIC PRO" (Heading-2)
│   ├── T Text: "Đoán đúng trình độ trong 20 phút. Lưu tiến độ vĩnh viễn trên đám mây. 100% Free trọn đời." (Body-Medium)
│   └── ❖ Instance: Anime_Lumink_Welcoming (240x240px, Kính lúp tinh tú phát sáng)
│
└── # Frame: RightForm_Column (Auto Layout: Vertical, Gap: 20px, Padding: [48, 48, 48, 48], Fill container)
    ├── T Text: "ĐĂNG KÝ TÀI KHOẢN" (Heading-2, White)
    ├── # Frame: OAuth_Row (Auto Layout: Horizontal, Gap: 12px, Fill container)
    │   ├── ❖ Component: Button/OAuth ("Google", Icon: Google, Fill container, Height: 48dp)
    │   └── ❖ Component: Button/OAuth ("GitHub", Icon: GitHub, Fill container, Height: 48dp)
    ├── # Frame: Divider_Row (Auto Layout: Horizontal, Gap: 12px, Text: "HOẶC VỚI EMAIL")
    ├── # Frame: Input_FullName (Auto Layout: Vertical, Gap: 6px, Fill container)
    │   └── ❖ Component: InputField ("Họ và tên", Placeholder: "Nguyễn Văn A", Height: 48dp)
    ├── # Frame: Input_Email (Auto Layout: Vertical, Gap: 6px, Fill container)
    │   └── ❖ Component: InputField ("Email học viên", Placeholder: "hocvien@toeicpro.edu.vn", Height: 48dp)
    ├── # Frame: Input_Password (Auto Layout: Vertical, Gap: 6px, Fill container)
    │   └── ❖ Component: InputField ("Mật khẩu", Placeholder: "Tối thiểu 8 ký tự", Type: Password, Height: 48dp)
    ├── # Frame: Terms_CheckboxRow (Auto Layout: Horizontal, Gap: 10px, Align: Center)
    │   ├── ❖ Component: Checkbox (State: Checked)
    │   └── T Text: "Tôi đồng ý với Điều khoản sử dụng & Chính sách bảo mật PDPD" (Caption-Small)
    └── ❖ Component: Button/Primary ("Tạo Tài Khoản & Nhận Linh Thú", Height: 52dp, Fill container)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: InputField (Variants: State=Default/Hover/Focus/Error) · Component: Button/OAuth (Variants: Provider=Google/GitHub)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bấm 'Tạo Tài Khoản' ➔ Navigate to [S-04] OTP Verification (Smart Animate, 300ms) · Bấm 'Đã có tài khoản' ➔ Switch to [S-03] Login.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Lumink Anime (Thiếu nữ Tinh Tú với kính lúp ma thuật) đứng ở cột trái, mỉm cười chào đón học viên mới.

---

## S-03 · Đăng Nhập Hệ Thống (Login Portal)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Học viên đăng nhập tiếp tục hành trình học tập, mở khóa chuỗi Streak ngày và vào thẳng Dashboard.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Centered Login Card: 480 × 560 px · Elevation-3`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Full-screen Form · Touch targets >= 52dp`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-03] Login_Card (Auto Layout: Vertical, Gap: 24px, Padding: [48, 40, 48, 40], Fixed: 480px, Radius: 24px, Glassmorphism)
├── # Frame: Header_Group (Auto Layout: Vertical, Gap: 8px, Align: Center, Fill container)
│   ├── ❖ Component: LogoIcon (40x40px)
│   ├── T Text: "CHÀO MỪNG TRỞ LẠI!" (Heading-2, White)
│   └── T Text: "Đăng nhập để giữ vững ngọn lửa Streak 14 ngày của bạn" (Body-Medium, Slate-400)
├── ❖ Component: Button/OAuth ("Tiếp tục với Google", Height: 50dp, Fill container)
├── # Frame: Divider_Row (Text: "HOẶC VỚI EMAIL")
├── # Frame: FormInputs_Group (Auto Layout: Vertical, Gap: 16px, Fill container)
│   ├── ❖ Component: InputField ("Email", Height: 48dp)
│   └── ❖ Component: InputField ("Mật khẩu", Type: Password, Height: 48dp)
├── # Frame: Options_Row (Auto Layout: Horizontal, Gap: Auto, Fill container)
│   ├── ❖ Component: CheckboxWithLabel ("Ghi nhớ đăng nhập")
│   └── T Text: "Quên mật khẩu?" (Caption-Small, Iris-400, Underline)
└── ❖ Component: Button/Primary ("Vào Bàn Học & Chinh Phục Ngay", Height: 52dp, Fill container)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: CheckboxWithLabel (State: Checked/Unchecked) · Component: Button/Primary (State: Default/Loading)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bấm 'Vào Bàn Học' ➔ Navigate to [S-10] Dashboard Bento (Smart Animate Push Left, 350ms).

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Streaklyn Anime (Hoàng tử Hỏa Long) cầm ngọn đuốc đứng ở góc card, nhắc nhở học viên bảo vệ chuỗi ngày.

---

## S-04 · Xác Thực OTP Thời Gian Thực (OTP Verification Keypad)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Học viên nhập mã 6 số gửi về hộp thư để kích hoạt tài khoản an toàn với phản hồi xúc giác.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Centered Pod: 520 × 440 px · Radius: 24px`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Center Layout · Keypad Numeric Mode`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-04] OTP_Card (Auto Layout: Vertical, Gap: 28px, Padding: [48, 48, 48, 48], Fixed: 520px, Radius: 24px, Glassmorphism)
├── # Frame: Header_Group (Auto Layout: Vertical, Gap: 8px, Align: Center)
│   ├── ❖ Component: IconCircle (MailCheck, Emerald-500)
│   ├── T Text: "XÁC THỰC MÃ BẢO MẬT" (Heading-2, White)
│   └── T Text: "Mã 6 chữ số đã được gửi tới email user***@gmail.com" (Body-Medium, Slate-300)
├── # Frame: OTP_InputRow (Auto Layout: Horizontal, Gap: 12px, Align: Center, Hug content)
│   ├── ❖ Component: OTP_DigitBox ("4", State: Filled, Size: 56x64px)
│   ├── ❖ Component: OTP_DigitBox ("8", State: Filled, Size: 56x64px)
│   ├── ❖ Component: OTP_DigitBox ("1", State: Filled, Size: 56x64px)
│   ├── ❖ Component: OTP_DigitBox ("9", State: Filled, Size: 56x64px)
│   ├── ❖ Component: OTP_DigitBox ("", State: Focused, NeonGlow)
│   └── ❖ Component: OTP_DigitBox ("", State: Default)
├── # Frame: Timer_Row (Auto Layout: Horizontal, Gap: 8px, Align: Center)
│   ├── ❖ Icon: Clock (Warning-500)
│   └── T Text: "Mã có hiệu lực trong 01:45 · [Gửi lại mã]" (Caption-Small)
└── ❖ Component: Button/Primary ("Xác Nhận & Kích Hoạt Tài Khoản", Height: 52dp, Fill container)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: OTP_DigitBox (Variants: State=Empty/Focused/Filled/Error, Size=56x64px)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Điền đủ 6 số ➔ Auto-submit sau 200ms ➔ Navigate to [S-05] Onboarding Setup.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Echlet Anime (Thánh nữ Sóng Âm) lơ lửng trên đỉnh hộp OTP, phát sóng âm xanh ngọc mỗi khi nhập đúng 1 ký tự.

---

## S-05 · Onboarding — Thiết Lập Mục Tiêu & Linh Thú Anime (Goal & Companion Setup)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Học viên thiết lập mốc điểm mục tiêu, thời gian học mỗi ngày và chọn 1 trong 5 Anime Guardian Spirits khởi đầu.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 960 px · Auto Layout: Vertical, Gap: 32px · Fill: Void-950`
- **📱 Frame Mobile:** `Frame Mobile 393 × 1100 px · Carousel 3D Snap Scroll`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-05] Onboarding_Container (Auto Layout: Vertical, Gap: 36px, Padding: [48, 80, 48, 80], Fill container)
├── # Frame: StepIndicator_Row (Auto Layout: Horizontal, Gap: 8px, Align: Center)
│   └── T Text: "BƯỚC 1/3: KHỞI TẠO BẢN ĐỒ HỌC TẬP CỦA BẠN" (Caption-Small, Iris-400, Bold)
├── # Frame: TargetScore_Section (Auto Layout: Vertical, Gap: 16px, Fill container)
│   ├── T Text: "1. Điểm số mục tiêu bạn muốn chinh phục:" (Heading-3)
│   └── # Frame: ScoreCards_Row (Auto Layout: Horizontal, Gap: 16px, Fill container)
│       ├── ❖ Component: TargetCard ("450+ Khởi Động", State: Default, Fill container)
│       ├── ❖ Component: TargetCard ("650+ Tốt Nghiệp", State: Selected, HaloGlow, Fill container)
│       ├── ❖ Component: TargetCard ("800+ Quản Lý", State: Default, Fill container)
│       └── ❖ Component: TargetCard ("900+ Bậc Thầy", State: Default, Fill container)
├── # Frame: TimeCommit_Section (Auto Layout: Vertical, Gap: 16px, Fill container)
│   ├── T Text: "2. Thời gian bạn cam kết học mỗi ngày:" (Heading-3)
│   └── # Frame: TimeCards_Row (Auto Layout: Horizontal, Gap: 16px, Fill container)
│       ├── ❖ Component: TimeCard ("15 phút / ngày", Sub: "Nhẹ nhàng", Fill container)
│       ├── ❖ Component: TimeCard ("30 phút / ngày", Sub: "Khuyên dùng ⭐", State: Selected, Fill container)
│       └── ❖ Component: TimeCard ("60 phút / ngày", Sub: "Bứt phá siêu tốc", Fill container)
├── # Frame: CompanionSelection_Section (Auto Layout: Vertical, Gap: 16px, Fill container)
│   ├── T Text: "3. Chọn Thần Thức Hộ Mệnh (Anime Guardian Spirit) đồng hành:" (Heading-3)
│   └── # Frame: Guardians_Row (Auto Layout: Horizontal, Gap: 16px, Fill container [5 Nhân Vật Anime])
│       ├── ❖ Component: GuardianCard (Name: "Sparky", Element: "Lôi Điện", State: Default)
│       ├── ❖ Component: GuardianCard (Name: "Echlet", Element: "Sóng Âm", State: Default)
│       ├── ❖ Component: GuardianCard (Name: "Lumink", Element: "Tinh Tú", State: Default)
│       ├── ❖ Component: GuardianCard (Name: "Streaklyn", Element: "Hỏa Tinh", State: Selected, RingGlow)
│       └── ❖ Component: GuardianCard (Name: "Verbil", Element: "Địa Thần", State: Default)
└── ❖ Component: Button/Primary ("Xác Nhận & Tiếp Tục Đến Phòng Chẩn Đoán", LG 56dp, Align: Center)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: GuardianCard (Variants: Character=Sparky/Echlet/Lumink/Streaklyn/Verbil, State=Default/Selected/Hover)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Chọn Linh Thú ➔ Ảnh Anime phóng to 1.1x và phát hiệu ứng hạt nguyên tố ➔ Bấm nút xác nhận ➔ Navigate to [S-06] Diagnostic Intro.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Cả 5 linh thú Anime xuất hiện dạng thẻ Card 3D tuyệt đẹp với trang phục và hào quang nguyên tố riêng biệt.

---

## S-06 · Giới Thiệu Bài Chẩn Đoán (Diagnostic Briefing Room)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Học viên nắm rõ cơ chế thích ứng IRT, kiểm tra tai nghe với thanh sóng âm trước khi bấm bắt đầu làm bài.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Centered Briefing Card: 720 × 580 px`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Full-screen Briefing`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-06] Diagnostic_BriefingPod (Auto Layout: Vertical, Gap: 24px, Padding: [48, 48, 48, 48], Fixed: 720px, Radius: 24px)
├── # Frame: Header_Info (Auto Layout: Vertical, Gap: 8px)
│   ├── ❖ Component: TagPill ("CAT/IRT ALGORITHM", Iris-500)
│   ├── T Text: "BÀI KIỂM TRA ĐẦU VÀO THÍCH ỨNG" (Heading-1)
│   └── T Text: "Ước lượng năng lực TOEIC thực tế của bạn qua 20 - 30 câu hỏi thông minh" (Body-Large)
├── # Frame: SpecsList_Grid (Auto Layout: Horizontal, Gap: 16px, Fill container)
│   ├── ❖ Component: SpecItem ("20-30 Câu", "Tự động dừng khi SEM < 0.35")
│   ├── ❖ Component: SpecItem ("~20 Phút", "Thời gian linh hoạt theo phản xạ")
│   └── ❖ Component: SpecItem ("Nghe & Đọc", "Part 1, 2, 3, 5, 7 đại diện")
├── # Frame: AudioCheck_Pod (Auto Layout: Horizontal, Gap: 16px, Padding: [16, 20, 16, 20], Fill container, Radius: 16px, Glass)
│   ├── ❖ Component: PlayButton (State: Ready, Size: 44dp)
│   ├── # Frame: Waveform_Container (Auto Layout: Horizontal, Gap: 3px, Align: Center, Fill container)
│   │   └── ❖ WaveBars: [12 thanh sóng âm hoạt ảnh động]
│   └── ❖ Badge: "Đã nghe rõ: Tốt ✓" (Success-500)
├── # Frame: MascotAdvice_Row (Auto Layout: Horizontal, Gap: 16px, Align: Center)
│   ├── ❖ Avatar: Anime_Echlet_Head (48x48px)
│   └── T Text: "Lời khuyên: Đừng đoán mò nếu không biết, thuật toán sẽ tự hạ độ khó để tìm chuẩn kiến thức của bạn!"
└── ❖ Component: Button/Primary ("Bắt Đầu Làm Bài Chẩn Đoán Ngay", LG 56dp, Fill container)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: SpecItem (Props: Title, Subtitle) · Component: PlayButton (State: Playing/Paused)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bấm 'Phát thử âm thanh' ➔ Sóng âm rung động ➔ Bấm 'Bắt đầu làm bài' ➔ Navigate to [S-07/S-08] Testing Arena.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Echlet Anime (Thánh nữ Sóng Âm) đeo tai nghe DJ ma thuật, mỉm cười khích lệ học viên tự tin.

---

## S-07 / S-08 · Phòng Thi Chẩn Đoán Thích Ứng Nghe & Đọc (Diagnostic Adaptive Arena)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Học viên giải các câu hỏi thích ứng IRT, giao diện tối giản chia đôi 50/50 trên máy tính và Bottom Sheet trên di động.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Split Screen 50/50 · Full Height`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Adaptive 3-Stage Bottom Sheet`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-07] Testing_Arena_Desktop (Auto Layout: Vertical, Gap: 0, Fill: Void-950, Full Screen)
├── # Frame: TopHUD_StatusBar (Auto Layout: Horizontal, Gap: Auto, Padding: [16, 32, 16, 32], Height: 64px, Fill container)
│   ├── T Text: "CÂU 08 / 25 · PART 3: CONVERSATION" (Heading-3, Iris-400)
│   ├── # Frame: Timer_Widget (Auto Layout: Horizontal, Gap: 8px)
│   │   └── T Text: "⏱️ 16:42" (Body-Large, Mono, Warning-500)
│   └── # Frame: Actions_Group (Auto Layout: Horizontal, Gap: 12px)
│       ├── ❖ Component: Button/Ghost ("Gắn Cờ Xem Lại 🚩")
│       └── ❖ Component: Button/DangerGhost ("Nộp Bài Sớm")
│
└── # Frame: SplitContent_Container (Auto Layout: Horizontal, Gap: 24px, Padding: [24, 32, 24, 32], Fill container)
    ├── # Frame: LeftPassage_Pane (Auto Layout: Vertical, Gap: 16px, Padding: 24px, Fill container [Width: 50%], Glass)
    │   ├── # Frame: AudioPlayer_Card (Auto Layout: Horizontal, Gap: 12px, Padding: 12px, Radius: 12px)
    │   │   ├── ❖ Icon: Volume2 (Iris-400)
    │   │   ├── # Frame: AnimatedWaveform (Fill container, Height: 32px)
    │   │   └── T Text: "00:32 / 00:48" (Mono)
    │   └── # Frame: GraphicImage_Card (Fill container, Height: 320px, Image: Part 3 Chart)
    │
    └── # Frame: RightQuestion_Pane (Auto Layout: Vertical, Gap: 16px, Padding: 24px, Fill container [Width: 50%], Glass)
        ├── T Text: "Where most likely does the conversation take place?" (Heading-3, White)
        ├── # Frame: Answers_Group (Auto Layout: Vertical, Gap: 12px, Fill container)
        │   ├── ❖ Component: QuizOption ("A", "At a dental clinic", Height: 56dp, State: Default)
        │   ├── ❖ Component: QuizOption ("B", "In an accounting firm", Height: 56dp, State: Selected)
        │   ├── ❖ Component: QuizOption ("C", "At an electronics store", Height: 56dp, State: Default)
        │   └── ❖ Component: QuizOption ("D", "In a train station", Height: 56dp, State: Default)
        └── # Frame: BottomNav_Row (Auto Layout: Horizontal, Gap: Auto, Fill container)
            ├── ❖ Component: Button/Secondary ("◄ Câu Trước", MD 48dp)
            └── ❖ Component: Button/Primary ("Câu Kế Tiếp ►", MD 52dp)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: QuizOption (Variants: Letter=A/B/C/D, State=Default/Hover/Selected/Correct/Wrong)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Chọn đáp án ➔ Bấm 'Câu Kế Tiếp' ➔ Smart Animate chuyển câu hỏi mới ➔ Thuật toán tính lại theta tức thì.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Linh thú Anime hiển thị icon mini ở góc HUD thanh trạng thái, giữ tư thế tĩnh (Focus State) tránh gây xao nhãng học viên.

---

## S-09 · Kết Quả Chẩn Đoán & Sinh Lộ Trình (Diagnostic Result & Genesis Morph)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Công bố điểm ETS-format dự đoán (SEM ±35–50đ), biểu đồ Radar 7 Part và hoạt ảnh sinh lộ trình bản đồ Saga 2.5D độc bản.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 1080 px · Bento Layout · Radial Victory Glow`
- **📱 Frame Mobile:** `Frame Mobile 393 × 1280 px · Scrollable Score Report`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-09] Result_Desktop (Auto Layout: Vertical, Gap: 32px, Padding: [48, 80, 48, 80], Fill container)
├── # Frame: VictoryHero_Card (Auto Layout: Horizontal, Gap: 48px, Padding: 40px, Radius: 24px, Fill container, Glass)
│   ├── # Frame: LeftScore_Pod (Auto Layout: Vertical, Gap: 12px, Fixed: 400px)
│   │   ├── ❖ Badge: "ĐÃ XÁC THỰC SEM < 0.35" (Success-500)
│   │   ├── T Text: "ĐIỂM DỰ ĐOÁN ETS-FORMAT:" (Caption-Small, Slate-400)
│   │   ├── T Text: "620" (Size: 84px, Font: 900 Black, Gradient: Iris to Violet)
│   │   ├── # Frame: SubScores_Row (Auto Layout: Horizontal, Gap: 24px)
│   │   │   ├── T Text: "🎧 Listening: 335 (SEM ±35–50đ)" (Body-Medium)
│   │   │   └── T Text: "📖 Reading: 285 (SEM ±35–50đ)" (Body-Medium)
│   │   └── T Text: "Trình độ CEFR: B2 · Khoảng cách đến mục tiêu 750+: 130 điểm" (Caption-Small, Amber-400)
│   │
│   └── # Frame: RightRadar_Pod (Auto Layout: Center, Fill container)
│       └── ❖ Instance: RadarChart_7Parts (Biểu đồ mạng nhện 7 kỹ năng TOEIC, Size: 320x320px)
│
├── # Frame: SagaGenesis_Card (Auto Layout: Vertical, Gap: 20px, Padding: 32px, Radius: 24px, Fill container, IrisBorder)
│   ├── T Text: "THUẬT TOÁN ĐÃ SINH LỘ TRÌNH SAGA CỦA RIÊNG BẠN" (Heading-2)
│   ├── T Text: "Thời lượng lộ trình: D = 16 ngày (48 trạm bài học · 3 trạm/ngày) dựa trên điểm đầu vào 450 và mục tiêu 550 (45p/ngày)." (Body-Medium)
│   ├── # Frame: AnimatedPath_Preview (Height: 120px, SVG Morphing S-Curve nối các trạm thuộc 4 Vùng Đất)
│   └── ❖ Component: Button/Primary ("BƯỚC VÀO BẢN ĐỒ SAGA 2.5D CỦA BẠN", LG 56dp, Width: 420px, Align: Center)
│
├── [MODAL CAN THIỆP SƯ PHẠM REALITY CHECK - CONDITIONAL]:
│   └── # Frame: [Modal] PedagogicalRealityCheck (Center Overlay, Glass, Padding: 36px, Radius: 24px, Width: 520px)
│       ├── ❖ PhosphorIcon: Sparkle (Iris-400, Size: 48px)
│       ├── T Title: "Can Thiệp Sư Phạm: Mục Tiêu Chặng 1 Khả Thi" (Heading-2, White)
│       ├── T Body: "Mục tiêu bạn chọn cách biệt 550 điểm. Về mặt sư phạm khảo thí, việc tăng quá 180 điểm trong 30 ngày đòi hỏi phân bổ theo nhiều chặng. Hệ thống đã tối ưu Chặng 1 cho bạn là 480 điểm (D = 30 ngày) để bảo đảm kiến thức vững chắc!" (Body-Medium, Slate-300)
│       └── # Frame: ModalActions (Auto Layout: Horizontal, Gap: 16px)
│           ├── ❖ Button: "Đồng Ý & Bắt Đầu Chặng 1" (Primary, LG 52dp)
│           └── ❖ Button: "Điều Chỉnh Giờ Học" (Secondary, LG 52dp)
│
└── # Frame: CelebrationAnime_Mascot (Center, Fixed: 300x300px, Mascot nhào lộn tung hạt hào quang)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:**
  - `Component: RadarChart` (Props: `ScoresArray`, Size: 320x320px)
  - `Component: VictoryHero_Card` (Variants: `Tier=A1/A2/B1/B2/C1`)
  - `Component: PedagogicalRealityCheckModal` (Trigger: $\Delta S > 180$ trong 30 ngày, Auto-reset Stage 1 Goal)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bấm 'Bước vào bản đồ Saga' ➔ Navigate to [S-27] Saga Map (Smart Animate Zoom, 500ms).

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Linh thú Anime đã chọn nhảy múa ăn mừng ở trung tâm với đôi cánh ánh sáng và pháo hoa rực rỡ.

---

## S-10 · Bảng Điều Khiển Học Tập Trung Tâm (Antigravity Dashboard Bento)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Trang chủ học viên tổng hợp trạm Saga tiếp theo, thần thú hộ mệnh, nhiệm vụ ngày và thứ hạng đấu trường.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 960 px · Bento 2.0 12 Cột · Glassmorphism Elevation-2`
- **📱 Frame Mobile:** `Frame Mobile 393 × 1150 px · Single-column Bento · Bottom Nav`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-10] Dashboard_Desktop (Auto Layout: Vertical, Gap: 24px, Padding: [24, 80, 48, 80], Fill container)
├── # Frame: TopHUD_Bar (Auto Layout: Horizontal, Gap: Auto, Fill container)
│   └── (Header chuẩn: Logo + Streak 14d + Energy 5/5 + Gems 450 + User Profile Level 5)
│
├── # Frame: BentoMain_Grid (Auto Layout: Horizontal, Gap: 24px, Fill container)
│   ├── # Frame: NextSagaStation_Card (Col: 8, Auto Layout: Vertical, Gap: 20px, Padding: 32px, Radius: 24px, Elevation-2)
│   │   ├── # Frame: StationBadge_Row (Auto Layout: Horizontal, Gap: 12px)
│   │   │   ├── ❖ Tag: "CHẶNG 2: RỪNG SÓNG ÂM" (Cyan-400)
│   │   │   └── ❖ Badge: "TRẠM 18: NHẬN DIỆN ĐỊA ĐIỂM PART 3" (Iris-400)
│   │   ├── T Text: "Vượt ải Trạm 18 để đạt 2/3 sao và mở khóa Trạm 19" (Heading-2)
│   │   ├── # Frame: RewardPills_Row (Auto Layout: Horizontal, Gap: 16px)
│   │   │   ├── ❖ Pill: "+50 XP Kinh Nghiệm" (Amber-400)
│   │   │   └── ❖ Pill: "+15 Đá Quý Gems 💎" (Cyan-400)
│   │   └── ❖ Component: Button/Primary ("Tiếp Tục Vượt Trạm 18", LG 56dp, Width: 280px)
│   │
│   └── # Frame: GuardianAnime_Card (Col: 4, Auto Layout: Vertical, Gap: 16px, Padding: 24px, Radius: 24px, Glass)
│       ├── # Frame: GuardianInfo_Row (Auto Layout: Horizontal, Gap: Auto)
│       │   ├── T Text: "Streaklyn (Stage 2: Brave)" (Heading-3)
│       │   └── ❖ Badge: "Level 12" (Amber-400)
│       ├── ❖ Instance: Anime_Streaklyn_Brave (220x220px, Floating Animation)
│       ├── T Text: "Khẩu hiệu: 'Lửa rực rỡ, đừng bỏ dở!'" (Caption-Small, Italic)
│       └── # Frame: XP_ProgressBar (Fill container, Height: 8px, Progress: 68%)
│
└── # Frame: BentoSub_Row (Auto Layout: Horizontal, Gap: 24px, Fill container [3 Thẻ Cột])
    ├── ❖ Component: SubCard_SM2 ("🧠 18 Thẻ Lỗi Sai Cần Ôn", Button: "Ôn Ngay (5p)", Col: 4)
    ├── ❖ Component: SubCard_DailyGoal ("🎯 25/30 Phút Học Hôm Nay", Progress: 83%, Col: 4)
    └── ❖ Component: SubCard_Arena ("🏆 Hạng 4 Bảng Kim Cương", Sub: "Cách Top 3: 45 XP", Col: 4)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: BentoCard (Variants: Span=8_Cols/4_Cols) · Component: SubCard (Props: Icon, Title, CTA)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bấm 'Tiếp Tục Vượt Trạm' ➔ Navigate to [S-28] Node Exercise · Bấm 'Bản đồ Saga' trên Header ➔ Navigate to [S-27].

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Streaklyn Anime (Stage 2 Brave) khoác áo choàng đỏ viền vàng đứng hiên ngang trong Thẻ 2, vẫy đuôi lửa.

---

## S-11 · Kế Hoạch & Nhiệm Vụ Học Tập Chi Tiết (Daily Task Orbit & Pomodoro)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Học viên hoàn thành 3 nhiệm vụ trong ngày, sử dụng đồng hồ Pomodoro tập trung và mở khóa rương vàng.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Split Bento 7/5 Cols`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Checklist + Pomodoro Dock`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-11] DailyTasks_Desktop (Auto Layout: Horizontal, Gap: 32px, Padding: [32, 80, 48, 80], Fill container)
├── # Frame: TaskList_Column (Col: 7, Auto Layout: Vertical, Gap: 20px, Fill container)
│   ├── T Text: "NHIỆM VỤ HÔM NAY · 16 THÁNG 9" (Heading-2)
│   ├── # Frame: TaskItem_1 (Auto Layout: Horizontal, Gap: 16px, Padding: 20px, Radius: 16px, Glass, Checked)
│   │   ├── ❖ Checkbox: Checked (Success-500)
│   │   ├── T Text: "Hoàn thành 1 Trạm Saga (+30 XP, +10 Gems)" (Strikethrough, Slate-400)
│   │   └── ❖ Badge: "Đã xong ✓"
│   ├── # Frame: TaskItem_2 (Auto Layout: Horizontal, Gap: 16px, Padding: 20px, Radius: 16px, Glass)
│   │   ├── ❖ Checkbox: Unchecked
│   │   ├── T Text: "Ôn tập 15 thẻ từ vựng SM-2 đến hạn" (Body-Large)
│   │   └── ❖ Component: Button/Secondary ("Ôn Ngay", SM 36dp)
│   ├── # Frame: TaskItem_3 (Auto Layout: Horizontal, Gap: 16px, Padding: 20px, Radius: 16px, Glass)
│   │   ├── ❖ Checkbox: Unchecked
│   │   ├── T Text: "Đạt 80% chính xác trong 1 bài Micro-drill Part 5" (Body-Large)
│   │   └── ❖ Component: Button/Secondary ("Luyện Ngay", SM 36dp)
│   └── # Frame: DailyProgress_Bar (Auto Layout: Vertical, Gap: 8px)
│       └── T Text: "Tiến độ ngày: 1/3 (33%)"
│
└── # Frame: PomodoroAndChest_Column (Col: 5, Auto Layout: Vertical, Gap: 24px, Fill container)
    ├── # Frame: Pomodoro_Pod (Auto Layout: Vertical, Gap: 16px, Padding: 28px, Radius: 24px, Align: Center, Glass)
    │   ├── T Text: "⏱️ ĐỒNG HỒ TẬP TRUNG POMODORO" (Heading-3)
    │   ├── ❖ Instance: GlowingCircularTimer ("25:00", RingColor: Iris-500)
    │   └── ❖ Component: Button/Primary ("Bắt Đầu Phiên Tập Trung", MD 48dp)
    └── # Frame: GoldenChest_Pod (Auto Layout: Horizontal, Gap: 16px, Padding: 20px, Radius: 20px, Glass)
        ├── ❖ Icon: GoldenChest (Locked, Shaking animation)
        └── T Text: "Rương Hoàn Hảo: Hoàn thành 3/3 nhiệm vụ để mở khóa +50 Gems 💎"
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: TaskItem (Variants: State=Pending/Completed) · Component: GlowingCircularTimer (Props: TimeString, Progress)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bấm 'Ôn Ngay' ➔ Navigate to [S-18] Mistake Notebook · Bấm 'Bắt đầu Pomodoro' ➔ Timer đếm ngược 1s/tick.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Sparky Anime (Thiếu niên Lôi Điện) ngồi trên nắp đồng hồ Pomodoro, vung tay điều khiển dòng thời gian.

---

## S-27 · Saga Map — Bản Đồ Hành Trình 2.5D Isometric (2.5D Isometric Saga World)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Trọng tâm Game Hóa theo chuẩn `/antigravity-design-expert`. Bản đồ thế giới 4 Quần xã sinh thái (Biomes), lộ trình co giãn $3 \times D$ trạm ($D \in [7, 30]$ ngày, tối đa 90 trạm) lơ lửng không trọng lực giữa vũ trụ, hỗ trợ Pan & Zoom mượt mà và cuộn ảo hóa Virtual DOM 60 FPS.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Full Canvas 2.5D · Perspective: 1200px · min-h-[100dvh]`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Infinite Vertical S-Curve Scroll Map · min-h-[100dvh]`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-27] SagaMap_WorldCanvas (Full Viewport, min-h-[100dvh], Overflow: Hidden, Fill: Void-950)
├── # Frame: TopHUD_Overlay (Fixed: Top, Height: 72px, Auto Layout: Horizontal, Gap: Auto, Padding: [16, 32, 16, 32], Glass Liquid Refraction)
│   ├── # Frame: StageSelector (Auto Layout: Horizontal, Gap: 12px)
│   │   ├── ❖ Button: "← Về Dashboard" (Ghost, Phosphor Icon ArrowLeft)
│   │   └── T Text: "VÙNG ĐẤT 2: RỪNG VỌNG ÂM (ECHO FOREST · 26% - 50%)" (Heading-3, Iris-400)
│   └── # Frame: TopMetrics_Row (Auto Layout: Horizontal, Gap: 16px)
│       ├── ❖ Badge: "⭐ 42 / 90 Sao" (Amber-400, font-mono)
│       ├── ❖ Badge: "💎 450 Gems (Hôm nay: 20/30)" (Cyan-400, Anti-Grinding Cap)
│       ├── ❖ OfflinePill: "📶 Dexie Synced ✓" (Success-500, Discreet Status)
│       └── ❖ Button: "Focus Mode (Z)" (Ghost Pill, Outline Glass)
│
├── # Frame: Isometric_WorldPlane (Transform: rotateX(60deg) rotateZ(-45deg), 3D preserve-3d)
│   ├── # Vector: SVG_GlowingJourneyPath (Đường cong uốn lượn S-Curve mềm mại kết nối 3xD trạm)
│   ├── # BiomeZone: [SUNRISE_VALLEY] (0% - 25% · Thung Lũng Bình Minh · Nền lục nhạt ánh bình minh)
│   ├── # BiomeZone: [ECHO_FOREST] (26% - 50% · Rừng Vọng Âm · Nền rêu xanh ngọc & sóng âm)
│   ├── # BiomeZone: [GRAMMAR_CANYON] (51% - 75% · Hẻm Núi Cổ Tự · Vách đá sa thạch & ký tự cổ)
│   ├── # BiomeZone: [APEX_SUMMIT] (76% - 100% · Đỉnh Quang Vinh · Băng tuyết & hào quang vinh quang)
│   │
│   ├── ❖ StationNode: Node_FinalExam (Type: FINAL_EXAM, Locked, Celestial Crest)
│   ├── ❖ StationNode: Node_DailyBoss_Day5 (Type: DAILY_BOSS, Locked, Boss Skull Icon)
│   ├── ❖ StationNode: Node_16_ReviewGate (Type: REVIEW_GATE, LOCKED, Khóa 2 Sao SM-2)
│   ├── ❖ StationNode: Node_15_SkillDrill (Type: SKILL_DRILL, ACTIVE, Iris Pulse Glow, Scale 1.25)
│   ├── ❖ StationNode: Node_14_Warmup (Type: WARMUP, Completed, 3 Stars ⭐⭐⭐)
│   └── ❖ StationNode: Node_13_Warmup (Type: WARMUP, Completed, 3 Stars ⭐⭐⭐)
│
└── # Frame: FloatingCompanion_Stage (Fixed: Neo tại Node_15_Current)
    ├── ❖ Instance: Anime_Sparky_Juvenile (180x180px, Floating Sin-Wave & Particle VFX)
    └── # Frame: DialogueSpeechBubble ("Đã sẵn sàng vượt trạm Ngữ Pháp Part 5 chưa? Tiến lên!", Glass Liquid Refraction)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:**
  - `Component: StationNode` (Variants: `NodeType=WARMUP/REVIEW_GATE/SKILL_DRILL/DAILY_BOSS/FINAL_EXAM`, `State=Locked/Available/Current/Completed`, `Stars=0/1/2/3`)
  - `Component: ReviewGateLockModal` (Báo lỗi khi bấm vào nút sau khi chưa qua Review Gate)
  - `Component: BiomeHeaderBanner` (Theme: `SUNRISE_VALLEY`, `ECHO_FOREST`, `GRAMMAR_CANYON`, `APEX_SUMMIT`)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):**
  - Bấm vào `Node_15_SkillDrill (ACTIVE)` ➔ Bung Sheet tóm tắt nhiệm vụ trạm ➔ Bấm 'Vào Vượt Trạm' ➔ Navigate to [S-28] Node Exercise.
  - Bấm vào `Node_16_ReviewGate` khi chưa đạt 2 sao trạm ôn tập ➔ Hiển thị Modal Cảnh báo Cổng Khóa: "Cần tối thiểu 2 sao (≥80% chính xác) để mở lối!".

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Sparky / Streaklyn Anime lơ lửng ngay trên trạm bài học hiện tại, vẫy tay chào và hiển thị bóng thoại chiến thuật. Nếu người học bật Focus Mode (`Z`), linh thú tự động chuyển về trạng thái Thiền Định Tĩnh Lặng (ẩn khỏi bản đồ hoặc thu nhỏ thành biểu tượng huy hiệu mờ).

---

## S-28 · Nút Trạm Bài Học — Vượt Ải (Saga Node Exercise Stage)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Học viên giải quyết cụm thử thách của trạm bài học (3-5 câu Warmup, 6 câu Review Gate, 8-10 câu Skill Drill/Boss). Hỗ trợ chuẩn mực Cloze Reading Split-View (Part 6) và Minimalist Audio Stage (Part 2).
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Split Screen 50/50 · min-h-[100dvh] · Interactive Focus`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Adaptive Sheet & Tabbed Cloze Peeker · min-h-[100dvh]`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-28] NodeExercise_Desktop (Auto Layout: Vertical, Gap: 0, min-h-[100dvh], Fill: Void-950)
├── # Frame: TopProgressBar_Row (Auto Layout: Horizontal, Gap: Auto, Padding: [16, 40, 16, 40], Height: 64px, Glass)
│   ├── # Frame: LeftMeta (Auto Layout: Horizontal, Gap: 12px)
│   │   ├── T Text: "NGÀY 5 · TRẠM 15: TRỌNG TÂM ĐẢO NGỮ PART 5" (Heading-3, White)
│   │   └── ❖ SequenceTag: "seq: #4" (JetBrains Mono, font-mono, clientSequence OCC)
│   ├── # Frame: ProgressDots (Auto Layout: Horizontal, Gap: 8px)
│   │   └── [Dot 1: Done ✓] [Dot 2: Active •] [Dot 3: Empty ○]
│   ├── ❖ FocusModeToggle: "Focus Mode (Z)" (Active / Inactive)
│   └── ❖ LiveStarsPredictor: [ ⭐ ⭐ ⭐ ] (Dự báo 3 sao dựa trên accuracy và R_time)
│
├── # Frame: ExerciseSplit_Container (Auto Layout: Horizontal, Gap: 24px, Padding: [24, 40, 24, 40], Fill container)
│   │
│   ├── # Frame: LeftMedia_Column (Auto Layout: Vertical, Gap: 16px, Fill container [50%])
│   │   ├── [KỊCH BẢN PART 6 CLOZE READING]:
│   │   │   ├── # Frame: ReadingPassage_Box (Glass, Padding: 24px, Radius: 20px)
│   │   │   │   └── T Text: "...To apply for the position, candidates must submit [ 131 ] resume before Friday. In addition, [ 132 ] letters of recommendation..."
│   │   │   │       (Ô trống [ 131 ] tô viền vàng sáng khi đang chọn câu 131)
│   │   │   └── ❖ StickyPassagePeeker (Mobile only: Thanh ghim nổi hiển thị dòng ngữ cảnh trích đoạn)
│   │   │
│   │   ├── [KỊCH BẢN PART 2 AUDIO STAGE]:
│   │   │   ├── # Frame: MinimalistAudio_Card (Glass, Center Align, Padding: 36px)
│   │   │   │   ├── ❖ AudioWaveformVisualizer (Sóng âm chuyển động mượt, không thanh tua, không pause)
│   │   │   │   └── T Text: "Nghe kỹ câu hỏi và 3 phương án trả lời (A, B, C). Không có văn bản in trong đề." (Body-Medium, Slate-400)
│   │   │   └── # Note: Tuyệt đối không để rò rỉ text trong payload API câu hỏi Part 2
│   │   │
│   │   └── # Frame: CompanionHint_Pod (Auto Layout: Horizontal, Gap: 12px, Padding: 16px, Glass Refraction)
│   │       ├── ❖ Avatar: Anime_Sparky_Head (44x44px)
│   │       └── T Text: "Lưu ý: Mệnh đề đảo ngữ với 'Not only' bắt buộc mượn trợ động từ đảo lên trước chủ ngữ!"
│   │
│   └── # Frame: RightQuestion_Column (Auto Layout: Vertical, Gap: 16px, Fill container [50%])
│       ├── # Frame: QuestionHeader (Auto Layout: Horizontal, Gap: Auto)
│       │   ├── T Text: "Câu 131 (Part 6): Chọn từ thích hợp điền vào chỗ trống [ 131 ]" (Heading-3)
│       │   └── ❖ Checkbox: "Phân vân / Đoán mò 🚩 (F)" (Gắn cờ isGuessed phục vụ SM-2 q calculation)
│       ├── # Frame: Options_Group (Auto Layout: Vertical, Gap: 12px)
│       │   ├── ❖ Component: QuizOption ("A", "their", Height: 52dp)
│       │   ├── ❖ Component: QuizOption ("B", "they", Height: 52dp, State: Selected)
│       │   ├── ❖ Component: QuizOption ("C", "them", Height: 52dp)
│       │   └── ❖ Component: QuizOption ("D", "themselves", Height: 52dp)
│       └── ❖ Component: Button/Primary ("Xác Nhận Đáp Án (Space)", LG 52dp, Fill container, Tactile Push: scale-98)
│
└── # Frame: FeedbackSheet_Bottom (Conditional Slide-up: Đúng -> Emerald-500, Sai -> Crimson-500)
    ├── T ResultTitle: "Chính Xác! (+15 EXP, +2 💎)"
    ├── T SM2Analysis: "Thời gian làm bài: 12.4s (R_time = 0.82) -> Điểm ghi nhớ tự động gán q = 5!"
    └── ❖ Button: "Trạm Kế Tiếp (Enter)" (Primary, LG 52dp)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:**
  - `Component: QuizOption` (Variants: `State=Default/Selected/Correct/Wrong`, `HotKey=A/B/C/D`, `Height=52dp`)
  - `Component: ClozeHighlightBox` (Variants: `State=Inactive/ActiveFocus/Answered`)
  - `Component: FlagGuessCheckbox` (Props: `isGuessed=true/false`, Hotkey: `F`)
  - `Component: FocusModeHUD` (Pill điều khiển ẩn linh thú và làm tối vignette)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):**
  - Chọn đáp án B ➔ Bấm Space hoặc 'Xác Nhận Đáp Án' ➔ Đẩy dữ liệu lưu tạm với `clientSequence` tăng lên 1 đơn vị.
  - Chấm điểm tức thì $< 200$ ms ➔ Trượt nhẹ FeedbackSheet từ đáy màn hình ➔ Tính sao và cập nhật thanh tiến độ ➔ Bấm Enter chuyển câu tiếp theo.
  - Hoàn thành câu cuối cùng ➔ Navigate to [S-29] Victory Stage.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Linh thú hiển thị ở góc gợi ý chiến thuật cột trái. Khi người dùng bật Focus Mode (`Z`), khung gợi ý tự động mờ tối và linh thú rút về trạng thái tĩnh không gây phân tâm.

---

## S-29 · Kết Quả Vượt Trạm & Tiến Hóa Linh Thú Anime (Victory Stage & Evolution)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Màn hình ăn mừng chiến thắng, trao 3 sao, XP, Gems và kích hoạt nghi thức Tiến hóa Thần thú Anime rực rỡ.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Centered Victory Stage · Radial Aurora Glow`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Scrollable Victory Modal`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-29] Victory_Stage_Desktop (Auto Layout: Vertical, Gap: 24px, Align: Center, Padding: [64, 0, 64, 0], Fill container)
├── # Frame: StarRating_Row (Auto Layout: Horizontal, Gap: 16px, Align: Center)
│   ├── ❖ Icon: Star_Gold (Size: 64x64px, Scale Bounce)
│   ├── ❖ Icon: Star_Gold (Size: 72x72px, Scale Bounce)
│   └── ❖ Icon: Star_Gold (Size: 64x64px, Scale Bounce)
├── T Text: "HOÀN THÀNH XUẤT SẮC TRẠM 21!" (Display-Large, GoldGradient)
│
├── # Frame: Evolution_HighlightPod (Auto Layout: Vertical, Gap: 16px, Padding: 32px, Radius: 24px, Fixed: 680px, Glass, Halo)
│   ├── ❖ Badge: "TIẾN HÓA THẦN THÚ THÀNH CÔNG! (STAGE 2: BRAVE)" (Amber-400)
│   ├── # Frame: EvolutionAnime_Graphic (Center, 280x280px)
│   │   └── ❖ Instance: Anime_Streaklyn_Brave (Khoác áo choàng phiêu lưu, sừng rồng phát quang)
│   ├── T Text: "Kỹ năng mới mở khóa: 'Hộ Thể Streak 24 Giờ' (Tự bảo vệ chuỗi nếu lỡ quên học 1 ngày)" (Body-Medium, White)
│   └── # Frame: RewardsPills_Row (Auto Layout: Horizontal, Gap: 16px, Align: Center)
│       ├── ❖ Pill: "+60 XP Kinh Nghiệm" (Amber-400)
│       └── ❖ Pill: "+20 Đá Quý Gems 💎" (Cyan-400)
│
└── ❖ Component: Button/Primary ("Tiếp Tục Hành Trình Đến Trạm 22", LG 56dp, Width: 380px)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: Star_Gold (Variants: State=Locked/Achieved, Animation=PopIn) · Component: Evolution_HighlightPod

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bấm 'Tiếp Tục Hành Trình' ➔ Navigate to [S-27] Saga Map (Smart Animate Node 22 Unlock, 400ms).

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Streaklyn Anime chiếm vị trí trung tâm, thực hiện vũ đạo xoay tròn 360 độ và bùng nổ tàn lửa nguyên tố.

---

## S-30 · Bài Thi Tốt Nghiệp Chặng (Exit Milestone Exam)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Bài thi Boss 40 câu tổng hợp, đánh giá học viên đã làm chủ kỹ năng của chặng trước khi mở khóa thế giới tiếp theo.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Centered Boss Arena · Gold Border 2px`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Full Boss Challenge`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-30] Milestone_Boss_Desktop (Auto Layout: Vertical, Gap: 24px, Padding: [48, 48, 48, 48], Fixed: 740px, Radius: 24px, GoldBorder)
├── # Frame: Header_Info (Auto Layout: Vertical, Gap: 8px)
│   ├── ❖ Tag: "CHẶNG 2: BOSS MILESTONE" (Amber-500)
│   ├── T Text: "BÀI THI TỐT NGHIỆP: CHINH PHỤC RỪNG SÓNG ÂM" (Heading-1)
│   └── T Text: "Điều kiện vượt chặng 2 và mở khóa Chặng 3: Đỉnh Ngữ Pháp" (Body-Large)
├── # Frame: ExamRules_List (Auto Layout: Vertical, Gap: 12px, Padding: 20px, Radius: 16px, Glass)
│   ├── T Text: "• Số câu hỏi: 40 câu tổng hợp Part 2 & Part 3"
│   ├── T Text: "• Thời gian làm bài: 30 phút (Mô phỏng áp lực thi thật)"
│   └── T Text: "• Điểm chuẩn vượt qua: Tối thiểu 75% chính xác (30/40 câu)"
├── # Frame: TrophyPreview_Row (Auto Layout: Horizontal, Gap: 16px, Align: Center)
│   ├── ❖ TrophyIcon: "Huy hiệu Vàng: Chủ Nhân Sóng Âm Part 3"
│   └── T Text: "+200 XP · +50 Gems 💎 · Mở khóa Echlet Stage 3: Fierce!"
└── # Frame: ActionButtons_Row (Auto Layout: Horizontal, Gap: 16px, Fill container)
    ├── ❖ Component: Button/Secondary ("Ôn Lại Trạm Yếu", LG 52dp, Width: 220px)
    └── ❖ Component: Button/Primary ("BẮT ĐẦU THI TỐT NGHIỆP NGAY", LG 56dp, Fill container)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: TrophyIcon (Variants: State=Locked/Unlocked) · Component: Button/Primary (Theme: GoldFlame)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bấm 'Bắt đầu thi tốt nghiệp' ➔ Navigate to [S-12/S-13] CBT Simulation Mode.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Echlet Anime trong trang phục thánh nữ chiến binh giáp nhẹ, đôi mắt quyết tâm đồng hành cùng học viên.

---

## S-12 / S-13 · Phòng Thi Mô Phỏng CBT Chuẩn ETS (ETS CBT Exam Simulation)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** 200 câu trong 120 phút, giao diện ETS quốc tế nghiêm ngặt, tuyệt đối không có thanh tua âm thanh.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Split Pane 50/50 · ETS Minimalist Slate Canvas`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Tabbed View (Passage / Questions)`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-12] CBT_Simulation_Desktop (Full Screen, Fill: #0F172A, Auto Layout: Vertical, Gap: 0)
├── # Frame: ETS_Header (Auto Layout: Horizontal, Gap: Auto, Padding: [12, 24, 12, 24], Height: 56px, BorderBottom: Slate-800)
│   ├── T Text: "ETS TOEIC® ONLINE TESTING SYSTEM" (Body-Large, Bold, Blue-400)
│   ├── T Text: "Question 142 of 200" (Body-Medium, Slate-300)
│   ├── T Text: "Time Remaining: 00:54:12" (Body-Large, Mono, Warning-500)
│   └── ❖ Component: Button/DangerGhost ("End Test", SM 36dp)
│
└── # Frame: CBT_SplitContent (Auto Layout: Horizontal, Gap: 0, Fill container)
    ├── # Frame: LeftPassagePane (Auto Layout: Vertical, Gap: 16px, Padding: 24px, Fill container [50%], BorderRight: Slate-800)
    │   ├── T Text: "Questions 141-143 refer to the following email:" (Body-Small, Italic)
    │   └── # Frame: EmailPassageText (Scrollable, Body-Medium, 2 đoạn văn chi tiết)
    │
    └── # Frame: RightQuestionPane (Auto Layout: Vertical, Gap: 16px, Padding: 24px, Fill container [50%])
        ├── T Text: "142. What is indicated about the annual conference?" (Heading-3, White)
        ├── # Frame: ETSRadioOptions (Auto Layout: Vertical, Gap: 10px)
        │   ├── ❖ Component: ETS_Option ("(A)", "It will be held at a new convention center.")
        │   ├── ❖ Component: ETS_Option ("(B)", "Keynote speakers have been confirmed.", State: Selected)
        │   ├── ❖ Component: ETS_Option ("(C)", "Registration fees will increase next week.")
        │   └── ❖ Component: ETS_Option ("(D)", "Participants must bring their own laptops.")
        ├── ❖ Checkbox: "Mark for Review 🚩" (Warning-500)
        └── # Frame: CBTNavControls (Auto Layout: Horizontal, Gap: 16px)
            ├── ❖ Component: Button/Secondary ("◄ Back (P)", MD 48dp)
            └── ❖ Component: Button/Primary ("Next ► (N)", MD 48dp)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: ETS_Option (Variants: Letter=A/B/C/D, State=Default/Selected/Flagged)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Phím tắt bàn phím A/B/C/D để chọn đáp án · Phím N sang câu tiếp theo · Phím P lùi câu trước.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Ẩn hoàn toàn linh thú Anime trong phòng thi CBT để đảm bảo 100% tính kỷ luật và môi trường thi thật ETS.

---

## S-14 · Luyện Tập Vi Mô Theo Kỹ Năng (Micro-Drill Focus Pod)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Luyện phản xạ chớp nhoáng 5 câu dưới 3 phút cho từng tiểu kỹ năng, Sparky kích hoạt vệt sét vàng <8s.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Centered Focus Pod: 640 × 480 px`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Fast Single-tap Submit`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-14] MicroDrill_Pod (Auto Layout: Vertical, Gap: 20px, Padding: 36px, Fixed: 640px, Radius: 24px, Glass)
├── # Frame: Header_SpeedHUD (Auto Layout: Horizontal, Gap: Auto)
│   ├── T Text: "MICRO-DRILL: PART 5 ĐẠI TỪ (CÂU 3/5)" (Heading-3)
│   └── ❖ Badge: "⚡ Phản xạ: 4.2s (Mục tiêu: <8s)" (Amber-400)
├── T Text: "The regional manager congratulated the marketing team on ________ successful campaign." (Body-Large)
├── # Frame: FastAnswers_Group (Auto Layout: Vertical, Gap: 10px, Fill container)
│   ├── ❖ Component: FastOption ("A", "they", Height: 52dp)
│   ├── ❖ Component: FastOption ("B", "their", State: Selected, Height: 52dp)
│   ├── ❖ Component: FastOption ("C", "them", Height: 52dp)
│   └── ❖ Component: FastOption ("D", "theirs", Height: 52dp)
└── ❖ Component: Button/Primary ("Kiểm Tra Phản Xạ Ngay", LG 52dp, Fill container)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: FastOption (Variants: State=Default/Selected/SpeedyGold)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Chạm chọn đáp án ➔ Kiểm tra tức thì ➔ Sparky lướt qua màn hình để lại vệt sét vàng.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Sparky Anime (Thiếu niên Lôi Điện) bay vọt qua góc trên bên phải màn hình để lại vệt sấm chớp lấp lánh.

---

## S-15 · Luyện Tập Tự Do Theo Part (Free Practice Part Hub)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Kho luyện tập 7 Part độc lập với số câu hỏi tùy chọn, màu sắc phân biệt rõ ràng giữa Nghe và Đọc.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Bento 7 Ô Part · Fill: Void-950`
- **📱 Frame Mobile:** `Frame Mobile 393 × 1100 px · 7 Thẻ Part kèm thanh %`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-15] FreePractice_Desktop (Auto Layout: Vertical, Gap: 24px, Padding: [32, 80, 48, 80], Fill container)
├── T Text: "KHO LUYỆN TẬP TỰ DO THEO PART" (Heading-1)
├── # Frame: ListeningSection_Grid (Auto Layout: Horizontal, Gap: 16px, Fill container [4 Cột Part Nghe - Xanh Cyan])
│   ├── ❖ Component: PartCard ("Part 1: Hình Ảnh", Accuracy: "88%", Count: "140 câu", Cyan-500)
│   ├── ❖ Component: PartCard ("Part 2: Hỏi & Đáp", Accuracy: "76%", Count: "320 câu", Cyan-500)
│   ├── ❖ Component: PartCard ("Part 3: Hội Thoại", Accuracy: "69%", Count: "210 câu", Cyan-500)
│   └── ❖ Component: PartCard ("Part 4: Bài Nói", Accuracy: "64%", Count: "180 câu", Cyan-500)
└── # Frame: ReadingSection_Grid (Auto Layout: Horizontal, Gap: 16px, Fill container [3 Cột Part Đọc - Tím Violet])
    ├── ❖ Component: PartCard ("Part 5: Điền Câu Ngắn", Accuracy: "82%", Count: "650 câu", Violet-500)
    ├── ❖ Component: PartCard ("Part 6: Điền Đoạn Văn", Accuracy: "71%", Count: "120 câu", Violet-500)
    └── ❖ Component: PartCard ("Part 7: Đọc Hiểu Đa Đoạn", Accuracy: "58%", Count: "280 câu", Violet-500)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: PartCard (Variants: Skill=Listening/Reading, State=Default/Hover)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bấm 'Luyện Ngay' trên Part 7 ➔ Navigate to [S-14] với bộ câu hỏi Part 7.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Mỗi Part có avatar Anime thu nhỏ của linh thú phụ trách (Echlet trên P2/P3, Lumink trên P7, Sparky trên P5).

---

## S-16 · Báo Cáo & Phân Tích Điểm ETS Dự Đoán (Score Certificate & Analytics)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Chứng chỉ số hóa kết quả sau bài thi full test hoặc thi chặng, phân tích phổ điểm và tốc độ theo từng Part.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 1000 px · Hologram Certificate Pod · Bento 3 Khối`
- **📱 Frame Mobile:** `Frame Mobile 393 × 1200 px · Bảng điểm cuộn dọc + Nút chia sẻ`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-16] ScoreCertificate_Desktop (Auto Layout: Vertical, Gap: 24px, Padding: [32, 80, 48, 80], Fill container)
├── # Frame: TopCertificate_Pod (Auto Layout: Horizontal, Gap: 32px, Padding: 36px, Radius: 24px, Elevation-3, Fill container)
│   ├── # Frame: ScoreSummary (Auto Layout: Vertical, Gap: 8px)
│   │   ├── ❖ Badge: "CHỨNG NHẬN KẾT QUẢ THI ETS CBT #04" (Gold-500)
│   │   ├── T Text: "785 / 990" (Display-Large, GoldGradient)
│   │   └── T Text: "Listening: 410/495 (84%) · Reading: 375/495 (78%) · Tốc độ: 34s/câu"
│   └── # Frame: ActionButtons (Auto Layout: Horizontal, Gap: 12px)
│       ├── ❖ Component: Button/Secondary ("Xuất Chứng Chỉ PDF 📄")
│       └── ❖ Component: Button/Primary ("Xem Lời Giải Chi Tiết (S-17)", LG 52dp)
│
└── # Frame: BreakdownBento_Grid (Auto Layout: Horizontal, Gap: 20px, Fill container [3 Cột Phân Tích])
    ├── ❖ Component: BentoAnalysis ("🎧 Phân Bố Nghe Hiểu", Stats: "P1: 100% · P2: 88% · P3: 82% · P4: 80%")
    ├── ❖ Component: BentoAnalysis ("📖 Phân Bố Đọc Hiểu", Stats: "P5: 87% · P6: 75% · P7: 74% (Yếu đa đoạn)")
    └── ❖ Component: BentoAnalysis ("⏱️ Quản Trị Thời Gian", Stats: "Tiết kiệm 6 phút · Tốc độ đọc 185 từ/phút")
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: BentoAnalysis (Props: Title, StatsRows) · Component: Button/Primary

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bấm 'Xem Lời Giải Chi Tiết' ➔ Navigate to [S-17] Explanations with Audio Karaoke.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Cả 5 Anime Guardians tụ họp ở chân chứng chỉ vẫy tay chúc mừng học viên.

---

## S-17 · Xem Lại Bài Thi & Karaoke Âm Thanh Đồng Bộ (Explanations & Synced Audio)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Học viên phân tích câu sai, nghe lại audio đồng bộ lời thoại Karaoke, xem giải thích bẫy đề ETS.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Review Theater Split 50/50`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Chạm từ vựng tua âm thanh`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-17] Review_Theater_Desktop (Auto Layout: Vertical, Gap: 0, Full Screen, Fill: Void-950)
├── # Frame: TopNav_Bar (Auto Layout: Horizontal, Gap: Auto, Padding: [16, 32, 16, 32], Height: 64px)
│   ├── T Text: "XEM LẠI CÂU 47 / 200 (PART 3) — ĐÁP ÁN: C · BẠN CHỌN: B ❌" (Heading-3, Danger-500)
│   └── ❖ Component: Button/Primary ("+ Lưu Vào Sổ Tay SM-2", SM 36dp)
│
└── # Frame: SplitPane_Container (Auto Layout: Horizontal, Gap: 24px, Padding: [24, 32, 24, 32], Fill container)
    ├── # Frame: LeftAudioKaraoke_Pane (Auto Layout: Vertical, Gap: 16px, Padding: 24px, Fill container [50%], Glass)
    │   ├── # Frame: WaveformScrubber (Play, Replay -5s, Speed: 1.0x, Time: 00:24/00:48)
    │   └── # Frame: KaraokeTranscriptBox (Padding: 16px, Radius: 12px, Background: Slate-950)
    │       └── T Text: "...could you please **[inspect this initial proposal first?]**" (Active word highlighted in Gold)
    │
    └── # Frame: RightExplanation_Pane (Auto Layout: Vertical, Gap: 16px, Padding: 24px, Fill container [50%], Glass)
        ├── T Text: "What does the woman ask the man to do?" (Heading-3)
        ├── # Frame: ReviewedOptions (B: Send package [Sai] · C: Review draft proposal [Đúng ✓])
        ├── # Frame: TrapExplanationCard (Padding: 16px, Radius: 12px, IrisBorder)
        │   └── T Text: "💡 Bẫy đồng nghĩa: Người phụ nữ dùng 'inspect proposal' = 'review draft', không phải 'send package'!"
        └── # Frame: PaginationButtons (◄ Câu Trước · Bộ Lọc: Chỉ Xem Câu Sai (22) · Câu Kế Tiếp ►)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: WaveformScrubber (Props: Speed, CurrentTime) · Component: TrapExplanationCard

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Chạm vào từ 'inspect' trong lời thoại ➔ Audio tua ngay tới giây thứ 24 và phát lại câu đó.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Verbil Anime (Hiền triết Cổ Ngữ) cầm cuộn sách ngọc bích, hướng dẫn quy tắc bẫy đồng nghĩa.

---

## S-18 · Sổ Tay Lỗi Sai & Lật Thẻ SM-2 (Smart Mistake Flashcard Deck)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Học viên ôn tập từ vựng và câu sai bằng thuật toán lặp lại ngắt quãng SuperMemo-2 với thẻ lật 3D.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · 3D Flip Card Center Stage · Rating Dock 1-5`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Swipe Gestures Left/Right`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-18] SM2_Deck_Desktop (Auto Layout: Vertical, Gap: 32px, Align: Center, Padding: [48, 0, 48, 0], Fill container)
├── # Frame: DeckInfo_Row (Auto Layout: Horizontal, Gap: 16px)
│   ├── T Text: "SỔ TAY TỪ VỰNG & CÂU SAI SM-2" (Heading-2)
│   └── ❖ Badge: "18 Thẻ Đến Hạn Ôn Hôm Nay" (Warning-500)
│
├── # Frame: 3D_FlipCard (Fixed: 520x340px, Radius: 24px, TransformStyle: preserve-3d, Glassmorphism)
│   ├── [MẶT TRƯỚC]: "INSPECT" /ɪnˈspekt/ · "Please inspect this initial proposal first." · [🔄 Lật Thẻ (Space)]
│   └── [MẶT SAU]: "Kiểm tra kỹ lưỡng, thẩm định" · Từ đồng nghĩa: Review, Examine · Bẫy: Package
│
└── # Frame: SM2_RatingButtons_Row (Auto Layout: Horizontal, Gap: 12px, Align: Center)
    ├── ❖ Component: SM2_Button ("1: Quên Hẳn (1d)", Danger-500)
    ├── ❖ Component: SM2_Button ("2: Mơ Hồ (2d)", Warning-500)
    ├── ❖ Component: SM2_Button ("3: Khó (4d)", Amber-400)
    ├── ❖ Component: SM2_Button ("4: Tốt (7d)", Emerald-400)
    └── ❖ Component: SM2_Button ("5: Hoàn Hảo (14d)", Emerald-500, Selected)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: 3D_FlipCard (Variants: Side=Front/Back) · Component: SM2_Button (Props: Grade 1..5)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bấm phím Space ➔ Card lật 180 độ ➔ Bấm số 4 ➔ Card trượt ra ngoài, card mới trượt vào ➔ Thuật toán SM-2 cập nhật Interval.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Verbil Anime (Hiền triết Rùa Cổ Ngữ) với các phù hiệu La-tinh phát quang, mỉm cười gật gù khi học viên nhớ từ tốt.

---

## S-19 · Thống Kê & Bản Đồ Nhiệt Kỹ Năng (Competency Heatmap & Telemetry)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Trực quan hóa đường cong tăng điểm TOEIC, tham số năng lực IRT theta và bản đồ nhiệt 48 tiểu kỹ năng.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 960 px · Bento Layout · Heatmap Matrix`
- **📱 Frame Mobile:** `Frame Mobile 393 × 1200 px · Danh sách xếp hạng kỹ năng`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-19] Analytics_Desktop (Auto Layout: Vertical, Gap: 24px, Padding: [32, 80, 48, 80], Fill container)
├── T Text: "PHÂN TÍCH NĂNG LỰC CHUYÊN SÂU & BẢN ĐỒ NHIỆT" (Heading-1)
├── # Frame: TopCharts_Row (Auto Layout: Horizontal, Gap: 24px, Fill container)
│   ├── # Frame: ScoreProgressChart (Col: 7, Height: 320px, LineChart: 500 ➔ 785đ, Glass)
│   └── # Frame: IRTTelemetryCard (Col: 5, Height: 320px, Metrics: θ = +1.42, SEM = 0.18, Glass)
└── # Frame: HeatmapMatrix_Card (Auto Layout: Vertical, Gap: 16px, Padding: 28px, Radius: 20px, Glass)
    ├── T Text: "BẢN ĐỒ NHIỆT 48 TIỂU KỸ NĂNG (Xanh: >85% · Vàng: 60-84% · Đỏ: <60% cần bổ trợ)" (Heading-3)
    └── # Frame: HeatmapGrid_Pills (Auto Layout: Wrap, Gap: 8px)
        └── [48 Ô Kỹ Năng: Thì động từ: 88%, Mệnh đề quan hệ: 75%, Giới từ: 52% (Đỏ ⚠️), ...]
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: HeatmapPill (Variants: Level=High/Mid/Low, Color=Green/Yellow/Red)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Hover vào ô kỹ năng Đỏ (Giới từ: 52%) ➔ Tooltip hiện ra ➔ Bấm 'Luyện Ngay' ➔ Mở bài Micro-drill tương ứng.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Lumink Anime cầm kính lúp chỉ điểm chính xác vào kỹ năng yếu nhất cần cải thiện.

---

## S-20 · Đấu Trường & Bảng Xếp Hạng Tuần (Colosseum Leaderboard)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Đua top học tập nhận giải thưởng Gems in-game vào 23:59 Chủ Nhật, bục vinh danh 3D cho Top 3.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · 3D Podium Center · Leaderboard Table`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Bục Top 3 + Thanh thứ hạng ghim đáy`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-20] Arena_Desktop (Auto Layout: Vertical, Gap: 28px, Padding: [32, 80, 48, 80], Fill container)
├── # Frame: Header_Row (Auto Layout: Horizontal, Gap: Auto)
│   ├── T Text: "ĐẤU TRƯỜNG KIM CƯƠNG (MÙA 38)" (Heading-1)
│   └── ❖ Countdown: "⏱️ Còn lại: 2 ngày 04 giờ" (Warning-500)
├── # Frame: 3D_Podium_Row (Auto Layout: Horizontal, Gap: 24px, Align: Bottom, Height: 260px)
│   ├── ❖ PodiumItem ("🥈 #2 Minh Anh", "2,450 XP", Streaklyn Anime, Height: 180px)
│   ├── ❖ PodiumItem ("🥇 #1 Hoàng Long", "3,120 XP", Sparky Anime, Height: 220px, GoldHalo)
│   └── ❖ PodiumItem ("🥉 #3 Thu Trang", "2,210 XP", Lumink Anime, Height: 150px)
└── # Frame: UserRank_PinnedRow (Auto Layout: Horizontal, Gap: 16px, Padding: 16px, Radius: 16px, IrisBorder)
    └── T Text: "Hạng 4 | BẠN (Nguyễn Văn A) · 2,165 XP · Cách Top 3: 45 XP · [Vào Học Đua Top Ngay]"
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: PodiumItem (Variants: Rank=1/2/3, Height=220/180/150px)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bấm 'Vào Học Đua Top Ngay' ➔ Navigate to [S-10] Dashboard.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Linh thú Anime của 3 quán quân đứng ăn mừng trên các bậc bục vàng, bạc, đồng.

---

## S-21 · Cửa Hàng Vật Phẩm Đổi Quà (Gems In-Game Bazaar)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** 100% kinh tế ảo, dùng Gems học tập đổi trang phục linh thú, vé thi thử và băng bảo vệ Streak.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Bento 3 Nhóm Vật Phẩm`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Danh sách vật phẩm đổi quà`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-21] Shop_Desktop (Auto Layout: Vertical, Gap: 24px, Padding: [32, 80, 48, 80], Fill container)
├── # Frame: Header_Row (Auto Layout: Horizontal, Gap: Auto)
│   ├── T Text: "TIỆM ĐỔI QUÀ GEMS (100% MIỄN PHÍ)" (Heading-1)
│   └── ❖ GemsBalance: "💎 SỐ DƯ CỦA BẠN: 450 GEMS" (Cyan-400, Bold)
├── ❖ Banner: "Cam kết không paywall: Toàn bộ vật phẩm chỉ đổi bằng nỗ lực học tập, không có cổng nạp tiền mặt."
└── # Frame: ItemCards_Grid (Auto Layout: Horizontal, Gap: 20px, Fill container [3 Cột Lớn])
    ├── ❖ Component: ShopCard ("❄️ Băng Bảo Toàn Streak", Price: "100 💎", Desc: "Giữ chuỗi khi lỡ 1 ngày", State: Owned)
    ├── ❖ Component: ShopCard ("👑 Vương Miện Tinh Tú", Price: "250 💎", Desc: "Phụ kiện Anime cho Lumink", Button: "Thử Đồ 3D")
    └── ❖ Component: ShopCard ("🎟️ Vé Thi CBT Đặc Biệt", Price: "50 💎", Desc: "Mở khóa đề thi ETS mới", Button: "Đổi Ngay")
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: ShopCard (Props: Name, Price, Icon, State=Available/Owned)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bấm 'Đổi Ngay' ➔ Modal xác nhận trừ Gems ➔ Linh thú Anime nhận trang phục mới.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Lumink Anime thử đội vương miện hoàng gia mới mua và xoay vòng tạo dáng kiêu sa.

---

## S-22 · Hồ Sơ Học Viên & Bộ Sưu Tập Huy Hiệu (Astral Profile & Trophies)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Trưng bày hồ sơ học tập cá nhân, cấp độ linh thú Anime và tủ huy hiệu danh giá 3D.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Bento 4/8 Cols + Tủ Kính Huy Hiệu`
- **📱 Frame Mobile:** `Frame Mobile 393 × 950 px · Thẻ cá nhân + Huy hiệu`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-22] Profile_Desktop (Auto Layout: Vertical, Gap: 24px, Padding: [32, 80, 48, 80], Fill container)
├── # Frame: TopProfile_Grid (Auto Layout: Horizontal, Gap: 24px, Fill container)
│   ├── # Frame: UserIdentity_Card (Col: 4, Auto Layout: Vertical, Gap: 12px, Padding: 24px, Radius: 20px, Glass)
│   │   ├── ❖ Avatar: UserAvatarWithDragonAura (80x80px)
│   │   ├── T Text: "Nguyễn Văn A" (Heading-2)
│   │   └── T Text: "Linh thú chính: Streaklyn (Cấp 12 · Stage 2 Brave)" (Amber-400)
│   └── # Frame: StatsGrid_Card (Col: 8, Auto Layout: Horizontal, Gap: 20px, Padding: 24px, Radius: 20px, Glass)
│       ├── ❖ Stat: "⏱️ 48 Giờ Học" · ❖ Stat: "🔥 14 Ngày Streak" · ❖ Stat: "⭐ 126 Sao Bản Đồ"
│
└── # Frame: TrophyShowcase_Card (Auto Layout: Vertical, Gap: 16px, Padding: 28px, Radius: 20px, Glass)
    ├── T Text: "BỘ SƯU TẬP HUY HIỆU DANH GIÁ (5 / 12)" (Heading-3)
    └── # Frame: Badges_Row (Auto Layout: Horizontal, Gap: 16px)
        ├── ❖ Badge3D ("🏅 Vệ Binh Streak 14 Ngày") · ❖ Badge3D ("⚡ Phản Xạ Thần Tốc <5s")
        ├── ❖ Badge3D ("🎯 Xạ Thủ Nghe Part 1") · ❖ Badge3D ("🏰 Tốt Nghiệp Chặng 2")
        └── ❖ Badge3D ("🔒 Thần Thoại 990", State: Locked)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: Badge3D (Variants: State=Locked/Unlocked, Tilt=On)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Click vào huy hiệu ➔ Modal phóng to hình ảnh kỷ niệm và ngày học viên đạt được huy hiệu.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Streaklyn Anime bay lượn bên cạnh ảnh đại diện cá nhân, khoác áo choàng phiêu lưu.

---

## S-23 · Cài Đặt Hệ Thống & Tùy Chọn Trợ Năng (Control Center & Settings)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Tùy biến giao diện Dark/Light mode, giảm chuyển động hoạt ảnh, quản lý bảo mật PDPD.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Centered Control Pod: 720 × 600 px`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Menu danh mục cài đặt`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-23] Settings_Desktop (Auto Layout: Vertical, Gap: 24px, Padding: [48, 48, 48, 48], Fixed: 720px, Radius: 24px, Glass)
├── T Text: "TRUNG TÂM CÀI ĐẶT HỆ THỐNG" (Heading-1)
├── # Frame: VisualSettings_Group (Auto Layout: Vertical, Gap: 14px)
│   ├── T Text: "1. Giao diện & Hiệu ứng Thị giác" (Heading-3)
│   ├── # Frame: ToggleRow ("Chủ đề giao diện: [🌙 Tối (Void)] [☀️ Sáng]")
│   ├── # Frame: ToggleRow ("Giảm chuyển động 3D (prefers-reduced-motion):", Toggle: OFF)
│   └── # Frame: ToggleRow ("Âm thanh tương tác linh thú:", Toggle: ON)
├── # Frame: NotificationSettings_Group (Auto Layout: Vertical, Gap: 14px)
│   ├── T Text: "2. Nhắc nhở & Bảo vệ Streak" (Heading-3)
│   └── # Frame: ToggleRow ("Nhắc nhở học tập mỗi ngày lúc 20:00:", Toggle: ON)
└── # Frame: PDPDSettings_Group (Auto Layout: Vertical, Gap: 14px)
    ├── T Text: "3. Quyền Riêng Tư & Dữ Liệu Học Viên (PDPD)" (Heading-3)
    └── # Frame: ButtonsRow ([Xuất Dữ Liệu JSON] [Đăng Xuất An Toàn] [Xóa Tài Khoản Vĩnh Viễn])
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: ToggleSwitch (Variants: State=ON/OFF, Size=52x32px)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bật toggle 'Giảm chuyển động' ➔ Toàn bộ giao diện tắt hiệu ứng nghiêng 3D ngay lập tức.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Linh thú Anime chuyển sang trạng thái tĩnh (Static Pose) khi học viên bật chế độ Reduced Motion.

---

## S-25 · Quản Trị Nội Dung & Ngân Hàng Đề Thi (Admin Item Bank)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Admin duyệt, tạo mới và gắn tham số IRT a, b, c cho ngân hàng câu hỏi đề thi.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Spreadsheet Data Table · Filter Toolbar`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Thẻ danh sách câu hỏi rút gọn`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-25] Admin_ItemBank_Desktop (Auto Layout: Vertical, Gap: 20px, Padding: [24, 40, 40, 40], Fill container)
├── # Frame: Header_Row (Auto Layout: Horizontal, Gap: Auto)
│   ├── T Text: "QUẢN TRỊ NGÂN HÀNG CÂU HỎI & MEDIA STUDIO" (Heading-2)
│   └── ❖ Component: Button/Primary ("+ Thêm Câu Hỏi Mới", MD 44dp)
├── # Frame: FilterBar_Row (Auto Layout: Horizontal, Gap: 12px)
│   └── [Lọc theo Part 1-7] [Độ khó IRT b: -3.0 đến +3.0] [Ô Tìm kiếm câu hỏi]
└── # Frame: DataTable_Container (Auto Layout: Vertical, Gap: 0, Radius: 16px, Border: Slate-800)
    ├── # Frame: TableHeaderRow (ID | Part | Trích đoạn nội dung | Tham số IRT a, b (2PL) | Audio | Thao tác)
    ├── # Frame: TableDataRow_1 ("Q1042 | Part 3 | Flight cancellation | a:1.45, b:+0.82 | 🎧 Có | [Sửa] [Xóa]")
    └── # Frame: TableDataRow_2 ("Q1043 | Part 5 | Board of directors | a:1.12, b:-0.45 | ❌ Không | [Sửa] [Xóa]")
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: TableDataRow (Variants: State=Default/Hover/Selected)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Bấm 'Sửa' ➔ Mở Modal chỉnh sửa nội dung và tải lên file âm thanh MP3 mới.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Khu vực quản trị chuyên nghiệp không áp dụng linh thú.

---

## S-26 · Quản Trị Người Dùng & Phân Tích Hệ Thống (Admin User Telemetry)

### 1. Thông Số Frame & Canvas Figma
- **Mục Tiêu Trải Nghiệm:** Giám sát lưu lượng học viên online thời gian thực, độ trễ API và bản đồ trượt trạm Saga.
- **🖥️ Frame Desktop:** `Frame Desktop 1440 × 900 px · Telemetry KPI Grid + User Activity Table`
- **📱 Frame Mobile:** `Frame Mobile 393 × 852 px · Thẻ thống kê KPI nhanh`

### 2. Cây Cấu Trúc Auto Layout & Lồng Ghép Layer (Figma Layer Hierarchy)
```text
# Frame: [S-26] Admin_Telemetry_Desktop (Auto Layout: Vertical, Gap: 24px, Padding: [24, 40, 40, 40], Fill container)
├── T Text: "GIÁM SÁT HỆ THỐNG & TELEMETRY THỜI GIAN THỰC" (Heading-2)
├── # Frame: KPICards_Row (Auto Layout: Horizontal, Gap: 20px, Fill container [3 Thẻ Chỉ Số])
│   ├── ❖ Component: MetricCard ("👥 1,842 Học Viên Online", Sub: "45 Phòng thi CBT đang chạy")
│   ├── ❖ Component: MetricCard ("🗺️ 78.4% Tỉ Lệ Vượt Chặng 1", Sub: "Trạm 21: Điểm nghẽn 32% trượt")
│   └── ❖ Component: MetricCard ("🟢 Độ Trễ API: 42ms", Sub: "Tỉ lệ lỗi hệ thống: 0.02%")
└── # Frame: UserActivityTable (Danh sách học viên, Điểm đầu vào, Điểm dự đoán, Số ngày Streak)
```

### 3. Thành Phần Component & Variants Sử Dụng
- **Component Sets:** Component: MetricCard (Props: Value, Subtext, HealthStatus=Good/Warning)

### 4. Kịch Bản Tương Tác & Prototyping Smart Animate
- **Quy tắc Nối dây (Prototyping Connections):** Click vào 'Trạm 21' ➔ Mở phân tích chuyên sâu các lỗi sai phổ biến của học viên tại trạm này.

### 5. Vị Trí Neo Của Linh Thú Anime (Anime Guardian Anchor)
- **Vị trí & Biểu cảm:** Khu vực quản trị hệ thống không áp dụng linh thú.
