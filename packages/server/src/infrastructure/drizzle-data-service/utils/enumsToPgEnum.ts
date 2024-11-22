/* eslint-disable @typescript-eslint/no-explicit-any */

export const enumsToPgEnum = <T extends string>(...values: Record<string, T>[]): [T, ...T[]] => {
  const allValues = values.flatMap(obj => Object.values(obj))
  const uniqueValues = [...new Set(allValues)]

  // Ensure at least one value exists
  if (uniqueValues.length === 0) {
    throw new Error("At least one enum value is required")
  }

  return [uniqueValues[0], ...uniqueValues.slice(1)] as [T, ...T[]]
}
