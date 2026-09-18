import { prisma } from '@/lib/prisma';
import { calculateSM2 } from '@/lib/sm2';

export class SpacedRepetitionService {
  /**
   * Records a user's review rating on a mistake flashcard, updates SM-2 schedule atomically
   */
  static async recordReview(
    userId: string,
    notebookId: string,
    quality: number,
    timeSpentMs = 5000
  ) {
    if (typeof quality !== 'number' || quality < 1 || quality > 5) {
      throw new Error('INVALID_QUALITY');
    }

    const item = await prisma.mistakeNotebook.findUnique({
      where: { id: notebookId },
    });

    if (!item) {
      throw new Error('NOTEBOOK_ITEM_NOT_FOUND');
    }

    if (item.userId !== userId) {
      throw new Error('FORBIDDEN');
    }

    const sm2Result = calculateSM2(
      {
        easinessFactor: item.easinessFactor,
        repetitionNumber: item.repetitionNumber,
        intervalDays: item.intervalDays,
      },
      quality
    );

    const isCorrect = quality >= 3;

    const [history, updated] = await prisma.$transaction([
      prisma.reviewHistory.create({
        data: {
          notebookId,
          calculatedQuality: quality,
          timeSpentMs,
          isCorrect,
        },
      }),
      prisma.mistakeNotebook.update({
        where: { id: notebookId },
        data: {
          easinessFactor: sm2Result.easinessFactor,
          repetitionNumber: sm2Result.repetitionNumber,
          intervalDays: sm2Result.intervalDays,
          nextReviewDate: sm2Result.nextReviewDate,
        },
      }),
    ]);

    return {
      notebookId: updated.id,
      easinessFactor: updated.easinessFactor,
      repetitionNumber: updated.repetitionNumber,
      intervalDays: updated.intervalDays,
      nextReviewDate: updated.nextReviewDate,
      isCorrect,
    };
  }
}
