import { expect, vi, describe, it } from "vitest"
import { DataService } from "~/services/data-service"
import { TransactionUseCases } from "./transactions.use-cases"
import {
  ExpenseCategoryEnum,
  IncomeCategoryEnum,
  TransactionTypeEnum,
  type TransactionDto,
  type UserDto,
} from "@budgeteer/types"

const FAKE_USER: UserDto = {
  id: 1,
  username: "johndoe",
  password: "password",
  profile_picture: "image_url",
  createdAt: new Date(),
}

vi.mock("~/services/data-service", () => ({
  DataService: {
    transactions: {
      findById: vi.fn(),
      findByUserId: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    users: {
      findById: vi.fn(),
    },
  },
}))

describe("findById", () => {
  it("should find a transaction and return it", async () => {
    const transaction: TransactionDto = {
      id: "1",
      userId: 1,
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

  it("should throw an error if the transaction is not found", async () => {
    vi.mocked(DataService.transactions.findById).mockResolvedValue(null)
    await expect(TransactionUseCases.findById(1)).rejects.toThrowError("Transaction not found")
  })
})

describe("findByUserId", () => {
  it("should find all transactions for a user", async () => {
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

    vi.mocked(DataService.users.findById).mockResolvedValue(FAKE_USER)

    vi.mocked(DataService.transactions.findByUserId).mockResolvedValue(transactions)
    const response = await TransactionUseCases.findByUserId(1)
    expect(response.data).toEqual(transactions)
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

describe("create", () => {
  it("should create a transaction", async () => {
    const transaction: TransactionDto = {
      id: "1",
      userId: 1,
      description: "Test",
      type: TransactionTypeEnum.EXPENSE,
      amount: 50,
      category: ExpenseCategoryEnum.ENTERTAINMENT,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(DataService.transactions.create).mockResolvedValue(transaction)
    const response = await TransactionUseCases.create({
      userId: 1,
      description: "Test",
      type: TransactionTypeEnum.EXPENSE,
      amount: 50,
      category: ExpenseCategoryEnum.ENTERTAINMENT,
    })
    expect(response.data).toEqual(transaction)
  })

  it("should throw an error if the category is invalid", async () => {
    await expect(
      TransactionUseCases.create({
        userId: 1,
        description: "Test",
        type: TransactionTypeEnum.EXPENSE,
        amount: 50,
        category: IncomeCategoryEnum.SALARY,
      }),
    ).rejects.toThrowError(`Invalid category for type ${TransactionTypeEnum.EXPENSE}`)
  })

  it("should throw a db error", async () => {
    vi.mocked(DataService.transactions.create).mockRejectedValue(new Error("Database error!"))
    await expect(
      TransactionUseCases.create({
        userId: 1,
        description: "Test",
        type: TransactionTypeEnum.EXPENSE,
        amount: 50,
        category: ExpenseCategoryEnum.ENTERTAINMENT,
      }),
    ).rejects.toThrowError("Database error!")
  })
})

describe("update", () => {
  it("should update a transaction", async () => {
    const transaction: TransactionDto = {
      id: "1",
      userId: 1,
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

  it("should throw an error if the transaction is not found", async () => {
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

  it("should throw an error if the category is invalid", async () => {
    const transaction: TransactionDto = {
      id: "1",
      userId: 1,
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

  it("should throw a db error", async () => {
    const transaction: TransactionDto = {
      id: "1",
      userId: 1,
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
})

describe("delete", () => {
  it("should delete a transaction", async () => {
    const transaction: TransactionDto = {
      id: "1",
      userId: 1,
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

  it("should throw an error if the transaction is not found", async () => {
    vi.mocked(DataService.transactions.findById).mockResolvedValue(null)
    await expect(TransactionUseCases.delete(1)).rejects.toThrowError("Transaction not found")
  })

  it("should throw a db error", async () => {
    const transaction: TransactionDto = {
      id: "1",
      userId: 1,
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
