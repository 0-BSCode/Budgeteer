export type IHashService = {
  hashPassword: (password: string) => string
  comparePassword: (password: string, hashedPassword: string) => boolean
}
