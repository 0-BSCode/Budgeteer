import { Hono } from "hono"

const authorApp = new Hono()
  .get("/", async c => {
    return c.text("Hello World!")
  })
  .post("/", async c => {
    return c.text("Hello World!")
  })
  .put("/:id", async c => {
    return c.text("Hello World!")
  })
  .delete("/:id", async c => {
    return c.text("Hello World!")
  })

export default authorApp
