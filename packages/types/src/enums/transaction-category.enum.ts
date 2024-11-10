export enum IncomeCategoryEnum {
  ALLOWANCE = "ALLOWANCE",
  SALARY = "SALARY",
  BONUS = "BONUS",
  OTHER = "OTHER",
}

export enum ExpenseCategoryEnum {
  FOOD = "FOOD",
  ENTERTAINMENT = "ENTERTAINMENT",
  TRANSPORTATION = "TRANSPORTATION",
  UTILITIES = "UTILITIES",
  OTHER = "OTHER",
}

export type TransactionCategoryEnum = IncomeCategoryEnum | ExpenseCategoryEnum
