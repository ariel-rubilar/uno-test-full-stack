## UNO Game API

This is the backend API for the UNO AFP Challenge, built with NestJS and TypeScript. It connects to a PostgreSQL database and exposes endpoints for game logic and user management.

---

## Quick Start for Developers

### Prerequisites

- Node.js (v18+ recommended)
- PNPM (for dependency management)
- Docker (for running the database)
- Git

---

### 1. Clone the Repository

```bash
git clone git@github.com:ariel-rubilar/uno-test-full-stack.git
cd uno-test-full-stack/game-api
```

---

### 2. Configure Environment Variables

Copy `.env-example` to `.env` and adjust if needed:

```bash
cp .env-example .env
```

**Note:** Always use Docker for the database. The default config connects to a local Docker PostgreSQL container.

---

### 3. Start the Database (PostgreSQL) with Docker

From the project root (`uno-test-full-stack`):

```bash
docker compose up postgres
```

This will start the database container only. The API will connect to it using the settings in `.env`.

---

### 4. Install Dependencies

```bash
pnpm install
```

---

### 5. Run the API Locally

```bash
pnpm run start:dev
```

The API will start on [http://localhost:3001](http://localhost:3001) and connect to the Docker database.

---

### 6. Run with Docker Compose (API + DB)

To run both the API and database in containers:

```bash
docker compose up --build game-api postgres
```

---

### 7. Useful Scripts

- **Build:** `pnpm run build`
- **Lint:** `pnpm run lint`
- **Test:** `pnpm run test`
- **Test Coverage:** `pnpm run test:cov`

---

## Tips

- The API always expects the database to be running in Docker (`postgres` service).
- You can use the local API with the Docker database, or run both in Docker.
- For development, start only the database with Docker and run the API locally for faster iteration.

---

## .env-example

See `.env-example` for required environment variables:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=appdb
```
