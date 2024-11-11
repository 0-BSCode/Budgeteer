import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { authRequestSchema } from "./auth-dto.router"
import { AuthUseCases } from "~/use-cases/auth/auth.use-cases"

const auth = new Hono()

auth.post("/register", zValidator("json", authRequestSchema), async c => {
  const { username, password } = c.req.valid("json")

  const response = await AuthUseCases.register({ username, password })

  return c.json(response)
})

auth.post("/login", zValidator("json", authRequestSchema), async c => {
  const { username, password } = c.req.valid("json")

  const response = await AuthUseCases.login({ username, password })

  return c.json(response)
})

export default auth
