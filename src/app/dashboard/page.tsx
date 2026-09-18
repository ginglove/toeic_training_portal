'use client';

import { AnimeGuardian } from '@/components/AnimeGuardian';
import { DashboardSkeleton } from '@/components/BentoSkeleton';
import { useToast } from '@/components/Toast';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Target, TrendingUp, Sparkles, MapPin, Award, CheckCircle2, ChevronRight, Play, BookOpen, Heart, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refilling, setRefilling] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = () => {
    fetch('/api/v1/users/me/dashboard')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.data);
      })
      .finally(() => setLoading(false));
  };

  const handleRefillPractice = async () => {
    setRefilling(true);
    try {
      const res = await fetch('/api/v1/users/me/energy/refills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: 'PRACTICE_RECHARGE' }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.data.message || 'Đã nạp 1 Năng lượng thành công!', 'success');
        window.dispatchEvent(new CustomEvent('toeic:gamification-update', {
          detail: { energy: json.data.currentEnergy }
        }));
        fetchDashboard();
      } else {
        showToast(json.detail || 'Không thể nạp tim lúc này', 'error');
      }
    } catch (e) {
      console.error(e);
      showToast('Lỗi kết nối máy chủ', 'error');
    } finally {
      setRefilling(false);
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  const journey = data?.journey || {
    targetScore: 800,
    currentScore: 550,
    predictedScore: 620,
    currentDay: 1,
    durationDays: 16,
    guardian: { name: 'Sparky', stage: 1, evolutionProgress: 35 },
  };

  const currentNode = journey?.currentNode || {
    id: 'node-2',
    title: 'Thung Lũng Bình Minh - Trạm 2',
    targetPart: 1,
    questionCount: 10,
  };

  const dailyQuests = data?.dailyQuests || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Chào mừng trở lại, <span className="text-indigo-400">{data?.user?.name || 'Học viên'}</span>! 👋
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Hôm nay là Ngày {journey.currentDay} trong lộ trình {journey.durationDays} ngày chinh phục TOEIC {journey.targetScore}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefillPractice}
            disabled={refilling || data?.gamification?.energy >= 5}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-750 disabled:opacity-50 transition"
          >
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
            <span>{refilling ? 'Đang nạp...' : 'Luyện tập nạp tim (+1)'}</span>
          </button>

          <Link
            href="/saga-map"
            className="btn-chunky inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition"
          >
            <Play className="h-4 w-4 fill-white" />
            <span>Tiếp tục học</span>
          </Link>
        </div>
      </div>

      {/* Bento Grid 2.0 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Score Progress & Target */}
        <div className="bento-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mục Tiêu Điểm Số</span>
              <Target className="h-5 w-5 text-indigo-400" />
            </div>

            <div className="mt-6 flex items-baseline gap-4">
              <div>
                <p className="text-4xl font-black text-white">{journey.currentScore}</p>
                <p className="text-xs text-slate-400 mt-0.5">Điểm đầu vào</p>
              </div>
              <span className="text-slate-600 font-light text-2xl">→</span>
              <div>
                <p className="text-4xl font-black text-emerald-400">{journey.targetScore}</p>
                <p className="text-xs text-slate-400 mt-0.5">Mục tiêu 30 ngày</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs font-semibold mb-1 text-slate-300">
                <span>Dự báo năng lực hiện tại</span>
                <span className="text-indigo-400">{journey.predictedScore} pts</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${Math.min(100, ((journey.predictedScore - 200) / (journey.targetScore - 200)) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Thời lượng cam kết: 45 phút/ngày</span>
            <span className="text-emerald-400 font-bold">100% Free</span>
          </div>
        </div>

        {/* Card 2: Guardian Lexling Evolution */}
        <div className="bento-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Linh Thú Đồng Hành</span>
              <Sparkles className="h-5 w-5 text-amber-400" />
            </div>

            <div className="mt-4 flex items-center gap-4">
              <AnimeGuardian
                character={(journey.guardian?.name?.toLowerCase() || 'sparky') as any}
                stage={(journey.guardian?.stage || 1) as any}
                state="idle"
                size="sm"
                showDialogue={false}
              />
              <div>
                <h3 className="text-lg font-bold text-white">{journey.guardian?.name || 'Sparky'}</h3>
                <p className="text-xs text-amber-400 font-semibold">Stage {journey.guardian?.stage || 1} · Thần Thức Đồng Hành</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Tiến hóa khi hoàn thành 25% Bản đồ</p>
              </div>
            </div>

            {/* Evolution Bar */}
            <div className="mt-5">
              <div className="flex justify-between text-xs font-semibold mb-1 text-slate-300">
                <span>Tiến trình tiến hóa</span>
                <span className="text-amber-400">{journey.guardian?.evolutionProgress || 35}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                  style={{ width: `${journey.guardian?.evolutionProgress || 35}%` }}
                />
              </div>
            </div>
          </div>

          <Link
            href="/saga-map"
            className="mt-6 flex items-center justify-between rounded-xl bg-slate-800/80 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-750 transition"
          >
            <span>Xem linh thú trên Saga Map</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </Link>
        </div>

        {/* Card 3: Active Saga Node Quick Launcher */}
        <div className="bento-card p-6 flex flex-col justify-between border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-900/60">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Trạm Học Tập Kế Tiếp</span>
              <MapPin className="h-5 w-5 text-indigo-400 animate-bounce" />
            </div>

            <h3 className="mt-4 text-xl font-extrabold text-white leading-snug">
              {currentNode.title}
            </h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-md bg-indigo-500/20 px-2.5 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                Part {currentNode.targetPart}
              </span>
              <span className="text-xs text-slate-400">
                {currentNode.questionCount} câu hỏi thích ứng
              </span>
            </div>
          </div>

          <Link
            href="/saga-map"
            className="btn-chunky mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition"
          >
            <Play className="h-4 w-4 fill-white" />
            <span>Bắt Đầu Làm Bài Trạm Này</span>
          </Link>
        </div>
      </div>

      {/* Row 2: Daily Quests & Spaced Repetition Due Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Quests List */}
        <div className="bento-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-400" />
              <span>Nhiệm Vụ Hàng Ngày (Nhận Gems Miễn Phí)</span>
            </h2>
            <span className="text-xs font-semibold text-slate-400">Làm mới 00:00 UTC</span>
          </div>

          <div className="space-y-3">
            {dailyQuests.map((q: any) => (
              <div key={q.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-800">
                <div>
                  <p className="text-xs font-bold text-slate-200">{q.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{q.description}</p>
                  <div className="mt-2 flex items-center gap-2 text-[10px] font-semibold text-indigo-400">
                    <span>Tiến độ: {q.currentCount}/{q.targetCount}</span>
                    <span>·</span>
                    <span className="text-emerald-400">+{q.rewardGems} Gems</span>
                    <span>·</span>
                    <span className="text-amber-400">+{q.rewardExp} EXP</span>
                  </div>
                </div>

                <div>
                  {q.isClaimed ? (
                    <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-500">
                      Đã nhận
                    </span>
                  ) : q.isCompleted ? (
                    <button
                      onClick={async () => {
                        try {
                          const res = await fetch(`/api/v1/quests/${q.id}/claims`, { method: 'POST' });
                          const json = await res.json();
                          if (json.success) {
                            showToast(json.data.message || 'Nhận thưởng nhiệm vụ thành công!', 'gem');
                            window.dispatchEvent(new CustomEvent('toeic:gamification-update', {
                              detail: { gems: json.data.totalGems }
                            }));
                            fetchDashboard();
                          } else {
                            showToast(json.detail || 'Không thể nhận thưởng', 'error');
                          }
                        } catch (e) {
                          showToast('Lỗi kết nối máy chủ', 'error');
                        }
                      }}
                      className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 shadow transition"
                    >
                      Nhận thưởng
                    </button>
                  ) : (
                    <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-400">
                      Chưa xong
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spaced Repetition Due Cards Alert */}
        <div className="bento-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-rose-400" />
                <span>Sổ Tay Lỗi Sai (SuperMemo-2)</span>
              </h2>
              <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-xs font-bold text-rose-400 border border-rose-500/30">
                {data?.dueMistakesCount || 0} thẻ đến hạn
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Các câu hỏi bạn từng làm sai đã được thuật toán SM-2 tính toán chu kỳ lặp lại tối ưu. Hãy ôn tập ngay để tránh hiện tượng quên lãng theo đường cong Ebbinghaus.
            </p>

            <div className="mt-4 rounded-xl bg-slate-900/80 p-4 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-2">
                <span>Dung lượng ôn tập hôm nay:</span>
                <span className="text-rose-400 font-bold">{data?.dueMistakesCount || 0} thẻ</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Ôn tập thẻ sai không tốn Năng lượng và giúp củng cố kiến thức vững chắc 100%.
              </p>
            </div>
          </div>

          <Link
            href="/notebook"
            className="btn-chunky mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 py-3 text-xs font-bold text-white hover:bg-rose-500 shadow transition"
          >
            <BookOpen className="h-4 w-4" />
            <span>Mở Thẻ Ôn Tập SM-2 Ngay</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
