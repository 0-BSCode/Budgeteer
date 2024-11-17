import config from "~/lib/config"
import axios from "axios"
import { ResponseDto } from "@budgeteer/types"

const BASE_URL = `${config.NEXT_PUBLIC_API_BASE_URL}/auth`

const authService = {
  register: async (username: string, password: string): Promise<string> => {
    const { data: response } = await axios.post<ResponseDto<string>>(`${BASE_URL}/register`, {
      username,
      password,
    })

    if (typeof response.data !== "string") {
      throw new Error("The server sent malformatted data. Please contact the website admin.")
    }

    return response.data
  },
  login: async (username: string, password: string): Promise<string> => {
    const { data: response } = await axios.post<ResponseDto<string>>(`${BASE_URL}/login`, {
      username,
      password,
    })

    if (typeof response.data !== "string") {
      throw new Error("The server sent malformatted data. Please contact the website admin.")
    }

    return response.data
  },
}

export default authService
