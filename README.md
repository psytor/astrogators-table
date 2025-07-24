# The Astrogator's Table

**Objective:** A web application to help Star Wars: Galaxy of Heroes players optimize their in-game resources. It will feature two core tools: "Navicharts" for farming guidance and "The Mod Ledger" for managing mods.

---

## Local Development Setup

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

## Key Commands

*   **Start all background services:** `docker compose up -d`
*   **Stop all background services:** `docker compose down`
*   **Install all dependencies:** `npm install`
*   **Run the development server:** `npm run dev`
*   **Run database migrations:** `npm run db:migrate`
*   **Seed the database:** `npm run db:seed`
*   **Run tests:** `npm run test` (To be configured)

---

## Services

### Logging Service

This project uses `winston` for structured logging. Logs are output to both the console and to rotating files in the `logs/` directory.

**Configuration:**

The log level can be configured in the `.env` file using the `LOG_LEVEL` variable. The available levels are: `error`, `warn`, `info`, `http`, `verbose`, `debug`, and `silly`. The default level is `info`.

**Log Files:**
*   `logs/app-<DATE>.log`: Contains all logs for the day.
*   `logs/error-<DATE>.log`: Contains only error-level logs for the day.

### Discord Notification Service

This project includes a service to send notifications to a Discord channel via a webhook. This is useful for reporting the status of long-running scripts or important events.

**Setup:**

1.  Create a webhook in your Discord server's settings.
2.  Copy the webhook URL.
3.  In your `.env` file, set the `DISCORD_WEBHOOK_URL` variable to the URL you copied.
