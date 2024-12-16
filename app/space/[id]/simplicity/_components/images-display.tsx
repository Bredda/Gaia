"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { WebsiteTag } from "./website-tag";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface ImageDisplayProps {
  threadTitle: string;
  images: {
    title: string;
    image: string;
    thumbnail: string;
    url: string;
    height: number;
    width: number;
    source: string;
  }[];
}

export function ImageDisplay({ images, threadTitle }: ImageDisplayProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      {images.map((image, index) => (
        <DrawerTrigger
          key={index}
          asChild
          onClick={() => setSelectedIndex(index)}
        >
          <img
            src={image.thumbnail}
            className="cursor-zoom-in hover:scale-[1.05] transition-all duration-300"
          />
        </DrawerTrigger>
      ))}
      <DrawerContent className="w-screen h-screen flex flex-col">
        <DrawerHeader>
          <DrawerTitle className="flex justify-between">
            <span className="text-2xl">{threadTitle}</span>

            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={() => setOpen(!open)}
            >
              <XIcon className="!size-8" />
            </Button>
          </DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 flex space-x-2 p-4">
          <div className="w-3/4">
            <img
              className="max-h-[70vh] object-cover rounded-md transition-all ease-in-out mx-auto"
              src={images[selectedIndex].image}
            />
            <div className="text-center pt-4 text-muted-foreground">
              <a
                className="underline flex space-x-2 items-center justify-center"
                href={images[selectedIndex].url}
                target="_blank"
              >
                <span> {images[selectedIndex].title}</span>
                <ExternalLinkIcon className="size-4" />
              </a>
            </div>
            <div className="text-center">
              <WebsiteTag
                className="mx-auto pt-4 "
                href={images[selectedIndex].url}
              />
            </div>
          </div>
          <div className="w-1/4 columns-1 gap-5 sm:columns-2 [&>img:not(:first-child)]:mt-8">
            {images.map((image, index) => (
              <img
                src={image.thumbnail}
                key={index}
                className={cn(
                  "cursor-pointer transition-all duration-300 rounded-sm",
                  index === selectedIndex
                    ? "ring-offset-6 ring-4 ring-primary"
                    : ""
                )}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
