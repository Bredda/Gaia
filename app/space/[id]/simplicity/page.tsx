"use client";

import { ComplexQuery } from "@/components/chat/complex-query";
import { ThreadSources } from "./_components/thread-sources";
import { ThreadAnswer } from "./_components/thread-answer";
import { ImageDisplay } from "./_components/images-display";
import ThreadTitle from "./_components/thread-title";
import RevealText from "@/motion/reveal-text";
import { useSimplicity } from "@/hooks/use-simplicity";

export default function SimplicityPage() {
  const { sendRequest, thread, isGenerating } = useSimplicity();

  return (
    <div className="container mx-auto min-h-full">
      {!thread && !isGenerating && (
        <div className="pt-32">
          <div className="text-center pb-8 text-3xl">
            <RevealText text="What do you want to search ?" />
          </div>
          <ComplexQuery
            className="max-w-[800px] mx-auto"
            isGenerating={false}
            placeholder="Search anything ..."
            submitLabel="Search"
            onSubmit={(query) => sendRequest(query)}
          />
        </div>
      )}

      {thread && thread.title && (
        <div className="flex space-x-8 ">
          <div data-chunk="answer" className="flex-1 grid gap-4">
            <ThreadTitle title={thread.title} />

            <ThreadSources sources={thread.response?.sources} />

            <ThreadAnswer answer={thread.response?.response} />
          </div>
          <div data-chunk="medias" className="w-1/4 grid  gap-4">
            {thread.response?.videos && (
              <img src={thread.response?.videos[0].images.large} />
            )}

            <div className="grid grid-cols-2 gap-2">
              {thread.response?.images && (
                <ImageDisplay
                  images={thread.response.images}
                  threadTitle={thread.title}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
