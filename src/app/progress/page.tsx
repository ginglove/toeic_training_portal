'use client';

import React from 'react';
import { TrendingUp, BarChart3, Clock, Target, Compass, Award } from 'lucide-react';

export default function ProgressPage() {
  const skillsHeatmap = [
    { part: 'Part 1', label: 'Photographs', mastery: 75, color: 'bg-emerald-500' },
    { part: 'Part 2', label: 'Q & Response', mastery: 60, color: 'bg-emerald-600' },
    { part: 'Part 3', label: 'Conversations', mastery: 55, color: 'bg-amber-500' },
    { part: 'Part 4', label: 'Short Talks', mastery: 50, color: 'bg-amber-600' },
    { part: 'Part 5', label: 'Incomplete Sentences', mastery: 45, color: 'bg-rose-500' },
    { part: 'Part 6', label: 'Text Completion', mastery: 52, color: 'bg-amber-600' },
    { part: 'Part 7', label: 'Reading Comprehension', mastery: 40, color: 'bg-rose-600' },
  ];

  return (
    <div className="min-h-[85vh] mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 mb-2">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>PHÂN TÍCH KHẢO THÍ CHUYÊN SÂU · S-19 PROGRESS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Bản Đồ Nhiệt Kỹ Năng &amp; Xu Hướng Năng Lực
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Đo lường latent ability theo mô hình IRT 2 tham số và đường cong tiến bộ.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Heatmap Pod */}
        <div className="lg:col-span-7 bento-card p-6">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-indigo-400" />
            <span>Bản Đồ Nhiệt Năng Lực 7 Parts (Heatmap)</span>
          </h2>

          <div className="space-y-4">
            {skillsHeatmap.map((s) => (
              <div key={s.part} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">{s.part} · {s.label}</span>
                  <span className="text-slate-400">{s.mastery}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${s.color} transition-all duration-500`}
                    style={{ width: `${s.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>🔴 &lt; 50%: Cần tập trung</span>
            <span>🟡 50-70%: Đang phát triển</span>
            <span>🟢 &gt; 70%: Thành thạo</span>
          </div>
        </div>

        {/* Prediction & Forecast */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bento-card p-6 border-indigo-500/30">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Dự Báo Ngày Đạt Mục Tiêu</h3>
            <p className="text-3xl font-black text-white mt-2">Ngày 14 Tháng 10</p>
            <p className="text-xs text-slate-400 mt-1">Khoảng 24 ngày nữa ở cường độ 45 phút/ngày.</p>

            <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-slate-400">Điểm hiện tại</p>
                <p className="text-2xl font-black text-slate-200">550</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Điểm mục tiêu</p>
                <p className="text-2xl font-black text-emerald-400">750+</p>
              </div>
            </div>
          </div>

          <div className="bento-card p-6">
            <h3 className="text-sm font-bold text-white mb-2">Khuyến Nghị Từ Adaptive Engine</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bạn đang làm rất tốt ở Part 1 và Part 2. Tuy nhiên, Part 5 và Part 7 đang là rào cản lớn nhất. Hãy dành 60% thời lượng tuần này cho các bài tập vi mô tốc độ với Sparky và Lumink.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}