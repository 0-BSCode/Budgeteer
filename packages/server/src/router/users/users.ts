import { Hono } from "hono"
import { db } from "~/infrastructure/typeorm-data-service"
import { usersTable } from "~/infrastructure/typeorm-data-service/models/user.model"
import { eq } from "drizzle-orm"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
const user = new Hono().basePath("/user")

const schema = z.object({
  id: z.string().pipe(z.coerce.number()),
})

user.get("/:id", zValidator("param", schema), async c => {
  const { id } = c.req.valid("param")

  const foundUser = await db.select().from(usersTable).where(eq(usersTable.id, id))

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
