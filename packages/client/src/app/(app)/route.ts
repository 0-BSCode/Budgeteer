import { redirect } from "next/navigation"

export async function GET(_: Request) {
  redirect("/dashboard")
}
