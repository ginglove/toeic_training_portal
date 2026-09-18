import React from 'react';
import Link from 'next/link';
import { AnimeGuardian } from '@/components/AnimeGuardian';
import { Award, ArrowRight, BarChart3, Clock, CheckCircle2, RotateCcw } from 'lucide-react';

export default function ExamResultPage() {
  return (
    <div className="min-h-[85vh] mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-400 mb-3">
          <Award className="h-3.5 w-3.5" />
          <span>BÁO CÁO KẾT QUẢ BÀI THI · S-16 SCORE CERTIFICATE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Bảng Điểm Mô Phỏng CBT Chuẩn ETS
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Quy đổi theo bảng tra equating định dạng chuẩn ETS.
        </p>
      </div>

      {/* Score Summary Bento */}
      <div className="bento-card p-8 border-indigo-500/30 bg-gradient-to-br from-indigo-950/30 via-slate-900 to-slate-950 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Listening Scaled</p>
            <p className="text-5xl font-black text-white mt-2">420</p>
            <p className="text-xs text-slate-400 mt-1">85/100 câu đúng</p>
          </div>
          <div className="border-y md:border-y-0 md:border-x border-slate-800 py-4 md:py-0">
            <p className="text-xs font-bold text-purple-400 uppercase tracking-wider">Reading Scaled</p>
            <p className="text-5xl font-black text-white mt-2">385</p>
            <p className="text-xs text-slate-400 mt-1">78/100 câu đúng</p>
          </div>
          <div>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Tổng Điểm ETS</p>
            <p className="text-5xl font-black text-emerald-400 mt-2">805</p>
            <p className="text-xs text-slate-400 mt-1">Vượt mục tiêu 750 (+55 pts)</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/exam/review/ETS-2024-TEST-01"
          className="btn-chunky inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition"
        >
          <span>Xem Lại Lời Giải Chi Tiết (S-17)</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/notebook"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-6 py-3.5 text-xs font-bold text-slate-200 hover:bg-slate-800 transition"
        >
          <span>Ôn Luyện Câu Sai Trong Sổ Tay SM-2</span>
        </Link>
      </div>
    </div>
  );
}