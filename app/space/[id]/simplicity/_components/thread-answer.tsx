"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquareQuoteIcon } from "lucide-react";
import Markdown from "react-markdown";

interface ThreadAnswerProps {
  answer?: string;
}

export function ThreadAnswer({ answer }: ThreadAnswerProps) {
  return (
    <div className="grid gap-2">
      <div className="flex space-x-2 items-center">
        <MessageSquareQuoteIcon />
        <span className="text-lg font-semibold">Answer</span>
      </div>

      {answer ? (
        <Markdown>{answer}</Markdown>
      ) : (
        <>
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </>
      )}
    </div>
  );
}
