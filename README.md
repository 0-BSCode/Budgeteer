# Budgeteer

## Prerequisites

To get started with Budgeteer, ensure that you have the following tools installed and properly configured on your system:

1. **Docker**: A platform to develop, ship, and run applications using containers.
   - Installation guide: [Get Docker](https://docs.docker.com/get-docker/)
2. **Docker Compose**: A tool for defining and running multi-container Docker applications.
   - Installation guide: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Usage

Run the following command to initialize the required services using Docker Compose:

```bash
# Executes the Docker Compose configuration for development
npm run all:up
```

## Setting Up Environment Variables

> [!TIP]
> By default, the environment variables are set to placeholder fallbacks to ensure the app works without any configuration.

If you want to setup your own environment variables in the Docker Compose files, make a copy of the `.env.example` first.

```bash
# creates a .env to read from when executing the Docker Compose file
cp docker/.env.example docker/.env

# start editing it
nano docker/.env
```
