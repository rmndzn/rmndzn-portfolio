# RMNDEV Arcade Portfolio

Vite + React portfolio project based on your uploaded arcade portfolio component.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Environment variables

Copy `.env.example` to `.env` and set:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

If you do not set Supabase variables, the app will still run using the fallback project data already built into `src/App.jsx`.

## Vercel deploy

1. Upload this folder to GitHub.
2. Import the repo in Vercel.
3. Framework preset: Vite.
4. Add the same environment variables in Vercel if you want live Supabase data.
5. Deploy.
