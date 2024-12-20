import type { IDataService } from "@budgeteer/types"

import { userRepository } from "~/infrastructure/drizzle-data-service/repositories/user.repository"
import { transactionRepository } from "~/infrastructure/drizzle-data-service/repositories/transaction.repository"
import { goalRepository } from "~/infrastructure/drizzle-data-service/repositories/goal.repository"

export const DataService: IDataService = {
  users: userRepository,
  transactions: transactionRepository,
  goals: goalRepository,
}
