import { rateLimiter } from "hono-rate-limiter"
import { getConnInfo } from "hono/bun"

export const limiter = rateLimiter({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 300, // 100 requests per minute (adjust as needed)
  standardHeaders: "draft-7",
  keyGenerator: c => {
    const connInfo = getConnInfo(c)
    const bearerToken = c.req.header("authorization")

    // Not recommended to use the IP address as the key based on the docs: https://github.com/rhinobase/hono-rate-limiter
    // so use the bearer token as the key if it exists
    return bearerToken || `${connInfo.remote.address}:${connInfo.remote.port}`
  },
})
