# TOEIC PRO - Adaptive 30-Day TOEIC Training Portal (v10.0.0)

TOEIC PRO is a 100% free and open-access adaptive TOEIC preparation platform featuring 2PL Item Response Theory (IRT) diagnostic testing, an adaptive 7-30 Day Saga Map curriculum (up to 90 stations) across 4 biomes with anime celestial spirit guardians, SuperMemo SM-2 spaced repetition mistake notebooks, and real-time 1v1 Arena matchmaking.

---

## 🚀 Deployment Guides

Choose the deployment guide that matches your target environment:

- 🌐 **[Guide 1: Vercel & Neon Serverless Deployment](DEPLOYMENT-VERCEL-NEON.md)**: Deploy to Vercel, Neon PostgreSQL, Cloudflare R2 (Audio storage), and Upstash Redis.
- ☁️ **[Guide 2: Cloud Infrastructure & Docker Deployment](DEPLOYMENT-CLOUD.md)**: Deploy to AWS EC2/ECS, GCP Cloud Run, DigitalOcean Droplets, or custom VPS with Nginx and SSL.
- 💻 **[Guide 3: Local Testing & Development Deployment](DEPLOYMENT-LOCAL-TESTING.md)**: Quickstart guide for testing locally using Docker Compose or native Node.js.
- 📚 **[Master Deployment Comparison Matrix](DEPLOYMENT-GUIDE.md)**: Architecture, cost comparison, and deployment trade-offs.

---

## ⚡ Quick Start for Local Testing

### Option A: Docker (One Command)
```bash
cp .env.example .env
docker compose up --build
```
Open `http://localhost:3000` in your browser.

### Option B: Native Node.js
```bash
npm install
npx prisma generate
npm run db:push
npm run db:seed
npm run dev
```

---

## 🔑 Default Test Accounts

- **Admin Account**: `admin@toeicpro.local` / `AdminPassword123!`
- **Student Account**: `student@toeicpro.local` / `StudentPassword123!`
- **Database Studio**: `npm run db:studio` (opens at `http://localhost:5555`)

---

## 🧪 Automated Testing

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run security & penetration tests
npm run test:security

# Run API contract tests
npm run test:api
```