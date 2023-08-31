import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CustomDialogProps {
  prop?: string;
  children?: React.ReactNode;
}

const CustomDialog: FC<CustomDialogProps> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger className="uppercase font-bold w-full rounded-xl text-card-foreground mb-4">
        Focus image
      </DialogTrigger>
      <DialogContent className={cn("dark:bg-[#0f0f0f]/90 min-w-fit p-10")}>
        {children}
        <DialogDescription className="text-center text-card-foreground ">
          Images may appear smaller on mobile devices. For a clearer view,
          consider checking on a larger screen.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
export default CustomDialog;
