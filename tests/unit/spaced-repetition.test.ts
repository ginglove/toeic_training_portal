import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateSM2 } from '@/lib/sm2';

describe('SpacedRepetition (SuperMemo SM-2 Algorithm)', () => {
  const baseDate = new Date('2026-09-16T12:00:00Z');

  it('should handle first successful review (q=5, rep=0) correctly', () => {
    const state = { easinessFactor: 2.5, repetitionNumber: 0, intervalDays: 1 };
    const result = calculateSM2(state, 5, baseDate);

    assert.equal(result.repetitionNumber, 1);
    assert.equal(result.intervalDays, 1);
    assert.equal(result.easinessFactor, 2.6); // EF + 0.1
    assert.equal(result.nextReviewDate.toISOString(), '2026-09-17T12:00:00.000Z');
  });

  it('should advance to 6 days interval on second consecutive successful review (q=5, rep=1)', () => {
    const state = { easinessFactor: 2.6, repetitionNumber: 1, intervalDays: 1 };
    const result = calculateSM2(state, 5, baseDate);

    assert.equal(result.repetitionNumber, 2);
    assert.equal(result.intervalDays, 6);
    assert.equal(result.easinessFactor, 2.7);
    assert.equal(result.nextReviewDate.toISOString(), '2026-09-22T12:00:00.000Z');
  });

  it('should calculate exponential interval using EF on third review (rep=2)', () => {
    const state = { easinessFactor: 2.7, repetitionNumber: 2, intervalDays: 6 };
    const result = calculateSM2(state, 5, baseDate);

    assert.equal(result.repetitionNumber, 3);
    // 6 * 2.8 = 16.8 -> rounded to 16 or 17
    assert.equal(result.intervalDays, Math.round(6 * result.easinessFactor));
    assert.ok(result.intervalDays >= 16);
  });

  it('should maintain EF when quality is 4 (correct with hesitation)', () => {
    const state = { easinessFactor: 2.5, repetitionNumber: 1, intervalDays: 1 };
    const result = calculateSM2(state, 4, baseDate);

    assert.equal(result.repetitionNumber, 2);
    assert.equal(result.intervalDays, 6);
    // EF' = 2.5 + (0.1 - (1) * (0.08 + 1*0.02)) = 2.5 + (0.1 - 0.1) = 2.5
    assert.equal(result.easinessFactor, 2.5);
  });

  it('should reset repetition count to 0 and interval to 1 on failure (quality < 3)', () => {
    const state = { easinessFactor: 2.5, repetitionNumber: 5, intervalDays: 45 };
    const result = calculateSM2(state, 2, baseDate);

    assert.equal(result.repetitionNumber, 0);
    assert.equal(result.intervalDays, 1);
    assert.ok(result.easinessFactor < 2.5, 'EF should decrease on failure');
    assert.equal(result.nextReviewDate.toISOString(), '2026-09-17T12:00:00.000Z');
  });

  it('should enforce minimum EF floor of 1.3 even after multiple consecutive blackouts', () => {
    let state = { easinessFactor: 1.4, repetitionNumber: 0, intervalDays: 1 };
    for (let i = 0; i < 5; i++) {
      const res = calculateSM2(state, 1, baseDate);
      state = {
        easinessFactor: res.easinessFactor,
        repetitionNumber: res.repetitionNumber,
        intervalDays: res.intervalDays,
      };
    }
    assert.equal(state.easinessFactor, 1.3, 'EF must never drop below 1.3');
    assert.equal(state.intervalDays, 1);
    assert.equal(state.repetitionNumber, 0);
  });
});
