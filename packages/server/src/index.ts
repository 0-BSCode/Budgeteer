import { Hono } from "hono"
import transactionApi from "./router/transactions/transactions.router"
import { HttpStatusEnum, type ResponseDto } from "@budgeteer/types"

const app = new Hono()

app.onError((err, c) => {
  const response: ResponseDto<null> = {
    status: HttpStatusEnum.INTERNAL_SERVER_ERROR,
    data: null,
    message: err.message,
  }
  return c.json(response)
})

app.get("/", c => c.text("OK!"))

app.route("/api/transactions", transactionApi)

export default app
