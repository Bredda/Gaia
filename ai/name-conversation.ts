"use server";
import { ConversationMessage } from "@/types/conversation.types";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function generateConversationName(
  conversation: ConversationMessage[]
) {
  "use server";
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `Generate a short name for a conversation based on the following messages. Answer only with the name. ${conversation
      .map((message) => message.role + "-" + message.content)
      .join(" ")}`,
  });

  return { name: text };
}
