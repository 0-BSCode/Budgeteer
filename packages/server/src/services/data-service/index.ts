import type { IDataService } from "@budgeteer/types"
import { transactionRepository } from "~/infrastructure/typeorm-data-service/repositories/transaction.repository"

export const DataService: IDataService = {
  transactions: transactionRepository,
}
