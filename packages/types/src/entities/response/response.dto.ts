import type { HttpStatusEnum } from "~/enums/http-status.enum"

export type ResponseDto<T> = {
  message?: string
  status: HttpStatusEnum
  data: T
}
