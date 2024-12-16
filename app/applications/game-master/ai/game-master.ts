"use server";

import { generateObject, generateText, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { createStreamableValue } from "ai/rsc";
import { GameGeneratorRequest, World, worldSchema } from "../types";

export async function generateRandomSetup() {
  const { text } = await generateText({
    model: openai("gpt-4"),
    temperature: 0.9,
    prompt: `Generate a random setup for a fantasy world in 3 sentences maximum. 
    For example: a unique fantasy world with an interesting concept around cities build on the backs of massive beasts`,
  });

  return { text };
}

export async function generateWorld(input: GameGeneratorRequest) {
  "use server";
  const nbKingdoms = 3;
  const minTowns = 1;
  const maxTowns = 3;
  const minNpc = 2;
  const maxNpc = 5;
  const { object: world } = await generateObject({
    model: openai("gpt-4o-mini"),
    temperature: 0.9,
    system: `Your task is to help create interesting fantasy worlds that players would love to play in.
                Instructions:
                    - Only generate in plain text without formatting.
                    - Use simple clear language without being flowery.
                    - You must stay below 3-5 sentences for each description.
            Include ${nbKingdoms} kingdoms, ${minTowns} to ${maxTowns} towns for each kingdom, and ${minNpc} to ${maxNpc} NPCs for each town.
                    `,
    prompt: `Generate a creative unique world following this setup: ${input.setup}`,
    schema: worldSchema,
  });

  return { world } as { world: World };
}

export async function generateWorldSummary(world: World) {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = streamText({
      model: openai("gpt-4o-mini"),
      system: `You are a AI game master. Your job is to produce an appealing description for this world between 600 and 800 characters long.  
        You will be given a full description of a made-up fantasy world, including kingdoms, towns and npc in a Json structure.
        You can add some creativity but you HAVE to keep absolutely consistent with the given setup.`,
      prompt: JSON.stringify(world),
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
