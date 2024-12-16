"use client";

import { createContext, use, useEffect, useState } from "react";

import { CreateSpacePayload, Space } from "@/types/space";
import { fetchSpaces, insertSpace } from "@/actions/space.actions";
import {
  ConversationMessage,
  CreateConversationPayload,
} from "@/types/conversation.types";
import { usePathname } from "next/navigation";
import { insertConversation } from "@/actions/chat.actions";
import { PostgrestError } from "@supabase/supabase-js";

interface SpaceState {
  loading: boolean;
  spaces: Space[];
  addSpace: (payload: CreateSpacePayload) => void;
  removeSpace: (spaceId: string) => void;
  editSpace: (space: Partial<Space> & { id: string }) => void;
  activeSpace: Space;
  selectSpace: (space: Space) => void;
  saveConversation: (payload: CreateConversationPayload) => Promise<{
    conversation: any;
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
      setActiveSpace(targetSpace);
      setLoading(false);
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
  };

  const saveConversation = async (payload: CreateConversationPayload) => {
    return await insertConversation(payload);
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
    saveConversation,
  };

  return (
    <SpaceContext.Provider value={value}>{children}</SpaceContext.Provider>
  );
}
