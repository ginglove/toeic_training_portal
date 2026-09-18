'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnimeGuardian } from '@/components/AnimeGuardian';
import { Star, Trophy, Sparkles, ArrowRight, Compass, Flame } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function VictoryStagePage() {
  const searchParams = useSearchParams();
  const stars = Number(searchParams.get('stars')) || 3;
  const gems = Number(searchParams.get('gems')) || (stars * 5);
  const exp = Number(searchParams.get('exp')) || (stars * 50);
  const { showToast } = useToast();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('toeic:gamification-update'));
    showToast(`Chúc mừng! Bạn nhận được +${gems} Gems và +${exp} EXP!`, 'gem');
  }, [gems, exp, showToast]);

  return (
    <div className="min-h-[90vh] mx-auto max-w-4xl px-4 py-12 sm:px-6 flex flex-col items-center justify-center text-center">
      {/* Dynamic Star Header */}
      <div className="flex items-center gap-3 mb-4 animate-bounce">
        <Star className={`h-10 w-10 ${stars >= 1 ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
        <Star className={`h-14 w-14 -translate-y-2 ${stars >= 2 ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
        <Star className={`h-10 w-10 ${stars >= 3 ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
      </div>

      <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-4 py-1 text-xs font-bold text-emerald-400 mb-4">
        <Sparkles className="h-3.5 w-3.5" />
        <span>CHIẾN THẮNG ẢI HOÀN MỸ · {stars} SAO</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
        Vượt Trạm Thành Công!
      </h1>
      <p className="mt-2 text-sm text-slate-300 max-w-md">
        Bạn đã giải mã chính xác các bẫy ngữ pháp và nhận được phần thưởng kinh nghiệm!
      </p>

      {/* Rewards Grid */}
      <div className="my-8 grid grid-cols-3 gap-4 w-full max-w-md">
        <div className="bento-card p-4 text-center">
          <p className="text-2xl font-black text-amber-400">+{gems}</p>
          <p className="text-[11px] text-slate-400 font-semibold">Gems Tặng</p>
        </div>
        <div className="bento-card p-4 text-center">
          <p className="text-2xl font-black text-purple-400">+{exp}</p>
          <p className="text-[11px] text-slate-400 font-semibold">Kinh Nghiệm XP</p>
        </div>
        <div className="bento-card p-4 text-center">
          <p className="text-2xl font-black text-emerald-400">+5%</p>
          <p className="text-[11px] text-slate-400 font-semibold">Tiến Hóa Linh Thú</p>
        </div>
      </div>

      {/* Anime Guardian Celebration */}
      <div className="mb-8">
        <AnimeGuardian
          character="sparky"
          stage={2}
          state="victory"
          size="hero"
          customDialogue={
            stars === 3
              ? "'Tuyệt vời lắm bạn ơi! Trạm này bạn làm đúng 100%! Cùng tiến lên trạm tiếp theo nào!'"
              : "'Rất tốt! Bạn đã vượt qua ải thành công và củng cố vững chắc kiến thức!'"
          }
        />
      </div>

      {/* Navigation Action */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
        <Link
          href="/saga-map"
          className="btn-chunky w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 text-sm font-bold text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition"
        >
          <Compass className="h-4 w-4 text-emerald-400" />
          <span>Tiếp Tục Trên Bản Đồ Saga</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}