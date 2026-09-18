import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateTokens } from '@/lib/auth';
import { GET as getQuests } from '@/app/api/v1/quests/daily/route';
import { POST as claimQuest } from '@/app/api/v1/quests/[id]/claims/route';
import { GET as getShopItems } from '@/app/api/v1/shop/items/route';
import { POST as purchaseItem } from '@/app/api/v1/shop/purchases/route';
import { POST as refillEnergy } from '@/app/api/v1/users/me/energy/refills/route';
import { GET as getDashboard } from '@/app/api/v1/users/me/dashboard/route';

describe('Gamification, Shop, Quests & Dashboard API Routes - Full TDD Coverage', () => {
  let testUser: any;
  let tokens: any;
  let otherUser: any;
  let otherTokens: any;
  let claimedUserQuestId: string;

  before(async () => {
    testUser = await prisma.user.create({
      data: {
        email: `tdd_gamify_${Date.now()}@toeicpro.test`,
        passwordHash: 'dummy_hash',
        name: 'TDD Gamification Tester',
        role: 'STUDENT',
        gamification: { create: { gems: 200, energy: 3, currentStreak: 5, maxStreak: 10 } },
      },
    });
    tokens = generateTokens({ userId: testUser.id, email: testUser.email, role: testUser.role });

    otherUser = await prisma.user.create({
      data: {
        email: `tdd_gamify_other_${Date.now()}@toeicpro.test`,
        passwordHash: 'dummy_hash',
        name: 'TDD Gamify Other',
        role: 'STUDENT',
        gamification: { create: { gems: 50, energy: 5 } },
      },
    });
    otherTokens = generateTokens({ userId: otherUser.id, email: otherUser.email, role: otherUser.role });
  });

  after(async () => {
    if (testUser?.id) {
      await prisma.userDailyQuest.deleteMany({ where: { userId: testUser.id } });
      await prisma.userInventory.deleteMany({ where: { userId: testUser.id } });
      await prisma.user.delete({ where: { id: testUser.id } });
    }
    if (otherUser?.id) {
      await prisma.userDailyQuest.deleteMany({ where: { userId: otherUser.id } });
      await prisma.user.delete({ where: { id: otherUser.id } });
    }
  });

  // ─── DAILY QUESTS ───────────────────────────────────────────────────

  describe('GET /api/v1/quests/daily', () => {
    it('should reject without authentication', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/quests/daily', {
        method: 'GET',
      });

      const res = await getQuests(req);
      assert.equal(res.status, 401);
    });

    it('should return todays daily quests as an array', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/quests/daily', {
        method: 'GET',
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });

      const res = await getQuests(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(Array.isArray(json.data));
    });
  });

  // ─── QUEST CLAIMS ───────────────────────────────────────────────────

  describe('POST /api/v1/quests/[id]/claims', () => {
    it('should reject claim without authentication', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/quests/fake-id/claims', {
        method: 'POST',
      });

      const res = await claimQuest(req, { params: { id: 'fake-id' } });
      assert.equal(res.status, 401);
    });

    it('should return 404 for non-existent quest ID', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/quests/nonexistent/claims', {
        method: 'POST',
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });

      const res = await claimQuest(req, { params: { id: 'nonexistent' } });
      assert.equal(res.status, 404);

      const json = await res.json();
      assert.equal(json.title, 'Not Found');
    });

    it('should reject claim for incomplete quest (NOT_COMPLETED)', async () => {
      const quest = await prisma.dailyQuest.findFirst();
      if (!quest) return;

      const userQuest = await prisma.userDailyQuest.create({
        data: {
          userId: testUser.id,
          questId: quest.id,
          assignedDate: new Date(),
          currentCount: 0,
          isCompleted: false,
          isClaimed: false,
        },
      });

      const req = new NextRequest(`http://localhost:3005/api/v1/quests/${userQuest.id}/claims`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });

      const res = await claimQuest(req, { params: { id: userQuest.id } });
      assert.equal(res.status, 400);

      const json = await res.json();
      assert.equal(json.title, 'Bad Request');

      await prisma.userDailyQuest.delete({ where: { id: userQuest.id } });
    });

    it('should reject claim by different user (FORBIDDEN)', async () => {
      const quest = await prisma.dailyQuest.findFirst();
      if (!quest) return;

      const userQuest = await prisma.userDailyQuest.create({
        data: {
          userId: testUser.id,
          questId: quest.id,
          assignedDate: new Date(),
          currentCount: quest.targetCount,
          isCompleted: true,
          isClaimed: false,
        },
      });

      const req = new NextRequest(`http://localhost:3005/api/v1/quests/${userQuest.id}/claims`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${otherTokens.accessToken}` },
      });

      const res = await claimQuest(req, { params: { id: userQuest.id } });
      assert.equal(res.status, 403);

      await prisma.userDailyQuest.delete({ where: { id: userQuest.id } });
    });

    it('should successfully claim completed quest and award gems', async () => {
      const quest = await prisma.dailyQuest.findFirst();
      if (!quest) return;

      // Record gems before
      const before = await prisma.gamificationState.findUnique({ where: { userId: testUser.id } });

      const userQuest = await prisma.userDailyQuest.create({
        data: {
          userId: testUser.id,
          questId: quest.id,
          assignedDate: new Date(),
          currentCount: quest.targetCount,
          isCompleted: true,
          isClaimed: false,
        },
      });

      const req = new NextRequest(`http://localhost:3005/api/v1/quests/${userQuest.id}/claims`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });

      const res = await claimQuest(req, { params: { id: userQuest.id } });
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.rewardGems, quest.rewardGems);

      // Verify gems incremented
      const afterState = await prisma.gamificationState.findUnique({ where: { userId: testUser.id } });
      assert.equal(afterState!.gems, before!.gems + quest.rewardGems);

      // Verify quest is marked as claimed
      const claimed = await prisma.userDailyQuest.findUnique({ where: { id: userQuest.id } });
      assert.equal(claimed?.isClaimed, true);

      claimedUserQuestId = userQuest.id;
    });

    it('should reject double claim (ALREADY_CLAIMED)', async () => {
      assert.ok(claimedUserQuestId, 'Must have a claimed quest from previous test');

      const req = new NextRequest(`http://localhost:3005/api/v1/quests/${claimedUserQuestId}/claims`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });

      const res = await claimQuest(req, { params: { id: claimedUserQuestId } });
      assert.equal(res.status, 400);

      const json = await res.json();
      assert.equal(json.title, 'Already Claimed');
    });
  });

  // ─── SHOP ITEMS ─────────────────────────────────────────────────────

  describe('GET /api/v1/shop/items', () => {
    it('should return available shop items sorted by price', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/shop/items', {
        method: 'GET',
      });

      const res = await getShopItems(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.ok(Array.isArray(json.data));

      // Verify sorted by gemsPrice ascending
      for (let i = 1; i < json.data.length; i++) {
        assert.ok(json.data[i].gemsPrice >= json.data[i - 1].gemsPrice,
          'Items must be sorted by gemsPrice ascending');
      }

      // Verify only available items
      for (const item of json.data) {
        assert.equal(item.isAvailable, true);
      }
    });
  });

  // ─── SHOP PURCHASES ────────────────────────────────────────────────

  describe('POST /api/v1/shop/purchases', () => {
    it('should reject purchase without authentication', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/shop/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: 'item-1' }),
      });

      const res = await purchaseItem(req);
      assert.equal(res.status, 401);
    });

    it('should reject purchase with missing itemId', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/shop/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({}),
      });

      const res = await purchaseItem(req);
      assert.equal(res.status, 400);

      const json = await res.json();
      assert.equal(json.title, 'Bad Request');
      assert.ok(json.detail.includes('Item ID'));
    });

    it('should reject purchase for non-existent item (404)', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/shop/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ itemId: 'nonexistent-item' }),
      });

      const res = await purchaseItem(req);
      assert.equal(res.status, 404);
    });

    it('should reject purchase with insufficient gems', async () => {
      const item = await prisma.shopItem.findFirst();
      if (!item) return;

      // Set gems to 0
      await prisma.gamificationState.update({
        where: { userId: testUser.id },
        data: { gems: 0 },
      });

      const req = new NextRequest('http://localhost:3005/api/v1/shop/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ itemId: item.id }),
      });

      const res = await purchaseItem(req);
      assert.equal(res.status, 400);

      const json = await res.json();
      assert.equal(json.title, 'Insufficient Gems');

      // Restore gems
      await prisma.gamificationState.update({
        where: { userId: testUser.id },
        data: { gems: 200 },
      });
    });

    it('should successfully purchase item, deduct gems, and add to inventory', async () => {
      const item = await prisma.shopItem.findFirst();
      if (!item) return;

      const beforeState = await prisma.gamificationState.findUnique({ where: { userId: testUser.id } });

      const req = new NextRequest('http://localhost:3005/api/v1/shop/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ itemId: item.id }),
      });

      const res = await purchaseItem(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.itemId, item.id);

      // Verify gems deducted
      const afterState = await prisma.gamificationState.findUnique({ where: { userId: testUser.id } });
      assert.equal(afterState!.gems, beforeState!.gems - item.gemsPrice);

      // Verify inventory entry
      const inv = await prisma.userInventory.findFirst({
        where: { userId: testUser.id, itemId: item.id },
      });
      assert.ok(inv);
      assert.ok(inv.quantity >= 1);
    });
  });

  // ─── ENERGY REFILLS ─────────────────────────────────────────────────

  describe('POST /api/v1/users/me/energy/refills', () => {
    it('should reject without authentication', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/users/me/energy/refills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: 'GEMS_PURCHASE' }),
      });

      const res = await refillEnergy(req);
      assert.equal(res.status, 401);
    });

    it('should reject invalid refill method', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/users/me/energy/refills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ method: 'CREDIT_CARD' }),
      });

      const res = await refillEnergy(req);
      assert.equal(res.status, 400);

      const json = await res.json();
      assert.equal(json.title, 'Invalid Method');
    });

    it('should reject GEMS_PURCHASE when energy is already full (5/5)', async () => {
      await prisma.gamificationState.update({
        where: { userId: testUser.id },
        data: { energy: 5, gems: 100 },
      });

      const req = new NextRequest('http://localhost:3005/api/v1/users/me/energy/refills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ method: 'GEMS_PURCHASE' }),
      });

      const res = await refillEnergy(req);
      assert.equal(res.status, 400);

      const json = await res.json();
      assert.equal(json.title, 'Energy Full');
    });

    it('should reject GEMS_PURCHASE with insufficient gems (<50)', async () => {
      await prisma.gamificationState.update({
        where: { userId: testUser.id },
        data: { energy: 2, gems: 30 },
      });

      const req = new NextRequest('http://localhost:3005/api/v1/users/me/energy/refills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ method: 'GEMS_PURCHASE' }),
      });

      const res = await refillEnergy(req);
      assert.equal(res.status, 400);

      const json = await res.json();
      assert.equal(json.title, 'Insufficient Gems');
    });

    it('should successfully refill energy to 5 and deduct 50 gems', async () => {
      await prisma.gamificationState.update({
        where: { userId: testUser.id },
        data: { energy: 1, gems: 100 },
      });

      const req = new NextRequest('http://localhost:3005/api/v1/users/me/energy/refills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ method: 'GEMS_PURCHASE' }),
      });

      const res = await refillEnergy(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.energy, 5);
      assert.equal(json.data.gems, 50); // 100 - 50

      // Verify in DB
      const state = await prisma.gamificationState.findUnique({ where: { userId: testUser.id } });
      assert.equal(state?.energy, 5);
      assert.equal(state?.gems, 50);
    });

    it('should reject PRACTICE_RECHARGE without recent practice attempts', async () => {
      await prisma.gamificationState.update({
        where: { userId: testUser.id },
        data: { energy: 2 },
      });

      const req = new NextRequest('http://localhost:3005/api/v1/users/me/energy/refills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ method: 'PRACTICE_RECHARGE' }),
      });

      const res = await refillEnergy(req);
      assert.equal(res.status, 400);

      const json = await res.json();
      assert.equal(json.title, 'Practice Required');
    });
  });

  // ─── DASHBOARD ──────────────────────────────────────────────────────

  describe('GET /api/v1/users/me/dashboard', () => {
    it('should reject without authentication', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/users/me/dashboard', {
        method: 'GET',
      });

      const res = await getDashboard(req);
      assert.equal(res.status, 401);
    });

    it('should return complete dashboard data with user, gamification, and quests', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/users/me/dashboard', {
        method: 'GET',
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });

      const res = await getDashboard(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);

      // User section
      assert.ok(json.data.user);
      assert.equal(json.data.user.id, testUser.id);
      assert.equal(json.data.user.name, testUser.name);
      assert.equal(json.data.user.email, testUser.email);
      assert.ok(typeof json.data.user.level === 'number');
      assert.ok(typeof json.data.user.totalExp === 'number');

      // Gamification section
      assert.ok(json.data.gamification);
      assert.ok(typeof json.data.gamification.gems === 'number');
      assert.ok(typeof json.data.gamification.energy === 'number');

      // Due mistakes count
      assert.ok(typeof json.data.dueMistakesCount === 'number');

      // Daily quests array
      assert.ok(Array.isArray(json.data.dailyQuests));
    });
  });
});
