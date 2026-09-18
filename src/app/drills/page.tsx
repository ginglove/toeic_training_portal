'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimeGuardian } from '@/components/AnimeGuardian';
import { Zap, CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, AlertTriangle } from 'lucide-react';

export default function MicroDrillPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [guardianState, setGuardianState] = useState<'idle' | 'focus' | 'victory' | 'comfort'>('idle');

  const question = {
    id: 'drill-501',
    part: 5,
    prompt: 'The newly appointed director plans to _____ the entire logistics network to reduce operational delivery delays.',
    options: [
      { label: 'A', text: 'restructure' },
      { label: 'B', text: 'restructuring' },
      { label: 'C', text: 'restructured' },
      { label: 'D', text: 'restructurement' },
    ],
    correct: 'A',
    explanation: 'Sau động từ "plans to" (infinitive with to) ta cần một động từ nguyên mẫu có quy tắc (bare infinitive) để chỉ mục đích hoặc kế hoạch.',
    trapNote: 'Bẫy danh từ "restructurement" không phải là từ vựng tiếng Anh chuẩn.'
  };

  const handleSelect = (label: string) => {
    if (isAnswered) return;
    setSelectedOption(label);
    setIsAnswered(true);
    if (label === question.correct) {
      setGuardianState('victory');
    } else {
      setGuardianState('comfort');
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setGuardianState('idle');
  };

  const isCorrect = selectedOption === question.correct;

  return (
    <div className="min-h-[85vh] mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-400">
            <Zap className="h-3.5 w-3.5 fill-amber-400" />
            <span>MICRO-DRILL TỐC ĐỘ · PART 5</span>
          </span>
          <span className="text-xs text-slate-400">Mục tiêu: &lt; 8 giây / câu</span>
        </div>
        <Link href="/dashboard" className="text-xs font-semibold text-slate-400 hover:text-white">
          Trở về Dashboard &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Question Pod */}
        <div className="md:col-span-8 space-y-6">
          <div className="bento-card p-6">
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {question.prompt}
            </p>

            <div className="mt-6 space-y-3">
              {question.options.map((opt) => {
                const isSelected = selectedOption === opt.label;
                const isThisCorrect = isAnswered && opt.label === question.correct;
                const isThisWrong = isAnswered && isSelected && !isCorrect;

                let cardStyle = 'bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-850';
                if (isThisCorrect) cardStyle = 'bg-emerald-600/30 border-emerald-500 text-white font-bold';
                else if (isThisWrong) cardStyle = 'bg-rose-600/30 border-rose-500 text-white';
                else if (isSelected) cardStyle = 'bg-indigo-600/30 border-indigo-400 text-white';

                return (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(opt.label)}
                    disabled={isAnswered}
                    className={`w-full min-h-[56px] p-4 rounded-xl border text-left flex items-center justify-between transition-all ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-white">
                        {opt.label}
                      </span>
                      <span className="text-sm">{opt.text}</span>
                    </div>

                    {isThisCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                    {isThisWrong && <XCircle className="h-5 w-5 text-rose-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instant Explanation Feedback */}
          {isAnswered && (
            <div className="bento-card p-6 border-indigo-500/30 bg-slate-900/90 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>ĐÁP ÁN CHÍNH XÁC (+15 XP)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4" />
                      <span>ĐÁP ÁN CHƯA ĐÚNG</span>
                    </>
                  )}
                </span>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer transition"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Thử lại
                </button>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed mb-3">
                <strong className="text-indigo-300">Giải thích:</strong> {question.explanation}
              </p>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                <div>
                  <strong>Cảnh báo bẫy ETS:</strong> {question.trapNote}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Dedicated Part Guardian */}
        <div className="md:col-span-4 bento-card p-6 flex flex-col items-center text-center">
          <AnimeGuardian
            character="sparky"
            stage={2}
            state={guardianState}
            size="md"
          />
          <h3 className="mt-4 text-base font-bold text-white flex items-center justify-center gap-1.5">
            <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span>Sparky Lôi Thần</span>
          </h3>
          <p className="text-xs text-amber-400 font-semibold mt-0.5">Chuyên gia Tốc độ Part 5</p>
          <p className="text-[11px] text-slate-400 mt-2">
            Phản xạ nhanh giúp bạn tiết kiệm ít nhất 15 phút cho bài đọc dài Part 7!
          </p>
        </div>
      </div>
    </div>
  );
}