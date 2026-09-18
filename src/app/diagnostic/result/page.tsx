'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimeGuardian } from '@/components/AnimeGuardian';
import { Sparkles, Trophy, ArrowRight, Target, Clock, ShieldCheck, Compass } from 'lucide-react';

export default function DiagnosticResultPage() {
  const [diagnostic, setDiagnostic] = useState<any>(null);

  useEffect(() => {
    fetch('/api/v1/users/me/dashboard')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.diagnostic) {
          setDiagnostic(json.data.diagnostic);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const listeningScore = diagnostic?.listeningScore || 290;
  const readingScore = diagnostic?.readingScore || 275;
  const overallScore = diagnostic?.overallScore || (listeningScore + readingScore);
  const thetaL = diagnostic?.thetaListening !== undefined ? Number(diagnostic.thetaListening).toFixed(2) : '+0.20';
  const thetaR = diagnostic?.thetaReading !== undefined ? Number(diagnostic.thetaReading).toFixed(2) : '+0.10';

  return (
    <div className="min-h-[90vh] mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-400 mb-3">
          <Trophy className="h-3.5 w-3.5" />
          <span>KẾT QUẢ KHẢO THÍ CHẨN ĐOÁN · S-09 GENESIS MORPH</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Báo Cáo Năng Lực IRT &amp; Thức Tỉnh Linh Thần
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Ước lượng năng lực thực tế latent ability với dải tin cậy 95% (SEM ±35–50 điểm).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
        {/* Score Band Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bento-card p-6 sm:p-8 border-indigo-500/30 bg-gradient-to-br from-indigo-950/30 via-slate-900/60 to-slate-900/60">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Khoảng Điểm Năng Lực Chuẩn Hóa</h2>
            <div className="flex items-baseline gap-4 my-4">
              <span className="text-5xl sm:text-6xl font-black text-white">
                {Math.max(10, overallScore - 40)} – {Math.min(990, overallScore + 40)}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                SEM ±35–50 pts
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div>
                <p className="text-xs text-slate-400">Listening Scale</p>
                <p className="text-2xl font-black text-cyan-400">{listeningScore} pts</p>
                <p className="text-[11px] text-slate-500">Độ chuẩn θ = {thetaL}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Reading Scale</p>
                <p className="text-2xl font-black text-purple-400">{readingScore} pts</p>
                <p className="text-[11px] text-slate-500">Độ chuẩn θ = {thetaR}</p>
              </div>
            </div>
          </div>

          {/* Effort Model & Reality Check */}
          <div className="bento-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Mô Hình Nỗ Lực Học Tập (Effort Model)</h3>
                <p className="text-xs text-slate-400">Dự báo để đạt mục tiêu 750+ TOEIC</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Bạn cần khoảng <strong className="text-amber-400">45 giờ học tập thực tế</strong> (khoảng 30 ngày ở cường độ 45 phút/ngày). Lộ trình Saga 48 trạm sẽ phân bổ tối ưu 35% cho câu sai, 40% cho kỹ năng yếu Part 5 &amp; 7.
            </p>
          </div>
        </div>

        {/* Right Column: Genesis Morph / Evolution to Stage 2 Adventurer */}
        <div className="lg:col-span-5 bento-card p-6 text-center border-amber-500/30 flex flex-col items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-400 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>LINH THẦN TIẾN HÓA CẤP 2</span>
            </div>

            <AnimeGuardian
              character="sparky"
              stage={2}
              state="victory"
              size="lg"
              customDialogue="'Chúc mừng bạn đã hoàn thành bài test! Mình đã khoác áo choàng Hành Giả để đồng hành cùng bạn trên Bản đồ Saga!'"
            />

            <h3 className="mt-4 text-base font-black text-white">Sparky · Stage 2: Hành Giả</h3>
            <p className="text-xs text-amber-400 font-semibold mt-0.5">Trang phục phiêu lưu gấm lụa thức tỉnh</p>
          </div>

          <div className="w-full mt-6 pt-4 border-t border-slate-800">
            <Link
              href="/saga-map"
              className="btn-chunky w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-xs font-bold text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition"
            >
              <Compass className="h-4 w-4 text-emerald-400" />
              <span>Khám Phá Bản Đồ Saga 48 Trạm</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}