"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import { dashboardFeature, spaceFeatures } from "@/config/space-features";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSpace } from "@/hooks/use-space";
import { Skeleton } from "../ui/skeleton";
import { useFeature } from "@/hooks/use-feature";

const LoadingSkeleton = () =>
  Array.from({ length: 4 }).map((_, index) => (
    <Skeleton key={index} className="h-8 w-full" />
  ));

export function NavMain() {
  const { activeSpace, loading } = useSpace();
  const { activeFeatureIndex } = useFeature();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuButton
          tooltip={dashboardFeature.name}
          key={0}
          asChild
          isActive={activeFeatureIndex === 0}
        >
          <Link href={`/space/${activeSpace.slug}/${dashboardFeature.subpath}`}>
            {<dashboardFeature.icon />}
            <span>{dashboardFeature.name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenu>
      <SidebarGroupLabel>Tools</SidebarGroupLabel>
      <SidebarMenu>
        {loading && <LoadingSkeleton />}
        {!loading &&
          spaceFeatures.map(
            (item, index) =>
              index !== 0 && (
                <SidebarMenuButton
                  tooltip={item.name}
                  key={index}
                  asChild
                  isActive={activeFeatureIndex === index}
                >
                  <Link href={`/space/${activeSpace.slug}/${item.subpath}`}>
                    {item.icon && <item.icon />}
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              )
          )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
