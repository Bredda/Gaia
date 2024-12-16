"use client";

import { useEffect } from "react";

interface ShortcutHookProps {
  shortcut: string;
  onShortcut: () => void;
}

export function useShortcut({ shortcut, onShortcut }: ShortcutHookProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === shortcut && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onShortcut();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
}
