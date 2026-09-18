# TOEIC PRO Portal - Master Deployment Guide

Welcome to the deployment documentation for the **TOEIC PRO Portal (v10.0.0)**. This repository contains three dedicated, production-tested deployment guides tailored to different environments and operational scales.

---

## 🚀 Quick Navigation to Deployment Guides

| Guide | Target Environment | Key Technologies | Ideal For |
| :--- | :--- | :--- | :--- |
| 📖 **[Guide 1: Vercel & Neon Serverless](DEPLOYMENT-VERCEL-NEON.md)** | Modern Serverless Ecosystem | **Vercel** + **Neon** + **Cloudflare R2** + **Upstash Redis** | Rapid launch, zero infrastructure management, global edge CDN, auto-scaling |
| 📖 **[Guide 2: Cloud Container / VPS](DEPLOYMENT-CLOUD.md)** | Self-Hosted / Dedicated Cloud | **Docker** + **Nginx** + **AWS / GCP / DigitalOcean** | Complete data sovereignty, predictable fixed costs, enterprise VPC control |
| 📖 **[Guide 3: Local Testing & Dev](DEPLOYMENT-LOCAL-TESTING.md)** | Local Machine / CI Testing | **Node.js 20** + **Docker Compose** + **Prisma Studio** | Automated testing, QA verification, feature development, offline evaluation |

---

## 📊 Comparison Matrix

| Criteria | 1. Vercel & Neon (Serverless) | 2. Cloud Service (Container / VPS) | 3. Local Testing Environment |
| :--- | :--- | :--- | :--- |
| **Setup Complexity** | ⭐ Low (5–10 mins) | ⭐⭐⭐ Medium (15–30 mins) | ⭐ Low (1 command with Docker) |
| **Server Maintenance** | None (Fully managed) | OS updates, Nginx, backups | Local only |
| **Database Tier** | Serverless PostgreSQL (Neon) | Dedicated PostgreSQL (RDS or Container) | Local PostgreSQL / Docker |
| **Connection Pooling** | Handled by Neon PgBouncer | Native / PgBouncer container | Direct connection |
| **Audio File Hosting** | Cloudflare R2 (0 egress fees) | AWS S3 / MinIO / Local Nginx | Local `public/` directory |
| **Scalability** | Instant, automatic edge scaling | Horizontal scaling via Load Balancer | Single user |
| **Pricing / Cost** | Free Tier available; ~$20+/mo Pro | Fixed ~$6–$25/mo on VPS | Free ($0) |
| **Target Audience** | Production Web Launch | Enterprise / Dedicated VPS | Developers & QA Engineers |

---

## 🛠 Project Architecture & Core Technologies

- **Frontend & Fullstack Framework**: Next.js 14.2 (App Router, Server Components, Route Handlers)
- **Database & ORM**: PostgreSQL 16 + Prisma ORM 5.x
- **Authentication**: Stateless JWT + Refresh Token in secure HTTP-only cookies
- **Styling**: Tailwind CSS 3.4 + Lucide Icons
- **Psychometrics & Evaluation**: Item Response Theory (2PL IRT), ETS Equated Scoring Formula, SuperMemo SM-2 Spaced Repetition Algorithm

---

## 🔑 Environment Variables Reference Matrix

| Variable | Guide 1 (Vercel + Neon) | Guide 2 (Cloud VPS / Docker) | Guide 3 (Local Testing) |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | Neon pooled URL (`?pgbouncer=true`) | `postgresql://user:pass@db:5432/toeic_pro` | `postgresql://postgres:postgres@localhost:5432/toeic_pro` |
| `DIRECT_URL` | Neon direct URL (port 5432) | Not required (direct by default) | Not required |
| `JWT_SECRET` | 64-char random production key | 64-char random production key | Development key |
| `JWT_REFRESH_SECRET` | 64-char random production key | 64-char random production key | Development key |
| `NEXT_PUBLIC_APP_URL` | `https://toeicpro.yourdomain.com` | `https://toeicpro.yourdomain.com` | `http://localhost:3000` |

---

## 📦 Accompanying Infrastructure Files in this Repository

The repository includes pre-configured deployment artifacts:
- **[`Dockerfile`](Dockerfile)**: Multi-stage Alpine container with Next.js standalone optimization (~140MB).
- **[`docker-compose.yml`](docker-compose.yml)**: Local testing compose configuration with PostgreSQL 16 & automated seed.
- **[`docker-compose.prod.yml`](docker-compose.prod.yml)**: Production cloud compose stack with Nginx SSL reverse proxy, PostgreSQL, and restart policies.
- **[`nginx/nginx.conf`](nginx/nginx.conf)**: Production-ready Nginx configuration with gzip, security headers, and static asset caching.
- **[`.env.example`](.env.example)**: Comprehensive environment variable template with annotations for all environments.
