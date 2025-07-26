# The Astrogator's Table - Data Pipeline

This project is the first phase of "The Astrogator's Table," responsible for creating a robust data pipeline to fetch raw player and game data from the SWGOH API and cache it for later use.

## Prerequisites

- Python 3.10+

## Development Setup

Follow these steps to set up your local development environment.

### 1. Create and Activate Virtual Environment

First, create a virtual environment to isolate project dependencies.

```bash
# Create the virtual environment
python3 -m venv .venv
```

Next, activate it. The command differs based on your operating system.

**On Linux or macOS:**
```bash
source .venv/bin/activate
```

**On Windows (Command Prompt):**
```bash
.venv\Scripts\activate.bat
```

**On Windows (PowerShell):**
```powershell
.venv\Scripts\Activate.ps1
```

After activation, your terminal prompt should be prefixed with `(.venv)`.

### 2. Install Dependencies

With the virtual environment active, install the required packages from the `requirements.txt` file.

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

The application requires API keys and other configuration to be set as environment variables.

1.  Make a copy of the example environment file:
    ```bash
    cp .env.example .env
    ```
2.  Open the newly created `.env` file and fill in the required values (e.g., `DISCORD_WEBHOOK_URL`, database credentials).

## Running the Application

Currently, you can run the test script to verify that the logging and Discord notification services are working correctly.

```bash
# Make sure your virtual environment is active
./test_discord.py
```

