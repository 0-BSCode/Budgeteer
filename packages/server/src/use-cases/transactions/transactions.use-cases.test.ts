import { expect, vi, describe, it, beforeEach } from "vitest"
import { DataService } from "~/services/data-service"
import { TransactionUseCases } from "./transactions.use-cases"
import {
  ExpenseCategoryEnum,
  IncomeCategoryEnum,
  TransactionTypeEnum,
  type TransactionCreateDto,
  type TransactionDto,
  type TransactionUpdateDto,
  type UserDto,
} from "@budgeteer/types"

const FAKE_USER: UserDto = {
  id: 1,
  username: "johndoe",
  password: "password",
  profile_picture: "image_url",
  createdAt: new Date(),
}

const VALID_TRANSACTION: TransactionDto = {
  id: "1",
  userId: 1,
  description: "Test",
  type: TransactionTypeEnum.EXPENSE,
  amount: 50,
  category: ExpenseCategoryEnum.ENTERTAINMENT,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const VALID_TRANSACTIONS: TransactionDto[] = [
  {
    id: "1",
    userId: 1,
    description: "Test",
    type: TransactionTypeEnum.EXPENSE,
    amount: 50,
    category: ExpenseCategoryEnum.ENTERTAINMENT,
    createdAt: new Date(),
    updatedAt: new Date(),
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
    const response = await TransactionUseCases.findById(1)
    expect(response.data).toEqual(VALID_TRANSACTION)
  })

  it("should throw an error if the transaction is not found", async () => {
    vi.mocked(DataService.transactions.findById).mockResolvedValue(null)
    await expect(TransactionUseCases.findById(1)).rejects.toThrowError("Transaction not found")
  })
})

describe("findByUserId", () => {
  it("should find all transactions for a user", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(FAKE_USER)
    vi.mocked(DataService.transactions.findByUserId).mockResolvedValue(VALID_TRANSACTIONS)
    const response = await TransactionUseCases.findByUserId(1)
    expect(response.data).toEqual(VALID_TRANSACTIONS)
  })

  it("should throw an error if the user is not found", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(null)
    await expect(TransactionUseCases.findByUserId(1)).rejects.toThrowError("User not found")
  })

  it("should throw a db error", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(FAKE_USER)
    vi.mocked(DataService.transactions.findByUserId).mockRejectedValue(new Error("Database error!"))
    await expect(TransactionUseCases.findByUserId(1)).rejects.toThrowError("Database error!")
  })
})

describe("query", () => {
  it.skip("should return all transactions", async () => {
    const transactions: TransactionDto[] = [
      {
        id: "1",
        userId: 1,
        description: "Test",
        type: TransactionTypeEnum.EXPENSE,
        amount: 50,
        category: ExpenseCategoryEnum.ENTERTAINMENT,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    vi.mocked(DataService.transactions.findByUserId).mockResolvedValue(transactions)
    const response = await TransactionUseCases.query({ userId: 1 })
    expect(response.data).toEqual(transactions)
  })

  it("should return transactions filtered by date", async () => {
    // Initialize a start and end date then pass start, end, or both
  })

  it("should return transactions filtered by amount", async () => {
    // Initialize a min and max amount then pass min, max, or both
  })

  it("should return transactions filtered by type", async () => {})

  it("should return transactions filtered by category", async () => {
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
    const transactionCreateDto: TransactionCreateDto = { ...data, category: IncomeCategoryEnum.SALARY }
    await expect(TransactionUseCases.create(transactionCreateDto)).rejects.toThrowError(
      `Invalid category for type ${TransactionTypeEnum.EXPENSE}`,
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
      category: ExpenseCategoryEnum.FOOD,
    }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(transaction)
    vi.mocked(DataService.transactions.update).mockResolvedValue({ ...transaction, ...transactionUpdateDto })
    const response = await TransactionUseCases.update(1, transactionUpdateDto)
    expect(response.data).toEqual({ ...transaction, ...transactionUpdateDto })
  })

  it("should throw an error if the transaction is not found", async () => {
    const { id, ...data } = transaction
    const transactionUpdateDto: TransactionUpdateDto = { ...data }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(null)
    await expect(TransactionUseCases.update(1, transactionUpdateDto)).rejects.toThrowError("Transaction not found")
  })

  it("should throw an error if the category is invalid", async () => {
    const { id, ...data } = transaction
    const transactionUpdateDto: TransactionUpdateDto = { ...data, category: IncomeCategoryEnum.SALARY }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(transaction)
    await expect(TransactionUseCases.update(1, transactionUpdateDto)).rejects.toThrowError(
      `Invalid category for type ${TransactionTypeEnum.EXPENSE}`,
    )
  })

  it("should throw a db error", async () => {
    const { id, ...data } = transaction
    console.log(data)
    const transactionUpdateDto: TransactionUpdateDto = { ...data }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(transaction)
    vi.mocked(DataService.transactions.update).mockRejectedValue(new Error("Database error!"))
    await expect(TransactionUseCases.update(1, transactionUpdateDto)).rejects.toThrowError("Database error!")
  })
})

describe("delete", () => {
  it("should delete a transaction", async () => {
    vi.mocked(DataService.transactions.findById).mockResolvedValue(VALID_TRANSACTION)
    vi.mocked(DataService.transactions.delete)
    const response = await TransactionUseCases.delete(1)
    expect(response.data).toEqual(null)
  })

  it("should throw an error if the transaction is not found", async () => {
    vi.mocked(DataService.transactions.findById).mockResolvedValue(null)
    await expect(TransactionUseCases.delete(1)).rejects.toThrowError("Transaction not found")
  })

  it("should throw a db error", async () => {
    vi.mocked(DataService.transactions.findById).mockResolvedValue(VALID_TRANSACTION)
    vi.mocked(DataService.transactions.delete).mockRejectedValue(new Error("Database error!"))
    await expect(TransactionUseCases.delete(1)).rejects.toThrowError("Database error!")
  })
})
