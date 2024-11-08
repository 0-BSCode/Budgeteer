import { Hono } from "hono"
import auth from "./services/auth-service"

const app = new Hono()
app.get("/", c => c.text("Hello Bun!"))

app.route("/", auth)

export default app
