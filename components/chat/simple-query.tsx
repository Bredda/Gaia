"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Loader, Paperclip, SendHorizontal } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { continueConversation } from "@/ai/continue-conversation";
import { readStreamableValue } from "ai/rsc";
import Chip from "../ui/extensions/chip";
import { loadFile } from "@/actions/file-loader";
import {
  ConversationMessage,
  MessageAttachment,
} from "@/types/conversation.types";

const SimpleQuerySchema = z.object({
  input: z.string().min(1),
});
export type SimpleQuerySchema = z.infer<typeof SimpleQuerySchema>;
export interface SimpleQueryHandle {
  resetForm: () => void;
  resetAttachments: () => void;
  setFocus: (name: "input") => void;
  setValue: (name: "input", value: string) => void;
}
interface SimpleQueryProps {
  conversation: ConversationMessage[];
  onConversationChange: (conversation: ConversationMessage[]) => void;

  onGeneratingChange?: (generating: boolean) => void;
}

const SimpleQuery = forwardRef<SimpleQueryHandle, SimpleQueryProps>(
  ({ conversation, onConversationChange, onGeneratingChange }, ref) => {
    const [generating, setGenerating] = useState(false);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const form = useForm<SimpleQuerySchema>({
      resolver: zodResolver(SimpleQuerySchema),
      defaultValues: {
        input: "",
      },
    });
    useImperativeHandle(ref, () => ({
      resetForm: () => {
        form.reset();
      },
      resetAttachments: () => {
        setFiles([]);
        if (inputFileRef.current) inputFileRef.current.value = "";
      },
      setFocus: (name: "input") => form.setFocus(name),
      setValue: (name: "input", value: string) => form.setValue(name, value),
    }));
    const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;

      if (files) {
        setFiles((prev) => [...prev, ...files]);
      }
    };
    const onRemoveFile = (index: number) => {
      setFiles((prev) => prev.filter((_, i) => i !== index));
    };
    const onSubmit = async ({ input }: SimpleQuerySchema) => {
      if (onGeneratingChange) onGeneratingChange(true);
      const attachments: MessageAttachment[] = [];
      if (files) {
        for (const file of files) {
          const content = await loadFile(file);
          attachments.push({ filename: file.name, content });
        }
      }
      setGenerating(true);
      const { messages, newMessage } = await continueConversation({
        history: [
          ...conversation,
          {
            role: "user",
            content: input,
            attachments,
          },
        ],
      });

      form.reset();
      setFiles([]);
      if (inputFileRef.current) inputFileRef.current.value = "";
      let textContent = "";

      for await (const delta of readStreamableValue(newMessage)) {
        textContent = `${textContent}${delta}`;

        onConversationChange([
          ...messages,
          { role: "assistant", content: textContent },
        ]);
      }
      if (onGeneratingChange) onGeneratingChange(false);
      setGenerating(false);
    };
    return (
      <div className="flex flex-col space-y-1 w-full">
        <div className="flex space-x-2 items-center py-1">
          {files.map((f, index) => (
            <Chip
              key={index}
              label={f.name}
              onRemove={() => onRemoveFile(index)}
            />
          ))}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex sm:justify-center sm:items-center space-x-2"
          >
            <Button
              size="icon"
              variant="secondary"
              type="button"
              onClick={() => inputFileRef.current?.click()}
            >
              <Paperclip />
            </Button>
            <input
              type="file"
              className="hidden"
              ref={inputFileRef}
              onChange={onUpload}
            />
            <FormField
              control={form.control}
              name="input"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Type a message"
                      className="w-full"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button size="icon" type="submit" disabled={generating}>
              {generating ? (
                <Loader className="animate-spin" />
              ) : (
                <SendHorizontal />
              )}
            </Button>
          </form>
        </Form>
      </div>
    );
  }
);

export default SimpleQuery;
