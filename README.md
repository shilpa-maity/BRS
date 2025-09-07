# LMS Signup & KYC – Phase 1 (Monorepo Scaffold)

Full-stack scaffold implementing the BRS: Admin registration, email/phone verification (OTP), KYC upload, dashboard, profile, notifications.

## Tech
- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS + React Hook Form + Zod
- **Backend:** Node.js + Express + TypeScript + Prisma + PostgreSQL
- **File uploads:** Multer (local storage by default)
- **Auth basics:** Email + password with email verification token
- **OTP:** 6-digit with expiry, attempts & resend cooldown (stored in DB)

## Quick Start

### 1) Requirements
- Node 18+
- PNPM or NPM/Yarn
- Docker (optional) for Postgres

### 2) Environment
Copy the examples and fill values:
```
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
```

### 3) Database (Docker)
```
docker compose up -d
```

### 4) Backend
```
cd apps/backend
pnpm install
pnpm prisma migrate dev --name init
pnpm dev
```

### 5) Frontend
```
cd apps/frontend
pnpm install
pnpm dev
```

Open http://localhost:3000

## Notes

- Email/SMS sending are mocked/logged to console for local dev.
- Replace `lib/mailer.ts` and `lib/sms.ts` with real providers later.
