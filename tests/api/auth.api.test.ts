import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateTokens, verifyAccessToken, verifyRefreshToken } from '@/lib/auth';
import { POST as registerPost } from '@/app/api/v1/auth/register/route';
import { POST as loginPost } from '@/app/api/v1/auth/login/route';
import { POST as logoutPost } from '@/app/api/v1/auth/logout/route';
import { POST as refreshPost } from '@/app/api/v1/auth/refresh/route';

describe('Auth API Routes - Full TDD Coverage', () => {
  const timestamp = Date.now();
  const baseEmail = `tdd_auth_${timestamp}@toeicpro.test`;
  const password = 'StrongP@ssw0rd!2026';
  const name = 'TDD Auth Tester';

  let userId: string;
  let accessToken: string;
  let refreshToken: string;

  after(async () => {
    if (userId) {
      await prisma.user.delete({ where: { id: userId } }).catch(() => {});
    }
  });

  // ─── REGISTER ──────────────────────────────────────────────────────

  describe('POST /api/v1/auth/register', () => {
    it('should reject registration with missing email', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, name }),
      });

      const res = await registerPost(req);
      assert.equal(res.status, 400);

      const json = await res.json();
      assert.equal(json.title, 'Validation Error');
    });

    it('should reject registration with missing password', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: baseEmail, name }),
      });

      const res = await registerPost(req);
      assert.equal(res.status, 400);
    });

    it('should reject registration with missing name', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: baseEmail, password }),
      });

      const res = await registerPost(req);
      assert.equal(res.status, 400);
    });

    it('should successfully register a new user with initial gamification state', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: baseEmail, password, name }),
      });

      const res = await registerPost(req);
      assert.equal(res.status, 201);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.user.email, baseEmail);
      assert.equal(json.data.user.name, name);
      assert.equal(json.data.user.role, 'STUDENT');
      assert.ok(json.data.tokens.accessToken);
      assert.ok(json.data.tokens.refreshToken);

      userId = json.data.user.id;
      accessToken = json.data.tokens.accessToken;
      refreshToken = json.data.tokens.refreshToken;

      // Verify gamification profile was created
      const gamification = await prisma.gamificationState.findUnique({
        where: { userId },
      });
      assert.ok(gamification);
      assert.equal(gamification.gems, 50);
      assert.equal(gamification.energy, 5);

      // Verify access token is valid JWT
      const payload = verifyAccessToken(accessToken);
      assert.ok(payload);
      assert.equal(payload.userId, userId);
      assert.equal(payload.email, baseEmail);
    });

    it('should set httpOnly accessToken cookie on successful registration', async () => {
      // The cookie was set on the response from the successful registration
      // We can verify this by checking the Set-Cookie header behavior
      // The previous test already validated response structure
      // This test verifies the cookie is set
      const req = new NextRequest('http://localhost:3005/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: `tdd_cookie_${timestamp}@toeicpro.test`,
          password,
          name: 'Cookie Tester',
        }),
      });

      const res = await registerPost(req);
      assert.equal(res.status, 201);

      const setCookie = res.headers.get('set-cookie');
      assert.ok(setCookie, 'Set-Cookie header must be present');
      assert.ok(setCookie.includes('accessToken='), 'Cookie must contain accessToken');
      assert.ok(setCookie.includes('HttpOnly'), 'Cookie must be HttpOnly');

      // Clean up this extra user
      const json = await res.json();
      await prisma.user.delete({ where: { id: json.data.user.id } }).catch(() => {});
    });

    it('should reject duplicate email registration with 409 Conflict', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: baseEmail, password, name }),
      });

      const res = await registerPost(req);
      assert.equal(res.status, 409);

      const json = await res.json();
      assert.equal(json.title, 'Conflict');
      assert.ok(json.detail.includes('already exists'));
    });
  });

  // ─── LOGIN ──────────────────────────────────────────────────────────

  describe('POST /api/v1/auth/login', () => {
    it('should reject login with missing email', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const res = await loginPost(req);
      assert.equal(res.status, 400);
    });

    it('should reject login with missing password', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: baseEmail }),
      });

      const res = await loginPost(req);
      assert.equal(res.status, 400);
    });

    it('should reject login with non-existent email', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'nonexistent@fake.com', password: 'anything' }),
      });

      const res = await loginPost(req);
      assert.equal(res.status, 401);

      const json = await res.json();
      assert.equal(json.title, 'Unauthorized');
      assert.equal(json.detail, 'Invalid credentials.');
    });

    it('should reject login with wrong password', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: baseEmail, password: 'WrongPassword!!' }),
      });

      const res = await loginPost(req);
      assert.equal(res.status, 401);

      const json = await res.json();
      assert.equal(json.detail, 'Invalid credentials.');
    });

    it('should successfully login with correct credentials and return user data + tokens', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: baseEmail, password }),
      });

      const res = await loginPost(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.user.email, baseEmail);
      assert.equal(json.data.user.name, name);
      assert.equal(json.data.user.role, 'STUDENT');
      assert.ok(json.data.user.level >= 1);
      assert.ok(typeof json.data.user.totalExp === 'number');
      assert.ok(json.data.tokens.accessToken);
      assert.ok(json.data.tokens.refreshToken);

      // Update tokens for subsequent tests
      accessToken = json.data.tokens.accessToken;
      refreshToken = json.data.tokens.refreshToken;
    });

    it('should reject login for soft-deleted user', async () => {
      // Soft-delete the user
      await prisma.user.update({
        where: { id: userId },
        data: { deletedAt: new Date() },
      });

      const req = new NextRequest('http://localhost:3005/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: baseEmail, password }),
      });

      const res = await loginPost(req);
      assert.equal(res.status, 401);

      // Restore user
      await prisma.user.update({
        where: { id: userId },
        data: { deletedAt: null },
      });
    });
  });

  // ─── REFRESH ────────────────────────────────────────────────────────

  describe('POST /api/v1/auth/refresh', () => {
    it('should reject refresh with missing refreshToken', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const res = await refreshPost(req);
      assert.equal(res.status, 400);

      const json = await res.json();
      assert.equal(json.title, 'Bad Request');
    });

    it('should reject refresh with invalid/expired token', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: 'invalid.token.here' }),
      });

      const res = await refreshPost(req);
      assert.equal(res.status, 401);

      const json = await res.json();
      assert.equal(json.title, 'Unauthorized');
    });

    it('should successfully refresh and return new token pair', async () => {
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
      assert.ok(json.data.refreshToken);

      // New access token must be valid
      const payload = verifyAccessToken(json.data.accessToken);
      assert.ok(payload);
      assert.equal(payload.userId, userId);

      // Update tokens
      accessToken = json.data.accessToken;
      refreshToken = json.data.refreshToken;
    });
  });

  // ─── LOGOUT ─────────────────────────────────────────────────────────

  describe('POST /api/v1/auth/logout', () => {
    it('should successfully logout and clear accessToken cookie', async () => {
      const req = new NextRequest('http://localhost:3005/api/v1/auth/logout', {
        method: 'POST',
      });

      const res = await logoutPost(req);
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.data.message, 'Logged out successfully');

      // Verify cookie is deleted
      const setCookie = res.headers.get('set-cookie');
      assert.ok(setCookie, 'Set-Cookie header must be present for cookie deletion');
      assert.ok(setCookie.includes('accessToken='));
    });
  });
});
