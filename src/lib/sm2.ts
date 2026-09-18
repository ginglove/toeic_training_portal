/**
 * SM-2 Spaced Repetition Algorithm Implementation
 * Quality score q: 1 to 5
 * 5 - Perfect recall without hesitation
 * 4 - Correct after brief hesitation
 * 3 - Correct with serious difficulty
 * 2 - Incorrect, but remembered upon seeing answer
 * 1 - Complete blackout
 */
export interface SM2State {
  easinessFactor: number; // default 2.5, min 1.3
  repetitionNumber: number; // consecutive correct reviews
  intervalDays: number; // interval until next review
}

export interface SM2Result {
  easinessFactor: number;
  repetitionNumber: number;
  intervalDays: number;
  nextReviewDate: Date;
}

export function calculateSM2(
  currentState: SM2State,
  quality: number,
  baseDate: Date = new Date()
): SM2Result {
  const q = Math.max(1, Math.min(5, quality));
  let { easinessFactor, repetitionNumber, intervalDays } = currentState;

  // Calculate new Easiness Factor (EF)
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  const newEF = easinessFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  easinessFactor = Math.max(1.3, Number(newEF.toFixed(2)));

  if (q >= 3) {
    // Correct response
    if (repetitionNumber === 0) {
      intervalDays = 1;
    } else if (repetitionNumber === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(intervalDays * easinessFactor);
    }
    repetitionNumber += 1;
  } else {
    // Incorrect response (reset streak)
    repetitionNumber = 0;
    intervalDays = 1;
  }

  const nextReviewDate = new Date(baseDate.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  return {
    easinessFactor,
    repetitionNumber,
    intervalDays,
    nextReviewDate,
  };
}
