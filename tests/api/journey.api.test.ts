import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateTokens } from '@/lib/auth';
import { GET as getJourneyMap } from '@/app/api/v1/journeys/[journeyId]/maps/route';
import { POST as startNodeAttempt } from '@/app/api/v1/nodes/[id]/attempts/route';
import { POST as completeNode } from '@/app/api/v1/nodes/[id]/attempts/[attemptId]/completion/route';

describe('Journey Map & Node Progression API Routes - Full TDD Coverage', () => {
  let testUser: any;
  let tokens: any;
  let journeyId: string;
  let nodeId: string;
  let attemptId: string;

  before(async () => {
    testUser = await prisma.user.create({
      data: {
        email: `tdd_journey_${Date.now()}@toeicpro.test`,
        passwordHash: 'dummy_hash',
        name: 'TDD Journey Tester',
        role: 'STUDENT',
        gamification: { create: { gems: 100, energy: 5 } },
      },
    });
    tokens = generateTokens({ userId: testUser.id, email: testUser.email, role: testUser.role });

    // Create a test journey with nodes and guardian
    const journey = await prisma.userJourney.create({
      data: {
        userId: testUser.id,
        targetScore: 750,
        initialScore: 450,
        predictedScore: 500,
        currentDay: 1,
        durationDays: 30,
        mode: 'STANDARD',
        status: 'ACTIVE',
        guardian: {
          create: {
            name: 'Sparky',
            stage: 1,
            spriteUrl: '/sprites/sparky-1.png',
            evolutionProgress: 0.1,
          },
        },
        nodes: {
          create: [
            {
              nodeIndex: 0,
              dayIndex: 1,
              nodeType: 'WARMUP',
              title: 'TDD Test Node 1 - Part 5 Grammar',
              coordXPercent: 50,
              coordYIndex: 0,
              biomeTheme: 'VERDANT_FOREST',
              targetPart: 5,
              questionCount: 4,
              minStarsRequired: 0,
              status: 'CURRENT',
            },
            {
              nodeIndex: 1,
              dayIndex: 1,
              nodeType: 'SKILL_DRILL',
              title: 'TDD Test Node 2 - Part 5 Practice',
              coordXPercent: 70,
              coordYIndex: 1,
              biomeTheme: 'VERDANT_FOREST',
              targetPart: 5,
              questionCount: 4,
              minStarsRequired: 1,
              status: 'LOCKED',
            },
          ],
        },
      },
      include: { nodes: true },
    });

    journeyId = journey.id;
    nodeId = journey.nodes[0].id;

    // Set activeNodeId
    await prisma.userJourney.update({
      where: { id: journeyId },
      data: { activeNodeId: nodeId },
    });
  });

  after(async () => {
    if (testUser?.id) {
      // Clean up in dependency order
      await prisma.attemptDetail.deleteMany({
        where: { attempt: { userId: testUser.id } },
      });
      await prisma.attempt.deleteMany({ where: { userId: testUser.id } });
      await prisma.userNodeProgress.deleteMany({
        where: { node: { journey: { userId: testUser.id } } },
      });
      await prisma.mapNode.deleteMany({
        where: { journey: { userId: testUser.id } },
      });
      await prisma.userJourney.deleteMany({ where: { userId: testUser.id } });
      await prisma.mistakeNotebook.deleteMany({ where: { userId: testUser.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    }
  });

  // ─── JOURNEY MAP ────────────────────────────────────────────────────

  describe('GET /api/v1/journeys/[journeyId]/maps', () => {
    it('should return 404 for non-existent journey', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/journeys/fake-journey/maps', {
        method: 'GET',
      });

      const res = await getJourneyMap(req, { params: { journeyId: 'fake-journey' } });
      assert.equal(res.status, 404);

      const json = await res.json();
      assert.equal(json.title, 'Not Found');
      assert.equal(json.detail, 'Journey not found.');
    });

    it('should return full journey map with ordered nodes and guardian', async () => {
      const req = new NextRequest(`http://localhost:3005/api/v1/journeys/${journeyId}/maps`, {
        method: 'GET',
      });

      const res = await getJourneyMap(req, { params: { journeyId } });
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.journeyId, journeyId);
      assert.equal(json.data.targetScore, 750);
      assert.equal(json.data.currentDay, 1);
      assert.equal(json.data.durationDays, 30);
      assert.equal(json.data.status, 'ACTIVE');
      assert.equal(json.data.mode, 'STANDARD');

      // Nodes
      assert.ok(Array.isArray(json.data.nodes));
      assert.equal(json.data.nodes.length, 2);

      // First node should be CURRENT
      const node0 = json.data.nodes[0];
      assert.equal(node0.nodeIndex, 0);
      assert.equal(node0.status, 'CURRENT');
      assert.equal(node0.nodeType, 'WARMUP');
      assert.equal(node0.targetPart, 5);
      assert.equal(node0.questionCount, 4);
      assert.equal(node0.starsEarned, 0); // No progress yet
      assert.equal(node0.isCompleted, false);

      // Second node should be LOCKED
      assert.equal(json.data.nodes[1].status, 'LOCKED');

      // Nodes ordered by nodeIndex
      assert.ok(json.data.nodes[0].nodeIndex < json.data.nodes[1].nodeIndex);
    });
  });

  // ─── NODE ATTEMPTS (START) ──────────────────────────────────────────

  describe('POST /api/v1/nodes/[id]/attempts', () => {
    it('should reject without authentication', async () => {
      const req = new NextRequest(`http://localhost:3005/api/v1/nodes/${nodeId}/attempts`, {
        method: 'POST',
      });

      const res = await startNodeAttempt(req, { params: { id: nodeId } });
      assert.equal(res.status, 401);
    });

    it('should return 404 for non-existent node', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/nodes/fake-node/attempts', {
        method: 'POST',
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });

      const res = await startNodeAttempt(req, { params: { id: 'fake-node' } });
      assert.equal(res.status, 404);
    });

    it('should reject attempt when energy is 0', async () => {
      // Set energy to 0
      await prisma.gamificationState.update({
        where: { userId: testUser.id },
        data: { energy: 0 },
      });

      const req = new NextRequest(`http://localhost:3005/api/v1/nodes/${nodeId}/attempts`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });

      const res = await startNodeAttempt(req, { params: { id: nodeId } });
      assert.equal(res.status, 403);

      const json = await res.json();
      assert.equal(json.title, 'Energy Depleted');

      // Restore energy
      await prisma.gamificationState.update({
        where: { userId: testUser.id },
        data: { energy: 5 },
      });
    });

    it('should create attempt, deduct 1 energy, and return questions', async () => {
      const beforeState = await prisma.gamificationState.findUnique({ where: { userId: testUser.id } });

      const req = new NextRequest(`http://localhost:3005/api/v1/nodes/${nodeId}/attempts`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });

      const res = await startNodeAttempt(req, { params: { id: nodeId } });
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(json.data.attemptId);
      assert.equal(json.data.nodeId, nodeId);
      assert.equal(json.data.nodeType, 'WARMUP');
      assert.equal(json.data.targetPart, 5);
      assert.ok(Array.isArray(json.data.questions));

      attemptId = json.data.attemptId;

      // Verify energy deducted by 1
      const afterState = await prisma.gamificationState.findUnique({ where: { userId: testUser.id } });
      assert.equal(afterState!.energy, beforeState!.energy - 1);

      // Verify attempt created in DB
      const attempt = await prisma.attempt.findUnique({ where: { id: attemptId } });
      assert.ok(attempt);
      assert.equal(attempt.userId, testUser.id);
      assert.equal(attempt.status, 'IN_PROGRESS');
      assert.equal(attempt.mode, 'PRACTICE_PART');
    });
  });

  // ─── NODE COMPLETION ────────────────────────────────────────────────

  describe('POST /api/v1/nodes/[id]/attempts/[attemptId]/completion', () => {
    it('should reject without authentication', async () => {
      const req = new NextRequest(
        `http://localhost:3005/api/v1/nodes/${nodeId}/attempts/${attemptId}/completion`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: [], durationSeconds: 60 }),
        }
      );

      const res = await completeNode(req, { params: { id: nodeId, attemptId } });
      assert.equal(res.status, 401);
    });

    it('should reject for non-existent attempt (FORBIDDEN)', async () => {
      const req = new NextRequest(
        `http://localhost:3005/api/v1/nodes/${nodeId}/attempts/fake-attempt/completion`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.accessToken}`,
          },
          body: JSON.stringify({ answers: [], durationSeconds: 60 }),
        }
      );

      const res = await completeNode(req, { params: { id: nodeId, attemptId: 'fake-attempt' } });
      assert.equal(res.status, 403);
    });

    it('should complete node, award stars/gems/exp, record mistakes, and unlock next node', async () => {
      // Get a question to submit answers for
      const questions = await prisma.question.findMany({
        where: { partNumber: 5 },
        include: { options: true },
        take: 4,
      });

      // Submit 3 correct, 1 wrong
      const answers = questions.map((q, i) => {
        const correctOpt = q.options.find(o => o.isCorrect);
        const wrongOpt = q.options.find(o => !o.isCorrect);
        return {
          questionId: q.id,
          selectedOption: i < 3 ? correctOpt?.label || 'A' : wrongOpt?.label || 'Z',
        };
      });

      const beforeUser = await prisma.user.findUnique({ where: { id: testUser.id } });
      const beforeGamif = await prisma.gamificationState.findUnique({ where: { userId: testUser.id } });

      const req = new NextRequest(
        `http://localhost:3005/api/v1/nodes/${nodeId}/attempts/${attemptId}/completion`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.accessToken}`,
          },
          body: JSON.stringify({ answers, durationSeconds: 120 }),
        }
      );

      const res = await completeNode(req, { params: { id: nodeId, attemptId } });
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.nodeId, nodeId);
      assert.equal(json.data.attemptId, attemptId);
      assert.ok(json.data.starsEarned >= 1);
      assert.ok(json.data.accuracy >= 0 && json.data.accuracy <= 100);
      assert.ok(json.data.expEarned > 0);
      assert.ok(json.data.gemsEarned > 0);
      assert.ok(typeof json.data.totalQuestions === 'number');
      assert.ok(typeof json.data.correctCount === 'number');

      // Verify node is now COMPLETED
      const completedNode = await prisma.mapNode.findUnique({ where: { id: nodeId } });
      assert.equal(completedNode?.status, 'COMPLETED');

      // Verify next node is now CURRENT
      if (json.data.nextUnlockedNodeId) {
        const nextNode = await prisma.mapNode.findUnique({ where: { id: json.data.nextUnlockedNodeId } });
        assert.equal(nextNode?.status, 'CURRENT');
      }

      // Verify gamification rewards
      const afterGamif = await prisma.gamificationState.findUnique({ where: { userId: testUser.id } });
      assert.ok(afterGamif!.gems > beforeGamif!.gems, 'Gems should increase');

      // Verify EXP awarded
      const afterUser = await prisma.user.findUnique({ where: { id: testUser.id } });
      assert.ok(afterUser!.totalExp > beforeUser!.totalExp, 'EXP should increase');

      // Verify attempt is now SUBMITTED
      const updatedAttempt = await prisma.attempt.findUnique({ where: { id: attemptId } });
      assert.equal(updatedAttempt?.status, 'SUBMITTED');

      // Verify mistake logged for the wrong answer
      if (questions.length >= 4) {
        const mistake = await prisma.mistakeNotebook.findUnique({
          where: {
            userId_questionId: {
              userId: testUser.id,
              questionId: questions[3].id,
            },
          },
        });
        assert.ok(mistake, 'Wrong answer should be recorded in mistake notebook');
      }
    });

    it('should reject re-completion of already-submitted attempt', async () => {
      const req = new NextRequest(
        `http://localhost:3005/api/v1/nodes/${nodeId}/attempts/${attemptId}/completion`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.accessToken}`,
          },
          body: JSON.stringify({ answers: [], durationSeconds: 60 }),
        }
      );

      const res = await completeNode(req, { params: { id: nodeId, attemptId } });
      assert.equal(res.status, 400);

      const json = await res.json();
      assert.equal(json.title, 'Bad Request');
      assert.ok(json.detail.includes('already been completed'));
    });
  });
});
