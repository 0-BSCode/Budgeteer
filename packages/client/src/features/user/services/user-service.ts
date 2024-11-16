import config from "~/lib/config"
import axios from "axios"
import { UserPublicDtoSchema, UserPublicDto, ResponseDto } from "@budgeteer/types"

const BASE_URL = config.NEXT_PUBLIC_API_BASE_URL

const userService = {
  fetchUserDetails: async (token: string): Promise<UserPublicDto> => {
    const { data: response } = await axios.get<ResponseDto<UserPublicDto>>(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const { data: user, success } = UserPublicDtoSchema.safeParse(response.data)

    if (!success) {
      throw new Error("The server sent malformatted data. Please contact the website admin.")
    }

    return user
  },
}

export default userService
