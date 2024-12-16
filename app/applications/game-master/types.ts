import { z } from "zod";

export const gameGeneratorSchema = z.object({
  setup: z.string().min(2).max(200),
});

export type GameGeneratorRequest = z.infer<typeof gameGeneratorSchema>;

const npcSchema = z.object({
  name: z.string().describe("Name of the NPC"),
  description: z.string().describe("Description of the NPC"),
  appearance: z.string().describe("Appearance of the NPC"),
  desires: z.string().describe("Desires of the NPC"),
  fears: z.string().describe("Fears of the NPC"),
});

const townSchema = z.object({
  name: z.string().describe("Name of the town"),
  description: z.string().describe("Description of the town"),
  npcs: z.array(npcSchema).describe("List of NPCs"),
});

const kingdomSchema = z.object({
  name: z.string().describe("Name of the kingdom"),
  description: z.string().describe("Description of the kingdom"),
  towns: z.array(townSchema).describe("List of towns"),
});

export const worldSchema = z.object({
  name: z.string().describe("Name of the world"),
  description: z.string().describe("Description of the world"),
  kingdoms: z.array(kingdomSchema).describe("List of kingdoms"),
});

export type World = z.infer<typeof worldSchema>;

export interface Game {
  world: World;
  world_summary: string;
  world_name: string;
  setup: string;
  created_at: string;
  updated_at: string;
  id: string;
  user_id: string;
  name: string;
}
