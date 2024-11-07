import { Hono } from "hono"
import authorApp from "./routes/transaction.route"

const app = new Hono()
app.get("/", c => c.text("OK!"))

app.route("/api/transaction", authorApp)

export default app
