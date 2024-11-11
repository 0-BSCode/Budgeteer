import { ConfigService } from "~/services/config-service"
export const fetchDbUrl = (): string => {
  const dbUrl = `postgres://${ConfigService.DB_USER}:${ConfigService.DB_PASSWORD}@${ConfigService.DB_HOST}:${ConfigService.DB_PORT}/${ConfigService.DB_DB}`
  return dbUrl
}
