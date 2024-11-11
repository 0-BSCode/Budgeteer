import { Hono } from "hono"
import { authenticate } from "~/middleware/authenticate"
import { zValidator } from "@hono/zod-validator"
import { UsersUseCases } from "~/services/use-cases/users/users.use-cases"
import { patchUserSchema } from "./users-dto.router"

type Variables = {
  id: string
}

const user = new Hono<{ Variables: Variables }>()

user.use("*", authenticate)

user.get("/", async c => {
  const id = c.get("id")

  const response = await UsersUseCases.findById(parseInt(id))

  return c.json(response)
})

user.patch("/profile-picture", zValidator("json", patchUserSchema), async c => {
  const { profile_picture_url } = c.req.valid("json")
  const id = c.get("id")

  const response = await UsersUseCases.updateProfilePictureUrl(parseInt(id), {
    profile_picture: profile_picture_url,
  })

  return c.json(response)
})

export default user
