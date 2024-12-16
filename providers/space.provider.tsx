"use client";

import { createContext, use, useEffect, useState } from "react";

import { CreateSpacePayload, Space } from "@/types/space";
import { fetchSpaces, insertSpace } from "@/actions/space.actions";

import { usePathname } from "next/navigation";
import { PostgrestError } from "@supabase/supabase-js";
import { CreateNotePayload, Note } from "@/types/notes";
import { fetchNotes, insertNote } from "@/actions/notes.actions";
import { set } from "date-fns";

interface SpaceState {
  loading: boolean;
  spaces: Space[];
  notes: Note[];
  addSpace: (payload: CreateSpacePayload) => void;
  removeSpace: (spaceId: string) => void;
  editSpace: (space: Partial<Space> & { id: string }) => void;
  activeSpace: Space;
  selectSpace: (space: Space) => void;
  saveNote: (payload: CreateNotePayload) => Promise<{
    note: Note;
    error: PostgrestError | null;
  }>;
}

const LoadginSpace: Space = {
  id: "loading",
  name: "Loading...",
  slug: "loading",
};

export const SpaceContext = createContext<SpaceState | undefined>(undefined);

export function SpaceProvider({ children }: any) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [activeSpace, setActiveSpace] = useState<Space>(LoadginSpace);
  const [spaces, setSpaces] = useState<Space[]>([LoadginSpace]);
  const [notes, setNotes] = useState<Note[]>([]);

  const loadAll = async () => {
    try {
      if (spaces.length === 1 && spaces[0].id === "loading") {
        const data = await fetchSpaces();
        setSpaces(data);
        return data;
      }
    } catch (error) {
      throw new Error("Error fetching spaces");
    }
  };
  useEffect(() => {
    loadAll().then((fetchedSpaces) => {
      setLoading(true);
      if (!fetchSpaces || fetchedSpaces === undefined) return;
      const match = pathname.match(/^\/space\/([^/]+)/);
      const spaceSlug = match ? match[1] : "my-space";
      const targetSpace = fetchedSpaces.find(
        (space) => space.slug === spaceSlug
      );
      if (!targetSpace) throw new Error("Default personnal space not found");
      selectSpace(targetSpace).then((notes) => setLoading(false));
    });
  }, []);

  const addSpace = async (payload: CreateSpacePayload) => {
    const { space, error } = await insertSpace(payload);
    if (space) {
      setSpaces((prev) => [...prev, space]);
    }
    return { space, error };
  };

  const selectSpace = async (targetSpace: Space) => {
    setActiveSpace(targetSpace);
    try {
      if (targetSpace.id === "loading") return;
      const data = await fetchNotes(targetSpace.id);
      setNotes(data);
      return data;
    } catch (error) {
      throw new Error("Error fetching notes");
    }
  };

  const saveNote = async (payload: CreateNotePayload) => {
    return await insertNote(payload);
  };

  const removeSpace = async (spaceId: string) => {};

  const editSpace = async (space: Partial<Space> & { id: string }) => {};

  const value = {
    loading,
    creating,
    addSpace,
    removeSpace,
    editSpace,
    activeSpace,
    selectSpace,
    spaces,
    saveNote,
    notes,
  };

  return (
    <SpaceContext.Provider value={value}>{children}</SpaceContext.Provider>
  );
}
