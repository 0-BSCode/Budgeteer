import { expect, test, vi, describe } from "vitest"
import { DataService } from "~/services/data-service"
import { TransactionUseCases } from "./transactions.use-cases"
import { ExpenseCategoryEnum, IncomeCategoryEnum, TransactionTypeEnum, type TransactionDto } from "@budgeteer/types"

vi.mock("~/services/data-service", () => ({
  DataService: {
    transactions: {
      findById: vi.fn(),
      findByUser: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    users: {
      findById: vi.fn(),
    },
  },
}))

describe("TransactionUseCases", () => {
  test("findById finds a transaction", async () => {
    const transaction: TransactionDto = {
      id: 1,
      description: "Test",
      type: TransactionTypeEnum.EXPENSE,
      amount: 50,
      category: ExpenseCategoryEnum.ENTERTAINMENT,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(transaction)
    const response = await TransactionUseCases.findById(1)
    expect(response.data).toEqual(transaction)
  })

  test("findById throws an error if the transaction is not found", async () => {
    vi.mocked(DataService.transactions.findById).mockResolvedValue(null)
    await expect(TransactionUseCases.findById(1)).rejects.toThrowError("Transaction not found")
  })

  test("findByUserId finds all transactions for a user", async () => {
    const transactions: TransactionDto[] = [
      {
        id: 1,
        description: "Test",
        type: TransactionTypeEnum.EXPENSE,
        amount: 50,
        category: ExpenseCategoryEnum.ENTERTAINMENT,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    vi.mocked(DataService.users.findById).mockResolvedValue(1)
    vi.mocked(DataService.transactions.findByUser).mockResolvedValue(transactions)
    const response = await TransactionUseCases.findByUserId(1)
    expect(response.data).toEqual(transactions)
  })

  test("findByUserId throws an error if the user is not found", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(null)
    await expect(TransactionUseCases.findByUserId(1)).rejects.toThrowError("User not found")
  })

  test("findByUserId throws a db error", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(1)
    vi.mocked(DataService.transactions.findByUser).mockRejectedValue(new Error("Database error!"))
    await expect(TransactionUseCases.findByUserId(1)).rejects.toThrowError("Database error!")
  })

  test("create creates a transaction", async () => {
    const transaction: TransactionDto = {
      id: 1,
      description: "Test",
      type: TransactionTypeEnum.EXPENSE,
      amount: 50,
      category: ExpenseCategoryEnum.ENTERTAINMENT,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(DataService.transactions.create).mockResolvedValue(transaction)
    const response = await TransactionUseCases.create({
      description: "Test",
      type: TransactionTypeEnum.EXPENSE,
      amount: 50,
      category: ExpenseCategoryEnum.ENTERTAINMENT,
    })
    expect(response.data).toEqual(transaction)
  })

  test("create throws an error if the category is invalid", async () => {
    await expect(
      TransactionUseCases.create({
        description: "Test",
        type: TransactionTypeEnum.EXPENSE,
        amount: 50,
        category: IncomeCategoryEnum.SALARY,
      }),
    ).rejects.toThrowError(`Invalid category for type ${TransactionTypeEnum.EXPENSE}`)
  })

  test("create throws a db error", async () => {
    vi.mocked(DataService.transactions.create).mockRejectedValue(new Error("Database error!"))
    await expect(
      TransactionUseCases.create({
        description: "Test",
        type: TransactionTypeEnum.EXPENSE,
        amount: 50,
        category: ExpenseCategoryEnum.ENTERTAINMENT,
      }),
    ).rejects.toThrowError("Database error!")
  })

  test("update updates a transaction", async () => {
    const transaction: TransactionDto = {
      id: 1,
      description: "Test",
      type: TransactionTypeEnum.EXPENSE,
      amount: 50,
      category: ExpenseCategoryEnum.ENTERTAINMENT,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(transaction)
    vi.mocked(DataService.transactions.update).mockResolvedValue(transaction)
    const response = await TransactionUseCases.update(1, {
      description: "Test",
      type: TransactionTypeEnum.EXPENSE,
      amount: 50,
      category: ExpenseCategoryEnum.ENTERTAINMENT,
    })
    expect(response.data).toEqual(transaction)
  })

  test("update throws an error if the transaction is not found", async () => {
    vi.mocked(DataService.transactions.findById).mockResolvedValue(null)
    await expect(
      TransactionUseCases.update(1, {
        description: "Test",
        type: TransactionTypeEnum.EXPENSE,
        amount: 50,
        category: ExpenseCategoryEnum.ENTERTAINMENT,
      }),
    ).rejects.toThrowError("Transaction not found")
  })

  test("update throws an error if the category is invalid", async () => {
    const transaction: TransactionDto = {
      id: 1,
      description: "Test",
      type: TransactionTypeEnum.EXPENSE,
      amount: 50,
      category: ExpenseCategoryEnum.ENTERTAINMENT,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(transaction)
    await expect(
      TransactionUseCases.update(1, {
        description: "Test",
        type: TransactionTypeEnum.EXPENSE,
        amount: 50,
        category: IncomeCategoryEnum.SALARY,
      }),
    ).rejects.toThrowError(`Invalid category for type ${TransactionTypeEnum.EXPENSE}`)
  })

  test("update throws a db error", async () => {
    const transaction: TransactionDto = {
      id: 1,
      description: "Test",
      type: TransactionTypeEnum.EXPENSE,
      amount: 50,
      category: ExpenseCategoryEnum.ENTERTAINMENT,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(transaction)
    vi.mocked(DataService.transactions.update).mockRejectedValue(new Error("Database error!"))
    await expect(
      TransactionUseCases.update(1, {
        description: "Test",
        type: TransactionTypeEnum.EXPENSE,
        amount: 50,
        category: ExpenseCategoryEnum.ENTERTAINMENT,
      }),
    ).rejects.toThrowError("Database error!")
  })

  test("delete deletes a transaction", async () => {
    const transaction: TransactionDto = {
      id: 1,
      description: "Test",
      type: TransactionTypeEnum.EXPENSE,
      amount: 50,
      category: ExpenseCategoryEnum.ENTERTAINMENT,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(transaction)
    vi.mocked(DataService.transactions.delete)
    const response = await TransactionUseCases.delete(1)
    expect(response.data).toEqual(null)
  })

  test("delete throws an error if the transaction is not found", async () => {
    vi.mocked(DataService.transactions.findById).mockResolvedValue(null)
    await expect(TransactionUseCases.delete(1)).rejects.toThrowError("Transaction not found")
  })

  test("delete throws a db error", async () => {
    const transaction: TransactionDto = {
      id: 1,
      description: "Test",
      type: TransactionTypeEnum.EXPENSE,
      amount: 50,
      category: ExpenseCategoryEnum.ENTERTAINMENT,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(transaction)
    vi.mocked(DataService.transactions.delete).mockRejectedValue(new Error("Database error!"))
    await expect(TransactionUseCases.delete(1)).rejects.toThrowError("Database error!")
  })
})
