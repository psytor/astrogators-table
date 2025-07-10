# Gemini Project: The Astrogator's Table

**GitHub Repository:** [https://github.com/psytor/astrogators-table](https://github.com/psytor/astrogators-table)

**Objective:** A web application to help Star Wars: Galaxy of Heroes players optimize their in-game resources. It will feature two core tools: "Navicharts" for farming guidance and "The Mod Ledger" for managing mods.

---

## Important Instructions

Whenever we work on this project, we already established phases, steps and things to do.
Everytime a step is completed, we update GEMINI.md to follow our plan.
Upon completion of a numbered task from the roadmap, your immediate next action must be to update this file to mark the task as complete before proceeding with any other step.
Before writing any seeder script or file containing complex data, first present the data in a clear, visual Markdown table for my review and confirmation.
Whenever we reach a new phase, we need to discuss of all the steps that we will take to advance.
Everytime we discuss the plan, we write steps to complete and how to achieve them.
Everytime we complete a phase, we need to take a break and git our changes.

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

*   **Current Stage:** Frontend - Basic Mod Display
*   **Current Task:** Task 29: Create the Game Data Provider.

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
*   **Character Name Resolution:**
    *   **Context:** The `swgoh-comlink` API returns a `definitionId` for characters (e.g., `JEDIKNIGHTLUKE:SEVEN_STAR`) that needs to be mapped to a human-readable name. This requires fetching additional game data to create a reliable lookup table.
    *   **Decision:** This will be implemented in a later phase after the basic frontend is functional.
*   **Mod Evaluation Engine:**
    *   **Context:** The core feature of the application is to evaluate mods based on a set of rules and provide recommendations ("Keep", "Sell", "Slice") along with the reasons for the decision.
    *   **Decision:** This complex engine will be built after the basic mod inventory can be successfully fetched and displayed.

### 3.5. `swgoh-comlink` Security Model

The `swgoh-comlink` service is intended to be an **internal service**, accessible only by the Next.js application, not the public internet. Therefore, we will use a simple `ACCESS_KEY` for authentication between the two services, as defined in the `swgoh-comlink` documentation. The more complex HMAC signing with a `SECRET_KEY` is not necessary for this internal-only architecture.

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
- [x] **Task 9:** Confirm all key commands and update the `Key Commands` section.
- [x] **Task 9.1:** Implement a robust, file-based logging system using `winston`.
    - [x] **9.1.1:** Install `winston` and `winston-daily-rotate-file`.
    - [x] **9.1.2:** Create a centralized logger service at `/src/services/logger.ts`.
    - [x] **9.1.3:** Configure the logger with the format: `YYYY-MM-DD HH:mm:ss [ProcessID] [ProcessName] [LEVEL] Message`.
    - [x] **9.1.4:** Configure file and console output transports.
    - [x] **9.1.5:** Add `/logs` directory to `.gitignore`.
    - [x] **9.1.6:** Refactor all seeder scripts to use the new logger.

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
*   [x] **Task 19:** Define the `SlicingAction` and `SlicingCost` models to map slicing paths to material costs.
*   [x] **Task 20:** Define the `CalibrationCost` model to map calibration actions to material costs.

**Part C: Finalizing the Database**
*   [x] **Task 21:** Generate and apply the database migration.
*   **Task 22: Create Seeder Directory Structure & Main Script**
    *   [x] **22.1:** Create the `/scripts` and `/scripts/seeders` directories.
    *   [x] **22.2:** Create the main orchestrator script: `/scripts/seed.ts`.
*   **Task 23: Create and Implement Foundational Data Seeders**
    *   [x] **23.1:** Implement `/scripts/seeders/stats.ts`.
    *   [x] **23.2:** Implement `/scripts/seeders/modSets.ts`.
    *   [x] **23.3:** Implement `/scripts/seeders/modShapes.ts`.
    *   [x] **23.4:** Implement `/scripts/seeders/modQualities.ts`.
    *   [x] **23.5:** Implement `/scripts/seeders/modRarities.ts`.
    *   [x] **23.6:** Implement `/scripts/seeders/materials.ts`.
*   **Task 24: Create and Implement Relational Data Seeders**
    *   [x] **24.1:** Implement `/scripts/seeders/modShapePrimaryStats.ts`.
    *   [x] **24.2:** Implement `/scripts/seeders/statRollInfo.ts`.
    *   [x] **24.3:** Implement `/scripts/seeders/levelingCosts.ts`.
    *   [x] **24.4:** Implement `/scripts/seeders/slicingActions.ts`.
    *   [x] **24.5:** Implement `/scripts/seeders/slicingCosts.ts`.
    *   [x] **24.6:** Implement `/scripts/seeders/calibrationCosts.ts`.
*   **Task 25: Run Seeder and Verify Data**
    *   [x] **25.1:** Execute the main `seed.ts` script.
    *   [x] **25.2:** Connect to the database and verify all tables are populated correctly.

### Phase 3: The Mod Ledger - API Foundation

This phase focuses on creating the necessary API endpoints to serve our data to the frontend.

*   **Task 26: Create Player Mods API Endpoint**
    *   [x] **26.1:** Create the API route file and structure for `GET /api/player/mods/[allycode]`.
    *   [x] **26.2:** Implement basic request handling and validation for the 9-digit ally code.
*   **Task 27: Implement Data Hydration Service**
    *   [x] **27.1:** Configure environment variables for `swgoh-comlink`.
    *   [x] **27.2:** Create the `swgohComlinkService` to fetch raw player data, including `zod` for schema validation.
    *   [x] **27.3:** Define the "V1" display-only JSON structure (see `HydratedPlayerData` in `modHydrationService.ts`).
    *   [x] **27.4:** Implement the hydration logic to transform raw data into the V1 structure.
    *   [x] **27.5:** Integrate the service with the API route.
*   **Task 28: Create DB Lookups API Endpoint**
    *   [x] **28.1:** Create the API route at `GET /api/db-lookups` to serve static game data.
    *   [x] **28.2:** Implement the logic to fetch and return all static lookup data (stats, sets, shapes).

### Phase 4: Frontend - Basic Mod Display

This phase focuses on building the user interface to display the mod data.

*   **Task 29: Create the DB Lookups Provider**
    *   [x] **29.1:** Create a React Context named `DbLookupsProvider`.
    *   [x] **29.2:** Fetch data from `/api/db-lookups` on initial load.
    *   [x] **29.3:** Make the lookup tables available to all child components.
*   **Task 30: Create the Mod Display Page & Form**
    *   [x] **30.1:** Create the main page at `/src/app/mods/page.tsx` as a Client Component.
    *   [x] **30.2:** Implement state management for `allyCode`, `playerData`, `isLoading`, etc.
    *   [x] **30.3:** Create an `AllyCodeForm` component with an input and button.
*   **Task 31: Implement Player Data Fetching**
    *   [x] **31.1:** Implement the `onSubmit` handler for the form.
    *   [x] **31.2:** Set loading state and call the `/api/player/mods/[allycode]` endpoint.
    *   [x] **31.3:** Handle success and error states, updating the page accordingly.
*   **Task 32: Display the Mod Inventory**
    *   [x] **32.1:** Create a `PlayerHeader` component to show player name and mod count.
    *   [ ] **32.2:** Create a `ModGrid` component to layout the mod cards.
    *   [ ] **32.3:** Create a `ModCard` component with placeholders for recommendation and score.
    *   [ ] **32.4:** Implement CSS placeholders for mod rarity (dots) and shape (icon).
    *   [ ] **32.5:** Display primary and secondary stats using data from the `DbLookupsProvider`.

---

## 7. Development Log

*   **2025-07-06:** Created `GEMINI.md` to establish a clear, step-by-step project plan.
*   **2025-07-06:** Completed Task 1: Defined project name as "The Astrogator's Table" and set the core objective.
*   **2025-07-06:** Completed Task 2 & 3: Selected and refined the full tech stack.
*   **2025-07-06:** Completed Task 4 & 5: Created Docker/env files and set up the GitHub repository.
