'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimeGuardian } from '@/components/AnimeGuardian';
import { Clock, Flag, Volume2, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

interface DiagnosticQuestion {
  id: number;
  part: number;
  section: 'LISTENING' | 'READING';
  prompt: string;
  passage?: string;
  options: { label: string; text: string }[];
  correct: string;
  trapNote: string;
}

const SAMPLE_DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    part: 1,
    section: 'LISTENING',
    prompt: 'Look at the photograph marked No. 1. Listen and select the statement that best describes what you see in the photograph.',
    options: [
      { label: 'A', text: 'He is wearing protective eyewear.' },
      { label: 'B', text: 'He is repairing a machine.' },
      { label: 'C', text: 'He is cleaning the workshop floor.' },
      { label: 'D', text: 'He is lifting a heavy metal box.' },
    ],
    correct: 'A',
    trapNote: 'Bẫy âm tương tự giữa "writing" và "riding".'
  },
  {
    id: 2,
    part: 2,
    section: 'LISTENING',
    prompt: 'When is the quarterly budget review meeting scheduled?',
    options: [
      { label: 'A', text: 'In the main conference auditorium.' },
      { label: 'B', text: 'Yes, I prepared the financial sheets.' },
      { label: 'C', text: 'Next Thursday at two o\'clock.' },
    ],
    correct: 'C',
    trapNote: 'Bẫy câu hỏi WH- không trả lời bằng Yes/No.'
  },
  {
    id: 3,
    part: 5,
    section: 'READING',
    prompt: 'The management team decided to _____ the project deadline to ensure all quality requirements are met.',
    options: [
      { label: 'A', text: 'extend' },
      { label: 'B', text: 'extension' },
      { label: 'C', text: 'extensively' },
      { label: 'D', text: 'extended' },
    ],
    correct: 'A',
    trapNote: 'Sau cấu trúc "decide to" cần một động từ nguyên mẫu (bare infinitive).'
  },
  {
    id: 4,
    part: 7,
    section: 'READING',
    passage: 'MEMORANDUM\nTo: All Department Leads\nFrom: Operations Directorate\nDate: October 14\nSubject: Software Upgrade Schedule\n\nPlease note that the core inventory management system will undergo maintenance this Saturday between 10:00 PM and 4:00 AM. Access will be temporarily unavailable during this timeframe.',
    prompt: 'What is the primary purpose of this memorandum?',
    options: [
      { label: 'A', text: 'To recruit software developers' },
      { label: 'B', text: 'To announce scheduled system downtime' },
      { label: 'C', text: 'To request department budget approvals' },
      { label: 'D', text: 'To introduce a new operations manager' },
    ],
    correct: 'B',
    trapNote: 'Từ khóa "maintenance" và "temporarily unavailable" chỉ rõ bảo trì hệ thống.'
  }
];

export default function DiagnosticArenaPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60); // 25 min

  const q = SAMPLE_DIAGNOSTIC_QUESTIONS[currentIndex];
  const total = SAMPLE_DIAGNOSTIC_QUESTIONS.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelect = (label: string) => {
    setAnswers({ ...answers, [q.id]: label });
  };

  const toggleFlag = () => {
    setFlagged({ ...flagged, [q.id]: !flagged[q.id] });
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const formattedAnswers = SAMPLE_DIAGNOSTIC_QUESTIONS.map((item) => ({
        questionId: item.id,
        partNumber: item.part,
        selectedOption: answers[item.id] || '',
        isCorrect: answers[item.id] === item.correct,
      }));

      await fetch('/api/v1/diagnostic/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: formattedAnswers,
          durationSeconds: (25 * 60) - secondsRemaining,
        }),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
      router.push('/diagnostic/result');
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col">
      {/* Top Fixed HUD */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-4 py-3">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-indigo-500/20 text-indigo-400 px-3 py-1 text-xs font-bold border border-indigo-500/30">
              {q.section === 'LISTENING' ? '🎧 LISTENING' : '📖 READING'} · Part {q.part}
            </span>
            <span className="text-xs font-semibold text-slate-300">
              Câu {currentIndex + 1} / {total}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            <button
              onClick={toggleFlag}
              className={`p-2 rounded-xl border transition ${
                flagged[q.id]
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Đánh dấu xem lại"
            >
              <Flag className="h-4 w-4" />
            </button>

            <button
              onClick={handleSubmit}
              className="btn-chunky px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white"
            >
              Nộp Bài Sớm
            </button>
          </div>
        </div>
      </header>

      {/* Main Arena Content */}
      <div className="flex-1 mx-auto max-w-6xl w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column / Passage Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Audio Indicator for Listening */}
          {q.section === 'LISTENING' && (
            <div className="bento-card p-4 border-cyan-500/30 bg-cyan-950/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Volume2 className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Đang phát âm thanh chuẩn ETS</p>
                  <p className="text-[11px] text-cyan-300">Chuẩn phát âm North American · No-Seek Mode</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[40, 70, 30, 90, 60, 80, 45].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-cyan-400 rounded-full animate-pulse"
                    style={{ height: `${h}%`, minHeight: '12px' }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Passage Document for Part 7 Reading */}
          {q.passage && (
            <div className="bento-card p-6 border-slate-700 bg-slate-900/90 max-h-[320px] overflow-y-auto">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tài Liệu Đọc (Reading Passage)</h3>
              <pre className="font-sans text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                {q.passage}
              </pre>
            </div>
          )}

          {/* Question Prompt */}
          <div className="bento-card p-6">
            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {q.prompt}
            </p>

            {/* Answer Options Grid (56dp height touch targets) */}
            <div className="mt-6 space-y-3">
              {q.options.map((opt) => {
                const isSelected = answers[q.id] === opt.label;
                return (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(opt.label)}
                    className={`w-full min-h-[56px] p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-600/20'
                        : 'bg-slate-900/70 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-xs sm:text-sm font-medium">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentIndex((c) => Math.max(0, c - 1))}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-5 py-3 text-xs font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-40 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Câu Trước</span>
            </button>

            {currentIndex < total - 1 ? (
              <button
                onClick={() => setCurrentIndex((c) => Math.min(total - 1, c + 1))}
                className="btn-chunky inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition"
              >
                <span>Câu Tiếp Theo</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-chunky inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition"
              >
                <span>Hoàn Thành Bài Test</span>
                <CheckCircle2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Question Palette & Companion Anchor */}
        <div className="lg:col-span-4 space-y-6">
          {/* Question Palette */}
          <div className="bento-card p-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Danh Sách Câu Hỏi</h3>
            <div className="grid grid-cols-4 gap-2">
              {SAMPLE_DIAGNOSTIC_QUESTIONS.map((item, idx) => {
                const isAnswered = !!answers[item.id];
                const isCurrent = idx === currentIndex;
                const isFlag = !!flagged[item.id];

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-lg text-xs font-bold flex items-center justify-center relative transition ${
                      isCurrent
                        ? 'ring-2 ring-indigo-400 bg-indigo-600 text-white'
                        : isAnswered
                        ? 'bg-emerald-600/30 border border-emerald-500/50 text-emerald-300'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {isFlag && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guardian Anchor */}
          <div className="bento-card p-6 flex flex-col items-center text-center">
            <AnimeGuardian
              character={q.section === 'LISTENING' ? 'echlet' : 'lumink'}
              stage={1}
              state="focus"
              size="md"
            />
            <p className="mt-3 text-xs text-slate-400">
              {q.section === 'LISTENING'
                ? 'Echlet đang đồng bộ sóng âm thanh...'
                : 'Lumink đang khúc xạ ánh sao tìm manh mối...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}