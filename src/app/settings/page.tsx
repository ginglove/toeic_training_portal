'use client';

import React, { useState, useEffect } from 'react';
import { Sliders, Volume2, Shield, Eye, Moon, Download, CheckCircle2, Sparkles, BookOpen, Loader2 } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function SettingsPage() {
  const [motionTilt, setMotionTilt] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [zenExamMode, setZenExamMode] = useState(false);
  const [audioAutoplay, setAudioAutoplay] = useState(true);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [sfxVolume, setSfxVolume] = useState(80);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [paperModeDefault, setPaperModeDefault] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [saved, setSaved] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        setZenExamMode(localStorage.getItem('toeic_zen_mode') === 'true');
        setReducedMotion(localStorage.getItem('toeic_reduced_motion') === 'true');
        setPaperModeDefault(localStorage.getItem('toeic_paper_mode_default') === 'true');
        const sfx = localStorage.getItem('toeic_sfx_volume');
        if (sfx) setSfxVolume(parseInt(sfx, 10));
      } catch (e) {
        console.warn('Cannot read preferences from localStorage', e);
      }
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('toeic_zen_mode', zenExamMode ? 'true' : 'false');
        localStorage.setItem('toeic_reduced_motion', reducedMotion ? 'true' : 'false');
        localStorage.setItem('toeic_paper_mode_default', paperModeDefault ? 'true' : 'false');
        localStorage.setItem('toeic_sfx_volume', sfxVolume.toString());
        localStorage.setItem('toeic_haptic', hapticFeedback ? 'true' : 'false');
      } catch (e) {
        console.warn('Cannot persist preferences', e);
      }
    }
    setSaved(true);
    showToast('Đã lưu các tùy chọn cài đặt thành công!', 'success');
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportPDPD = async () => {
    setExporting(true);
    try {
      const res = await fetch('/api/v1/users/me/export');
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `toeic-pro-data-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showToast('Đã tải xuống hồ sơ dữ liệu cá nhân (PDPD JSON) thành công!', 'success');
    } catch (err) {
      showToast('Không thể tải xuống dữ liệu cá nhân lúc này.', 'error');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-[85vh] mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="border-b border-slate-800 pb-6 mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-400 mb-2">
          <Sliders className="h-3.5 w-3.5" />
          <span>TRUNG TÂM CÀI ĐẶT &amp; TRỢ NĂNG · S-23 SETTINGS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Tùy Chỉnh Trải Nghiệm Antigravity
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Điều chỉnh hiệu ứng không gian 3D, Zen Mode, âm thanh và quyền riêng tư dữ liệu học tập.
        </p>
      </div>

      {saved && (
        <div className="mb-6 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs text-emerald-400 font-semibold flex items-center gap-2 animate-in fade-in duration-300">
          <CheckCircle2 className="h-4 w-4" />
          <span>Đã lưu các tùy chọn cài đặt thành công!</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Pod 1: Visual & Antigravity 3D Settings */}
        <div className="bento-card p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Eye className="h-5 w-5 text-indigo-400" />
            <span>Thị Giác &amp; Không Gian Antigravity</span>
          </h2>

          <label htmlFor="setting-zen-mode" className="flex items-center justify-between pt-2 cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-amber-300 flex items-center gap-1.5">
                <span>Chế độ Zen Exam Mode (Tối Giản Phòng Thi)</span>
              </p>
              <p className="text-xs text-slate-400">Ẩn 100% avatar linh thú và hiệu ứng hạt kẹo khi làm bài thi để chống xao nhãng</p>
            </div>
            <input
              id="setting-zen-mode"
              type="checkbox"
              checked={zenExamMode}
              onChange={(e) => setZenExamMode(e.target.checked)}
              className="h-5 w-5 rounded accent-amber-500 cursor-pointer focus:ring-2 focus:ring-amber-500/50"
            />
          </label>

          <label htmlFor="setting-motion-tilt" className="flex items-center justify-between pt-2 border-t border-slate-800 cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-slate-200">Hiệu ứng nghiêng từ tính 3D (Magnetic Tilt)</p>
              <p className="text-xs text-slate-400">Thẻ Bento nghiêng nhẹ theo gia tốc con trỏ chuột</p>
            </div>
            <input
              id="setting-motion-tilt"
              type="checkbox"
              checked={motionTilt}
              onChange={(e) => setMotionTilt(e.target.checked)}
              className="h-5 w-5 rounded accent-indigo-600 cursor-pointer focus:ring-2 focus:ring-indigo-500/50"
            />
          </label>

          <label htmlFor="setting-reduced-motion" className="flex items-center justify-between pt-2 border-t border-slate-800 cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-slate-200">Giảm chuyển động (Prefers-Reduced-Motion)</p>
              <p className="text-xs text-slate-400">Tắt dao động lơ lửng và thay thế bằng hiệu ứng mờ dần</p>
            </div>
            <input
              id="setting-reduced-motion"
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="h-5 w-5 rounded accent-indigo-600 cursor-pointer focus:ring-2 focus:ring-indigo-500/50"
            />
          </label>
        </div>

        {/* Pod 2: Audio & Haptics */}
        <div className="bento-card p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-cyan-400" />
            <span>Âm Thanh &amp; Phản Hồi Xúc Giác</span>
          </h2>

          <label htmlFor="setting-audio-autoplay" className="flex items-center justify-between pt-2 cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-slate-200">Tự động phát audio khi vào câu hỏi Listening</p>
              <p className="text-xs text-slate-400">Tiết kiệm thao tác bấm phát</p>
            </div>
            <input
              id="setting-audio-autoplay"
              type="checkbox"
              checked={audioAutoplay}
              onChange={(e) => setAudioAutoplay(e.target.checked)}
              className="h-5 w-5 rounded accent-indigo-600 cursor-pointer focus:ring-2 focus:ring-indigo-500/50"
            />
          </label>

          <label htmlFor="setting-haptic" className="flex items-center justify-between pt-2 border-t border-slate-800 cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-slate-200">Rung phản hồi xúc giác (Haptic Feedback)</p>
              <p className="text-xs text-slate-400">Rung nhịp đôi khi làm bài đúng hoặc bảo vệ Streak</p>
            </div>
            <input
              id="setting-haptic"
              type="checkbox"
              checked={hapticFeedback}
              onChange={(e) => setHapticFeedback(e.target.checked)}
              className="h-5 w-5 rounded accent-indigo-600 cursor-pointer focus:ring-2 focus:ring-indigo-500/50"
            />
          </label>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <div>
              <p className="text-sm font-semibold text-slate-200">Âm lượng hiệu ứng âm thanh (SFX Volume): {sfxVolume}%</p>
              <p className="text-xs text-slate-400">Điều chỉnh âm thanh chúc mừng, kẹo nổ và tiếng chuông</p>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sfxVolume}
              onChange={(e) => setSfxVolume(parseInt(e.target.value, 10))}
              className="w-32 accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <div>
              <p className="text-sm font-semibold text-slate-200">Tốc độ phát âm thanh mặc định</p>
              <p className="text-xs text-slate-400">Điều chỉnh tốc độ nghe cho các bài luyện tự do</p>
            </div>
            <select
              value={audioSpeed}
              onChange={(e) => setAudioSpeed(parseFloat(e.target.value))}
              className="rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white"
            >
              <option value={0.8}>0.8x (Chậm)</option>
              <option value={1.0}>1.0x (Chuẩn ETS)</option>
              <option value={1.2}>1.2x (Nhanh)</option>
            </select>
          </div>
        </div>

        {/* Pod 3: Reading Comfort & Paper Mode */}
        <div className="bento-card p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-400" />
            <span>Chế Độ Đọc Chống Mỏi Mắt (Paper Mode)</span>
          </h2>

          <label htmlFor="setting-paper-default" className="flex items-center justify-between pt-2 cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-slate-200">Mặc định bật Chế độ Giấy (Paper Mode) khi đọc Part 7</p>
              <p className="text-xs text-slate-400">Nền ngà tự nhiên (#F8F6F0) với chữ than độ tương phản cao 12.8:1</p>
            </div>
            <input
              id="setting-paper-default"
              type="checkbox"
              checked={paperModeDefault}
              onChange={(e) => setPaperModeDefault(e.target.checked)}
              className="h-5 w-5 rounded accent-emerald-500 cursor-pointer focus:ring-2 focus:ring-emerald-500/50"
            />
          </label>
        </div>

        {/* Pod 4: Privacy & PDPD Data Portability */}
        <div className="bento-card p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            <span>Quyền Riêng Tư &amp; Xuất Dữ Liệu PDPD (Nghị định 13/2023/NĐ-CP)</span>
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed">
            Hệ thống không theo dõi phần cứng, không bán dữ liệu cho bên thứ ba. Bạn có toàn quyền trích xuất toàn bộ lịch sử bài thi, lộ trình học và ghi chú lỗi sai SM-2 bất kỳ lúc nào.
          </p>

          <button
            type="button"
            onClick={handleExportPDPD}
            disabled={exporting}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 transition disabled:opacity-50"
          >
            {exporting ? <Loader2 className="h-4 w-4 animate-spin text-indigo-400" /> : <Download className="h-4 w-4 text-emerald-400" />}
            <span>{exporting ? 'Đang xuất tệp...' : 'Trích Xuất Dữ Liệu Cá Nhân (toeic-pro-data.json)'}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="btn-chunky w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 transition"
        >
          Lưu Thiết Lập Cài Đặt
        </button>
      </div>
    </div>
  );
}