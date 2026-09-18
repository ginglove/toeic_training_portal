'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Timer, Flag, Volume2, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Check, Loader2, X, HelpCircle, BookOpen, Maximize2, Minimize2 } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function ExamRoomPage({ params }: { params: { id: string } }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isPaperMode, setIsPaperMode] = useState(false);
  const [fontSize, setFontSize] = useState<number>(16); // 14, 16, 18, 20
  const [zenMode, setZenMode] = useState(false);
  const { showToast } = useToast();

  const questions = session?.questions || [];
  const currentQuestion = questions[currentIndex] || null;

  useEffect(() => {
    // Restore locally buffered answers and preferences if available
    if (typeof window !== 'undefined') {
      try {
        const cachedAnswers = localStorage.getItem(`toeic_exam_${params.id}_answers`);
        if (cachedAnswers) setAnswers(JSON.parse(cachedAnswers));
        const cachedFlags = localStorage.getItem(`toeic_exam_${params.id}_flags`);
        if (cachedFlags) setFlagged(JSON.parse(cachedFlags));
        if (localStorage.getItem('toeic_zen_mode') === 'true') {
          setZenMode(true);
        }
      } catch (e) {
        console.warn('Cannot read local exam cache', e);
      }
    }

    // Start exam session
    fetch('/api/v1/exams/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ examId: params.id, mode: 'PRACTICE_PART' }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setSession(json.data);
          setTimeLeft((json.data.timeLimitMinutes || 25) * 60);
        }
      })
      .catch((err) => {
        console.error(err);
        showToast('Không thể kết nối đến máy chủ bài thi', 'error');
      })
      .finally(() => setLoading(false));
  }, [params.id, showToast]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || result) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, result]);

  // Periodic CBT Session Heartbeat Telemetry (every 30s)
  useEffect(() => {
    if (!session?.sessionId || result || timeLeft <= 0) return;
    const heartbeatInterval = setInterval(() => {
      fetch(`/api/v1/exams/sessions/${session.sessionId}/heartbeats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientTimeRemainingSec: timeLeft }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success && typeof json.data.serverTimeRemainingSec === 'number') {
            // Re-sync timer if drift is greater than 10 seconds
            if (Math.abs(timeLeft - json.data.serverTimeRemainingSec) > 10) {
              setTimeLeft(json.data.serverTimeRemainingSec);
            }
          }
        })
        .catch(() => {});
    }, 30000);
    return () => clearInterval(heartbeatInterval);
  }, [session?.sessionId, timeLeft, result]);

  // CBT Keyboard shortcuts navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'Escape' && showConfirmModal) {
        e.preventDefault();
        setShowConfirmModal(false);
        return;
      }

      if (showConfirmModal) return;

      const key = e.key.toUpperCase();
      if (!currentQuestion) return;

      if (['A', 'B', 'C', 'D'].includes(key)) {
        e.preventDefault();
        handleSelectOption(currentQuestion.id, key);
      } else if (['1', '2', '3', '4'].includes(key)) {
        e.preventDefault();
        const optionMap: Record<string, string> = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' };
        handleSelectOption(currentQuestion.id, optionMap[key]);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
      } else if (key === 'F') {
        e.preventDefault();
        handleToggleFlag(currentQuestion.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, questions.length, showConfirmModal]);

  const handleSelectOption = async (questionId: string, optionLabel: string) => {
    const updatedAnswers = { ...answers, [questionId]: optionLabel };
    setAnswers(updatedAnswers);

    // Save to local cache immediately
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`toeic_exam_${params.id}_answers`, JSON.stringify(updatedAnswers));
      } catch (e) {}
    }

    // Autosave answer to server
    if (session?.sessionId) {
      setIsSyncing(true);
      try {
        await fetch(`/api/v1/exams/sessions/${session.sessionId}/answers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionId,
            selectedOption: optionLabel,
            isFlagged: !!flagged[questionId],
          }),
        });
      } catch (e) {
        console.warn('Network autosave failed, answer buffered locally:', e);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  const handleToggleFlag = (questionId: string) => {
    const updatedFlags = { ...flagged, [questionId]: !flagged[questionId] };
    setFlagged(updatedFlags);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`toeic_exam_${params.id}_flags`, JSON.stringify(updatedFlags));
      } catch (e) {}
    }
  };

  const executeSubmitExam = async () => {
    setShowConfirmModal(false);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/v1/exams/sessions/${session.sessionId}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          durationSeconds: (session.timeLimitMinutes * 60) - timeLeft,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setResult(json.data);
        if (typeof window !== 'undefined') {
          localStorage.removeItem(`toeic_exam_${params.id}_answers`);
          localStorage.removeItem(`toeic_exam_${params.id}_flags`);
        }
        window.dispatchEvent(new CustomEvent('toeic:gamification-update'));
        showToast('Nộp bài thành công! Bảng điểm ETS Equated đã sẵn sàng.', 'success');
      } else {
        showToast(json.detail || 'Không thể nộp bài thi', 'error');
      }
    } catch (e) {
      console.error(e);
      showToast('Lỗi mạng khi nộp bài thi', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
          <p className="text-sm font-medium text-slate-400">Đang khởi tạo phòng thi CBT chuẩn hóa...</p>
        </div>
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Results Screen
  if (result) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="bento-card p-8 sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <h1 className="mt-6 text-2xl sm:text-3xl font-black text-white">Hoàn Thành Bài Thi!</h1>
          <p className="mt-2 text-sm text-slate-400">Kết quả được quy đổi chính thức theo Bảng chuẩn ETS Equating Table</p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
              <p className="text-xs text-slate-400 font-semibold">Listening</p>
              <p className="text-2xl font-black text-indigo-400 mt-1">{result.listeningScore}</p>
            </div>
            <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
              <p className="text-xs text-slate-400 font-semibold">Reading</p>
              <p className="text-2xl font-black text-emerald-400 mt-1">{result.readingScore}</p>
            </div>
            <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
              <p className="text-xs text-slate-400 font-semibold">Tổng Điểm</p>
              <p className="text-2xl font-black text-amber-400 mt-1">{result.totalScore}</p>
            </div>
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href="/dashboard"
              className="btn-chunky rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition"
            >
              Trở Về Bảng Điều Khiển
            </Link>
            <Link
              href="/notebook"
              className="btn-chunky rounded-xl bg-slate-800 border border-slate-700 px-6 py-3 text-xs font-bold text-slate-200 hover:bg-slate-750 transition"
            >
              Xem Lỗi Sai Trong Sổ Tay SM-2
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-slate-950">
      {/* CBT Examination Top Bar */}
      <div className="border-b border-slate-800 bg-slate-900/90 px-4 py-3 sm:px-8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-indigo-500/20 px-2.5 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/30">
            ETS CBT SIMULATION
          </span>
          <h2 className="text-xs sm:text-sm font-bold text-slate-200 truncate max-w-[150px] sm:max-w-xs">
            {session?.title || 'TOEIC Practice Exam'}
          </h2>
        </div>

        {/* Paper Mode, Zoom, Zen Mode & Exam Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Paper Mode Toggle (Reading Parts) */}
          <button
            type="button"
            onClick={() => setIsPaperMode(!isPaperMode)}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
              isPaperMode
                ? 'bg-amber-100 text-amber-950 border-amber-300 shadow-sm'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
            title="Bật/Tắt chế độ làm bài Paper Mode (nền giấy dịu mắt chuẩn ETS)"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>{isPaperMode ? 'Paper: Bật' : 'Paper Mode'}</span>
          </button>

          {/* Font Zoom Controls */}
          <div className="hidden md:flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-0.5 text-xs font-bold text-slate-300">
            <button
              type="button"
              onClick={() => setFontSize((prev) => Math.max(13, prev - 1))}
              className="px-2 py-1 rounded hover:bg-slate-700 transition"
              title="Giảm cỡ chữ (A-)"
            >
              A-
            </button>
            <span className="text-[11px] text-slate-400 font-mono px-1">{fontSize}px</span>
            <button
              type="button"
              onClick={() => setFontSize((prev) => Math.min(22, prev + 1))}
              className="px-2 py-1 rounded hover:bg-slate-700 transition"
              title="Tăng cỡ chữ (A+)"
            >
              A+
            </button>
          </div>

          {/* Zen Exam Mode Toggle */}
          <button
            type="button"
            onClick={() => setZenMode(!zenMode)}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
              zenMode
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
            title="Zen Mode: Ẩn bảng điều hướng để tối đa hóa không gian tập trung"
          >
            {zenMode ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            <span>{zenMode ? 'Zen: Bật' : 'Zen Exam'}</span>
          </button>

          {/* Real-time local & cloud safe autosave status */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-slate-800 bg-slate-900/80">
            {isSyncing ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin text-amber-400" />
                <span className="text-amber-300 font-medium">Đang lưu...</span>
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-400 font-medium">Đã đồng bộ</span>
              </>
            )}
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 rounded-full bg-slate-800 px-3.5 py-1.5 border border-slate-700 text-xs font-mono font-bold text-amber-400">
            <Timer className="h-4 w-4" />
            <span>{timeString}</span>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => setShowConfirmModal(true)}
            disabled={submitting}
            className="btn-chunky rounded-xl bg-emerald-600 px-4 sm:px-5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition disabled:opacity-50"
          >
            {submitting ? 'Đang chấm điểm...' : 'Nộp bài'}
          </button>
        </div>
      </div>

      {/* CBT Body: Split layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left: Question Stimulus & Text */}
        <div className={`flex-1 p-6 sm:p-10 overflow-y-auto border-r border-slate-800/80 transition-colors duration-200 ${
          isPaperMode ? 'reading-paper-container' : ''
        }`}>
          {currentQuestion ? (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${isPaperMode ? 'text-[#5c4a38]' : 'text-slate-400'}`}>
                  Câu hỏi {currentIndex + 1} / {questions.length} (Part {currentQuestion.partNumber})
                </span>

                <button
                  onClick={() => handleToggleFlag(currentQuestion.id)}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition ${
                    flagged[currentQuestion.id]
                      ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                      : isPaperMode
                      ? 'bg-[#f4efe6] text-[#6d5b4b] border-[#e2d7c5] hover:bg-[#eae2d2]'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <Flag className="h-3.5 w-3.5" />
                  <span>{flagged[currentQuestion.id] ? 'Đã gắn cờ' : 'Gắn cờ xem lại'}</span>
                </button>
              </div>

              {/* Audio preview for Listening (Part 1-4) */}
              {currentQuestion.partNumber <= 4 && (
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl p-4 border shadow-lg ${
                  isPaperMode ? 'bg-[#fcfaf7] border-[#e6dcce]' : 'bg-slate-900/90 border-slate-800'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
                      <Volume2 className="h-5 w-5 animate-pulse" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isPaperMode ? 'text-[#2b2520]' : 'text-slate-200'}`}>
                        Âm thanh bài thi Listening (Part {currentQuestion.partNumber})
                      </p>
                      <p className={`text-[10px] ${isPaperMode ? 'text-[#7d6b5c]' : 'text-slate-400'}`}>
                        Tốc độ và chất giọng chuẩn hóa khảo thí ETS quốc tế
                      </p>
                    </div>
                  </div>
                  {currentQuestion.audioUrl ? (
                    <audio controls className="h-8 max-w-[240px]">
                      <source src={currentQuestion.audioUrl} type="audio/mpeg" />
                      Trình duyệt không hỗ trợ thẻ phát âm thanh.
                    </audio>
                  ) : (
                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-400 border border-indigo-500/20">
                      🔊 Luồng âm thanh CBT đang kích hoạt
                    </span>
                  )}
                </div>
              )}

              {/* Question Text */}
              <div className={`rounded-2xl p-6 border ${
                isPaperMode ? 'bg-[#fcfaf7] border-[#e6dcce]' : 'bg-slate-900/60 border-slate-800/80'
              }`}>
                <p
                  style={{ fontSize: `${fontSize}px` }}
                  className={`font-medium leading-relaxed ${isPaperMode ? 'text-[#241c15]' : 'text-slate-100'}`}
                >
                  {currentQuestion.questionText}
                </p>
              </div>

              {/* Options with radiogroup accessibility and keyboard badges */}
              <div
                role="radiogroup"
                aria-label={`Câu hỏi ${currentIndex + 1}: Lựa chọn đáp án`}
                className="space-y-3 pt-2"
              >
                {currentQuestion.options?.map((opt: any) => {
                  const isSelected = answers[currentQuestion.id] === opt.label;
                  return (
                    <button
                      key={opt.label}
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={`Lựa chọn ${opt.label}: ${opt.text || opt.label}`}
                      onClick={() => handleSelectOption(currentQuestion.id, opt.label)}
                      className={`w-full flex items-center justify-between rounded-xl p-4 text-left border transition focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                        isSelected
                          ? isPaperMode
                            ? 'bg-amber-100 border-amber-600 text-[#1a1612] font-semibold shadow-sm'
                            : 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                          : isPaperMode
                          ? 'bg-[#fcfaf7] border-[#e6dcce] text-[#3d3228] hover:bg-[#f5efe6]'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                          isSelected
                            ? isPaperMode ? 'bg-amber-600 text-white' : 'bg-indigo-600 text-white'
                            : isPaperMode ? 'bg-[#ede5d8] text-[#5c4b3c]' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {opt.label}
                        </div>
                        <span
                          style={{ fontSize: `${fontSize}px` }}
                          className="text-sm font-medium"
                        >
                          {opt.text || opt.label}
                        </span>
                      </div>
                      <kbd className={`hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono rounded border ${
                        isPaperMode ? 'bg-[#eae0d0] border-[#d8ccb8] text-[#5c4a38]' : 'bg-slate-800/80 border-slate-700 text-slate-400'
                      }`}>
                        {opt.label}
                      </kbd>
                    </button>
                  );
                })}
              </div>

              {/* Shortcut HUD Cheat Sheet */}
              <div className={`mt-8 pt-4 border-t flex flex-wrap items-center justify-between gap-2 text-[11px] ${
                isPaperMode ? 'border-[#e6dcce] text-[#7d6b5c]' : 'border-slate-800/80 text-slate-400'
              }`}>
                <div className="flex items-center gap-3">
                  <span className={`font-semibold ${isPaperMode ? 'text-[#3d3228]' : 'text-slate-300'}`}>Phím tắt CBT:</span>
                  <span><kbd className={`px-1.5 py-0.5 rounded border font-mono ${isPaperMode ? 'bg-[#ede5d8] border-[#d8ccb8] text-[#3d3228]' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>A-D</kbd> Chọn đáp án</span>
                  <span><kbd className={`px-1.5 py-0.5 rounded border font-mono ${isPaperMode ? 'bg-[#ede5d8] border-[#d8ccb8] text-[#3d3228]' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>← / →</kbd> Chuyển câu</span>
                  <span><kbd className={`px-1.5 py-0.5 rounded border font-mono ${isPaperMode ? 'bg-[#ede5d8] border-[#d8ccb8] text-[#3d3228]' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>F</kbd> Gắn cờ</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-slate-500">Không tìm thấy câu hỏi.</p>
          )}
        </div>

        {/* Right: Question Navigation Drawer Sheet (Collapsible with Zen Mode) */}
        {!zenMode ? (
          <div className="w-full md:w-80 bg-slate-900/50 p-6 border-t md:border-t-0 border-slate-800 overflow-y-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Bảng điều hướng câu hỏi
            </h3>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q: any, idx: number) => {
                const isAnswered = !!answers[q.id];
                const isFlag = !!flagged[q.id];
                const isCurrent = idx === currentIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative flex h-10 w-full items-center justify-center rounded-lg text-xs font-bold transition ${
                      isCurrent
                        ? 'ring-2 ring-indigo-400 text-white bg-indigo-600'
                        : isAnswered
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    {idx + 1}
                    {isFlag && (
                      <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Prev/Next Buttons */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 py-3 text-xs font-bold text-slate-300 hover:bg-slate-750 disabled:opacity-40 transition"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Câu trước</span>
              </button>

              <button
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                disabled={currentIndex === questions.length - 1}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500 disabled:opacity-40 transition"
              >
                <span>Câu tiếp</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Floating Zen Navigation Controls */
          <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 p-2 rounded-2xl shadow-2xl backdrop-blur-md">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40"
              title="Câu trước"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono font-bold px-2 text-slate-200">
              {currentIndex + 1} / {questions.length}
            </span>
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex === questions.length - 1}
              className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40"
              title="Câu tiếp"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setZenMode(false)}
              className="px-3 py-1.5 ml-1 text-xs font-bold rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
            >
              Mở Bảng
            </button>
          </div>
        )}
      </div>

      {/* Accessible CBT Submission Confirmation Modal Dialog */}
      {showConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div className="bento-card relative w-full max-w-md p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl space-y-6">
            <button
              onClick={() => setShowConfirmModal(false)}
              aria-label="Đóng bảng xác nhận"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 id="submit-modal-title" className="text-base font-bold text-white">
                  Xác Nhận Nộp Bài Thi
                </h3>
                <p className="text-xs text-slate-400">
                  Kiểm tra tiến độ làm bài trước khi hoàn tất chấm điểm ETS
                </p>
              </div>
            </div>

            {/* Examination Statistics Breakdown */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-slate-950 p-3 text-center border border-slate-800/80">
                <p className="text-[10px] uppercase font-semibold text-slate-500">Đã làm</p>
                <p className="text-lg font-black text-emerald-400 mt-0.5">
                  {Object.keys(answers).length} / {questions.length}
                </p>
              </div>
              <div className="rounded-xl bg-slate-950 p-3 text-center border border-slate-800/80">
                <p className="text-[10px] uppercase font-semibold text-slate-500">Chưa làm</p>
                <p className="text-lg font-black text-rose-400 mt-0.5">
                  {Math.max(0, questions.length - Object.keys(answers).length)}
                </p>
              </div>
              <div className="rounded-xl bg-slate-950 p-3 text-center border border-slate-800/80">
                <p className="text-[10px] uppercase font-semibold text-slate-500">Gắn cờ</p>
                <p className="text-lg font-black text-amber-400 mt-0.5">
                  {Object.values(flagged).filter(Boolean).length}
                </p>
              </div>
            </div>

            {questions.length - Object.keys(answers).length > 0 && (
              <div className="flex items-start gap-2.5 rounded-xl bg-amber-500/10 p-3 border border-amber-500/20 text-amber-300 text-xs leading-relaxed">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />
                <span>
                  Bạn còn <strong>{questions.length - Object.keys(answers).length} câu chưa chọn đáp án</strong>. Các câu chưa làm sẽ không được tính điểm theo quy chuẩn khảo thí ETS.
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 rounded-xl bg-slate-800 border border-slate-700 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-750 transition"
              >
                Xem Lại Bài Thi
              </button>
              <button
                type="button"
                onClick={executeSubmitExam}
                disabled={submitting}
                className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50 transition shadow-lg shadow-emerald-600/20"
              >
                {submitting ? 'Đang chấm điểm...' : 'Xác Nhận Nộp'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
