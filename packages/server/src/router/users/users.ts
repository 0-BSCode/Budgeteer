import { Hono } from "hono"
import { db } from "~/infrastructure/typeorm-data-service"
import { usersTable } from "~/infrastructure/typeorm-data-service/models/user.model"
import { eq } from "drizzle-orm"

import { authenticate } from "~/middleware/authenticate"

type Variables = {
  id: string
}

const user = new Hono<{ Variables: Variables }>().basePath("/user")

user.get("/", authenticate, async c => {
  const id = c.get("id")

  const foundUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, parseInt(id)))

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
