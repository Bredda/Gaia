"use client";

import { spaceFeatures } from "@/app/config/space-features";
import { AppFeature } from "@/types/feature.type";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useFeature() {
  const pathname = usePathname();
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number>(0);
  const [activeFeature, setActiveFeature] = useState<AppFeature>(
    spaceFeatures[activeFeatureIndex]
  );

  useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    const isValidPath = pathParts.length >= 2 && pathParts[0] === "space";
    if (!isValidPath) return;
    const subpath = pathParts[2] || "";
    const index = spaceFeatures.findIndex((item) => item.subpath === subpath);
    if (index === -1) return;
    setActiveFeatureIndex(index);
    setActiveFeature(spaceFeatures[index]);
  }, [pathname]);

  return {
    activeFeatureIndex,
    activeFeature,
  };
}
