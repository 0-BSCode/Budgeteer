import { Hono } from "hono"
import { authenticate } from "~/middleware/authenticate"
import { userRepository } from "~/infrastructure/typeorm-data-service/repositories/user.repository"

type Variables = {
  id: string
}

const user = new Hono<{ Variables: Variables }>().basePath("/user")

user.get("/", authenticate, async c => {
  const id = c.get("id")

  const foundUser = await userRepository.findById(parseInt(id))

  if (!foundUser) {
    return c.json({ msg: "User not found!" }, 400)
  }

  return c.json(
    {
      data: foundUser,
    },
    201,
  )
})

export default user
