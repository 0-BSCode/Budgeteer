import { ExpenseCategoryEnumValues, IncomeCategoryEnumValues, TransactionTypeEnumValues } from "@budgeteer/types"
import { transactionsTable, type InsertTransaction } from "./models/transaction.model"
import { usersTable, type InsertUser } from "./models/user.model"
import { db } from "."

const userData: InsertUser[] = [
  {
    username: "johndoe",
    password: "TestEncryptedPassword123123123",
    profile_picture: "image_url",
    createdAt: new Date().toISOString(),
  },
  {
    username: "janedoe",
    password: "TestEncryptedPassword123123123",
    profile_picture: "image_url",
    createdAt: new Date().toISOString(),
  },
  {
    username: "bobsmith",
    password: "TestEncryptedPassword123123123",
    profile_picture: "image_url",
    createdAt: new Date().toISOString(),
  },
]

const transactionData: InsertTransaction[] = [
  {
    userId: 1,
    date: new Date("2022-02-01").toISOString(),
    description: "Salary",
    type: TransactionTypeEnumValues.INCOME,
    category: IncomeCategoryEnumValues.SALARY,
    amount: 1000,
    createdAt: new Date("2022-02-01").toISOString(),
  },
  {
    userId: 1,
    date: new Date("2022-02-05").toISOString(),
    description: "Rent",
    type: TransactionTypeEnumValues.EXPENSE,
    category: ExpenseCategoryEnumValues.UTILITIES,
    amount: 500,
    createdAt: new Date("2022-02-05").toISOString(),
  },
  {
    userId: 1,
    date: new Date("2022-02-10").toISOString(),
    description: "Grocery",
    type: TransactionTypeEnumValues.EXPENSE,
    category: ExpenseCategoryEnumValues.FOOD,
    amount: 100,
    createdAt: new Date("2022-02-10").toISOString(),
  },
  {
    userId: 1,
    date: new Date("2022-02-12").toISOString(),
    description: "Dining",
    type: TransactionTypeEnumValues.EXPENSE,
    category: ExpenseCategoryEnumValues.FOOD,
    amount: 200,
    createdAt: new Date("2022-02-12").toISOString(),
  },
  {
    userId: 1,
    date: new Date("2022-02-15").toISOString(),
    description: "Utility",
    type: TransactionTypeEnumValues.EXPENSE,
    category: ExpenseCategoryEnumValues.UTILITIES,
    amount: 150,
    createdAt: new Date("2022-02-15").toISOString(),
  },
]

async function seed() {
  console.log("Seeding...")

  // Clear all data
  await db.delete(transactionsTable)
  await db.delete(usersTable)

  // Seed data
  const userRecords = await db.insert(usersTable).values(userData).returning()

  for (const user of userRecords) {
    await db.insert(transactionsTable).values(transactionData.map(transaction => ({ ...transaction, userId: user.id })))
  }
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    console.log("Seeding done!")
    process.exit(0)
  })
