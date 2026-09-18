import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateTokens } from '@/lib/auth';
import { POST as diagnosticPost } from '@/app/api/v1/diagnostic/submissions/route';

describe('Diagnostic IRT Assessment API - Full TDD Coverage', () => {
  let testUser: any;
  let tokens: any;

  before(async () => {
    testUser = await prisma.user.create({
      data: {
        email: `tdd_diag_${Date.now()}@toeicpro.test`,
        passwordHash: 'dummy_hash',
        name: 'TDD Diagnostic Tester',
        role: 'STUDENT',
        gamification: { create: { gems: 50, energy: 5 } },
      },
    });
    tokens = generateTokens({ userId: testUser.id, email: testUser.email, role: testUser.role });
  });

  after(async () => {
    if (testUser?.id) {
      await prisma.diagnosticProfile.deleteMany({ where: { userId: testUser.id } });
      await prisma.attempt.deleteMany({ where: { userId: testUser.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    }
  });

  describe('POST /api/v1/diagnostic/submissions', () => {
    it('should reject diagnostic submission without authentication', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/diagnostic/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: [{ questionId: 'q1', selectedOption: 'A' }] }),
      });

      const res = await diagnosticPost(req);
      assert.equal(res.status, 401);
    });

    it('should reject diagnostic submission with empty answers array', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/diagnostic/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ answers: [] }),
      });

      const res = await diagnosticPost(req);
      assert.equal(res.status, 400);

      const json = await res.json();
      assert.equal(json.title, 'Bad Request');
    });

    it('should reject diagnostic submission with non-array answers', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/diagnostic/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ answers: 'not-an-array' }),
      });

      const res = await diagnosticPost(req);
      assert.equal(res.status, 400);
    });

    it('should successfully process diagnostic with client-generated sample answers', async () => {
      const diagnosticAnswers = [
        { questionId: 'sample_1', selectedOption: 'A', isCorrect: true, partNumber: 1 },
        { questionId: 'sample_2', selectedOption: 'B', isCorrect: true, partNumber: 2 },
        { questionId: 'sample_3', selectedOption: 'C', isCorrect: false, partNumber: 3 },
        { questionId: 'sample_4', selectedOption: 'D', isCorrect: true, partNumber: 5 },
        { questionId: 'sample_5', selectedOption: 'A', isCorrect: false, partNumber: 6 },
        { questionId: 'sample_6', selectedOption: 'B', isCorrect: true, partNumber: 7 },
      ];

      const req = new NextRequest('http://localhost:3005/api/v1/diagnostic/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ answers: diagnosticAnswers, durationSeconds: 300 }),
      });

      const res = await diagnosticPost(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(json.data.diagnosticProfileId);
      assert.ok(json.data.overallScore >= 10 && json.data.overallScore <= 990);
      assert.ok(json.data.listeningScore >= 5 && json.data.listeningScore <= 495);
      assert.ok(json.data.readingScore >= 5 && json.data.readingScore <= 495);
      assert.ok(typeof json.data.thetaListening === 'number');
      assert.ok(typeof json.data.thetaReading === 'number');
      assert.equal(json.data.sem, 15);
      assert.ok(json.data.scoreRange.includes('–'));
      assert.ok(json.data.testedAt);

      // Verify diagnostic profile persisted
      const profile = await prisma.diagnosticProfile.findUnique({
        where: { userId: testUser.id },
      });
      assert.ok(profile);
      assert.equal(profile.overallScore, json.data.overallScore);
      assert.equal(profile.listeningScore, json.data.listeningScore);
      assert.equal(profile.readingScore, json.data.readingScore);

      // Verify attempt record created
      const attempt = await prisma.attempt.findFirst({
        where: { userId: testUser.id, mode: 'DIAGNOSTIC' },
      });
      assert.ok(attempt);
      assert.equal(attempt.status, 'SUBMITTED');
      assert.equal(attempt.totalDurationSeconds, 300);
    });

    it('should upsert diagnostic profile on subsequent submissions', async () => {
      const diagnosticAnswers = [
        { questionId: 'resample_1', selectedOption: 'A', isCorrect: true, partNumber: 1 },
        { questionId: 'resample_2', selectedOption: 'B', isCorrect: true, partNumber: 5 },
      ];

      const req = new NextRequest('http://localhost:3005/api/v1/diagnostic/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ answers: diagnosticAnswers, durationSeconds: 120 }),
      });

      const res = await diagnosticPost(req);
      assert.equal(res.status, 200);

      // Verify only one diagnostic profile exists (upsert, not duplicate)
      const profiles = await prisma.diagnosticProfile.findMany({
        where: { userId: testUser.id },
      });
      assert.equal(profiles.length, 1);
    });

    it('should compute correct IRT theta estimates with diverse part distributions', async () => {
      // All correct listening, all wrong reading
      const answers = [
        { questionId: 'irt_1', isCorrect: true, partNumber: 1 },
        { questionId: 'irt_2', isCorrect: true, partNumber: 2 },
        { questionId: 'irt_3', isCorrect: true, partNumber: 3 },
        { questionId: 'irt_4', isCorrect: true, partNumber: 4 },
        { questionId: 'irt_5', isCorrect: false, partNumber: 5 },
        { questionId: 'irt_6', isCorrect: false, partNumber: 6 },
        { questionId: 'irt_7', isCorrect: false, partNumber: 7 },
      ];

      const req = new NextRequest('http://localhost:3005/api/v1/diagnostic/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ answers, durationSeconds: 200 }),
      });

      const res = await diagnosticPost(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      // Listening theta should be positive (all correct)
      assert.ok(json.data.thetaListening > 0, 'Listening theta should be positive for all-correct');
      // Reading theta should be negative (all wrong)
      assert.ok(json.data.thetaReading < 0, 'Reading theta should be negative for all-wrong');
      // Listening score > reading score
      assert.ok(json.data.listeningScore > json.data.readingScore);
    });
  });
});
