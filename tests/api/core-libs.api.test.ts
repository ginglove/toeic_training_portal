import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateProbability2PL, estimateTheta, thetaToTOEICScore } from '@/lib/irt';
import { apiSuccess, apiProblem } from '@/lib/response';
import { generateTokens, verifyAccessToken, verifyRefreshToken, hashPassword, comparePassword } from '@/lib/auth';

describe('Core Library Functions - Full TDD Coverage', () => {

  // ─── IRT 2PL MODEL ─────────────────────────────────────────────────

  describe('IRT 2-Parameter Logistic Model (irt.ts)', () => {
    it('should calculate probability of 0.5 when theta equals difficulty', () => {
      const prob = calculateProbability2PL(0.0, 1.0, 0.0); // theta = b
      assert.ok(Math.abs(prob - 0.5) < 0.01, `Expected ~0.5, got ${prob}`);
    });

    it('should return high probability when theta >> difficulty', () => {
      const prob = calculateProbability2PL(3.0, 1.0, -2.0); // Easy question
      assert.ok(prob > 0.95, `Expected >0.95, got ${prob}`);
    });

    it('should return low probability when theta << difficulty', () => {
      const prob = calculateProbability2PL(-2.0, 1.0, 2.0); // Hard question
      assert.ok(prob < 0.05, `Expected <0.05, got ${prob}`);
    });

    it('should increase discrimination sensitivity with higher a parameter', () => {
      const lowDisc = calculateProbability2PL(1.0, 0.5, 0.0);
      const highDisc = calculateProbability2PL(1.0, 2.0, 0.0);
      // Both should be > 0.5 since theta > difficulty
      // Higher discrimination means steeper curve = higher probability further from center
      assert.ok(highDisc > lowDisc, 'Higher discrimination should yield higher probability');
    });

    it('should estimate positive theta for all-correct responses', () => {
      const responses = [
        { isCorrect: true, a: 1.0, b: 0.0 },
        { isCorrect: true, a: 1.0, b: 0.5 },
        { isCorrect: true, a: 1.0, b: -0.5 },
      ];
      const theta = estimateTheta(responses);
      assert.ok(theta > 0, `Expected positive theta, got ${theta}`);
    });

    it('should estimate negative theta for all-incorrect responses', () => {
      const responses = [
        { isCorrect: false, a: 1.0, b: 0.0 },
        { isCorrect: false, a: 1.0, b: -0.5 },
        { isCorrect: false, a: 1.0, b: 0.5 },
      ];
      const theta = estimateTheta(responses);
      assert.ok(theta < 0, `Expected negative theta, got ${theta}`);
    });

    it('should return initial theta for empty responses', () => {
      const theta = estimateTheta([], 0.5);
      assert.equal(theta, 0.5);
    });

    it('should clamp theta within [-3.5, +3.5] range', () => {
      // Extreme all-correct with easy items should push theta up but stay clamped
      const responses = Array.from({ length: 50 }, () => ({
        isCorrect: true, a: 2.5, b: -3.0,
      }));
      const theta = estimateTheta(responses);
      assert.ok(theta <= 3.5, `Theta should be clamped to 3.5, got ${theta}`);
      assert.ok(theta >= -3.5, `Theta should be >= -3.5, got ${theta}`);
    });
  });

  // ─── THETA TO TOEIC SCORE ──────────────────────────────────────────

  describe('thetaToTOEICScore conversion', () => {
    it('should map theta -3.0 to minimum score 10', () => {
      const score = thetaToTOEICScore(-3.0);
      assert.equal(score, 10);
    });

    it('should map theta +3.0 to maximum score 495', () => {
      const score = thetaToTOEICScore(3.0);
      assert.equal(score, 495);
    });

    it('should map theta 0.0 to approximately 250', () => {
      const score = thetaToTOEICScore(0.0);
      // Linear: (0+3)/6 * 485 + 10 = 0.5 * 485 + 10 = 252.5 → rounded to 255
      assert.ok(score >= 245 && score <= 260, `Expected ~250, got ${score}`);
    });

    it('should round score to nearest multiple of 5', () => {
      const score = thetaToTOEICScore(1.5);
      assert.equal(score % 5, 0, 'Score must be a multiple of 5');
    });

    it('should clamp score within [10, 495] even for extreme theta values', () => {
      assert.ok(thetaToTOEICScore(-5.0) >= 10);
      assert.ok(thetaToTOEICScore(5.0) <= 495);
    });
  });

  // ─── RESPONSE HELPERS ──────────────────────────────────────────────

  describe('API Response Helpers (response.ts)', () => {
    it('should create success response with status 200 by default', async () => {
      const res = apiSuccess({ key: 'value' });
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.key, 'value');
      assert.ok(json.meta.timestamp);
    });

    it('should create success response with custom status code', async () => {
      const res = apiSuccess({ created: true }, undefined, 201);
      assert.equal(res.status, 201);
    });

    it('should include custom meta in success response', async () => {
      const res = apiSuccess([], { page: 1, pageSize: 20, totalCount: 100 });
      const json = await res.json();
      assert.equal(json.meta.page, 1);
      assert.equal(json.meta.pageSize, 20);
      assert.equal(json.meta.totalCount, 100);
    });

    it('should create RFC 7807 problem response with correct content type', async () => {
      const res = apiProblem(404, 'Not Found', 'Resource not found.', '/api/v1/resource/123');
      assert.equal(res.status, 404);
      assert.equal(res.headers.get('content-type'), 'application/problem+json');

      const json = await res.json();
      assert.equal(json.type, 'about:blank');
      assert.equal(json.title, 'Not Found');
      assert.equal(json.status, 404);
      assert.equal(json.detail, 'Resource not found.');
      assert.equal(json.instance, '/api/v1/resource/123');
    });

    it('should include invalidParams in problem response when provided', async () => {
      const res = apiProblem(400, 'Validation Error', 'Invalid input', '/api', 'about:blank', [
        { name: 'email', reason: 'Invalid format' },
      ]);

      const json = await res.json();
      assert.ok(Array.isArray(json.invalidParams));
      assert.equal(json.invalidParams[0].name, 'email');
      assert.equal(json.invalidParams[0].reason, 'Invalid format');
    });
  });

  // ─── AUTH TOKEN FUNCTIONS ──────────────────────────────────────────

  describe('Auth Token Functions (auth.ts)', () => {
    const testPayload = { userId: 'u-123', email: 'test@test.com', role: 'STUDENT' };

    it('should generate both access and refresh tokens', () => {
      const tokens = generateTokens(testPayload);
      assert.ok(tokens.accessToken);
      assert.ok(tokens.refreshToken);
      assert.notEqual(tokens.accessToken, tokens.refreshToken);
    });

    it('should verify valid access token and return payload', () => {
      const tokens = generateTokens(testPayload);
      const payload = verifyAccessToken(tokens.accessToken);
      assert.ok(payload);
      assert.equal(payload.userId, testPayload.userId);
      assert.equal(payload.email, testPayload.email);
      assert.equal(payload.role, testPayload.role);
    });

    it('should return null for invalid access token', () => {
      const result = verifyAccessToken('invalid.token.string');
      assert.equal(result, null);
    });

    it('should verify valid refresh token and return payload', () => {
      const tokens = generateTokens(testPayload);
      const payload = verifyRefreshToken(tokens.refreshToken);
      assert.ok(payload);
      assert.equal(payload.userId, testPayload.userId);
    });

    it('should return null for invalid refresh token', () => {
      const result = verifyRefreshToken('garbage');
      assert.equal(result, null);
    });

    it('should not verify access token with refresh token secret and vice versa', () => {
      const tokens = generateTokens(testPayload);
      // Access token should not verify as refresh token
      const wrongVerify = verifyRefreshToken(tokens.accessToken);
      assert.equal(wrongVerify, null, 'Access token should not verify as refresh token');
    });

    it('should hash and compare passwords correctly', async () => {
      const password = 'MySecret123!';
      const hash = await hashPassword(password);
      assert.ok(hash);
      assert.notEqual(hash, password);

      const isValid = await comparePassword(password, hash);
      assert.equal(isValid, true);

      const isInvalid = await comparePassword('WrongPassword', hash);
      assert.equal(isInvalid, false);
    });
  });
});
