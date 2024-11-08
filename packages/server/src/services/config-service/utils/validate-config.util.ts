import { type ConfigDto } from "@budgeteer/types"

export const isConfigValid = (config: Partial<ConfigDto>): boolean => {
  const requiredFields: (keyof ConfigDto)[] = [
    "NODE_ENV",
    "DB_DB",
    "DB_HOST",
    "DB_PASSWORD",
    "DB_PORT",
    "DB_USER",
    "JWT_SECRET",
  ]

  for (const field of requiredFields) {
    if (!(field in config)) {
      throw new Error(`Missing required environment variable: ${field}`)
    }
  }

  // Additional validation for specific fields
  if (config.NODE_ENV && !["development", "production", "test"].includes(config.NODE_ENV)) {
    throw new Error("NODE_ENV must be either development, production, or test")
  }

  if (isNaN(Number(config.DB_PORT))) {
    throw new Error("PORT must be a number")
  }

  return true
}
