import { defineConfig } from "drizzle-kit"
import { fetchDbUrl } from "./utils/fetchDbUrl"

const dbUrl = fetchDbUrl()
export default defineConfig({
  out: "./src/infrastructure/drizzle-data-service/migrations",
  schema: "./src/infrastructure/drizzle-data-service/models",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
})
