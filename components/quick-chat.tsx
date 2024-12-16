"use client";

import React, { useRef, useState } from "react";
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
import { cn, conversationToString } from "@/lib/utils";
import UserAvatar from "./ui/extensions/user-avatar";
import { useSpace } from "@/hooks/use-space";
import SimpleQuery from "./chat/simple-query";
import { generateConversationName } from "@/ai/name-conversation";
import { ConversationMessage } from "@/types/conversation.types";
import {
  BotMessageSquare,
  Copy,
  Eraser,
  Loader,
  Pencil,
  Save,
  SaveAll,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export const maxDuration = 30;

const QuickChat = () => {
  const simpleQueryRef = useRef<any>();
  const { activeSpace, spaces, saveNote } = useSpace();
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);

  useShortcut({
    shortcut: "c",
    onShortcut: () => setOpen(!open),
  });
  const onSaveAll = async () => {
    setSaving(true);
    const { name } = await generateConversationName(conversation);
    const { note, error } = await saveNote({
      content: conversationToString(conversation),
      name,
      space_id: activeSpace.id,
      type: "quick_chat",
    });
    if (error) {
      console.error(error);
      toast.error("Error saving note");
    } else {
      toast.success("Note saved successfully");
    }
    setSaving(false);
  };
  const onSaveResponse = async (message: ConversationMessage) => {
    setSaving(true);
    const { name } = await generateConversationName([message]);
    const { note, error } = await saveNote({
      content: message.content,
      name,
      space_id: activeSpace.id,
      type: "quick_chat",
    });
    if (error) {
      console.error(error);
      toast.error("Error saving note");
    } else {
      toast.success("Note saved successfully");
    }
    setSaving(false);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (e) {
      console.error(e);
      toast.error("Error copying to clipboard");
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
            Start a quick instant chat. The conversation is temporary, but you
            can save the entire chat, a specific response, or just a small part
            of a response as notes in your current space.
            <br />
            Use context menu to save or copy responses.
          </SheetDescription>
        </SheetHeader>

        <div className="flex space-x-2 justify-end items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                disabled={generating || saving}
                onClick={onClear}
              >
                <Eraser />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear conversation</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                disabled={generating || conversation.length === 0 || saving}
                onClick={onSaveAll}
              >
                {saving ? <Loader className="animate-spin" /> : <SaveAll />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save the whole conversation</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="p-4 flex-1 flex flex-col space-y-2 overflow-y-auto rounded-t-lg">
          {conversation.map((message, index) => (
            <React.Fragment key={index}>
              <div
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
                  <div>{message.content}</div>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="flex space-y-1 space-x-2 items-center">
                      <span className="text-sm text-muted-foreground">
                        Attachments:
                      </span>
                      {message.attachments.map((attachment, index) => (
                        <HoverCard key={index}>
                          <HoverCardTrigger>
                            <Badge variant="outline">
                              {attachment.filename}
                            </Badge>
                          </HoverCardTrigger>
                          <HoverCardContent>
                            {attachment.content}
                          </HoverCardContent>
                        </HoverCard>
                      ))}{" "}
                    </div>
                  )}
                </div>
                <div className="flex space-x-1 invisible group-hover:visible">
                  {message.role === "assistant" && (
                    <>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            type="button"
                            onClick={() => onSaveResponse(message)}
                          >
                            <Save />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Save response as note</p>
                        </TooltipContent>
                      </Tooltip>{" "}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            type="button"
                            onClick={copyToClipboard.bind(
                              null,
                              message.content
                            )}
                          >
                            <Copy />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy to clipboard</p>
                        </TooltipContent>
                      </Tooltip>
                    </>
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
            </React.Fragment>
          ))}
        </div>
        <SheetFooter className="w-full flex sm:justify-center sm:items-center space-x-2">
          <SimpleQuery
            ref={simpleQueryRef}
            disabled={saving}
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
