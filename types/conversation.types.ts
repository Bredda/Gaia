export interface MessageAttachment {
  filename: string;
  content: string;
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  attachments?: MessageAttachment[];
}

export interface CreateConversationPayload {
  space_id: string;
  name: string;
  conversation: ConversationMessage[];
}
