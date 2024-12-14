import { TransactionTypeEnum, TransactionTypeEnumSchema } from "@budgeteer/types"

function abbreviateLargeNumbers(number: number) {
  if (number > Number.MAX_SAFE_INTEGER) return number.toExponential()
  // Use the toLocaleString method to add suffixes to the number
  return number.toLocaleString("en-US", {
    // add suffixes for thousands, millions, and billions
    // the maximum number of decimal places to use
    maximumFractionDigits: 2,
    // specify the abbreviations to use for the suffixes
    notation: "compact",
    compactDisplay: "short",
  })
}

export function formatValueWithPeso(value: number, type?: TransactionTypeEnum): string {
  let absoluteValue = Math.abs(value).toFixed(2)

  if (!type) {
    return value < 0 ? `- ₱${absoluteValue}` : `₱${absoluteValue}`
  } else {
    if (value > 1000000) absoluteValue = abbreviateLargeNumbers(Number(absoluteValue))

    return type === TransactionTypeEnumSchema.Values.EXPENSE ? `- ₱${absoluteValue}` : `₱${absoluteValue}`
  }
}
