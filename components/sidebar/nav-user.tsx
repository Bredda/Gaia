"use client";

import {
  ChevronsUpDown,
  CircleUserRound,
  Command,
  LogOut,
  MonitorCog,
  Moon,
  SettingsIcon,
  Sun,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/use-auth";
import { signout } from "@/actions/auth.actions";
import UserAvatar from "../ui/extensions/user-avatar";
import Shortcuts from "@/app/_support/shortcuts";
import { useState } from "react";
import Profile from "@/app/_support/profile";
import Settings from "@/app/_support/settings";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  const [openShortcuts, setOpenShortcuts] = useState(false);

  const [openSettings, setOpenSettings] = useState(false);
  const [openProfile, setOpenprofile] = useState(false);
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <UserAvatar />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/avatars/shadcn.jpg" alt={user?.email} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <ToggleGroup
                  type="single"
                  value={theme}
                  onValueChange={(value) => setTheme(value)}
                >
                  <ToggleGroupItem
                    value="light"
                    aria-label="Toggle light theme"
                  >
                    <Sun className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="system"
                    aria-label="Toggle system theme"
                  >
                    <MonitorCog className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="dark" aria-label="Toggle dark theme">
                    <Moon className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setOpenprofile(true)}>
                  <CircleUserRound />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenShortcuts(true)}>
                  <Command />
                  Shorcuts
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenSettings(true)}>
                  <SettingsIcon />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <Shortcuts open={openShortcuts} setOpen={setOpenShortcuts} />
      <Profile open={openProfile} setOpen={setOpenprofile} />
      <Settings open={openSettings} setOpen={setOpenSettings} />
    </>
  );
}
