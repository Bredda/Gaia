import { AppFeature } from "@/types/feature.type";
import {
  AudioLines,
  Globe,
  LayoutDashboard,
  BotMessageSquare,
  NotebookPen,
} from "lucide-react";

export const dashboardFeature: AppFeature = {
  name: "Dashboard",
  subpath: "",
  icon: LayoutDashboard,
};

export const spaceFeatures: AppFeature[] = [
  dashboardFeature,
  {
    name: "Notes",
    subpath: "notes",
    icon: NotebookPen,
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
