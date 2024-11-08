import { Hono } from "hono"
import { authenticate } from "~/middleware/authenticate"
import { userRepository } from "~/infrastructure/typeorm-data-service/repositories/user.repository"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"

type Variables = {
  id: string
}

const user = new Hono<{ Variables: Variables }>().basePath("/user")

user.use("*", authenticate)

user.get("/", async c => {
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

const patchUserSchema = z.object({
  profile_picture_url: z.string().max(255),
})

user.patch("/profile-picture", zValidator("json", patchUserSchema), async c => {
  const { profile_picture_url } = c.req.valid("json")
  const id = c.get("id")

  if (!(await userRepository.findById(parseInt(id)))) {
    return c.json({ msg: "User not found!" }, 400)
  }

  const updatedUser = await userRepository.updateProfilePictureUrl(parseInt(id), {
    profile_picture: profile_picture_url,
  })

  return c.json(
    {
      data: updatedUser,
    },
    201,
  )
})

export default user
