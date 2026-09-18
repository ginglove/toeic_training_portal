'use client';

import React from 'react';
import Link from 'next/link';
import { AnimeGuardian } from '@/components/AnimeGuardian';
import { Headphones, BookOpen, Clock, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function DiagnosticBriefingPage() {
  return (
    <div className="min-h-[85vh] mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1 text-xs font-bold text-cyan-400 mb-3">
          <Zap className="h-3.5 w-3.5" />
          <span>PHÒNG HƯỚNG DẪN CHẨN ĐOÁN · S-06 BRIEFING</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Kiểm Tra Năng Lực Thích Ứng IRT 2PL
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Bài test thông minh gồm 25 câu hỏi được hiệu chỉnh theo thời gian thực để ước lượng chính xác khoảng điểm TOEIC của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Time Card */}
        <div className="bento-card p-6 text-center">
          <div className="h-12 w-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-white">Thời Lượng 25 Phút</h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            12 câu Listening (10 phút) + 13 câu Reading (15 phút). Đồng hồ tự động chuyển phần.
          </p>
        </div>

        {/* Listening Guide */}
        <div className="bento-card p-6 text-center">
          <div className="h-12 w-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
            <Headphones className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-white">Listening (No-Seek)</h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Âm thanh phát 1 lần chuẩn kỳ thi thật. Đồng hành cùng Thánh nữ Sóng Âm Echlet.
          </p>
        </div>

        {/* Reading Guide */}
        <div className="bento-card p-6 text-center">
          <div className="h-12 w-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto mb-4">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-white">Reading (Dual-Pane)</h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Giao diện chia đôi màn hình đọc văn bản và chọn đáp án với hỗ trợ từ Lumink.
          </p>
        </div>
      </div>

      {/* Guardian Guides Pod */}
      <div className="bento-card p-8 mb-10 flex flex-col sm:flex-row items-center justify-around gap-6 border-indigo-500/20 bg-gradient-to-r from-cyan-950/20 via-slate-900/60 to-purple-950/20">
        <div className="flex items-center gap-4">
          <AnimeGuardian character="echlet" size="sm" showDialogue={false} />
          <div className="text-left">
            <h4 className="text-sm font-bold text-cyan-400">Echlet dặn dò:</h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xs">
              &quot;Đeo tai nghe và chọn nơi yên tĩnh nhé. Hãy chú ý các từ nối và trọng âm câu.&quot;
            </p>
          </div>
        </div>

        <div className="h-10 w-px bg-slate-800 hidden sm:block" />

        <div className="flex items-center gap-4">
          <AnimeGuardian character="lumink" size="sm" showDialogue={false} />
          <div className="text-left">
            <h4 className="text-sm font-bold text-purple-400">Lumink dặn dò:</h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xs">
              &quot;Đừng dịch từng chữ. Hãy lướt câu hỏi trước để xác định vị trí thông tin cần tìm.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center">
        <Link
          href="/diagnostic/arena"
          className="btn-chunky inline-flex items-center justify-center gap-2.5 rounded-xl bg-indigo-600 px-10 py-4 text-base font-bold text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all"
        >
          <span>Bắt Đầu Làm Bài Test Ngay</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
        <p className="mt-3 text-xs text-slate-400">
          Kết quả sẽ sinh ra báo cáo năng lực IRT và mở khóa Lộ trình Saga 48 trạm.
        </p>
      </div>
    </div>
  );
}