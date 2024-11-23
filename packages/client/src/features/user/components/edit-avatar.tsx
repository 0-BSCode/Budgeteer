"use client"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Pencil, Save } from "lucide-react"
import { getProfilePictureSrc } from "../lib/get-profile-picture-src"
import { AVAILABLE_PROFILE_PICTURES } from "@budgeteer/types"
import { cn } from "~/lib/utils"

import { useUserContext } from "../providers/user-context-provider"
import { useState } from "react"

export default function EditAvatar() {
  const { user } = useUserContext()
  const USERNAME_INITIAL = user?.username[0] ?? "Ü"
  const CURRENT_USER_PROFILE_PICTURE =
    user?.profile_picture && user.profile_picture !== "" ? user?.profile_picture : AVAILABLE_PROFILE_PICTURES[0]

  const [newProfilePicture, setNewProfilePicture] = useState(CURRENT_USER_PROFILE_PICTURE)

  const handleSaveChanges = () => {
    console.log("TODO: Persist changes to backend.", newProfilePicture)
  }

  const handleCloseDialog = (_: boolean) => {
    setNewProfilePicture(CURRENT_USER_PROFILE_PICTURE)
  }

  const handleSelectAvatar = (pic: string) => {
    setNewProfilePicture(pic)
  }

  return (
    <div className="relative">
      <Avatar className="w-48 h-48">
        <AvatarImage src={getProfilePictureSrc(user?.profile_picture)} alt="Your profile picture" />
        <AvatarFallback>{USERNAME_INITIAL}</AvatarFallback>
      </Avatar>
      <Dialog onOpenChange={handleCloseDialog}>
        <DialogTrigger asChild className="absolute bottom-2 right-2">
          <Button variant="outline" className="rounded-full" size="icon">
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose a New Avatar</DialogTitle>
            <DialogDescription className="sr-only">
              Choose your new avatar from our wide array of choices.
            </DialogDescription>
            <div className="grid grid-cols-3 gap-4 p-4 place-items-center">
              {AVAILABLE_PROFILE_PICTURES.map(pic => {
                console.log({ CURRENT_USER_PROFILE_PICTURE, pic })

                return (
                  <Avatar
                    onClick={() => handleSelectAvatar(pic)}
                    key={`profile-picture-id-${pic}`}
                    className={cn("w-24 h-24", {
                      "outline-4 outline outline-primary": pic === newProfilePicture,
                      "opacity-70 hover:opacity-100 transition-all cursor-pointer": pic !== newProfilePicture,
                    })}
                  >
                    <AvatarImage src={getProfilePictureSrc(pic)} alt="Your profile picture" />
                    <AvatarFallback>{USERNAME_INITIAL}</AvatarFallback>
                  </Avatar>
                )
              })}
            </div>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={CURRENT_USER_PROFILE_PICTURE === newProfilePicture} onClick={handleSaveChanges}>
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
