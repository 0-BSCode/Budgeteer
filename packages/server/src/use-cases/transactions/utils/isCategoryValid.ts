import {
  TransactionTypeEnumValues,
  IncomeCategoryEnumValues,
  ExpenseCategoryEnumValues,
  type TransactionTypeEnum,
  type TransactionCategoryEnum,
} from "@budgeteer/types"

export const isCategoryValid = (type: TransactionTypeEnum, category: TransactionCategoryEnum): boolean => {
  const isValidExpenseCategory = type === TransactionTypeEnumValues.EXPENSE && category in ExpenseCategoryEnumValues
  const isValidIncomeCategory = type === TransactionTypeEnumValues.INCOME && category in IncomeCategoryEnumValues

  return isValidExpenseCategory || isValidIncomeCategory
}
