export interface MessageAttachment {
  filename: string;
  content: string;
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  attachments?: MessageAttachment[];
}
