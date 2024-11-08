import { Hono } from "hono"
import auth from "./router/auth/auth"
import user from "./router/users/users"

const app = new Hono()
app.get("/", c => c.text("Hello Bun!"))

// Routes
app.route("/", auth)
app.route("/", user)

export default app
