import { defineConfig } from "drizzle-kit"
import { fetchDbUrl } from "./utils/fetchDbUrl"
import path from "path"

const dbUrl = fetchDbUrl()
export default defineConfig({
  out: "./drizzle",
  schema: path.join(__dirname, "models"),
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
})
