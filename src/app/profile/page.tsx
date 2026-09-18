'use client';

import React from 'react';
import { AnimeGuardian } from '@/components/AnimeGuardian';
import { Award, Shield, Flame, Gem, Star, Calendar, Mail, User, Rocket, Zap, BookOpen, Crown, Sparkles, CheckCircle2, Lock, GraduationCap } from 'lucide-react';

export default function ProfilePage() {
  const badges = [
    { code: 'FIRST_STEP', title: 'Khởi Đầu Vũ Trụ', desc: 'Hoàn thành bài test chẩn đoán đầu tiên', unlocked: true, icon: Rocket, color: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30' },
    { code: 'STREAK_7', title: 'Ngọn Lửa Tuần', desc: 'Bảo toàn chuỗi học liên tục 7 ngày', unlocked: true, icon: Flame, color: 'text-amber-400 bg-amber-500/15 border-amber-500/30' },
    { code: 'SPEED_MASTER', title: 'Thần Tốc Part 5', desc: 'Làm đúng 10 câu Part 5 dưới 8 giây', unlocked: true, icon: Zap, color: 'text-yellow-400 bg-yellow-500/15 border-yellow-500/30' },
    { code: 'VOCAB_50', title: 'Ký Ức Hoàng Gia', desc: 'Khắc sâu 50 thẻ từ vựng vào trí nhớ SM-2', unlocked: true, icon: BookOpen, color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' },
    { code: 'PERFECT_SCORE', title: 'Đỉnh Cao 990', desc: 'Đạt điểm tuyệt đối trong bài thi tốt nghiệp', unlocked: false, icon: Crown, color: 'text-purple-400 bg-purple-500/15 border-purple-500/30' },
    { code: 'EXIT_CHAMPION', title: 'Hóa Thần Stage 4', desc: 'Đưa linh thú hộ mệnh lên cấp Thần Linh', unlocked: false, icon: Sparkles, color: 'text-rose-400 bg-rose-500/15 border-rose-500/30' },
  ];

  return (
    <div className="min-h-[85vh] mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Header Profile Dossier */}
      <div className="bento-card p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-center gap-6">
        <AnimeGuardian character="sparky" stage={2} size="lg" showDialogue={false} />

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-2xl font-black text-white">Nguyễn Văn An</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 text-xs font-bold w-fit mx-auto sm:mx-0">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Học Viên Cấp 5</span>
            </span>
          </div>

          <p className="text-xs text-slate-400">Hòm thư: student@toeicpro.local · Tham gia từ tháng 9/2026</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs font-semibold">
            <span className="flex items-center gap-1 text-amber-400">
              <Flame className="h-4 w-4 fill-amber-400" /> 12 Ngày Streak
            </span>
            <span className="flex items-center gap-1 text-indigo-400">
              <Gem className="h-4 w-4 fill-indigo-400" /> 280 Gems
            </span>
            <span className="flex items-center gap-1 text-purple-400">
              <Star className="h-4 w-4 fill-purple-400" /> 1,450 XP
            </span>
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="bento-card p-6 sm:p-8">
        <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-400" />
          <span>Bộ Sưu Tập Huy Hiệu Chòm Sao (12 Trophies)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.code}
                className={`p-4 rounded-xl border flex items-center gap-4 transition ${
                  b.unlocked
                    ? 'bg-slate-900/80 border-slate-700/80 text-white'
                    : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
                }`}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${b.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">{b.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{b.desc}</p>
                  <span className={`text-[10px] font-bold mt-1 inline-flex items-center gap-1 ${b.unlocked ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {b.unlocked ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Đã Mở Khóa</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-3 w-3" />
                        <span>Chưa Mở Khóa</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}