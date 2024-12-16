"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useSpace } from "@/hooks/use-space";
import Markdown from "react-markdown";
import Moment from "react-moment";

const TypeMap = new Map<string, string>([
  ["quick_chat", "Quick Chat"],
  ["note", "Note"],
  ["conversation", "Conversation"],
]);

const TypeTag = ({ type }: { type: string }) => {
  return <Badge variant="secondary">{TypeMap.get(type)}</Badge>;
};

export default function NotesPage() {
  const { notes } = useSpace();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {notes.map((n) => (
        <Dialog key={n.id}>
          <DialogTrigger asChild>
            <Card
              key={n.id}
              className="h-[400px] flex flex-col cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <CardHeader>
                <CardTitle>{n.name}</CardTitle>
                <CardDescription className="flex justify-between items-center">
                  <TypeTag type={n.type} />
                  <Tooltip>
                    <TooltipTrigger>
                      <Moment fromNow>{n.updated_at}</Moment>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Moment format="MMMM Do, YYYY">{n.updated_at}</Moment>
                    </TooltipContent>
                  </Tooltip>
                </CardDescription>
                <CardContent className="flex-grow overflow-hidden relative">
                  <Markdown className="line-clamp-14">{n.content}</Markdown>
                </CardContent>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{n.name}</DialogTitle>
              <DialogDescription className="flex justify-between items-center">
                <TypeTag type={n.type} />
                <Moment format="MMMM Do, YYYY">{n.updated_at}</Moment>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
