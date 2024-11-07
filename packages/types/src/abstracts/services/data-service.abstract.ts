import type { ITransactionRepository } from "../repositories/transaction-repository.abstract"

export type IDataService = {
  transactions: ITransactionRepository
}
