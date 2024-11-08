import type { IDataService } from "@budgeteer/types"
import { userRepository } from "~/infrastructure/typeorm-data-service/repositories/user.repository"

export const DataService: IDataService = {
  users: userRepository,
}
