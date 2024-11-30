import { expect, vi, describe, it, beforeEach } from "vitest"
import { DataService } from "~/services/data-service"
import { TransactionUseCases } from "./transactions.use-cases"
import {
  ExpenseCategoryEnumValues,
  IncomeCategoryEnumValues,
  SortOrderEnum,
  TransactionSortColumnEnum,
  TransactionTypeEnumValues,
  type TransactionCreateDto,
  type TransactionDto,
  type TransactionQueryDto,
  type TransactionUpdateDto,
  type UserDto,
} from "@budgeteer/types"

const VALID_USER: UserDto = {
  id: 1,
  username: "johndoe",
  password: "password",
  profile_picture: "image_url",
  createdAt: new Date(),
}

const VALID_QUERY: TransactionQueryDto = {
  userId: VALID_USER.id,
  limit: 10,
  page: 1,
  categories: [],
  sortBy: TransactionSortColumnEnum.DATE,
  sortOrder: SortOrderEnum.ASC,
}

const VALID_TRANSACTION: TransactionDto = {
  id: 1,
  date: new Date(),
  userId: VALID_USER.id,
  description: "Test",
  type: TransactionTypeEnumValues.EXPENSE,
  amount: 50,
  category: ExpenseCategoryEnumValues.ENTERTAINMENT,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const VALID_TRANSACTIONS: TransactionDto[] = [
  {
    id: 1,
    date: new Date("2022-01-01"),
    userId: VALID_USER.id,
    description: "Buy lunch",
    type: TransactionTypeEnumValues.EXPENSE,
    amount: 50,
    category: ExpenseCategoryEnumValues.ENTERTAINMENT,
    createdAt: new Date("2022-01-01"),
    updatedAt: new Date("2022-01-01"),
  },
  {
    id: 2,
    date: new Date("2023-01-02"),
    userId: VALID_USER.id,
    description: "Work salary",
    type: TransactionTypeEnumValues.INCOME,
    amount: 100,
    category: IncomeCategoryEnumValues.SALARY,
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: 3,
    date: new Date("2021-12-02"),
    userId: VALID_USER.id,
    description: "Gift",
    type: TransactionTypeEnumValues.INCOME,
    amount: 75,
    category: IncomeCategoryEnumValues.ALLOWANCE,
    createdAt: new Date("2021-12-02"),
    updatedAt: new Date("2023-12-02"),
  },
  {
    id: 4,
    date: new Date("2024-12-02"),
    userId: VALID_USER.id,
    description: "Movie",
    type: TransactionTypeEnumValues.EXPENSE,
    amount: 25,
    category: ExpenseCategoryEnumValues.ENTERTAINMENT,
    createdAt: new Date("2024-12-02"),
    updatedAt: new Date("2024-12-02"),
  },
  {
    id: 5,
    date: new Date("2024-11-05"),
    userId: VALID_USER.id,
    description: "Movie",
    type: TransactionTypeEnumValues.EXPENSE,
    amount: 225,
    category: ExpenseCategoryEnumValues.ENTERTAINMENT,
    createdAt: new Date("2024-11-05"),
    updatedAt: new Date("2024-11-05"),
  },
]

vi.mock("~/services/data-service", () => ({
  DataService: {
    transactions: {
      findById: vi.fn(),
      findByUserId: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      query: vi.fn(),
    },
    users: {
      findById: vi.fn(),
    },
  },
}))

describe("findById", () => {
  it("should find a transaction and return it", async () => {
    vi.mocked(DataService.transactions.findById).mockResolvedValue(VALID_TRANSACTION)
    const response = await TransactionUseCases.findById(1, VALID_USER.id)
    expect(response.data).toEqual(VALID_TRANSACTION)
  })

  it("should throw an error if the transaction is not found", async () => {
    vi.mocked(DataService.transactions.findById).mockResolvedValue(null)
    await expect(TransactionUseCases.findById(1, VALID_USER.id)).rejects.toThrowError("Transaction not found")
  })

  it("should throw an error if the transaction does not belong to the user", async () => {
    const FAKE_USER: UserDto = { ...VALID_USER, id: 2 }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(VALID_TRANSACTION)
    await expect(TransactionUseCases.findById(1, FAKE_USER.id)).rejects.toThrowError("Transaction not found")
  })
})

describe("findByUserId", () => {
  it("should find all transactions for a user", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(VALID_USER)
    vi.mocked(DataService.transactions.findByUserId).mockResolvedValue(VALID_TRANSACTIONS)
    const response = await TransactionUseCases.findByUserId(1)
    expect(response.data).toEqual(VALID_TRANSACTIONS)
  })

  it("should throw an error if the user is not found", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(null)
    await expect(TransactionUseCases.findByUserId(1)).rejects.toThrowError("User not found")
  })

  it("should throw a db error", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(VALID_USER)
    vi.mocked(DataService.transactions.findByUserId).mockRejectedValue(new Error("Database error!"))
    await expect(TransactionUseCases.findByUserId(1)).rejects.toThrowError("Database error!")
  })
})

// This just tests the business logic specified in the use-cases
describe("query", () => {
  it("should return all transactions", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(VALID_USER)
    vi.mocked(DataService.transactions.query).mockResolvedValue(VALID_TRANSACTIONS)
    const response = await TransactionUseCases.query(VALID_QUERY)
    expect(response.data).toEqual(VALID_TRANSACTIONS)
  })

  it("should throw an error if user is not found", async () => {
    const queryDto: TransactionQueryDto = { ...VALID_QUERY }
    vi.mocked(DataService.users.findById).mockResolvedValue(null)
    await expect(TransactionUseCases.query(queryDto)).rejects.toThrowError("User not found")
  })

  it("should throw an error if startDate is greater than endDate", async () => {
    const queryDto: TransactionQueryDto = {
      ...VALID_QUERY,
      startDate: new Date("2023-01-01"),
      endDate: new Date("2022-01-01"),
    }
    vi.mocked(DataService.users.findById).mockResolvedValue(VALID_USER)
    await expect(TransactionUseCases.query(queryDto)).rejects.toThrowError("Start date cannot be greater than end date")
  })

  it("should throw an error if minAmount is greater than maxAmount", async () => {
    const queryDto: TransactionQueryDto = { ...VALID_QUERY, minAmount: 100, maxAmount: 50 }
    vi.mocked(DataService.users.findById).mockResolvedValue(VALID_USER)
    await expect(TransactionUseCases.query(queryDto)).rejects.toThrowError(
      "Min amount cannot be greater than max amount",
    )
  })

  it("should throw a db error", async () => {
    // Initialize a categories then pass one or multiple
  })
})

describe("create", () => {
  it("should create a transaction", async () => {
    const { id, ...data } = VALID_TRANSACTION
    const transactionCreateDto: TransactionCreateDto = data
    vi.mocked(DataService.transactions.create).mockResolvedValue(VALID_TRANSACTION)
    const response = await TransactionUseCases.create(transactionCreateDto)
    expect(response.data).toEqual(VALID_TRANSACTION)
  })

  it("should throw an error if the category is invalid", async () => {
    const { id, ...data } = VALID_TRANSACTION
    const transactionCreateDto: TransactionCreateDto = { ...data, category: IncomeCategoryEnumValues.SALARY }
    await expect(TransactionUseCases.create(transactionCreateDto)).rejects.toThrowError(
      `Invalid category for type ${TransactionTypeEnumValues.EXPENSE}`,
    )
  })

  it("should throw a db error", async () => {
    const { id, ...data } = VALID_TRANSACTION
    const transactionDto: TransactionCreateDto = data
    vi.mocked(DataService.transactions.create).mockRejectedValue(new Error("Database error!"))
    await expect(TransactionUseCases.create(transactionDto)).rejects.toThrowError("Database error!")
  })
})

describe("update", () => {
  // Clone data so we don't modify the original
  let transaction: TransactionDto
  beforeEach(() => {
    transaction = JSON.parse(JSON.stringify(VALID_TRANSACTION))
  })

  it("should update a transaction", async () => {
    const { id, ...data } = transaction
    const transactionUpdateDto: TransactionUpdateDto = {
      ...data,
      description: "Updated",
      amount: 100,
      category: ExpenseCategoryEnumValues.FOOD,
    }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(transaction)
    vi.mocked(DataService.transactions.update).mockResolvedValue({ ...transaction, ...transactionUpdateDto })
    const response = await TransactionUseCases.update(1, VALID_USER.id, transactionUpdateDto)
    expect(response.data).toEqual({ ...transaction, ...transactionUpdateDto })
  })

  it("should throw an error if the transaction is not found", async () => {
    const { id, ...data } = transaction
    const transactionUpdateDto: TransactionUpdateDto = { ...data }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(null)
    await expect(TransactionUseCases.update(1, VALID_USER.id, transactionUpdateDto)).rejects.toThrowError(
      "Transaction not found",
    )
  })

  it("should throw an error if the category is invalid", async () => {
    const { id, ...data } = transaction
    const transactionUpdateDto: TransactionUpdateDto = { ...data, category: IncomeCategoryEnumValues.SALARY }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(transaction)
    await expect(TransactionUseCases.update(1, VALID_USER.id, transactionUpdateDto)).rejects.toThrowError(
      `Invalid category for type ${TransactionTypeEnumValues.EXPENSE}`,
    )
  })

  it("should throw a db error", async () => {
    const { id, ...data } = transaction
    console.log(data)
    const transactionUpdateDto: TransactionUpdateDto = { ...data }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(transaction)
    vi.mocked(DataService.transactions.update).mockRejectedValue(new Error("Database error!"))
    await expect(TransactionUseCases.update(1, VALID_USER.id, transactionUpdateDto)).rejects.toThrowError(
      "Database error!",
    )
  })
})

describe("delete", () => {
  it("should delete a transaction", async () => {
    vi.mocked(DataService.transactions.findById).mockResolvedValue(VALID_TRANSACTION)
    vi.mocked(DataService.transactions.delete)
    const response = await TransactionUseCases.delete(1, VALID_USER.id)
    expect(response.data).toEqual(null)
  })

  it("should throw an error if the transaction is not found", async () => {
    vi.mocked(DataService.transactions.findById).mockResolvedValue(null)
    await expect(TransactionUseCases.delete(1, VALID_USER.id)).rejects.toThrowError("Transaction not found")
  })

  it("should throw a db error", async () => {
    vi.mocked(DataService.transactions.findById).mockResolvedValue(VALID_TRANSACTION)
    vi.mocked(DataService.transactions.delete).mockRejectedValue(new Error("Database error!"))
    await expect(TransactionUseCases.delete(1, VALID_USER.id)).rejects.toThrowError("Database error!")
  })
})
