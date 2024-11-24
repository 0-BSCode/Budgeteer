import { type ConfigDto, NodeEnv } from "@budgeteer/types"
import { config } from "dotenv"
import path from "path"

config({
  path: path.join(__dirname, "../../../../../.env"),
})

function loadEnvConfig() {
  const config: Partial<ConfigDto> = {
    NODE_ENV: (process.env["NODE_ENV"] as NodeEnv) ?? NodeEnv.DEVELOPMENT,
    DB_PASSWORD: process.env["POSTGRES_PASSWORD"] ?? "example",
    DB_USER: process.env["POSTGRES_USER"] ?? "postgres",
    DB_DB: process.env["POSTGRES_DB"] ?? "postgres",
    DB_HOST: process.env["POSTGRES_HOST"] ?? "localhost",
    DB_PORT: Number(process.env["DB_PORT"]) ?? 5432,
    JWT_SECRET: process.env["JWT_SECRET"] ?? "secret",
  }

  return config
}

export const ConfigService = Object.freeze(loadEnvConfig())
