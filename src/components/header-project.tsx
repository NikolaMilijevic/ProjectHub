import { ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "@tanstack/react-router"


const Header = () => {
  const router = useRouter();

  return (
    <div className="border-b-1">
      <div className="flex items-center gap-4 mb-2 mt-2 pl-100">
        <Button 
        variant={'secondary'} 
        className="bg-white hover:bg-white" 
        onClick={() => router.navigate({ to: '/dashboard'})}
        >
          <ArrowLeft 
          className="w-4 h-4 mr-1" 
          />
          Back to Projects
        </Button>
        <h1 className="text-lg font-bold border-l h-7 border-gray-200 pl-3">
            Create New Project
        </h1>
      </div>
    </div>
  )
}

export default Header