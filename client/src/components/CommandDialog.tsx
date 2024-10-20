import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { MessageCirclePlus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { closeDialog, openDialog } from "@/features/dialog/dialogSlice";
import { Skeleton } from "./ui/skeleton";

export function CommandDialogCompnent() {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.dialog);

  return (
    <>
      <MessageCirclePlus
        className="cursor-pointer"
        onClick={() => dispatch(openDialog())}
      />
      <CommandDialog open={isOpen} onOpenChange={() => dispatch(closeDialog())}>
        <CommandInput placeholder="Search users..." />
        <CommandList>
          {/* <CommandEmpty>No users found</CommandEmpty> */}

          <div className="px-3 py-2 space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          </div>
        </CommandList>
      </CommandDialog>
    </>
  );
}
