import {
  ExpenseCategoryEnum,
  IncomeCategoryEnum,
  TransactionTypeEnum,
  type TransactionCategoryEnum,
} from "@budgeteer/types"

export const isCategoryValid = (type: TransactionTypeEnum, category: TransactionCategoryEnum): boolean => {
  const isValidExpenseCategory = type === TransactionTypeEnum.EXPENSE && category in ExpenseCategoryEnum
  const isValidIncomeCategory = type === TransactionTypeEnum.INCOME && category in IncomeCategoryEnum

  return isValidExpenseCategory || isValidIncomeCategory
}
