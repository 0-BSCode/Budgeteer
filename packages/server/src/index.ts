import { Hono } from "hono"
import transactionApi from "./router/transactions/transactions.router"

const app = new Hono()
app.get("/", c => c.text("OK!"))

app.route("/api/transactions", transactionApi)

export default app
