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

2.  **Set up environment variables:**
    *   Copy the example environment file: `cp .env.example .env`
    *   Fill in the required values in the `.env` file, such as database credentials and API keys.

3.  **Start background services:**
    *   Make sure Docker is installed and running.
    *   Run `docker compose up -d` to start the PostgreSQL database and the `swgoh-comlink` service.

4.  **Install dependencies:**
    ```bash
    npm install
    ```

5.  **Run the application:**
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Key Commands

*   **Start all background services:** `docker compose up -d`
*   **Stop all background services:** `docker compose down`
*   **Install dependencies:** `npm install`
*   **Run development server:** `npm run dev`
*   **Run database seed scripts:** `npm run db:seed`
*   **Run tests:** `npm run test` *(To be configured)*

---

## Services

### Discord Notification Service

This project includes a service to send notifications to a Discord channel via a webhook. This is useful for reporting the status of long-running scripts or important events.

**Setup:**

1.  Create a webhook in your Discord server's settings.
2.  Copy the webhook URL.
3.  In your `.env` file, set the `DISCORD_WEBHOOK_URL` variable to the URL you copied.

**Usage:**

The service is used by the test script `scripts/test-discord.ts`. You can run it to verify your configuration:

```bash
ts-node scripts/test-discord.ts
```