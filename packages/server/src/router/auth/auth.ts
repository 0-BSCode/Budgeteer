// authors.ts
import { Hono } from "hono"
import { cors } from "hono/cors"

const auth = new Hono().basePath("/auth")
auth.use("*", cors())

auth.post("/login", c => c.json("list authors"))

auth.post("/register", c => c.json("create an author", 201))

export default auth
