"use server";

import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { createStreamableValue } from "ai/rsc";
import { Interview } from "../types";

export async function generateTopics(interview: Interview) {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = streamText({
      model: openai("gpt-4o-mini"),
      system: `You are an expert in technical interview in an IT conulting french company. 
      Your job is to produce a list of topics that you would ask a candidate to talk about during an interview.
      Below is provided the candidate's name and the job description. You may also be provided with the candidate's resume and the meeting notes
      of the HR people.
      `,
      prompt: `
      Candidate: ${interview.candidat_name}.
      Position: ${interview.position}.
      Resume: ${interview.cv_content || "none where provided"}.
      HR meeting notes: ${interview.hr_notes || "none where provided"}.
      
      `,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
