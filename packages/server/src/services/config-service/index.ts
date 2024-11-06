import { type ConfigDto, NodeEnv } from "@budgeteer/types"
import { config } from "dotenv"
import { isConfigValid } from "./utils/validate-config.util"
import path from "path"

config({
  path: path.join(__dirname, "../../../../../.env"),
})

function loadEnvConfig() {
  const config: Partial<ConfigDto> = {
    NODE_ENV: process.env["NODE_ENV"] as NodeEnv,
    DB_PASSWORD: process.env["POSTGRES_PASSWORD"],
    DB_USER: process.env["POSTGRES_USER"],
    DB_DB: process.env["POSTGRES_DB"],
    DB_HOST: process.env["POSTGRES_HOST"],
    DB_PORT: Number(process.env["DB_PORT"]),
  }

  if (!isConfigValid(config)) {
    throw new Error("Invalid environment variables")
  }

  return config
}

export const envConfig = Object.freeze(loadEnvConfig())
