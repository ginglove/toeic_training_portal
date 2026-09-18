import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { POST as loginPost } from '@/app/api/v1/auth/login/route';
import { GET as getExam } from '@/app/api/v1/exams/[id]/route';
import { prisma } from '@/lib/prisma';
import fs from 'node:fs';
import path from 'node:path';

describe('SQL Injection Testing & Parameterized Query Verification', () => {
  describe('Phase 1 & 3: Authentication Form Bypass Payloads', () => {
    const sqliLoginPayloads = [
      "' OR '1'='1",
      "' OR '1'='1'--",
      "admin'--",
      "admin' /*",
      "') OR ('1'='1",
      "' OR ''='",
      "\" OR \"1\"=\"1",
      "1' OR '1' = '1' /*",
      "'; DROP TABLE users; --",
      "' UNION SELECT null, null, null--",
    ];

    for (const payload of sqliLoginPayloads) {
      it(`should neutralize login bypass payload: ${payload}`, async () => {
        const req = new NextRequest('http://localhost:3005/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: payload,
            password: 'any_password',
          }),
        });

        const res = await loginPost(req);
        // Must safely reject with 401 Unauthorized without SQL syntax error (500)
        assert.equal(
          res.status,
          401,
          `Payload ${payload} must be rejected as invalid credentials without 500 error`
        );

        const json = await res.json();
        assert.equal(json.status, 401);
        assert.equal(json.detail, 'Invalid credentials.');
        // Verify response never contains database syntax errors or schema names
        assert.ok(!JSON.stringify(json).includes('syntax error'));
        assert.ok(!JSON.stringify(json).includes('pg_catalog'));
      });
    }
  });

  describe('Phase 2: Path Parameter SQL Injection Defense', () => {
    const pathSqliPayloads = [
      "1' OR '1'='1",
      "nonexistent'; DROP TABLE attempt; --",
      "1 UNION SELECT null, null, null--",
      "1' AND SLEEP(5)--",
      "1' AND 1=CONVERT(int, (SELECT @@version))--",
    ];

    for (const payload of pathSqliPayloads) {
      it(`should parameterize and reject malicious ID in /exams/[id]: ${payload}`, async () => {
        const req = new NextRequest(`http://localhost:3005/api/v1/exams/${encodeURIComponent(payload)}`);
        const res = await getExam(req, { params: { id: payload } });

        // Must return 404 (or 400) not 500
        assert.notEqual(
          res.status,
          500,
          `Injection in path parameter must not cause internal database failure: ${payload}`
        );
        const json = await res.json();
        assert.ok(
          res.status === 404 || res.status === 400 || json.success === false,
          'Should safely handle non-existent parameterized entity'
        );
      });
    }
  });

  describe('Phase 4: ORM Parameterization & Zero Raw SQL Audit', () => {
    it('should verify Prisma client queries are strictly parameterized', async () => {
      // Test direct Prisma call with SQL injection in string field
      const sqliName = "Robert'); DROP TABLE \"User\";--";
      const user = await prisma.user.findFirst({
        where: { email: sqliName },
      });
      // Query executes safely through prepared statement and returns null
      assert.equal(user, null);

      // Verify User table was NOT dropped!
      const userTableCount = await prisma.user.count();
      assert.ok(userTableCount >= 0, 'User table must remain intact and unharmed');
    });

    it('should audit entire codebase to verify absence of raw string-concatenated SQL queries', () => {
      const srcDir = path.join(process.cwd(), 'src');
      const filesWithVulnerabilities: string[] = [];

      function scanDir(dir: string) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            scanDir(fullPath);
          } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
            const content = fs.readFileSync(fullPath, 'utf8');
            if (
              content.includes('$queryRawUnsafe') ||
              content.includes('$executeRawUnsafe') ||
              (content.includes('$queryRaw`') && content.includes('${'))
            ) {
              filesWithVulnerabilities.push(fullPath);
            }
          }
        }
      }

      scanDir(srcDir);
      assert.equal(
        filesWithVulnerabilities.length,
        0,
        `Found vulnerable raw queries in: ${filesWithVulnerabilities.join(', ')}`
      );
    });
  });
});
