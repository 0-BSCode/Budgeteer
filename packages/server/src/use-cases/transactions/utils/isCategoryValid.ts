import { TransactionTypeEnum, IncomeCategoryEnum, ExpenseCategoryEnum } from "@budgeteer/types"

export const isCategoryValid = (
  type: keyof typeof TransactionTypeEnum,
  category: keyof typeof IncomeCategoryEnum | keyof typeof ExpenseCategoryEnum,
): boolean => {
  const isValidExpenseCategory = type === TransactionTypeEnum.EXPENSE && category in ExpenseCategoryEnum
  const isValidIncomeCategory = type === TransactionTypeEnum.INCOME && category in IncomeCategoryEnum

  return isValidExpenseCategory || isValidIncomeCategory
}
