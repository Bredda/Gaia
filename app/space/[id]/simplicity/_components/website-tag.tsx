import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tagVariant = cva("inline-flex items-center space-x-2", {
  variants: {
    size: {
      default: "text-base",
      sm: "text-xs",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface WebsiteTagProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariant> {
  href: string;
}

export function WebsiteTag({ href, size, className }: WebsiteTagProps) {
  return (
    <div className={cn(tagVariant({ size, className }))}>
      <img
        className={cn(
          "size-6",
          size === "sm" && "size-4",
          size === "lg" && "size-8"
        )}
        src={`https://icons.duckduckgo.com/ip3/${new URL(href).hostname}.ico`}
      />
      <span>{new URL(href).hostname.toString().replace("www.", "")}</span>
    </div>
  );
}
