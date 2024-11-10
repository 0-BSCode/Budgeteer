import { verify } from "hono/jwt"
import { createMiddleware } from "hono/factory"
import { ConfigService } from "~/services/config-service"
import type { SignatureKey } from "hono/utils/jwt/jws"

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
    console.log(err)
    return c.json({ msg: `An error occurred while verifying token` }, 403)
  }

  await next()
})

export { authenticate }
