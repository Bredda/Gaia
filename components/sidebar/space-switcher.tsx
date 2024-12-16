"use client";

import { ChevronsUpDown, Home, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useSpace } from "@/hooks/use-space";
import { CreateSpacePayload, createSpaceSchema, Space } from "@/types/space";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { insertSpace } from "@/actions/space.actions";
import { toast } from "sonner";
import { set } from "date-fns";

export function SpaceSwitcher() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { spaces, selectSpace, activeSpace } = useSpace();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [creating, setCreating] = useState(false);
  const onChangeActiveSpace = (space: Space) => {
    selectSpace(space);
    router.push(`/space/${space.slug}`);
  };
  const form = useForm<CreateSpacePayload>({
    resolver: zodResolver(createSpaceSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenDropdown(!openDropdown);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onSubmit = async (data: CreateSpacePayload) => {
    setCreating(true);
    const { space, error } = await insertSpace(data);
    if (error) {
      console.error(error);
      toast.error("Error creating space");
    } else {
      router.push(`/space/${space.slug}`);
      setOpenDialog(false);
    }
    setCreating(false);
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
          <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
            <DropdownMenuTrigger
              asChild
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Home className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeSpace?.name}
                  </span>
                  <span className="truncate text-xs">
                    {activeSpace?.description}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Spaces
              </DropdownMenuLabel>
              {spaces.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => onChangeActiveSpace(team)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <Home className="size-4 shrink-0" />
                  </div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />

              <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium ">Add space</div>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>{" "}
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add space</DialogTitle>
              <DialogDescription>
                Create space to organize your projects.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    variant="secondary"
                    disabled={creating}
                    type="button"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={creating}>
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
