"use server";
import { nanoid } from "nanoid";
import { createFromServer } from "@/lib/supabase/server";
import { CreateSpacePayload, Space } from "@/types/space";
const table = "spaces";
export async function insertSpace(values: CreateSpacePayload) {
  const supabase = await createFromServer();
  const { data: userData, error: errorData } = await supabase.auth.getUser();
  const slug = values.name.toLowerCase().replace(/\s/g, "-") + `_${nanoid(6)}`;

  const { data, error } = await supabase
    .from(table)
    .insert({
      ...values,
      slug,
      user_id: userData!.user!.id,
    })
    .select()
    .single();
  if (error) console.error(error);
  return { space: data as Space, error };
}

export async function fetchSpaces() {
  const supabase = await createFromServer();
  const { data: userData, error: errorData } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("user_id", userData!.user!.id);
  if (error) {
    throw new Error(error.message);
  }
  console.log("data", data);
  return data as Space[];
}
