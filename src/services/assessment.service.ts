import { prisma } from '@/lib/prisma';

export interface ExamScoreResult {
  sessionId: string;
  totalScore: number;
  listeningScore: number;
  readingScore: number;
  listeningCorrect: number;
  readingCorrect: number;
  totalAnswered: number;
  expAwarded: number;
  completedAt: Date;
}

export class AssessmentService {
  /**
   * Calculates scaled scores according to ETS Equating Table
   */
  static calculateEquatedScore(
    listeningCorrect: number,
    readingCorrect: number,
    equatingTable: any
  ): { listeningScore: number; readingScore: number; totalScore: number } {
    let listeningScore = 5;
    let readingScore = 5;

    if (equatingTable?.listening) {
      const keys = Object.keys(equatingTable.listening).map(Number).sort((a, b) => a - b);
      if (listeningCorrect >= keys[0]) {
        const closestL = keys.reduce((prev, curr) => (curr <= listeningCorrect ? curr : prev), keys[0]);
        listeningScore = equatingTable.listening[closestL] || 5;
      } else {
        listeningScore = 5;
      }
    } else {
      listeningScore = Math.min(495, Math.max(5, Math.round((listeningCorrect / 100) * 495 / 5) * 5));
    }

    if (equatingTable?.reading) {
      const keys = Object.keys(equatingTable.reading).map(Number).sort((a, b) => a - b);
      if (readingCorrect >= keys[0]) {
        const closestR = keys.reduce((prev, curr) => (curr <= readingCorrect ? curr : prev), keys[0]);
        readingScore = equatingTable.reading[closestR] || 5;
      } else {
        readingScore = 5;
      }
    } else {
      readingScore = Math.min(495, Math.max(5, Math.round((readingCorrect / 100) * 495 / 5) * 5));
    }

    return {
      listeningScore,
      readingScore,
      totalScore: listeningScore + readingScore,
    };
  }

  /**
   * Finalizes an exam attempt, grades all questions, logs mistakes to SM-2, and updates scores
   */
  static async finalizeExamSession(
    sessionId: string,
    userId: string,
    durationSeconds?: number
  ): Promise<ExamScoreResult> {
    const attempt = await prisma.attempt.findUnique({
      where: { id: sessionId },
      include: {
        exam: true,
        details: {
          include: { question: true },
        },
      },
    });

    if (!attempt) {
      throw new Error('SESSION_NOT_FOUND');
    }

    if (attempt.userId !== userId) {
      throw new Error('FORBIDDEN');
    }

    if (attempt.status !== 'IN_PROGRESS') {
      throw new Error('ALREADY_SUBMITTED');
    }

    let listeningCorrect = 0;
    let readingCorrect = 0;
    const incorrectQuestions: string[] = [];

    for (const d of attempt.details) {
      if (d.isCorrect) {
        if (d.question.partNumber <= 4) listeningCorrect++;
        else readingCorrect++;
      } else {
        incorrectQuestions.push(d.questionId);
      }
    }

    const { listeningScore, readingScore, totalScore } = this.calculateEquatedScore(
      listeningCorrect,
      readingCorrect,
      attempt.exam?.equatingTableJson
    );

    const expAwarded = 100;

    const updated = await prisma.$transaction(async (tx) => {
      // 1. Log mistakes into MistakeNotebook for SM-2 review
      for (const qId of incorrectQuestions) {
        await tx.mistakeNotebook.upsert({
          where: {
            userId_questionId: {
              userId,
              questionId: qId,
            },
          },
          update: {
            nextReviewDate: new Date(),
          },
          create: {
            userId,
            questionId: qId,
            easinessFactor: 2.5,
            repetitionNumber: 0,
            intervalDays: 1,
            nextReviewDate: new Date(),
          },
        });
      }

      // 2. Award EXP to user and gamification profile
      await tx.user.update({
        where: { id: userId },
        data: { totalExp: { increment: expAwarded } },
      });

      await tx.gamificationState.update({
        where: { userId },
        data: { weeklyExp: { increment: expAwarded } },
      });

      // 3. Update Attempt status and calculated scores
      return tx.attempt.update({
        where: { id: sessionId },
        data: {
          status: 'SUBMITTED',
          listeningScore,
          readingScore,
          totalScore,
          totalDurationSeconds: durationSeconds || attempt.totalDurationSeconds,
          completedAt: new Date(),
        },
      });
    });

    return {
      sessionId,
      totalScore,
      listeningScore,
      readingScore,
      listeningCorrect,
      readingCorrect,
      totalAnswered: attempt.details.length,
      expAwarded,
      completedAt: updated.completedAt || new Date(),
    };
  }
}
