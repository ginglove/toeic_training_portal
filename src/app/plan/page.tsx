'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimeGuardian } from '@/components/AnimeGuardian';
import { Play, Pause, RotateCcw, CheckCircle2, Clock, Zap, BookCheck, Target, ArrowRight } from 'lucide-react';

export default function DailyPlanPage() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Ôn 5 từ vựng SM-2 đến hạn', tag: '35% Giãn cách', part: 'Part 5/6', completed: false, xp: 40, href: '/notebook' },
    { id: 2, title: 'Luyện 10 câu tốc độ bẫy Part 5', tag: '40% Kỹ năng yếu', part: 'Part 5', completed: false, xp: 60, href: '/drills' },
    { id: 3, title: 'Luyện nghe phản xạ gián tiếp Part 2', tag: '10% Củng cố', part: 'Part 2', completed: false, xp: 30, href: '/practice' },
    { id: 4, title: 'Vượt Trạm 2 trên Bản đồ Saga', tag: 'Nhiệm vụ chính', part: 'Saga Node', completed: false, xp: 100, href: '/saga-map' },
  ]);

  useEffect(() => {
    fetch('/api/v1/journeys/default/daily-plans?day=1')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.tasks?.length) {
          setTasks(json.data.tasks);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-[90vh] mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-400 mb-2">
            <Target className="h-3.5 w-3.5" />
            <span>KẾ HOẠCH HỌC TẬP THÍCH ỨNG · S-11 DAILY PLAN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Nhiệm Vụ Hôm Nay &amp; Vòng Tập Trung Pomodoro
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Đã hoàn thành {completedCount}/{tasks.length} nhiệm vụ · Tích lũy {completedCount * 50} XP
          </p>
        </div>

        <Link
          href="/saga-map"
          className="btn-chunky inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition"
        >
          <span>Mở Bản Đồ Saga</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 240dp Circular Pomodoro Focus Timer */}
        <div className="lg:col-span-5 bento-card p-6 flex flex-col items-center text-center">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Đồng Hồ Tập Trung 25 Phút
          </h2>

          <div className="relative w-60 h-60 rounded-full border-4 border-slate-800 flex items-center justify-center bg-slate-950/70 shadow-2xl my-2">
            {/* Progress ring indicator */}
            <div className="absolute inset-2 rounded-full border border-indigo-500/30" />
            <div className="text-center z-10">
              <span className="text-5xl font-black text-white font-mono tracking-tight">
                {formatTimer(secondsLeft)}
              </span>
              <p className="text-xs text-indigo-400 font-semibold mt-2 flex items-center justify-center gap-1">
                {isRunning ? (
                  <>
                    <span>Đang tập trung cao độ</span>
                    <Zap className="h-3 w-3 text-amber-400 fill-amber-400" />
                  </>
                ) : (
                  'Sẵn sàng bắt đầu'
                )}
              </p>
            </div>
          </div>

          {/* Pomodoro Action Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="btn-chunky px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
              <span>{isRunning ? 'Tạm Dừng' : 'Bắt Đầu Tập Trung'}</span>
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft(25 * 60);
              }}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
              title="Đặt lại 25 phút"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-500 mt-4">
            * Cứ sau 25 phút tập trung, nghỉ ngắn 5 phút để tái tạo năng lượng não bộ.
          </p>
        </div>

        {/* Right: Adaptive Tasks List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BookCheck className="h-5 w-5 text-indigo-400" />
              <span>Nhiệm Vụ Thích Ứng Hôm Nay</span>
            </h2>
            <span className="text-xs font-bold text-emerald-400">
              {Math.round((completedCount / tasks.length) * 100)}% Hoàn Tất
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${(completedCount / tasks.length) * 100}%` }}
            />
          </div>

          <div className="space-y-3 pt-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`bento-card p-4 flex items-center justify-between cursor-pointer border transition-all ${
                  task.completed
                    ? 'border-emerald-500/40 bg-emerald-950/20 opacity-80'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center border transition ${
                      task.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-600 bg-slate-950'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="h-4 w-4" />}
                  </div>

                  <div>
                    <h3
                      className={`text-sm font-bold ${
                        task.completed ? 'line-through text-slate-400' : 'text-white'
                      }`}
                    >
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {task.tag}
                      </span>
                      <span className="text-[10px] text-slate-400">{task.part}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-amber-400">+{task.xp} XP</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sparky Motivation Pod */}
          <div className="bento-card p-5 mt-6 border-amber-500/20 bg-gradient-to-r from-amber-950/20 via-slate-900/60 to-slate-900/60 flex items-center gap-4">
            <AnimeGuardian character="sparky" size="sm" showDialogue={false} />
            <div>
              <h4 className="text-xs font-bold text-amber-400">Sparky cổ vũ:</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                &quot;Hoàn thành đủ 4 nhiệm vụ hôm nay để bảo toàn chuỗi Streak và nạp đầy 5 năng lượng tim nhé!&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}