'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  BrainCircuit, 
  BookmarkCheck, 
  Filter, 
  Sparkles, 
  Lightbulb, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface ReviewQuestion {
  id: string;
  questionNumber: number;
  partNumber: number;
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  isFlagged?: boolean;
  options: {
    label: string;
    text: string;
  }[];
  explanation: {
    correctRationale: string;
    distractorTraps: {
      option: string;
      trapType: string;
      reason: string;
    }[];
    takeawayTactics: string;
  };
}

const SAMPLE_REVIEW_QUESTIONS: ReviewQuestion[] = [
  {
    id: 'q-101',
    questionNumber: 101,
    partNumber: 5,
    questionText: 'Ms. Tanaka requested that the budget proposal be sent directly to ______ before Friday noon.',
    userAnswer: 'A',
    correctAnswer: 'C',
    isCorrect: false,
    isFlagged: true,
    options: [
      { label: 'A', text: 'she' },
      { label: 'B', text: 'herself' },
      { label: 'C', text: 'her' },
      { label: 'D', text: 'hers' },
    ],
    explanation: {
      correctRationale: 'Cần một đại từ tân ngữ (Object Pronoun) đứng sau giới từ "to". Trong các phương án, "her" đóng vai trò là đại từ nhân xưng tân ngữ chỉ Ms. Tanaka.',
      distractorTraps: [
        { option: 'A (she)', trapType: 'Sai thể loại ngữ pháp', reason: 'Là đại từ chủ ngữ (Subject Pronoun), chỉ đứng đầu mệnh đề làm chủ ngữ, không đứng sau giới từ.' },
        { option: 'B (herself)', trapType: 'Bẫy đại từ phản thân', reason: 'Chỉ dùng khi chủ ngữ của hành động gửi (người gửi tài liệu) và người nhận là cùng một người. Ở đây người gửi là người khác gửi đến cho cô Tanaka.' },
        { option: 'D (hers)', trapType: 'Bẫy đại từ sở hữu', reason: 'Hers tương đương "her + Noun", không phù hợp về ngữ nghĩa làm người nhận trong câu.' },
      ],
      takeawayTactics: 'Quy tắc 3 giây Part 5: Sau giới từ (to, for, with, by...) điền ngay TÂN NGỮ (me/him/her/them/us).',
    },
  },
  {
    id: 'q-102',
    questionNumber: 102,
    partNumber: 5,
    questionText: 'The newly appointed vice president delivered an ______ inspiring speech at the annual convention.',
    userAnswer: 'B',
    correctAnswer: 'B',
    isCorrect: true,
    isFlagged: false,
    options: [
      { label: 'A', text: 'exception' },
      { label: 'B', text: 'exceptionally' },
      { label: 'C', text: 'exceptional' },
      { label: 'D', text: 'except' },
    ],
    explanation: {
      correctRationale: 'Chỗ trống đứng trước tính từ "inspiring" và sau mạo từ "an". Cần một trạng từ (Adverb) có đuôi -ly để bổ nghĩa cho tính từ "inspiring".',
      distractorTraps: [
        { option: 'A (exception)', trapType: 'Sai từ loại', reason: 'Danh từ (Noun) không thể đứng trước tính từ để bổ nghĩa trực tiếp cho tính từ.' },
        { option: 'C (exceptional)', trapType: 'Bẫy 2 tính từ liền kề', reason: 'Tính từ ghép đôi không đúng ngữ cảnh; "exceptionally" làm trạng từ tăng cấp cho tính từ theo cấu trúc: Adv + Adj + Noun.' },
        { option: 'D (except)', trapType: 'Sai giới từ/liên từ', reason: 'Except là giới từ/liên từ mang nghĩa "ngoại trừ", sai hoàn toàn ngữ nghĩa và cấu trúc câu.' },
      ],
      takeawayTactics: 'Cấu trúc vàng vị trí từ loại: a/an/the + ADV + ADJ + NOUN.',
    },
  },
  {
    id: 'q-103',
    questionNumber: 103,
    partNumber: 2,
    questionText: 'When will the final safety inspection report be finalized?',
    userAnswer: 'B',
    correctAnswer: 'A',
    isCorrect: false,
    isFlagged: false,
    options: [
      { label: 'A', text: 'Not until next Tuesday afternoon.' },
      { label: 'B', text: 'Yes, I already inspected the equipment.' },
      { label: 'C', text: 'At the downtown conference center.' },
    ],
    explanation: {
      correctRationale: 'Câu hỏi bắt đầu bằng từ để hỏi thời gian "When". Câu trả lời "Not until next Tuesday afternoon" (Mãi cho tới chiều thứ Ba tới) cung cấp mốc thời gian hoàn thành chính xác.',
      distractorTraps: [
        { option: 'B (Yes...)', trapType: 'Bẫy Yes/No cho Wh-question', reason: 'Câu hỏi Wh- tuyệt đối không trả lời bằng Yes/No. Đồng thời lặp từ khóa "inspected" để gây nhiễu.' },
        { option: 'C (At the downtown...)', trapType: 'Bẫy nhầm từ để hỏi When - Where', reason: 'Trả lời địa điểm (Where) thay vì thời điểm (When).' },
      ],
      takeawayTactics: 'Chiến thuật Part 2: Loại ngay phương án bắt đầu bằng Yes/No khi nghe câu hỏi Who/What/When/Where/Why/How.',
    },
  },
];

export default function ExamReviewPage({ params }: { params: { attemptId: string } }) {
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'flagged'>('all');

  const filteredQuestions = SAMPLE_REVIEW_QUESTIONS.filter((q) => {
    if (filter === 'incorrect') return !q.isCorrect;
    if (filter === 'flagged') return q.isFlagged;
    return true;
  });

  const incorrectCount = SAMPLE_REVIEW_QUESTIONS.filter((q) => !q.isCorrect).length;

  return (
    <div className="min-h-[88vh] mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Trở về Bảng Điều Khiển</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <span>Chi Tiết Lời Giải &amp; Mổ Xẻ Bẫy ETS</span>
            <span className="text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded-full">
              S-17 EXAM REVIEW
            </span>
          </h1>
        </div>

        {/* Spaced Repetition Auto-Sync Badge */}
        <div className="flex flex-col items-end gap-1">
          <div className="inline-flex items-center gap-2 rounded-xl bg-purple-950/60 border border-purple-500/40 px-3.5 py-2 text-xs font-bold text-purple-300 shadow-md">
            <BrainCircuit className="h-4 w-4 text-purple-400 animate-pulse" />
            <span>Đã tự động đồng bộ {incorrectCount} câu sai vào Sổ tay SM-2</span>
          </div>
          <span className="text-[11px] text-slate-400">
            Lịch ôn tập Spaced Repetition Level 1: <strong className="text-purple-300">Ngày mai</strong>
          </span>
        </div>
      </div>

      {/* Filter Toolbar & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 mr-1" />
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Tất cả ({SAMPLE_REVIEW_QUESTIONS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('incorrect')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'incorrect'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            ❌ Câu sai ({incorrectCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('flagged')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'flagged'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            🚩 Gắn cờ xem lại (1)
          </button>
        </div>

        <Link
          href="/notebook"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:underline"
        >
          <BookmarkCheck className="h-4 w-4" />
          <span>Mở Sổ Tay Lỗi Sai SM-2</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Question Review List */}
      <div className="space-y-8">
        {filteredQuestions.map((q) => {
          return (
            <div
              key={q.id}
              className={`bento-card p-6 sm:p-8 border ${
                q.isCorrect
                  ? 'border-slate-800 bg-slate-900/70'
                  : 'border-rose-500/30 bg-rose-950/10'
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">
                    Câu {q.questionNumber} · Part {q.partNumber}
                  </span>
                  {q.isFlagged && (
                    <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                      🚩 Đã gắn cờ
                    </span>
                  )}
                </div>

                {/* Dual Signifier: Icon + Label */}
                {q.isCorrect ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>[ĐÚNG] Bạn đã chọn {q.userAnswer}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-xs font-bold text-rose-400">
                    <XCircle className="h-4 w-4 shrink-0" />
                    <span>[SAI] Bạn đã chọn {q.userAnswer} · Đáp án đúng: {q.correctAnswer}</span>
                  </span>
                )}
              </div>

              {/* Question Text */}
              <p className="text-base font-semibold text-white mb-6 leading-relaxed">
                {q.questionText}
              </p>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {q.options.map((opt) => {
                  const isCorrectOpt = opt.label === q.correctAnswer;
                  const isUserOpt = opt.label === q.userAnswer;

                  let optClass = 'bg-slate-950/60 border-slate-800 text-slate-400';
                  if (isCorrectOpt) {
                    optClass = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500/30';
                  } else if (isUserOpt && !q.isCorrect) {
                    optClass = 'bg-rose-950/40 border-rose-500 text-rose-300 font-bold';
                  }

                  return (
                    <div
                      key={opt.label}
                      className={`p-3.5 rounded-xl border flex items-center justify-between text-xs transition ${optClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${
                          isCorrectOpt ? 'bg-emerald-600 text-white' : isUserOpt ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {opt.label}
                        </span>
                        <span className="text-sm">{opt.text}</span>
                      </div>
                      {isCorrectOpt && (
                        <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Đáp án đúng</span>
                        </span>
                      )}
                      {isUserOpt && !isCorrectOpt && (
                        <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1">
                          <XCircle className="h-3.5 w-3.5" />
                          <span>Lựa chọn của bạn</span>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 3-Part Pedagogical Explanation Card */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 sm:p-6 space-y-5">
                {/* Part 1: Correct Rationale */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4" />
                    <span>1. Căn Cứ Chọn Đúng (Correct Rationale)</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6 border-l-2 border-emerald-500/50">
                    {q.explanation.correctRationale}
                  </p>
                </div>

                {/* Part 2: Distractor Traps Breakdown */}
                {q.explanation.distractorTraps?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-2">
                      <ShieldAlert className="h-4 w-4" />
                      <span>2. Mổ Xẻ Bẫy Từng Phương Án Sai (Distractor Traps)</span>
                    </h4>
                    <div className="space-y-2 pl-6 border-l-2 border-amber-500/50">
                      {q.explanation.distractorTraps.map((trap, idx) => (
                        <div key={idx} className="text-xs text-slate-300">
                          <span className="font-bold text-amber-300">[{trap.option}]: </span>
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold text-[10px] mr-1.5 border border-amber-500/20">
                            {trap.trapType}
                          </span>
                          <span className="text-slate-400">{trap.reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Part 3: Takeaway Tactics */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4" />
                    <span>3. Chiến Thuật Cốt Lõi Bỏ Túi (Takeaway Tactics)</span>
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-cyan-200 pl-6 border-l-2 border-cyan-500/50">
                    {q.explanation.takeawayTactics}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
