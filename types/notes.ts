import { ConversationMessage } from "./conversation.types";

export interface CreateNotePayload {
  space_id: string;
  name: string;
  content: string;
  type: string;
}

export interface Note {
  id: string;
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  space_id: string;
  type: string;
}
