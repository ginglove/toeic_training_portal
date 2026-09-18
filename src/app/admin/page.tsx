'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, Database, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AdminDashboardPage() {
  const [resetReason, setResetReason] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetReason.trim().length < 10) {
      alert('Lý do can thiệp phải từ 10 ký tự trở lên theo quy chuẩn audit § 5.8 & § 6.3');
      return;
    }
    setResetSuccess(true);
    setTimeout(() => {
      setResetReason('');
      setResetSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-[85vh] mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-bold text-purple-400 mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>TRUNG TÂM QUẢN TRỊ ADMIN · S-26 TELEMETRY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Giám Sát Hệ Thống &amp; Nhật Ký Kiểm Toán (Audit)
          </h1>
        </div>

        <Link
          href="/admin/item-bank"
          className="btn-chunky inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-500"
        >
          <Database className="h-4 w-4" />
          <span>Ngân Hàng Đề Thi (S-25)</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bento-card p-5 text-center">
          <p className="text-3xl font-black text-white">1,248</p>
          <p className="text-xs text-slate-400 mt-1">Tổng Học Viên</p>
        </div>
        <div className="bento-card p-5 text-center">
          <p className="text-3xl font-black text-indigo-400">4,912</p>
          <p className="text-xs text-slate-400 mt-1">Lượt Thi Đã Nộp</p>
        </div>
        <div className="bento-card p-5 text-center">
          <p className="text-3xl font-black text-emerald-400">99.8%</p>
          <p className="text-xs text-slate-400 mt-1">Uptime Hệ Thống</p>
        </div>
        <div className="bento-card p-5 text-center">
          <p className="text-3xl font-black text-amber-400">0</p>
          <p className="text-xs text-slate-400 mt-1">Lượt Gian Lận Tamper</p>
        </div>
      </div>

      {/* Admin Action Modal / Reset Exam Form */}
      <div className="bento-card p-6 max-w-xl">
        <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <RefreshCw className="h-4 w-4 text-purple-400" />
          <span>Can Thiệp Reset Lượt Thi Học Viên (§ 5.8 Audit)</span>
        </h2>
        <p className="text-xs text-slate-400 mb-4">
          Quy định bắt buộc: Nhập lý do tối thiểu 10 ký tự để ghi vào bảng nhật ký bất biến AdminActionAudit.
        </p>

        {resetSuccess && (
          <div className="mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs text-emerald-400 font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Đã reset lượt thi thành công và ghi nhận nhật ký AdminActionAudit!</span>
          </div>
        )}

        <form onSubmit={handleResetAttempt} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Mã Lượt Thi (Attempt ID)</label>
            <input
              type="text"
              defaultValue="att-2026-sample-01"
              required
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Lý do can thiệp (tối thiểu 10 ký tự)</label>
            <textarea
              value={resetReason}
              onChange={(e) => setResetReason(e.target.value)}
              required
              minLength={10}
              placeholder="Nhập lý do kỹ thuật hoặc yêu cầu kiểm tra lại của học viên..."
              className="w-full h-20 rounded-xl bg-slate-950 border border-slate-700 p-3 text-xs text-white"
            />
          </div>

          <button
            type="submit"
            className="btn-chunky w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-md shadow-purple-600/30"
          >
            Xác Nhận Reset &amp; Ghi Nhật Ký Kiểm Toán
          </button>
        </form>
      </div>
    </div>
  );
}