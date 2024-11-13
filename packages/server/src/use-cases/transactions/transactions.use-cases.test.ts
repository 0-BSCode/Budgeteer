import { expect, test, vi, describe } from "vitest"
import { DataService } from "~/services/data-service"
import { TransactionUseCases } from "./transactions.use-cases"

vi.mock("~/services/data-service", () => ({
  DataService: {
    transactions: {
      findById: vi.fn(),
    },
  },
}))

describe("TransactionUseCases", () => {
  test("findById", async () => {
    const transaction = {
      id: 1,
      description: "Test",
      type: "Expense",
      amount: 50,
      category: "Groceries",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(DataService.transactions.findById).mockResolvedValue(transaction)
    const response = await TransactionUseCases.findById(1)
    expect(response.data).toEqual(transaction)
  })
})
