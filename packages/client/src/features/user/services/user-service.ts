import config from "~/lib/config"
import axios from "axios"
import { UserPublicDtoSchema, UserPublicDto, ResponseDto, UserUpdateDto } from "@budgeteer/types"
import { AxiosError } from "axios"

const BASE_URL = `${config.NEXT_PUBLIC_API_BASE_URL}/users`

const userService = {
  fetchUserDetails: async (token: string): Promise<UserPublicDto | undefined> => {
    try {
      const { data: response } = await axios.get<ResponseDto<UserPublicDto>>(`${BASE_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { data: user, success } = UserPublicDtoSchema.safeParse(response.data)

      if (!success) {
        throw new Error(response.message)
      }

      return user
    } catch (e) {
      if ((e as Error).name === "AxiosError") {
        if ((e as AxiosError).status) {
          throw new Error((e as AxiosError).message)
        }
      }
    }
  },
  updateUserCredentials: async (token: string, credentials: UserUpdateDto): Promise<UserPublicDto> => {
    try {
      const { data: response } = await axios.patch<ResponseDto<UserPublicDto>>(`${BASE_URL}`, credentials, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const { data: user, success } = UserPublicDtoSchema.safeParse(response.data)

      if (!success) {
        throw new Error(response.message)
      }

      return user
    } catch (e) {
      if (credentials.password.length < 8) {
        throw new Error("Invalid input. Password must contain at least 8 characters.")
      } else if (credentials.username.length < 3) {
        throw new Error("Invalid input. Username must contain at least 3 characters.")
      } else if ((e as Error).message.includes("duplicate")) {
        throw new Error("Invalid input. That username is taken. Please use another name.")
      } else {
        throw new Error("Invalid input. Please try again with different values.")
      }
    }
  },
  updateUserProfilePicture: async (token: string, newProfilePicture: string): Promise<UserPublicDto> => {
    const { data: response } = await axios.patch<ResponseDto<UserPublicDto>>(
      `${BASE_URL}/profile-picture`,
      { profile_picture: newProfilePicture },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )

    const { data: user, success } = UserPublicDtoSchema.safeParse(response.data)

    if (!success) {
      throw new Error("The profile picture was malformatted!")
    }

    return user
  },
}

export default userService
