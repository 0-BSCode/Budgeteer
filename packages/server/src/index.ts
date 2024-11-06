import { TransactionTypeEnum } from "@budgeteer/types"
import { Hono } from "hono"
import { enumToPgEnum } from "./infrastructure/typeorm-data-service/utils/enumToPgEnum"

console.log(enumToPgEnum(TransactionTypeEnum))

const app = new Hono()
app.get("/", c => c.text("Hello Bun!"))

export default app
