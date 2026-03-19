# My Portfolio — Leonardo Cardoso

Personal portfolio built with Next.js + Node.js/Express, featuring WhatsApp contact integration via Evolution API.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 |
| Backend | Node.js + Express + TypeScript |
| Auth | JWT |
| Contact | Evolution API (WhatsApp) |
| Deploy | Easypanel (VPS Hostinger) |

## Structure

```
portfolio/
├── frontend/       # Next.js app
└── backend/        # Express API
```

## Getting Started

### Prerequisites

- Node.js v22+
- npm

### Install

```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

### Environment Variables

Copy the examples and fill in your values:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

**backend/.env**
```
PORT=3003
ALLOWED_ORIGINS=http://localhost:3000
JWT_SECRET=your_jwt_secret
API_SECRET=your_api_secret
EVOLUTION_API_URL=https://your-evolution-api-url
EVOLUTION_API_KEY=your_evolution_api_key
EVOLUTION_INSTANCE=your_instance_name
WHATSAPP_TARGET_NUMBER=5500000000000
```

**frontend/.env.local**
```
BACKEND_URL=http://localhost:3003
API_SECRET=your_api_secret
```

### Run (both frontend + backend)

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3003

## Security

- The browser never communicates directly with the backend
- Next.js API Routes act as a server-side proxy
- Backend URL and secrets are never exposed to the client
- JWT authentication between frontend proxy and backend
