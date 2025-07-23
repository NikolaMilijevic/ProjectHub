import { useRouter } from "@tanstack/react-router";
import { Button } from "./button"
import { ArrowLeft } from "lucide-react";

interface DashboardButtonProps {
    buttonText?: string;
}

const DashboardButton = ({buttonText = "Back To Projects"}: DashboardButtonProps) => {
const router = useRouter();

  return (
    <Button 
        variant={'secondary'} 
        className="bg-white hover:bg-white p-2 text-sm" 
        onClick={() => router.navigate({ to: '/dashboard'})}
        >
        <ArrowLeft 
        className="w-4 h-4 mr-1" 
        />
        {buttonText}
    </Button>  
    )
}

export default DashboardButton