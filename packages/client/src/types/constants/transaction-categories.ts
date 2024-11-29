import { IncomeCategoryEnum, ExpenseCategoryEnum } from "@budgeteer/types"

export const incomeCategories = Object.values(IncomeCategoryEnum)
export const expenseCategories = Object.values(ExpenseCategoryEnum)
export const transactionCategories = [...incomeCategories, ...expenseCategories]
