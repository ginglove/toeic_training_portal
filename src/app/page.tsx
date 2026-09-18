import React from 'react';
import Link from 'next/link';
import { Sparkles, Compass, ShieldCheck, Zap, Award, BookCheck, ArrowRight, HeartHandshake, Flame, Star, Volume2, BookOpen, Layers } from 'lucide-react';
import { AnimeGuardian } from '@/components/AnimeGuardian';

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-[#090D16]">
      {/* Deep Space Background Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl opacity-75" />
      <div className="pointer-events-none absolute top-1/3 -left-48 w-[500px] h-[500px] bg-emerald-500/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-1/2 -right-48 w-[500px] h-[500px] bg-amber-500/10 blur-3xl rounded-full" />

      {/* S-01 Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Zero Paywall Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400 backdrop-blur-md shadow-lg shadow-emerald-500/10">
              <HeartHandshake className="h-4 w-4" />
              <span>100% MIỄN PHÍ · ZERO PAYWALL · KHÔNG GIỤC NẠP VIP</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight sm:leading-tight">
              CHINH PHỤC <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-400">TOEIC 990</span> BẰNG TRÍ TUỆ NHÂN TẠO &amp; LINH THÚ HỘ MỆNH
            </h1>

            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              Lộ trình thích ứng IRT 2 tham số Logistic. 48 trạm bản đồ Saga 2.5D sống động. Sổ tay lỗi sai SuperMemo SM-2. Đồng hành cùng 5 Thần Thức Anime hộ mệnh thanh lịch.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/onboarding"
                className="btn-chunky w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all"
              >
                <span>Bắt Đầu Miễn Phí Ngay</span>
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/diagnostic"
                className="btn-chunky w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-slate-900 border border-slate-700 px-8 py-4 text-base font-bold text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-all"
              >
                <Zap className="h-5 w-5 text-amber-400" />
                <span>Test Chẩn Đoán IRT</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Định dạng chuẩn ETS</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                <span>Ước lượng năng lực SEM ±35–50 pts</span>
              </div>
            </div>
          </div>

          {/* Hero Right 3D Stage: Streaklyn Flame Prince */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* 3D Stage Backdrop Card */}
            <div className="w-full max-w-md bento-card p-8 flex flex-col items-center text-center relative shadow-2xl border-amber-500/20 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-950/80">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-400">
                <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-400 animate-bounce" />
                <span>Thần Thức Giữ Lửa · Streaklyn</span>
              </div>

              {/* Anime Guardian Stage 1 */}
              <AnimeGuardian
                character="streaklyn"
                stage={1}
                state="idle"
                size="hero"
                customDialogue="'Ngọn lửa nhiệt huyết không bao giờ tắt! Cùng nhau chinh phục TOEIC 990 nhé!'"
              />

              {/* Stage description */}
              <p className="mt-6 text-xs text-slate-300 font-medium leading-relaxed">
                Hoàng tử Hỏa Long bảo hộ chuỗi ngày học của bạn. Hoàn thành trạm mỗi ngày để giữ lửa Streak và thức tỉnh cánh thần!
              </p>

              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-slate-400 font-semibold">
                <span className="flex items-center gap-1 text-amber-400">
                  <Flame className="h-3 w-3 fill-amber-400" /> Chuỗi 12 ngày
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-indigo-400">
                  <Sparkles className="h-3 w-3" /> 4 Cấp tiến hóa
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Anime Celestial Guardians Showcase */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1 text-xs font-bold text-indigo-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>HỆ SINH THÁI THẦN THỨC HỘ MỆNH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            5 Vị Thần Thức Anime Đồng Hành Trong Từng Kỹ Năng
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Mỗi thần thức chuyên trách một kỹ năng làm bài chuyên biệt, cổ vũ khi chọn đúng và động viên bằng khiên ấm áp khi chọn sai.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Sparky */}
          <div className="bento-card p-5 text-center flex flex-col items-center hover:border-amber-500/40 transition-all">
            <AnimeGuardian character="sparky" size="md" showDialogue={false} />
            <h3 className="mt-4 text-base font-bold text-white">Sparky</h3>
            <p className="text-xs text-amber-400 font-semibold">Thiếu Niên Sấm Sét</p>
            <p className="mt-2 text-[11px] text-slate-400">Chuyên trách Part 5 &amp; phản xạ nhanh dưới 8 giây</p>
          </div>

          {/* Echlet */}
          <div className="bento-card p-5 text-center flex flex-col items-center hover:border-cyan-500/40 transition-all">
            <AnimeGuardian character="echlet" size="md" showDialogue={false} />
            <h3 className="mt-4 text-base font-bold text-white">Echlet</h3>
            <p className="text-xs text-cyan-400 font-semibold">Thánh Nữ Sóng Âm</p>
            <p className="mt-2 text-[11px] text-slate-400">Thính giác Part 2, 3 &amp; giải mã bẫy âm thanh tương tự</p>
          </div>

          {/* Lumink */}
          <div className="bento-card p-5 text-center flex flex-col items-center hover:border-purple-500/40 transition-all">
            <AnimeGuardian character="lumink" size="md" showDialogue={false} />
            <h3 className="mt-4 text-base font-bold text-white">Lumink</h3>
            <p className="text-xs text-purple-400 font-semibold">Thiếu Nữ Tinh Tú</p>
            <p className="mt-2 text-[11px] text-slate-400">Đọc hiểu Part 7 &amp; lăng kính khúc xạ manh mối văn bản</p>
          </div>

          {/* Streaklyn */}
          <div className="bento-card p-5 text-center flex flex-col items-center hover:border-rose-500/40 transition-all">
            <AnimeGuardian character="streaklyn" size="md" showDialogue={false} />
            <h3 className="mt-4 text-base font-bold text-white">Streaklyn</h3>
            <p className="text-xs text-rose-400 font-semibold">Hoàng Tử Hỏa Long</p>
            <p className="mt-2 text-[11px] text-slate-400">Bảo vệ chuỗi Streak &amp; thổi bùng ý chí bền bỉ mỗi ngày</p>
          </div>

          {/* Verbil */}
          <div className="bento-card p-5 text-center flex flex-col items-center hover:border-emerald-500/40 transition-all">
            <AnimeGuardian character="verbil" size="md" showDialogue={false} />
            <h3 className="mt-4 text-base font-bold text-white">Verbil</h3>
            <p className="text-xs text-emerald-400 font-semibold">Hiền Triết Cổ Tự</p>
            <p className="mt-2 text-[11px] text-slate-400">5000 từ vựng cốt lõi &amp; thuật toán lặp lại ngắt quãng SM-2</p>
          </div>
        </div>
      </section>

      {/* Bento 2.0 Feature Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Kiến Trúc Học Tập Tối Ưu Từng Giây</h2>
          <p className="mt-2 text-sm text-slate-400">Kết hợp khoa học dữ liệu khảo thí IRT và trải nghiệm không gian Antigravity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bento-card p-6 flex flex-col justify-between hover:border-indigo-500/40 transition-all">
            <div>
              <div className="h-12 w-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Khảo Thí IRT 2PL</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Định lượng latent ability (θ) và dải sai số chuẩn SEM, loại bỏ việc đoán điểm cảm tính.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-indigo-400">Khám phá &rarr;</span>
          </div>

          <div className="bento-card p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all">
            <div>
              <div className="h-12 w-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Bản Đồ Saga 2.5D</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                48 trạm học tập phân tầng qua 4 Biomes thần thoại. Mở khóa ải và thu thập bùa chú.
              </p>
            </div>
            <Link href="/saga-map" className="mt-4 text-xs font-bold text-emerald-400">Xem Bản đồ &rarr;</Link>
          </div>

          <div className="bento-card p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all">
            <div>
              <div className="h-12 w-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
                <BookCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Sổ Tay SM-2</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Thuật toán SuperMemo-2 phân bổ lịch ôn tập câu sai tối ưu đường cong quên của Ebbinghaus.
              </p>
            </div>
            <Link href="/notebook" className="mt-4 text-xs font-bold text-amber-400">Mở sổ tay &rarr;</Link>
          </div>

          <div className="bento-card p-6 flex flex-col justify-between hover:border-purple-500/40 transition-all">
            <div>
              <div className="h-12 w-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Thi Thử Chuẩn ETS</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Môi trường CBT đúng từng mili-giây âm thanh, bảng quy đổi điểm equating quốc tế.
              </p>
            </div>
            <Link href="/exam/ETS-2024-TEST-01" className="mt-4 text-xs font-bold text-purple-400">Vào phòng thi &rarr;</Link>
          </div>
        </div>
      </section>
    </div>
  );
}