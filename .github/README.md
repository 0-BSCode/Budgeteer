# Budgeteer

A personal finance tracker.


## Local Setup
1. Clone the app into local device.
```bash
git clone https://github.com/0-BSCode/Budgeteer.git
```

2. Install packages
```bash
bun install
```

3. Set up environment variables
    - POSTGRES_PASSWORD
    - POSTGRES_USER
    - POSTGRES_DB
    - POSTGRES_HOST
    - DB_PORT
    - ADMINER_PORT

4. Spin up a docker container for the postgresql db
```bash
npm run db:up
```

5. Run the backend
```bash
# Serve the app
bun run server:dev

# Serve the app while watching for file changes
npm run server:start
```

6. Run the frontend
```bash
npm run client:dev
```