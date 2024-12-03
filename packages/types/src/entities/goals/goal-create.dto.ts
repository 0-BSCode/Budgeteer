import type { GoalDto } from "./goal.dto"

type OmittedFields = Pick<GoalDto, "id" | "createdAt">

// export const TransactionCreateDtoSchema = TransactionDtoSchema.omit({
//   id: true,
//   createdAt: true,
//   updatedAt: true,
// })

export type GoalCreateDto = Omit<GoalDto, keyof OmittedFields>
