"use server";
import { createFromServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signin(formData: FormData) {
  const supabase = await createFromServer();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return error.message;
  }

  revalidatePath("/", "layout");
  redirect("/space/my-space");
}

export async function signout() {
  const supabase = await createFromServer();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createFromServer();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return error.message;
  }

  revalidatePath("/", "layout");
  redirect("/space/my-space");
}
