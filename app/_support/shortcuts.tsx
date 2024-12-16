import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { ShortcutsMap } from "../config/shortcuts";
import { Command } from "lucide-react";

interface ShortcutsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Shortcuts = ({ open, setOpen }: ShortcutsProps) => {
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Shortcuts</DialogTitle>
          <DialogDescription>
            These are app shortcuts to ease navigation.{" "}
            <Command className="inline size-4" /> denotes the CTRL key on
            windows and linux or the Command key on MacOS.
          </DialogDescription>
          <div className="flex flex-col space-y-2 pt-4">
            {[...ShortcutsMap.keys()].map((key) => (
              <div key={key} className="flex items-center">
                <span className="w-48">{ShortcutsMap.get(key)?.label}</span>
                <span className="flex items-center space-x-1 text-muted-foreground">
                  <Command />
                  {ShortcutsMap.get(key)?.key}{" "}
                </span>
              </div>
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Shortcuts;
