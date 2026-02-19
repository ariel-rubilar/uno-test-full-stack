# UNO Game Web

This is the frontend for the UNO AFP Challenge, built with Next.js and styled with Tailwind CSS.

---

## Quick Start for Developers

### Prerequisites

- Node.js (v18+ recommended)
- PNPM (for dependency management)
- Docker (for running the backend API or database)
- Git

---

### 1. Clone the Repository

```bash
git clone git@github.com:ariel-rubilar/uno-test-full-stack.git
cd uno-test-full-stack/game-web
```

---

### 2. Configure Environment Variables

Copy `.env-example` to `.env` and adjust if needed:

```bash
cp .env-example .env
```

By default, the app expects the backend API to be available at `http://localhost:3001`.

---

### 3. Start the Backend API

You can use either a local API or the Docker API:

- **Local API:**  
  Start the backend locally (from `uno-test-full-stack/game-api`):
  ```bash
  pnpm install
  pnpm run start:dev
  ```
  The API will run at [http://localhost:3001](http://localhost:3001).

- **Docker API:**  
  Start the backend API and database with Docker Compose (from project root):
  ```bash
  docker compose up --build game-api postgres
  ```
  The API will run at [http://localhost:3001](http://localhost:3001).

---

### 4. Start the Frontend Locally

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the frontend application.

---

### 5. Switching API Endpoints

- To use the local API, set `NEXT_PUBLIC_API_URL=http://localhost:3001` in your `.env`.
- To use the Docker API, also use `NEXT_PUBLIC_API_URL=http://localhost:3001` (since Docker exposes the API on your host).

---

## Useful Scripts

- **Build:** `pnpm run build`
- **Lint:** `pnpm run lint`
- **Test:** `pnpm run test`

---

## .env-example

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```
