import { Hono } from "hono"
import { db } from "./infrastructure/typeorm-data-service"
import { transactionsTable } from "./infrastructure/typeorm-data-service/models/transaction.model"

const app = new Hono()
app.get("/", c => c.text("Hello Bun!"))

app.use("/test", async c => {
  const users = await db.select().from(transactionsTable)

  return c.json({ users }, 200)
})

export default app
