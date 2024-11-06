import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { fetchDbUrl } from "./utils/fetchDbUrl"

const dbUrl = fetchDbUrl()
export const db = drizzle(dbUrl)
