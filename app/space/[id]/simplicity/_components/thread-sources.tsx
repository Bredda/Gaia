"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { GlobeIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { WebsiteTag } from "./website-tag";

interface ThreadSourcesProps {
  sources?: any[];
}

export function ThreadSources({ sources }: ThreadSourcesProps) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center space-x-2">
        <GlobeIcon />
        <div className="text-lg font-semibold">Sources</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {sources
          ? sources.map((s, index) => (
              <HoverCard key={index} openDelay={200} closeDelay={100}>
                <HoverCardTrigger key={index} asChild>
                  <a href={s.href} target="_blank">
                    <Card className="cursor-pointer h-full flex flex-col ">
                      <CardHeader className="pb-2 flex-1">
                        <CardTitle className="text-sm ">{s.title}</CardTitle>
                      </CardHeader>

                      <CardFooter>
                        <WebsiteTag size="sm" href={s.href} />
                      </CardFooter>
                    </Card>
                  </a>
                </HoverCardTrigger>
                <HoverCardContent className="grid gap-2">
                  <WebsiteTag href={s.href} />
                  <div className="text-sm">{s.title.slice(0, 40)}</div>
                  <div className="text-sm">
                    {" "}
                    {s.body.slice(0, 300)}
                    {"..."}
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))
          : Array.from(
              Array(4).map((_, index) => (
                <Skeleton key={index} className="h-[130px]" />
              ))
            )}
      </div>
    </div>
  );
}
