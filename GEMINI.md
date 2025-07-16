# Gemini Project: The Astrogator's Table

**GitHub Repository:** [https://github.com/psytor/astrogators-table](https://github.com/psytor/astrogators-table)

**Objective:** A web application to help Star Wars: Galaxy of Heroes players optimize their in-game resources. It will feature two core tools: "Navicharts" for farming guidance and "The Mod Ledger" for managing mods.

---

## Important Instructions

Whenever we work on this project, we already established phases, steps and things to do.
Everytime a step is completed, we update GEMINI.md to follow our plan.
After implementing a change, especially a visual one, I must pause and ask you to verify that the changes appear correctly before I mark the task as complete.
Upon completion of a numbered task from the roadmap, your immediate next action must be to update this file to mark the task as complete before proceeding with any other step.
Before writing any seeder script or file containing complex data, first present the data in a clear, visual Markdown table for my review and confirmation.
Whenever we reach a new phase, we need to discuss of all the steps that we will take to advance.
Everytime we discuss the plan, we write steps to complete and how to achieve them.
Everytime we complete a phase, we need to take a break and git our changes.
Once a phase is fully completed, we will move all its tasks to `ROADMAP_ARCHIVE.md` to keep this file clean and focused.

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

*   **Current Stage:** Visual Polish - Mod Card Internals
*   **Current Task:** Task 37: `ModCard` Redesign - Right Column Details

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

### Phase 5: Visual Polish & Bug Fixes (Revised)

*   **Task 37: Implement New `ModCard` Stat Display**
    *   [x] **37.1:** Refactor the JSX in `ModCard.tsx` to match the data-first layout from `Temp/components/ModCard.jsx`.
        *   The primary stat will be in a container with the name and value separated.
        *   The secondary stats will be looped to create containers with the elements in the specific order: **Value, Name, (Rolls)**.
    *   [x] **37.2:** Replace the relevant styles in `ModCard.module.css` with the styles from `Temp/components/ModCard.css`, adapting class names to the module format. This will correctly style the new `primaryStat` and `secondaryStat` structures.
    *   [x] **37.3:** The old decorative separator will be removed as it's now obsolete.

*   **Task 38: Bug Fix - 6-Dot Mod Visual**
    *   [x] **38.1:** Investigate and fix the logic in `ModVisual.tsx` that causes 6-dot mods to display the incorrect 5-dot shape.

*   **Task 39: Display Fix - Character Icon Placement**
    *   [x] **39.1:** Adjust the CSS for the character icon placeholder in `ModCard.module.css` to ensure it is positioned correctly within the left column.

*   **Task 40: `ModCard` Background Enhancement**
    *   [x] **40.1:** Add a subtle, futuristic, fading horizontal line pattern to the background of the `ModCard` component to add visual depth.

*   **Task 41: Form and Header Polish**
    *   [x] **41.1:** Restyle `AllyCodeForm.tsx` and `PlayerHeader.tsx` and their CSS modules to align with the new dark, futuristic theme.

*   **Task 42: Final Visual Review**
    *   [ ] **42.1:** Conduct a final review of the `ModCard` and surrounding components.
    *   [ ] **42.2:** Identify and list any remaining minor visual bugs, alignment issues, or inconsistencies.
    *   [ ] **42.3:** Create a plan to address the identified issues before concluding the phase.

### Phase 6: Backend Data Refinement

*   **Task 40: Implement Backend Stat Formatting & Calculation**
    *   [ ] **40.1:** In `modHydrationService.ts`, create a helper function to format stat values.
    *   [ ] **40.2:** Convert all percentage-based stats from their decimal form (e.g., `0.085`) to a user-friendly number (e.g., `8.5`).
    *   [ ] **40.3:** Ensure flat stats are returned as-is.
    *   [ ] **40.4:** Update the `getPlayerData` function to use this new helper for both primary and secondary stats, ensuring the frontend receives clean, pre-formatted data.

---

## 7. Development Log

*   **2025-07-06:** Created `GEMINI.md` to establish a clear, step-by-step project plan.
*   **2025-07-06:** Completed Task 1: Defined project name as "The Astrogator's Table" and set the core objective.
*   **2025-07-06:** Completed Task 2 & 3: Selected and refined the full tech stack.
*   **2025-07-06:** Completed Task 4 & 5: Created Docker/env files and set up the GitHub repository.
