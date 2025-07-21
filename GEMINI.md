# Gemini Project: The Astrogator's Table

**GitHub Repository:** [https://github.com/psytor/astrogators-table](https://github.com/psytor/astrogators-table)

**Objective:** A web application to help Star Wars: Galaxy of Heroes players optimize their in-game resources. It will feature two core tools: "Navicharts" for farming guidance and "The Mod Ledger" for managing mods.

---

## Important Instructions

Whenever we work on this project, we already established phases, steps and things to do.
Everytime a step is completed, we update GEMINI.md to follow our plan.
After implementing a change, especially a visual one, I must pause and ask you to verify that the changes appear correctly before I mark the task as complete.
Upon completing the implementation for a numbered task, I must pause and ask you to verify the changes. After you confirm that everything is working as expected, my immediate next action must be to update this file to mark the task as complete.
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

*   **Current Stage:** Phase 11: Planning Next Steps
*   **Current Task:** Define the next development phase and tasks.

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
*   **Install dependencies:** `npm install`
*   **Run development server:** `npm run dev`
*   **Run tests:** `npm run test` (To be configured)

---

## 6. Roadmap

*(The next phase of development will be defined here.)*

---

## 7. Development Log

*   **2025-07-18:** Completed major development phases, including the database schema, data seeders, API endpoints, the frontend display, a full-featured workflow engine, and advanced UI controls. The application is now a functional prototype.
*   **2025-07-06:** Created `GEMINI.md` to establish a clear, step-by-step project plan.
*   **2025-07-06:** Completed Task 1: Defined project name as "The Astrogator's Table" and set the core objective.
*   **2025-07-06:** Completed Task 2 & 3: Selected and refined the full tech stack.
*   **2025-07-06:** Completed Task 4 & 5: Created Docker/env files and set up the GitHub repository.