# ĐẶC TẢ THIẾT KẾ MOCKUP UI TOÀN DIỆN (ANTIGRAVITY DESIGN SYSTEM) — TOEIC PRO v10.0.0

> **Tiêu chuẩn Thiết kế:** Antigravity UI/UX Paradigm · Bento 2.0 Spatial Layout · GSAP 3.x Motion Engine · 3D CSS Isometric Snapping · Glassmorphism Ultra-Smooth · Ergonomics Mobile-First.  
> **Đối chiếu Nghiệp vụ:** Đồng bộ 100% với Đặc tả Yêu cầu `SRS-TOEIC-PRO-v10.0.0-Screen-Design-Flows.md`.  
> **Phiên bản:** v10.0.0-PRO-FINAL.

---

## MỤC LỤC HỆ THỐNG MÀN HÌNH MOCKUP UI

- [0. NGUYÊN LÝ THIẾT KẾ ANTIGRAVITY & THƯ VIỆN TOKENS](#0-nguyên-lý-thiết-kế-antigravity--thư-viện-tokens)
  - [0.1 Bốn Trụ Cột Không Trọng Lực (The 4 Antigravity Pillars)](#01-bốn-trụ-cột-không-trọng-lực-the-4-antigravity-pillars)
  - [0.2 Hệ Thống Design Tokens Chuẩn Hóa](#02-hệ-thống-design-tokens-chuẩn-hóa)
  - [0.3 Quy Chuẩn Hoạt Ảnh GSAP & Vật Lý Lò Xo (Spring Physics)](#03-quy-chuẩn-hoạt-ảnh-gsap--vật-lý-lò-xo-spring-physics)
- [PHẦN I: XÁC THỰC & ONBOARDING (S-01 → S-05)](#phần-i-xác-thực--onboarding-s-01--s-05)
  - [S-01 · Trang Giới Thiệu Không Trọng Lực (Antigravity Landing Hero)](#s-01--trang-giới-thiệu-không-trọng-lực-antigravity-landing-hero)
  - [S-02 · Đăng Ký Tài Khoản (Glassmorphic Sign Up)](#s-02--đăng-ký-tài-khoản-glassmorphic-sign-up)
  - [S-03 · Đăng Nhập Hệ Thống (Spatial Login Portal)](#s-03--đăng-nhập-hệ-thống-spatial-login-portal)
  - [S-04 · Xác Thực OTP Thời Gian Thực (Tactile OTP Keypad)](#s-04--xác-thực-otp-thời-gian-thực-tactile-otp-keypad)
  - [S-05 · Onboarding — Thiết Lập Mục Tiêu & Linh Thú (Goal & Companion Setup)](#s-05--onboarding--thiết-lập-mục-tiêu--linh-thú-goal--companion-setup)
- [PHẦN II: KIỂM TRA CHẨN ĐOÁN & THÍCH ỨNG IRT (S-06 → S-09)](#phần-ii-kiểm-tra-chẩn-đoán--thích-ứng-irt-s-06--s-09)
  - [S-06 · Giới Thiệu Bài Chẩn Đoán (Diagnostic Briefing Room)](#s-06--giới-thiệu-bài-chẩn-đoán-diagnostic-briefing-room)
  - [S-07 / S-08 · Phòng Chẩn Đoán Thích Ứng Nghe & Đọc (Adaptive IRT Testing Arena)](#s-07--s-08--phòng-chẩn-đoán-thích-ứng-nghe--đọc-adaptive-irt-testing-arena)
  - [S-09 · Báo Cáo Chẩn Đoán & Sinh Lộ Trình Cá Nhân Hóa (Diagnostic Radar & Path Generator)](#s-09--báo-cáo-chẩn-đoán--sinh-lộ-trình-cá-nhân-hóa-diagnostic-radar--path-generator)
- [PHẦN III: BẢNG ĐIỀU KHIỂN & HÀNH TRÌNH SAGA MAP (S-10, S-11, S-27 → S-30)](#phần-iii-bảng-điều-khiển--hành-trình-saga-map-s-10-s-11-s-27--s-30)
  - [S-10 · Bảng Điều Khiển Học Tập Trung Tâm (Antigravity Dashboard Bento)](#s-10--bảng-điều-khiển-học-tập-trung-tâm-antigravity-dashboard-bento)
  - [S-11 · Kế Hoạch & Nhiệm Vụ Học Tập Chi Tiết (Daily Focus & Task Orbit)](#s-11--kế-hoạch--nhiệm-vụ-học-tập-chi-tiết-daily-focus--task-orbit)
  - [S-27 · Saga Map — Bản Đồ Hành Trình 2.5D Isometric (2.5D Isometric Saga World)](#s-27--saga-map--bản-đồ-hành-trình-25d-isometric-25d-isometric-saga-world)
  - [S-28 · Nút Trạm Bài Học — Trải Nghiệm Vượt Ải (Saga Node Interactive Stage)](#s-28--nút-trạm-bài-học--trải-nghiệm-vượt-ải-saga-node-interactive-stage)
  - [S-29 · Kết Quả Vượt Trạm & Tiến Hóa Linh Thú (Victory Stage & Lexling Evolution)](#s-29--kết-quả-vượt-trạm--tiến-hóa-linh-thú-victory-stage--lexling-evolution)
  - [S-30 · Bài Thi Tốt Nghiệp Chặng — Đánh Giá Ra (Exit Milestone Exam)](#s-30--bài-thi-tốt-nghiệp-chặng--đánh-giá-ra-exit-milestone-exam)
- [PHẦN IV: THI MÔ PHỎNG CBT & LUYỆN TẬP CHUYÊN SÂU (S-12/13, S-14, S-15, S-16, S-17)](#phần-iv-thi-mô-phỏng-cbt--luyện-tập-chuyên-sâu-s-1213-s-14-s-15-s-16-s-17)
  - [S-12 / S-13 · Phòng Thi Mô Phỏng CBT Nghe & Đọc (ETS-Standard CBT Simulation)](#s-12--s-13--phòng-thi-mô-phỏng-cbt-nghe--đọc-ets-standard-cbt-simulation)
  - [S-14 · Luyện Tập Vi Mô Theo Kỹ Năng (Micro-Drill Focus Pod)](#s-14--luyện-tập-vi-mô-theo-kỹ-năng-micro-drill-focus-pod)
  - [S-15 · Luyện Tập Tự Do Theo Part (Free Practice Part Hub)](#s-15--luyện-tập-tự-do-theo-part-free-practice-part-hub)
  - [S-16 · Báo Cáo Điểm & Bảng Điểm ETS Dự Đoán (Score Certificate & Deep Analytics)](#s-16--báo-cáo-điểm--bảng-điểm-ets-dự-đoán-score-certificate--deep-analytics)
  - [S-17 · Xem Lại Bài Thi & Giải Thích Chi Tiết (Detailed Explanations & Audio Karaoke)](#s-17--xem-lại-bài-thi--giải-thích-chi-tiết-detailed-explanations--audio-karaoke)
- [PHẦN V: TIỆN ÍCH HỌC VIÊN & XÃ HỘI HÓA (S-18, S-19, S-20, S-21, S-22, S-23)](#phần-v-tiện-ích-học-viên--xã-hội-hóa-s-18-s-19-s-20-s-21-s-22-s-23)
  - [S-18 · Sổ Tay Lỗi Sai & Ôn Luyện Thẻ SM-2 (Smart SM-2 Flashcard Deck)](#s-18--sổ-tay-lỗi-sai--ôn-luyện-thẻ-sm-2-smart-sm-2-flashcard-deck)
  - [S-19 · Thống Kê & Bản Đồ Nhiệt Kỹ Năng (Competency Heatmap & IRT Telemetry)](#s-19--thống-kê--bản-đồ-nhiệt-kỹ-năng-competency-heatmap--irt-telemetry)
  - [S-20 · Đấu Trường & Bảng Xếp Hạng Hàng Tuần (Antigravity Colosseum & Leaderboard)](#s-20--đấu-trường--bảng-xếp-hạng-hàng-tuần-antigravity-colosseum--leaderboard)
  - [S-21 · Cửa Hàng Vật Phẩm Đổi Quà (Gems In-Game Bazaar)](#s-21--cửa-hàng-vật-phẩm-đổi-quà-gems-in-game-bazaar)
  - [S-22 · Hồ Sơ Học Viên & Bộ Sưu Tập Huy Hiệu (Astral Profile & Trophy Gallery)](#s-22--hồ-sơ-học-viên--bộ-sưu-tập-huy-hiệu-astral-profile--trophy-gallery)
  - [S-23 · Cài Đặt Hệ Thống & Tùy Biến Trải Nghiệm (Antigravity Control Center)](#s-23--cài-đặt-hệ-thống--tùy-biến-trải-nghiệm-antigravity-control-center)
- [PHẦN VI: TRUNG TÂM ĐIỀU HÀNH ADMIN (S-25, S-26)](#phần-vi-trung-tâm-điều-hành-admin-s-25-s-26)
  - [S-25 · Quản Trị Nội Dung & Ngân Hàng Đề Thi (Admin Item Bank & Media Studio)](#s-25--quản-trị-nội-dung--ngân-hàng-đề-thi-admin-item-bank--media-studio)
  - [S-26 · Quản Trị Người Dùng & Phân Tích Hệ Thống (Admin User Telemetry & Health Grid)](#s-26--quản-trị-người-dùng--phân-tích-hệ-thống-admin-user-telemetry--health-grid)

---

## 0. NGUYÊN LÝ THIẾT KẾ ANTIGRAVITY & THƯ VIỆN TOKENS

### 0.1 Bốn Trụ Cột Không Trọng Lực (The 4 Antigravity Pillars)

1. **Trọng Lượng Bằng Không & Nâng Tầng Khuếch Tán (Zero-G Weightlessness):**
   - Mọi khối Bento, hộp thoại và phần tử tương tác đều lơ lửng ở các cao độ khác nhau (`Elevation 1` đến `Elevation 4`).
   - Đổ bóng phân tầng đa lớp (Multi-layer Diffused Shadows): Kết hợp bóng nền đen mờ diện rộng (`0 20px 50px rgba(0,0,0,0.4)`) và bóng viền neon nguyên tố (`0 0 20px rgba(99,102,241,0.15)`), tạo ảo giác vật thể trôi nổi giữa không gian 3 chiều.
2. **Chiều Sâu Không Gian & Khóa Phối Cảnh 3D (Spatial Depth & 3D Snapping):**
   - Sử dụng phối cảnh CSS `perspective: 1000px` đến `1400px` trên container mẹ.
   - Thẻ Bento và bản đồ Saga xoay theo góc nghiêng isometric công thái học (`rotateX(12deg) rotateY(-8deg)` khi ở trạng thái nghỉ, ngả phẳng `rotateX(0deg) rotateY(0deg)` khi kích hoạt tương tác chi tiết).
   - Phân tầng Z-axis rõ rệt: Lớp 0 (Sao & Hạt nền tĩnh), Lớp 1 (Lưới tọa độ mờ), Lớp 2 (Thẻ nội dung nổi), Lớp 3 (Linh thú đồng hành lơ lửng), Lớp 4 (HUD điều hướng và Modal).
3. **Thủy Tinh Mờ Hào Quang (Frosted Glassmorphism 2.0):**
   - Tấm nền bán trong suốt `rgba(30, 41, 59, 0.65)` (Dark) hoặc `rgba(255, 255, 255, 0.75)` (Light).
   - Bộ lọc làm mờ sâu `backdrop-filter: blur(16px) saturate(180%)`.
   - Viền kính siêu mỏng (Subtle Glass Edge): `border: 1px solid rgba(255, 255, 255, 0.12)`, tạo đường phản xạ ánh sáng tinh xảo khi di chuột qua.
4. **Động Cơ Hoạt Ảnh Tương Tác GSAP & Vật Lý Lò Xo:**
   - Tuyệt đối không thay đổi trạng thái đột ngột (No sudden snapping). Tất cả tương tác đều có quán tính mượt mà (`duration: 0.35s`, `ease: "power3.out"` hoặc `elastic.out(1, 0.75)`).
   - Hiệu ứng Domino Stagger: Khi trang tải, các thẻ Bento không xuất hiện cùng lúc mà rơi nhẹ từ trục Y âm (`y: -20px -> 0px`) cách nhau `stagger: 0.08s`.
   - Tương tác thị giác xúc giác: Con trỏ di chuyển đến đâu, thẻ nghiêng nhẹ theo gia tốc chuột (Magnetic 3D Tilt).

### 0.2 Hệ Thống Design Tokens Chuẩn Hóa

```css
:root {
  /* Quy Chuẩn Typography Display & Chuyên Dụng (Strict Font Stack) */
  --font-display: "Geist", "Satoshi", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", "SF Mono", monospace;
  --font-body: "Inter", "Geist Sans", sans-serif;
  
  /* CẤM TUYỆT ĐỐI AI LILA: Nghiêm cấm sử dụng sắc tím generic/AI Lila (#8A2BE2, #9333EA, #C084FC) làm màu nền hoặc màu chủ đạo. 
     Bắt buộc sử dụng hệ màu Deep Slate (#0B0F19), Obsidian (#020617), Sapphire Iris (#6366F1), cùng viền khúc xạ kính Liquid Glass. */

  /* Bảng màu nhận diện thương hiệu & trạng thái học tập */
  --primary-500: #6366F1;   /* Bright Iris: Trạm hiện tại, CTA chính, Ánh sáng ma thuật */
  --primary-400: #818CF8;   /* Iris Glow: Viền phát quang, hover card */
  --primary-600: #4F46E5;   /* Deep Iris: Nút kích hoạt active, điểm nhấn */
  
  --success-500: #10B981;   /* Emerald Green: Đúng, 3 sao, Chuỗi Streak bảo toàn */
  --success-400: #34D399;   /* Emerald Aura: Tia sáng thăng cấp */
  
  --warning-500: #F59E0B;   /* Amber Flame: Lửa Streak, Thẻ SM-2 đến hạn ôn tập */
  --warning-400: #FBBF24;   /* Amber Spark: Ngôi sao kinh nghiệm XP */
  
  --danger-500: #EF4444;    /* Crimson Red: Lỗi sai, Bẫy ETS, Đếm ngược nguy cấp */
  --danger-400: #F87171;    /* Crimson Glow: Cảnh báo thời gian dưới 5 phút */
  
  /* Bảng màu Nền Thần Tinh Void (Dark Theme Chuẩn) */
  --neutral-950: #090D16;   /* Deep Abyss: Nền vũ trụ sâu thẳm */
  --neutral-900: #0F172A;   /* Slate Void: Nền giao diện chuẩn, Sidebar */
  --neutral-850: #151F32;   /* Elevated Slate: Mặt bằng bento lơ lửng bậc 1 */
  --neutral-800: #1E293B;   /* Slate Card: Thẻ bento chuẩn, Surface Level 2 */
  --neutral-700: #334155;   /* Border Line: Viền phân tách kính */
  --neutral-400: #94A3B8;   /* Muted Text: Chú thích, số hiệu Part */
  --neutral-100: #F1F5F9;   /* Bright Text: Văn bản chính, tiêu đề bài thi */

  /* 4 Quần Xã Sinh Thái Saga (4 Biomes Standardized Tokens) */
  /* Biome 1: SUNRISE_VALLEY (Tiến độ 0% - 25% · Khởi động & Nền tảng) */
  --biome-sunrise-bg: #064E3B;      /* Deep Emerald Mist */
  --biome-sunrise-accent: #10B981;  /* Morning Emerald */
  --biome-sunrise-dawn: #F59E0B;    /* Sunrise Amber */
  --biome-sunrise-gradient: linear-gradient(135deg, #064E3B 0%, #0F766E 50%, #F59E0B 100%);

  /* Biome 2: ECHO_FOREST (Tiến độ 26% - 50% · Phản xạ Âm thanh Part 1-4) */
  --biome-echo-bg: #042F2E;         /* Deep Forest Teal */
  --biome-echo-accent: #14B8A6;     /* Echo Teal */
  --biome-echo-wave: #06B6D4;       /* Audio Wave Cyan */
  --biome-echo-gradient: linear-gradient(135deg, #042F2E 0%, #0D9488 50%, #06B6D4 100%);

  /* Biome 3: GRAMMAR_CANYON (Tiến độ 51% - 75% · Hẻm Núi Cú Pháp & Logic Part 5-6) */
  --biome-canyon-bg: #451A03;       /* Earthy Canyon Ochre */
  --biome-canyon-accent: #F97316;   /* Canyon Rust Orange */
  --biome-canyon-gold: #EAB308;     /* Syntax Amber Gold */
  --biome-canyon-gradient: linear-gradient(135deg, #451A03 0%, #C2410C 50%, #EAB308 100%);

  /* Biome 4: APEX_SUMMIT (Tiến độ 76% - 100% · Đỉnh Cao Tốc Độ & Part 7 Thử Thách) */
  --biome-summit-bg: #0F172A;       /* Obsidian Night */
  --biome-summit-accent: #3B82F6;   /* Apex Sapphire */
  --biome-summit-crown: #FBBF24;    /* Master Gold */
  --biome-summit-gradient: linear-gradient(135deg, #0F172A 0%, #1D4ED8 50%, #FBBF24 100%);
  
  /* Lớp Kính Khúc Xạ Liquid Glass & Đổ Bóng Tán Xạ (Diffusion Shadows) */
  --liquid-glass-bg: rgba(15, 23, 42, 0.72);
  --liquid-glass-border: 1px solid rgba(255, 255, 255, 0.10);
  --liquid-glass-refract: inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.25);
  --liquid-glass-blur: blur(20px) saturate(190%);
  --shadow-diffused-lg: 0 20px 40px -15px rgba(0, 0, 0, 0.65), 0 0 30px -5px rgba(99, 102, 241, 0.15);

  /* Chế Độ Tập Trung Cao Độ (Focus Mode / Meditative Rest Tokens) */
  --focus-scrim-backdrop: rgba(2, 6, 23, 0.88);
  --focus-stage-glow: 0 0 60px rgba(99, 102, 241, 0.18);
  --viewport-stable-height: min(100dvh, 100vh);

  /* Quy Chuẩn Iconography: Nghiêm cấm Emoji UTF-8 thô trong UI điều hướng; bắt buộc 100% dùng SVG Icon (Phosphor / Radix Icons) */
  --icon-size-sm: 16px;
  --icon-size-md: 20px;
  --icon-size-lg: 24px;

  /* Lớp Candy Accent (Candy Crush Juice cho Thắng Ải, Mở Rương & Nút Thưởng) */
  --candy-pink: #FF6B9D;    /* Kẹo dâu hồng bão hòa */
  --candy-gold: #FFC15E;    /* Kẹo cam hoàng kim */
  --candy-lemon: #FFE66D;   /* Kẹo chanh phát sáng */
  --candy-gradient: linear-gradient(135deg, #FF6B9D 0%, #FFC15E 50%, #FFE66D 100%);
  --candy-glow: 0 0 25px rgba(255, 107, 157, 0.5);
  --candy-bevel: inset 0 2px 0 rgba(255, 255, 255, 0.35), inset 0 -3px 0 rgba(0, 0, 0, 0.25);
  
  /* Scrim Token Bảo Vệ Tương Phản Trên Kính Mờ (Bảo đảm WCAG AA >= 4.5:1) */
  --scrim-dark: rgba(9, 13, 22, 0.78); /* Lớp lót tối mờ dưới chữ khi trôi trên hạt sao */

  /* Chế Độ Đọc Chống Mỏi Mắt Reading (Paper / Sepia Exam Mode) */
  --paper-bg: #F8F6F0;      /* Giấy ngà tự nhiên */
  --paper-text: #1E293B;    /* Chữ than đậm độ tương phản cao 12.8:1 */
  --paper-border: #E2E8F0;  /* Viền tài liệu giấy */
  
  /* Thông số Không Trọng Lực & Chiều Sâu 3D */
  --perspective-default: 1200px;
  --glass-bg: rgba(30, 41, 59, 0.70);
  --glass-border: 1px solid rgba(255, 255, 255, 0.12);
  --glass-blur: blur(16px);
  --shadow-elevation-1: 0 8px 24px -4px rgba(0, 0, 0, 0.3);
  --shadow-elevation-2: 0 16px 36px -6px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.12);
  --shadow-elevation-3: 0 24px 60px -8px rgba(0, 0, 0, 0.5), 0 0 35px rgba(99, 102, 241, 0.22);

  /* Tầng Thích Ứng Hiệu Năng (Adaptive Performance Tiers cho Android) */
  --tier1-blur: blur(16px);
  --tier2-blur: blur(8px);
  --tier3-blur: none;
  --tier3-bg: rgba(15, 23, 42, 0.94);

  /* Asset Tokens Thần Thức Anime (WebP Alpha · Retina 3x · Zero-Opaque Jpeg) */
  --mascot-asset-format: "image/webp";
  --mascot-asset-fallback: "image/png";
  --mascot-asset-max-size: 150KB;
  --mascot-base-path: "/lexlings";
  --mascot-mvp-stage: 1; /* Khóa MVP: Stage 1 Sơ Tâm */
  --mascot-mvp-expressions: 5; /* idle, focus, victory, comfort, evolution */
  --mascot-mvp-asset-count: 25; /* 5 Thần Thức x 5 Biểu cảm WebP Alpha */
}
```

### 0.2.1 Quy Chuẩn Kỹ Thuật Asset Thần Thức Anime & Khóa Phạm Vi MVP

> **P0 Blocker Resolution:** Toàn bộ asset linh thú hộ mệnh phải tuân thủ chuẩn WebP có kênh alpha trong suốt (100% transparent background) nhằm khắc phục hoàn toàn lỗi viền hộp đen/trắng khi đặt trên nền vũ trụ tối hoặc kính mờ Liquid Glass. Tuyệt đối **CẤM** sử dụng JPEG.

| Quy Chuẩn Kỹ Thuật | Đặc Tả Chi Tiết |
|:---|:---|
| **Định dạng chuẩn** | **WebP có kênh Alpha (Transparency)** · Fallback: PNG-24 Alpha |
| **CẤM TUYỆT ĐỐI** | **JPEG ❌** (Không hỗ trợ Alpha Channel) |
| **Độ phân giải gốc** | $1024 \times 1024\text{ px}$ (Retina 3x sắc nét trên mọi mật độ điểm ảnh) |
| **Dung lượng tối đa** | $\le 150\text{ KB}$ / file WebP (nén lossy alpha q=85) |
| **Khóa Phạm Vi MVP** | **Stage 1 (Sơ Tâm) × 5 Biểu Cảm × 5 Thần Thức = 25 File Tĩnh** |
| **5 Biểu Cảm MVP** | `idle` (Nghỉ), `focus` (Tập trung), `victory` (Thắng), `comfort` (An ủi), `evolution` (Tiến hóa) |
| **Cấu trúc URL** | `/lexlings/{character}_{expression}.webp` (Fallback MVP: `{character}_anime.webp`) |
| **Lộ trình Vector-Rig** | Phase 1: WebP Tĩnh $\rightarrow$ Phase 2: Lottie JSON $\rightarrow$ Phase 3: Spine 2D $\rightarrow$ Phase 4: Rive State Machine |


### 0.3 Quy Chuẩn Hoạt Ảnh GSAP & Vật Lý Lò Xo (Spring Physics)

```javascript
// Chuẩn cấu hình GSAP Core cho giao diện Antigravity
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const AntigravityMotion = {
  entranceBento: (selector) => {
    return gsap.fromTo(selector, 
      { opacity: 0, y: 35, rotateX: 6, transformPerspective: 1000 },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        duration: 0.65, 
        ease: "power3.out", 
        stagger: 0.08, 
        clearProps: "transform" 
      }
    );
  },

  floatElement: (selector, distance = 8, cycleDuration = 3.2) => {
    return gsap.to(selector, {
      y: `+=${distance}`,
      rotateZ: "+=0.8",
      duration: cycleDuration,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  },

  cardTilt: (element, event) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    
    gsap.to(element, {
      rotateY: x * 0.06,
      rotateX: -y * 0.06,
      transformPerspective: 900,
      duration: 0.35,
      ease: "power2.out"
    });
  },

  cardReset: (element) => {
    gsap.to(element, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.45,
      ease: "elastic.out(1, 0.75)"
    });
  },

  /* Candy Crush Spring Physics (Cho Nút Thưởng & Khoảnh Khắc Thắng) */
  candyBounce: (element) => {
    return gsap.timeline()
      .to(element, { scale: 0.92, duration: 0.08, ease: "power1.in" })
      .to(element, { scale: 1.08, duration: 0.18, ease: "back.out(2.5)" })
      .to(element, { scale: 1.0, duration: 0.15, ease: "power2.out" });
  },

  /* Cao trào Thưởng (Reward Crescendo 3 Mức Sao) */
  rewardCrescendo: (starCount = 3) => {
    const tl = gsap.timeline();
    // 1. Rung màn hình nhẹ (Screen-shake)
    tl.to("body", { x: 3, y: -2, duration: 0.04, repeat: 3, yoyo: true, ease: "none" });
    // 2. Điểm số chạy nhảy (Count-up XP & Gems)
    tl.fromTo(".reward-counter", { scale: 1.4, color: "#FFE66D" }, { scale: 1.0, color: "#FFFFFF", duration: 0.4, ease: "elastic.out(1.2, 0.4)" });
    return tl;
  }
};
```

### 0.4 Quy Chuẩn Thành Phần Giao Diện Bổ Sung (New Essential Primitives)

#### 🍬 1. Nút Bấm Kẹo Ngọt (Candy Button Primitive)
- **Mục đích:** Mang lại cảm giác "đã tay, mọng nước" đặc trưng casual game cho các hành động nhận quà, mở rương, tiếp tục thắng ải (S-24, S-28, S-29), tương phản rõ với nút "nghiêm túc" phẳng của phòng thi CBT (S-13).
- **Quy cách CSS:**
  ```css
  .btn-candy {
    background: linear-gradient(180deg, #FF6B9D 0%, #FF4D85 100%);
    box-shadow: 0 6px 0 #D81B60, 0 12px 20px rgba(255, 77, 133, 0.4);
    border-radius: 16px;
    border-top: 1.5px solid rgba(255, 255, 255, 0.6);
    color: #FFFFFF;
    font-weight: 800;
    transition: all 0.1s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .btn-candy:active {
    transform: translateY(4px);
    box-shadow: 0 2px 0 #D81B60, 0 4px 10px rgba(255, 77, 133, 0.3);
  }
  ```

#### 🛡️ 2. Lớp Lót Kính Mờ An Toàn (Dark Scrim Layer Primitive)
- **Mục đích:** Đảm bảo chữ trên kính mờ luôn đạt chuẩn WCAG AA ($\ge 4.5:1$) ngay cả khi hạt particle hoặc dải ngân hà sáng lướt qua bên dưới.
- **Quy cách CSS:**
  ```css
  .scrim-text-pod {
    background: rgba(9, 13, 22, 0.82);
    backdrop-filter: blur(12px);
    border-radius: 12px;
    padding: 12px 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  ```

#### 📖 3. Khung Đọc Giấy Ngà (Paper Mode Container for Reading)
- **Mục đích:** Giảm nhức mỏi mắt khi đọc các đoạn văn Part 6 & Part 7 dài trong 75 phút thi.
- **Quy cách CSS:**
  ```css
  .reading-paper-container {
    background: #F8F6F0;
    color: #1E293B;
    border-radius: 16px;
    padding: 24px;
    font-size: 16px;
    line-height: 1.65;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
  }
  ```

---

## S-01 · Trang Giới Thiệu Không Trọng Lực (Antigravity Landing Hero)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Thu hút học viên với giao diện vũ trụ học tập không trọng lực, trình bày hệ sinh thái 100% miễn phí, bản đồ Saga 2.5D và 5 Linh thú Hộ mệnh.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Deep Starfield (Canvas Twinkle Particles) | Layer 1: Ambient Glow Orbs (`#6366F1` & `#10B981`) | Layer 2: Hero Content & Floating Bento Cards (Z: 20px) | Layer 3: Interactive 3D Model Saga Stage (Z: 50px) | Layer 4: Sticky Glass Navbar (Z: 100px)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO   [Tính Năng ▾]   [Lộ Trình Saga]   [Đấu Trường]       [🌐 VI]  [Đăng Nhập] [Bắt Đầu Free]|
+---------------------------------------------------------------------------------------------------------+
|  HERO 3D STAGE (Perspective: 1400px)                                                                    |
|  +--------------------------------------------+  +---------------------------------------------------+  |
|  | [Badge: 100% MIỄN PHÍ · ZERO PAYWALL]     |  | 🛸 FLOATING 2.5D SAGA PREVIEW STAGE               |  |
|  | CHINH PHỤC TOEIC 990 BẰNG                  |  | (Isometric tilted 20deg, Z-axis floating cards)   |  |
|  | TRÍ TUỆ NHÂN TẠO THÍCH ỨNG                 |  |                                                   |  |
|  | VÀ LINH THÚ HỘ MỆNH                        |  |       [ 🌟 Streaklyn (Stage 1 Flame) ]            |  |
|  |                                            |  |      /                                             |  |
|  | Không khóa tính năng. Không giục nạp VIP.  |  |  [Trạm 01: S-06] ---- [Trạm 02: Part 5] -- [Boss]  |  |
|  | Đoán điểm chuẩn xác qua mô hình IRT 2 tham |                                                      |
|  | số Logistic (2PL).                          |  |  * Nhấp để tương tác xoay 3D trực tiếp            |  |
|  | [ 🚀 Làm Bài Chẩn Đoán Free ] [ Xem Demo ] |  +---------------------------------------------------+  |
|  +--------------------------------------------+                                                         |
+---------------------------------------------------------------------------------------------------------+
|  BENTO 2.0 FEATURE SHOWCASE (Staggered Grid 4 Cột)                                                      |
|  +----------------------+ +----------------------+ +----------------------+ +----------------------+  |
|  | 🔮 Test Chẩn Đoán    | | 🗺️ Saga Map 2.5D    | | ⚡ CBT Chuẩn ETS     | | 🦊 5 Linh Thú Độc Bản|  |
|  | Thuật toán CAT/IRT   | | 4 Quần Xã, ≤90 Trạm, | | Mô phỏng 100% phòng  | | Sparky, Echlet,      |  |
|  | sai số SEM ±35-50đ   | | Vượt ải mở rương vàng| | thi thật không giật  | | Lumink, Streaklyn, V.|  |
|  +----------------------+ +----------------------+ +----------------------+ +----------------------+  |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| [≡] TOEIC PRO             [ĐN] 👤 |
+-----------------------------------+
| [Badge: 100% Free · No Paywall]   |
| CHINH PHỤC TOEIC 990              |
| BẰNG AI & LINH THÚ               |
|                                   |
| +-------------------------------+ |
| | 🐉 STREAKLYN 3D INTERACTIVE   | |
| | (Vuốt để xoay vòng 360 độ)    | |
| | [ Chạm để nghe tiếng gầm ]    | |
| +-------------------------------+ |
|                                   |
| [ 🚀 LÀM TEST CHẨN ĐOÁN (52dp) ]  |
| [ 📖 Xem Lộ Trình Học Tập ]      |
|                                   |
| --- BENTO TÍNH NĂNG NỔI BẬT ---   |
| +-------------------------------+ |
| | 🔮 Chẩn đoán CAT/IRT Chuẩn ETS| |
| +-------------------------------+ |
| | 🗺️ Bản đồ Saga Tối Đa 90 Trạm | |
| +-------------------------------+ |
| | 🦊 Đồng hành 5 Linh Thú       | |
| +-------------------------------+ |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .hero-stage { perspective: 1200px; transform: rotateX(10deg) rotateY(-12deg); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); } .hero-stage:hover { transform: rotateX(0deg) rotateY(0deg); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.timeline().from('.hero-badge', { y: -20, opacity: 0, duration: 0.4 }).from('.hero-title', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2').from('.bento-card', { y: 40, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'back.out(1.2)' }, '-=0.3');
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Streaklyn (Stage 1 Baby) bay lơ lửng ở góc phải Hero Stage (`right: 8%`, `top: 25%`). Khi hover vào nút 'Làm Bài Chẩn Đoán', Streaklyn thở ra một vòng khói trái tim phát sáng vàng.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Nền: `--neutral-950` (#090D16) | Thẻ: `--neutral-800` (rgba(30,41,59,0.7)) | Viền: `--glass-border` | CTA: `--primary-500` (#6366F1) & `--warning-500` (#F59E0B)

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Nút CTA có chiều cao 56dp trên mobile, khoảng đệm an toàn ngón tay cái (Thumb zone) cách cạnh dưới 24px. Hỗ trợ tắt toàn bộ chuyển động xoay 3D với `prefers-reduced-motion`.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-02 · Đăng Ký Tài Khoản (Glassmorphic Sign Up)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Cho phép học viên tạo tài khoản mới qua Email hoặc Google/GitHub một chạm, hiển thị cam kết 100% miễn phí vĩnh viễn.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Gradient Mesh Nền xanh tím | Layer 1: Hộp thoại kính đôi (Floating Split Glass Pod, Z: 30px) | Layer 2: Input Field nổi có viền Focus Glow (`#818CF8`) | Layer 3: Linh thú chào đón tương tác

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO                                                                         [← Về Trang Chủ]|
+---------------------------------------------------------------------------------------------------------+
|  CONTAINER KHÔNG GIAN (Center Focus, Z-Elevation: 3)                                                    |
|       +-----------------------------------------------------------------------------------------+       |
|       | [Cột Trái: Trải nghiệm]                 | [Cột Phải: Form Kính Glassmorphism]           |       |
|       | 🌟 KHỞI ĐẦU HÀNH TRÌNH                  | ĐĂNG KÝ TÀI KHOẢN PRO                         |       |
|       | - Đoán đúng trình độ trong 20 phút.     | Nhận ngay Linh thú Hộ mệnh độc quyền          |       |
|       | - Lưu tiến độ Saga Map vĩnh viễn.       | [ 🇬 Google Tiếp Tục ] [ 🐙 GitHub ]           |       |
|       | - Hoàn toàn không quảng cáo rác.        | ------------------ HOẶC --------------------- |       |
|       | [ Minh họa: 5 Linh thú chào đón ]       | Họ và tên: [ Nguyễn Văn A                   ] |       |
|       | "Cam kết 100% Free · Xóa bỏ Paywall"    | Email:     [ hocvien@toeicpro.edu.vn        ] |       |
|       |                                         | Mật khẩu:  [ ••••••••••••••••             👁 ] |       |
|       |                                         | [✓] Tôi đồng ý Điều khoản & Bảo vệ PDPD       |       |
|       |                                         | [ 🚀 TẠO TÀI KHOẢN VÀ CHỌN LINH THÚ (52dp)  ] |       |
|       +-----------------------------------------------------------------------------------------+       |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| [←] TOEIC PRO                     |
+-----------------------------------+
| ĐĂNG KÝ HỌC VIÊN 100% FREE        |
| [ 🇬 Tiếp tục với Google (52dp)  ] |
| [ 🐙 Tiếp tục với GitHub        ] |
| -------- HOẶC VỚI EMAIL --------- |
| Họ & Tên: [ Trần Văn B          ] |
| Email:    [ hocvien@example.com ] |
| Mật khẩu: [ ••••••••          👁 ] |
| [✓] Đồng ý Điều khoản PDPD        |
| [ 🚀 TẠO TÀI KHOẢN (52dp)       ] |
| Đã có tài khoản? [Đăng nhập]      |
| 🦊 Lumink: "Đăng ký để tớ soi bẫy |
| đề thi giúp bạn nhé!"             |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .glass-signup-card { backdrop-filter: blur(20px); background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); transform: translateY(-5px); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.glass-signup-card', { opacity: 0, scale: 0.94, y: 30, duration: 0.6, ease: 'power3.out' }); gsap.from('.input-group', { opacity: 0, x: 20, stagger: 0.08, duration: 0.4, ease: 'power2.out', delay: 0.2 });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Lumink (Chồn Tinh Tú) cầm kính lúp đứng ở cạnh trên bên trái thẻ đăng ký (`left: -30px`, `top: -20px`). Khi nhập mật khẩu hợp lệ, kính lúp của Lumink phát sáng hào quang vàng (`#F59E0B`).

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Primary: `--primary-500` (#6366F1) | Border Glass: rgba(255,255,255,0.12) | Focus Glow: `--primary-400` (#818CF8)

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Inputs có chiều cao tối thiểu 48dp, nút CTA 52dp. Bàn phím ảo trên mobile đẩy màn hình mượt mà không che mất nút Submit.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-03 · Đăng Nhập Hệ Thống (Spatial Login Portal)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Học viên đăng nhập an toàn, tiếp tục hành trình học dang dở trên bản đồ Saga hoặc bài thi mô phỏng CBT.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Orbital Ring Animation (Vòng xoay không gian 3D mờ) | Layer 1: Floating Glass Panel (`box-shadow: 0 30px 60px rgba(0,0,0,0.6)`) | Layer 2: Form Controls | Layer 3: Particle Fire Embers (Tàn lửa từ Streaklyn)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO                                                                         [← Về Trang Chủ]|
+---------------------------------------------------------------------------------------------------------+
|  SPATIAL PORTAL STAGE (Perspective: 1200px)                                                             |
|                           +-----------------------------------------------+                             |
|                           | [🪐 CỔNG ĐĂNG NHẬP KHÔNG TRỌNG LỰC]           |                             |
|                           | Chào mừng bạn trở lại với Toeic Pro!          |                             |
|                           | [ 🇬 Đăng nhập nhanh bằng Google             ] |                             |
|                           | ------------------- HOẶC -------------------- |                             |
|                           | Email:    [ hocvien@toeicpro.edu.vn         ] |                             |
|                           | Mật khẩu: [ ••••••••••••••••••••••••••    👁 ] |                             |
|                           | [✓] Ghi nhớ đăng nhập    [Quên mật khẩu?]     |                             |
|                           | [ ⚡ VÀO BÀN HỌC & TIẾP TỤC HÀNH TRÌNH (52dp)]|                             |
|                           | Chưa có tài khoản? [Đăng ký miễn phí]         |                             |
|                           +-----------------------------------------------+                             |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| [←] TOEIC PRO                     |
+-----------------------------------+
| CHÀO MỪNG TRỞ LẠI! 🔥 Streak 14d  |
| [ 🇬 Đăng nhập bằng Google (52dp)] |
| ------------ HOẶC --------------- |
| Email:    [ hocvien@toeicpro.edu] |
| Mật khẩu: [ ••••••••••        👁 ] |
| [✓] Nhớ mật khẩu  [Quên mã?]      |
| [ ⚡ VÀO HỌC NGAY (52dp)         ] |
| Chưa có tài khoản? [Đăng ký]      |
| 🔥 Streaklyn: "Đừng để lửa tắt!"  |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .login-pod { transform: perspective(1000px) rotateX(4deg); transition: transform 0.3s ease; } .login-pod:focus-within { transform: perspective(1000px) rotateX(0deg); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.login-pod', { scale: 0.9, opacity: 0, y: 25, duration: 0.5, ease: 'power3.out' }); gsap.to('.orbital-ring', { rotate: 360, duration: 40, repeat: -1, ease: 'none' });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Streaklyn ôm ngọn đuốc đứng cạnh nút đăng nhập. Nếu người dùng nhập sai mật khẩu, ngọn đuốc của Streaklyn xìu xuống khói xám nhẹ an ủi.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Accent: `--primary-500` | Warning Fire: `--warning-500` (#F59E0B) | Background: `--neutral-900`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Hỗ trợ Touch ID / Face ID WebAuthn nếu trình duyệt cho phép. Nút bấm chuẩn 52dp dễ chạm.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-04 · Xác Thực OTP Thời Gian Thực (Tactile OTP Keypad)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Xác minh hộp thư hoặc khôi phục mật khẩu thông qua mã 6 chữ số với hiệu ứng xúc giác và đếm ngược tự động kích hoạt lại.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Blurred backdrop (Phủ mờ sâu toàn màn hình) | Layer 1: Floating OTP Card (Elevation 3) | Layer 2: 6 Hộp nhập số với viền ánh sáng tự chuyển tiêu điểm (Auto-focus shift)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO                                                                                        |
+---------------------------------------------------------------------------------------------------------+
|  CONTAINER TRUNG TÂM (Tactile Floating Pod)                                                             |
|                           +-----------------------------------------------+                             |
|                           | 📬 XÁC THỰC MÃ BẢO MẬT OTP                    |                             |
|                           | Mã gồm 6 số đã được gửi tới user***@gmail.com |                             |
|                           |                                               |                             |
|                           |      [ 4 ]  [ 8 ]  [ 1 ]  [ 9 ]  [ • ]  [ • ] |                             |
|                           |      (Mỗi ô 56x64px, Glassmorphism, Neon Glow)|                             |
|                           |                                               |                             |
|                           | ⏱️ Mã có hiệu lực trong: 01:45                |                             |
|                           | [ Chưa nhận được mã? Gửi lại sau 45s ]        |                             |
|                           | [ 🛡️ XÁC NHẬN VÀ KÍCH HOẠT TÀI KHOẢN (52dp) ] |                             |
|                           +-----------------------------------------------+                             |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| [←] Quay lại                      |
+-----------------------------------+
| 📬 XÁC THỰC EMAIL                 |
|   [ 4 ] [ 8 ] [ 1 ] [ 9 ] [   ] [ ]|
| ⏱️ Còn lại: 01:45  [ Gửi lại mã ] |
| [ 🛡️ XÁC NHẬN NGAY (52dp)        ] |
| 🦉 Echlet: "Tớ lấy thư về rồi đó, |
| nhớ kiểm tra cả hòm thư Spam nhé!"|
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .otp-box { width: 56px; height: 64px; border-radius: 12px; background: rgba(30,41,59,0.8); border: 2px solid rgba(255,255,255,0.15); font-size: 28px; font-weight: bold; transition: all 0.2s ease; } .otp-box:focus { border-color: #6366F1; box-shadow: 0 0 15px rgba(99,102,241,0.5); transform: translateY(-3px); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.otp-box', { scale: 0.5, opacity: 0, stagger: 0.06, duration: 0.35, ease: 'back.out(1.7)' });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Echlet (Cú Mèo Sóng Âm) đậu trên đỉnh hộp OTP (`top: -35px`, `right: 20px`), mỗi lần người dùng gõ đúng 1 ký tự, tai Echlet rung nhẹ phát sóng âm mini.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Focus Border: `--primary-500` | Expired Red: `--danger-500` | Text: White

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Bàn phím di động tự động mở `inputmode='numeric'`. Tự động dán từ clipboard (Auto-paste SMS/Email OTP).
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-05 · Onboarding — Thiết Lập Mục Tiêu & Linh Thú (Goal & Companion Setup)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Học viên chọn điểm mục tiêu (450, 650, 800, 900+), cam kết thời gian học mỗi ngày và chọn 1 trong 5 Linh thú Hộ mệnh khởi đầu.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Cosmic Blueprint Grid | Layer 1: Selection Cards (Z: 15px) | Layer 2: Interactive Lexling Carousel 3D (Z: 40px) | Layer 3: Bottom Action Dock

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO                            Bước 1/3: Thiết Lập Hành Trình                              |
+---------------------------------------------------------------------------------------------------------+
|  BENTO ONBOARDING CONTAINER (Perspective: 1200px)                                                       |
|  [ THẺ 1: MỤC TIÊU ĐIỂM SỐ ]               [ THẺ 2: CAM KẾT THỜI GIAN MỖI NGÀY ]                        |
|  +---------------------------------------+ +----------------------------------------------------------+ |
|  | [ 450+ Khởi Động Cơ Bản ]             | | [ ⚡ 15 phút/ngày ] Nhẹ nhàng giữ chuỗi                  | |
|  | [ 650+ Tốt Nghiệp & Đi Làm ] (Mặc định)| | [ 🔥 30 phút/ngày ] Chuẩn tăng tốc (Đề xuất)             | |
|  | [ 800+ Quản Lý & Đa Quốc Gia ]         | | [ 🚀 60 phút/ngày ] Chinh phục bứt phá 900+              | |
|  +---------------------------------------+ +----------------------------------------------------------+ |
|  [ THẺ 3: CHỌN LINH THÚ ĐỒNG HÀNH KHỞI ĐẦU ]                                                            |
|  +----------------------------------------------------------------------------------------------------+ |
|  |  [ ⚡ Sparky ]        [ 🦉 Echlet ]       [ 🦊 Lumink ]       [ 🐉 Streaklyn ]     [ 🐢 Verbil ]   | |
|  |  Sóc Tia Chớp        Cú Sóng Âm          Chồn Tinh Tú        Rồng Bền Bỉ          Rùa Thông Thái  | |
|  |  Tốc độ Part 5       Chuyên Part 2 & 3   Quét bẫy Part 7     Bảo vệ chuỗi ngày    Chủ nhân SM-2   | |
|  +----------------------------------------------------------------------------------------------------+ |
|                                [ 🚀 XÁC NHẬN VÀ TIẾP TỤC ĐẾN BÀI TEST CHẨN ĐOÁN (56dp) ]                |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| BƯỚC 1/3: THIẾT LẬP MỤC TIÊU      |
+-----------------------------------+
| 🎯 Điểm mục tiêu: [ 650+ Đi làm ] |
| ⏱️ Cam kết: [ 30 phút / ngày ]   |
| 🐾 Chọn Linh Thú Hộ Mệnh:         |
| +-------------------------------+ |
| | < [  🐉 STREAKLYN (Rồng)  ] > | |
| | Kỹ năng: Giữ lửa Streak bền bỉ| |
| | "Tớ sẽ giúp bạn không lỡ ngày | |
| | học nào để đạt 650+ nhanh nhất"|
| +-------------------------------+ |
| [ 🚀 BẮT ĐẦU BÀI CHẨN ĐOÁN (52dp)]|
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .companion-card { transform: scale(0.95); transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); } .companion-card.selected { transform: scale(1.05) translateY(-8px); border-color: #6366F1; box-shadow: 0 15px 30px rgba(99,102,241,0.3); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.companion-card', { opacity: 0, y: 25, stagger: 0.08, duration: 0.5, ease: 'power2.out' });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Cả 5 linh thú dàn hàng ngang ở dạng Stage 1 (Baby). Khi học viên bấm vào linh thú nào, linh thú đó nhào lộn 360 độ và phát ra âm thanh phản hồi đặc trưng.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Selected Halo: `--primary-500` | Flame: `--warning-500` | Surface: `--neutral-850`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Trên mobile chuyển thành thẻ Carousel vuốt ngang mượt mà (Snap scroll), nút tiếp tục cố định đáy màn hình (Sticky Bottom Thumb Zone).
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-06 · Giới Thiệu Bài Chẩn Đoán (Diagnostic Briefing Room)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Chuẩn bị tâm lý cho học viên trước bài kiểm tra thích ứng IRT 20-30 câu, giải thích cơ chế câu hỏi tăng giảm độ khó thông minh.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Soft Waveform Aurora Background | Layer 1: Briefing Glass Card (Z: 20px) | Layer 2: Audio Check Interactive Pill (Z: 30px)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO                                                                        [⚙️ Kiểm tra loa]|
+---------------------------------------------------------------------------------------------------------+
|  DIAGNOSTIC BRIEFING POD (Center Focus, Z-Elevation: 2)                                                 |
|       +-----------------------------------------------------------------------------------------+       |
|       | 🎯 BÀI KIỂM TRA ĐẦU VÀO THÍCH ỨNG (ADAPTIVE IRT DIAGNOSTIC)                             |       |
|       | Ước lượng trình độ hiện tại của bạn với thuật toán Item Response Theory                 |       |
|       | 📊 Quy chuẩn bài test: 20 - 30 câu (Dừng khi SEM < 0.35) · Thời gian: ~20 phút          |       |
|       | 🎧 Kiểm tra âm thanh tai nghe của bạn:                                                  |       |
|       | [ ▶️ PHÁT THỬ AUDIO ETS ("This is a sample sound check") ]   [ Đã nghe rõ: Tốt ✓ ]       |       |
|       | 💡 Lời khuyên: "Đừng đoán bừa! Hệ thống sẽ tự hạ độ khó để tìm chuẩn vùng kiến thức."   |       |
|       | [ 🚀 BẮT ĐẦU LÀM BÀI CHẨN ĐOÁN NGAY (56dp) ]                                            |       |
|       +-----------------------------------------------------------------------------------------+       |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| [←] Về Onboarding                 |
+-----------------------------------+
| 🎯 BÀI CHẨN ĐOÁN THÍCH ỨNG        |
| 20 - 30 câu hỏi · ~20 phút        |
| 🎧 KIỂM TRA TAI NGHE:             |
| +-------------------------------+ |
| | [ ▶️ Phát thử âm thanh ]       | |
| | Sóng âm:  ||||||||||||        | |
| +-------------------------------+ |
| 🦉 Echlet: "Hãy đeo tai nghe để   |
| đạt kết quả nghe chuẩn nhất nhé!" |
| [ 🚀 BẮT ĐẦU TEST NGAY (52dp)   ] |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .audio-check-pill { background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.4); box-shadow: 0 0 25px rgba(99, 102, 241, 0.2); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.to('.sound-wave-bar', { height: 'random(10, 36)', stagger: 0.05, repeat: -1, yoyo: true, duration: 0.3 });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Echlet đeo tai nghe DJ mini bay lơ lửng bên cạnh bộ kiểm tra âm thanh (`right: 25px`, `top: 40%`). Khi âm thanh chạy, mắt Echlet chớp chớp theo nhịp điệu.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Primary: `--primary-500` | Emerald: `--success-500` | Glass Surface: `--glass-bg`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Nút thử audio to rõ, có phản hồi trực quan bằng thanh sóng âm động để người khiếm thính hoặc môi trường ồn vẫn nhận biết được thiết bị đang phát.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-07 / S-08 · Phòng Chẩn Đoán Thích Ứng Nghe & Đọc (Adaptive IRT Testing Arena)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Học viên làm bài kiểm tra thích ứng. Giao diện tối giản phân tâm (Focus Mode), hỗ trợ tách cột trên desktop và Bottom Sheet thông minh trên mobile.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Distraction-free Dark Neutral Canvas | Layer 1: Content Split Cards (Z: 15px) | Layer 2: Interactive Answer Buttons with Spring Physics | Layer 3: Bottom Sheet (Mobile Z: 50px) | Layer 4: Top Telemetry Status Bar (Z: 100px)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [CÂU 08 / 25]  PART 3: CONVERSATION                     [⏱️ 16:42]  [Độ Ổn Định SEM: ■■■□□]  [Nộp Bài] |
+---------------------------------------------------------------------------------------------------------+
|  SPLIT PANE 50 / 50 (Bố cục chia đôi không trọng lực)                                                   |
|  [ KHỐI BÀI NGHE / VĂN BẢN (TRÁI) ]          [ KHỐI CÂU HỎI & ĐÁP ÁN (PHẢI) ]                           |
|  +-----------------------------------------+ +--------------------------------------------------------+ |
|  | 🎧 AUDIO ĐANG PHÁT (ETS Standard)       | | Câu 8: Where most likely does the conversation take   | |
|  | [ 🔊 |||l|||ll||l|l||||||||l|||| ] 00:32 | | place?                                                 | |
|  | (Không hỗ trợ tua lại trong phòng thi)   | | [ A ] At a dental clinic                               | |
|  | 🖼️ Hình ảnh đính kèm (nếu có):          | | [ B ] In an accounting firm                            | |
|  | +-------------------------------------+ | | [ C ] At an electronics store                          | |
|  | |   [ Graphic Chart / Photo ]         | | | [ D ] In a train station                             | |
|  | +-------------------------------------+ | | [ 🚩 Đánh dấu xem lại ]        [ ➔ Câu Kế Tiếp (52dp) ]| |
|  +-----------------------------------------+ +--------------------------------------------------------+ |
|  HUD THƯỚC ĐO CÂU HỎI: [1] [2] [3] [4] [5] [6] [7] [*8*] [9] [10] ... [25]                             |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| CÂU 08/25 · PART 3      ⏱️ 16:42  |
+-----------------------------------+
| 🎧 [ 🔊 |||||||ll|||||| ] 00:32   |
| 🖼️ Graphic Chart (Part 3)         |
| === BOTTOM SHEET VUỐT CHẠM =====  |
| ❓ Câu 8: Where does it happen?   |
| [ A ] At a dental clinic (52dp)   |
| [ B ] In an accounting firm       |
| [ C ] At an electronics store     |
| [ D ] In a train station          |
| [ 🚩 Đánh dấu ]  [ ➔ Kế Tiếp (52)]|
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .answer-option { min-height: 52px; border-radius: 12px; background: rgba(30, 41, 59, 0.6); border: 1.5px solid rgba(255,255,255,0.1); transition: all 0.2s ease-out; } .answer-option:hover { transform: translateX(6px); border-color: #6366F1; } .answer-option.selected { background: rgba(99, 102, 241, 0.25); border-color: #818CF8; box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.answer-option', { x: 30, opacity: 0, stagger: 0.05, duration: 0.35, ease: 'power2.out' });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Linh thú ở góc nhỏ thanh HUD (mini avatar 32px), biểu thị trạng thái tập trung cao độ (đôi mắt chú mục, không có cử động gây phân tâm).

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Selected: `--primary-500` | Time Critical: `--danger-500` (<5m) | Flag: `--warning-500`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Touch target chiều cao 52dp, đệm lề 12dp. Mobile Bottom Sheet hỗ trợ kéo thả 3 mức (30%, 60%, 100%). Part 6/7 hỗ trợ tự cuộn tới ô trống (Cloze Auto-scroll).
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-09 · Báo Cáo Chẩn Đoán & Sinh Lộ Trình Cá Nhân Hóa (Diagnostic Radar & Path Generator)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Công bố điểm ước tính theo định dạng ETS (SEM ±35-50đ), phân tích biểu đồ Radar 7 Part, và hoạt ảnh sinh lộ trình Saga 2.5D độc bản.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Subtle Ambient Glow (`#6366F1`, opacity 0.12) | Layer 1: Score & Radar Bento Pods (Z: 20px) | Layer 2: Animated SVG Map Path (Morphing Line) | Layer 3: Lexling Happy Animation

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO                                                                  [In Báo Cáo] [Lưu PDF]|
+---------------------------------------------------------------------------------------------------------+
|  KẾT QUẢ CHẨN ĐOÁN THÍCH ỨNG & THẦN THÚ HỘ MỆNH                                                         |
|  +-------------------------------------------+ +------------------------------------------------------+ |
|  | 🌟 ĐIỂM DỰ ĐOÁN ETS-FORMAT: 620 / 990     | | 🕸️ BIỂU ĐỒ RADAR NĂNG LỰC 7 PART                    | |
|  | • Listening: 335 (SEM ±35–50đ, CI 95%)    | |                  [Part 1: 85%]                      | |
|  | • Reading:   285 (SEM ±35–50đ, CI 95%)    | |       [Part 7: 45%]        [Part 2: 78%]            | |
|  | 🏆 Xếp loại CEFR: B2 — Độc Lập            | |  [Part 6: 52%] ----- • ----- [Part 3: 65%]            | |
|  | 🎯 Khoảng cách tới mục tiêu (750+): 130đ  | |       [Part 5: 60%]        [Part 4: 58%]            | |
|  +-------------------------------------------+ +------------------------------------------------------+ |
|  🔮 MA THUẬT SINH HÀNH TRÌNH SAGA (GSAP Path Morphing Engine)                                           |
|  +----------------------------------------------------------------------------------------------------+ |
|  | [ ✨ ALGORITHM GENESIS: Tối ưu lộ trình theo công thức D = min(30, max(7, round(7 + ΔS/12 * W_band * 45/T_daily))) ] |
|  |   Thời lượng tính toán: 21 Ngày | 4 Quần Xã (SUNRISE_VALLEY → ECHO_FOREST → GRAMMAR_CANYON → APEX_SUMMIT)    |
|  |   [Trạm 1: Nghe Phản Xạ] ---> [Trạm 2: Quét Từ Khóa P7] ---> [Trạm 3: Bẫy Cú Pháp P5-6] ---> 🏁     |
|  |   [ 🚀 BẮT ĐẦU KHÁM PHÁ BẢN ĐỒ SAGA CỦA BẠN (Nút phát sáng hào quang 56dp) ]                       | |
|  +----------------------------------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| KẾT QUẢ CHẨN ĐOÁN NĂNG LỰC        |
+-----------------------------------+
| 🌟 TOEIC DỰ ĐOÁN: 620 / 990       |
| • Nghe: 335  |  Đọc: 285          |
| +-------------------------------+ |
| | 🕸️ Biểu đồ Radar Năng Lực     | |
| | Điểm mạnh: Part 1, 2          | |
| | Cần bổ trợ gấp: Part 7        | |
| +-------------------------------+ |
| 🧙‍♂️ Lộ trình: 21 Ngày (4 Quần Xã)  |
| 🦊 Lumink: "Tớ đã khóa chặt 12    |
| dạng bẫy Part 7 của bạn rồi đó!"  |
| [ 🗺️ BƯỚC VÀO BẢN ĐỒ SAGA (52dp) ]|
+-----------------------------------+
```

#### ⚠️ Khung Dây Pop-up Reality Check (Khi Chênh Lệch Điểm Mục Tiêu ΔS > 180 Điểm)
```text
+-----------------------------------------------------------------------+
|  🛡️ KIỂM ĐỊNH TÍNH KHẢ THI SƯ PHẠM (PEDAGOGICAL REALITY CHECK)        |
+-----------------------------------------------------------------------+
|  Hệ thống phát hiện khoảng cách điểm mục tiêu quá lớn:                |
|  • Điểm chẩn đoán đầu vào: 420/990                                     |
|  • Điểm mục tiêu mong muốn: 750/990 (Chênh lệch: ΔS = 330 > 180đ)    |
|  • Thời gian dự kiến: 30 ngày (Quá tải nhận thức: nguy cơ nản lòng)  |
|                                                                       |
|  Vui lòng lựa chọn 1 phương án thích ứng tối ưu:                      |
|  [ (A) KÉO DÀI THỜI GIAN LỘ TRÌNH LÊN 45 NGÀY (KHUYẾN NGHỊ) ]          |
|      (Giữ nguyên mục tiêu 750+, tăng thời gian hấp thu kiến thức)     |
|                                                                       |
|  [ (B) ĐIỀU CHỈNH MỤC TIÊU GIAI ĐOẠN 1 VỀ MỨC 600+ ]                  |
|      (Mục tiêu thực tế, hoàn thành trong 30 ngày trước khi bứt phá)  |
|                                                                       |
|  [ (C) TĂNG CƯỜNG ĐỘ HỌC: 90 PHÚT/NGÀY (CHẾ ĐỘ TẬP TRUNG CAO) ]       |
|      (Cam kết hoàn thành 4 trạm/ngày với độ khó tăng dần)             |
|                                                                       |
|  [ XÁC NHẬN LỰA CHỌN ] (52dp)               [ Giữ nguyên & Chấp nhận ]|
+-----------------------------------------------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .score-badge { 
    font-family: var(--font-display);
    font-size: 64px; 
    font-weight: 900; 
    color: #F1F5F9;
    text-shadow: 0 10px 30px rgba(99,102,241,0.4); 
  }
  .reality-check-modal {
    background: var(--liquid-glass-bg);
    border: var(--liquid-glass-border);
    box-shadow: var(--shadow-diffused-lg), var(--liquid-glass-refract);
    backdrop-filter: var(--liquid-glass-blur);
    border-radius: 20px;
  }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.timeline()
    .from('.score-badge', { scale: 0.2, opacity: 0, duration: 0.7, ease: 'elastic.out(1, 0.6)' })
    .from('#radar-svg polygon', { scale: 0, transformOrigin: 'center', duration: 0.8, ease: 'power3.out' }, '-=0.3')
    .from('.saga-path-node', { scale: 0, stagger: 0.1, duration: 0.4, ease: 'back.out(2)' }, '-=0.4');
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Linh thú đã chọn nhảy múa ăn mừng ở trung tâm dưới bảng điểm (Acrobatic Flip), tung ra các hạt bụi sao vàng lấp lánh xung quanh con số điểm dự đoán. Nếu kích hoạt Reality Check, linh thú chuyển sang tư thế nghiêm túc suy ngẫm (Thinking Pose) kèm lời khuyên chân thành.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Display: `--font-display` (Geist/Satoshi) | Mono: `--font-mono` | Refract: `--liquid-glass-refract` | Success: `--success-500` | Reality Warning: `--warning-500`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Nút 'Bắt đầu khám phá Saga' có kích thước lớn 52dp+, màu sắc rực rỡ, chiếm vị trí ưu tiên để học viên tiến ngay vào chu trình học chính. Modal Reality Check bắt buộc chặn focus (aria-modal="true") và có touch targets 52dp.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-10 · Bảng Điều Khiển Học Tập Trung Tâm (Antigravity Dashboard Bento)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Trang chủ đăng nhập của học viên, tổng hợp trạng thái chuỗi Streak, trạm Saga kế tiếp, thẻ SM-2 cần ôn tập và tiến độ hàng tuần.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Slate Void (#0F172A) + Isometric Grid Line mờ | Layer 1: Bento Cards (Z: 15px, `backdrop-filter: blur(16px)`) | Layer 2: Interactive 3D Character Pod (Z: 35px) | Layer 3: Persistent Glass Header & Mobile Bottom Bar (Z: 100px)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO   [Bản Đồ Saga]   [Luyện Tập]   [Sổ Tay SM-2]   [Đấu Trường]  | 🔥 14 Ngày  💎 450  👤 |
+---------------------------------------------------------------------------------------------------------+
|  ANTIGRAVITY BENTO 2.0 DASHBOARD GRID (12 Cột)                                                          |
|  [ THẺ 1: TRẠM TIẾP THEO TRÊN SAGA - 8 Cột ]                  [ THẺ 2: THẦN THÚ HỘ MỆNH - 4 Cột ]        |
|  +---------------------------------------------------------+ +----------------------------------------+ |
|  | 🗺️ HÀNH TRÌNH CHẶNG 2: BỨT PHÁ PART 3 & 4               | | 🐉 STREAKLYN (Stage 2: Brave)        | |
|  | Trạm 18: Nhận Diện Địa Điểm Trong Hội Thoại             | | Cấp độ: Level 12 · 340/500 XP         | |
|  | Mục tiêu: Đạt tối thiểu 2/3 sao để mở khóa Trạm 19       | | [ 3D Model Floating & Breathing ]     | |
|  | Phần thưởng: +50 XP · +15 Đá Quý 💎                     | | Khẩu hiệu: "Lửa rực rỡ, đừng bỏ dở!"  | |
|  | [ ⚔️ TIẾP TỤC VƯỢT TRẠM 18 (Nút Primary 52dp) ]          | | [ Tương tác vuốt ve ] [ Đổi Skin ]     | |
|  +---------------------------------------------------------+ +----------------------------------------+ |
|  [ THẺ 3: SỔ TAY SM-2 - 4 Cột ]       [ THẺ 4: MỤC TIÊU NGÀY - 4 Cột ]   [ THẺ 5: THỨ HẠNG - 4 Cột ]     |
|  +----------------------------------+ +--------------------------------+ +-----------------------------+ |
|  | 🧠 18 Thẻ Đến Hạn Ôn Tập         | | 🎯 25/30 Phút Học Tập          | | 🏆 Hạng 4 Bảng Kim Cương    | |
|  | Thuật toán chống quên Ebbinghaus | | Hoàn thành 2 trạm bài học      | | Cách Top 3: 45 XP           | |
|  | [ Ôn Ngay (5 phút) ]             | | Tiến độ: [■■■■■■■■□□] 83%      | | [ Xem Đấu Trường ]          | |
|  +----------------------------------+ +--------------------------------+ +-----------------------------+ |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| TOEIC PRO     🔥 14  💎 450  👤   |
+-----------------------------------+
| 🐉 Streaklyn · Level 12 (Brave)   |
| +-------------------------------+ |
| | 🗺️ TRẠM KẾ TIẾP (TRẠM 18)     | |
| | Bứt phá Hội thoại Part 3      | |
| | [ ⚔️ VƯỢT TRẠM NGAY (52dp) ]   | |
| +-------------------------------+ |
| +-------------------------------+ |
| | 🧠 Sổ SM-2: 18 thẻ đến hạn    | |
| +-------------------------------+ |
| +-------------------------------+ |
| | 🎯 Mục tiêu: 25/30p · 🏆 Hạng 4| |
| +-------------------------------+ |
| [底部] 🏠 Trang Chủ | 🗺️ Saga | 📖 Sổ |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .bento-saga-hero { transform: perspective(1000px) rotateX(2deg); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); } .bento-saga-hero:hover { transform: perspective(1000px) rotateX(0deg) translateY(-4px); box-shadow: 0 20px 40px rgba(99,102,241,0.25); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.timeline().from('.bento-saga-hero', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }).from('.bento-sub-card', { y: 35, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out' }, '-=0.3');
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Streaklyn (Stage 2: Brave) đứng oai vệ trên bục đá trong Thẻ 2, khoác áo choàng đỏ viền vàng. Khi rê chuột vào, rồng vẫy đuôi tạo ra các đốm lửa ma thuật.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Streak: `--warning-500` | Gems: Cyan `#06B6D4` | Card Surface: `--neutral-800`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Bố cục Bento tự co giãn từ 12 cột (desktop) sang 1 cột duy nhất (mobile). Thanh điều hướng di động đặt cố định ở đáy (Thumb Zone) với 4 biểu tượng rõ ràng.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-11 · Kế Hoạch & Nhiệm Vụ Học Tập Chi Tiết (Daily Focus & Task Orbit)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Giúp học viên phân bổ nhiệm vụ trong ngày, theo dõi đồng hồ Pomodoro tập trung và mở khóa rương nhiệm vụ ngày khi hoàn thành 100%.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Ambient Orbit Particles | Layer 1: Task Checklist Cards | Layer 2: Glowing Pomodoro Ring Widget | Layer 3: Interactive Golden Chest

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO                                                                         [← Về Dashboard]|
+---------------------------------------------------------------------------------------------------------+
|  KẾ HOẠCH HỌC TẬP HÔM NAY · NGÀY 16 THÁNG 9                                                             |
|  [ CỘT TRÁI: DANH SÁCH NHIỆM VỤ NGÀY - 7 Cột ]             [ CỘT PHẢI: POMODORO & RƯƠNG THƯỞNG - 5 Cột ]|
|  +-------------------------------------------------------+ +------------------------------------------+ |
|  | [✓] Nhiệm vụ 1: Hoàn thành 1 Trạm Saga (Đã xong)      | | ⏱️ ĐỒNG HỒ TẬP TRUNG POMODORO           | |
|  |     Thưởng: +30 XP · +10 Gems                         | | [        25 : 00        ]                | |
|  | [ ] Nhiệm vụ 2: Ôn tập 15 thẻ từ vựng SM-2            | | [ ▶️ BẮT ĐẦU PHIÊN TẬP TRUNG (52dp) ]    | |
|  |     Tiến độ: 0/15 · [ Ôn Ngay ]                       | +------------------------------------------+ |
|  | [ ] Nhiệm vụ 3: Đạt 80% chính xác trong 1 Micro-drill  | 🎁 RƯƠNG NHIỆM VỤ HOÀN HẢO                 | |
|  | 📊 TIẾN ĐỘ NGÀY: 1/3 (33%) [■■■■■■■□□□□□□□□□□□□□]      | [ 🔒 Rương Vàng: Thưởng +50 Gems 💎 ]      | |
|  +-------------------------------------------------------+ +------------------------------------------+ |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| [←] NHIỆM VỤ HÔM NAY              |
+-----------------------------------+
| 📊 Tiến độ: 1/3 Nhiệm vụ (33%)    |
| 1. [✓] Hoàn thành 1 Trạm Saga     |
| 2. [ ] Ôn tập 15 thẻ SM-2 [Ôn ➔]  |
| 3. [ ] Micro-drill Part 5 [Luyện➔]|
| +-------------------------------+ |
| | 🎁 RƯƠNG HOÀN THÀNH NGÀY      | |
| | [ 🔒 Rương Vàng Bị Khóa ]     | |
| +-------------------------------+ |
| [ ⏱️ BẬT FOCUS POMODORO (52dp)  ] |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .pomodoro-ring { filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.4)); stroke-dasharray: 283; stroke-dashoffset: 70; transition: stroke-dashoffset 1s linear; }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.to('.reward-chest', { rotateZ: 'random(-5, 5)', yoyo: true, repeat: -1, duration: 1.2, ease: 'sine.inOut' });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Sparky cầm đồng hồ bấm giờ mini ngồi trên nắp hộp Pomodoro, vẫy đuôi điện xẹt nhẹ mỗi khi hoàn thành một nhiệm vụ.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Completed: `--success-500` | Chest Gold: `--warning-500` | Incomplete: `--neutral-700`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Hộp kiểm checkbox có kích thước tối thiểu 28x28px, toàn bộ dòng nhiệm vụ có thể chạm mở nhanh màn hình tương ứng.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-27 · Saga Map — Bản Đồ Hành Trình 2.5D Isometric (2.5D Isometric Saga World)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Trọng tâm trải nghiệm Game Hóa. Lộ trình học tập cá nhân hóa được bố trí qua 4 Quần xã sinh thái (Biomes) tiêu chuẩn với 5 loại Nút trạm bài học (Node Archetypes), hiển thị phối cảnh 2.5D không trọng lực lơ lửng giữa vũ trụ số.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth · Liquid Glass Borders.
- **Phân bổ Chiều Sâu Không Gian & Z-Index:**
  - Layer 0: Deep Void Starfield Canvas (Z: 0px) | Layer 1: Isometric Road Path (Glowing Biome Vector Curve, Z: 5px) | Layer 2: Completed Stations (Emerald, Z: 15px) | Layer 3: Review Gate & Drill Nodes (Z: 25px) | Layer 4: Current Active Station (Iris Ambient Pulse, Z: 40px) | Layer 5: Floating Lexling Mascot (Z: 60px) | Layer 6: Offline Pill & Stage HUD Controls (Z: 100px)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+-------------------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO   [← Về Dashboard]   [ 🟢 TRỰC TUYẾN / DEXIE ĐỒNG BỘ ]   [ 🧘 FOCUS MODE: TẮT ]  | ⭐ 42/90  💎 450|
+-------------------------------------------------------------------------------------------------------------------+
|  2.5D ISOMETRIC SAGA CANVAS (Perspective: 1400px, Interactive Pan & Zoom, 4 Biomes Seamless Scrolling)             |
|                                                                                                                   |
|  [ QUẦN XÃ 4: APEX_SUMMIT (76% - 100%) · ĐỈNH CAO TỐC ĐỘ ]                                                        |
|                                    [ 🏆 FINAL_EXAM: TRẠM 90 — TỐT NGHIỆP LỘ TRÌNH ] (🔒)                          |
|                                                                                                                   |
|  [ QUẦN XÃ 3: GRAMMAR_CANYON (51% - 75%) · HẺM NÚI CÚ PHÁP & LOGIC ]                                              |
|                                    [ ⚔️ DAILY_BOSS: TRẠM 60 — ĐẤU TRƯỜNG NGÀY ] (🔒)                              |
|                                             /                                                                     |
|                                   [ 🎯 SKILL_DRILL: TRẠM 55 — Bẫy Liên Từ Part 5 ] ⭐⭐⭐                         |
|                                                                                                                   |
|  [ QUẦN XÃ 2: ECHO_FOREST (26% - 50%) · RỪNG PHẢN XẠ SÓNG ÂM ]                                                    |
|                                   [ 🛑 REVIEW_GATE: TRẠM 30 — KHÓA CỬA ÔN TẬP ] (🔒 Yêu cầu ≥2⭐ để mở tiếp)     |
|                                         |                                                                         |
|                        [ 🎯 SKILL_DRILL: TRẠM 23 ] - - [ 🎁 Rương Kho Báu Giữa Chặng ]                            |
|                             /                                                                                     |
|                  [ 🎯 SKILL_DRILL: TRẠM 22 ] ⭐⭐                                                                 |
|                        |                                                                                          |
|       [ 📍 TRẠM 21: WARMUP (HIỆN TẠI - Đang phát sáng Iris) ] <====== 🐉 [ STREAKLYN BAY LƠ LỬNG ]                |
|             \                                                          "Trạm khởi động 3 câu này dễ thở lắm!"     |
|         [ ✓ Trạm 20: WARMUP ] ⭐⭐⭐                                                                              |
|                                                                                                                   |
|  [ QUẦN XÃ 1: SUNRISE_VALLEY (0% - 25%) · BÌNH MINH KHỞI ĐỘNG ]                                                   |
|         [ ✓ Trạm 1: WARMUP ] ⭐⭐⭐ ---> [ ✓ Trạm 5: SKILL_DRILL ] ⭐⭐⭐                                         |
|  +-------------------------------------------------------------------------------------------------------------+  |
|  | HUD CHUYỂN QUẦN XÃ: [ 1. SUNRISE_VALLEY ] [ *2. ECHO_FOREST* ] [ 3. GRAMMAR_CANYON ] [ 4. APEX_SUMMIT ]       |  |
|  +-------------------------------------------------------------------------------------------------------------+  |
+-------------------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| ECHO_FOREST (26-50%)     ⭐ 42 💎 |
| [ 🟢 ONLINE ]     [ 🧘 FOCUS OFF ]|
+-----------------------------------+
| (Bản đồ cuộn dọc vô tận 2.5D)     |
|                                   |
|   [ 🛑 REVIEW_GATE 🔒 TRẠM 30 ]   |
|   (Khóa cửa: Cần ≥2⭐ trạm trước) |
|                  |                |
|   [ 🎯 SKILL_DRILL 24 ] ⭐⭐⭐    |
|                  |                |
|  +-----------------------------+  |
|  | 📍 TRẠM 21: WARMUP (ACTIVE)  |  |
|  | 🐉 Streaklyn đang chờ bạn   |  |
|  | [ ⚔️ VÀO TRẠM 21 (52dp) ]   |  |
|  +-----------------------------+  |
|                  |                |
|   [ ✓ WARMUP 20 ] ⭐⭐⭐          |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms & Biome Atmospheres:**
  ```css
  .saga-viewport { 
    perspective: 1400px; 
    min-height: var(--viewport-stable-height);
  }
  .saga-world-plane { 
    transform: rotateX(25deg) rotateZ(-10deg); 
    transform-style: preserve-3d; 
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); 
  }
  /* Viền khúc xạ Liquid Glass & Ánh sáng Quần xã */
  .saga-biome-sunrise { background: var(--biome-sunrise-gradient); }
  .saga-biome-echo    { background: var(--biome-echo-gradient); }
  .saga-biome-canyon  { background: var(--biome-canyon-gradient); }
  .saga-biome-summit  { background: var(--biome-summit-gradient); }
  .saga-node-card {
    background: var(--liquid-glass-bg);
    border: var(--liquid-glass-border);
    box-shadow: var(--shadow-diffused-lg), var(--liquid-glass-refract);
    backdrop-filter: var(--liquid-glass-blur);
  }

  /* Candy Juice Saga Map Layer (Kéo Lại Cảm Xúc Casual Candy Crush) */
  .saga-node-completed {
    background: radial-gradient(circle at 35% 35%, #FFE66D 0%, #FFC15E 40%, #FF6B9D 100%);
    box-shadow: 0 8px 0 #D81B60, 0 0 25px rgba(255, 107, 157, 0.6);
    border: 2px solid rgba(255, 255, 255, 0.8);
  }
  .saga-path-glowing {
    stroke: url(#candy-gold-gradient);
    stroke-dasharray: 8 6;
    animation: candy-path-flow 20s linear infinite;
    filter: drop-shadow(0 0 8px rgba(255, 193, 94, 0.7));
  }
  .saga-candy-star {
    filter: drop-shadow(0 4px 6px rgba(245, 158, 11, 0.5));
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .saga-candy-star:hover {
    transform: scale(1.25) rotate(12deg);
  }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  // Hiệu ứng xung nhịp trạm bài học hiện tại
  gsap.to('.current-node-pulse', { scale: 1.25, opacity: 0, repeat: -1, duration: 1.8, ease: 'power2.out' }); 
  // Linh thú lơ lửng không trọng lực
  gsap.to('.floating-mascot-saga', { y: -12, yoyo: true, repeat: -1, duration: 2.4, ease: 'sine.inOut' });
  // Hiệu ứng 3 sao Candy bật nảy từng chiếc khi hoàn thành trạm (Candy Star Bounce)
  export const animateCandyStars = (starsContainer) => {
    return gsap.fromTo(starsContainer.querySelectorAll('.saga-candy-star'),
      { scale: 0, y: 15, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.35, stagger: 0.12, ease: 'back.out(2.5)' }
    );
  };
  // Hiệu ứng mở khóa Review Gate khi đủ 2 sao
  export const unlockReviewGate = (gateElement) => {
    return gsap.timeline()
      .to(gateElement, { scale: 1.15, filter: 'drop-shadow(0 0 25px #10B981)', duration: 0.4, ease: 'back.out(2)' })
      .to(gateElement.querySelector('.lock-icon'), { opacity: 0, y: -20, duration: 0.3 })
      .to(gateElement, { scale: 1.0, duration: 0.2 });
  };
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Linh thú bay ngay phía trên trạm bài học hiện tại (`y: -40px`), vẫy tay gọi học viên bấm vào trạm. Trên đầu có bóng thoại tương tác gợi ý chiến thuật làm bài. Khi gặp Nút trạm `REVIEW_GATE` bị khóa, linh thú khoanh tay nhắc nhở cần ôn lại trạm trước để đạt ít nhất 2 sao.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** 
  - Current Active Node: `--primary-500` (#6366F1)
  - Passed Node (1-3 Stars): `--success-500` (#10B981) kết hợp Candy Gradient Glow
  - Candy Accent Stars: `--candy-gold` (#FFC15E) & `--candy-lemon` (#FFE66D)
  - Locked Node / Review Gate: `--neutral-700` (#334155) kèm viền hổ phách cảnh báo nếu chưa đủ điểm
  - Daily Boss / Final Exam: Gold `#FBBF24` & Red `#EF4444`
  - 4 Biome Environments: `SUNRISE_VALLEY`, `ECHO_FOREST`, `GRAMMAR_CANYON`, `APEX_SUMMIT`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Hỗ trợ cử chỉ kéo pan và zoom pinch trên mobile. Tự động cuộn mượt (Auto-center) đưa trạm hiện tại vào giữa màn hình khi mở trang. Nút trạm chạm cảm ứng tối thiểu 52dp. Hiển thị pill trạng thái mạng (Dexie sync indicator) giúp học viên an tâm khi offline.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-28 · Nút Trạm Bài Học — Trải Nghiệm Vượt Ải (Saga Node Interactive Stage)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Học viên giải quyết cụm 3-5 câu hỏi thử thách của một trạm bài học trên bản đồ Saga (WARMUP, SKILL_DRILL, REVIEW_GATE, DAILY_BOSS). Hỗ trợ tối ưu chuyên sâu cho 2 dạng đặc biệt: **Part 6 Cloze Reading Split-View** (chia đôi cột, đồng bộ ô trống `clozeIndex 1..4`) và **Part 2 Minimalist Audio Stage** (ETS CBT Chuẩn: bảo mật tuyệt đối không rò rỉ text câu hỏi và phương án, chỉ hiển thị sóng âm và 3 nút A-B-C).
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth · Liquid Glass Refraction.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Dark Focus Stage (`var(--focus-scrim-backdrop)`) | Layer 1: Question & Passage Cards (Z: 15px) | Layer 2: Instant Feedback Banner (Trượt lên từ đáy Z: 40px) | Layer 3: Companion Hint Bubble & Focus Mode HUD (Z: 100px)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Dạng 1: Part 6 Cloze Reading Split-View (Bố cục 2 Cột Đối Xứng)
```text
+-------------------------------------------------------------------------------------------------------------------+
| [← Rời Trạm]   TRẠM 26: PART 6 CLOZE READING (ECHO_FOREST)   [⭐⭐⭐] 2/4   [ 🧘 FOCUS MODE: BẬT ]   [⏱️ 02:45]   |
+-------------------------------------------------------------------------------------------------------------------+
|  CLOZE READING SPLIT-VIEW STAGE (Perspective: 1200px)                                                             |
|  [ CỘT TRÁI: BÀI ĐỌC ĐIỀN TỪ TOÀN VĂN (60% Chiều rộng) ]      [ CỘT PHẢI: BẢNG CHỌN Ô TRỐNG ĐANG FOCUS (40%) ]  |
|  +----------------------------------------------------------+ +-------------------------------------------------+ |
|  | To: All Department Staff                                 | | Ô TRỐNG ĐANG CHỌN: [ Ô TRỐNG [2] ] (Dòng 8)     | |
|  | From: Human Resources Directorate                        | |                                                 | |
|  | Date: October 24                                         | | Lựa chọn tốt nhất điền vào câu:                 | |
|  | Subject: Annual Performance Review Schedule              | | [ A ] however                                   | |
|  |                                                          | | [ B ] consequently  (✓ Đã chọn)                 | |
|  | As we approach the final fiscal quarter, all department  | | [ C ] meanwhile                                 | |
|  | managers must finalize their annual employee evaluations.| | [ D ] otherwise                                   | |
|  | Forms must be submitted by Friday. [ [1] ▾ ] all data    | |                                                 | |
|  | is compiled, meetings will be arranged.                  | | [ 💡 DÙNG GỢI Ý LINH THÚ (-5 Gems) ]           | |
|  |                                                          | | [ ⚔️ LƯU ĐÁP ÁN Ô [2] (52dp) ]                  | |
|  | Employees who have exceeded targets will [ [2] ▾ ]       | +-------------------------------------------------+ |
|  | receive special bonus considerations. In particular,...  | | ĐIỀU HƯỚNG NHANH 4 Ô TRỐNG:                     | |
|  | [ [3] ▾ ] Therefore, punctuality is mandatory.           | | [ Ô [1] ✓ ] [ *Ô [2]* ] [ Ô [3] ] [ Ô [4] ]     | |
|  | Please contact HR for further inquiries. [ [4] ▾ ]       | +-------------------------------------------------+ |
|  +----------------------------------------------------------+                                                     |
|  FEEDBACK TỨC THÌ: [ 🎉 CHÍNH XÁC! +15 XP ] Giải thích: 'Consequently' thể hiện mối quan hệ nguyên nhân - kết quả |
+-------------------------------------------------------------------------------------------------------------------+
```

#### 🖥️ Dạng 2: Part 2 Minimalist Audio Stage (ETS CBT Chuẩn — Bảo Mật Tuyệt Đối Zero-Text)
```text
+-------------------------------------------------------------------------------------------------------------------+
| [← Rời Trạm]   TRẠM 14: PART 2 PHẢN XẠ ÂM THANH (SUNRISE_VALLEY)    [⭐⭐⭐] 5/10    [ 🧘 FOCUS MODE: BẬT ]        |
+-------------------------------------------------------------------------------------------------------------------+
|  MINIMALIST AUDIO STAGE (Chuẩn ETS: Tuyệt đối không hiển thị văn bản câu hỏi & phương án trên màn hình)           |
|                                                                                                                   |
|                           [ 🎧 SÓNG ÂM THANH ĐANG PHÁT (Waveform Visualizer) ]                                    |
|                                 ||| |l| |||| ||||| |||| ||| ||||| |||| |||| |||                                   |
|                                            00:04 / 00:12  [ 🔊 100% ]                                             |
|                                                                                                                   |
|       (Học viên lắng nghe kỹ câu hỏi và chọn 1 trong 3 đáp án được đọc trong audio. Không có phụ đề!)             |
|                                                                                                                   |
|                 +------------------+     +------------------+     +------------------+                            |
|                 |     [ A ]        |     |   [ B ] (CHỌN)   |     |     [ C ]        |                            |
|                 |  (Nhấn để chọn)  |     |  (Viền sáng Iris)|     |  (Nhấn để chọn)  |                            |
|                 +------------------+     +------------------+     +------------------+                            |
|                                                                                                                   |
|                                        [ ⚔️ XÁC NHẬN TRẢ LỜI (52dp) ]                                             |
+-------------------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile Dạng 1 & Dạng 2 (Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| [←] TRẠM 26: PART 6     ⭐⭐⭐ 2/4|
| [ 🧘 FOCUS: BẬT ]       [⏱️ 02:45]|
+-----------------------------------+
| 📜 [BÀI ĐỌC CLOZE] (Cuộn mượt)    |
| All managers must submit forms.   |
| Employees will [ [2] ▾ ] receive..|
| +-------------------------------+ |
| | BẢNG ĐIỀU HƯỚNG Ô TRỐNG [2]:  | |
| | [ A ] however (52dp)          | |
| | [ B ] consequently (✓)        | |
| | [ C ] meanwhile               | |
| | [ D ] otherwise               | |
| | [ ⚔️ CHỌN Ô [2] ]             | |
| +-------------------------------+ |
| [ Ô [1] ✓ ] [ *Ô [2]* ] [ Ô [3] ] |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms & Refraction:**
  ```css
  .cloze-dropdown-blank {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    margin: 0 4px;
    border-radius: 6px;
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.4);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .cloze-dropdown-blank.active {
    background: var(--primary-500);
    color: #FFFFFF;
    box-shadow: 0 0 12px rgba(99, 102, 241, 0.5);
  }
  .audio-stage-wave {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    height: 64px;
  }
  .focus-mode-active {
    background: var(--focus-scrim-backdrop) !important;
    transition: background 0.4s ease-out;
  }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  // Đồng bộ cuộn sang ô trống khi click
  export const scrollToBlank = (blankId) => {
    gsap.to('#cloze-passage-container', {
      scrollTo: { y: `#blank-${blankId}`, offsetY: 120 },
      duration: 0.45,
      ease: 'power3.out'
    });
  };
  // Sóng âm thanh Part 2
  gsap.to('.wave-bar', {
    scaleY: 'random(0.3, 1.8)',
    duration: 0.2,
    repeat: -1,
    yoyo: true,
    stagger: 0.04,
    ease: 'sine.inOut'
  });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Trong trạng thái Focus Mode bình thường, linh thú ở tư thế "Thiền định tĩnh lặng" (Meditative Rest) ở góc HUD, giữ yên lặng tuyệt đối để không phân tán học viên. Khi học viên chọn xong đáp án và nhận feedback đúng, linh thú thức giấc vỗ tay nhẹ nhàng (+15 XP).

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** 
  - Cloze Active Blank: `--primary-500` (#6366F1)
  - Audio Waveform: `--biome-echo-wave` (#06B6D4)
  - Focus Mode Scrim: `--focus-scrim-backdrop` (rgba(2, 6, 23, 0.88))
  - Refract Borders: `--liquid-glass-refract`
  - Feedback Sheet: `--success-500` & `--danger-500`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Ô trống Cloze trên mobile có kích thước nhấn lớn (tối thiểu 44x36px), tự động mở Bottom Sheet chọn đáp án ngay trong tầm ngón tay cái. Part 2 bố trí 3 nút A-B-C ngang rộng 52dp touch target. Phản hồi xúc giác Haptic Vibrate (Rung nhẹ khi đúng, Rung đôi khi sai trên điện thoại hỗ trợ `navigator.vibrate`).
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, tắt chuyển động sóng âm thành đường tĩnh và cuộn trang tức thì (`behavior: auto`), chuyển đổi trạng thái bằng fade-in đơn giản (`duration: 0.15s`).

---

## S-29 · Kết Quả Vượt Trạm & Tiến Hóa Linh Thú (Victory Stage & Lexling Evolution)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Màn hình ăn mừng vượt ải thành công, trao thưởng XP, Đá quý, và kích hoạt khoảnh khắc Tiến hóa Thần thú hào hùng khi đạt mốc bản đồ.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Dark Radial Cosmic Shockwave | Layer 1: Star Rating Pod (Z: 25px) | Layer 2: Center Evolution Hologram Stage (Z: 50px) | Layer 3: Particle Sparkles & Confetti System

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
|  VICTORY CELEBRATION STAGE (Center Antigravity Stage, Confetti Blast)                                   |
|                       🏆 HOÀN THÀNH XUẤT SẮC TRẠM 21! 🏆                                                |
|                       [ ⭐ ]      [ ⭐ ]      [ ⭐ ]  (Đạt 3/3 Sao Hoàn Hảo)                            |
|       +-----------------------------------------------------------------------------------------+       |
|       | 🐉 KHOẢNH KHẮC TIẾN HÓA ĐẶC BIỆT! (EVOLUTION UNLOCKED)                                   |       |
|       | Streaklyn đã tích lũy đủ năng lượng tại mốc 25% Bản đồ!                                  |       |
|       |              [ Baby (Stage 1) ]  ====== ➔ ======  [ BRAVE (STAGE 2) ]                   |       |
|       |              (Hào quang lửa xoay vòng 3D, Khoác áo choàng phiêu lưu rực rỡ)              |       |
|       | Kỹ năng mới mở khóa: "Hộ Thể Streak 24 Giờ" (Tự động bảo toàn chuỗi nếu quên 1 ngày)     |       |
|       +-----------------------------------------------------------------------------------------+       |
|       PHẦN THƯỞNG NHẬN ĐƯỢC:   [ +60 XP Kinh Nghiệm ]    [ +20 Đá Quý 💎 ]                              |
|                    [ 🗺️ TIẾP TỤC ĐẾN TRẠM 22 (Nút hào quang 56dp) ]                                     |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| 🎉 VƯỢT TRẠM THÀNH CÔNG! 🎉       |
+-----------------------------------+
|        ⭐     ⭐     ⭐           |
|         ĐẠT 3 SAO VÀNG            |
| +-------------------------------+ |
| | 🔥 TIẾN HÓA LINH THÚ!         | |
| | Streaklyn đạt cấp BRAVE!      | |
| |    [ 🐉 MODEL 3D TIẾN HÓA ]   | |
| | Mở khóa: Áo choàng phiêu lưu  | |
| | Kỹ năng: Bảo vệ Streak 24h    | |
| +-------------------------------+ |
| Thưởng: +60 XP, +20 Gems 💎       |
| [ 🗺️ TIẾP TỤC HÀNH TRÌNH (52dp) ] |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .evolution-hologram { transform: perspective(800px) rotateY(0deg); animation: holoRotate 6s infinite linear; } @keyframes holoRotate { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.timeline().from('.star-icon', { scale: 0, rotate: -180, stagger: 0.2, duration: 0.6, ease: 'back.out(2)' }).from('.evolution-hologram', { scale: 0.1, opacity: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' }, '-=0.2');
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Linh thú chiếm vị trí trung tâm màn hình, thực hiện vũ đạo xoay tròn 3D và phát nổ chùm pháo hoa nguyên tố khi hoàn tất chuyển dạng.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Gold: `#F59E0B` | Evolution Aura: `#818CF8` | Glow: `0 0 40px rgba(99,102,241,0.6)`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Học viên có thể chạm vào màn hình để bỏ qua hoạt ảnh nếu đang vội, nút 'Tiếp tục' chiếm toàn bộ chiều rộng đáy trên di động.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-30 · Bài Thi Tốt Nghiệp Chặng — Đánh Giá Ra (Exit Milestone Test)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Bài thi kiểm tra tổng kết chặng (Milestone Boss) nhằm đánh giá xem học viên đã làm chủ toàn bộ kỹ năng của chặng trước khi mở khóa thế giới tiếp theo.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Dark Gold Boss Arena Grid | Layer 1: Golden Border Briefing Card (Z: 20px) | Layer 2: Milestone Trophy Preview Hologram (Z: 40px)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO                                                     BÀI THI TỐT NGHIỆP CHẶNG 2 (MILESTONE)|
+---------------------------------------------------------------------------------------------------------+
|  BOSS CHALLENGE BRIEFING (Perspective: 1200px)                                                          |
|       +-----------------------------------------------------------------------------------------+       |
|       | 🏰 THỬ THÁCH TỐT NGHIỆP: CHINH PHỤC RỪNG SÓNG ÂM                                        |       |
|       | Điều kiện hoàn thành Chặng 2 và mở khóa Chặng 3: Đỉnh Ngữ Pháp                          |       |
|       | 📋 Tiêu chuẩn: 40 câu Part 2 & 3 · Thời gian: 30 phút · Chuẩn đỗ: >= 75% (30 câu)       |       |
|       | 🎁 Phần thưởng: Huy hiệu Vàng "Chủ Nhân Sóng Âm" · +200 XP · +50 Gems · Echlet Lvl 3!    |       |
|       | [ ⚔️ BẮT ĐẦU BÀI THI TỐT NGHIỆP CHẶNG (56dp) ]   [ Ôn luyện lại các trạm yếu ]           |       |
|       +-----------------------------------------------------------------------------------------+       |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| 🏰 TỐT NGHIỆP CHẶNG 2             |
+-----------------------------------+
| ĐÁNH GIÁ ĐẦU RA CHẶNG             |
| • 40 Câu hỏi Part 2 & 3 · 30 phút |
| • Điều kiện đỗ: >= 75% (30 câu)   |
| 🎁 THƯỞNG: Huy hiệu Vàng + 50💎   |
| 🦉 Echlet: "Hãy bình tĩnh, bạn đã |
| luyện rất kỹ 20 trạm vừa qua rồi!"|
| [ ⚔️ VÀO THI TỐT NGHIỆP (52dp)  ] |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .boss-card { border: 2px solid rgba(245, 158, 11, 0.4); box-shadow: 0 0 35px rgba(245, 158, 11, 0.2); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.boss-trophy', { y: -30, opacity: 0, duration: 0.7, ease: 'bounce.out' });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Echlet đứng trong vòng hào quang sấm sét tím vàng, khoác giáp nhẹ của mốc chuẩn bị thăng cấp Fierce.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Boss Gold: `--warning-500` | Border: rgba(245,158,11,0.3) | Action: `--primary-500`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Có xác nhận rõ ràng trước khi tính giờ, nút 'Ôn lại' phụ giúp học viên chưa tự tin có thể quay lại luyện tập mà không bị mất lượt.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-12 / S-13 · Phòng Thi Mô Phỏng CBT Nghe & Đọc (ETS-Standard CBT Simulation)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Mô phỏng 100% giao diện phòng thi máy tính quốc tế của ETS (200 câu, 120 phút). Tuyệt đối không có thanh tua âm thanh, đồng hồ đếm ngược độc lập từng phần.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Standard Slate Neutral Canvas | Layer 1: Split Content Viewports (Z: 10px) | Layer 2: 200-Question Grid Flyout Drawer (Z: 80px) | Layer 3: Top CBT Fixed Banner (Z: 100px)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| ETS TOEIC® ONLINE TESTING SYSTEM         Question 142 of 200     Time Remaining: 00:54:12    [End Test] |
+---------------------------------------------------------------------------------------------------------+
|  CƠ CHẾ THI CHUẨN ETS CBT (Giao diện chuẩn hóa, Tối giản, Không phân tâm)                              |
|  [ KHỐI VĂN BẢN PART 7 - HAI ĐOẠN VĂN (TRÁI 50%) ]   [ KHỐI CÂU HỎI & PHIẾU TRẢ LỜI (PHẢI 50%) ]        |
|  +-------------------------------------------------+ +------------------------------------------------+ |
|  | Questions 141-143 refer to the following email: | | 142. What is indicated about the conference?  | |
|  | To: All Employees                               | | (A) It will be held at a new convention center.| |
|  | Date: October 14                                | | (B) Keynote speakers have been confirmed. (✓)  | |
|  | Subject: Annual Leadership Summit               | | (C) Registration fees will increase next week. | |
|  | We are pleased to announce that the registration| | (D) Participants must bring their own laptops. | |
|  | for this year's leadership summit is officially | | [  Mark for Review 🚩 ]                        | |
|  | open. Due to venue renovation...                | | [ ◄ Back (52dp) ]            [ Next ► (52dp) ] | |
|  +-------------------------------------------------+ +------------------------------------------------+ |
|  BẢNG ĐIỀU HƯỚNG 200 CÂU: [1] [2] ... [✓141] [*142*] [143] ... [200]    (Xanh: Đã làm · Vàng: Gắn cờ)  |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| ETS CBT SIMULATION      ⏱️ 54:12  |
+-----------------------------------+
| Part 7 · Question 142 of 200      |
| [📄 Xem Văn Bản] [❓ Câu Hỏi (1/3)]|
| --- TAB VĂN BẢN PEAKER (Ghim) --- |
| "Registration for leadership..."  |
| 142. What is indicated about...?  |
| (A) Held at new center (52dp)     |
| (B) Keynote speakers confirmed (✓)|
| (C) Registration fees increase    |
| (D) Must bring laptops            |
| [ 🚩 Cờ ]   [ ◄ Lùi ]  [ Tiến ► ] |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .cbt-passage-container { overflow-y: auto; scroll-behavior: smooth; border-right: 1px solid rgba(255,255,255,0.1); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.cbt-question-pane', { opacity: 0, x: 15, duration: 0.25, ease: 'power2.out' });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Ẩn hoàn toàn linh thú trong phòng thi CBT để tuân thủ 100% tính kỷ luật và môi trường thi thật của ETS.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** ETS Standard Blue: `#2563EB` | Answered: `#10B981` | Flagged: `#F59E0B` | Unanswered: `#64748B`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Phím tắt chuẩn máy tính: Phím `A`, `B`, `C`, `D` để chọn đáp án; `N` để sang câu tiếp theo, `P` để lùi câu trước, `M` để gắn cờ xem lại.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-14 · Luyện Tập Vi Mô Theo Kỹ Năng (Micro-Drill Focus Pod)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Luyện tập chớp nhoáng 5-10 câu cho các kỹ năng chuyên biệt (VD: Bẫy câu hỏi Who/Where Part 2, Mệnh đề quan hệ Part 5) trong thời gian 3-5 phút.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Focused Radial Backdrop | Layer 1: Tactile Question Card | Layer 2: Fast-answer feedback ring

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [← Thoát Luyện Tập]         MICRO-DRILL: PHẢN XẠ PART 5 — ĐẠI TỪ & TÍNH TỪ SỞ HỮU         [⏱️ 02:45]    |
+---------------------------------------------------------------------------------------------------------+
|  TACTILE FOCUS POD (Center Stage)                                                                       |
|       +-----------------------------------------------------------------------------------------+       |
|       | Câu 3 / 5:                                                                              |       |
|       | The regional manager congratulated the marketing team on ________ successful campaign.  |       |
|       | [ A ] they                                                                              |       |
|       | [ B ] their (✓)                                                                         |       |
|       | [ C ] them                                                                              |       |
|       | [ D ] theirs                                                                            |       |
|       | ⚡ Tốc độ phản xạ: 4.2 giây (Mục tiêu: < 8s)  ===>  [ ⚡ Tia Sét Sparky Kích Hoạt! ]     |       |
|       | [ ⚡ KIỂM TRA PHẢN XẠ NGAY (52dp) ]                                                      |       |
|       +-----------------------------------------------------------------------------------------+       |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| [←] MICRO-DRILL           ⏱️ 02:45|
+-----------------------------------+
| Câu 3 / 5 · Part 5 Đại Từ         |
| ...on ________ successful campaign|
| [ A ] they (52dp)                 |
| [ B ] their (✓)                   |
| [ C ] them                        |
| [ D ] theirs                      |
| ⚡ Phản xạ: 4.2s (Siêu tốc!)      |
| ⚡ Sparky: "Quá nhanh quá hiểm!"  |
| [ ⚡ TIẾP TỤC CÂU 4 (52dp)       ] |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .drill-card { transform: scale(1); transition: transform 0.2s ease; } .drill-card.speedy { box-shadow: 0 0 25px rgba(245, 158, 11, 0.4); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.lightning-spark', { scale: 0, opacity: 1, duration: 0.3, ease: 'rough' });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Sparky (Sóc Tia Chớp) bay vọt qua màn hình để lại vệt sét vàng mỗi khi học viên giải câu hỏi dưới 8 giây.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Speed Gold: `#F59E0B` | Success: `--success-500` | Surface: `--neutral-850`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Tối ưu hóa thao tác chạm 1 lần (Single-tap submit): Chọn đáp án là kiểm tra ngay để đẩy nhanh tốc độ phản xạ.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-15 · Luyện Tập Tự Do Theo Part (Free Practice Part Hub)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Học viên chủ động chọn Part mong muốn (Part 1 đến 7), tùy chỉnh số lượng câu hỏi và bộ lọc độ khó (Cơ bản, Nâng cao, Bẫy điểm cao).
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Grid background | Layer 1: Bento Part Cards (Z: 15px) | Layer 2: Interactive progress bars

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO                                                                         [← Về Dashboard]|
+---------------------------------------------------------------------------------------------------------+
|  TRUNG TÂM LUYỆN TẬP THEO PART (Free Practice Hub - Bento 7 Ô)                                          |
|  [ LISTENING HUBS ]                                                                                     |
|  +--------------------+ +--------------------+ +--------------------+ +-------------------------------+ |
|  | 🎧 PART 1 (Mô Tả)  | | 🎧 PART 2 (Hỏi Đáp)| | 🎧 PART 3 (Hội Thoại| | 🎧 PART 4 (Bài Nói Ngắn)     | |
|  | Đã luyện: 140 câu  | | Đã luyện: 320 câu  | | Đã luyện: 210 câu  | | Đã luyện: 180 câu             | |
|  | Độ chính xác: 88%  | | Độ chính xác: 76%  | | Độ chính xác: 69%  | | Độ chính xác: 64%             | |
|  | [ Luyện Ngay ]     | | [ Luyện Ngay ]     | | [ Luyện Ngay ]     | | [ Luyện Ngay ]                | |
|  +--------------------+ +--------------------+ +--------------------+ +-------------------------------+ |
|  [ READING HUBS ]                                                                                       |
|  +--------------------------------+ +--------------------------------+ +------------------------------+ |
|  | 📖 PART 5: ĐIỀN CÂU NGẮN       | | 📖 PART 6: ĐIỀN ĐOẠN VĂN       | | 📖 PART 7: ĐỌC HIỂU ĐƠN & ĐÔI| |
|  | Đã luyện: 650 câu · Đạt: 82%   | | Đã luyện: 120 câu · Đạt: 71%   | | Đã luyện: 280 câu · Đạt: 58% | |
|  | [ Bắt đầu luyện Part 5 ]       | | [ Bắt đầu luyện Part 6 ]       | | [ Bắt đầu luyện Part 7 ]     | |
|  +--------------------------------+ +--------------------------------+ +------------------------------+ |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| LUYỆN TẬP THEO PART               |
+-----------------------------------+
| 🎧 PHẦN NGHE HIỂU (LISTENING)     |
| [ Part 1: Hình Ảnh       (88%) ➔ ]|
| [ Part 2: Hỏi & Đáp      (76%) ➔ ]|
| [ Part 3: Hội Thoại      (69%) ➔ ]|
| [ Part 4: Bài Nói        (64%) ➔ ]|
| 📖 PHẦN ĐỌC HIỂU (READING)        |
| [ Part 5: Điền Câu Ngắn  (82%) ➔ ]|
| [ Part 6: Điền Đoạn Văn  (71%) ➔ ]|
| [ Part 7: Đọc Hiểu Đoạn  (58%) ➔ ]|
| 🦊 Lumink: "Part 7 đang dưới 60%, |
| cùng tớ cày thêm 10 câu nhé!"     |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .part-card { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); } .part-card:hover { transform: translateY(-6px); border-color: #6366F1; box-shadow: 0 15px 30px rgba(99,102,241,0.2); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.part-card', { y: 25, opacity: 0, stagger: 0.07, duration: 0.45, ease: 'power2.out' });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Linh thú chuyên trách hiển thị dạng huy hiệu nhỏ trên từng Part tương ứng (VD: Echlet trên Part 2/3, Lumink trên Part 7, Sparky trên Part 5).

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Listening Cyan: `#06B6D4` | Reading Violet: `#8B5CF6` | Primary: `--primary-500`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Các thẻ Part được phân loại bằng màu sắc rõ rệt, dễ dàng chọn nhanh bằng 1 cú chạm.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-16 · Báo Cáo Điểm & Bảng Điểm ETS Dự Đoán (Score Certificate & Deep Analytics)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Chứng chỉ số hóa kết quả sau mỗi bài thi full test hoặc thi chặng, phân tích phổ điểm, tốc độ làm bài theo từng Part.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Festive Confetti Aura | Layer 1: Certificate Hologram Card (Z: 25px) | Layer 2: Breakdown Bento Grid (Z: 15px)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO                                                   [ Xuất Chứng Chỉ PDF ] [ Chia Sẻ 🔗 ]|
+---------------------------------------------------------------------------------------------------------+
|  BÁO CÁO KẾT QUẢ THI CHUẨN ETS — FULL TEST #04                                                          |
|  +----------------------------------------------------------------------------------------------------+ |
|  | 🏅 TỔNG ĐIỂM DỰ ĐOÁN ETS: 785 / 990                                                                 | |
|  | • LISTENING SCORE: 410 / 495 (84/100 câu đúng)       • READING SCORE: 375 / 495 (78/100 câu đúng)    | |
|  | • Thời gian hoàn thành: 114 phút / 120 phút           • Tốc độ trung bình: 34s / câu                 | |
|  +----------------------------------------------------------------------------------------------------+ |
|  BENTO PHÂN TÍCH CHUYÊN SÂU TỪNG KỸ NĂNG                                                                |
|  +-------------------------------------+ +-------------------------------------+ +--------------------+ |
|  | 🎧 PHÂN BỐ NGHE HIỂU                | | 📖 PHÂN BỐ ĐỌC HIỂU                 | | ⏱️ QUẢN TRỊ THỜI GIAN| |
|  | Part 1: 6/6 (100%)                  | | Part 5: 26/30 (87%)                 | | Tiết kiệm 6 phút     | |
|  | Part 2: 22/25 (88%)                 | | Part 6: 12/16 (75%)                 | | Part 7 tốn: 54 phút  | |
|  | Part 3: 32/39 (82%)                 | | Part 7 (Đơn): 24/29 (82%)           | | (Vừa đủ chuẩn)       | |
|  | Part 4: 24/30 (80%)                 | | Part 7 (Kép/Ba): 16/25 (64% - Yếu)  | |                      | |
|  +-------------------------------------+ +-------------------------------------+ +--------------------+ |
|                 [ 🔍 XEM CHI TIẾT LỜI GIẢI & LỖI SAI (S-17) (Nút 56dp) ]                                 |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| BÁO CÁO KẾT QUẢ THI FULL TEST     |
+-----------------------------------+
| 🏅 TỔNG ĐIỂM ETS: 785 / 990       |
| • Nghe: 410   • Đọc: 375          |
| 📊 CHI TIẾT TỪNG PHẦN:            |
| • Part 1: 100% · Part 2: 88%      |
| • Part 3: 82%  · Part 4: 80%      |
| • Part 5: 87%  · Part 6: 75%      |
| • Part 7: 74% (40/54) ⚠️          |
| [ 🔍 XEM LỜI GIẢI CHI TIẾT (52dp)]|
| [ 📤 Chia sẻ bảng điểm ]          |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .cert-card { background: linear-gradient(145deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1.5px solid rgba(255,255,255,0.2); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.timeline().from('.cert-card', { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out' }).from('.score-counter', { textContent: 0, duration: 1.5, ease: 'power2.out', snap: { textContent: 5 } }, '-=0.3');
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Cả 5 linh thú tụ họp ở cuối bảng điểm chúc mừng học viên vượt mốc điểm quan trọng.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Gold Trophy: `#F59E0B` | Success Green: `--success-500` | Danger Warning: `--danger-500`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Hỗ trợ nút 'Xuất chứng chỉ' chuyển đổi toàn bộ thẻ thành hình ảnh PNG chất lượng cao để học viên chia sẻ lên mạng xã hội.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-17 · Xem Lại Bài Thi & Giải Thích Chi Tiết (Detailed Explanations & Audio Karaoke)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Học viên phân tích từng câu sai, nghe lại audio đồng bộ lời thoại Karaoke (tô sáng từng chữ), xem từ vựng trọng điểm và bẫy đề ETS.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Dark Studio Background | Layer 1: Karaoke Transcript Viewport (Z: 15px) | Layer 2: Interactive Audio Controller Bar (Z: 40px) | Layer 3: Trap Breakdown Card

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [← Về Báo Cáo Điểm]    XEM LẠI CÂU 47 / 200 (PART 3) — ĐÁP ÁN ĐÚNG: C · BẠN CHỌN: B ❌   [Lưu Vào Sổ SM-2]|
+---------------------------------------------------------------------------------------------------------+
|  REVIEW THEATER (Bố cục 2 Cột Chuyên Sâu)                                                               |
|  [ AUDIO PLAYER VỚI LỜI THOẠI KARAOKE (TRÁI) ]   [ LỜI GIẢI CHI TIẾT & BẪY ĐỀ THI (PHẢI) ]              |
|  +---------------------------------------------+ +----------------------------------------------------+ |
|  | 🎧 THANH TUA DẠNG SÓNG & ĐIỀU TỐC           | | ❓ Câu 47: What does the woman ask the man to do?  | |
|  | [ ▶️ ] [ ⏪ -5s ]  00:24 / 00:48  [ Tốc độ: 1.0x ▾]| [ A ] Sign a contract                                | |
|  | 📜 LỜI THOẠI ĐỒNG BỘ KARAOKE (Click từ):    | | [ B ❌ ] Send a package (Bạn chọn - Sai)           | |
|  | Man: Have you had a chance to look over it? | | [ C ✓ ] Review a draft proposal (Đáp án đúng)        | |
|  | Woman: Not yet, but **[could you please     | | [ D ] Schedule a meeting                           | |
|  | inspect this initial proposal first?]**     | | 💡 PHÂN TÍCH BẪY ETS:                              | |
|  | (Âm thanh đang phát từ: 'inspect')          | | Cụm 'inspect initial proposal' = 'review draft'    | |
|  +---------------------------------------------+ +----------------------------------------------------+ |
|  [ ◄ Câu Trước ]                 [ Bộ Lọc: Chỉ Xem Câu Sai (22) ]                    [ Câu Kế Tiếp ► ]  |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| [←] CÂU 47/200 (Sai ❌)   [+SM-2] |
+-----------------------------------+
| 🎧 [ ▶️ ] [ -5s ] 00:24 [ 1.0x ]  |
| 📜 LỜI THOẠI KARAOKE:             |
| "...could you please **inspect**  |
| this initial proposal first?"     |
| (Chạm từ để nghe đoạn đó)         |
| ❓ What does the woman ask?       |
| [ B ❌ ] Send package (Đã chọn)   |
| [ C ✓ ] Review draft proposal     |
| 💡 BẪY: Inspect = Review draft    |
| [ ◄ Câu trước ]   [ Câu kế tiếp ►]|
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .karaoke-word.active { color: #F59E0B; background: rgba(245, 158, 11, 0.15); border-radius: 4px; text-shadow: 0 0 10px rgba(245, 158, 11, 0.5); }
  ```

### 4. Chuẩn Hóa Lời Giải 3 Phần & Khép Kín Vòng SM-2 (Pedagogical Framework)
Mọi câu hỏi trong hệ thống được cấu trúc dữ liệu theo Schema 3 phần chuẩn hóa, hiển thị trên các thẻ Bento có lớp lót `scrim-dark` bảo đảm WCAG AA:

```typescript
export interface PedagogicalExplanation {
  questionId: string;
  // Phần 1: Căn cứ đáp án đúng
  correctRationale: {
    answer: "A" | "B" | "C" | "D";
    quoteEvidence: string;          // Đoạn trích dẫn trực tiếp từ bài
    vietnameseTranslation: string;   // Bản dịch song ngữ đối chiếu
    lexicalParaphrase: string;      // Từ đồng nghĩa cốt lõi (vd: inspect = review)
  };
  // Phần 2: Mổ xẻ bẫy phương án nhiễu (Tại sao sai?)
  distractorTraps: Array<{
    option: "A" | "B" | "C" | "D";
    trapType: "PHONETIC_CONFUSION" | "OVER_GENERALIZATION" | "WRONG_TENSE" | "OPPOSITE_MEANING";
    trapExplanation: string;        // Lý do học viên thường bị bẫy
  }>;
  // Phần 3: Chiến thuật & Điểm ngữ pháp cốt lõi
  takeawayTactics: {
    grammarRule: string;            // Công thức ngữ pháp tóm tắt
    skillTag: string;               // Tag vi kỹ năng (vd: Part3_Inference_Time)
    autoSm2CardGenerated: boolean;  // Tự động kết nạp vào SM-2
  };
}
```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Verbil (Rùa Thông Thái) cầm sách cổ ở góc phải, hiển thị nút bấm 'Thêm từ mới này vào Sổ tay SM-2' ngay cạnh bẫy đồng nghĩa. Toàn bộ câu làm sai được tự động đẩy vào SM-2 với huy hiệu xanh: *"Đã lưu vào Sổ tay ôn tập ngắt quãng"*.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Wrong: `--danger-500` | Right: `--success-500` | Karaoke Word: `--warning-500` | Scrim Layer: `--scrim-dark`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Lời thoại Karaoke có thể chạm vào bất kỳ từ nào để tua ngay lập tức tới giây phát của từ đó, tối ưu việc luyện nghe chép chính tả.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-18 · Sổ Tay Lỗi Sai & Ôn Luyện Thẻ SM-2 (Smart SM-2 Flashcard Deck)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Học viên quản lý toàn bộ câu sai và từ vựng, ôn tập theo thuật toán lặp lại ngắt quãng SuperMemo-2 (SM-2) với hiệu ứng lật thẻ 3D.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Deep Library Ambient | Layer 1: 3D Flip Card Element (Z: 30px) | Layer 2: SM-2 Rating Grade Dock (Z: 50px)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO   [← Về Dashboard]               SỔ TAY LỖI SAI & TỪ VỰNG SM-2 | 📚 142 Thẻ · 18 Đến Hạn|
+---------------------------------------------------------------------------------------------------------+
|  THẺ HỌC 3D FLIP CARD (Perspective: 1200px)                                                            |
|                           +-----------------------------------------------+                             |
|                           | [ 🗂️ THẺ TỪ VỰNG ĐẾN HẠN ÔN TẬP — CÂU 47/200 ]|                             |
|                           |                "INSPECT"                      |                             |
|                           |               /ɪnˈspekt/                      |                             |
|                           | Ngữ cảnh bài thi:                             |                             |
|                           | "Please inspect this initial proposal first." |                             |
|                           |             [ 🔄 BẤM ĐỂ LẬT THẺ (Space) ]      |                             |
|                           +-----------------------------------------------+                             |
|                                                  ▼                                                      |
|                           (MẶT SAU: Nghĩa: Kiểm tra kỹ, thẩm định · Bẫy: Review)                        |
|  ĐÁNH GIÁ CHẤT LƯỢNG GHI NHỚ THEO CHUẨN THUẬT TOÁN SM-2 (Phím 1 - 5):                                  |
|  +--------------------+ +--------------------+ +--------------------+ +-------------------------------+ |
|  | [ 1: Quên Hẳn ]    | | [ 2: Nhớ Mơ Hồ ]   | | [ 3: Khó Khăn ]    | | [ 4: Tốt ]   | [ 5: Hoàn Hảo ]| |
|  | Lặp lại sau 1 ngày | | Lặp lại sau 2 ngày | | Lặp lại sau 4 ngày | | Sau 7 ngày   | Sau 14 ngày    | |
|  +--------------------+ +--------------------+ +--------------------+ +-------------------------------+ |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| [←] SỔ TAY SM-2       18 Đến Hạn  |
+-----------------------------------+
| +-------------------------------+ |
| | 🗂️ THẺ 3D (Chạm để lật mặt)   | |
| |          "INSPECT"            | |
| |         /ɪnˈspekt/            | |
| | [ 🔊 Nghe phát âm chuẩn ]     | |
| +-------------------------------+ |
| ĐÁNH GIÁ ĐỘ NHỚ CỦA BẠN:          |
| [ 1: Quên (1d) ]   [ 2: Khó (3d) ]|
| [ 3: Tốt (7d) ]    [ 4: Dễ (14d)] |
| 🐢 Verbil: "Ôn đúng hạn giúp bạn  |
| tiết kiệm 80% thời gian học lại!" |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .flashcard-inner { transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); } .flashcard-inner.flipped { transform: rotateY(180deg); } .flashcard-front, .flashcard-back { backface-visibility: hidden; }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.sm2-button', { y: 20, opacity: 0, stagger: 0.05, duration: 0.35, ease: 'power2.out' });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Verbil (Rùa Thông Thái) mai rùa phát quang chữ Hy Lạp cổ, gật gù khen ngợi khi học viên bấm nút 4 hoặc 5.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Hard: `--danger-500` | Medium: `--warning-500` | Easy: `--success-500` | Flip Action: `--primary-500`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Hỗ trợ vuốt thẻ (Swipe Left để đánh dấu Quên, Swipe Right để đánh dấu Nhớ Tốt) trên màn hình cảm ứng di động.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-19 · Thống Kê & Bản Đồ Nhiệt Kỹ Năng (Competency Heatmap & IRT Telemetry)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Trực quan hóa trình độ học viên theo thời gian, hiển thị Bản đồ nhiệt (Heatmap) 48 tiểu kỹ năng và tham số năng lực IRT theta.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Deep Data Grid | Layer 1: Chart SVG Containers | Layer 2: Heatmap Matrix Pills (Interactive Tooltip Z: 40px)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO                                                                         [← Về Dashboard]|
+---------------------------------------------------------------------------------------------------------+
|  PHÂN TÍCH NĂNG LỰC CHUYÊN SÂU & BẢN ĐỒ NHIỆT KỸ NĂNG (Bento 12 Cột)                                    |
|  [ THẺ 1: TIẾN TRÌNH TĂNG ĐIỂM THEO TUẦN - 7 Cột ]          [ THẺ 2: THAM SỐ NĂNG LỰC IRT - 5 Cột ]     |
|  +--------------------------------------------------------+ +-----------------------------------------+ |
|  | 📈 BIỂU ĐỒ TĂNG TRƯỞNG DỰ BÁO (ETS 500 ➔ 785)          | | 🧬 IRT TELEMETRY METRICS                | |
|  | 800 |                       ╭────────── 785 (Hiện tại) | | • Tham số Năng Lực (θ): +1.42 (Cao)     | |
|  | 700 |             ╭─────────╯                          | | • Sai Số Chuẩn (SEM): 0.18 (Rất tin cậy)| |
|  | 600 |       ╭─────╯                                    | | • Tốc Độ Đọc: 185 từ/phút               | |
|  | 500 | ──────╯ (Tháng 7)            (Tháng 9)           | | • Tỉ lệ bẫy đồng âm Part 2: 12%         | |
|  +--------------------------------------------------------+ +-----------------------------------------+ |
|  [ THẺ 3: BẢN ĐỒ NHIỆT 48 TIỂU KỸ NĂNG (COMPETENCY HEATMAP) - 12 Cột ]                                  |
|  +----------------------------------------------------------------------------------------------------+ |
|  | Ngữ Pháp: [ Thì Động Từ: ■ ] [ Giới Từ: ■ ] [ Mệnh Đề Quan Hệ: ■ ] [ Thể Bị Động: ■ ]              | |
|  | Nghe Hiểu: [ Câu Hỏi Who: ■ ] [ Bẫy Mượn Từ: ■ ] [ Ngữ Điệu Gián Tiếp: ■ ] [ Biểu Đồ Kèm: ■ ]      | |
|  | Đọc Hiểu:  [ Tìm Chi Tiết: ■ ] [ Suy Luận Ý: ■ ] [ Điền Câu Văn Cảnh: ■ ] [ Đọc Đa Văn Bản: ■ ]     | |
|  +----------------------------------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| THỐNG KÊ & BẢN ĐỒ NHIỆT           |
+-----------------------------------+
| 📈 TIẾN TRÌNH: 500 ➔ 785 (+285đ)  |
| Năng lực IRT (θ): +1.42           |
| 🗺️ BẢN ĐỒ NHIỆT KỸ NĂNG:          |
| • Thì động từ:        88% [Xanh]  |
| • Mệnh đề quan hệ:    75% [Vàng]  |
| • Giới từ & Liên từ:  52% [Đỏ] ⚠️ |
| • Câu hỏi trực tiếp:  92% [Xanh]  |
| • Bẫy đồng âm:        61% [Vàng]  |
| • Suy luận đa đoạn:   54% [Đỏ] ⚠️ |
| [ 🎯 Luyện ngay kỹ năng yếu ]     |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .heatmap-cell { border-radius: 6px; padding: 8px 12px; transition: transform 0.2s ease; } .heatmap-cell:hover { transform: scale(1.08); z-index: 5; }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.heatmap-cell', { scale: 0, stagger: 0.02, duration: 0.3, ease: 'back.out(1.5)' });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Lumink cầm kính lúp soi vào ô kỹ năng đỏ có điểm thấp nhất ('Giới từ & Liên từ') và đưa ra gợi ý ôn tập.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** High: `--success-500` | Mid: `--warning-500` | Low: `--danger-500`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Đầy đủ nhãn trợ năng mô tả bằng chữ (Accessible Label) cho từng ô màu để người mù màu nhận biết chính xác trạng thái.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-20 · Đấu Trường & Bảng Xếp Hạng Hàng Tuần (Antigravity Colosseum & Leaderboard)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Học viên thi đua điểm XP trong tuần, thăng hạng các đoàn (Đồng, Bạc, Vàng, Kim Cương) và nhận thưởng Đá quý in-game vào 23:59 Chủ Nhật.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Colosseum Neon Pillars | Layer 1: Podium Pods 3D (Z: 30px) | Layer 2: Leaderboard Table Rows | Layer 3: Sticky Current User Rank Bar (Z: 100px)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO                                                   [ Quy Chế Giải ]  [ Mùa Giải: Tuần 38]|
+---------------------------------------------------------------------------------------------------------+
|  ĐẤU TRƯỜNG KIM CƯƠNG (Weekly Antigravity Arena) — Còn lại: 2 ngày 04 giờ                                |
|  [ TOP 3 VINH DANH (PODIUM 3D KHÔNG TRỌNG LỰC) ]                                                        |
|            🥈 HẠNG 2 (Bạc)                 🥇 HẠNG 1 (Vàng Hào Quang)              🥉 HẠNG 3 (Đồng)     |
|         +---------------------+             +---------------------+             +---------------------+ |
|         | 👤 Minh Anh         |             | 👤 Hoàng Long       |             | 👤 Thu Trang        | |
|         | 🐉 Streaklyn Lvl 16 |             | ⚡ Sparky Lvl 20     |             | 🦊 Lumink Lvl 14    | |
|         | 2,450 XP            |             | 3,120 XP            |             | 2,210 XP            | |
|         | [ Thưởng: 150 💎 ]  |             | [ Thưởng: 300 💎 ]  |             | [ Thưởng: 100 💎 ]  | |
|         +---------------------+             +---------------------+             +---------------------+ |
|  BẢNG XẾP HẠNG HỌC VIÊN:                                                                                |
|  +----------------------------------------------------------------------------------------------------+ |
|  | Hạng 4 | 👤 BẠN (Nguyễn Văn A)        | 🐉 Streaklyn Lvl 12 | 2,165 XP | Cách Top 3: 45 XP  | An toàn| |
|  | Hạng 5 | 👤 Lê Quốc Bảo               | 🦉 Echlet Lvl 11    | 1,980 XP |                    | An toàn| |
|  +----------------------------------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| 🏆 ĐẤU TRƯỜNG KIM CƯƠNG           |
+-----------------------------------+
| ⏱️ Kết thúc tuần sau: 2 ngày 4h   |
| 🥇 #1 Hoàng Long       3,120 XP   |
| 🥈 #2 Minh Anh         2,450 XP   |
| 🥉 #3 Thu Trang        2,210 XP   |
| --- VỊ TRÍ CỦA BẠN (Ghim Đáy) --- |
| 🎖️ #4 BẠN             2,165 XP   |
| [ Cách Top 3: 45 XP · Đua ngay! ] |
| [ ⚔️ VÀO HỌC ĐỂ TÍCH THÊM XP (52)]|
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .podium-first { transform: perspective(800px) translateY(-20px) scale(1.08); box-shadow: 0 0 30px rgba(245, 158, 11, 0.4); border-color: #F59E0B; }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.podium-item', { y: 60, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'back.out(1.7)' });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Linh thú của Top 3 người dẫn đầu đứng ăn mừng ngay trên bục vinh danh của họ.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Gold: `#F59E0B` | Silver: `#94A3B8` | Bronze: `#B45309` | Diamond: `#06B6D4`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Thanh trạng thái của chính học viên luôn được ghim cố định ở đáy màn hình điện thoại để họ luôn nắm được vị trí của mình.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-21 · Cửa Hàng Vật Phẩm Đổi Quà (Gems In-Game Bazaar)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** 100% kinh tế ảo trong game. Học viên dùng Đá quý (Gems) kiếm được từ việc học chăm chỉ để đổi trang phục linh thú, vé thi thử và đóng băng chuỗi Streak.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Cozy Bazaar Ambient Glow | Layer 1: Item Bento Cards | Layer 2: 3D Preview Modal (Z: 100px)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO   [← Về Dashboard]             CỬA HÀNG ĐỔI THƯỞNG (100% IN-GAME GEMS) | 💎 BẠN CÓ: 450   |
+---------------------------------------------------------------------------------------------------------+
|  [ BANNER CAM KẾT: 100% MIỄN PHÍ · ĐÁ QUÝ ĐƯỢC TÍCH LŨY QUA VIỆC HỌC, KHÔNG CÓ NẠP TIỀN MẶT ]           |
|  BENTO VẬT PHẨM ĐỔI THƯỞNG (3 Nhóm Lớn)                                                                 |
|  [ NHÓM 1: BẢO VỆ CHUỖI STREAK ]             [ NHÓM 2: TRANG PHỤC LINH THÚ ] [ NHÓM 3: TIỆN ÍCH CBT ]   |
|  +-----------------------------------------+ +-------------------------------+ +----------------------+ |
|  | ❄️ BĂNG BẢO TOÀN STREAK                 | | 👑 VƯƠNG MIỆN TINH TÚ         | | 🎟️ VÉ THI FULL TEST  | |
|  | Giữ nguyên chuỗi nếu bạn quên học 1 ngày| | Phụ kiện hoàng gia cho Lumink | | Mở khóa 1 đề thi ETS | |
|  | Giá: 100 Gems 💎                        | | Giá: 250 Gems 💎              | | mô phỏng đặc biệt    | |
|  | [ Mua Ngay ] (Đã sở hữu: 1)             | | [ Thử Đồ 3D ] [ Mua Ngay ]    | | Giá: 50 Gems 💎      | |
|  +-----------------------------------------+ +-------------------------------+ +----------------------+ |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| 🛍️ TIỆM ĐỔI QUÀ (100% FREE) 💎 450|
+-----------------------------------+
| ❄️ Băng Bảo Toàn Streak           |
| [ 100 Gems 💎 · Đổi Ngay (52dp) ] |
| 👑 Vương Miện Hoàng Gia (Lumink)  |
| [ 250 Gems 💎 · Thử Đồ 3D ]       |
| 🎟️ Vé Full Test ETS Đặc Biệt      |
| [ 50 Gems 💎 · Đổi Ngay ]         |
| 🐉 Streaklyn: "Học chăm chỉ mỗi   |
| ngày để tích lũy thêm Gems nhé!"  |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .shop-card { transform: scale(1); transition: all 0.25s ease; } .shop-card:hover { transform: scale(1.04); box-shadow: 0 10px 25px rgba(6, 182, 212, 0.3); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.shop-card', { opacity: 0, y: 30, stagger: 0.08, duration: 0.4, ease: 'power2.out' });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Lumink thử đội chiếc vương miện mới mua và xoay vòng tạo dáng gương mặt hãnh diện.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Gems Cyan: `#06B6D4` | Freeze Blue: `#38BDF8` | Gold: `#F59E0B`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Hộp thoại xác nhận trước khi trừ Gems, hiển thị số dư còn lại rõ ràng, không bao giờ có nút nạp tiền mặt.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-22 · Hồ Sơ Học Viên & Bộ Sưu Tập Huy Hiệu (Astral Profile & Trophy Gallery)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Trưng bày hồ sơ học tập cá nhân, danh hiệu, cấp độ tiến hóa của 5 linh thú và bộ sưu tập huy hiệu đã đạt được trong hành trình.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Galaxy Starfield | Layer 1: Profile Badge Bento (Z: 20px) | Layer 2: 3D Holographic Badges (Z: 40px)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO                                                                         [⚙️ Cài Đặt] 👤 |
+---------------------------------------------------------------------------------------------------------+
|  HỒ SƠ HỌC VIÊN & BỘ SƯU TẬP ASTRAL (Bento 12 Cột)                                                      |
|  [ THẺ THÔNG TIN CÁ NHÂN & LINH THÚ CHÍNH - 4 Cột ]          [ BẢNG THỐNG KÊ TỔNG QUAN - 8 Cột ]         |
|  +---------------------------------------------------------+ +----------------------------------------+ |
|  | 👤 NGUYỄN VĂN A                                         | | ⏱️ 48 Giờ Học Tập    🔥 14 Ngày Chuỗi| |
|  | Sinh viên Đại học Bách Khoa · Gia nhập: 06/2026         | | ⭐ 126 Sao Bản Đồ     📚 1,420 Câu Làm| |
|  | 🐉 THẦN THÚ CHÍNH: STREAKLYN (Cấp 12 · Stage 2 Brave)   | | 🎯 Mục tiêu: 750+ TOEIC (Đạt 785 ✓)    | |
|  | [ Đổi Linh Thú Đại Diện ] [ Xem Cây Tiến Hóa ]          | +----------------------------------------+ |
|  +---------------------------------------------------------+                                            |
|  [ BỘ SƯU TẬP HUY HIỆU DANH GIÁ (TROPHY SHOWCASE) - 12 Cột ]                                            |
|  +----------------------------------------------------------------------------------------------------+ |
|  | [ 🏅 Vệ Binh Streak 14 Ngày ]   [ ⚡ Phản Xạ Thần Tốc <5s ]   [ 🎯 Xạ Thủ Nghe Part 1 (100%) ]      | |
|  | [ 🏰 Chinh Phục Chặng 2 ]        [ 🧠 Bậc Thầy SM-2 (100 từ) ] [ 🔒 Thần Thoại 990 (Chưa Đạt) ]       | |
|  +----------------------------------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| HỒ SƠ HỌC VIÊN                    |
+-----------------------------------+
| 👤 NGUYỄN VĂN A                   |
| 🐉 Streaklyn Lvl 12 (Brave)       |
| • ⏱️ 48h Học   • 🔥 14 Ngày Chuỗi |
| • ⭐ 126 Sao   • 🎯 Dự đoán: 785  |
| 🏅 BỘ SƯU TẬP HUY HIỆU (5/12):    |
| [ 🏅 Vệ Binh Streak 14 Ngày ]     |
| [ ⚡ Tia Chớp Part 5 ]            |
| [ 🏰 Tốt Nghiệp Chặng 2 ]         |
| [ 🧠 Trí Nhớ Vàng SM-2 ]          |
| [ ⚙️ Cài đặt tài khoản ]          |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .trophy-badge { perspective: 600px; } .trophy-badge:hover .badge-mesh { transform: rotateY(180deg); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.trophy-badge', { scale: 0, stagger: 0.06, duration: 0.5, ease: 'back.out(1.8)' });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Linh thú chính của học viên bay lượn quanh avatar cá nhân, đội các phụ kiện đã mua trong shop.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Badge Gold: `#F59E0B` | Silver: `#CBD5E1` | Surface: `--neutral-800`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Huy hiệu có thể nhấn vào để mở Modal xem lại thời khắc nhận huy hiệu kèm ảnh chụp kỷ niệm.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-23 · Cài Đặt Hệ Thống & Tùy Biến Trải Nghiệm (Antigravity Control Center)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Cho phép học viên tùy biến giao diện Dark/Light Mode, giảm chuyển động hoạt ảnh (prefers-reduced-motion), cài đặt nhắc nhở học tập và đồng bộ thiết bị.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Neutral Backdrop | Layer 1: Settings Form Sections | Layer 2: Toggle Switches (Smooth spring physics)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO                                                                         [← Về Dashboard]|
+---------------------------------------------------------------------------------------------------------+
|  TRUNG TÂM CÀI ĐẶT HỆ THỐNG (Control Center Pod)                                                        |
|  [ NHÓM 1: GIAO DIỆN & TRẢI NGHIỆM THỊ GIÁC ]               [ NHÓM 2: LỊCH HỌC & THÔNG BÁO ]             |
|  +-------------------------------------------------------+ +------------------------------------------+ |
|  | • Chủ đề: [ 🌙 Thần Tinh Void (Tối) ] [ ☀️ Sáng ]     | | • Giờ nhắc học tập mỗi ngày: [ 20 : 00 ] | |
|  | • Hiệu ứng không trọng lực 3D: [ (ON) Bật ]           | | • Kênh thông báo: [✓] Web Push [✓] Email | |
|  | • Chế độ giảm chuyển động (Reduced Motion): [ (OFF) ] | | • Nhắc nhở cứu chuỗi Streak: [ (ON) Bật ]| |
|  | • Âm thanh tương tác linh thú: [ (ON) Bật ]           | +------------------------------------------+ |
|  +-------------------------------------------------------+                                              |
|  [ NHÓM 3: DỮ LIỆU & QUYỀN RIÊNG TƯ (PDPD COMPLIANT) ]                                                  |
|  +----------------------------------------------------------------------------------------------------+ |
|  | • Tải về toàn bộ dữ liệu học tập cá nhân (JSON / CSV): [ Xuất Dữ Liệu ]                            | |
|  | • Đăng xuất khỏi mọi thiết bị khác: [ Đăng Xuất An Toàn ]                                           | |
|  | • Xóa tài khoản vĩnh viễn (Theo luật PDPD Việt Nam): [ Xóa Tài Khoản ]                             | |
|  +----------------------------------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| [←] CÀI ĐẶT HỆ THỐNG              |
+-----------------------------------+
| 🎨 GIAO DIỆN & HOẠT ẢNH:          |
| • Chế độ: [ 🌙 Tối (Void) ]       |
| • Giảm chuyển động 3D:   [ O  ]   |
| • Âm thanh Linh Thú:     [ (X) ]  |
| 🔔 NHẮC NHỞ HỌC TẬP:              |
| • Báo giờ học:           [ 20:00 ]|
| • Cứu lửa Streak:        [ (X) ]  |
| 🛡️ BẢO VỆ DỮ LIỆU (PDPD):         |
| • [ Xuất dữ liệu học tập ]        |
| • [ Đăng xuất an toàn ]           |
| Phiên bản: TOEIC PRO v10.0.0      |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .toggle-switch { transition: background-color 0.25s ease; } .toggle-knob { transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.settings-group', { opacity: 0, y: 20, stagger: 0.08, duration: 0.4 });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Linh thú ngồi quan sát, khi chuyển sang chế độ Reduced Motion, linh thú lập tức dừng bập bềnh và chuyển sang trạng thái tĩnh (Static Pose).

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Active Toggle: `--primary-500` | Danger Button: `--danger-500`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Công tắc gạt (Toggle Switch) đạt kích thước chuẩn 52x32px, khoảng cách an toàn tránh bấm nhầm.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-25 · Quản Trị Nội Dung & Ngân Hàng Đề Thi (Admin Item Bank & Media Studio)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Admin duyệt, tạo mới, chỉnh sửa ngân hàng câu hỏi, tải lên audio đề thi định dạng ETS, hiệu chuẩn độ phân biệt a và độ khó b theo mô hình IRT 2PL.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Admin Charcoal Slate Canvas | Layer 1: Data Table Pod (Z: 15px) | Layer 2: Modal Editor Flyout (Z: 100px)

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO ADMIN PORTAL                         [Ngân Hàng Câu Hỏi]  [Người Dùng]  [Hệ Thống]  👤 |
+---------------------------------------------------------------------------------------------------------+
|  QUẢN TRỊ NỘI DUNG & NGÂN HÀNG CÂU HỎI (12 Cột)                                                         |
|  [ BỘ LỌC CÂU HỎI: Part 1 - 7 | Độ Khó IRT (-3 đến +3) | Trạng Thái: Active | [🔍 Tìm kiếm câu hỏi] ]   |
|  +----------------------------------------------------------------------------------------------------+ |
|  | ID    | Part   | Nội Dung / Đoạn Mẫu                    | Tham Số IRT 2PL (a, b)  | Audio  | Thao Tác|
|  |-------|--------|----------------------------------------|-------------------------|--------|---------|
|  | Q1042 | Part 3 | Conversation about flight cancellation | a: 1.45, b: +0.82       | 🎧 Có  | [✏️] [🗑️]|
|  | Q1043 | Part 5 | The board of directors agreed to...    | a: 1.12, b: -0.45       | ❌     | [✏️] [🗑️]|
|  | Q1044 | Part 7 | Email regarding equipment warranty     | a: 1.78, b: +1.65       | ❌     | [✏️] [🗑️]|
|  +----------------------------------------------------------------------------------------------------+ |
|  [ ➕ THÊM CÂU HỎI MỚI ]   [ 📥 NHẬP TỪ EXCEL/JSON ]   [ 📤 XUẤT NGÂN HÀNG DỰ PHÒNG ]                    |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| [≡] ADMIN QUESTION BANK           |
+-----------------------------------+
| [🔍 Tìm câu hỏi, mã ID...       ] |
| Lọc: [ Part 5 ▾ ] [ Độ Khó ▾ ]    |
| • Q1042 · Part 3 (b = +0.82)      |
|   🎧 Có audio · [ Sửa ] [ Xóa ]   |
| • Q1043 · Part 5 (b = -0.45)      |
| [ ➕ THÊM CÂU HỎI (52dp)         ] |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .admin-table-row { transition: background 0.15s ease; } .admin-table-row:hover { background: rgba(99,102,241,0.08); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.admin-table-row', { opacity: 0, x: -10, stagger: 0.03, duration: 0.25 });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Không áp dụng linh thú cho khu vực quản trị chuyên nghiệp của Admin.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Admin Accent: `#6366F1` | Parameter Blue: `#0284C7`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Hỗ trợ phím tắt điều hướng dữ liệu dạng spreadsheet, tự động lưu nháp (Auto-draft save).
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).

---

## S-26 · Quản Trị Người Dùng & Phân Tích Hệ Thống (Admin User Telemetry & Health Grid)

### 1. Thông Tin Định Danh & Mục Tiêu Thị Giác
- **Mục tiêu Trải nghiệm:** Admin giám sát lưu lượng học viên thời gian thực, tỉ lệ hoàn thành trạm Saga, phát hiện lỗi hệ thống và quản lý tài khoản người dùng.
- **Trường phái:** Antigravity 2.5D · Bento Glassmorphism · Zero-G Spatial Depth.
- **Phân bổ Chiều Sâu Không Gian:**
  - Layer 0: Deep Telemetry Slate Grid | Layer 1: KPI Stat Widgets | Layer 2: User Activity Table

### 2. Sơ Đồ Khung Dây Bento 2.0 (ASCII Wireframe Blueprint)

#### 🖥️ Bố cục Desktop (12 Cột · Perspective: 1200px)
```text
+---------------------------------------------------------------------------------------------------------+
| [LOGO] TOEIC PRO ADMIN PORTAL                         [Ngân Hàng Câu Hỏi]  [Người Dùng]  [Hệ Thống]  👤 |
+---------------------------------------------------------------------------------------------------------+
|  GIÁM SÁT HỆ THỐNG & PHÂN TÍCH TELEMETRY THỜI GIAN THỰC                                                 |
|  [ THẺ METRICS TRỰC TUYẾN - 4 Cột ] [ THẺ TỈ LỆ VƯỢT TRẠM SAGA - 4 Cột ] [ THẺ SỨC KHỎE HỆ THỐNG - 4 C] |
|  +--------------------------------+ +---------------------------------+ +-----------------------------+ |
|  | 👥 1,842 Học Viên Online       | | 🗺️ 78.4% Hoàn Thành Chặng 1     | | 🟢 API Latency: 42ms        | |
|  | 🚀 45 Phòng Thi CBT Đang Chạy  | | ⚠️ Chặng 2 (Part 3): Rớt 32%     | | 🟢 DB Connections: 14/100   | |
|  | 🔥 8,240 Chuỗi Streak Bảo Toàn | | 🎯 Trạm 21: Điểm nghẽn cần bổ trợ| | 🟢 Error Rate: 0.02%        | |
|  +--------------------------------+ +---------------------------------+ +-----------------------------+ |
|  DANH SÁCH HỌC VIÊN & TELEMETRY NĂNG LỰC:                                                               |
|  +----------------------------------------------------------------------------------------------------+ |
|  | Email                    | Ngày Tạo   | Điểm Vào | Dự Đoán Hiện Tại | Streak | Linh Thú | Trạng Thái |
|  |--------------------------|------------|----------|------------------|--------|----------|------------|
|  | hocvien1@gmail.com       | 01/08/2026 | 450      | 720 (+270đ)      | 24 ngày| Streaklyn| Hoạt động  |
|  | hocvien2@edu.vn          | 15/08/2026 | 600      | 810 (+210đ)      | 18 ngày| Lumink   | Hoạt động  |
|  +----------------------------------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------------+
```

#### 📱 Bố cục Mobile (Single Column · Ergonomic Thumb Zone · Touch Targets >= 52dp)
```text
+-----------------------------------+
| [≡] ADMIN SYSTEM TELEMETRY        |
+-----------------------------------+
| 🟢 Trạng thái: Bình thường        |
| • Học viên online: 1,842          |
| • Phòng CBT đang chạy: 45         |
| • API Response: 42ms              |
| 🗺️ ĐIỂM NGHẼN BẢN ĐỒ SAGA:        |
| • Trạm 21 (Bẫy Part 3): 32% trượt |
| [ 👥 Quản lý danh sách User ]     |
| [ ⚙️ Cấu hình bảo trì ]           |
+-----------------------------------+
```

### 3. Thông Số 3D CSS & Glassmorphism
- **CSS 3D Transforms:**
  ```css
  .metric-widget { border-radius: 12px; background: rgba(30,41,59,0.7); border: 1px solid rgba(255,255,255,0.1); }
  ```

### 4. Kịch Bản Hoạt Ảnh GSAP & Động Lực Học (Motion Choreography)
- **Timeline GSAP:**
  ```javascript
  gsap.from('.metric-widget', { opacity: 0, scale: 0.95, stagger: 0.06, duration: 0.35 });
  ```

### 5. Vị Trí & Phản Ứng Đồng Hành Của Linh Thú (Lexling Anchor)
- **Vị trí Neo & Tương tác:** Không áp dụng cho trang quản trị hệ thống.

### 6. Bảng Ánh Xạ Design Tokens & Dark Mode
- **Tokens Sử dụng:** Health Green: `--success-500` | Warning Alert: `--warning-500` | Stat Blue: `--primary-400`

### 7. Công Thái Học Di Động & Khả Năng Tiếp Cận (Ergonomics & A11y)
- **Quy chuẩn Công thái học:** Tối ưu hóa bảng dữ liệu trên desktop với khả năng sắp xếp cột nhanh (Quick Sort) và xuất file báo cáo.
- **Dự phòng Giảm chuyển động:** Tuân thủ `prefers-reduced-motion: reduce`, loại bỏ toàn bộ hiệu ứng nghiêng 3D (`transform: none`) và chuyển về fade-in đơn giản (`duration: 0.15s`).
