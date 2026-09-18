# Guide 3: Local Deployment for Testing & Development

This guide provides step-by-step instructions to deploy and run the **TOEIC PRO Portal** locally on your development machine for automated testing, manual QA, and local feature development.

---

## 1. Quick Reference: Default Seed Credentials & URLs

After completing either setup method below, the application and its companion tools will be accessible at:

| Service / Interface | URL | Default Credentials |
| :--- | :--- | :--- |
| **Web Application** | `http://localhost:3000` (or `:3005`) | — |
| **Default Admin Account** | `http://localhost:3000/login` | **Email**: `admin@toeicpro.local`<br>**Password**: `AdminPassword123!` |
| **Default Student Account** | `http://localhost:3000/login` | **Email**: `student@toeicpro.local`<br>**Password**: `StudentPassword123!` |
| **Prisma Studio (DB GUI)** | `http://localhost:5555` | Direct visual database inspector |
| **OpenAPI / Swagger Spec** | Available in repo root | `openapi.json` and `openapi.yaml` |

---

## 2. Prerequisites

Ensure your development machine has the following installed:

- **Node.js**: `v18.17.0` or `v20.x` (LTS recommended). Check with `node -v`
- **npm**: `v9.x` or `v10.x`. Check with `npm -v`
- **Git**: `git -v`
- **Database Choice**:
  - **Option A (Easiest)**: [Docker Desktop](https://www.docker.com/products/docker-desktop/) (no local PostgreSQL installation needed).
  - **Option B (Native)**: Local [PostgreSQL 15 or 16](https://www.postgresql.org/download/) running on port `5432`.

---

## 3. Method A: One-Command Docker Setup (Recommended for Testing)

Docker provides an isolated, reproducible environment that matches production with zero configuration.

### Step 1: Prepare Environment File
Copy the environment template:
```bash
cp .env.example .env
```

### Step 2: Start the Entire Stack
Run Docker Compose:
```bash
docker compose up --build
```

### What Happens Automatically:
1. Starts an isolated **PostgreSQL 16** container on port `5432`.
2. Waits for PostgreSQL healthcheck to report healthy.
3. Builds the optimized Next.js 14 application container.
4. Executes `npx prisma db push` to create all tables and relationships.
5. Executes `node prisma/seed.js` to seed sample ETS tests, skills, daily quests, and test users.
6. Launches the web server on `http://localhost:3000`.

### To Stop the Containers:
```bash
# Stop containers
docker compose down

# Stop containers and erase local database volume (fresh start)
docker compose down -v
```

---

## 4. Method B: Native Node.js Setup (Fastest for Code Editing & Debugging)

Use this method if you want instant Hot Module Reloading (HMR) while modifying code.

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure `.env`
Ensure your local PostgreSQL service is running and configure `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/toeic_pro?schema=public"
JWT_SECRET="toeic-pro-local-test-jwt-secret-key-32chars"
JWT_REFRESH_SECRET="toeic-pro-local-test-jwt-refresh-secret-32chars"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> **Tip (PostgreSQL on macOS via Homebrew)**:
> ```bash
> brew install postgresql@16
> brew services start postgresql@16
> createdb toeic_pro
> ```

### Step 3: Generate Prisma Client & Push Schema
```bash
# Generate type-safe Prisma client
npx prisma generate

# Sync schema with database (creates all 24 models)
npm run db:push
```

### Step 4: Seed Database
Populate the database with test data:
```bash
npm run db:seed
```
*Output will display:*
```text
🌱 Starting database seed...
🧹 Cleaned existing tables.
✅ Admin user created: admin@toeicpro.local
✅ Student user created: student@toeicpro.local
✅ Diagnostic profile linked
✅ Full 200-question ETS Simulation Exam created
✅ 16-Day Saga Map initialized with 48 nodes
✅ Shop items and badges seeded
🚀 Seeding completed successfully!
```

### Step 5: Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 5. Running the Automated Test Suite

TOEIC PRO includes an automated test suite covering algorithms, API contracts, security checks, and UI/UX compliance.

### Run All Tests:
```bash
npm test
```

### Run Specific Test Categories:
```bash
# 1. Unit Tests (ETS Scoring Formulas, SM-2 Spaced Repetition, Guardian FSM, Gamification Rules)
npm run test:unit

# 2. Security & Penetration Tests (SQL Injection prevention, Auth bypass, Token tampering)
npm run test:security

# 3. API Contract Integration Tests (Auth, Exams, Saga Map, Notebook, Quests, Shop)
npm run test:api

# 4. UI/UX Design System Compliance Tests (Design tokens, Color contrast, Mobile ergonomics)
npm run test:ui

# 5. End-to-End User Journeys (Onboarding -> Diagnostic -> Saga Node -> Exam -> Victory)
npm run test:e2e
```

### Example Test Execution Output:
```text
▶ AssessmentService - ETS Equated Scoring & Assessment Rules
  ✔ should assign minimum score (5 L, 5 R, 10 Total) for 0 correct answers
  ✔ should scale linearly and round to nearest 5 points as per ETS standards
  ✔ should map exact matches from the ETS equating table
▶ Character Design & Animation FSM - Anime Celestial Guardians
  ✔ should define exactly 5 Anime Celestial Guardian Spirits
  ✔ should cycle through normal question flow: IDLE -> FOCUS -> VICTORY -> IDLE
▶ SpacedRepetition (SuperMemo SM-2 Algorithm)
  ✔ should calculate exponential interval using EF on third review
ℹ tests 34 passed | 0 failed | duration 1.2s
```

---

## 6. Inspecting and Managing the Database (Prisma Studio)

Prisma Studio is a visual database browser included with the project:

```bash
npm run db:studio
```
Navigate to `http://localhost:5555` to:
- View and edit questions, options, and explanations.
- Check user attempt telemetry (`timeSpentMs`, `isGuessed`, `clientSequence`).
- Modify user energy, gems, streak, or league tiers.
- Inspect `MistakeNotebook` SM-2 intervals and next review dates.

---

## 7. Troubleshooting Common Local Issues

### Issue 1: Port `3000` or `5432` Already in Use
**Symptom**: `Error: listen EADDRINUSE: address already in use :::3000`
**Solution**:
```bash
# Find and kill process on port 3000
lsof -ti :3000 | xargs kill -9

# Or specify a different port for Next.js
PORT=3005 npm run dev
```

### Issue 2: Database Connection Failed (`P1001`)
**Symptom**: `Can't reach database server at localhost:5432`
**Solution**:
- Verify PostgreSQL is running:
  - If using Docker: `docker ps`
  - If using macOS Homebrew: `brew services list`
  - If using Linux systemd: `sudo systemctl status postgresql`
- Check your password and database name inside `.env`.

### Issue 3: Schema Drift / Out of Sync Client
**Symptom**: `Property 'xyz' does not exist on type 'User'`
**Solution**:
```bash
npx prisma generate
npm run db:push
```

### Issue 4: Reset Database to Clean State
To completely purge and reseed test data:
```bash
npm run db:seed
```
*(The seed script automatically truncates all tables in reverse foreign-key order before re-inserting).*
