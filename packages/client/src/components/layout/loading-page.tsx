import { LoaderCircle } from "lucide-react"

export default function LoadingPage() {
  return (
    <main className="w-screen h-screen absolute flex items-center justify-center">
      <LoaderCircle className="animate-spin h-12 w-12 mx-auto col-span-full text-primary" />
    </main>
  )
}
