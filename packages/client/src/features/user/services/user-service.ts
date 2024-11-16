import config from "~/lib/config"
import axios from "axios"
import { UserDtoSchema, UserDto, ResponseDto } from "@budgeteer/types"

const BASE_URL = config.NEXT_PUBLIC_API_BASE_URL

const userService = {
  fetchUserDetails: async (token: string): Promise<UserDto> => {
    const { data: response } = await axios.get<ResponseDto<UserDto>>(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const { data: user, success } = UserDtoSchema.safeParse(response.data)

    if (!success) {
      throw new Error("The server sent malformatted data. Please contact the website admin.")
    }

    return user
  },
}

export default userService
