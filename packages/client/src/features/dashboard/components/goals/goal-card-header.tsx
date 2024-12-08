import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { Button } from "~/components/ui/button"
import useGoal from "~/features/goal/hooks/use-goal"
import { useGoalContext } from "~/features/goal/providers/goal-provider"
import { GoalDto } from "@budgeteer/types"
import { Checkbox } from "~/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { toast } from "~/hooks/use-toast"

interface GoalCardHeaderProps {
  goal: GoalDto
}

export function GoalCardHeader({ goal }: GoalCardHeaderProps) {
  const { id, description, isAccomplished } = goal
  const { update, remove } = useGoal()
  const { invalidateGoalCache } = useGoalContext()
  const router = useRouter()

  const handleMarkAsDone = async () => {
    try {
      await update(id.toString(), { ...goal, isAccomplished: !goal.isAccomplished })

      toast({
        variant: "success",
        title: "Update successful!",
        description: "Successfully updated goal",
      })

      invalidateGoalCache()
    } catch (e) {
      toast({
        variant: "destructive",
        title: "An error occured!",
        description: (e as Error).message,
      })
    }
  }

  const handleDelete = async () => {
    try {
      await remove(id.toString())

      toast({
        variant: "success",
        title: "Deletion successful!",
        description: "Successfully deleted goal",
      })

      invalidateGoalCache()
    } catch (e) {
      toast({
        variant: "destructive",
        title: "An error occured!",
        description: (e as Error).message,
      })
    }
  }

  const handleEdit = () => {
    router.push(`/goal/${id}`)
  }

  return (
    <div className="flex items-center justify-between lg:w-full">
      <div className="flex items-center gap-2">
        <Checkbox checked={isAccomplished} onCheckedChange={handleMarkAsDone} />
        <p className={`font-bold text-foreground lg:text-xl ${isAccomplished && "line-through"}`}>{description}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
