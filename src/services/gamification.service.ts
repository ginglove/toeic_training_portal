import { prisma } from '@/lib/prisma';

export class GamificationService {
  /**
   * Recharges user energy atomically with concurrency and 5-heart ceiling guard
   */
  static async atomicRefillEnergy(
    userId: string,
    method: 'PRACTICE_RECHARGE' | 'GEMS_PURCHASE'
  ) {
    const gamification = await prisma.gamificationState.findUnique({
      where: { userId },
    });

    if (!gamification) {
      throw new Error('GAMIFICATION_NOT_FOUND');
    }

    if (gamification.energy >= 5) {
      throw new Error('ENERGY_FULL');
    }

    if (method === 'GEMS_PURCHASE') {
      if (gamification.gems < 50) {
        throw new Error('INSUFFICIENT_GEMS');
      }

      // Atomic decrement with balance check
      const result = await prisma.$transaction(async (tx) => {
        const updateResult = await tx.gamificationState.updateMany({
          where: {
            userId,
            gems: { gte: 50 },
            energy: { lt: 5 },
          },
          data: {
            energy: 5,
            gems: { decrement: 50 },
            lastEnergyRefill: new Date(),
          },
        });

        if (updateResult.count === 0) {
          throw new Error('REFILL_CONFLICT');
        }

        return tx.gamificationState.findUnique({ where: { userId } });
      });

      return {
        energy: result?.energy ?? 5,
        gems: result?.gems ?? 0,
        message: 'Nạp đầy 5 tim thành công với 50 Gems!',
      };
    } else {
      // PRACTICE_RECHARGE: Check recently submitted practice attempt (within last 30 mins)
      const recentAttempt = await prisma.attempt.findFirst({
        where: {
          userId,
          status: 'SUBMITTED',
          completedAt: { gte: new Date(Date.now() - 30 * 60 * 1000) },
        },
        orderBy: { completedAt: 'desc' },
      });

      if (!recentAttempt) {
        throw new Error('PRACTICE_REQUIRED');
      }

      const result = await prisma.$transaction(async (tx) => {
        const updateResult = await tx.gamificationState.updateMany({
          where: {
            userId,
            energy: { lt: 5 },
          },
          data: {
            energy: { increment: 1 },
            lastEnergyRefill: new Date(),
          },
        });

        if (updateResult.count === 0) {
          throw new Error('ENERGY_FULL');
        }

        return tx.gamificationState.findUnique({ where: { userId } });
      });

      return {
        energy: result?.energy ?? 5,
        gems: result?.gems ?? 0,
        message: 'Hoàn thành bài luyện tập, nhận +1 Tim thành công!',
      };
    }
  }

  /**
   * Purchases an item from the shop with atomic concurrency protection
   */
  static async atomicPurchaseItem(userId: string, itemId: string) {
    const item = await prisma.shopItem.findUnique({ where: { id: itemId } });
    if (!item) {
      throw new Error('ITEM_NOT_FOUND');
    }

    const updatedState = await prisma.$transaction(async (tx) => {
      // 1. Conditional update at SQL level to prevent negative balance
      const updateResult = await tx.gamificationState.updateMany({
        where: {
          userId,
          gems: { gte: item.gemsPrice },
        },
        data: {
          gems: { decrement: item.gemsPrice },
        },
      });

      if (updateResult.count === 0) {
        throw new Error('INSUFFICIENT_GEMS');
      }

      const currentState = await tx.gamificationState.findUnique({
        where: { userId },
      });

      // 2. Inventory upsert
      const existingInventory = await tx.userInventory.findFirst({
        where: { userId, itemId: item.id },
      });

      if (existingInventory) {
        await tx.userInventory.update({
          where: { id: existingInventory.id },
          data: { quantity: { increment: 1 } },
        });
      } else {
        await tx.userInventory.create({
          data: {
            userId,
            itemId: item.id,
            quantity: 1,
          },
        });
      }

      return currentState;
    });

    return {
      itemId: item.id,
      title: item.title,
      gemsPrice: item.gemsPrice,
      remainingGems: updatedState?.gems ?? 0,
      message: 'Đổi vật phẩm thành công!',
    };
  }

  /**
   * Claims a completed daily quest with atomic idempotency
   */
  static async atomicClaimQuest(userId: string, userQuestId: string) {
    const userQuest = await prisma.userDailyQuest.findUnique({
      where: { id: userQuestId },
      include: { quest: true },
    });

    if (!userQuest) {
      throw new Error('QUEST_NOT_FOUND');
    }

    if (userQuest.userId !== userId) {
      throw new Error('FORBIDDEN');
    }

    if (!userQuest.isCompleted) {
      throw new Error('NOT_COMPLETED');
    }

    if (userQuest.isClaimed) {
      throw new Error('ALREADY_CLAIMED');
    }

    await prisma.$transaction(async (tx) => {
      const claimResult = await tx.userDailyQuest.updateMany({
        where: {
          id: userQuestId,
          isClaimed: false,
        },
        data: { isClaimed: true, claimedAt: new Date() },
      });

      if (claimResult.count === 0) {
        throw new Error('ALREADY_CLAIMED');
      }

      await tx.gamificationState.update({
        where: { userId },
        data: {
          gems: { increment: userQuest.quest.rewardGems },
          weeklyExp: { increment: userQuest.quest.rewardExp },
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: { totalExp: { increment: userQuest.quest.rewardExp } },
      });
    });

    return {
      questId: userQuest.questId,
      rewardGems: userQuest.quest.rewardGems,
      rewardExp: userQuest.quest.rewardExp,
      message: 'Nhận thưởng nhiệm vụ thành công!',
    };
  }
}
