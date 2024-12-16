import { AppFeature } from "@/types/feature.type";
import {
  AudioLines,
  Globe,
  LayoutDashboard,
  BotMessageSquare,
} from "lucide-react";

export const dashboardFeature: AppFeature = {
  name: "Dashboard",
  subpath: "",
  icon: LayoutDashboard,
};

export const spaceFeatures: AppFeature[] = [
  dashboardFeature,
  {
    name: "Chat",
    subpath: "chats",
    icon: BotMessageSquare,
  },
  {
    name: "Podcastify",
    subpath: "podcastify",
    icon: AudioLines,
  },
  {
    name: "Simplicity",
    subpath: "simplicity",
    icon: Globe,
  },
];
