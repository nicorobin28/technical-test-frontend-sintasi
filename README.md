# SINTASI Fullstack Developer Test — Frontend

Quasar Framework + Vue 3 frontend for the Laravel API.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_RSA_PUBLIC_KEY` to the same RSA public key paired with the Laravel backend private key. The public key is intentionally safe to ship to the browser; the private key must never be included in this project.

## Implemented flow

1. Login encrypts username/password in the request payload.
2. Laravel returns a Sanctum token HttpOnly cookie.
3. Patient registration encrypts NIK/email in the request payload.
4. Backend stores NIK/email using Laravel encryption at rest.
5. Visit screen requires a medical record number, fetches patient data, then allows visit creation.
6. Visit count is returned by the backend from the number of visit records.
