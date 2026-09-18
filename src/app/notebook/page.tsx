'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, CheckCircle, AlertTriangle, ArrowRight, RefreshCw, ChevronLeft } from 'lucide-react';
import { NotebookSkeleton } from '@/components/BentoSkeleton';
import { useToast } from '@/components/Toast';

export default function NotebookPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchDueItems();
  }, []);

  const fetchDueItems = () => {
    fetch('/api/v1/notebook/due')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setItems(json.data);
      })
      .finally(() => setLoading(false));
  };

  const handleReviewQuality = async (quality: number) => {
    if (!items[currentIndex]) return;
    setReviewing(true);

    try {
      const res = await fetch('/api/v1/notebook/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notebookId: items[currentIndex].id,
          quality,
          timeSpentMs: 4500,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setShowAnswer(false);
        if (currentIndex < items.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          // Finished session
          showToast('Tuyệt vời! Bạn đã hoàn thành toàn bộ thẻ ôn tập đến hạn hôm nay.', 'success');
          fetchDueItems();
          setCurrentIndex(0);
        }
      }
    } catch (e) {
      console.error(e);
      showToast('Lỗi khi lưu kết quả ôn tập', 'error');
    } finally {
      setReviewing(false);
    }
  };

  if (loading) {
    return <NotebookSkeleton />;
  }

  const currentItem = items[currentIndex] || null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 transition"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Về Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-bold text-rose-400 border border-rose-500/30">
            {items.length} thẻ đến hạn ôn
          </span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bento-card p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-white">Tuyệt vời! Không còn thẻ sai đến hạn</h2>
          <p className="mt-2 text-xs text-slate-400 max-w-md mx-auto">
            Não bộ của bạn đang ghi nhớ rất tốt. Hãy tiếp tục giải đề hoặc luyện các trạm bài học trên Bản đồ Saga.
          </p>
          <Link
            href="/saga-map"
            className="btn-chunky mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition"
          >
            <span>Sang Bản Đồ Saga</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Thẻ {currentIndex + 1} / {items.length}</span>
            <span>Hệ số dễ EF: {currentItem?.easinessFactor || 2.5}</span>
          </div>

          {/* Flashcard Body */}
          <div className="bento-card p-6 sm:p-8 space-y-6">
            <div>
              <span className="rounded-md bg-indigo-500/20 px-2.5 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/30">
                Part {currentItem.question.partNumber}
              </span>
              <h3 className="mt-4 text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                {currentItem.question.questionText}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {currentItem.question.options.map((opt: any) => (
                <div
                  key={opt.id}
                  className={`flex items-center gap-3 rounded-xl p-3.5 text-xs font-medium border ${
                    showAnswer && opt.isCorrect
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-bold ${
                    showAnswer && opt.isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {opt.label}
                  </span>
                  <span>{opt.text}</span>
                </div>
              ))}
            </div>

            {/* Explanation Drawer (when Show Answer is clicked) */}
            {showAnswer ? (
              <div className="rounded-xl bg-indigo-950/40 p-4 border border-indigo-500/30 space-y-3">
                <div>
                  <p className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Giải thích chi tiết:</span>
                  </p>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentItem.question.explanation}</p>
                </div>
                {currentItem.question.trapNote && (
                  <div className="pt-2 border-t border-indigo-500/20">
                    <p className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Cảnh báo Bẫy ETS:</span>
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">{currentItem.question.trapNote}</p>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full rounded-xl bg-slate-800 py-3 text-xs font-bold text-slate-200 hover:bg-slate-750 transition"
              >
                Hiện Đáp Án & Giải Thích Bẫy
              </button>
            )}

            {/* SM-2 Quality Buttons (1..5) */}
            {showAnswer && (
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <p className="text-center text-xs font-semibold text-slate-400">
                  Bạn nhớ kiến thức này như thế nào? (Thuật toán SM-2)
                </p>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleReviewQuality(1)}
                    disabled={reviewing}
                    className="rounded-xl bg-rose-500/20 border border-rose-500/40 p-3 text-center hover:bg-rose-500/30 transition"
                  >
                    <p className="text-xs font-bold text-rose-400">Quên hẳn</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Lặp lại 1 ngày</p>
                  </button>

                  <button
                    onClick={() => handleReviewQuality(3)}
                    disabled={reviewing}
                    className="rounded-xl bg-amber-500/20 border border-amber-500/40 p-3 text-center hover:bg-amber-500/30 transition"
                  >
                    <p className="text-xs font-bold text-amber-400">Khá khó</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Lặp lại 3 ngày</p>
                  </button>

                  <button
                    onClick={() => handleReviewQuality(4)}
                    disabled={reviewing}
                    className="rounded-xl bg-indigo-500/20 border border-indigo-500/40 p-3 text-center hover:bg-indigo-500/30 transition"
                  >
                    <p className="text-xs font-bold text-indigo-400">Nhớ tốt</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Lặp lại 6 ngày</p>
                  </button>

                  <button
                    onClick={() => handleReviewQuality(5)}
                    disabled={reviewing}
                    className="rounded-xl bg-emerald-500/20 border border-emerald-500/40 p-3 text-center hover:bg-emerald-500/30 transition"
                  >
                    <p className="text-xs font-bold text-emerald-400">Rất dễ</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Lặp lại 10 ngày</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
