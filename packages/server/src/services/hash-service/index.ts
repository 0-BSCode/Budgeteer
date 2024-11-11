import type { IHashService } from "@budgeteer/types"
import { hashPassword, comparePassword } from "~/infrastructure/bcrypt-hash-service"

export const HashService: IHashService = {
  hashPassword,
  comparePassword,
}
