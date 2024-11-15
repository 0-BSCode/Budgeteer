import {
  type ITransactionRepository,
  type TransactionDto,
  type TransactionCreateDto,
  type TransactionUpdateDto,
  TransactionDtoSchema,
} from "@budgeteer/types"
import { db } from ".."
import { transactionsTable, type InsertTransaction, type SelectTransaction } from "../models/transaction.model"
import { eq } from "drizzle-orm"

export const transactionRepository: ITransactionRepository = {
  async findById(id: number): Promise<TransactionDto | null> {
    const records = await db.select().from(transactionsTable).where(eq(transactionsTable.id, id))
    const record: SelectTransaction = records[0]

    if (!record) {
      return null
    }

    return this.convertToDto(record)
  },
  async findByUserId(userId: number): Promise<TransactionDto[]> {
    const records: SelectTransaction[] = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.userId, userId))

    return records.map(this.convertToDto)
  },
  async create(dto: TransactionCreateDto): Promise<TransactionDto> {
    const data: InsertTransaction = {
      userId: dto.userId,
      description: dto.description,
      type: dto.type,
      amount: dto.amount,
      category: dto.category,
    }

    const records = await db.insert(transactionsTable).values(data).returning()
    const record: SelectTransaction = records[0]

    return this.convertToDto(record)
  },
  async update(id: number, dto: TransactionUpdateDto): Promise<TransactionDto> {
    const records = await db
      .update(transactionsTable)
      .set({
        description: dto.description,
        type: dto.type,
        amount: dto.amount,
        category: dto.category,
        updatedAt: new Date().toString(),
      })
      .where(eq(transactionsTable.id, id))
      .returning()
    const record: SelectTransaction = records[0]

    return this.convertToDto(record)
  },
  async delete(id: number): Promise<void> {
    await db.delete(transactionsTable).where(eq(transactionsTable.id, id))
  },
  convertToDto(data: unknown): TransactionDto {
    const transactionData = TransactionDtoSchema.parse(data)

    return {
      id: transactionData.id,
      userId: transactionData.userId,
      description: transactionData.description,
      type: transactionData.type,
      amount: transactionData.amount,
      category: transactionData.category,
      createdAt: transactionData.createdAt,
      updatedAt: transactionData.updatedAt,
    }
  },
}
