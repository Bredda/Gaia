"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { useGameMaster } from "./game.provider";
import { ColumnDef } from "@tanstack/react-table";
import { Game } from "./types";
import { DataTable } from "@/components/ui/extensions/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Play, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface GameLoaderProps {
  className?: string;
  children: React.ReactNode;
}

function GameLoader({ className, children }: GameLoaderProps) {
  const [open, setOpen] = useState(false);
  const { games, loadGame } = useGameMaster();
  const router = useRouter();

  async function onLoad(gameId: string) {
    await loadGame(gameId);
    router.push(`/applications/game-master/${gameId}`);
  }

  const columns: ColumnDef<Game>[] = [
    {
      accessorKey: "name",
      header: () => <div className="md:w-[90px]">Name</div>,
    },
    {
      accessorKey: "world_name",
      header: () => <div className="md:w-[90px]">World</div>,
    },
    {
      accessorKey: "updated_at",
      header: "Last saved",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const game = row.original;

        return (
          <div className="flex items-center justify-end space-x-4">
            <Button
              variant="ghost"
              onClick={async () => await onLoad(game.id)}
              className="h-8 w-8 p-0 "
            >
              <Play className="h-4 w-4" />
            </Button>
            <Button variant="destructive" className="h-8 w-8 p-0">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Load game</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DataTable columns={columns} data={games} />
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default GameLoader;
