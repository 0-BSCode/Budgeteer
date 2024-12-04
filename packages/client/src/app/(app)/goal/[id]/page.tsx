import EditGoalForm from "~/features/goal/components/edit-goal-form"

export default async function EditGoalPage({ params }: { params: Promise<{ id: string }> }) {
  const goalId = (await params).id

  return (
    <div className="col-span-full">
      <h1 className="mb-8 text-center text-3xl font-bold">Edit Goal</h1>
      <EditGoalForm id={goalId} />
    </div>
  )
}
