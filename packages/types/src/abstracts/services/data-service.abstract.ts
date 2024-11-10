import type { IUserRepository } from "../repositories/user-repository.abstract"
import type { ITransactionRepository } from "../repositories/transaction-repository.abstract"

export type IDataService = {
  users: IUserRepository
  transactions: ITransactionRepository
}
