/* eslint-disable @typescript-eslint/no-explicit-any */

export const enumsToPgEnum = <T extends Record<string, any>>(myEnums: T[]): [T[keyof T], ...T[keyof T][]] => {
  const res = [] as unknown as [T[keyof T], ...T[keyof T][]]

  for (const myEnum of myEnums) {
    const values = Object.values(myEnum).map((value: any) => `${value}`) as any
    res.push(...values)
  }

  const uniqueValues = new Set(res)
  return Array.from(uniqueValues) as [T[keyof T], ...T[keyof T][]]
}
