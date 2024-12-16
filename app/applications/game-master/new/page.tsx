"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  generateRandomSetup,
  generateWorld,
  generateWorldSummary,
} from "@/app/applications/game-master/ai/game-master";
import { useState } from "react";
import LoadingButton from "@/components/ui/extensions/loading-button";
import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { readStreamableValue } from "ai/rsc";
import { GameGeneratorRequest, gameGeneratorSchema, World } from "../types";

function NewGamePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [summary, setSummary] = useState<string>("");
  const [world, setWorld] = useState<World | null>(null);

  const form = useForm<GameGeneratorRequest>({
    resolver: zodResolver(gameGeneratorSchema),
    defaultValues: {
      setup:
        "a unique fantasy world with an interesting concept around cities build on the backs of massive beasts",
    },
  });
  async function randomizeSetup(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    form.setValue("setup", "Generating random setup...");
    setIsRandomizing(true);
    const { text } = await generateRandomSetup();
    console.log(text);
    form.setValue("setup", text);
    setIsRandomizing(false);
  }
  async function onSubmit(data: GameGeneratorRequest) {
    setIsGenerating(true);
    const { world } = await generateWorld(data);
    setWorld(world);
    const { output } = await generateWorldSummary(world);

    for await (const delta of readStreamableValue(output)) {
      setSummary((currentSummary) => `${currentSummary}${delta}`);
    }
    setIsGenerating(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex space-x-4 items-center w-full ">
          <FormField
            control={form.control}
            name="setup"
            render={({ field }) => (
              <FormItem className="w-2/3">
                <FormLabel>Game setup</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none "
                    disabled={isGenerating || isRandomizing}
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col space-y-2 items-center justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  type="button"
                  onClick={randomizeSetup}
                  size="icon"
                  disabled={isGenerating || isRandomizing}
                >
                  <Dices />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Random setup</p>
              </TooltipContent>
            </Tooltip>
            <LoadingButton
              type="submit"
              label="Generate the world"
              loading={isGenerating}
              disabled={isRandomizing}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}

export default NewGamePage;
