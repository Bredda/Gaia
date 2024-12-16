import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface SettingsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Settings = ({ open, setOpen }: SettingsProps) => {
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
