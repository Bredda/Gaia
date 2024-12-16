"use server";
import { createFromServer } from "@/lib/supabase/server";
import { Interview, InterviewInput } from "./types";
const table = "interviews";

export async function fetchInterviews() {
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
export async function deleteInterview(interviewId: string) {
  const supabase = await createFromServer();
  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq("id", interviewId);
  if (error) {
    throw new Error(error.message);
  }
  return interviewId;
}
export async function insertInterview(values: InterviewInput) {
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
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function updateInterview(
  values: Partial<Interview> & { id: string }
) {
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
