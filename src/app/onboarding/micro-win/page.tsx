'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimeGuardian } from '@/components/AnimeGuardian';
import { Sparkles, CheckCircle2, ArrowRight, Zap, Trophy, Flame } from 'lucide-react';

export default function MicroWinPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = {
    text: "The marketing director announced that the quarterly report will be distributed ______ Monday morning.",
    options: [
      { id: 'A', text: 'on', isCorrect: true },
      { id: 'B', text: 'at', isCorrect: false },
      { id: 'C', text: 'in', isCorrect: false },
      { id: 'D', text: 'to', isCorrect: false },
    ],
    explanation: "Chính xác tuyệt đối! Giới từ 'on' luôn đi kèm với các thứ trong tuần hoặc buổi cụ thể trong ngày (on Monday morning).",
    trapNote: "Bẫy thường gặp: Nhầm 'morning' đi với 'in' (in the morning) mà quên mất quy tắc ưu tiên thứ trong tuần ('on Monday')."
  };

  const handleSelect = (id: string) => {
    if (submitted) return;
    setSelectedOption(id);
    setSubmitted(true);
    const correct = id === 'A';
    setIsCorrect(correct);
  };

  const handleProceed = () => {
    router.push('/diagnostic');
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-8">
      {/* Header Badge */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 text-xs font-bold text-emerald-400 mb-3 animate-pulse">
          <Zap className="h-3.5 w-3.5 text-amber-400" />
          <span>S-24 · MICRO-WIN KHỞI ĐỘNG TẬP TRUNG</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Thử Thách Khởi Động Đầu Tiên
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Chinh phục 1 câu hỏi Part 5 cơ bản để đánh thức năng lượng Thần Thức và nhận +10 XP khởi đầu!
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Guardian Column */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center bento-card p-6 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <AnimeGuardian
            character="sparky"
            stage={submitted && isCorrect ? 2 : 1}
            state={submitted ? (isCorrect ? 'victory' : 'comfort') : 'focus'}
            size="lg"
            showDialogue={true}
            customDialogue={
              submitted
                ? isCorrect
                  ? '⚡ Tuyệt vời! Bạn có phản xạ ngữ pháp rất sắc bén! +10 XP đã được cộng!'
                  : 'Đừng lo! Nhìn kĩ quy tắc "on Monday" nhé, sẵn sàng bước vào chẩn đoán nào!'
                : 'Tập trung nào bạn ơi! Hãy chọn phương án chính xác nhất!'
            }
          />

          {submitted && isCorrect && (
            <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black animate-bounce">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span>+10 XP Thần Thức Đã Mở Khóa!</span>
            </div>
          )}
        </div>

        {/* Question & Interactive Card */}
        <div className="lg:col-span-8 bento-card p-6 sm:p-8 relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-400">
              Part 5: Incomplete Sentences
            </span>
            <span className="text-xs font-semibold text-slate-400">Thời gian tiêu chuẩn: 15s</span>
          </div>

          <p className="text-lg sm:text-xl font-medium text-white mb-6 leading-relaxed">
            {question.text}
          </p>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {question.options.map((opt) => {
              const isPicked = selectedOption === opt.id;
              let btnClass = 'border-slate-800 bg-slate-900/60 text-slate-200 hover:border-indigo-500/50 hover:bg-slate-900';
              
              if (submitted) {
                if (opt.isCorrect) {
                  btnClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold ring-2 ring-emerald-500/30';
                } else if (isPicked && !opt.isCorrect) {
                  btnClass = 'border-rose-500 bg-rose-950/40 text-rose-200 font-bold';
                } else {
                  btnClass = 'border-slate-800/40 bg-slate-950/40 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect(opt.id)}
                  disabled={submitted}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left transition ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800/80 text-xs font-bold text-slate-300">
                      {opt.id}
                    </span>
                    <span className="text-base font-semibold">{opt.text}</span>
                  </div>
                  {submitted && opt.isCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Result Banner & Explanation */}
          {submitted && (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' : 'bg-amber-500/10 border-amber-500/30 text-amber-200'}`}>
                <p className="text-xs font-bold uppercase tracking-wider mb-1">
                  {isCorrect ? '🎯 Giải thích chi tiết:' : '💡 Ghi nhớ bẫy ETS:'}
                </p>
                <p className="text-sm font-medium leading-relaxed">{question.explanation}</p>
                <p className="text-xs text-slate-400 mt-2 italic">{question.trapNote}</p>
              </div>

              {/* Candy Juice CTA Button */}
              <button
                type="button"
                onClick={handleProceed}
                className="btn-candy w-full py-4 text-white text-base font-black flex items-center justify-center gap-3 shadow-2xl transition"
              >
                <span>Sẵn Sàng Làm Bài Test Chẩn Đoán IRT (S-06)</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}

          {!submitted && (
            <p className="text-center text-xs text-slate-400">
              👆 Nhấp vào đáp án bạn cho là đúng nhất để kiểm tra phản xạ tức thì.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
