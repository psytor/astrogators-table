# Roadmap Archive

This document contains the history of all completed phases and tasks for The Astrogator's Table project.

---

## Completed Phases

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
    *   [x] **32.2:** Create a `ModGrid` component to layout the mod cards.
    *   [x] **32.3:** Create a `ModCard` component with placeholders for recommendation and score.
    *   [x] **32.4:** Implement sprite-based rendering for mod shape, set, and color tinting.
    *   [x] **32.5:** Add styled placeholders for calibration count.
    *   [x] **32.6:** Pass character ID to `ModCard` and display it.
    *   [x] **32.7:** Display primary and secondary stats using data from the `DbLookupsProvider`.

---
## 7. Development Log

*   **2025-07-06:** Created `GEMINI.md` to establish a clear, step-by-step project plan.
*   **2025-07-06:** Completed Task 1: Defined project name as "The Astrogator's Table" and set the core objective.
*   **2025-07-06:** Completed Task 2 & 3: Selected and refined the full tech stack.
*   **2025-07-06:** Completed Task 4 & 5: Created Docker/env files and set up the GitHub repository.
