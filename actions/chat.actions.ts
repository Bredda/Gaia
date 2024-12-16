"use server";
import { nanoid } from "nanoid";
import { createFromServer } from "@/lib/supabase/server";
import { CreateSpacePayload, Space } from "@/types/space";
import { CreateConversationPayload } from "@/types/conversation.types";

const table = "conversations";

export async function insertConversation(values: CreateConversationPayload) {
  const supabase = await createFromServer();
  const { data: userData, error: errorData } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from(table)
    .insert({
      ...values,
      user_id: userData!.user!.id,
    })
    .select()
    .single();
  if (error) console.error(error);
  return { conversation: data, error };
}
