import {
  type ITransactionRepository,
  type TransactionDto,
  type TransactionCreateDto,
  type TransactionUpdateDto,
  TransactionDtoSchema,
  type TransactionQueryDto,
  TransactionSortColumnEnum,
  SortOrderEnum,
} from "@budgeteer/types"
import { db } from ".."
import { transactionsTable, type InsertTransaction, type SelectTransaction } from "../models/transaction.model"
import { and, asc, desc, eq, gte, lte } from "drizzle-orm"

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
  async query(dto: TransactionQueryDto): Promise<TransactionDto[]> {
    const whereConditions = []

    // Query by date
    if (dto.startDate) {
      whereConditions.push(gte(transactionsTable.date, dto.startDate))
    }

    if (dto.endDate) {
      whereConditions.push(lte(transactionsTable.date, dto.endDate))
    }

    // Query by amount
    if (dto.minAmount) {
      whereConditions.push(gte(transactionsTable.amount, dto.minAmount))
    }

    if (dto.maxAmount) {
      whereConditions.push(lte(transactionsTable.amount, dto.maxAmount))
    }

    // Query by type
    if (dto.type) {
      whereConditions.push(eq(transactionsTable.type, dto.type))
    }

    // Query by categories
    if (dto.categories.length > 0) {
      const categories = dto.categories.map(category => eq(transactionsTable.category, category))
      whereConditions.push(and(...categories))
    }

    whereConditions.push(eq(transactionsTable.userId, dto.userId))

    // Sorting
    const sortColumn =
      dto.sortBy === TransactionSortColumnEnum.DATE ? transactionsTable.createdAt : transactionsTable.amount
    const sortCriteria = dto.sortOrder === SortOrderEnum.ASC ? asc(sortColumn) : desc(sortColumn)

    // Pagination
    const offset = (dto.page - 1) * dto.limit
    const limit = dto.limit

    const records: SelectTransaction[] = await db
      .select()
      .from(transactionsTable)
      .where(and(...whereConditions))
      .orderBy(sortCriteria)
      .offset(offset)
      .limit(limit)

    return records.map(this.convertToDto)
  },
  async create(dto: TransactionCreateDto): Promise<TransactionDto> {
    const data: InsertTransaction = {
      userId: dto.userId,
      description: dto.description,
      type: dto.type,
      amount: dto.amount,
      category: dto.category,
      date: dto.date,
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
        date: dto.date,
        updatedAt: new Date(),
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
      date: new Date(transactionData.date),
      createdAt: transactionData.createdAt,
      updatedAt: transactionData.updatedAt,
    }
  },
}
