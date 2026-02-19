# UNO AFP CHALLENGE

This project is a full stack application that allows users to play the UNO card game online. The application is built using Next.js for the frontend and Nest.js for the backend. The frontend is styled using Tailwind CSS and the backend uses a simple in-memory data store to manage game state and user information.

## Getting Started

### Prerequisites

- Node.js (v24 or later)
- Docker (for running the application in a containerized environment)
- PNPM (for managing dependencies)
- Git (for version control)


### Installation

1. Clone the repository:
   ```bash
    git clone git@github.com:ariel-rubilar/uno-test-full-stack.git
    cd uno-test-full-stack
    ```

#### Running locally

##### Frontend
```bash
    cd game-web
    pnpm install
    pnpm run dev
    
    # open http://localhost:3000 in your browser to access the frontend application.
```

#### Backend
```bash
    cd game-api
    pnpm install
    pnpm run start:dev
    
    # The backend server will start on http://localhost:3001
```


#### Running with Docker

This project uses Docker Compose to orchestrate multiple services:

- **postgres**: The PostgreSQL database for storing persistent data.
- **game-api**: The backend API built with Nest.js, which connects to the database.
- **game-web**: The frontend application built with Next.js.

To start all services, run:

```bash
docker compose up --build
```

- Open [http://localhost:3000](http://localhost:3000) in your browser for the frontend.
- Open [http://localhost:3001](http://localhost:3001) in your browser for the backend API.

To stop all running containers:

```bash
docker compose down
```

To start containers again (without rebuilding):

```bash
docker compose up
```

You can also start or stop individual services:

```bash
docker compose up game-api
docker compose stop game-web
```

To run only the database service (PostgreSQL):

```bash
docker compose up postgres
```

This will start just the database container, which you can use for local development or testing database connections.

To see running containers:

```bash
docker compose ps
```
