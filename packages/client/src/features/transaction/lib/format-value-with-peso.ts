import { TransactionTypeEnum, TransactionTypeEnumSchema } from "@budgeteer/types"

export function formatValueWithPeso(value: number, type?: TransactionTypeEnum): string {
  const absoluteValue = Math.abs(value).toFixed(2)

  if (!type) {
    return value < 0 ? `- ₱${absoluteValue}` : `₱${absoluteValue}`
  } else {
    return type === TransactionTypeEnumSchema.Values.EXPENSE ? `- ₱${absoluteValue}` : `₱${absoluteValue}`
  }
}
