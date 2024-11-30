import EditProfileForm from "~/features/user/components/edit-profile-form"

export default function Profile() {
  return (
    <div className="col-span-full">
      <h1 className="mb-8 text-center text-3xl font-bold">My Profile</h1>
      <EditProfileForm />
    </div>
  )
}
