"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import { CornerDownLeft, MaximizeIcon, Mic } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

interface ComplexQueryProps {
  className?: string;
  isGenerating: boolean;
  placeholder?: string;
  submitLabel?: string;
  onSubmit: (query: string) => void;
}

export const ComplexQuery = forwardRef<HTMLDivElement, ComplexQueryProps>(
  ({ className, isGenerating, placeholder, onSubmit, submitLabel }, ref) => {
    const [maximized, setMaximzed] = useState(false);
    const [input, setInput] = useState("");
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      if (isGenerating || !input) return;

      e.preventDefault();
      onSubmit(input);
      setInput("");
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        handleOnSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
      }
    };
    const onMaximize = (e: any) => {
      e.preventDefault();
      setMaximzed(!maximized);
    };
    return (
      <div
        ref={ref}
        className={cn(
          "bg-background  rounded-lg border focus-within:ring-1 focus-within:ring-ring p-1",
          className
        )}
      >
        <form onSubmit={handleOnSubmit}>
          <Textarea
            autoComplete="off"
            placeholder={placeholder || "Type your message here..."}
            value={input}
            onKeyDown={onKeyDown}
            onChange={(e) => setInput(e.target.value)}
            name="message"
            className={cn(
              "max-h-12 px-4 py-3 bg-background  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md flex items-center h-16 resize-none",
              "h-12 resize-none  border-0 p-3 shadow-none focus-visible:ring-0 transition-all duration-300",
              maximized && "min-h-64 h-64"
            )}
          />

          <div className="flex items-center px-3 pt-0 bg-background ">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onMaximize}>
                  <MaximizeIcon className="size-4" />
                  <span className="sr-only">Maximize input</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Maximize input</TooltipContent>
            </Tooltip>

            <Button variant="ghost" size="icon">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>
            <div className="grid ml-auto gap-1.5">
              <Button disabled={!input} type="submit" size="sm">
                {submitLabel || "Send Message"}
                <CornerDownLeft className="size-3.5" />
              </Button>
              <div className="text-muted-foreground text-xs text-right w-full px-3">
                Shift + Enter to new line{" "}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);
