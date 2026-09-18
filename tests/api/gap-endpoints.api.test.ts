import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateTokens } from '@/lib/auth';

// Handlers under test
import { POST as postHeartbeat } from '@/app/api/v1/exams/sessions/[id]/heartbeats/route';
import { POST as postNodeAnswer } from '@/app/api/v1/nodes/[id]/attempts/[attemptId]/answers/route';
import { GET as getDailyPlan } from '@/app/api/v1/journeys/[journeyId]/daily-plans/route';
import { POST as createExitAttempt } from '@/app/api/v1/journeys/[journeyId]/exit-exam/attempts/route';
import { POST as submitExitAttempt } from '@/app/api/v1/journeys/[journeyId]/exit-exam/attempts/[attemptId]/submissions/route';
import { GET as getCertificates } from '@/app/api/v1/journeys/[journeyId]/exit-exam/certificates/route';
import { GET as getLeaderboards } from '@/app/api/v1/colosseum/leaderboards/route';
import { GET as exportUserData } from '@/app/api/v1/users/me/export/route';
import { POST as postStreakFreeze } from '@/app/api/v1/users/me/streak/freeze/route';
import { POST as postNotebookAutoSync } from '@/app/api/v1/notebook/auto-sync/route';

describe('Gap Endpoints API Functional Tests - Full TDD Verification', () => {
  let testUser: any;
  let tokens: any;
  let authHeaders: HeadersInit;
  let testSession: any;
  let testNode: any;
  let testNodeAttempt: any;
  let testQuestion: any;
  let testJourney: any;

  before(async () => {
    testUser = await prisma.user.create({
      data: {
        email: `qa_tester_${Date.now()}@toeicpro.test`,
        passwordHash: 'dummy_hash',
        name: 'QA Full Automation Tester',
        role: 'STUDENT',
        gamification: {
          create: {
            gems: 250,
            energy: 5,
            currentStreak: 7,
            maxStreak: 12,
            weeklyExp: 1500,
          },
        },
      },
    });

    tokens = generateTokens({
      userId: testUser.id,
      email: testUser.email,
      role: testUser.role,
    });

    authHeaders = {
      Authorization: `Bearer ${tokens.accessToken}`,
      'Content-Type': 'application/json',
    };

    // Prepare an active CBT Exam Session
    const exam = await prisma.exam.findFirst();
    if (exam) {
      testSession = await prisma.attempt.create({
        data: {
          userId: testUser.id,
          examId: exam.id,
          mode: 'FULL_SIMULATION',
          status: 'IN_PROGRESS',
          totalDurationSeconds: 7200,
          startedAt: new Date(),
        },
      });
    }

    // Prepare Journey, Node, and Question
    testJourney = await prisma.userJourney.findFirst({
      include: { nodes: true },
    });

    testQuestion = await prisma.question.findFirst({
      include: { options: true },
    });

    if (testJourney && testJourney.nodes.length > 0) {
      testNode = testJourney.nodes[0];
      testNodeAttempt = await prisma.attempt.create({
        data: {
          userId: testUser.id,
          mode: 'PRACTICE_PART',
          status: 'IN_PROGRESS',
        },
      });
    }
  });

  after(async () => {
    if (testUser?.id) {
      await prisma.attemptDetail.deleteMany({ where: { attempt: { userId: testUser.id } } });
      await prisma.attempt.deleteMany({ where: { userId: testUser.id } });
      await prisma.certificate.deleteMany({ where: { userId: testUser.id } });
      await prisma.gamificationState.deleteMany({ where: { userId: testUser.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    }
  });

  // 1. CBT EXAM HEARTBEAT API
  describe('POST /api/v1/exams/sessions/[id]/heartbeats', () => {
    it('should reject heartbeat without authentication with 401', async () => {
      const req = new NextRequest('http://localhost:3000/api/v1/exams/sessions/dummy/heartbeats', {
        method: 'POST',
        body: JSON.stringify({ clientTimeRemainingSec: 7000 }),
      });
      const res = await postHeartbeat(req, { params: { id: 'dummy' } });
      assert.equal(res.status, 401);
    });

    it('should return 400 Bad Request for non-existent or closed session', async () => {
      const req = new NextRequest('http://localhost:3000/api/v1/exams/sessions/invalid-id/heartbeats', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ clientTimeRemainingSec: 7000 }),
      });
      const res = await postHeartbeat(req, { params: { id: 'invalid-id' } });
      assert.equal(res.status, 400);
    });

    it('should successfully synchronize heartbeat and return server time', async () => {
      if (!testSession) return;
      const req = new NextRequest(`http://localhost:3000/api/v1/exams/sessions/${testSession.id}/heartbeats`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ clientTimeRemainingSec: 7150, clientSequence: 2 }),
      });
      const res = await postHeartbeat(req, { params: { id: testSession.id } });
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.isAlive, true);
      assert.equal(json.data.clientSequence, 2);
      assert.ok(json.data.serverTimeRemainingSec !== undefined);
      assert.ok(json.data.serverTimestamp !== undefined);
    });
  });

  // 2. NODE QUESTION ANSWER TELEMETRY API
  describe('POST /api/v1/nodes/[id]/attempts/[attemptId]/answers', () => {
    it('should reject without authentication with 401', async () => {
      const req = new NextRequest('http://localhost:3000/api/v1/nodes/1/attempts/1/answers', {
        method: 'POST',
        body: JSON.stringify({ questionId: 'q1', selectedOption: 'A' }),
      });
      const res = await postNodeAnswer(req, { params: { id: '1', attemptId: '1' } });
      assert.equal(res.status, 401);
    });

    it('should validate missing questionId and return 400', async () => {
      if (!testNode || !testNodeAttempt) return;
      const req = new NextRequest(`http://localhost:3000/api/v1/nodes/${testNode.id}/attempts/${testNodeAttempt.id}/answers`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ selectedOption: 'A' }),
      });
      const res = await postNodeAnswer(req, { params: { id: testNode.id, attemptId: testNodeAttempt.id } });
      assert.equal(res.status, 400);
    });

    it('should persist answer telemetry and record in AttemptDetail', async () => {
      if (!testNode || !testNodeAttempt || !testQuestion) return;
      const req = new NextRequest(`http://localhost:3000/api/v1/nodes/${testNode.id}/attempts/${testNodeAttempt.id}/answers`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          questionId: testQuestion.id,
          selectedOption: 'A',
          timeSpentMs: 4500,
        }),
      });
      const res = await postNodeAnswer(req, { params: { id: testNode.id, attemptId: testNodeAttempt.id } });
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.questionId, testQuestion.id);
      assert.equal(json.data.selectedOption, 'A');

      // Verify in database
      const detail = await prisma.attemptDetail.findUnique({
        where: {
          attemptId_questionId: {
            attemptId: testNodeAttempt.id,
            questionId: testQuestion.id,
          },
        },
      });
      assert.ok(detail);
      assert.equal(detail.selectedOption, 'A');
      assert.equal(detail.timeSpentMs, 4500);
    });
  });

  // 3. ADAPTIVE 4-PART DAILY LEARNING PLAN API
  describe('GET /api/v1/journeys/[journeyId]/daily-plans', () => {
    it('should return 4-part balanced daily curriculum with tasks and metadata', async () => {
      const req = new NextRequest('http://localhost:3000/api/v1/journeys/default/daily-plans?day=5', {
        method: 'GET',
        headers: authHeaders,
      });
      const res = await getDailyPlan(req, { params: { journeyId: 'default' } });
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(Array.isArray(json.data.tasks));
      assert.equal(json.data.tasks.length, 4);
      assert.equal(json.data.day, 5);
      assert.equal(json.data.commitMinutes, 45);
      assert.ok(json.data.totalExpAvailable > 0);
    });
  });

  // 4. EXIT EXAM ATTEMPTS & GRADUATION SUBMISSION APIS
  describe('Exit Exam Lifecycle: Attempt -> Submit -> Certificate', () => {
    let exitAttemptId: string;

    it('should launch an exit exam attempt with anti-cheat sequence', async () => {
      const journeyId = testJourney?.id || 'default';
      const req = new NextRequest(`http://localhost:3000/api/v1/journeys/${journeyId}/exit-exam/attempts`, {
        method: 'POST',
        headers: authHeaders,
      });
      const res = await createExitAttempt(req, { params: { journeyId } });
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.mode, 'EXIT_EXAM');
      assert.ok(json.data.attemptId);
      assert.ok(Array.isArray(json.data.questions));
      exitAttemptId = json.data.attemptId;
    });

    it('should grade exit exam submission and unlock Stage 4 Celestial Deity', async () => {
      if (!exitAttemptId) return;
      const journeyId = testJourney?.id || 'default';
      const req = new NextRequest(`http://localhost:3000/api/v1/journeys/${journeyId}/exit-exam/attempts/${exitAttemptId}/submissions`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          durationSeconds: 1200,
          answers: [
            { questionId: testQuestion?.id || 'q1', selectedOption: 'A' },
          ],
        }),
      });
      const res = await submitExitAttempt(req, { params: { journeyId, attemptId: exitAttemptId } });
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.studentName, 'QA Full Automation Tester');
      assert.ok(json.data.certificateCode.startsWith('TP-2026-CERT-'));
      assert.equal(json.data.ascension.newStage, 4);
      assert.equal(json.data.ascension.stageTitle, 'Celestial Deity (Thần Linh)');
    });

    it('should retrieve issued graduation certificate', async () => {
      const journeyId = testJourney?.id || 'default';
      const req = new NextRequest(`http://localhost:3000/api/v1/journeys/${journeyId}/exit-exam/certificates`, {
        method: 'GET',
        headers: authHeaders,
      });
      const res = await getCertificates(req, { params: { journeyId } });
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.hasCertificate, true);
      assert.ok(json.data.certificate);
      assert.equal(json.data.certificate.studentName, 'QA Full Automation Tester');
    });
  });

  // 5. COLOSSEUM LEADERBOARDS API
  describe('GET /api/v1/colosseum/leaderboards', () => {
    it('should return weekly leaderboards with division tiers and current user rank', async () => {
      const req = new NextRequest('http://localhost:3000/api/v1/colosseum/leaderboards', {
        method: 'GET',
        headers: authHeaders,
      });
      const res = await getLeaderboards(req);
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(Array.isArray(json.data.leaderboard));
      assert.ok(json.data.currentUserRank !== undefined);
      assert.ok(json.data.weekNumber > 0);
      assert.ok(json.data.leagueTitle);
    });
  });

  // 6. PDPD / GDPR USER DATA PORTABILITY EXPORT API
  describe('GET /api/v1/users/me/export', () => {
    it('should export complete personal data payload with compliance checksum', async () => {
      const req = new NextRequest('http://localhost:3000/api/v1/users/me/export', {
        method: 'GET',
        headers: authHeaders,
      });
      const res = await exportUserData(req);
      assert.equal(res.status, 200);
      assert.equal(res.headers.get('content-type'), 'application/json');
      assert.ok(res.headers.get('content-disposition')?.includes('attachment'));

      const json = await res.json();
      assert.ok(json.exportMetadata);
      assert.ok(json.exportMetadata.standard.includes('Decree 13'));
      assert.ok(json.userProfile);
      assert.equal(json.userProfile.email, testUser.email);
    });
  });

  // 7. STREAK FREEZE API
  describe('POST /api/v1/users/me/streak/freeze', () => {
    it('should activate streak freeze shield or report already active shield', async () => {
      const req = new NextRequest('http://localhost:3000/api/v1/users/me/streak/freeze', {
        method: 'POST',
        headers: authHeaders,
      });
      const res = await postStreakFreeze(req);
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(json.data.activeShieldCount >= 1);
    });
  });

  // 8. NOTEBOOK AUTO-SYNC API
  describe('POST /api/v1/notebook/auto-sync', () => {
    it('should handle empty question list gracefully', async () => {
      const req = new NextRequest('http://localhost:3000/api/v1/notebook/auto-sync', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ questionIds: [] }),
      });
      const res = await postNotebookAutoSync(req);
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.syncedCount, 0);
    });

    it('should auto-sync mistake questions into SM-2 notebook', async () => {
      const q = await prisma.question.findFirst();
      if (!q) return;

      const req = new NextRequest('http://localhost:3000/api/v1/notebook/auto-sync', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ questionIds: [q.id] }),
      });
      const res = await postNotebookAutoSync(req);
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.syncedCount, 1);
      assert.ok(json.data.nextReviewDate);
    });
  });
});
