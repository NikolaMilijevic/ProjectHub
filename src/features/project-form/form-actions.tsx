import { useRouter } from "@tanstack/react-router";
import { useFormikContext } from "formik";
import type { FormValues } from "./types";
import ConfirmDialog from "../../components/ui/confirm-dialog";
import { Button } from "../../components/ui/button";

const FormActions = () => {
  const { isSubmitting, isValid, resetForm, values } = useFormikContext<FormValues>();
  const router = useRouter();

  const handleCancel = () => {
    resetForm();
    router.navigate({ to: "/dashboard" });
  };

  const isEditMode = !!values.id;

  return (
    <div className="grid grid-cols-[150px_1fr] gap-2 border-t-1 pt-10">
      <ConfirmDialog
        triggerLabel="Cancel"
        triggerVariant="outline"
        className="bg-white-300 text-black-200"
        title="Are you sure?"
        description="This action cannot be undone. This will clear your form and return you to dashboard."
        onConfirm={handleCancel}
      />
      <Button
        type="submit"
        className="bg-violet-400 hover:bg-violet-500"
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting
          ? isEditMode
            ? "Updating..."
            : "Creating..."
          : isEditMode
            ? "Update Project"
            : "+ Create Project"}
      </Button>
    </div>
  );
};

export default FormActions;
