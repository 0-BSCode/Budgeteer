import { Hono } from "hono"
import auth from "./router/auth/auth.router"
import user from "./router/users/users.router"
import transactionApi from "./router/transactions/transactions.router"
import { HttpStatusEnum, type ResponseDto } from "@budgeteer/types"
import { logger } from "hono/logger"
import { cors } from "hono/cors"

const app = new Hono()

app.use(logger())
app.use(cors())

app.onError((err, c) => {
  const response: ResponseDto<null> = {
    status: HttpStatusEnum.INTERNAL_SERVER_ERROR,
    data: null,
    message: err.message,
  }
  return c.json(response)
})

app.get("/", c => c.text("OK!"))

// Routes
app.route("/api/transactions", transactionApi)
app.route("/api/auth", auth)
app.route("/api/users", user)

export default app
