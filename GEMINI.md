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

*   **Current Stage:** Phase 8: The Bidirectional Workflow Engine
*   **Current Task:** Task 47: Define the Workflow Configuration

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

### Phase 8: The Bidirectional Workflow Engine

*   **Task 47: Define the Workflow Configuration**
    *   [x] **47.1:** Create the new configuration file at `src/config/evaluationWorkflows.ts`.
    *   [x] **47.2:** Create the `EVALUATION_WORKFLOWS` object using the hierarchical structure and `onPass`/`onFail` logic.
    *   [x] **47.3:** Create the `RESULT_CODES` object, ensuring it includes all necessary level-up and result codes (`LVL_6`, `LVL_9`, `LVL_12`, `LVL_15`, `ERROR`, etc.).

*   **Task 48: Implement the Library of Rule Functions**
    *   [x] **48.1:** Create the service file `src/services/modRuleFunctions.ts`.
    *   [x] **48.2:** Implement the `isSpeedArrow` check function.
    *   [x] **48.3:** Implement the `hasStat` check function.
    *   [x] **48.4:** Implement the `default` check function.

*   **Task 49: Build the Frontend Workflow Executor**
    *   [x] **49.1:** Create `src/services/modWorkflowService.ts`.
    *   [x] **49.2:** Implement the executor logic that reads the config, calls the rule functions, and follows the `onPass`/`onFail` directives. It will return an `ERROR` result for unreachable states.

*   **Task 50: Create API Endpoint for Workflows**
    *   [x] **50.1:** Create a new API route at `src/app/api/workflows/route.ts`.
    *   [x] **50.2:** This route will simply read and return the `evaluationWorkflows.ts` configuration file.

*   **Task 51: Integrate Workflow on the Frontend**
    *   [x] **51.1:** Create a new React Context (`WorkflowContext`) to fetch and store the workflow configuration once per page load.
    *   [x] **51.2:** Update the `ModCard.tsx` component to use this context.
    *   [x] **51.3:** In `ModCard.tsx`, call the workflow executor for the mod as it renders.
    *   [x] **51.4:** Use the result to dynamically set the recommendation text and color.

### Phase 9: Workflow Engine Documentation

*   **Task 52: Correct the Existing Workflow Configuration**
    *   [x] **52.1:** Update `src/config/evaluationWorkflows.ts` to use the correct rule function names (`statThreshold`, `defaultRule`).

*   **Task 53: Create the Evaluation Guide**
    *   [x] **53.1:** Create a new file in the project root named `EVALUATION_GUIDE.md`.
    *   [x] **53.2:** Write the full content for this guide, explaining the structure, the available rule functions, their parameters, and providing a complete, correct example.

*   **Task 54: Update the Project Roadmap**
    *   [x] **54.1:** Update `GEMINI.md` to add this new Phase 9 and mark all tasks as complete.

### Phase 10: Advanced UI Controls & Filtering

*   **Task 55: Implement the Advanced Top Bar**
    *   [x] **55.1:** Create a new `TopBar.tsx` component to house player account management and global controls.
    *   [x] **55.2:** Implement a player dropdown with add/delete functionality.
    *   [x] **55.3:** Implement a "Refresh" button with a disabled state during data fetching.
    *   [x] **55.4:** Add a mobile-friendly hamburger menu to the top bar.

*   **Task 56: Implement the Advanced Filter Panel**
    *   [x] **56.1:** Create a new `FilterPanel.tsx` component.
    *   [x] **56.2:** Implement comprehensive filter controls, including sprite-based selectors for sets and slots.
    *   [x] **56.3:** Implement a unified `advancedFilters` state object to manage all filter values.
    *   [x] **56.4:** Add a "Clear Filters" button and an active filter count badge.

*   **Task 57: Implement Filtering and Display Logic**
    *   [x] **57.1:** Implement the client-side logic to filter the mod list based on the `advancedFilters` state.
    *   [x] **57.2:** Create and integrate a `CollectionEfficiencyDisplay.tsx` component to show statistics for the filtered mods.

*   **Task 58: Implement Mobile-Responsive Layout**
    *   [x] **58.1:** Use CSS media queries to make the `FilterPanel` collapse into a button-triggered side tab on mobile viewports.
    *   [x] **58.2:** Ensure the `TopBar` and `ModGrid` adapt cleanly to smaller screens.

*   **Task 59: Implement the Mod Detail Modal**
    *   [ ] **59.1:** Create a `ModDetailModal.tsx` component to show an enlarged view of a mod.
    *   [ ] **59.2:** Add the logic to the `ModCard` to open the modal on click, passing the selected mod's data.

---

## 7. Development Log

*   **2025-07-06:** Created `GEMINI.md` to establish a clear, step-by-step project plan.
*   **2025-07-06:** Completed Task 1: Defined project name as "The Astrogator's Table" and set the core objective.
*   **2025-07-06:** Completed Task 2 & 3: Selected and refined the full tech stack.
*   **2025-07-06:** Completed Task 4 & 5: Created Docker/env files and set up the GitHub repository.