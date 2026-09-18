import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { prisma } from '@/lib/prisma';
import { GamificationService } from '@/services/gamification.service';

describe('GamificationService - Energy, Economy & Quest Guards', () => {
  let testUserId: string;

  before(async () => {
    // Create an isolated test user with initial gamification profile
    const testUser = await prisma.user.create({
      data: {
        email: `test_gamify_${Date.now()}@toeicpro.test`,
        passwordHash: 'dummy_hash_for_tests',
        name: 'QA Gamification User',
        role: 'STUDENT',
        gamification: {
          create: {
            gems: 100,
            energy: 3,
            currentStreak: 5,
            maxStreak: 10,
          },
        },
      },
      include: { gamification: true },
    });
    testUserId = testUser.id;
  });

  after(async () => {
    // Cleanup test user and related cascading records
    if (testUserId) {
      await prisma.user.delete({ where: { id: testUserId } });
    }
  });

  describe('Energy Refill System', () => {
    it('should reject energy refill if user already has maximum 5 hearts (ENERGY_FULL)', async () => {
      // Set user energy to 5
      await prisma.gamificationState.update({
        where: { userId: testUserId },
        data: { energy: 5 },
      });

      await assert.rejects(
        () => GamificationService.atomicRefillEnergy(testUserId, 'GEMS_PURCHASE'),
        /ENERGY_FULL/
      );
    });

    it('should reject GEMS_PURCHASE if user has less than 50 gems (INSUFFICIENT_GEMS)', async () => {
      // Set energy to 2, gems to 20
      await prisma.gamificationState.update({
        where: { userId: testUserId },
        data: { energy: 2, gems: 20 },
      });

      await assert.rejects(
        () => GamificationService.atomicRefillEnergy(testUserId, 'GEMS_PURCHASE'),
        /INSUFFICIENT_GEMS/
      );
    });

    it('should successfully refill energy to 5 and deduct 50 gems when conditions are met', async () => {
      // Set energy to 1, gems to 100
      await prisma.gamificationState.update({
        where: { userId: testUserId },
        data: { energy: 1, gems: 100 },
      });

      const result = await GamificationService.atomicRefillEnergy(testUserId, 'GEMS_PURCHASE');
      assert.equal(result.energy, 5);
      assert.equal(result.gems, 50);

      // Verify in database
      const freshState = await prisma.gamificationState.findUnique({
        where: { userId: testUserId },
      });
      assert.equal(freshState?.energy, 5);
      assert.equal(freshState?.gems, 50);
    });

    it('should reject PRACTICE_RECHARGE if user has no recent completed practice attempts', async () => {
      // Set energy to 2
      await prisma.gamificationState.update({
        where: { userId: testUserId },
        data: { energy: 2 },
      });

      await assert.rejects(
        () => GamificationService.atomicRefillEnergy(testUserId, 'PRACTICE_RECHARGE'),
        /PRACTICE_REQUIRED/
      );
    });
  });

  describe('Shop Purchases and Ledger Balance', () => {
    it('should reject purchase for non-existent shop item (ITEM_NOT_FOUND)', async () => {
      await assert.rejects(
        () => GamificationService.atomicPurchaseItem(testUserId, 'non_existent_item_id_999'),
        /ITEM_NOT_FOUND/
      );
    });

    it('should reject purchase if gems balance is insufficient (INSUFFICIENT_GEMS)', async () => {
      // Find a shop item
      const item = await prisma.shopItem.findFirst();
      if (!item) return;

      // Set user gems to 0
      await prisma.gamificationState.update({
        where: { userId: testUserId },
        data: { gems: 0 },
      });

      await assert.rejects(
        () => GamificationService.atomicPurchaseItem(testUserId, item.id),
        /INSUFFICIENT_GEMS/
      );
    });
  });

  describe('Daily Quest Claiming & Idempotency', () => {
    it('should reject claim for non-existent user quest (QUEST_NOT_FOUND)', async () => {
      await assert.rejects(
        () => GamificationService.atomicClaimQuest(testUserId, 'fake-quest-id-404'),
        /QUEST_NOT_FOUND/
      );
    });

    it('should reject claim if quest is not yet completed (NOT_COMPLETED)', async () => {
      const quest = await prisma.dailyQuest.findFirst();
      if (!quest) return;

      const userQuest = await prisma.userDailyQuest.create({
        data: {
          userId: testUserId,
          questId: quest.id,
          assignedDate: new Date(),
          currentCount: 0,
          isCompleted: false,
          isClaimed: false,
        },
      });

      await assert.rejects(
        () => GamificationService.atomicClaimQuest(testUserId, userQuest.id),
        /NOT_COMPLETED/
      );

      // Clean up userQuest
      await prisma.userDailyQuest.delete({ where: { id: userQuest.id } });
    });

    it('should claim successfully once and reject subsequent duplicate claims (ALREADY_CLAIMED)', async () => {
      const quest = await prisma.dailyQuest.findFirst();
      if (!quest) return;

      const userQuest = await prisma.userDailyQuest.create({
        data: {
          userId: testUserId,
          questId: quest.id,
          assignedDate: new Date(),
          currentCount: quest.targetCount,
          isCompleted: true,
          isClaimed: false,
        },
      });

      // First claim must succeed
      const claimResult = await GamificationService.atomicClaimQuest(testUserId, userQuest.id);
      assert.equal(claimResult.rewardGems, quest.rewardGems);

      // Second claim must fail immediately due to idempotency guard
      await assert.rejects(
        () => GamificationService.atomicClaimQuest(testUserId, userQuest.id),
        /ALREADY_CLAIMED/
      );

      // Clean up userQuest
      await prisma.userDailyQuest.delete({ where: { id: userQuest.id } });
    });
  });
});
