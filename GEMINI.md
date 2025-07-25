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

*   **Current Stage:** Phase 15: The Data Orchestrator - Characters
*   **Current Task:** 1. Define the `GameVersion` model in `schema.prisma`.

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

The application follows a clear, three-step data flow within the `apps/mod-ledger` directory:

1.  **Data Source (`swgoh-comlink`):** The Docker container provides the live, raw game data, including player-specific information.
2.  **Backend (`src/backend`):** The backend, containing services like `swgohComlinkService.ts` and `modHydrationService.ts`, is responsible for:
    *   Fetching raw data from `swgoh-comlink`.
    *   Querying our PostgreSQL database (defined in `packages/database`) to augment the raw data with static information.
    *   Cleaning and preparing the combined data into a format suitable for the frontend. This logic is exposed via Next.js API routes located in `src/app/api`.
3.  **Frontend (`src/frontend`):** The frontend, consisting of React components, contexts, and services, is responsible for:
    *   Displaying the data provided by the backend.
    *   Handling all user interaction and client-side state.
    *   Executing the mod evaluation logic via the `modWorkflowService.ts`.

### 3.3. Database Seeding and Maintenance

The database will be populated and kept up-to-date by automated scripts.

*   **Mechanism:** These will be standalone scripts located in the `packages/database/seeders/` directory. The main orchestration script, `packages/database/seed.ts`, runs all the individual seeder files.
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

### 3.7. Standalone Script Execution

This project contains both a Next.js web application and standalone TypeScript scripts (e.g., for database orchestration) that are intended to be run from the command line, potentially via `cron` jobs. These two environments have different capabilities and require different configurations.

*   **Environment Conflict:** The Next.js app runs in a "DOM" environment, which includes browser-specific APIs. Standalone scripts run in a pure "Node.js" environment. A common conflict point is the global `fetch` API, where the Next.js version accepts a `cache` property that the Node.js version does not, leading to TypeScript errors.
*   **Solution:** To resolve this, all standalone scripts must be executed using a command that forces the TypeScript compiler to use the correct module system for Node.js. The `cache` property was removed from the `fetch` calls to ensure compatibility in both environments.

The canonical command for running a standalone script is:
```bash
npx dotenv-cli -- npx ts-node --compilerOptions '{"module": "commonjs"}' path/to/your/script.ts
```

### 3.8. Logging Conventions

To ensure clean and useful logs, especially for automated scripts, we will adhere to the following log levels:

*   **`error`**: For any error that stops a process or causes it to fail (e.g., cannot connect to the database, a critical API call fails).
*   **`warn`**: For unexpected situations that do not stop the process but should be investigated (e.g., an API returns an empty list when data was expected, a fallback value is used).
*   **`info`**: For high-level, summary information that shows the main progress of a script. This should be used for key milestones like "Starting orchestration," "Game versions match," or "Synchronization complete."
*   **`debug`**: For detailed, step-by-step information that is useful for tracing the exact execution flow. This includes things like "Fetching data from endpoint X," "Processing Y records," or "Comparing A and B." This level is not expected to be enabled in a standard production run.

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

## Phase 15: The Data Orchestrator - Characters

**High-Level Goal:** To create a robust, automated system that synchronizes static character data from the `swgoh-comlink` API into our database. This system must be resilient, prevent data corruption, and use a soft-delete pattern to preserve historical integrity for dependent systems like Navicharts.

### Part 1: Database Schema

*   [x] **1. Define `GameVersion` Model:**
    *   **Action:** Add a new model to `packages/database/prisma/schema.prisma` named `GameVersion`.
    *   **Purpose:** This table will act as a key-value store to track the versions of different game data assets and when they were last checked and updated.
    *   **Fields:**
        *   `id`: Autoincrementing Integer, Primary Key.
        *   `metadata_key`: String, Unique. (e.g., "latestGamedataVersion").
        *   `metadata_value`: String. (e.g., "c7g82d...").
        *   `last_checked`: DateTime. (Timestamp of the last time the orchestrator ran for this key).
        *   `last_updated`: DateTime. (Timestamp of the last successful data sync for this key).
    *   **Verification:** Run `npx prisma validate`.

*   [x] **2. Define `Character` Model:**
    *   **Action:** Add a new model to `schema.prisma` named `Character`.
    *   **Purpose:** This table will store the curated, essential static data for each character in the game.
    *   **Fields:**
        *   `id`: Autoincrementing Integer, Primary Key.
        *   `game_id`: String, Unique. (The immutable `definitionId` from the game API).
        *   `name_key`: String. (The localization key for the character's name).
        *   `alignment`: String.
        *   `factions`: Array of Strings.
        *   `roles`: Array of Strings.
        *   `raids`: Array of Strings.
        *   `unit_type`: String.
        *   `icon_url`: String.
        *   `is_active`: Boolean, Default: `true`. (For soft-deleting).
        *   `created_at`: DateTime, Default: `now()`.
        *   `updated_at`: DateTime, Auto-updated on change.
    *   **Verification:** Run `npx prisma validate`.

*   [x] **3. Apply Schema to Database:**
    *   **Action:** Run the `npm run db:migrate` command to generate a new migration and apply these schema changes to the database.
    *   **Verification:** The command should complete successfully, and the new `GameVersion` and `Character` tables should be visible in the database.

### Part 2: The Main Orchestrator

*   [x] **4. Create Main Orchestrator File:**
    *   **Action:** Create a new directory `packages/database/orchestrators/`. Inside it, create a new file named `dataOrchestrator.ts`.
    *   **Purpose:** This script will be the main entry point for all automated data synchronization tasks.
    *   **Verification:** The file exists at the specified path.

*   [x] **5. Implement Game Version Logic:**
    *   **Action:** In `dataOrchestrator.ts`, implement the core logic to fetch the `latest_game_version` from the `swgoh-comlink` API and compare it to the version stored in our `GameVersion` table.
    *   **Action:** The script will log whether an update is needed or not.
    *   **Verification:** Run the script and confirm it correctly logs the version status.

### Part 3: The Character Synchronization Module

*   [x] **6. Create Character Sync Module:**
    *   **Action:** In `packages/database/orchestrators/`, create a new file named `syncCharacters.ts`.
    *   **Purpose:** This module will contain all the logic specifically for synchronizing character data. It will be called by the main orchestrator.
    *   **Verification:** The file exists at the specified path.

*   [x] **7. Implement "Versions Match" Logic:**
    *   **Action:** In `syncCharacters.ts`, implement the function that runs when the game version has **not** changed. This function will compare the character count in the API with the count in our database to detect anomalies.
    *   **Action:** For now, it will just log a `console.error` if the counts do not match.
    *   **Verification:** Call the function and log the output.

*   [ ] **8. Implement "Versions Don't Match" Logic:**
    *   **Action:** In `syncCharacters.ts`, implement the main synchronization function that runs when a new game version is detected.
    *   **Sub-task (8a):** Fetch all characters from the API and all characters from our database.
    *   **Sub-task (8b):** Identify and `INSERT` new characters.
    *   **Sub-task (8c):** Identify and soft `DELETE` retired characters (set `is_active` to `false`).
    *   **Sub-task (8d):** Identify and `UPDATE` existing characters if their data has changed.
    *   **Verification:** Test each sub-task individually by logging the results.

### Part 4: Integration and Finalization

*   [ ] **9. Integrate Character Sync into Main Orchestrator:**
    *   **Action:** In `dataOrchestrator.ts`, add the logic to call the appropriate function from `syncCharacters.ts` based on whether the game version has changed.
    *   **Verification:** Run the main orchestrator and confirm it triggers the correct character sync logic.

*   [ ] **10. Implement Final Version Update:**
    *   **Action:** At the end of a successful synchronization in `dataOrchestrator.ts`, add the `prisma.gameVersion.update()` call to store the new `latest_game_version`.
    *   **Verification:** Run a full sync and confirm the `GameVersion` table is updated in the database.

*   [ ] **11. Integrate into Main Seeder:**
    *   **Action:** Modify the main `packages/database/seed.ts` file to call the `dataOrchestrator`.
    *   **Verification:** Run `npm run db:seed` and confirm the orchestrator executes as expected.

---

## 7. Future Technical Tasks

This section lists specific, isolated technical tasks that need to be completed in the future.

*   [ ] **Replace Placeholder Data in `PlayerHeader.tsx`:** The `PlayerHeader` component, located at `apps/mod-ledger/src/frontend/components/PlayerHeader.tsx`, currently uses hardcoded placeholder data for the `CollectionEfficiencyDisplay`. This needs to be replaced with a real data-fetching mechanism that calls a new backend API endpoint. The endpoint will be responsible for calculating the collection efficiency scores based on the player's actual mod data.

---

## 8. Development Log

*   **2025-07-18:** Completed major development phases, including the database schema, data seeders, API endpoints, the frontend display, a full-featured workflow engine, and advanced UI controls. The application is now a functional prototype.
*   **2025-07-06:** Created `GEMINI.md` to establish a clear, step-by-step project plan.
*   **2025-07-06:** Completed Task 1: Defined project name as "The Astrogator's Table" and set the core objective.
*   **2025-07-06:** Completed Task 2 & 3: Selected and refined the full tech stack.
*   **2025-07-06:** Completed Task 4 & 5: Created Docker/env files and set up the GitHub repository.