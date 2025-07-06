# Gemini Project: The Astrogator's Table

**GitHub Repository:** [https://github.com/psytor/astrogators-table](https://github.com/psytor/astrogators-table)

**Objective:** A web application to help Star Wars: Galaxy of Heroes players optimize their in-game resources. It will feature two core tools: "Navicharts" for farming guidance and "The Mod Ledger" for managing mods.

---

## 1. Local Development Setup

This guide explains how to set up the project on a new machine.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/psytor/astrogators-table.git
    cd astrogators-table
    ```
2.  **Authenticate with GitHub:**
    *   Install the GitHub CLI (`gh`).
    *   Run `gh auth login` and follow the prompts, choosing SSH as the protocol.
3.  **Set up environment variables:**
    *   Copy the example environment file: `cp .env.example .env`
    *   Generate a secure password and update the `POSTGRES_PASSWORD` and `DATABASE_URL` in the `.env` file.
4.  **Start background services:**
    *   Make sure Docker is installed and running.
    *   Run `docker compose up -d` to start the PostgreSQL database and the `swgoh-comlink` service.
5.  **Initialize the application (if first time):**
    *   Run `npx create-next-app@latest . --typescript --eslint --app --src-dir --no-tailwind --no-import-alias` (Note: the `.` installs in the current directory).
    *   Install Prisma: `npm install prisma --save-dev`
    *   Initialize Prisma: `npx prisma init`
6.  **Install dependencies:**
    ```bash
    npm install
    ```
7.  **Run the application:**
    ```bash
    npm run dev
    ```

---

## 2. Project Status

*   **Current Stage:** Setup
*   **Current Task:** Start the PostgreSQL container using `docker compose up -d` (Setup Step 4).

---

## 3. Tech Stack

*   **Application Framework:** Next.js with TypeScript
*   **Database:** PostgreSQL (via Docker)
*   **Database ORM:** Prisma
*   **Orchestration:** Docker Compose
*   **Package Manager:** npm
*   **API Documentation:** OpenAPI (Swagger)

---

## 4. Key Commands

*   **Start all background services:** `docker compose up -d`
*   **Stop all background services:** `docker compose down`
*   **Install dependencies:** `npm install`
*   **Run development server:** `npm run dev`
*   **Run tests:** `npm run test` (To be configured)

---

## 5. Roadmap

### Phase 1: Project Definition & Setup

- [x] **Task 1:** Define the project name and objective.
- [x] **Task 2:** Decide on the core technology stack.
- [x] **Task 3:** Refine tech stack to include Docker, Postgres, and Prisma.
- [x] **Task 4:** Create `docker-compose.yml`, `.env.example`, and `.gitignore`.
- [x] **Task 5:** Set up the Git repository on GitHub.
- [ ] **Task 6 (Current):** Start the PostgreSQL container using `docker compose up -d`.
- [ ] **Task 7:** Initialize the Next.js project.
- [ ] **Task 8:** Install and configure Prisma to connect to the database.
- [ ] **Task 9:** Confirm all key commands and update the `Key Commands` section.

### Phase 2: Core Features

*   [ ] **Task 10:** Review project licensing for potential commercialization.
*   [To be defined after setup is complete.]

---

## 6. Development Log

*   **2025-07-06:** Created `GEMINI.md` to establish a clear, step-by-step project plan.
*   **2025-07-06:** Completed Task 1: Defined project name as "The Astrogator's Table" and set the core objective.
*   **2025-07-06:** Completed Task 2 & 3: Selected and refined the full tech stack.
*   **2025-07-06:** Completed Task 4 & 5: Created Docker/env files and set up the GitHub repository.
