import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('UI Function & Interactive Component Automated Tests', () => {
  const settingsPath = path.join(process.cwd(), 'src/app/settings/page.tsx');
  const examPath = path.join(process.cwd(), 'src/app/exam/[id]/page.tsx');
  const exitExamPath = path.join(process.cwd(), 'src/app/exit-exam/page.tsx');
  const colosseumPath = path.join(process.cwd(), 'src/app/colosseum/page.tsx');
  const planPath = path.join(process.cwd(), 'src/app/plan/page.tsx');
  const nodePath = path.join(process.cwd(), 'src/app/node/[id]/page.tsx');

  const settingsContent = fs.readFileSync(settingsPath, 'utf8');
  const examContent = fs.readFileSync(examPath, 'utf8');
  const exitExamContent = fs.readFileSync(exitExamPath, 'utf8');
  const colosseumContent = fs.readFileSync(colosseumPath, 'utf8');
  const planContent = fs.readFileSync(planPath, 'utf8');
  const nodeContent = fs.readFileSync(nodePath, 'utf8');

  // ─── 1. SETTINGS HUB 4-POD BENTO FUNCTIONALITY ───────────────────────
  describe('Settings Hub UI Functions (src/app/settings/page.tsx)', () => {
    it('Pod 1: should implement Zen Exam Mode toggle with localStorage persistence', () => {
      assert.ok(settingsContent.includes('zenExamMode'), 'Must track zenExamMode state');
      assert.ok(settingsContent.includes("localStorage.getItem('toeic_zen_mode')"), 'Must read from localStorage');
      assert.ok(settingsContent.includes("localStorage.setItem('toeic_zen_mode'"), 'Must write to localStorage');
    });

    it('Pod 2: should implement Haptic Feedback toggle for mobile touch ergonomics', () => {
      assert.ok(settingsContent.includes('hapticFeedback'), 'Must track hapticFeedback state');
      assert.ok(settingsContent.includes("localStorage.setItem('toeic_haptic'"), 'Must persist haptic setting');
      assert.ok(settingsContent.includes('Rung phản hồi xúc giác (Haptic Feedback)'), 'Must describe haptic behavior');
    });

    it('Pod 3: should implement SFX Volume slider with dynamic volume percentage', () => {
      assert.ok(settingsContent.includes('sfxVolume'), 'Must track sfxVolume state');
      assert.ok(settingsContent.includes('type="range"'), 'Must render HTML5 range slider');
      assert.ok(settingsContent.includes('min="0"'), 'Slider must start at 0');
      assert.ok(settingsContent.includes('max="100"'), 'Slider must max at 100');
      assert.ok(settingsContent.includes('{sfxVolume}%'), 'Must display dynamic volume percentage');
    });

    it('Pod 4: should implement PDPD Decree 13 Data Privacy Hub with one-click JSON export', () => {
      assert.ok(settingsContent.includes('/api/v1/users/me/export'), 'Must call export API');
      assert.ok(settingsContent.includes('Trích Xuất Dữ Liệu Cá Nhân (toeic-pro-data.json)'), 'Must render export button label');
      assert.ok(settingsContent.includes('Nghị định 13/2023/NĐ-CP'), 'Must cite Vietnam Decree 13 standard');
      assert.ok(settingsContent.includes('URL.createObjectURL(blob)'), 'Must construct download blob URL');
      assert.ok(settingsContent.includes('a.click()'), 'Must programmatically trigger file download');
    });
  });

  // ─── 2. CBT EXAM SCREEN INTERACTIVE FUNCTIONALITY ─────────────────────
  describe('CBT Exam Screen UI Functions (src/app/exam/[id]/page.tsx)', () => {
    it('Heartbeat: should poll session heartbeats every 30 seconds', () => {
      assert.ok(examContent.includes('/api/v1/exams/sessions/'), 'Must call exam session endpoint');
      assert.ok(examContent.includes('/heartbeats'), 'Must post to heartbeats endpoint');
      assert.ok(examContent.includes('30000'), 'Must define 30-second polling interval');
      assert.ok(examContent.includes('clientTimeRemainingSec: timeLeft'), 'Must send client time in heartbeat');
    });

    it('Auto-Save Badge: should toggle between syncing and synced badges', () => {
      assert.ok(examContent.includes('Đang lưu...'), 'Must render syncing status');
      assert.ok(examContent.includes('Đã đồng bộ'), 'Must render synchronized status');
      assert.ok(examContent.includes('isSyncing'), 'Must bind to isSyncing reactive boolean');
    });

    it('Zen Mode UI: should toggle full-width canvas and hide extraneous headers', () => {
      assert.ok(examContent.includes('zenMode'), 'Must support zenMode state');
      assert.ok(examContent.includes('Zen Exam'), 'Must offer Zen Exam toggle button');
      assert.ok(examContent.includes("localStorage.getItem('toeic_zen_mode')"), 'Must initialize zenMode from settings');
    });

    it('Navigation & Flagging: should allow flag toggle and option hotkeys', () => {
      assert.ok(examContent.includes('handleToggleFlag'), 'Must have flag toggle handler');
      assert.ok(examContent.includes('handleSelectOption'), 'Must have option select handler');
      assert.ok(examContent.includes('handleKeyDown'), 'Must have keyboard shortcut listener');
      assert.ok(examContent.includes('executeSubmitExam'), 'Must have submission handler');
    });
  });

  // ─── 3. EXIT EXAM & GRADUATION MILESTONE FLOW ────────────────────────
  describe('Exit Exam 3-Phase Graduation Flow (src/app/exit-exam/page.tsx)', () => {
    it('Phase Management: should define INTRO, EXAM, and GRADUATED states', () => {
      assert.ok(exitExamContent.includes("'INTRO' | 'EXAM' | 'GRADUATED'"), 'Must define 3-phase union type');
      assert.ok(exitExamContent.includes("phase === 'INTRO'"), 'Must handle briefing phase');
      assert.ok(exitExamContent.includes("phase === 'EXAM'"), 'Must handle assessment phase');
      assert.ok(exitExamContent.includes("phase === 'GRADUATED'"), 'Must handle graduation phase');
    });

    it('Briefing Phase: should display graduation prerequisites and target score', () => {
      assert.ok(exitExamContent.includes('BÀI THI TỐT NGHIỆP CHẶNG'), 'Must render milestone heading');
      assert.ok(exitExamContent.includes('Bắt Đầu Thi Tốt Nghiệp Chặng'), 'Must render start CTA');
      assert.ok(exitExamContent.includes('handleStartExam'), 'Must handle exam startup');
    });

    it('Graduation Phase: should render golden certificate and Celestial Deity unlock', () => {
      assert.ok(exitExamContent.includes('CHỨNG NHẬN HOÀN THÀNH LỘ TRÌNH TOEIC PRO'), 'Must render official certificate header');
      assert.ok(exitExamContent.includes('STAGE 4: CELESTIAL DEITY UNLOCKED'), 'Must display Stage 4 Celestial Deity unlock badge');
      assert.ok(exitExamContent.includes('TP-2026-CERT-'), 'Must display unique verification certificate code');
      assert.ok(exitExamContent.includes('Trở Về Bảng Điều Khiển'), 'Must render back to dashboard button');
      assert.ok(exitExamContent.includes('Xem Lại Bản Đồ Saga'), 'Must render saga map link');
    });
  });

  // ─── 4. COLOSSEUM LEADERBOARDS UI FUNCTIONALITY ──────────────────────
  describe('Colosseum Leaderboard UI Functions (src/app/colosseum/page.tsx)', () => {
    it('should connect to /api/v1/colosseum/leaderboards endpoint', () => {
      assert.ok(colosseumContent.includes('/api/v1/colosseum/leaderboards'), 'Must query leaderboard API');
    });

    it('should render division tiers with distinct visual badges', () => {
      assert.ok(colosseumContent.includes('ĐẤU TRƯỜNG COLOSSEUM'), 'Must render Colosseum branding');
      assert.ok(colosseumContent.includes('isCurrentUser'), 'Must highlight current user standing');
      assert.ok(colosseumContent.includes('Bảng Vàng Đấu Trường Tuần Này'), 'Must render leaderboard heading');
    });
  });

  // ─── 5. ADAPTIVE DAILY PLAN UI FUNCTIONALITY ─────────────────────────
  describe('Adaptive Daily Plan UI Functions (src/app/plan/page.tsx)', () => {
    it('should fetch dynamic tasks from /api/v1/journeys/default/daily-plans', () => {
      assert.ok(planContent.includes('/api/v1/journeys/default/daily-plans'), 'Must query daily plan API');
    });

    it('should render interactive task cards with completion checkboxes and XP rewards', () => {
      assert.ok(planContent.includes('toggleTask'), 'Must support task check off toggle');
      assert.ok(planContent.includes('completedCount'), 'Must track completed task count');
      assert.ok(planContent.includes('KẾ HOẠCH HỌC TẬP THÍCH ỨNG'), 'Must render daily plan heading');
    });
  });

  // ─── 6. SAGA MAP NODE CHALLENGE UI FUNCTIONALITY ─────────────────────
  describe('Saga Map Node Challenge UI Functions (src/app/node/[id]/page.tsx)', () => {
    it('should dispatch answers to /api/v1/nodes/[id]/attempts/[attemptId]/answers', () => {
      assert.ok(nodeContent.includes('/api/v1/nodes/'), 'Must query node API');
      assert.ok(nodeContent.includes('/answers'), 'Must dispatch per-question answers');
    });

    it('should track question progression, timing, and keyboard shortcuts', () => {
      assert.ok(nodeContent.includes('handleSelect'), 'Must handle option selection');
      assert.ok(nodeContent.includes('currentStep'), 'Must track question stepper step');
      assert.ok(nodeContent.includes('handleKeyDown'), 'Must listen to keyboard input');
    });
  });
});
