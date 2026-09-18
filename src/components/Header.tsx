'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Flame, Gem, Heart, Shield, Zap, Sparkles, User, Award } from 'lucide-react';

export function Header() {
  const [dashboardData, setDashboardData] = useState<any>(null);

  const refreshUserStats = useCallback(() => {
    fetch('/api/v1/users/me/dashboard')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setDashboardData(json.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    refreshUserStats();

    const handleGamificationUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ gems?: number; energy?: number; streak?: number }>;
      if (customEvent.detail) {
        setDashboardData((prev: any) => {
          if (!prev) return prev;
          return {
            ...prev,
            gamification: {
              ...prev.gamification,
              ...(customEvent.detail.gems !== undefined && { gems: customEvent.detail.gems }),
              ...(customEvent.detail.energy !== undefined && { energy: customEvent.detail.energy }),
              ...(customEvent.detail.streak !== undefined && { currentStreak: customEvent.detail.streak }),
            },
          };
        });
      }
      refreshUserStats();
    };

    window.addEventListener('toeic:gamification-update', handleGamificationUpdate);
    return () => window.removeEventListener('toeic:gamification-update', handleGamificationUpdate);
  }, [refreshUserStats]);

  const gamification = dashboardData?.gamification || {
    gems: 280,
    energy: 5,
    currentStreak: 12,
    activeShieldCount: 1,
  };

  const user = dashboardData?.user || {
    name: 'Nguyễn Văn An',
    level: 5,
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
              <Sparkles className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-lg text-white">TOEIC<span className="text-indigo-400">PRO</span></span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">100% FREE</span>
            </div>
            <p className="text-[10px] font-medium text-slate-400 hidden sm:block">Luyện thi Thích ứng 30 Ngày</p>
          </div>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
          <Link href="/dashboard" className="hover:text-indigo-400 transition-colors">Tổng quan</Link>
          <Link href="/saga-map" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
            Bản đồ Saga
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </Link>
          <Link href="/exam/ETS-2024-TEST-01" className="hover:text-indigo-400 transition-colors">Phòng thi CBT</Link>
          <Link href="/notebook" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
            Sổ tay SM-2
            {dashboardData?.dueMistakesCount > 0 && (
              <span className="rounded-full bg-rose-500 px-1.5 py-0.2 text-[10px] font-bold text-white">
                {dashboardData.dueMistakesCount}
              </span>
            )}
          </Link>
          <Link href="/shop" className="hover:text-indigo-400 transition-colors">Cửa hàng Gems</Link>
        </nav>

        {/* Gamification HUD Meters */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Streak */}
          <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 border border-amber-500/20 text-xs font-bold text-amber-400" title="Chuỗi ngày học liên tục">
            <Flame className="h-4 w-4 fill-amber-500 text-amber-500 animate-bounce" />
            <span>{gamification.currentStreak} ngày</span>
          </div>

          {/* Energy */}
          <div className="flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1.5 border border-rose-500/20 text-xs font-bold text-rose-400" title="Năng lượng (Tối đa 5 tim)">
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            <span>{gamification.energy}/5</span>
          </div>

          {/* Gems */}
          <div className="flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1.5 border border-indigo-500/20 text-xs font-bold text-indigo-400" title="Đá quý Gems (Hoàn toàn miễn phí)">
            <Gem className="h-4 w-4 fill-indigo-400 text-indigo-400" />
            <span>{gamification.gems}</span>
          </div>

          {/* User Profile or Login CTA */}
          {dashboardData?.user ? (
            <Link href="/profile" className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800 hover:opacity-80 transition">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-xs font-bold text-white shadow">
                {user.level}
              </div>
              <div className="text-left text-xs">
                <p className="font-semibold text-slate-200 truncate max-w-[90px]">{user.name}</p>
                <p className="text-[10px] text-slate-400">Cấp {user.level}</p>
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-sm"
            >
              <User className="h-3.5 w-3.5" />
              <span>Đăng Nhập</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
