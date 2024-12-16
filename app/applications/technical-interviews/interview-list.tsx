"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { userInterviews } from "./interview.provider";
import { cn } from "@/lib/utils";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface InterviewListProps {
  className?: string;
}

function InterviewList({ className }: InterviewListProps) {
  const { interviews, setCurrentInterview, currentInterview, loading } =
    userInterviews();
  return (
    <div className={cn(className, "flex flex-col gap-6")}>
      <Button onClick={() => setCurrentInterview(null)}>
        <Plus /> New interview
      </Button>
      <div className="flex flex-col gap-2">
        <Input placeholder="Search" />
        <ScrollArea className="h-[700px]">
          {loading && <div>Loading...</div>}
          {!loading &&
            interviews.map((interview, index) => (
              <React.Fragment key={interview.id}>
                <div
                  onClick={() => setCurrentInterview(interview)}
                  key={interview.id}
                  className={cn(
                    "group hover:bg-accent/60 hover:text-accent-foreground cursor-pointer py-2 px-2 rounded-sm flex flex-col gap-1",
                    currentInterview?.id === interview.id
                      ? "bg-accent/60 text-accent-foreground"
                      : ""
                  )}
                >
                  <span className=""> {interview.candidat_name}</span>
                  <span
                    className={cn(
                      "text-sm italic text-accent-foreground group-hover:text-accent-foreground ",
                      currentInterview?.id === interview.id
                        ? ""
                        : "text-muted-foreground"
                    )}
                  >
                    {interview.position}
                  </span>
                </div>
                {index < interviews.length - 1 && (
                  <Separator className="my-2" />
                )}
              </React.Fragment>
            ))}
        </ScrollArea>
      </div>
    </div>
  );
}

export default InterviewList;
