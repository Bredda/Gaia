import { Separator } from "@radix-ui/react-separator";
import InterviewList from "./interview-list";
import { InterviewsProvider } from "./interview.provider";

export default async function InterviewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <InterviewsProvider>
      <div className="flex space-x-8 px-4 pt-4 ">
        <InterviewList className="w-[200px]" />
        <div className="flex-1">{children}</div>
      </div>
    </InterviewsProvider>
  );
}
