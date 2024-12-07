import { HttpStatusEnum } from "@budgeteer/types"
import { HTTPException } from "hono/http-exception"
import type { ZodError, ZodObject, ZodRawShape } from "zod"

const formatZodError = (error: ZodError) => {
  let message = "Invalid input received for field/s: "
  const fields = error.issues.map(issue => issue.path[0])
  message += fields.join(", ")
  return message
}

export const validateInput = <T extends ZodRawShape>(schema: ZodObject<T>, value: Record<string, string>) => {
  const { data, success, error } = schema.safeParse(value)

  if (!success) {
    const response = new Response("Bad Request", {
      status: HttpStatusEnum.BAD_REQUEST,
    })

    const errorMsg = formatZodError(error)

    throw new HTTPException(HttpStatusEnum.BAD_REQUEST, { res: response, message: errorMsg })
  }

  return data
}
