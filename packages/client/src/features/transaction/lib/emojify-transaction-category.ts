import { TransactionCategoryEnum } from "@budgeteer/types"
import { convertToTitleCase } from "./convert-to-title-case"

export function emojifyTransactionCategory(category: TransactionCategoryEnum) {
  const emojifiedCategories: Record<TransactionCategoryEnum, string> = {
    ALLOWANCE: "💰 Allowance",
    SALARY: "💸 Salary",
    BONUS: "🎉 Bonus",
    OTHER: "🛠️ Other",
    FOOD: "🍔 Food",
    ENTERTAINMENT: "🎬 Entertainment",
    TRANSPORTATION: "🚗 Transportation",
    UTILITIES: "💡 Utilities",
  }

  return emojifiedCategories[category] || convertToTitleCase(category)
}
