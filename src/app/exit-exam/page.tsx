'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimeGuardian } from '@/components/AnimeGuardian';
import { Award, Crown, Star, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Play, Timer, Loader2 } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function ExitExamPage() {
  const { showToast } = useToast();
  const [phase, setPhase] = useState<'INTRO' | 'EXAM' | 'GRADUATED'>('INTRO');
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Array<{ questionId: string; selectedOption: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [certData, setCertData] = useState<any>(null);

  // Load existing certificate if already completed
  useEffect(() => {
    fetch('/api/v1/journeys/default/exit-exam/certificates')
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data?.hasCertificate && json.data.certificate) {
          setCertData(json.data.certificate);
          setPhase('GRADUATED');
        }
      })
      .catch(() => {});
  }, []);

  const handleStartExam = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/journeys/default/exit-exam/attempts', {
        method: 'POST',
      });
      const json = await res.json();
      if (json.success) {
        setAttemptId(json.data.attemptId);
        setQuestions(json.data.questions || []);
        setCurrentIndex(0);
        setSelectedOption(null);
        setAnswers([]);
        setPhase('EXAM');
      } else {
        showToast(json.detail || 'Không thể khởi tạo bài thi tốt nghiệp.', 'error');
      }
    } catch (e) {
      showToast('Lỗi kết nối máy chủ.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (label: string) => {
    setSelectedOption(label);
    const q = questions[currentIndex];
    if (!q) return;
    const newAnswers = [...answers.filter((a) => a.questionId !== q.id), { questionId: q.id, selectedOption: label }];
    setAnswers(newAnswers);
  };

  const handleNextOrSubmit = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      const nextQ = questions[currentIndex + 1];
      const existing = answers.find((a) => a.questionId === nextQ?.id);
      setSelectedOption(existing ? existing.selectedOption : null);
    } else {
      // Submit exam
      setSubmitting(true);
      try {
        const res = await fetch(`/api/v1/journeys/default/exit-exam/attempts/${attemptId}/submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers, durationSeconds: 900 }),
        });
        const json = await res.json();
        if (json.success) {
          setCertData({
            code: json.data.certificateCode,
            studentName: json.data.studentName,
            scoreAchieved: json.data.totalScore,
            issuedAt: json.data.issuedAt,
          });
          setPhase('GRADUATED');
          showToast('Chúc mừng! Bạn đã hoàn thành Bài Thi Tốt Nghiệp và thức tỉnh Thần Linh!', 'success');
        } else {
          showToast(json.detail || 'Không thể nộp bài thi.', 'error');
        }
      } catch (e) {
        showToast('Lỗi kết nối khi nộp bài thi.', 'error');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-[90vh] mx-auto max-w-4xl px-4 py-10 sm:px-6 flex flex-col items-center text-center">
      {/* Header Banner */}
      <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 border border-amber-500/30 px-4 py-1.5 text-xs font-bold text-amber-400 mb-6 animate-pulse">
        <Crown className="h-4 w-4" />
        <span>BÀI THI TỐT NGHIỆP CHẶNG · S-30 EXIT MILESTONE EXAM</span>
      </div>

      {phase === 'INTRO' && (
        <div className="space-y-6 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Đỉnh Cao Chinh Phục &amp; Thức Tỉnh Thần Linh
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Vượt qua bài thi tốt nghiệp 20 câu hỏi tổng kết chặng để kiểm chứng mức tăng điểm thực tế và đưa Linh thú đồng hành lên cấp độ tối cao: <strong className="text-amber-400">Stage 4 Celestial Deity</strong>.
          </p>

          <div className="bento-card p-6 text-left space-y-3 bg-slate-900/80">
            <h2 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Quy Chế Thi Tốt Nghiệp Chặng</h2>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
              <li>Đề thi bao gồm 20 câu hỏi trọng điểm bao quát toàn bộ 7 Parts của TOEIC.</li>
              <li>Thời gian làm bài tiêu chuẩn: 30 phút với thuật toán IRT tự động chuẩn hóa điểm số ETS.</li>
              <li>Khi hoàn thành, hệ thống sẽ tự động cấp Chứng chỉ số kèm mã bảo mật bất biến.</li>
            </ul>
          </div>

          <div className="pt-4">
            <button
              onClick={handleStartExam}
              disabled={loading}
              className="btn-chunky inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-8 py-4 text-sm font-black text-slate-950 shadow-xl shadow-amber-500/20 transition"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4 fill-slate-950" />}
              <span>Bắt Đầu Thi Tốt Nghiệp Chặng</span>
            </button>
          </div>
        </div>
      )}

      {phase === 'EXAM' && currentQ && (
        <div className="w-full max-w-2xl text-left space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-indigo-400">
              Câu {currentIndex + 1} / {questions.length} · Part {currentQ.part}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
              <Timer className="h-3.5 w-3.5" />
              <span>Đang thi trực tuyến</span>
            </div>
          </div>

          <div className="bento-card p-6 space-y-4">
            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {currentQ.prompt}
            </p>

            <div className="space-y-2.5 pt-2">
              {currentQ.options?.map((opt: any) => (
                <button
                  key={opt.id || opt.label}
                  type="button"
                  onClick={() => handleSelectOption(opt.label)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center gap-3 ${
                    selectedOption === opt.label
                      ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                    selectedOption === opt.label ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {opt.label}
                  </span>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1);
                  const prevQ = questions[currentIndex - 1];
                  const existing = answers.find((a) => a.questionId === prevQ?.id);
                  setSelectedOption(existing ? existing.selectedOption : null);
                }
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-xs font-bold text-slate-400 disabled:opacity-30"
            >
              Câu Trước
            </button>

            <button
              type="button"
              disabled={!selectedOption || submitting}
              onClick={handleNextOrSubmit}
              className="btn-chunky inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 text-xs font-bold text-white disabled:opacity-40 transition"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Đang chấm điểm...</span>
                </>
              ) : currentIndex === questions.length - 1 ? (
                <span>Nộp Bài Thi Tốt Nghiệp</span>
              ) : (
                <>
                  <span>Tiếp Theo</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {phase === 'GRADUATED' && (
        <div className="space-y-6 max-w-2xl animate-in zoom-in-95 duration-500">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Thức Tỉnh Thần Linh Tối Cao Thành Công!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Học viên đã chính thức vượt qua Bài thi Tốt nghiệp chặng, mở khóa chứng nhận số và đưa Thần Thức lên đỉnh cao Thần Thoại Stage 4.
          </p>

          {/* Gold Certificate Frame */}
          <div className="my-6 w-full bento-card p-8 border-amber-400/50 bg-gradient-to-b from-amber-950/25 via-slate-900/90 to-slate-950 relative shadow-2xl space-y-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <AnimeGuardian
                character="sparky"
                stage={4}
                state="victory"
                size="hero"
                customDialogue="'Ta đã thức tỉnh thành Thần Linh Lôi Điện! Chúc mừng bạn đã hoàn thành trọn vẹn lộ trình 48 trạm!'"
              />

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>STAGE 4: CELESTIAL DEITY UNLOCKED</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-amber-400">
                CHỨNG NHẬN HOÀN THÀNH LỘ TRÌNH TOEIC PRO
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Cấp cho học viên: <strong className="text-white">{certData?.studentName || 'Nguyễn Văn An'}</strong> · Điểm số đạt được: <strong className="text-emerald-400 text-base">{certData?.scoreAchieved || 885} pts</strong>
              </p>

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-around w-full text-xs text-slate-400 gap-2">
                <span>Mã chứng chỉ: <strong className="text-slate-200 font-mono">{certData?.code || 'TP-2026-CERT-885'}</strong></span>
                <span>Xác thực bởi IRT Logistic 2PL Engine</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="btn-chunky inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-xs font-bold text-white hover:bg-indigo-500 transition"
            >
              <span>Trở Về Bảng Điều Khiển</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/saga-map"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-6 py-3.5 text-xs font-bold text-slate-200 hover:bg-slate-800 transition"
            >
              <span>Xem Lại Bản Đồ Saga</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}