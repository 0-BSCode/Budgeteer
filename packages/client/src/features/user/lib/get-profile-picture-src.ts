import { AVAILABLE_PROFILE_PICTURES } from "@budgeteer/types"

/**
 * Returns a profile picture URL for the user.
 *
 * @param profilePicture the `user.profile_picture` field fetched from the database
 * @returns
 */
export function getProfilePictureSrc(str?: string): string {
  // Falls back to the first profile picture if invalid
  const isValidProfilePicture = str && AVAILABLE_PROFILE_PICTURES.includes(str)
  const profilePicture = isValidProfilePicture ? str : AVAILABLE_PROFILE_PICTURES[0]

  return `/img/profile-picture/${profilePicture}.webp`
}
