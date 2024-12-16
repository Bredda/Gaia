"use server";

import { ConversationMessage } from "@/types/conversation.types";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

export async function continueConversation({
  history,
}: {
  history: ConversationMessage[];
  files?: File[];
}) {
  "use server";
  const lastMessage = history[history.length - 1];
  if (lastMessage.attachments && lastMessage.attachments.length > 0) {
    const contexts = lastMessage.attachments.map(
      (attachment) => `${attachment.content}`
    );
    const merged = contexts.join("\n\n");
    const userMessage = history[history.length - 1].content;
    history[history.length - 1].content = `${userMessage}\n\n${merged}`;
  }

  const stream = createStreamableValue();
  (async () => {
    const { textStream } = streamText({
      model: openai("gpt-4o-mini"),
      system:
        "You are a helpful assistant. Respond to the best of your ability. If you don't know the answer, don't invent it.",
      messages: history,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return {
    messages: history.map((m, index) =>
      index === history.length - 1 ? lastMessage : m
    ),
    newMessage: stream.value,
  };
}
