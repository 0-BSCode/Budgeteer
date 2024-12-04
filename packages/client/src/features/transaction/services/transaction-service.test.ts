import {
  ExpenseCategoryEnumValues,
  IncomeCategoryEnumValues,
  TransactionTypeEnumValues,
  TransactionUpdateDto,
} from "@budgeteer/types"
import { beforeAll, describe, expect, it } from "vitest"
import { RawTransactionCreateDto } from "~/types/entities/raw-transaction-create.dto"
import transactionService from "./transaction-service"
import { setupTestUser, sharedTransactionTestState, sharedUserTestState } from "~/lib/test/setup-test-user"

describe.only("transaction-service", () => {
  beforeAll(async () => {
    await setupTestUser()
  })

  describe("create", () => {
    const GOOD_CREATE_INPUT: RawTransactionCreateDto = {
      amount: 100,
      category: ExpenseCategoryEnumValues.ENTERTAINMENT,
      date: new Date(),
      description: "Test transaction",
      type: TransactionTypeEnumValues.EXPENSE,
    }

    const INVALID_CATEGORY_CREATE_INPUT: RawTransactionCreateDto = {
      ...GOOD_CREATE_INPUT,
      category: IncomeCategoryEnumValues.SALARY,
    }

    const INVALID_AMOUNT_CREATE_INPUT: RawTransactionCreateDto = {
      ...GOOD_CREATE_INPUT,
      amount: -100,
    }

    it("should create a transaction successfully & respond with a transaction dto", async () => {
      const transaction = await transactionService.create(sharedUserTestState.token, GOOD_CREATE_INPUT)

      expect(transaction).toHaveProperty("id")
      expect(transaction).toHaveProperty("amount", GOOD_CREATE_INPUT.amount)
      expect(transaction).toHaveProperty("category", GOOD_CREATE_INPUT.category)
      expect(transaction).toHaveProperty("date", GOOD_CREATE_INPUT.date)
      expect(transaction).toHaveProperty("description", GOOD_CREATE_INPUT.description)
      expect(transaction).toHaveProperty("type", GOOD_CREATE_INPUT.type)
      expect(transaction).toHaveProperty("createdAt")
      expect(transaction).toHaveProperty("updatedAt")
      expect(transaction).toHaveProperty("userId")
    })

    it("should throw an error if category is invalid", async () => {
      await expect(
        transactionService.create(sharedUserTestState.token, INVALID_CATEGORY_CREATE_INPUT),
      ).rejects.toThrowError("Unable to create transaction")
    })

    it("should throw an error if amount is invalid", async () => {
      await expect(
        transactionService.create(sharedUserTestState.token, INVALID_AMOUNT_CREATE_INPUT),
      ).rejects.toThrowError("AxiosError")
    })

    it("should throw an error if user is unauthenticated", async () => {
      await expect(transactionService.create("", GOOD_CREATE_INPUT)).rejects.toThrowError(
        "Unable to create transaction",
      )
    })
  })

  describe("getById", () => {
    it("should fetch a transaction successfully & respond with a transaction dto", async () => {
      const transaction = await transactionService.getById(
        sharedUserTestState.token,
        sharedTransactionTestState.id.toString(),
      )

      expect(transaction).toHaveProperty("id")
      expect(transaction).toHaveProperty("amount", sharedTransactionTestState.amount)
      expect(transaction).toHaveProperty("category", sharedTransactionTestState.category)
      expect(transaction).toHaveProperty("date", sharedTransactionTestState.date)
      expect(transaction).toHaveProperty("description", sharedTransactionTestState.description)
      expect(transaction).toHaveProperty("type", sharedTransactionTestState.type)
      expect(transaction).toHaveProperty("createdAt")
      expect(transaction).toHaveProperty("updatedAt")
      expect(transaction).toHaveProperty("userId")
    })

    it("should throw an error if user is unauthenticated", async () => {
      await expect(transactionService.getById("", sharedTransactionTestState.id.toString())).rejects.toThrowError(
        "Unable to fetch transaction.",
      )
    })

    it("should throw an error if transaction does not exist", async () => {
      await expect(transactionService.getById(sharedUserTestState.token, "-1")).rejects.toThrowError(
        "Unable to fetch transaction.",
      )
    })
  })

  describe("getAll", () => {
    it("should fetch all transactions successfully & respond with an array of transaction dtos", async () => {
      const transactions = await transactionService.getAll(sharedUserTestState.token)

      expect(transactions).toBeInstanceOf(Array)
    })

    it("should throw an error if user is unauthenticated", async () => {
      await expect(transactionService.getAll("")).rejects.toThrowError("Unable to fetch transactions.")
    })
  })

  describe("update", () => {
    const newDate = new Date()
    const GOOD_UPDATE_INPUT: TransactionUpdateDto = {
      amount: 200,
      category: ExpenseCategoryEnumValues.FOOD,
      date: newDate,
      description: "Updated description",
      type: TransactionTypeEnumValues.EXPENSE,
    }

    const INVALID_CATEGORY_UPDATE_INPUT: TransactionUpdateDto = {
      ...GOOD_UPDATE_INPUT,
      category: IncomeCategoryEnumValues.SALARY,
    }

    const INVALID_AMOUNT_UPDATE_INPUT: TransactionUpdateDto = {
      ...GOOD_UPDATE_INPUT,
      amount: -100,
    }

    it("should update a transaction successfully & respond with a transaction dto", async () => {
      const transaction = await transactionService.update(
        sharedUserTestState.token,
        sharedTransactionTestState.id.toString(),
        GOOD_UPDATE_INPUT,
      )

      expect(transaction).toHaveProperty("id")
      expect(transaction).toHaveProperty("amount", 200)
      expect(transaction).toHaveProperty("category", ExpenseCategoryEnumValues.FOOD)
      expect(transaction).toHaveProperty("date", newDate)
      expect(transaction).toHaveProperty("description", "Updated description")
      expect(transaction).toHaveProperty("type", TransactionTypeEnumValues.EXPENSE)
      expect(transaction).toHaveProperty("createdAt")
      expect(transaction).toHaveProperty("updatedAt")
      expect(transaction).toHaveProperty("userId")
    })

    it("should throw an error if user is unauthenticated", async () => {
      await expect(
        transactionService.update("", sharedTransactionTestState.id.toString(), GOOD_UPDATE_INPUT),
      ).rejects.toThrowError("Unable to update transaction.")
    })

    it("should throw an error if transaction does not exist", async () => {
      await expect(transactionService.update(sharedUserTestState.token, "-1", GOOD_UPDATE_INPUT)).rejects.toThrowError(
        "Unable to update transaction.",
      )
    })

    it("should throw an error if category is invalid", async () => {
      await expect(
        transactionService.update(
          sharedUserTestState.token,
          sharedTransactionTestState.id.toString(),
          INVALID_CATEGORY_UPDATE_INPUT,
        ),
      ).rejects.toThrowError("Unable to update transaction.")
    })

    it("should throw an error if amount is invalid", async () => {
      await expect(
        transactionService.update(
          sharedUserTestState.token,
          sharedTransactionTestState.id.toString(),
          INVALID_AMOUNT_UPDATE_INPUT,
        ),
      ).rejects.toThrowError("AxiosError")
    })
  })

  describe("delete", () => {
    it("should delete a transaction successfully", async () => {
      const response = await transactionService.delete(
        sharedUserTestState.token,
        sharedTransactionTestState.id.toString(),
      )

      expect(response).toBeUndefined()
    })

    it("should throw an error if user is unauthenticated", async () => {
      await expect(transactionService.delete("", sharedTransactionTestState.id.toString())).rejects.toThrowError(
        "Unable to delete transaction.",
      )
    })

    it("should throw an error if transaction does not exist", async () => {
      await expect(transactionService.delete(sharedUserTestState.token, "-1")).rejects.toThrowError(
        "Unable to delete transaction.",
      )
    })
  })
})
