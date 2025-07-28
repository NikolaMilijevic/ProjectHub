import { useRouter } from "@tanstack/react-router";
import { Button } from "./button";

interface NewProjectdButtonProps {
    buttonText?: string;
}

const NewProjectButton = ({buttonText = "+ New Project"} : NewProjectdButtonProps) => {
  
const router = useRouter();
  return (
    <Button 
            variant={'ghost'} 
            className="bg-violet-400 hover:bg-violet-500 ml-5 text-white hover:text-white" 
            onClick={() => router.navigate({ to: '/new-project'})}
        >
            {buttonText}
    </Button>
  )
}

export default NewProjectButton