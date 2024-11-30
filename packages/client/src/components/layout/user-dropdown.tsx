"use client"

import { CircleUserRound, LogOut, User } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { AVAILABLE_PROFILE_PICTURES } from "@budgeteer/types"
import { getProfilePictureSrc } from "~/features/user/lib/get-profile-picture-src"

import { useUserContext } from "~/features/user/providers/user-context-provider"
import useAuth from "~/features/auth/hooks/use-auth"

export default function UserDropdown() {
  const { logout } = useAuth()
  const { user } = useUserContext()
  const userProfilePicture = user?.profile_picture ?? AVAILABLE_PROFILE_PICTURES[0]

  const handleLogOut = () => {
    logout()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={getProfilePictureSrc(userProfilePicture)} alt={user?.username ?? "Guest"} />
            <AvatarFallback>
              <CircleUserRound className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>

          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4">
        <DropdownMenuLabel>{user?.username ?? "Guest"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile">
            <User className="h-4 w-4" /> My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogOut} className="cursor-pointer">
          <LogOut className="h-4 w-4" /> Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
