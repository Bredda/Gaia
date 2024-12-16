import { z } from "zod";

export interface Space {
  id: string;
  name: string;
  description?: string;
  slug: string;
}

export const createSpaceSchema = z.object({
  name: z.string().min(2, {
    message: "Space name is required",
  }),
  description: z
    .string()
    .max(15, "Description is 15 characters max.")
    .optional(),
});

export type CreateSpacePayload = z.infer<typeof createSpaceSchema>;
