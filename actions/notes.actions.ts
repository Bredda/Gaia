"use server";
import { nanoid } from "nanoid";
import { createFromServer } from "@/lib/supabase/server";
import { CreateSpacePayload, Space } from "@/types/space";
import { CreateNotePayload, Note } from "@/types/notes";

const table = "notes";

export async function insertNote(values: CreateNotePayload) {
  const supabase = await createFromServer();
  const { data: userData, error: errorData } = await supabase.auth.getUser();

  const { data: note, error } = await supabase
    .from(table)
    .insert({
      ...values,
      user_id: userData!.user!.id,
    })
    .select()
    .single();
  if (error) console.error(error);
  return { note: note as Note, error };
}

export async function fetchNotes(spaceId: string) {
  const supabase = await createFromServer();
  const { data: userData, error: errorData } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("space_id", spaceId);
  if (error) {
    throw new Error(error.message);
  }
  console.log("data", data);
  return data as Note[];
}
