import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateTokens } from '@/lib/auth';
import { GET as getExams } from '@/app/api/v1/exams/route';
import { GET as getExamById } from '@/app/api/v1/exams/[id]/route';
import { POST as createSession } from '@/app/api/v1/exams/sessions/route';
import { POST as postAnswer } from '@/app/api/v1/exams/sessions/[id]/answers/route';
import { POST as submitExam } from '@/app/api/v1/exams/sessions/[id]/submissions/route';

describe('Exam & CBT Session API Routes - Full TDD Coverage', () => {
  let testUser: any;
  let tokens: any;
  let examId: string;
  let sessionId: string;
  let sampleQuestionId: string;

  before(async () => {
    testUser = await prisma.user.create({
      data: {
        email: `tdd_exam_${Date.now()}@toeicpro.test`,
        passwordHash: 'dummy_hash',
        name: 'TDD Exam Tester',
        role: 'STUDENT',
        gamification: { create: { gems: 100, energy: 5 } },
      },
    });
    tokens = generateTokens({ userId: testUser.id, email: testUser.email, role: testUser.role });

    const exam = await prisma.exam.findFirst({
      include: { questions: { include: { options: true }, take: 1 } },
    });
    if (exam) {
      examId = exam.id;
      if (exam.questions.length > 0) {
        sampleQuestionId = exam.questions[0].id;
      }
    }
  });

  after(async () => {
    if (testUser?.id) {
      await prisma.attemptDetail.deleteMany({
        where: { attempt: { userId: testUser.id } },
      });
      await prisma.attempt.deleteMany({ where: { userId: testUser.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    }
  });

  // ─── LIST EXAMS ─────────────────────────────────────────────────────

  describe('GET /api/v1/exams', () => {
    it('should return a list of published exams with required fields', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/exams', {
        method: 'GET',
      });

      const res = await getExams(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(Array.isArray(json.data));

      if (json.data.length > 0) {
        const exam = json.data[0];
        assert.ok(exam.id);
        assert.ok(exam.title);
        assert.ok(typeof exam.totalQuestions === 'number');
        assert.ok(typeof exam.timeLimitMinutes === 'number');
        // Should not expose unpublished exams
        // (all returned exams are filtered by isPublished: true)
      }
    });
  });

  // ─── GET EXAM BY ID ─────────────────────────────────────────────────

  describe('GET /api/v1/exams/[id]', () => {
    it('should return 404 for non-existent exam ID', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/exams/nonexistent-id', {
        method: 'GET',
      });

      const res = await getExamById(req, { params: { id: 'nonexistent-id' } });
      assert.equal(res.status, 404);

      const json = await res.json();
      assert.equal(json.title, 'Not Found');
      assert.equal(json.detail, 'Exam not found.');
    });

    it('should return exam with questions and options for valid ID', async () => {
      assert.ok(examId, 'Seeded exam must exist');

      const req = new NextRequest(`http://localhost:3005/api/v1/exams/${examId}`, {
        method: 'GET',
      });

      const res = await getExamById(req, { params: { id: examId } });
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.id, examId);
      assert.ok(Array.isArray(json.data.questions));

      if (json.data.questions.length > 0) {
        const q = json.data.questions[0];
        assert.ok(q.id);
        assert.ok(Array.isArray(q.options));
        // Options should NOT expose isCorrect to client
        assert.equal(q.options[0].isCorrect, undefined);
      }
    });
  });

  // ─── CREATE EXAM SESSION ────────────────────────────────────────────

  describe('POST /api/v1/exams/sessions', () => {
    it('should reject session creation without authentication', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/exams/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examId }),
      });

      const res = await createSession(req);
      assert.equal(res.status, 401);
    });

    it('should reject session creation for non-existent exam', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/exams/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ examId: 'fake-exam-id-404' }),
      });

      const res = await createSession(req);
      assert.equal(res.status, 404);

      const json = await res.json();
      assert.equal(json.title, 'Not Found');
    });

    it('should create a new CBT session with questions for a valid exam', async () => {
      assert.ok(examId, 'Seeded exam must exist');

      const req = new NextRequest('http://localhost:3005/api/v1/exams/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ examId, mode: 'PRACTICE_PART' }),
      });

      const res = await createSession(req);
      assert.equal(res.status, 201);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(json.data.sessionId);
      assert.equal(json.data.examId, examId);
      assert.ok(Array.isArray(json.data.questions));
      assert.ok(json.data.timeLimitMinutes > 0);

      sessionId = json.data.sessionId;

      // Verify attempt record in DB
      const attempt = await prisma.attempt.findUnique({ where: { id: sessionId } });
      assert.ok(attempt);
      assert.equal(attempt.userId, testUser.id);
      assert.equal(attempt.status, 'IN_PROGRESS');
      assert.equal(attempt.mode, 'PRACTICE_PART');
    });

    it('should default mode to FULL_SIMULATION when not provided', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/exams/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ examId }), // no mode
      });

      const res = await createSession(req);
      assert.equal(res.status, 201);

      const json = await res.json();
      const attempt = await prisma.attempt.findUnique({ where: { id: json.data.sessionId } });
      assert.equal(attempt?.mode, 'FULL_SIMULATION');

      // Clean up
      await prisma.attempt.delete({ where: { id: json.data.sessionId } }).catch(() => {});
    });
  });

  // ─── AUTOSAVE ANSWER ────────────────────────────────────────────────

  describe('POST /api/v1/exams/sessions/[id]/answers', () => {
    it('should reject answer without authentication', async () => {
      const req = new NextRequest(
        `http://localhost:3005/api/v1/exams/sessions/${sessionId}/answers`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId: sampleQuestionId, selectedOption: 'A' }),
        }
      );

      const res = await postAnswer(req, { params: { id: sessionId } });
      assert.equal(res.status, 401);
    });

    it('should reject answer for non-existent session (400 Bad Request)', async () => {
      const req = new NextRequest(
        'http://localhost:3005/api/v1/exams/sessions/fake-session/answers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.accessToken}`,
          },
          body: JSON.stringify({ questionId: 'q1', selectedOption: 'A' }),
        }
      );

      const res = await postAnswer(req, { params: { id: 'fake-session' } });
      // findUnique returns null → 400 Bad Request
      assert.equal(res.status, 400);
    });

    it('should successfully autosave an answer with flag and timing metadata', async () => {
      assert.ok(sessionId && sampleQuestionId, 'Session and question must exist');

      const req = new NextRequest(
        `http://localhost:3005/api/v1/exams/sessions/${sessionId}/answers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.accessToken}`,
          },
          body: JSON.stringify({
            questionId: sampleQuestionId,
            selectedOption: 'B',
            isFlagged: true,
            clientSequence: 1,
            timeSpentMs: 5000,
          }),
        }
      );

      const res = await postAnswer(req, { params: { id: sessionId } });
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.saved, true);
      assert.equal(json.data.sessionId, sessionId);
      assert.equal(json.data.questionId, sampleQuestionId);
      assert.ok(json.data.timestamp);

      // Verify upserted into DB
      const detail = await prisma.attemptDetail.findUnique({
        where: {
          attemptId_questionId: {
            attemptId: sessionId,
            questionId: sampleQuestionId,
          },
        },
      });
      assert.ok(detail);
      assert.equal(detail.selectedOption, 'B');
      assert.equal(detail.isFlagged, true);
      assert.equal(detail.timeSpentMs, 5000);
    });

    it('should update (upsert) answer when re-submitted for same question', async () => {
      const req = new NextRequest(
        `http://localhost:3005/api/v1/exams/sessions/${sessionId}/answers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.accessToken}`,
          },
          body: JSON.stringify({
            questionId: sampleQuestionId,
            selectedOption: 'C', // Changed answer
            isFlagged: false,
            clientSequence: 2,
            timeSpentMs: 3000,
          }),
        }
      );

      const res = await postAnswer(req, { params: { id: sessionId } });
      assert.equal(res.status, 200);

      // Verify updated in DB
      const detail = await prisma.attemptDetail.findUnique({
        where: {
          attemptId_questionId: {
            attemptId: sessionId,
            questionId: sampleQuestionId,
          },
        },
      });
      assert.equal(detail?.selectedOption, 'C');
      assert.equal(detail?.isFlagged, false);
      assert.equal(detail?.clientSequence, 2);
    });
  });

  // ─── SUBMIT EXAM ───────────────────────────────────────────────────

  describe('POST /api/v1/exams/sessions/[id]/submissions', () => {
    it('should reject submission without authentication', async () => {
      const req = new NextRequest(
        `http://localhost:3005/api/v1/exams/sessions/${sessionId}/submissions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ durationSeconds: 300 }),
        }
      );

      const res = await submitExam(req, { params: { id: sessionId } });
      assert.equal(res.status, 401);
    });

    it('should reject submission for non-existent session', async () => {
      const req = new NextRequest(
        'http://localhost:3005/api/v1/exams/sessions/fake-session/submissions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.accessToken}`,
          },
          body: JSON.stringify({ durationSeconds: 300 }),
        }
      );

      const res = await submitExam(req, { params: { id: 'fake-session' } });
      assert.equal(res.status, 404);

      const json = await res.json();
      assert.equal(json.title, 'Not Found');
    });

    it('should successfully submit exam session with ETS equated scoring', async () => {
      const req = new NextRequest(
        `http://localhost:3005/api/v1/exams/sessions/${sessionId}/submissions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.accessToken}`,
          },
          body: JSON.stringify({ durationSeconds: 600 }),
        }
      );

      const res = await submitExam(req, { params: { id: sessionId } });
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.sessionId, sessionId);
      assert.ok(json.data.totalScore >= 10);
      assert.ok(json.data.listeningScore >= 5);
      assert.ok(json.data.readingScore >= 5);
      assert.ok(typeof json.data.expAwarded === 'number');
      assert.ok(json.data.completedAt);

      // Verify attempt is now SUBMITTED
      const attempt = await prisma.attempt.findUnique({ where: { id: sessionId } });
      assert.equal(attempt?.status, 'SUBMITTED');
    });

    it('should reject double submission of same exam session (ALREADY_SUBMITTED)', async () => {
      const req = new NextRequest(
        `http://localhost:3005/api/v1/exams/sessions/${sessionId}/submissions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.accessToken}`,
          },
          body: JSON.stringify({ durationSeconds: 600 }),
        }
      );

      const res = await submitExam(req, { params: { id: sessionId } });
      assert.equal(res.status, 400);

      const json = await res.json();
      assert.equal(json.title, 'Bad Request');
      assert.ok(json.detail.includes('already been submitted'));
    });

    it('should reject answer posting to already-submitted session', async () => {
      const req = new NextRequest(
        `http://localhost:3005/api/v1/exams/sessions/${sessionId}/answers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.accessToken}`,
          },
          body: JSON.stringify({
            questionId: sampleQuestionId,
            selectedOption: 'D',
          }),
        }
      );

      const res = await postAnswer(req, { params: { id: sessionId } });
      assert.equal(res.status, 400);

      const json = await res.json();
      assert.ok(json.detail.includes('closed or invalid'));
    });
  });
});
