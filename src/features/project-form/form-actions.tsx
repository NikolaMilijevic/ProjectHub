import { useRouter } from "@tanstack/react-router";
import { useFormikContext } from "formik";
import { Button } from "../../components/ui/button";


const FormActions = () => {
  const { isSubmitting, isValid, resetForm } = useFormikContext();
  const router = useRouter();

  const handleCancel = () => {
  resetForm();
  router.navigate({ to: '/dashboard'});
  }
  return (
    <div className="grid grid-cols-[150px_1fr] gap-2 border-t-1 pt-10">
      <Button
        type="button"
        variant={'outline'} 
        className="bg-white-300 text-black-200"
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        className="bg-violet-400 hover:bg-violet-500" 
        disabled={isSubmitting || !isValid}  
      >
        {isSubmitting ? 'Creating...' : '+ Create Project'}
      </Button>
    </div>
  )
}

export default FormActions