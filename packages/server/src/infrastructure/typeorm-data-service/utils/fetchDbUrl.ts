import { envConfig } from "~/services/config-service"
export const fetchDbUrl = (): string => {
  const dbUrl = `postgres://${envConfig.DB_USER}:${envConfig.DB_PASSWORD}@${envConfig.DB_HOST}:${envConfig.DB_PORT}/${envConfig.DB_DB}`
  return dbUrl
}
