"use client"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { UserPen, Save } from "lucide-react"
import EditAvatar from "./edit-avatar"

import { useState, type Dispatch, type SetStateAction } from "react"
import { useUserContext } from "../providers/user-context-provider"

const BLANK_INPUT = ""

export default function EditProfileForm() {
  const [isEditing, setIsEditing] = useState(false)
  const { user } = useUserContext()
  const username = user?.username ?? "Guest"
  const [newUsername, setNewUsername] = useState(BLANK_INPUT)
  const [newPassword, setNewPassword] = useState(BLANK_INPUT)

  const isInvalidNewCredentials = newUsername === BLANK_INPUT || newPassword === BLANK_INPUT

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleCancelEditing = () => {
    setNewUsername(BLANK_INPUT)
    setNewPassword(BLANK_INPUT)
    setIsEditing(false)
  }

  const handleSaveChanges = () => {
    console.log("TODO: implement profile change saving")
    handleCancelEditing()
  }

  const handleInputChange = (setFn: Dispatch<SetStateAction<string>>, value: string) => {
    setFn(value)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <EditAvatar />
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2 w-full max-w-md">
          <Label htmlFor="new-username">Username</Label>

          {isEditing ? (
            <Input
              onChange={e => handleInputChange(setNewUsername, e.target.value)}
              value={newUsername}
              id="new-username"
              placeholder={username}
              className="max-w-md"
            />
          ) : (
            <p id="new-username" className="text-2xl font-semibold text-primary">
              {username}
            </p>
          )}
        </div>
        <div className="space-y-2 w-full max-w-md">
          <Label htmlFor="new-password">Password</Label>
          {isEditing ? (
            <Input
              onChange={e => handleInputChange(setNewPassword, e.target.value)}
              value={newPassword}
              id="new-password"
              type="password"
              placeholder="••••••••"
              className="max-w-md"
            />
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
            <Button onClick={handleSaveChanges} disabled={isInvalidNewCredentials} size="lg" className="w-full">
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
            Edit Credentials
          </Button>
        )}
      </div>
    </div>
  )
}
