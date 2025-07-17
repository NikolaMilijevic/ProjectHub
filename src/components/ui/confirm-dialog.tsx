import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

import { Button } from "./button";

interface ConfirmDialogProps {
  triggerLabel: string;
  confirmLabel?: string;
  cancelLabel?: string;
  description: string;
  title?: string;
  onConfirm: () => void;
  className?: string;
  triggerVariant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
  triggerType?: "button" | "submit" | "reset";
}

const ConfirmDialog = ({
  triggerLabel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  description,
  title = "Are you sure?",
  onConfirm,
  className,
  triggerVariant = "default",
  triggerType = "button",
}: ConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type={triggerType} variant={triggerVariant} className={className}>
          {triggerLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-green-500 hover:bg-green-700">{confirmLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
