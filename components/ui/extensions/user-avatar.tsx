"use client";

import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { cn } from "@/lib/utils";

interface UserAvataProps {
  className?: string;
}

const UserAvatar = ({ className }: UserAvataProps) => {
  const { user } = useAuth();
  return (
    <Avatar className={cn("h-8 w-8 rounded-lg", className)}>
      <AvatarImage src="/avatars/shadcn.jpg" alt={user?.email} />
      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
