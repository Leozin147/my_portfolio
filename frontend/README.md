# Frontend

Next.js app for the portfolio. See the [root README](../README.md) for the full setup (frontend + backend together).

## Run standalone

```bash
npm install
npm run dev
```

Opens on [http://localhost:3000](http://localhost:3000). Requires `frontend/.env.local` with `BACKEND_URL` and `API_SECRET` pointing at a running backend.

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, next-intl for pt-BR/en, Vitest for tests.

## Structure

```
app/          # routes (App Router)
components/   # shared UI components
context/      # theme and locale providers
messages/     # pt.json and en.json translation files
tests/        # Vitest test suites
```
