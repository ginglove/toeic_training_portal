'use client';

import React, { useState } from 'react';
import { AnimeGuardian } from '@/components/AnimeGuardian';
import { Trophy, Flame, Crown, Medal, Award, Users, Shield, Snowflake, Target, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function ColosseumPage() {
  const { showToast } = useToast();
  const [personalBestMode, setPersonalBestMode] = useState(false);
  const [shieldCount, setShieldCount] = useState(1);
  const [freezeLoading, setFreezeLoading] = useState(false);

  const handleActivateStreakFreeze = async () => {
    setFreezeLoading(true);
    try {
      const res = await fetch('/api/v1/users/me/streak/freeze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        setShieldCount(data.data.activeShieldCount);
        showToast(data.data.message || 'Kích hoạt Streak Freeze thành công!', 'success');
      } else {
        showToast(data.detail || 'Không thể kích hoạt Streak Freeze', 'error');
      }
    } catch (e) {
      showToast('Lỗi mạng khi kết nối máy chủ', 'error');
    } finally {
      setFreezeLoading(false);
    }
  };

  const defaultLeaderboards = [
    { rank: 1, name: 'Vũ Minh Tuấn', score: 940, streak: 30, xp: 4850, guardian: 'streaklyn', isMe: false },
    { rank: 2, name: 'Trần Thị Mai', score: 910, streak: 26, xp: 4200, guardian: 'lumink', isMe: false },
    { rank: 3, name: 'Lê Hoàng Long', score: 885, streak: 21, xp: 3950, guardian: 'sparky', isMe: false },
    { rank: 4, name: 'Nguyễn Văn An (Bạn)', score: 550, streak: 12, xp: 1450, guardian: 'sparky', isMe: true },
    { rank: 5, name: 'Phạm Quỳnh Anh', score: 520, streak: 9, xp: 1200, guardian: 'echlet', isMe: false },
  ];

  const [leaderboards, setLeaderboards] = useState(defaultLeaderboards);

  React.useEffect(() => {
    fetch('/api/v1/colosseum/leaderboards')
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data?.leaderboard?.length) {
          setLeaderboards(
            json.data.leaderboard.map((item: any) => ({
              rank: item.rank,
              name: item.name + (item.isCurrentUser ? ' (Bạn)' : ''),
              score: 500 + Math.min(490, Math.floor(item.exp / 10)),
              streak: item.streakDays,
              xp: item.exp,
              guardian: 'sparky',
              isMe: item.isCurrentUser,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-[85vh] mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-400 mb-3">
          <Trophy className="h-3.5 w-3.5" />
          <span>ĐẤU TRƯỜNG COLOSSEUM · S-20 BẢNG XẾP HẠNG &amp; THỂ THỰC CÁ NHÂN</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {personalBestMode ? 'Chế Độ Kỷ Lục Cá Nhân (Personal Best)' : 'Bảng Vàng Đấu Trường Tuần Này'}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          {personalBestMode
            ? 'Tập trung bứt phá giới hạn bản thân, loại bỏ áp lực so sánh xã hội.'
            : 'Thi đua điểm kinh nghiệm XP & chuỗi ngày học bền bỉ giữa các học viên toàn quốc.'}
        </p>
      </div>

      {/* Control Bar: Streak Freeze & Personal Best Mode */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
        {/* Streak Freeze Card */}
        <div className="md:col-span-7 bento-card p-5 flex items-center justify-between gap-4 border-cyan-500/30 bg-cyan-950/20">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
              <Snowflake className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-cyan-300 uppercase tracking-wide">Streak Freeze (Lá Chắn Đóng Băng)</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">
                  {shieldCount > 0 ? `${shieldCount} lá chắn sẵn sàng` : 'Chưa có lá chắn'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Bảo vệ chuỗi 12 ngày của bạn khỏi mất sạch khi bận việc đột xuất.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleActivateStreakFreeze}
            disabled={freezeLoading || shieldCount > 0}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition ${
              shieldCount > 0
                ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 cursor-default'
                : 'btn-candy text-white shadow-md hover:scale-105'
            }`}
          >
            {shieldCount > 0 ? 'Đã Bảo Vệ' : freezeLoading ? 'Đang kích hoạt...' : 'Kích Hoạt (30 Gems)'}
          </button>
        </div>

        {/* Personal Best Toggle Switch */}
        <div className="md:col-span-5 bento-card p-5 flex items-center justify-between border-slate-800 bg-slate-900/60">
          <div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-indigo-400" />
              <span className="text-xs font-bold text-white">Chế Độ Kỷ Lục Bản Thân</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Ẩn BXH đại trà, tập trung thi đấu với chính mình
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPersonalBestMode(!personalBestMode)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
              personalBestMode ? 'bg-indigo-600' : 'bg-slate-800'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                personalBestMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {personalBestMode ? (
        /* Personal Best Dashboard (Anti-Comparison Mode) */
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bento-card p-5 border-indigo-500/30 bg-indigo-950/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-400">Điểm Ước Tính Kỷ Lục</span>
                <Trophy className="h-4 w-4 text-indigo-400" />
              </div>
              <p className="text-3xl font-black text-white">550 <span className="text-xs font-medium text-slate-400">/ 990</span></p>
              <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-semibold">
                <TrendingUp className="h-3 w-3" /> +45 điểm so với bài test đầu tiên
              </p>
            </div>

            <div className="bento-card p-5 border-amber-500/30 bg-amber-950/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400">Chuỗi Ngày Dài Nhất</span>
                <Flame className="h-4 w-4 text-amber-400 fill-amber-400" />
              </div>
              <p className="text-3xl font-black text-white">12 <span className="text-xs font-medium text-slate-400">ngày</span></p>
              <p className="text-[11px] text-amber-400 mt-2 font-semibold">
                Đang duy trì kỷ lục cá nhân cao nhất!
              </p>
            </div>

            <div className="bento-card p-5 border-emerald-500/30 bg-emerald-950/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-400">Tốc Độ Part 5 Kỷ Lục</span>
                <Sparkles className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="text-3xl font-black text-white">8.2 <span className="text-xs font-medium text-slate-400">giây/câu</span></p>
              <p className="text-[11px] text-emerald-400 mt-2 font-semibold">
                Nhanh hơn 1.4s so với tuần trước
              </p>
            </div>

            <div className="bento-card p-5 border-purple-500/30 bg-purple-950/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-400">Độ Chính Xác Trung Bình</span>
                <CheckCircle2 className="h-4 w-4 text-purple-400" />
              </div>
              <p className="text-3xl font-black text-white">78%</p>
              <p className="text-[11px] text-purple-300 mt-2 font-semibold">
                Tăng +12% độ chính xác ngữ pháp
              </p>
            </div>
          </div>

          {/* Guardian Encouragement for Personal Growth */}
          <div className="bento-card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border-indigo-500/30">
            <AnimeGuardian
              character="sparky"
              stage={2}
              state="victory"
              size="md"
              showDialogue={false}
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-2">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                <span>TRIẾT LÝ HỌC TẬP VÀNG: CHIẾN THẮNG CHÍNH MÌNH</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Bạn đang tiến bộ từng ngày mà không cần áp lực so sánh với người khác!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                Nghiên cứu giáo dục chỉ ra rằng học viên tập trung vào Kỷ Lục Bản Thân (Personal Best) có tỷ lệ kiên trì suốt 30 ngày cao gấp 2.4 lần so với việc theo dõi bảng xếp hạng đại trà. Hãy tiếp tục giữ vững nhịp độ này!
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 items-end">
            {/* Rank 2 */}
            <div className="bento-card p-6 text-center border-slate-400/30 flex flex-col items-center order-2 sm:order-1">
              <Medal className="h-8 w-8 text-slate-300 mb-2" />
              <AnimeGuardian character="lumink" size="sm" showDialogue={false} />
              <h3 className="mt-2 text-sm font-bold text-white">Trần Thị Mai</h3>
              <p className="text-xs text-indigo-400 font-semibold">910 pts · 4,200 XP</p>
              <span className="mt-2 text-[10px] font-bold text-slate-400">Hạng 2 Tuần</span>
            </div>

            {/* Rank 1 */}
            <div className="bento-card p-8 text-center border-amber-400/50 bg-gradient-to-b from-amber-950/20 to-slate-900 flex flex-col items-center order-1 sm:order-2 scale-105 shadow-xl shadow-amber-500/10">
              <Crown className="h-10 w-10 text-amber-400 mb-2 animate-bounce" />
              <AnimeGuardian character="streaklyn" stage={3} size="md" showDialogue={false} />
              <h3 className="mt-3 text-base font-black text-white">Vũ Minh Tuấn</h3>
              <p className="text-xs text-amber-400 font-bold">940 pts · 4,850 XP</p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 text-amber-400 px-3 py-0.5 text-[11px] font-bold">
                <Trophy className="h-3 w-3 inline" /> Quán Quân Đấu Trường
              </span>
            </div>

            {/* Rank 3 */}
            <div className="bento-card p-6 text-center border-amber-600/30 flex flex-col items-center order-3 sm:order-3">
              <Medal className="h-8 w-8 text-amber-600 mb-2" />
              <AnimeGuardian character="sparky" size="sm" showDialogue={false} />
              <h3 className="mt-2 text-sm font-bold text-white">Lê Hoàng Long</h3>
              <p className="text-xs text-indigo-400 font-semibold">885 pts · 3,950 XP</p>
              <span className="mt-2 text-[10px] font-bold text-amber-600">Hạng 3 Tuần</span>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bento-card p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Users className="h-4 w-4" /> Bảng Xếp Hạng Chi Tiết
            </h3>

            <div className="space-y-2">
              {leaderboards.map((item) => (
                <div
                  key={item.rank}
                  className={`p-4 rounded-xl flex items-center justify-between border transition ${
                    item.isMe
                      ? 'bg-indigo-950/50 border-indigo-500/50 shadow-md'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-6 text-center font-black text-sm ${item.rank <= 3 ? 'text-amber-400' : 'text-slate-400'}`}>
                      #{item.rank}
                    </span>
                    <div>
                      <p className={`text-sm font-bold ${item.isMe ? 'text-indigo-400' : 'text-white'}`}>
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400">Dự đoán: {item.score} pts</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                      <Flame className="h-4 w-4 fill-amber-400" />
                      <span>{item.streak} ngày</span>
                    </div>
                    <span className="text-xs font-black text-white">{item.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}