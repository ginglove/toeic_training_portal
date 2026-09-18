'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimeGuardian } from '@/components/AnimeGuardian';
import { ArrowRight, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function VerifyOtpPage() {
  const router = useRouter();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [resendCooldown, setResendCooldown] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
      setResendCooldown((r) => (r > 0 ? r - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = digits.join('');
    if (otp.length < 6) {
      setError('Vui lòng nhập đầy đủ 6 chữ số mã OTP.');
      return;
    }

    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/onboarding');
      }, 1000);
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative">
      <div className="pointer-events-none absolute w-[500px] h-[500px] bg-amber-500/15 blur-3xl rounded-full -top-12" />

      <div className="w-full max-w-md bento-card p-8 relative shadow-2xl border-slate-700/80 bg-slate-900/85 backdrop-blur-xl text-center">
        <AnimeGuardian character="sparky" size="sm" showDialogue={false} />

        <h1 className="mt-3 text-2xl font-black text-white">Xác Thực Mã OTP</h1>
        <p className="mt-1 text-xs text-slate-400">
          Mã xác thực 6 chữ số đã được gửi tới hòm thư của bạn.
        </p>

        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400">
          <Clock className="h-3.5 w-3.5" />
          <span>Thời gian còn lại: {formatTime(countdown)}</span>
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-rose-500/15 border border-rose-500/30 p-2.5 text-xs text-rose-400 font-semibold">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-2.5 text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" />
            <span>Xác thực thành công! Đang chuyển hướng...</span>
          </div>
        )}

        <form onSubmit={handleVerify} className="mt-6 space-y-6">
          <div className="flex justify-center gap-2.5 sm:gap-3">
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                aria-label={`Ký tự OTP thứ ${i + 1}`}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black text-white rounded-xl bg-slate-950 border border-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-chunky w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white hover:bg-indigo-500 disabled:opacity-50 transition shadow-lg shadow-indigo-600/30"
          >
            <span>{loading ? 'Đang kiểm tra...' : 'Xác Nhận &amp; Tiếp Tục'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center text-xs text-slate-400">
          {resendCooldown > 0 ? (
            <span>Gửi lại mã sau {resendCooldown}s</span>
          ) : (
            <button
              type="button"
              onClick={() => {
                setResendCooldown(60);
                setCountdown(300);
              }}
              className="inline-flex items-center gap-1.5 text-indigo-400 font-bold hover:underline"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Gửi lại mã ngay
            </button>
          )}
        </div>
      </div>
    </div>
  );
}