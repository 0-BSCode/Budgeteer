import type { IDataService } from "@budgeteer/types"

import { userRepository } from "~/infrastructure/typeorm-data-service/repositories/user.repository"
import { transactionRepository } from "~/infrastructure/typeorm-data-service/repositories/transaction.repository"

export const DataService: IDataService = {
  users: userRepository,
  transactions: transactionRepository,
}
