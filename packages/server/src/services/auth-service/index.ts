import { Hono } from "hono"
import { sign } from "hono/jwt"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
import { genSaltSync, hashSync, compareSync } from "bcrypt"
import { envConfig } from "~/services/config-service"
import { db } from "~/infrastructure/typeorm-data-service"
import { usersTable } from "~/infrastructure/typeorm-data-service/models/user.model"
import { eq } from "drizzle-orm"

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

  const salt = genSaltSync()
  const hashedPassword = hashSync(password, salt)

  const newUser = await db.insert(usersTable).values({ username, password: hashedPassword, profile_picture: "" })

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

  const queriedUserDetails = await db.select().from(usersTable).where(eq(usersTable.username, username))

  if (queriedUserDetails.length === 0) {
    return c.json({ msg: `User with name ${username} not found!` }, 400)
  }

  const { id } = queriedUserDetails[0]

  if (!compareSync(password, queriedUserDetails[0].password)) {
    return c.json({ msg: "Incorrect password. Please try again!" }, 400)
  }

  const token = await sign(
    {
      id,
      username,
      // Expires in 1 hour
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    envConfig.JWT_SECRET || "",
  )

  return c.json(
    {
      message: "Login successful!",
      data: token,
    },
    200,
  )
})

// // JWT middleware
// const jwtMiddleware = jwt({
//   secret: envConfig.JWT_SECRET || "",
// })

// // Protected route to find user
// auth.get("/user", jwtMiddleware, async c => {
//   const { id } = c.get("jwtPayload")

//   const user = User.findUserById(id)
//   if (!user) {
//     return c.json({ msg: `User with ID ${id} not found!` }, 404)
//   }

//   return c.json({
//     msg: "Successfully found user",
//     data: user,
//   })
// })

export default auth
