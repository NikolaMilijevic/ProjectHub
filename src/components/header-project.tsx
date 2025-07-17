import { ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "@tanstack/react-router"


const Header = () => {
  const router = useRouter();

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Button 
          variant={'secondary'} 
          className="bg-white hover:bg-white p-2 text-sm" 
          onClick={() => router.navigate({ to: '/dashboard'})}
          >
            <ArrowLeft 
            className="w-4 h-4 mr-1" 
            />
            Back to Projects
          </Button>
          <h1 className="text-lg sm:text-xl font-bold border-l border-gray-200 pl-3">
              Create New Project
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Header