"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useShortcut } from "@/hooks/use-shortcut";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";
import UserAvatar from "./ui/extensions/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSpace } from "@/hooks/use-space";
import SimpleQuery from "./chat/simple-query";
import { generateConversationName } from "@/ai/name-conversation";
import { ConversationMessage } from "@/types/conversation.types";
import { BotMessageSquare, Copy, Eraser, Pencil, Save } from "lucide-react";
import { toast } from "sonner";

export const maxDuration = 30;

const QuickChat = () => {
  const simpleQueryRef = useRef<any>();
  const { activeSpace, spaces, saveConversation } = useSpace();
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);

  useShortcut({
    shortcut: "c",
    onShortcut: () => setOpen(!open),
  });
  const onSave = async () => {
    console.debug("Saving conversation", conversation);
    const { name } = await generateConversationName(conversation);
    const { conversation: savedConversation, error } = await saveConversation({
      conversation,
      name,
      space_id: activeSpace.id,
    });
    if (error) {
      console.error(error);
      toast.error("Error saving conversation");
    } else {
      toast.success("Conversation saved successfully");
    }
  };
  const onClear = () => {
    simpleQueryRef.current?.setValue("input", "");
    simpleQueryRef.current?.resetAttachments();
    setConversation([]);
    simpleQueryRef.current?.setFocus("input");
  };

  return (
    <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
      <SheetTrigger asChild>
        <Button>
          Quick chat <span className="text-sm text-muted">⌘c</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[800px] sm:w-[840px] sm:-max-w-screen flex flex-col"
      >
        <SheetHeader>
          <SheetTitle>Quick chat</SheetTitle>
          <SheetDescription>
            Start a quick instant chat. It is ephemeral but can be saved to your
            spaces if needed.
          </SheetDescription>
        </SheetHeader>

        <div className="flex space-x-2 justify-end items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                disabled={generating}
                onClick={onClear}
              >
                <Eraser />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear conversation</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    disabled={generating || conversation.length === 0}
                    onClick={onSave}
                  >
                    <Save />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save conversation</p>
                </TooltipContent>
              </Tooltip>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left">
              <DropdownMenuLabel>Choose space</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="group">
                {activeSpace.name}
                <span className="text-sm text-muted-foreground group-hover:text-muted">
                  (Current)
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {spaces.map(
                (space) =>
                  space.id !== activeSpace.id && (
                    <DropdownMenuItem key={space.id}>
                      {space.name}
                    </DropdownMenuItem>
                  )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="p-4 flex-1 flex flex-col space-y-2 overflow-y-auto rounded-t-lg">
          {conversation.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center space-x-2 justify-start group",
                message.role === "user" ? " flex-row" : "flex-row-reverse"
              )}
            >
              {message.role === "user" ? (
                <UserAvatar className="self-end" />
              ) : (
                <BotMessageSquare className="self-end ml-2" />
              )}

              <div
                className={cn(
                  "bg-secondary text-secondary-foreground p-2 w-3/5",
                  message.role === "user"
                    ? "rounded-t-lg rounded-br-lg "
                    : "rounded-t-lg rounded-bl-lg "
                )}
              >
                {message.content}
              </div>

              <div className="flex space-x-1 invisible group-hover:visible">
                {message.role === "assistant" && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline" type="button">
                        <Copy />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {message.role === "user" &&
                  index === conversation.length - 2 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="outline" type="button">
                          <Pencil />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit message</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
              </div>
            </div>
          ))}
        </div>
        <SheetFooter className="w-full flex sm:justify-center sm:items-center space-x-2">
          <SimpleQuery
            ref={simpleQueryRef}
            conversation={conversation}
            onConversationChange={setConversation}
            onGeneratingChange={setGenerating}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default QuickChat;
