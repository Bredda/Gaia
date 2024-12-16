import { createFromServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Auth from "./_auth/auth";

export default async function Home() {
  const supabase = await createFromServer();

  const { data, error } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/space/my-space");
  }
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Auth />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/cover.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
