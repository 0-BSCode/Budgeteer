import { Hono } from "hono"
import { authRequestSchema } from "./auth-dto.router"
import { AuthUseCases } from "~/use-cases/auth/auth.use-cases"
import { validateInput } from "../_utils/validate-input"
import { validator } from "hono/validator"

const auth = new Hono()

auth.post(
  "/register",
  validator("json", (value, _c) => validateInput(authRequestSchema, value)),
  async c => {
    const { username, password } = c.req.valid("json")

    const response = await AuthUseCases.register({ username, password })

    return c.json(response)
  },
)

auth.post(
  "/login",
  validator("json", (value, _c) => validateInput(authRequestSchema, value)),
  async c => {
    const { username, password } = c.req.valid("json")

    const response = await AuthUseCases.login({ username, password })

    return c.json(response)
  },
)

export default auth
