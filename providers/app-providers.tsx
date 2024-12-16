import * as React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpaceProvider } from "./space.provider";
import { SimplicityProvider } from "./simplicity-provider";

export async function AppProviders({ children }: any) {
  return (
    <SpaceProvider>
      <SimplicityProvider>
        <SidebarProvider>
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </SidebarProvider>
      </SimplicityProvider>
    </SpaceProvider>
  );
}
