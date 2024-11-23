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
import { useToast } from "~/hooks/use-toast"

export default function EditAvatar() {
  const [isEditing, setIsEditing] = useState(false)
  const { user, updateUserProfilePicture } = useUserContext()
  const USERNAME_INITIAL = user?.username[0] ?? "Ü"
  const CURRENT_USER_PROFILE_PICTURE =
    user?.profile_picture && user.profile_picture !== "" ? user?.profile_picture : AVAILABLE_PROFILE_PICTURES[0]
  const [newProfilePicture, setNewProfilePicture] = useState(CURRENT_USER_PROFILE_PICTURE)
  const { toast } = useToast()

  const handleSetModalOpenState = (isOpen: boolean) => {
    setIsEditing(isOpen)
    setNewProfilePicture(CURRENT_USER_PROFILE_PICTURE)
  }

  const handleSelectAvatar = (pic: string) => {
    setNewProfilePicture(pic)
  }

  const handleSaveChanges = async () => {
    if (updateUserProfilePicture) {
      try {
        await updateUserProfilePicture(newProfilePicture)
        toast({
          variant: "success",
          title: "Successfully updated profile picture!",
        })
        handleSetModalOpenState(false)
      } catch (e) {
        toast({
          variant: "destructive",
          title: "Something went wrong while updating profile picture!",
          description: (e as Error).message,
        })
      }
    }
  }

  return (
    <div className="relative">
      <Avatar className="w-48 h-48">
        <AvatarImage src={getProfilePictureSrc(user?.profile_picture)} alt="Your profile picture" />
        <AvatarFallback>{USERNAME_INITIAL}</AvatarFallback>
      </Avatar>
      <Dialog open={isEditing} onOpenChange={handleSetModalOpenState}>
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
                return (
                  <Avatar
                    onClick={() => handleSelectAvatar(pic)}
                    key={`profile-picture-id-${pic}`}
                    className={cn("w-16 h-16 sm:w-24 sm:h-24", {
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
            <Button
              disabled={CURRENT_USER_PROFILE_PICTURE === newProfilePicture || !updateUserProfilePicture}
              onClick={handleSaveChanges}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
