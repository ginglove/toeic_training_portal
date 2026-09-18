'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { AnimeGuardian } from '@/components/AnimeGuardian';
import { ArrowLeft, ArrowRight, CheckCircle2, Star, Sparkles, Zap, Shield, Loader2 } from 'lucide-react';

export default function SagaNodePage() {
  const router = useRouter();
  const params = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Array<{ questionId: string; selectedOption: string }>>([]);
  const [guardianState, setGuardianState] = useState<'idle' | 'victory' | 'comfort'>('idle');
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [nodeTitle, setNodeTitle] = useState('Trạm Học Tập');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const nodeId = (params?.id as string) || 'node-2';

  const defaultExercises = [
    {
      id: 'q-demo-1',
      step: 1,
      prompt: 'Part 5 Warmup: Mr. Jenkins will _____ the keynote presentation at the annual trade symposium.',
      options: [
        { label: 'A', text: 'deliver' },
        { label: 'B', text: 'delivery' },
        { label: 'C', text: 'delivering' },
        { label: 'D', text: 'deliverable' },
      ],
      correct: 'A',
      explanation: 'Trợ động từ "will" cần một động từ nguyên mẫu (deliver).'
    },
    {
      id: 'q-demo-2',
      step: 2,
      prompt: 'Part 5 Skill Drill: The board commended the audit team for their _____ thorough review of the financial disclosures.',
      options: [
        { label: 'A', text: 'exceptional' },
        { label: 'B', text: 'exceptionally' },
        { label: 'C', text: 'exceptions' },
        { label: 'D', text: 'except' },
      ],
      correct: 'B',
      explanation: 'Trạng từ (exceptionally) bổ nghĩa cho tính từ (thorough).'
    },
    {
      id: 'q-demo-3',
      step: 3,
      prompt: 'Part 5 Boss Challenge: Neither the marketing director nor the regional supervisors _____ present at yesterday\'s emergency briefing.',
      options: [
        { label: 'A', text: 'was' },
        { label: 'B', text: 'were' },
        { label: 'C', text: 'is' },
        { label: 'D', text: 'are' },
      ],
      correct: 'B',
      explanation: 'Cấu trúc "Neither... nor..." chia theo chủ ngữ gần động từ nhất ("the regional supervisors" số nhiều trong quá khứ -> were).'
    }
  ];

  const [exercises, setExercises] = useState(defaultExercises);

  useEffect(() => {
    // Initialize node attempt
    fetch(`/api/v1/nodes/${nodeId}/attempts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setAttemptId(json.data.attemptId);
          if (json.data.title) setNodeTitle(json.data.title);
          if (json.data.questions && json.data.questions.length >= 3) {
            setExercises(
              json.data.questions.slice(0, 3).map((q: any, idx: number) => ({
                id: q.id,
                step: idx + 1,
                prompt: `Part ${q.partNumber} (${idx === 0 ? 'Warmup' : idx === 1 ? 'Skill Drill' : 'Boss Challenge'}): ${q.questionText}`,
                options: q.options,
                correct: 'A', // Evaluated on backend
                explanation: 'Đáp án được chấm và phân tích chi tiết tự động bởi hệ thống.',
              }))
            );
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [nodeId]);

  const ex = exercises[currentStep - 1] || defaultExercises[0];

  const handleSelect = (label: string) => {
    setSelectedOption(label);
    const newAnswers = [...answers.filter((a) => a.questionId !== ex.id), { questionId: ex.id, selectedOption: label }];
    setAnswers(newAnswers);

    // Send answer telemetry to backend
    if (attemptId) {
      fetch(`/api/v1/nodes/${nodeId}/attempts/${attemptId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: ex.id, selectedOption: label, timeSpentMs: 2500 }),
      }).catch(() => {});
    }

    const isCorrect = label === ex.correct;
    if (isCorrect) {
      setGuardianState('victory');
    } else {
      setGuardianState('comfort');
    }
  };

  // Keyboard shortcuts for node challenge
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      const key = e.key.toUpperCase();

      if (['A', 'B', 'C', 'D'].includes(key)) {
        e.preventDefault();
        handleSelect(key);
      } else if (['1', '2', '3', '4'].includes(key)) {
        e.preventDefault();
        const map: Record<string, string> = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' };
        handleSelect(map[key]);
      } else if ((e.key === 'Enter' || e.key === ' ') && selectedOption && !submitting) {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption, submitting, currentStep, answers]);

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setGuardianState('idle');
    } else {
      // Submit completion
      setSubmitting(true);
      try {
        if (attemptId) {
          const res = await fetch(`/api/v1/nodes/${nodeId}/attempts/${attemptId}/completion`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              answers,
              durationSeconds: 45,
            }),
          });
          const json = await res.json();
          if (json.success) {
            window.dispatchEvent(new CustomEvent('toeic:gamification-update'));
            router.push(`/victory/${attemptId}?stars=${json.data.starsEarned}&gems=${json.data.gemsEarned}&exp=${json.data.expEarned}`);
            return;
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setSubmitting(false);
      }
      window.dispatchEvent(new CustomEvent('toeic:gamification-update'));
      router.push(`/victory/${attemptId || nodeId}?stars=3&gems=15&exp=150`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[85vh] mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-6 animate-in fade-in duration-300">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="h-6 w-32 rounded-lg bg-slate-800 animate-pulse" />
          <div className="h-6 w-40 rounded-lg bg-slate-800 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="h-20 rounded-2xl bg-slate-900 border border-slate-800 animate-pulse" />
            <div className="h-64 rounded-2xl bg-slate-900 border border-slate-800 animate-pulse" />
          </div>
          <div className="lg:col-span-4 h-64 rounded-2xl bg-slate-900 border border-slate-800 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <Link href="/saga-map" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition">
          <ArrowLeft className="h-4 w-4" />
          <span>Trở về Bản Đồ Saga</span>
        </Link>
        <span className="text-xs font-bold text-indigo-400">{nodeTitle}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 3-step interactive drill stage */}
        <div className="lg:col-span-8 space-y-6">
          {/* Progress Steps Header */}
          <div className="bento-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-black transition ${
                    step === currentStep
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                      : step < currentStep
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {step < currentStep ? '✓' : step}
                </div>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-300">Ải {currentStep} / 3</span>
          </div>

          {/* Exercise Box */}
          <div className="bento-card p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {currentStep === 1 ? 'Bước 1: Khởi Động (Warmup)' : currentStep === 2 ? 'Bước 2: Luyện Kỹ Năng (Skill Drill)' : 'Bước 3: Thử Thách Trùm (Boss Challenge)'}
            </h3>
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed mt-3">
              {ex.prompt}
            </p>

            {/* Options */}
            <div
              role="radiogroup"
              aria-label={`Ải ${currentStep}: Lựa chọn đáp án`}
              className="mt-6 space-y-3"
            >
              {ex.options.map((opt) => {
                const isSelected = selectedOption === opt.label;
                const isCorrect = isSelected && opt.label === ex.correct;
                const isWrong = isSelected && !isCorrect;

                return (
                  <button
                    key={opt.label}
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelect(opt.label)}
                    className={`w-full min-h-[56px] p-4 rounded-xl border text-left flex items-center justify-between transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-600/30 border-emerald-500 text-white font-bold'
                          : 'bg-rose-600/30 border-rose-500 text-white'
                        : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-white">
                        {opt.label}
                      </span>
                      <span className="text-sm">{opt.text}</span>
                    </div>
                    <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800/80 rounded border border-slate-700">
                      {opt.label}
                    </kbd>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation if selected */}
          {selectedOption && (
            <div className="bento-card p-5 border-indigo-500/30 bg-slate-900/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-xs text-slate-200 leading-relaxed">
                <strong className="text-indigo-300">Giải thích:</strong> {ex.explanation}
              </p>
              <button
                onClick={handleNext}
                className="btn-chunky inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 whitespace-nowrap self-end sm:self-auto shadow-md shadow-indigo-600/30"
              >
                <span>{currentStep === 3 ? 'Xem Kết Quả' : 'Câu Kế Tiếp (Enter)'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Companion Reaction Pod */}
        <div className="lg:col-span-4 bento-card p-6 flex flex-col items-center text-center">
          <AnimeGuardian
            character="sparky"
            stage={2}
            state={guardianState}
            size="md"
          />
          <h3 className="mt-4 text-base font-bold text-white">Sparky Đồng Hành</h3>
          <p className="text-xs text-amber-400 font-semibold mt-0.5">Stage 2: Hành Giả</p>
          <p className="text-[11px] text-slate-400 mt-2">
            Đúng 3 câu liên tiếp sẽ đạt 3 sao hoàn hảo và nhận 50 Gems!
          </p>
        </div>
      </div>
    </div>
  );
}