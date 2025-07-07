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

*   **Current Stage:** Database Seeding
*   **Current Task:** Task 22.1: Create the `/scripts` and `/scripts/seeders` directories.

---

## 3. Core Architecture

This section outlines the fundamental design principles of The Astrogator's Table. These principles are the source of truth for all development decisions.

### 3.1. Database as a Cache for Static Game Data

The PostgreSQL database serves as a local cache for static, infrequently changing game data. The primary goal is to minimize redundant calls to the `swgoh-comlink` API by storing data that rarely changes.

Examples of static data to be stored include:
*   Character, Ship, and Gear information.
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

*   **Mechanism:** These will be standalone scripts, likely located in the `/scripts` directory.
*   **Execution:** They will be designed to run on a schedule (e.g., as cron jobs).
*   **Timing:** The exact frequency of these updates (e.g., daily, weekly) will be determined later based on how often the underlying game data changes.

### 3.4. Open Architectural Decisions

This section tracks key technical decisions that need to be made at a later, more appropriate stage of development.

*   **Mod Evaluation: Backend vs. Frontend?**
    *   **Context:** The JSON payload for a player's full mod inventory can be very large. Processing this on the frontend could lead to poor performance, especially on mobile devices.
    *   **Decision:** We will decide whether the complex mod evaluation logic should run on the backend (server) or the frontend (browser) after the basic data structures and API endpoints are in place.

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
*   **Install dependencies:** `npm install`
*   **Run development server:** `npm run dev`
*   **Run tests:** `npm run test` (To be configured)

---

## 6. Roadmap

### Phase 1: Project Definition & Setup

- [x] **Task 1:** Define the project name and objective.
- [x] **Task 2:** Decide on the core technology stack.
- [x] **Task 3:** Refine tech stack to include Docker, Postgres, and Prisma.
- [x] **Task 4:** Create `docker-compose.yml`, `.env.example`, and `.gitignore`.
- [x] **Task 5:** Set up the Git repository on GitHub.
- [x] **Task 6:** Start the PostgreSQL container using `docker compose up -d`.
- [x] **Task 7:** Initialize the Next.js project.
- [x] **Task 8:** Install and configure Prisma to connect to the database.
- [ ] **Task 9:** Confirm all key commands and update the `Key Commands` section.

### Phase 2: The Mod Ledger - Data Foundation

This phase creates our database schema one table at a time, starting with independent "lookup" tables.

**Part A: Foundational Data Models**
*   [x] **Task 10:** Define the `Stat` model (simple version) in the Prisma schema.
*   [x] **Task 11:** Define the `ModSet` model in the Prisma schema.
*   [x] **Task 12:** Define the `ModShape` model in the Prisma schema.
*   [x] **Task 13:** Define the `ModQuality` (Tier/Color) model in the Prisma schema.
*   [x] **Task 14:** Define the `ModRarity` (Pips/Dots) model in the Prisma schema.
*   [x] **Task 15:** Define the `Material` model for all non-credit resources.

**Part B: Relationship and Costing Models**
These models depend on the tables from Part A, so we define them second.
*   [x] **Task 16:** Define the `ModShapePrimaryStat` model to link shapes to their possible primary stats.
*   [x] **Task 17:** Define the `StatRollInfo` model to link stats and rarities to their specific roll values.
*   [x] **Task 18:** Define the `LevelingCost` model to store credit costs for leveling mods.
*   [x] **Task 19:** Define the `SlicingInfo` model to map slicing paths to material costs.
*   [x] **Task 20:** Define the `CalibrationInfo` model to map calibration actions to material costs.

**Part C: Finalizing the Database**
*   [x] **Task 21:** Generate and apply the database migration.
*   **Task 22: Create Seeder Directory Structure & Main Script**
    *   **22.1:** Create the `/scripts` and `/scripts/seeders` directories.
    *   **22.2:** Create the main orchestrator script: `/scripts/seed.ts`.
*   **Task 23: Create Individual Seeder Scripts for Foundational Data**
    *   **23.1:** Create `/scripts/seeders/stats.ts`.
    *   **23.2:** Create `/scripts/seeders/modSets.ts`.
    *   **23.3:** Create `/scripts/seeders/modShapes.ts`.
    *   **23.4:** Create `/scripts/seeders/modQualities.ts`.
    *   **23.5:** Create `/scripts/seeders/modRarities.ts`.
    *   **23.6:** Create `/scripts/seeders/materials.ts`.
*   **Task 24: Create Individual Seeder Scripts for Relational Data**
    *   **24.1:** Create `/scripts/seeders/modShapePrimaryStats.ts`.
    *   **24.2:** Create `/scripts/seeders/statRollInfo.ts`.
    *   **24.3:** Create `/scripts/seeders/levelingCosts.ts`.
    *   **24.4:** Create `/scripts/seeders/slicingActions.ts`.
    *   **24.5:** Create `/scripts/seeders/slicingCosts.ts`.
    *   **24.6:** Create `/scripts/seeders/calibrationInfo.ts`.
*   **Task 25: Implement Seeding Logic**
    *   **25.1:** Write the logic in the main `seed.ts` to call each individual seeder in the correct order.
    *   **25.2:** Write the data and insertion logic for each individual seeder script.
*   **Task 26: Run Seeder and Verify Data**
    *   **26.1:** Execute the main `seed.ts` script.
    *   **26.2:** Connect to the database and verify all tables are populated correctly.

---

## 7. Development Log

*   **2025-07-06:** Created `GEMINI.md` to establish a clear, step-by-step project plan.
*   **2025-07-06:** Completed Task 1: Defined project name as "The Astrogator's Table" and set the core objective.
*   **2025-07-06:** Completed Task 2 & 3: Selected and refined the full tech stack.
*   **2025-07-06:** Completed Task 4 & 5: Created Docker/env files and set up the GitHub repository.