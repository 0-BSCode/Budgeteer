import EditProfileForm from "~/features/user/components/edit-profile-form"

export default function Profile() {
  return (
    <div className="col-span-full">
      <h1 className="text-3xl font-bold text-center mb-8">My Profile</h1>
      <EditProfileForm />
    </div>
  )
}
