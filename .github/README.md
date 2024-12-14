# Budgeteer
A personal finance tracker.

## Prerequisites

To get started with Budgeteer, ensure that you have the following tools installed and properly configured on your system:

1. **Docker**: A platform to develop, ship, and run applications using containers.
   - Installation guide: [Install Docker](https://docs.docker.com/get-docker/)
2. **Docker Compose**: A tool for defining and running multi-container Docker applications.
   - Installation guide: [Install Docker Compose](https://docs.docker.com/compose/install/)
3. **Bun**: A runtime that serves as a drop-in alternative to Node.js.
   -  Installation guide: [Install Bun](https://bun.sh/docs/installation)

## Setup

Clone the repo onto your local machine.
```bash
git clone https://github.com/0-BSCode/Budgeteer.git
```

Depending on your preference, we have a [Docker](#using-docker) setup or a [manual](#manual) setup

### Using Docker
Run the following command to initialize the required services using Docker Compose:

```bash
# Executes the Docker Compose configuration for development
bun run all:up
```

### Manual

Run the following command to install all project dependencies.
```bash
# Installs project dependencies
bun install
```

Run the following command to start all services.
```bash
bun run all:dev
```

> [!NOTE]
> On the first run, startup may take a few minutes as it requires setting up a Docker container for the database.

### Setting Up Environment Variables

> [!TIP]
> By default, the environment variables are set to placeholder fallbacks to ensure the app works without any configuration.

If you want to setup your own environment variables, make a copy of the `.env.example` first.

```bash
# creates a .env to read from when executing the Docker Compose file
cp .env.example .env

# start editing it
nano .env
```