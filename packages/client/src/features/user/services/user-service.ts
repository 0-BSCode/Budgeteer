import config from "~/lib/config"

const BASE_URL = config.NEXT_PUBLIC_API_BASE_URL

const userService = {
  login: (username: string, password: string) => {},
}

export default userService
