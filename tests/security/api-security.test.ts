import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { generateTokens, verifyAccessToken } from '@/lib/auth';
import { middleware } from '@/middleware';
import { POST as postAnswer } from '@/app/api/v1/exams/sessions/[id]/answers/route';
import { POST as postSubmission } from '@/app/api/v1/exams/sessions/[id]/submissions/route';

describe('API Security Testing - OWASP API Security Top 10', () => {
  let userA: any;
  let userB: any;
  let examSessionA: any;
  let tokensA: any;
  let tokensB: any;

  before(async () => {
    // Create User A
    userA = await prisma.user.create({
      data: {
        email: `victim_a_${Date.now()}@toeicpro.test`,
        passwordHash: 'dummy_hash_a',
        name: 'User A (Victim)',
        role: 'STUDENT',
        gamification: { create: { gems: 50, energy: 5 } },
      },
    });
    tokensA = generateTokens({ userId: userA.id, email: userA.email, role: userA.role });

    // Create User B (Attacker)
    userB = await prisma.user.create({
      data: {
        email: `attacker_b_${Date.now()}@toeicpro.test`,
        passwordHash: 'dummy_hash_b',
        name: 'User B (Attacker)',
        role: 'STUDENT',
        gamification: { create: { gems: 50, energy: 5 } },
      },
    });
    tokensB = generateTokens({ userId: userB.id, email: userB.email, role: userB.role });

    // Create Exam Session for User A
    examSessionA = await prisma.attempt.create({
      data: {
        userId: userA.id,
        mode: 'FULL_SIMULATION',
        status: 'IN_PROGRESS',
        totalDurationSeconds: 1200,
      },
    });
  });

  after(async () => {
    if (examSessionA?.id) {
      await prisma.attempt.deleteMany({ where: { id: examSessionA.id } });
    }
    if (userA?.id) {
      await prisma.user.delete({ where: { id: userA.id } });
    }
    if (userB?.id) {
      await prisma.user.delete({ where: { id: userB.id } });
    }
  });

  describe('OWASP API2: Broken Authentication', () => {
    it('should reject requests with missing token (401 Unauthorized)', async () => {
      const req = new NextRequest(
        `http://localhost:3005/api/v1/exams/sessions/${examSessionA.id}/answers`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId: 'q1', selectedOption: 'A' }),
        }
      );

      const res = await postAnswer(req, { params: { id: examSessionA.id } });
      assert.equal(res.status, 401);

      const json = await res.json();
      assert.equal(json.status, 401);
      assert.equal(json.title, 'Unauthorized');
      assert.equal(json.detail, 'Authentication required.');
    });

    it('should reject requests with forged/tampered JWT signature (401 Unauthorized)', async () => {
      // Craft a forged token signed with an invalid secret
      const forgedToken = jwt.sign(
        { userId: userA.id, role: 'ADMIN' },
        'attacker-fake-secret-key-12345'
      );

      const verified = verifyAccessToken(forgedToken);
      assert.equal(verified, null, 'Forged token must not be verifiable');

      const req = new NextRequest(
        `http://localhost:3005/api/v1/exams/sessions/${examSessionA.id}/answers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${forgedToken}`,
          },
          body: JSON.stringify({ questionId: 'q1', selectedOption: 'A' }),
        }
      );

      const res = await postAnswer(req, { params: { id: examSessionA.id } });
      assert.equal(res.status, 401);
    });

    it('should reject malformed JWT tokens', () => {
      const malformed = 'not.a.valid.jwt.token';
      const verified = verifyAccessToken(malformed);
      assert.equal(verified, null);
    });
  });

  describe('OWASP API1: Broken Object Level Authorization (BOLA / IDOR)', () => {
    it('should prevent User B from submitting answers to User A exam session (403 Forbidden)', async () => {
      const req = new NextRequest(
        `http://localhost:3005/api/v1/exams/sessions/${examSessionA.id}/answers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokensB.accessToken}`,
          },
          body: JSON.stringify({
            questionId: 'q1',
            selectedOption: 'B',
            isFlagged: false,
          }),
        }
      );

      const res = await postAnswer(req, { params: { id: examSessionA.id } });
      assert.equal(res.status, 403, 'Should deny BOLA/IDOR cross-user answer submission');

      const json = await res.json();
      assert.equal(json.title, 'Forbidden');
      assert.equal(json.detail, 'You do not own this exam session.');
    });

    it('should prevent User B from finalizing/submitting User A exam session (403 Forbidden)', async () => {
      const req = new NextRequest(
        `http://localhost:3005/api/v1/exams/sessions/${examSessionA.id}/submissions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokensB.accessToken}`,
          },
          body: JSON.stringify({ durationSeconds: 600 }),
        }
      );

      const res = await postSubmission(req, { params: { id: examSessionA.id } });
      assert.equal(res.status, 403, 'Should deny cross-user exam submission');

      const json = await res.json();
      assert.equal(json.title, 'Forbidden');
    });
  });

  describe('OWASP API5: Broken Function Level Authorization (BFLA / RBAC)', () => {
    it('should block STUDENT from accessing /admin dashboard routes and redirect to login', () => {
      const req = new NextRequest('http://localhost:3005/admin');
      req.cookies.set('accessToken', tokensA.accessToken); // STUDENT token

      const res = middleware(req);
      assert.equal(res.status, 307, 'Should redirect unauthorized student from admin');
      const location = res.headers.get('location');
      assert.ok(location?.includes('/login'));
    });

    it('should allow ADMIN role to access /admin routes', () => {
      const adminTokens = generateTokens({
        userId: 'admin-id-1',
        email: 'admin@toeicpro.com',
        role: 'ADMIN',
      });

      const req = new NextRequest('http://localhost:3005/admin');
      req.cookies.set('accessToken', adminTokens.accessToken);

      const res = middleware(req);
      // Next.js NextResponse.next() returns undefined redirect, status 200
      assert.notEqual(res.status, 307);
    });
  });

  describe('OWASP API8: Security Misconfiguration & RFC 7807 Error Sanitization', () => {
    it('should return RFC 7807 Problem Details headers and sanitized error structure', async () => {
      const req = new NextRequest(
        `http://localhost:3005/api/v1/exams/sessions/non_existent_id/answers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokensA.accessToken}`,
          },
          body: JSON.stringify({ questionId: 'q1', selectedOption: 'A' }),
        }
      );

      const res = await postAnswer(req, { params: { id: 'non_existent_id' } });
      assert.equal(res.headers.get('content-type'), 'application/problem+json');

      const json = await res.json();
      assert.ok(json.type, 'RFC 7807 problem details must contain type');
      assert.ok(json.title, 'RFC 7807 problem details must contain title');
      assert.ok(json.status, 'RFC 7807 problem details must contain status');
      assert.ok(json.detail, 'RFC 7807 problem details must contain detail');
      assert.ok(json.instance, 'RFC 7807 problem details must contain instance');
      // Verify no sensitive database stack traces or SQL syntax are exposed
      assert.ok(!json.detail.includes('prisma'));
      assert.ok(!json.detail.includes('SELECT'));
      assert.ok(!json.detail.includes('PostgreSQL'));
    });
  });
});
