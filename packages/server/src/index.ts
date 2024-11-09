import { Hono } from "hono"
import auth from "./router/auth/auth.router"
import user from "./router/users/users.router"

const app = new Hono()
app.get("/", c => c.text("Hello Bun!"))

// Routes
app.route("/", auth)
app.route("/", user)

export default app
