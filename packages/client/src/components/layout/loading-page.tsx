import { LoaderCircle } from "lucide-react"

export default function LoadingPage() {
  return (
    <main className="absolute flex h-screen w-screen items-center justify-center">
      <LoaderCircle className="col-span-full mx-auto h-12 w-12 animate-spin text-primary" />
    </main>
  )
}
