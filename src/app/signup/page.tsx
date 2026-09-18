'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimeGuardian } from '@/components/AnimeGuardian';
import { Mail, Lock, User, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await res.json();
      if (json.success) {
        router.push('/onboarding');
      } else {
        setError(json.detail || json.title || 'Đăng ký không thành công');
      }
    } catch (err: any) {
      setError(err.message || 'Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative">
      <div className="pointer-events-none absolute w-[500px] h-[500px] bg-purple-600/15 blur-3xl rounded-full -top-12" />

      <div className="w-full max-w-md bento-card p-8 relative shadow-2xl border-slate-700/80 bg-slate-900/85 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center mb-6">
          <AnimeGuardian character="sparky" size="sm" showDialogue={false} />
          <h1 className="mt-3 text-2xl font-black text-white">Khởi Tạo Hành Trình</h1>
          <p className="mt-1 text-xs text-slate-400">100% Free · Nhận ngay 50 Gems &amp; Linh Thú Đồng Hành</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-rose-500/15 border border-rose-500/30 p-3 text-xs text-rose-400 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="signup-name" className="block text-xs font-semibold text-slate-300 mb-1.5">Họ và tên học viên</label>
            <div className="relative">
              <User className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl bg-slate-950/90 border border-slate-700 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition"
                placeholder="Ví dụ: Nguyễn Văn An"
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-xs font-semibold text-slate-300 mb-1.5">Email của bạn</label>
            <div className="relative">
              <Mail className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl bg-slate-950/90 border border-slate-700 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition"
                placeholder="an.nguyen@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-xs font-semibold text-slate-300 mb-1.5">Mật khẩu bảo mật</label>
            <div className="relative">
              <Lock className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full rounded-xl bg-slate-950/90 border border-slate-700 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition"
                placeholder="Tối thiểu 8 ký tự"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" /> Không cần thẻ thanh toán / Không có chi phí ẩn
            </p>
            <p>Bảo lưu kết quả học tập trên bộ nhớ đám mây cá nhân.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-chunky w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white hover:bg-indigo-500 disabled:opacity-50 transition shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Đang khởi tạo...</span>
              </>
            ) : (
              <>
                <span>Tạo Tài Khoản &amp; Chọn Linh Thú</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Đã có tài khoản?{' '}
          <Link href="/login" className="font-bold text-indigo-400 hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}