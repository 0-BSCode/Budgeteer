import type { IUserRepository } from "../repositories/user-repository.abstract"
import type { ITransactionRepository } from "../repositories/transaction-repository.abstract"
import type { IGoalRepository } from "../repositories/goal-repository.abstract"

export type IDataService = {
  users: IUserRepository
  transactions: ITransactionRepository
  goals: IGoalRepository
}
