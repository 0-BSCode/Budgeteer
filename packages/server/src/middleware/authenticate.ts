import { verify } from "hono/jwt"
import { createMiddleware } from "hono/factory"
import { ConfigService } from "~/services/config-service"
import type { SignatureKey } from "hono/utils/jwt/jws"
import { HTTPException } from "hono/http-exception"
import { HttpStatusEnum } from "@budgeteer/types"

const authenticate = createMiddleware(async (c, next) => {
  const authHeader = c.req.header("authorization")

  if (!authHeader) {
    return c.json({ msg: "No authorization header found" }, 403)
  }

  const token = authHeader.split(" ")[1]

  try {
    const decodedPayload = await verify(token, ConfigService.JWT_SECRET as SignatureKey)

    const { username, id } = decodedPayload

    // Set variables for user id and username in request context
    c.set("id", id)
    c.set("username", username)
  } catch (err) {
    if (err instanceof Error) {
      throw new HTTPException(HttpStatusEnum.FORBIDDEN, { message: err.message })
    }
    throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: "Unable to verify token" })
  }

  await next()
})

export { authenticate }
