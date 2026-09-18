import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { AssessmentService } from '@/services/assessment.service';

describe('AssessmentService - ETS Equated Scoring & Assessment Rules', () => {
  describe('calculateEquatedScore without custom equating table (fallback formula)', () => {
    it('should assign minimum score (5 L, 5 R, 10 Total) for 0 correct answers', () => {
      const score = AssessmentService.calculateEquatedScore(0, 0, null);
      assert.equal(score.listeningScore, 5);
      assert.equal(score.readingScore, 5);
      assert.equal(score.totalScore, 10);
    });

    it('should assign maximum score (495 L, 495 R, 990 Total) for perfect 100/100 correct answers', () => {
      const score = AssessmentService.calculateEquatedScore(100, 100, null);
      assert.equal(score.listeningScore, 495);
      assert.equal(score.readingScore, 495);
      assert.equal(score.totalScore, 990);
    });

    it('should scale linearly and round to nearest 5 points as per ETS standards', () => {
      const scoreMid = AssessmentService.calculateEquatedScore(50, 50, null);
      assert.equal(scoreMid.listeningScore % 5, 0);
      assert.equal(scoreMid.readingScore % 5, 0);
      assert.equal(scoreMid.totalScore, scoreMid.listeningScore + scoreMid.readingScore);
      // 50/100 * 495 = 247.5 -> rounded to nearest 5 is 250
      assert.equal(scoreMid.listeningScore, 250);
      assert.equal(scoreMid.readingScore, 250);
      assert.equal(scoreMid.totalScore, 500);
    });

    it('should clamp scores to [5, 495] range even if input exceeds boundaries', () => {
      const scoreOverflow = AssessmentService.calculateEquatedScore(120, 150, null);
      assert.equal(scoreOverflow.listeningScore, 495);
      assert.equal(scoreOverflow.readingScore, 495);
      assert.equal(scoreOverflow.totalScore, 990);
    });
  });

  describe('calculateEquatedScore with custom official ETS Equating Table', () => {
    const mockEquatingTable = {
      listening: {
        '0': 5,
        '10': 35,
        '25': 120,
        '50': 260,
        '75': 385,
        '95': 490,
        '100': 495,
      },
      reading: {
        '0': 5,
        '10': 30,
        '25': 105,
        '50': 245,
        '75': 370,
        '95': 485,
        '100': 495,
      },
    };

    it('should map exact matches from the ETS equating table', () => {
      const score = AssessmentService.calculateEquatedScore(50, 50, mockEquatingTable);
      assert.equal(score.listeningScore, 260);
      assert.equal(score.readingScore, 245);
      assert.equal(score.totalScore, 505);
    });

    it('should interpolate to closest lower bracket for intermediate raw correct counts', () => {
      const score = AssessmentService.calculateEquatedScore(60, 60, mockEquatingTable);
      assert.equal(score.listeningScore, 260);
      assert.equal(score.readingScore, 245);
      assert.equal(score.totalScore, 505);
    });

    it('should assign maximum scaled score 495 when raw count is 100', () => {
      const score = AssessmentService.calculateEquatedScore(100, 100, mockEquatingTable);
      assert.equal(score.listeningScore, 495);
      assert.equal(score.readingScore, 495);
      assert.equal(score.totalScore, 990);
    });
  });
});
