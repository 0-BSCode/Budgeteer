import CreateGoalForm from "~/features/goal/components/create-goal-form"

export default function CreateGoalPage() {
  return (
    <div className="col-span-full">
      <h1 className="mb-8 text-center text-3xl font-bold">Create Goal</h1>
      <CreateGoalForm />
    </div>
  )
}
