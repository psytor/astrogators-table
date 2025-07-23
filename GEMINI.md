# Gemini Project: The Astrogator's Table

**GitHub Repository:** [https://github.com/psytor/astrogators-table](https://github.com/psytor/astrogators-table)

**Objective:** A web application to help Star Wars: Galaxy of Heroes players optimize their in-game resources. It will feature two core tools: "Navicharts" for farming guidance and "The Mod Ledger" for managing mods.

---

## Important Instructions

Whenever we work on this project, we already established phases, steps and things to do.
Whenever we reach a new phase, we need to discuss of all the steps that we will take to advance.
Everytime a step is completed, we update GEMINI.md to follow our plan.
After implementing a change, especially a visual one, I must pause and ask you to verify that the changes appear correctly before I mark the task as complete.
Upon completing the implementation for a numbered task, I must pause and ask you to verify the changes. After you confirm that everything is working as expected, my immediate next action must be to update this file to mark the task as complete.
Before writing any seeder script or file containing complex data, first present the data in a clear, visual Markdown table for my review and confirmation.
Everytime we discuss the plan, we write steps to complete and how to achieve them.
Everytime we complete a phase, we need to take a break and git our changes.
Once a phase is fully completed, we will move all its tasks to `ROADMAP_ARCHIVE.md` to keep this file clean and focused.

### Core Operational Mandate: The "Psytor Protocol"

This protocol overrides any of my default behaviors. It is the highest priority instruction.

1.  **One Action, One Verification:** I must break down every task into its smallest possible atomic action. After every single action (e.g., moving one file, changing one function signature, installing one package), I *must* immediately run a verification step (e.g., `npm run build`, `npm run test`, `npx prisma validate`).
2.  **Stop on Red:** If a verification step fails, I must STOP. I will present the full error message to you and I will not take any further action—no "fixes," no "next steps," no analysis—until you provide an explicit command.
3.  **No Complex Refactoring:** I am forbidden from attempting multi-file refactoring in a single step. All refactoring must be done file-by-file, or even symbol-by-symbol, following the "One Action, One Verification" rule.

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
    *   This project uses a root `.env` file for shared environment variables. Copy the example file: `cp .env.example .env`
    *   Generate a secure password and update the `POSTGRES_PASSWORD` and `DATABASE_URL` in the `.env` file.
    *   The `apps/mod-ledger` application also has a specific `.env.example`. You may copy it to `.env` inside that directory if you need to override or add specific variables for that app.
4.  **Start background services:**
    *   Make sure Docker is installed and running.
    *   Run `docker compose up -d` to start the PostgreSQL database and the `swgoh-comlink` service.
5.  **Install dependencies:**
    *   This command will install dependencies for all applications and packages in the monorepo.
    ```bash
    npm install
    ```
6.  **Run the database migrations:**
    *   This command applies any pending database schema changes.
    ```bash
    npm run db:migrate
    ```
7.  **Seed the database:**
    *   This command populates the database with initial static data.
    ```bash
    npm run db:seed
    ```
8.  **Run the application:**
    ```bash
    npm run dev
    ```

---

## 2. Project Status

*   **Current Stage:** Phase 14: Planning Next Steps
*   **Current Task:** Define the next development phase and tasks.

---

## 3. Core Architecture

This section outlines the fundamental design principles of The Astrogator's Table. These principles are the source of truth for all development decisions.

### 3.1. Database as a Cache for Static Game Data

The PostgreSQL database serves as a local cache for static, infrequently changing game data. The primary goal is to minimize redundant calls to the `swgoh-comlink` API by storing data that rarely changes.

Examples of static data to be stored include:
*   Character, Ship information.
*   Definitions and properties of Mod Sets (e.g., the bonuses for a Health set).
*   Any other static data required for evaluations or display that is not player-specific.

### 3.2. Data Flow and Responsibilities

The application follows a clear, three-step data flow:

1.  **Data Source (`swgoh-comlink`):** The Docker container provides the live, raw game data, including player-specific information.
2.  **Backend (Next.js API Routes):** The backend is responsible for:
    *   Fetching raw data from `swgoh-comlink`.
    *   Querying our PostgreSQL database to augment the raw data with static information (e.g., adding full character details to a player's roster ID).
    *   Cleaning and preparing the combined data into a format suitable for the frontend.
3.  **Frontend (Next.js React Components):** The frontend is responsible for displaying the data provided by the backend.

### 3.3. Database Seeding and Maintenance

The database will be populated and kept up-to-date by automated scripts.

*   **Mechanism:** These will be standalone scripts located in the `packages/database/seeders/` directory, with the main orchestration script at `packages/database/seed.ts`.
*   **Execution:** They will be designed to run on a schedule (e.g., as cron jobs).
*   **Timing:** The exact frequency of these updates (e.g., daily, weekly) will be determined later based on how often the underlying game data changes.

### 3.4. Open Architectural Decisions

This section tracks key technical decisions that need to be made at a later, more appropriate stage of development.

*   **Mod Evaluation: Backend vs. Frontend?**
    *   **Context:** The JSON payload for a player's full mod inventory can be very large. Processing this on the frontend could lead to poor performance, especially on mobile devices.
    *   **Decision:** We have decided to implement the mod evaluation logic on the **frontend**. The backend will provide the raw mod data and a separate configuration file containing the evaluation rules. The browser will then execute the evaluation logic on-demand.
*   **Character Name Resolution:**
    *   **Context:** The `swgoh-comlink` API returns a `definitionId` for characters (e.g., `JEDIKNIGHTLUKE:SEVEN_STAR`) that needs to be mapped to a human-readable name. This requires fetching additional game data to create a reliable lookup table.
    *   **Decision:** This will be implemented in a later phase after the basic frontend is functional.

### 3.5. `swgoh-comlink` Security Model

The `swgoh-comlink` service is intended to be an **internal service**, accessible only by the Next.js application, not the public internet. Therefore, we will use a simple `ACCESS_KEY` for authentication between the two services, as defined in the `swgoh-comlink` documentation. The more complex HMAC signing with a `SECRET_KEY` is not necessary for this internal-only architecture.

### 3.6. Evaluation Engine Extensibility

Whenever a new rule function (e.g., `isArrowPrimSpeed`) is added to the evaluation engine, a corresponding user-friendly description must also be added to the `ruleDescriptions.ts` file. This ensures that all evaluation steps are clearly understandable to the end-user in the UI.

---

## 4. Tech Stack

*   **Application Framework:** Next.js with TypeScript
*   **Database:** PostgreSQL (via Docker)
*   **Database ORM:** Prisma
*   **Orchestration:** Docker Compose
*   **Package Manager:** npm
*   **API Documentation:** OpenAPI (Swagger)

---

## 5. Key Commands

*   **Start all background services:** `docker compose up -d`
*   **Stop all background services:** `docker compose down`
*   **Install all dependencies:** `npm install`
*   **Run the development server:** `npm run dev`
*   **Run database migrations:** `npm run db:migrate`
*   **Seed the database:** `npm run db:seed`
*   **Run tests:** `npm run test` (To be configured)

---

## 6. Roadmap

*(The next phase of development will be defined here.)*

---

## 7. Future Technical Tasks

This section lists specific, isolated technical tasks that need to be completed in the future.

*   [ ] **Replace Placeholder Data in `PlayerHeader.tsx`:** The `PlayerHeader` component currently uses hardcoded placeholder data for the `CollectionEfficiencyDisplay`. This needs to be replaced with a real data-fetching mechanism that calls a new backend API endpoint. The endpoint will be responsible for calculating the collection efficiency scores based on the player's actual mod data.

---

## 8. Development Log

*   **2025-07-18:** Completed major development phases, including the database schema, data seeders, API endpoints, the frontend display, a full-featured workflow engine, and advanced UI controls. The application is now a functional prototype.
*   **2025-07-06:** Created `GEMINI.md` to establish a clear, step-by-step project plan.
*   **2025-07-06:** Completed Task 1: Defined project name as "The Astrogator's Table" and set the core objective.
*   **2025-07-06:** Completed Task 2 & 3: Selected and refined the full tech stack.
*   **2025-07-06:** Completed Task 4 & 5: Created Docker/env files and set up the GitHub repository.