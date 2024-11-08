import { Hono } from "hono"
import { sign } from "hono/jwt"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
import { genSaltSync, hashSync, compareSync } from "bcrypt"
import { envConfig } from "~/services/config-service"
import type { SignatureKey } from "hono/utils/jwt/jws"
import { userRepository } from "~/infrastructure/typeorm-data-service/repositories/user.repository"

const auth = new Hono().basePath("/auth")

// Schema validation
const authRequestSchema = z.object({
  username: z
    .string()
    .max(30)
    .regex(/^[a-zA-Z0-9]+$/),
  password: z.string(),
})

auth.post("/register", zValidator("json", authRequestSchema), async c => {
  const { username, password } = c.req.valid("json")

  if (await userRepository.findByUsername(username)) {
    return c.json({ msg: `User with name ${username} already exists!` }, 400)
  }

  const salt = genSaltSync()
  const hashedPassword = hashSync(password, salt)

  const newUser = await userRepository.create({ username, password: hashedPassword })

  return c.json(
    {
      msg: "You have successfully created an account.",
      data: newUser,
    },
    201,
  )
})

auth.post("/login", zValidator("json", authRequestSchema), async c => {
  const { username, password } = c.req.valid("json")

  const queriedUserDetails = await userRepository.findByUsername(username)

  if (!queriedUserDetails) {
    return c.json({ msg: `User with name ${username} not found!` }, 400)
  }

  const { id } = queriedUserDetails

  if (!compareSync(password, queriedUserDetails.password)) {
    return c.json({ msg: "Incorrect password. Please try again!" }, 400)
  }

  const token = await sign(
    {
      id,
      username,
      // Expires in 1 hour
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    envConfig.JWT_SECRET as SignatureKey,
  )

  return c.json(
    {
      message: "Login successful!",
      data: token,
    },
    200,
  )
})

export default auth
