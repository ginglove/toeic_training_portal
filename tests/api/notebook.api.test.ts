import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateTokens } from '@/lib/auth';
import { GET as getDueItems } from '@/app/api/v1/notebook/due/route';
import { POST as postReview } from '@/app/api/v1/notebook/reviews/route';

describe('Notebook & Spaced Repetition API Routes - Full TDD Coverage', () => {
  let testUser: any;
  let tokens: any;
  let otherUser: any;
  let otherTokens: any;
  let notebookItemId: string;
  let sampleQuestionId: string;

  before(async () => {
    testUser = await prisma.user.create({
      data: {
        email: `tdd_notebook_${Date.now()}@toeicpro.test`,
        passwordHash: 'dummy_hash',
        name: 'TDD Notebook Tester',
        role: 'STUDENT',
        gamification: { create: { gems: 50, energy: 5 } },
      },
    });
    tokens = generateTokens({ userId: testUser.id, email: testUser.email, role: testUser.role });

    otherUser = await prisma.user.create({
      data: {
        email: `tdd_nb_other_${Date.now()}@toeicpro.test`,
        passwordHash: 'dummy_hash',
        name: 'TDD Other User',
        role: 'STUDENT',
        gamification: { create: { gems: 50, energy: 5 } },
      },
    });
    otherTokens = generateTokens({ userId: otherUser.id, email: otherUser.email, role: otherUser.role });

    // Find a question to use
    const question = await prisma.question.findFirst();
    if (question) {
      sampleQuestionId = question.id;

      // Create a mistake notebook entry with due date in the past
      const item = await prisma.mistakeNotebook.create({
        data: {
          userId: testUser.id,
          questionId: question.id,
          easinessFactor: 2.5,
          repetitionNumber: 0,
          intervalDays: 1,
          nextReviewDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
        },
      });
      notebookItemId = item.id;
    }
  });

  after(async () => {
    if (testUser?.id) {
      await prisma.reviewHistory.deleteMany({
        where: { notebook: { userId: testUser.id } },
      });
      await prisma.mistakeNotebook.deleteMany({ where: { userId: testUser.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    }
    if (otherUser?.id) {
      await prisma.user.delete({ where: { id: otherUser.id } });
    }
  });

  // ─── DUE ITEMS ──────────────────────────────────────────────────────

  describe('GET /api/v1/notebook/due', () => {
    it('should reject without authentication', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/notebook/due', {
        method: 'GET',
      });

      const res = await getDueItems(req);
      assert.equal(res.status, 401);
    });

    it('should return due review items with question details', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/notebook/due', {
        method: 'GET',
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });

      const res = await getDueItems(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(Array.isArray(json.data));
      assert.ok(json.data.length >= 1, 'Should have at least 1 due item');

      const item = json.data[0];
      assert.ok(item.id);
      assert.ok(item.questionId);
      assert.equal(item.easinessFactor, 2.5);
      assert.equal(item.repetitionNumber, 0);
      assert.equal(item.intervalDays, 1);
      assert.ok(item.question);
      assert.ok(item.question.questionText);
      assert.ok(Array.isArray(item.question.options));

      // Options should include isCorrect for review feedback
      if (item.question.options.length > 0) {
        assert.ok(typeof item.question.options[0].isCorrect === 'boolean');
      }
    });

    it('should return empty array for user with no due items', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/notebook/due', {
        method: 'GET',
        headers: { Authorization: `Bearer ${otherTokens.accessToken}` },
      });

      const res = await getDueItems(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.ok(Array.isArray(json.data));
      assert.equal(json.data.length, 0);
    });

    it('should NOT return items with future nextReviewDate', async () => {
      // Find a distinct question
      const secondQuestion = await prisma.question.findFirst({
        where: { id: { not: sampleQuestionId } },
      });
      if (!secondQuestion) return;

      const futureItem = await prisma.mistakeNotebook.create({
        data: {
          userId: testUser.id,
          questionId: secondQuestion.id,
          easinessFactor: 2.5,
          repetitionNumber: 1,
          intervalDays: 30,
          nextReviewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      const req = new NextRequest('http://localhost:3005/api/v1/notebook/due', {
        method: 'GET',
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });

      const res = await getDueItems(req);
      const json = await res.json();

      // Future items should not appear
      const hasFutureItem = json.data.some((d: any) => d.id === futureItem.id);
      assert.equal(hasFutureItem, false, 'Future review items should not appear in due list');

      await prisma.mistakeNotebook.delete({ where: { id: futureItem.id } });
    });
  });

  // ─── REVIEW SUBMISSION ──────────────────────────────────────────────

  describe('POST /api/v1/notebook/reviews', () => {
    it('should reject without authentication', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/notebook/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notebookId: notebookItemId, quality: 5 }),
      });

      const res = await postReview(req);
      assert.equal(res.status, 401);
    });

    it('should reject review with quality below 1', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/notebook/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ notebookId: notebookItemId, quality: 0 }),
      });

      const res = await postReview(req);
      assert.equal(res.status, 400);
    });

    it('should reject review with quality above 5', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/notebook/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ notebookId: notebookItemId, quality: 6 }),
      });

      const res = await postReview(req);
      assert.equal(res.status, 400);
    });

    it('should reject review with non-numeric quality', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/notebook/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ notebookId: notebookItemId, quality: 'excellent' }),
      });

      const res = await postReview(req);
      assert.equal(res.status, 400);
    });

    it('should reject review for non-existent notebook item', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/notebook/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ notebookId: 'fake-id', quality: 4 }),
      });

      const res = await postReview(req);
      assert.equal(res.status, 404);

      const json = await res.json();
      assert.equal(json.title, 'Not Found');
    });

    it('should reject review for another users notebook item (FORBIDDEN)', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/notebook/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${otherTokens.accessToken}`, // Other user's token
        },
        body: JSON.stringify({ notebookId: notebookItemId, quality: 5 }),
      });

      const res = await postReview(req);
      assert.equal(res.status, 403);

      const json = await res.json();
      assert.equal(json.title, 'Forbidden');
    });

    it('should successfully record perfect review (quality=5) and update SM-2 schedule', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/notebook/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({
          notebookId: notebookItemId,
          quality: 5,
          timeSpentMs: 3000,
        }),
      });

      const res = await postReview(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.notebookId, notebookItemId);
      assert.equal(json.data.isCorrect, true); // quality >= 3
      assert.equal(json.data.repetitionNumber, 1);
      assert.equal(json.data.intervalDays, 1); // First rep
      assert.equal(json.data.easinessFactor, 2.6); // 2.5 + 0.1

      // Verify review history created
      const history = await prisma.reviewHistory.findFirst({
        where: { notebookId: notebookItemId },
      });
      assert.ok(history);
      assert.equal(history.calculatedQuality, 5);
      assert.equal(history.timeSpentMs, 3000);
      assert.equal(history.isCorrect, true);
    });

    it('should correctly handle failure review (quality=1) resetting repetition count', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/notebook/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({
          notebookId: notebookItemId,
          quality: 1,
          timeSpentMs: 8000,
        }),
      });

      const res = await postReview(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.data.isCorrect, false); // quality < 3
      assert.equal(json.data.repetitionNumber, 0); // Reset
      assert.equal(json.data.intervalDays, 1); // Reset to 1 day
    });
  });
});
