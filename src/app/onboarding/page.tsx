'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimeGuardian, GuardianCharacter, GUARDIAN_CONFIGS } from '@/components/AnimeGuardian';
import { Target, Clock, Sparkles, ArrowRight, Check, Shield } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [targetScore, setTargetScore] = useState(750);
  const [dailyMinutes, setDailyMinutes] = useState(45);
  const [selectedGuardian, setSelectedGuardian] = useState<GuardianCharacter>('sparky');
  const [loading, setLoading] = useState(false);

  const guardians: GuardianCharacter[] = ['sparky', 'echlet', 'lumink', 'streaklyn', 'verbil'];
  const scoreChips = [550, 650, 750, 850, 950];
  const minuteOptions = [15, 30, 45, 60];

  const handleSaveAndContinue = async () => {
    setLoading(true);
    try {
      // Save onboarding preference
      setTimeout(() => {
        router.push('/onboarding/micro-win');
      }, 400);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1 text-xs font-bold text-indigo-400 mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>BƯỚC THIẾT LẬP BAN ĐẦU · S-05 ONBOARDING</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Thiết Lập Mục Tiêu &amp; Chọn Thần Thức Đồng Hành
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Hệ thống sẽ cá nhân hóa ma trận bài tập IRT và lộ trình Saga 2.5D dựa trên mục tiêu của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Target & Time Commitment */}
        <div className="lg:col-span-6 space-y-6">
          {/* Target Score Card */}
          <div className="bento-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-indigo-400" />
                <span>Mục tiêu điểm số TOEIC</span>
              </h2>
              <span className="text-3xl font-black text-indigo-400">{targetScore}</span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="250"
              max="990"
              step="5"
              value={targetScore}
              onChange={(e) => setTargetScore(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg bg-slate-800 appearance-none cursor-pointer accent-indigo-500"
            />

            {/* Quick Chips */}
            <div className="mt-4 flex items-center justify-between gap-2">
              {scoreChips.map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setTargetScore(score)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    targetScore === score
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Commitment Card */}
          <div className="bento-card p-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-amber-400" />
              <span>Thời gian cam kết học mỗi ngày</span>
            </h2>

            <div className="grid grid-cols-4 gap-3">
              {minuteOptions.map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDailyMinutes(mins)}
                  className={`p-3 rounded-xl text-center border transition ${
                    dailyMinutes === mins
                      ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-md font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="text-lg font-black">{mins}</p>
                  <p className="text-[10px]">phút/ngày</p>
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-slate-400">
              * Khuyến nghị 45 phút/ngày cho lộ trình bứt phá 30 ngày chuẩn hóa.
            </p>
          </div>
        </div>

        {/* Right Column: 3D Anime Guardian Selection Carousel */}
        <div className="lg:col-span-6 bento-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <span>Chọn Thần Thức Đồng Hành Khởi Đầu</span>
              </h2>
              <span className="text-xs font-semibold text-slate-400">5 Thần Thức</span>
            </div>

            {/* Carousel Tabs */}
            <div className="flex justify-between gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 mb-6">
              {guardians.map((g) => {
                const isSelected = selectedGuardian === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGuardian(g)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg capitalize transition ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>

            {/* Selected Guardian Stage */}
            <div className="flex flex-col items-center py-4 bg-slate-950/50 rounded-2xl border border-slate-800/80 mb-6">
              <AnimeGuardian
                character={selectedGuardian}
                stage={1}
                state="idle"
                size="lg"
              />
              <div className="mt-4 text-center px-4">
                <h3 className="text-lg font-black text-white">
                  {GUARDIAN_CONFIGS[selectedGuardian].title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Pháp khí: <span className="text-slate-300 font-semibold">{GUARDIAN_CONFIGS[selectedGuardian].relic}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleSaveAndContinue}
            disabled={loading}
            className="btn-chunky w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 text-sm font-bold text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition"
          >
            <span>{loading ? 'Đang chuẩn bị...' : 'Lưu Mục Tiêu & Khởi Động Micro-Win'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}