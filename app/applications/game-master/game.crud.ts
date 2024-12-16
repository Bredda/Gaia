"use server";
import { createFromServer } from "@/lib/supabase/server";
import { Game } from "./types";
const table = "gm_games";

export async function fetchGames() {
  const supabase = await createFromServer();
  const { data: userData, error: errorData } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("user_id", userData!.user!.id)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function removeGame(gameId: string) {
  const supabase = await createFromServer();
  const { data, error } = await supabase.from(table).delete().eq("id", gameId);
  if (error) {
    throw new Error(error.message);
  }
  return gameId;
}
export async function insertGame(values: Partial<Game>) {
  const supabase = await createFromServer();
  const { data: userData, error: errorData } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from(table)
    .insert({
      ...values,
      world: values.world,
      world_name: values.world?.name,

      user_id: userData!.user!.id,
    })
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function updateGame(values: Partial<Game> & { id: string }) {
  const supabase = await await createFromServer();

  const { data, error } = await supabase
    .from(table)
    .update({
      ...values,
    })
    .eq("id", values.id)
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
