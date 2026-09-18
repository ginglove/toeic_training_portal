import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { POST as registerPost } from '@/app/api/v1/auth/register/route';
import { POST as loginPost } from '@/app/api/v1/auth/login/route';
import { POST as refreshPost } from '@/app/api/v1/auth/refresh/route';
import { POST as diagnosticPost } from '@/app/api/v1/diagnostic/submissions/route';
import { POST as sessionPost } from '@/app/api/v1/exams/sessions/route';
import { POST as answerPost } from '@/app/api/v1/exams/sessions/[id]/answers/route';
import { POST as submitPost } from '@/app/api/v1/exams/sessions/[id]/submissions/route';
import { GET as getDueNotebook } from '@/app/api/v1/notebook/due/route';
import { POST as postReview } from '@/app/api/v1/notebook/reviews/route';
import { GET as getQuests } from '@/app/api/v1/quests/daily/route';
import { POST as claimQuest } from '@/app/api/v1/quests/[id]/claims/route';
import { POST as refillEnergy } from '@/app/api/v1/users/me/energy/refills/route';
import { POST as purchaseItem } from '@/app/api/v1/shop/purchases/route';

describe('End-to-End (E2E) Complete User Journey Testing', () => {
  const timestamp = Date.now();
  const testEmail = `e2e_student_${timestamp}@toeicpro.test`;
  const testPassword = 'Password123!@#';
  const testName = 'E2E Full Journey Learner';

  let accessToken: string;
  let refreshToken: string;
  let userId: string;
  let examId: string;
  let sessionId: string;
  let sampleQuestion: any;

  before(async () => {
    // Find an exam and question from seeded database
    const exam = await prisma.exam.findFirst({
      include: {
        questions: {
          include: { options: true },
        },
      },
    });
    if (exam && exam.questions.length > 0) {
      examId = exam.id;
      sampleQuestion = exam.questions[0];
    }
  });

  after(async () => {
    // Clean up created user and all associated test records
    if (userId) {
      await prisma.user.delete({ where: { id: userId } });
    }
  });

  describe('Journey 1: Account Registration & Authentication Lifecycle', () => {
    it('should register a new learner account with initial gamification profile', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
          name: testName,
        }),
      });

      const res = await registerPost(req);
      assert.equal(res.status, 201);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.user.email, testEmail);
      assert.ok(json.data.tokens.accessToken);
      assert.ok(json.data.tokens.refreshToken);

      userId = json.data.user.id;
      accessToken = json.data.tokens.accessToken;
      refreshToken = json.data.tokens.refreshToken;
    });

    it('should authenticate user with valid credentials and return fresh tokens', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
        }),
      });

      const res = await loginPost(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(json.data.tokens.accessToken);
      assert.ok(json.data.tokens.refreshToken);

      // Update tokens
      accessToken = json.data.tokens.accessToken;
      refreshToken = json.data.tokens.refreshToken;
    });

    it('should refresh access token using valid refresh token', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const res = await refreshPost(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(json.data.accessToken);

      accessToken = json.data.accessToken;
    });
  });

  describe('Journey 2: Adaptive Diagnostic Assessment & IRT Scoring', () => {
    it('should submit diagnostic answers and generate initial score profile', async () => {
      const diagnosticAnswers = [
        { questionId: 'diag_1', selectedOption: 'A', isCorrect: true, partNumber: 1 },
        { questionId: 'diag_2', selectedOption: 'C', isCorrect: true, partNumber: 2 },
        { questionId: 'diag_3', selectedOption: 'B', isCorrect: false, partNumber: 5 },
        { questionId: 'diag_4', selectedOption: 'D', isCorrect: true, partNumber: 6 },
      ];

      const req = new NextRequest('http://localhost:3005/api/v1/diagnostic/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          answers: diagnosticAnswers,
          durationSeconds: 300,
        }),
      });

      const res = await diagnosticPost(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(json.data.overallScore >= 10 && json.data.overallScore <= 990);
      assert.ok(json.data.listeningScore >= 5);
      assert.ok(json.data.readingScore >= 5);
      assert.ok(json.data.scoreRange);
    });
  });

  describe('Journey 3: Computer-Based Testing (CBT) Full Simulation & Auto SM-2 Sync', () => {
    it('should initialize a standardized CBT examination session', async () => {
      assert.ok(examId, 'Exam must exist in database');

      const req = new NextRequest('http://localhost:3005/api/v1/exams/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          examId,
          mode: 'PRACTICE_PART',
        }),
      });

      const res = await sessionPost(req);
      assert.equal(res.status, 201);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(json.data.sessionId);
      assert.ok(Array.isArray(json.data.questions));

      sessionId = json.data.sessionId;
    });

    it('should autosave student response to an in-flight exam session', async () => {
      assert.ok(sessionId && sampleQuestion, 'Session and question must exist');

      // Pick an incorrect option to verify mistake notebook sync
      const wrongOption = sampleQuestion.options.find((o: any) => !o.isCorrect) || { label: 'Z' };

      const req = new NextRequest(
        `http://localhost:3005/api/v1/exams/sessions/${sessionId}/answers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            questionId: sampleQuestion.id,
            selectedOption: wrongOption.label,
            isFlagged: true,
            clientSequence: 1,
            timeSpentMs: 4500,
          }),
        }
      );

      const res = await answerPost(req, { params: { id: sessionId } });
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.saved, true);
    });

    it('should finalize exam session, compute ETS Equated score, and log mistakes to SM-2 notebook', async () => {
      const req = new NextRequest(
        `http://localhost:3005/api/v1/exams/sessions/${sessionId}/submissions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            durationSeconds: 450,
          }),
        }
      );

      const res = await submitPost(req, { params: { id: sessionId } });
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(json.data.totalScore >= 10);
      assert.ok(json.data.listeningScore >= 5);
      assert.ok(json.data.readingScore >= 5);

      // Verify mistake was logged into MistakeNotebook for this user
      const mistake = await prisma.mistakeNotebook.findUnique({
        where: {
          userId_questionId: {
            userId,
            questionId: sampleQuestion.id,
          },
        },
      });
      assert.ok(mistake, 'Mistake should be automatically recorded in MistakeNotebook');
      assert.equal(mistake.easinessFactor, 2.5);
      assert.equal(mistake.repetitionNumber, 0);
      assert.equal(mistake.intervalDays, 1);
    });
  });

  describe('Journey 4: Spaced Repetition Review (SM-2 Flashcard Mastery)', () => {
    let notebookItemId: string;

    it('should retrieve due review items from Mistake Notebook', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/notebook/due', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const res = await getDueNotebook(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(Array.isArray(json.data));
      assert.ok(json.data.length >= 1, 'Due list should contain the logged mistake card');

      notebookItemId = json.data[0].id;
    });

    it('should submit perfect review quality (5) and update SM-2 schedule', async () => {
      assert.ok(notebookItemId, 'Notebook card must exist');

      const req = new NextRequest('http://localhost:3005/api/v1/notebook/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          notebookId: notebookItemId,
          quality: 5,
          timeSpentMs: 3200,
        }),
      });

      const res = await postReview(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.isCorrect, true);
      assert.equal(json.data.repetitionNumber, 1);
      assert.equal(json.data.intervalDays, 1);
      assert.equal(json.data.easinessFactor, 2.6); // 2.5 + 0.1
    });
  });

  describe('Journey 5: Gamification Economy, Quests, Energy & Shop', () => {
    let questToClaim: any;

    it('should fetch active daily quests with current progress', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/quests/daily', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const res = await getQuests(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(Array.isArray(json.data));
    });

    it('should claim completed quest reward and increment gems and EXP', async () => {
      const quest = await prisma.dailyQuest.findFirst();
      if (!quest) return;

      const userQuest = await prisma.userDailyQuest.create({
        data: {
          userId,
          questId: quest.id,
          assignedDate: new Date(),
          currentCount: quest.targetCount,
          isCompleted: true,
          isClaimed: false,
        },
      });
      questToClaim = userQuest;

      const req = new NextRequest(`http://localhost:3005/api/v1/quests/${userQuest.id}/claims`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const res = await claimQuest(req, { params: { id: userQuest.id } });
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.rewardGems, quest.rewardGems);
    });

    it('should purchase a shop item with gems and record in user inventory', async () => {
      // Find a shop item
      const item = await prisma.shopItem.findFirst();
      if (!item) return;

      // Ensure user has enough gems for the test
      await prisma.gamificationState.update({
        where: { userId },
        data: { gems: 200 },
      });

      const req = new NextRequest('http://localhost:3005/api/v1/shop/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ itemId: item.id }),
      });

      const res = await purchaseItem(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.itemId, item.id);

      // Verify inventory in DB
      const inv = await prisma.userInventory.findFirst({
        where: { userId, itemId: item.id },
      });
      assert.ok(inv, 'Purchased item must exist in user inventory');
      assert.ok(inv.quantity >= 1);
    });

    it('should refill energy to 5 using gems and enforce ceiling guard', async () => {
      // Set energy to 1, gems to 100
      await prisma.gamificationState.update({
        where: { userId },
        data: { energy: 1, gems: 100 },
      });

      const req = new NextRequest('http://localhost:3005/api/v1/users/me/energy/refills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ method: 'GEMS_PURCHASE' }),
      });

      const res = await refillEnergy(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.energy, 5);
      assert.equal(json.data.gems, 50); // 100 - 50
    });
  });
});
