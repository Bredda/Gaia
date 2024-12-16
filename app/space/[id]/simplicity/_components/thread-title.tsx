import { Skeleton } from "@/components/ui/skeleton";

const ThreadTitle = ({ title }: { title: string }) => {
  return (
    <>
      {title ? (
        <div className="text-2xl font-semibold">{title}</div>
      ) : (
        <Skeleton className="h-4 w-[250px]" />
      )}
    </>
  );
};

export default ThreadTitle;
