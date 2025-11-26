# DuniaTopUp — Next.js Full Project (Demo)
This project is a demo-ready Next.js app for a top-up website (DuniaTopUp). It includes:
- Frontend pages (index, admin)
- API routes: check-id, order, admin login, recent
- Placeholder integration for supplier (Digiflazz-style) and payment (Xendit placeholder)
- Simple JSON file storage for transactions (demo only) — replace with MongoDB in production
- `vercel.json` for easy Vercel deployment

## Quick Start (local)
1. Install dependencies
```bash
npm install
```

2. Run in development
```bash
npm run dev
```

3. Add env variables using `.env.local` (see `.env.example`)

## Deploy to Vercel
- Push to GitHub, then import project into Vercel (or use `vercel` CLI).
- Set env vars in Vercel dashboard matching `.env.example`.

## Notes
- Replace placeholder supplier/payment calls with real APIs and secure keys before production.
- Replace JSON storage with MongoDB Atlas for production readiness.
