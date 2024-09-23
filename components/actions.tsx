"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { PersonIcon } from "@radix-ui/react-icons";
import { Loader2, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function EntryActions({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const isMutating = isLoading || isPending;
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  async function deleteMission(id: string) {
    const res = await fetch(`/api/entry/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });

    if (!res?.ok) {
      toast({
        title: "Something went wrong.",
        description: `${id} was not deleted. Please try again.`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <Link
            href={`/dashboard/reactions/${id}`}
            className="flex items-center">
            <DropdownMenuItem className="w-full">
              <PersonIcon className="w-4 h-4 mr-2" /> Attendees
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="flex items-center text-destructive focus:text-destructive "
            onSelect={() => setShowDeleteAlert(true)}>
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this mission?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are deleting {id}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsLoading(true);

                const deleted = await deleteMission(id);

                if (deleted) {
                  startTransition(() => {
                    if (pathname.includes(id)) {
                      router.push(`/`);
                    }
                    // Force a cache invalidation.
                    router.refresh();
                  });
                  toast({
                    title: "Entry Deleted",
                    description: `${id} was successfully deleted.`,
                    variant: "destructive",
                  });
                }
                setIsLoading(false);
                setShowDeleteAlert(false);
              }}
              className={buttonVariants({ variant: "destructive" })}>
              {isMutating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
