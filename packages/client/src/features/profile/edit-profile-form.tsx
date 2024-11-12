"use client"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { UserPen, Save } from "lucide-react"

import { useState } from "react"

export default function EditProfileForm() {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleCancelEditing = () => {
    setIsEditing(false)
  }

  const handleSaveChanges = () => {
    console.log("TODO: implement profile change saving")
    handleCancelEditing()
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <Avatar className="w-48 h-48">
          <AvatarImage alt="Your profile picture" />
          <AvatarFallback>Ü</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2 w-full max-w-md">
          <Label htmlFor="new-username">Username</Label>

          {isEditing ? (
            <Input id="new-username" placeholder="johndoe" readOnly className="max-w-md" />
          ) : (
            <p id="new-username" className="text-2xl font-semibold text-primary">
              johndoe
            </p>
          )}
        </div>
        <div className="space-y-2 w-full max-w-md">
          <Label htmlFor="new-password">Password</Label>
          {isEditing ? (
            <Input id="new-password" type="password" placeholder="••••••••" className="max-w-md" />
          ) : (
            <p id="new-password" className="text-2xl font-semibold">
              ••••••••
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        {isEditing ? (
          <div className="grid gap-3 w-full max-w-md">
            <Button onClick={handleSaveChanges} size="lg" className="w-full">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
            <Button onClick={handleCancelEditing} variant="ghost" size="lg" className="w-full">
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={handleEditProfile} variant="outline" size="lg" className="w-full max-w-md">
            <UserPen className="w-4 h-4" />
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  )
}
