import type { IUserRepository } from "../repositories/user-repository.abstract"

export type IDataService = {
  users: IUserRepository
}
