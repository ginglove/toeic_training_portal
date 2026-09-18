# Guide 1: Deploying TOEIC PRO to Vercel, Neon & Serverless Ecosystem

This guide provides an end-to-end walkthrough for deploying the **TOEIC PRO Portal** (Next.js 14 App Router + Prisma) to a modern, fully managed **Serverless & Jamstack** architecture.

---

## 1. System Architecture & Recommended Services

For an interactive, high-traffic educational platform like TOEIC PRO, combining specialized serverless providers delivers high reliability, instant global scaling, and zero server maintenance:

```mermaid
flowchart TD
    User([Student / Admin Browser]) -->|HTTPS / Edge CDN| Vercel[Vercel Global Edge Network]
    
    subgraph Vercel ["Vercel (Compute & Frontend)"]
        UI[Next.js 14 App Router SSR / Static]
        API[Serverless Route Handlers /api/v1/*]
    end

    subgraph Neon ["Neon Database (Serverless Postgres)"]
        PgBouncer[Connection Pooler PgBouncer]
        Compute[Auto-scaling Postgres Compute]
        Storage[(PostgreSQL Storage / Branching)]
        PgBouncer --> Compute --> Storage
    end

    subgraph StorageService ["Audio & Media Storage (Cloudflare R2)"]
        R2[(R2 / S3 Bucket)]
        CDN[Cloudflare CDN - Zero Egress Fees]
        CDN --> R2
    end

    subgraph Upstash ["Upstash (Serverless Redis)"]
        Redis[(Redis Key-Value / Rate Limiting)]
    end

    API -->|Pooled Connection DATABASE_URL| PgBouncer
    API -->|Direct Connection DIRECT_URL for Migrations| Compute
    API -->|Session / Rate Limit / Arena Queue| Redis
    User -->|Stream TOEIC Audio MP3s & Sprites| CDN
```

### Recommended Service Stack

| Role | Recommended Service | Why This Service Fits TOEIC PRO | Free Tier / Cost |
| :--- | :--- | :--- | :--- |
| **Compute & Web Hosting** | **Vercel** | Native Next.js 14 App Router optimization, zero-config SSR, automatic edge caching, preview deployments. | Generous Free Hobby Tier; Pro at $20/mo |
| **Serverless Database** | **Neon** | Serverless PostgreSQL with instant autoscaling, built-in connection pooling (PgBouncer), point-in-time restore, and instant branching. | Free 0.5 GiB storage + autosuspend |
| **Audio & Asset CDN** | **Cloudflare R2** | TOEIC Listening tests (Parts 1–4) require hundreds of audio files. R2 offers **0 egress fees** (unlike AWS S3), saving massive bandwidth costs. | Free 10 GB storage, 10M reads/mo |
| **Cache & Rate Limiting** | **Upstash Redis** | Serverless Redis with HTTP REST API. Perfect for DDoS protection on auth routes, daily streak cache, and 1v1 Arena matchmaking. | Free 10,000 commands/day |
| **Transactional Email** | **Resend** | Fast, modern email delivery for student account verification and password reset. | Free 3,000 emails/month (100/day) |

---

## 2. Step 1: Provision the Serverless Database on Neon

1. Sign up or log in to [Neon Console](https://console.neon.tech/).
2. Click **Create Project**:
   - **Project Name**: `toeic-pro-production`
   - **Postgres Version**: `16`
   - **Region**: Choose the region closest to your target learners (e.g., `Singapore (ap-southeast-1)` for Southeast Asia, or `Frankfurt (eu-central-1)` / `N. Virginia (us-east-1)`).
3. Once created, navigate to the **Dashboard** and locate the **Connection Details** box.
4. Neon provides two distinct connection strings:
   - **Pooled connection string** (Used for application runtime to avoid exhausting PostgreSQL connection limits during traffic spikes):
     ```text
     postgresql://neondb_owner:AbCdEf123456@ep-sample-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true
     ```
   - **Direct connection string** (Used by Prisma CLI for schema migrations and push):
     ```text
     postgresql://neondb_owner:AbCdEf123456@ep-sample.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
     ```

---

## 3. Step 2: Configure Prisma for Serverless Connection Pooling

In serverless environments, hundreds of ephemeral Next.js function invocations can spawn simultaneously. To handle this cleanly:

1. Update `prisma/schema.prisma` datasource block to declare `directUrl`:
   ```prisma
   datasource db {
     provider  = "postgresql"
     url       = env("DATABASE_URL")
     directUrl = env("DIRECT_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }
   ```

2. Test pushing your schema directly from your terminal to Neon:
   ```bash
   # Export the direct connection temporarily
   export DATABASE_URL="postgresql://neondb_owner:PASSWORD@ep-sample.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

   # Push schema to create all 20+ tables & enums
   npx prisma db push

   # Seed initial admin, student, questions, daily quests, and items
   node prisma/seed.js
   ```

---

## 4. Step 3: Configure Cloudflare R2 for Audio & Media Assets

TOEIC Listening exams require high-bandwidth MP3 files (ETS audio stimuli, narrator questions, Lexling sprites).

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) > **R2 Object Storage**.
2. Click **Create Bucket** > Name it `toeic-pro-assets`.
3. In **Settings** > **Public Development URL** or **Custom Domain**:
   - Attach a custom domain like `assets.yourdomain.com` (or enable public R2 dev domain).
4. Organize your bucket folders:
   ```text
   toeic-pro-assets/
   ├── audio/
   │   ├── part1/
   │   ├── part2/
   │   ├── part3/
   │   └── part4/
   ├── images/
   │   ├── questions/
   │   └── passages/
   └── sprites/
       ├── sparky/
       └── echlet/
   ```
5. Ensure `next.config.js` allows image domains:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
     images: {
       domains: ['localhost', 'assets.yourdomain.com', 'images.unsplash.com'],
     },
   };
   module.exports = nextConfig;
   ```

---

## 5. Step 4: Deploy to Vercel

### 5.1 Import Project
1. Push your code to GitHub, GitLab, or Bitbucket.
2. Open the [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New** > **Project**.
3. Select your `toeic_training_portal` repository and click **Import**.

### 5.2 Build & Output Settings
- **Framework Preset**: `Next.js`
- **Root Directory**: `./` (leave default)
- **Build Command**: `prisma generate && next build`
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install`

### 5.3 Set Environment Variables
In the Vercel project configuration screen, add the following variables under **Environment Variables** (apply to `Production`, `Preview`, and `Development`):

| Variable Name | Value Description | Example Value |
| :--- | :--- | :--- |
| `DATABASE_URL` | Neon **Pooled** connection string (with `pgbouncer=true`) | `postgresql://user:pass@ep-xxx-pooler.region.neon.tech/neondb?sslmode=require&pgbouncer=true` |
| `DIRECT_URL` | Neon **Direct** connection string (bypasses pooler) | `postgresql://user:pass@ep-xxx.region.neon.tech/neondb?sslmode=require` |
| `JWT_SECRET` | 64+ char random secret for access tokens | `openssl rand -base64 48` |
| `JWT_REFRESH_SECRET` | 64+ char random secret for refresh tokens | `openssl rand -base64 48` |
| `NEXT_PUBLIC_APP_URL` | Production application URL | `https://toeicpro.yourdomain.com` (or `https://your-app.vercel.app`) |

### 5.4 Deploy
Click **Deploy**. Vercel will:
1. Clone the repository.
2. Install dependencies with `npm install`.
3. Run `prisma generate` to generate the custom Prisma Client.
4. Execute `next build` creating the production App Router bundles.
5. Deploy to Vercel's global Anycast Edge network.

---

## 6. Step 5: Custom Domain & SSL Setup

1. In your Vercel Project Dashboard, navigate to **Settings** > **Domains**.
2. Enter your custom domain (e.g. `toeicpro.com` or `learn.toeicpro.com`).
3. Add the DNS records provided by Vercel in your DNS manager (Cloudflare, Namecheap, Route53, etc.):
   - **Apex domain (`@`)**: A record pointing to `76.76.21.21`
   - **Subdomain (`learn` or `www`)**: CNAME record pointing to `cname.vercel-dns.com`
4. Vercel automatically provisions and renews Let's Encrypt SSL/TLS certificates.

---

## 7. Step 6: Post-Deployment Verification & Diagnostics

Verify your live production deployment:

1. **Health & Auth API**:
   ```bash
   curl -i https://toeicpro.yourdomain.com/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@toeicpro.local","password":"AdminPassword123!"}'
   ```
2. **Exams API**:
   ```bash
   curl -i https://toeicpro.yourdomain.com/api/v1/exams
   ```
3. **Database Latency & Connection Check**:
   - Check Neon Console **Compute** graphs for active connections.
   - Verify connection count stays within limits even during peak test sessions thanks to PgBouncer pooling.

---

## 8. Serverless Best Practices & Production Checklist

- [x] **Prisma Client Singletone**: `src/lib/prisma.ts` uses global caching to avoid creating multiple clients in development and warm serverless containers.
- [x] **Connection Pooling**: `DATABASE_URL` always targets `-pooler` endpoint on Neon.
- [x] **Egress Free Assets**: Audio files hosted on Cloudflare R2 / S3 to prevent huge bandwidth bills from Vercel.
- [x] **Cold Start Mitigation**: Critical dynamic API routes in Next.js 14 App Router are kept lightweight and tree-shaken.
