import {
  type GoalDto,
  type GoalCreateDto,
  type GoalUpdateDto,
  type IGoalRepository,
  GoalDtoSchema,
} from "@budgeteer/types"
import { db } from ".."
import { transactionsTable } from "../models/transaction.model"
import { eq } from "drizzle-orm"
import { goalsTable, type InsertGoal, type SelectGoal } from "../models/goals.model"

export const goalRepository: IGoalRepository = {
  async findAllUserGoals(userId: number): Promise<GoalDto[]> {
    const records: SelectGoal[] = await db.select().from(goalsTable).where(eq(goalsTable.userId, userId))

    return records.map(this.convertToDto)
  },
  async findById(id: number): Promise<GoalDto | null> {
    const records = await db.select().from(goalsTable).where(eq(goalsTable.id, id))
    const record: SelectGoal = records[0]

    if (!record) {
      return null
    }

    return this.convertToDto(record)
  },

  async create(dto: GoalCreateDto): Promise<GoalDto> {
    const data: InsertGoal = {
      userId: dto.userId,
      description: dto.description,
      amount: dto.amount,
    }

    const records = await db.insert(goalsTable).values(data).returning()
    const record: SelectGoal = records[0]

    return this.convertToDto(record)
  },
  async update(id: number, dto: GoalUpdateDto): Promise<GoalDto> {
    const records = await db
      .update(goalsTable)
      .set({
        description: dto.description,
        amount: dto.amount,
        deadline: new Date().toString(),
      })
      .where(eq(transactionsTable.id, id))
      .returning()
    const record: SelectGoal = records[0]

    return this.convertToDto(record)
  },
  async delete(id: number): Promise<void> {
    await db.delete(goalsTable).where(eq(goalsTable.id, id))
  },
  convertToDto(data: unknown): GoalDto {
    const goalData = GoalDtoSchema.parse(data)

    return {
      id: goalData.id,
      userId: goalData.userId,
      description: goalData.description,
      amount: goalData.amount,
      createdAt: goalData.createdAt,
      deadline: goalData.deadline,
    }
  },
}
