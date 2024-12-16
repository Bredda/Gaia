"use client";
import { useSpace } from "@/hooks/use-space";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { useFeature } from "@/hooks/use-feature";

const AppBreadcrumb = () => {
  const { activeSpace } = useSpace();
  const { activeFeature } = useFeature();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#">{activeSpace.name}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{activeFeature.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
