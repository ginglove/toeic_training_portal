'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimeGuardian } from '@/components/AnimeGuardian';
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck, GraduationCap, Shield, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('student@toeicpro.local');
  const [password, setPassword] = useState('StudentPassword123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (json.success) {
        router.push('/dashboard');
      } else {
        setError(json.detail || json.title || 'Đăng nhập không thành công');
      }
    } catch (err: any) {
      setError(err.message || 'Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (type: 'student' | 'admin') => {
    if (type === 'student') {
      setEmail('student@toeicpro.local');
      setPassword('StudentPassword123!');
    } else {
      setEmail('admin@toeicpro.local');
      setPassword('AdminPassword123!');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute w-[500px] h-[500px] bg-indigo-600/15 blur-3xl rounded-full -top-12" />

      <div className="w-full max-w-md bento-card p-8 relative shadow-2xl border-slate-700/80 bg-slate-900/85 backdrop-blur-xl">
        {/* Sparky Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <AnimeGuardian character="sparky" size="sm" showDialogue={false} />
          <h1 className="mt-3 text-2xl font-black text-white">Cổng Đăng Nhập Vũ Trụ</h1>
          <p className="mt-1 text-xs text-slate-400">100% Free · Truy cập toàn bộ 48 trạm Saga &amp; đề thi ETS</p>
        </div>

        {/* Quick Demo Switcher Buttons */}
        <div className="mb-6 p-3 rounded-xl bg-slate-950/70 border border-indigo-500/30">
          <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <UserCheck className="h-3.5 w-3.5" /> Chọn tài khoản thử nghiệm nhanh:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('student')}
              className="px-2.5 py-2 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-xs font-semibold text-indigo-300 hover:bg-indigo-600/40 text-left transition flex items-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="h-4 w-4 text-indigo-400" />
              <span>Học Viên (550)</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="px-2.5 py-2 rounded-lg bg-purple-600/20 border border-purple-500/40 text-xs font-semibold text-purple-300 hover:bg-purple-600/40 text-left transition flex items-center gap-1.5 cursor-pointer"
            >
              <Shield className="h-4 w-4 text-purple-400" />
              <span>Quản Trị Viên</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-rose-500/15 border border-rose-500/30 p-3 text-xs text-rose-400 font-semibold">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-xs font-semibold text-slate-300 mb-1.5">Email tài khoản</label>
            <div className="relative">
              <Mail className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl bg-slate-950/90 border border-slate-700 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition"
                placeholder="tenban@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-xs font-semibold text-slate-300 mb-1.5">Mật khẩu bảo mật</label>
            <div className="relative">
              <Lock className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl bg-slate-950/90 border border-slate-700 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-chunky w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white hover:bg-indigo-500 disabled:opacity-50 transition shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Đang xác thực...</span>
              </>
            ) : (
              <>
                <span>Đăng Nhập Vào Hệ Thống</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Chưa có tài khoản?{' '}
          <Link href="/signup" className="font-bold text-indigo-400 hover:underline">
            Tạo tài khoản miễn phí
          </Link>
        </div>
      </div>
    </div>
  );
}