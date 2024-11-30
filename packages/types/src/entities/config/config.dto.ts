import type { NodeEnv } from "../../enums/node-env.enum"

export type ConfigDto = {
  NODE_ENV: NodeEnv
  DB_PASSWORD: string
  DB_USER: string
  DB_DB: string
  DB_HOST: string
  DB_PORT: string | number
  JWT_SECRET: string
}
