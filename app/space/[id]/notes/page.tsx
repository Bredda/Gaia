"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MdEditor } from "@/components/ui/extensions/md-editor/md-editor";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useSpace } from "@/hooks/use-space";
import { cn } from "@/lib/utils";
import { Note } from "@/types/notes";
import { MDXEditorMethods } from "@mdxeditor/editor";
import {
  CopyX,
  Database,
  Loader,
  Pencil,
  Plus,
  Save,
  Trash,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import Moment from "react-moment";
import { toast } from "sonner";
const TypeMap = new Map<string, string>([
  ["quick_chat", "Quick Chat"],
  ["written", "Written Note"],
]);

const EditorDialog = ({
  note,
  open,
  onOpenChange,
}: {
  note: Note | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const ref = useRef<MDXEditorMethods>(null);
  const { saveNote, activeSpace } = useSpace();
  const [content, setContent] = useState(note?.content || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setContent(note?.content || "");
  }, [note]);

  const onSaveNote = async () => {
    setSaving(true);
    const content = ref.current?.getMarkdown() || "";
    if (!note) {
      const { error } = await saveNote({
        name: "New Note",
        content,
        type: "written",
        space_id: activeSpace.id,
      });
      if (error) {
        console.error(error);
        toast.error("Failed to create note");
      } else {
        toast.success("Note created successfully");
        onOpenChange(false);
      }
    } else {
      const { error } = await saveNote({
        ...note,
        content,
      });
      if (error) {
        console.error(error);
        toast.error("Failed to update note");
      } else {
        toast.success("Note updateed successfully");
        onOpenChange(false);
      }
    }
    setSaving(false);
  };

  useEffect(() => {
    if (open && ref.current) {
      ref.current.focus();
    }
  }, [open]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-11/12 max-w-screen h-5/6 flex flex-col">
          <DialogHeader>
            <DialogTitle>{note?.name || "New note"}</DialogTitle>
            {note && (
              <DialogDescription className="flex justify-between items-center">
                <Moment format="MMMM Do, YYYY">{note.updated_at}</Moment>
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="flex-1 ">
            <MdEditor
              className="prose w-full max-w-full"
              contentEditableClassName="min-h-[400px] max-h-[400px] overflow-y-auto"
              ref={ref}
              markdown={content}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              <X /> Cancel
            </Button>
            <Button onClick={onSaveNote}>
              {saving ? <Loader className="animate-spin" /> : <Save />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const TypeTag = ({ type }: { type: string }) => {
  return <Badge variant="secondary">{TypeMap.get(type)}</Badge>;
};
export default function NotesPage() {
  const { notes, saveNote, activeSpace } = useSpace();
  const [openNewNote, setOpenNewNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);

  const onToggleNote = (note: Note) => {
    if (selectedNotes.includes(note)) {
      setSelectedNotes(selectedNotes.filter((n) => n !== note));
    } else {
      setSelectedNotes([...selectedNotes, note]);
    }
  };

  return (
    <div className="flex flex-col w-full p-4 gap-4">
      <div className="flex gap-2 items-center">
        <Button onClick={() => setOpenNewNote(true)} disabled={editing}>
          <Plus />
          Create Note
        </Button>
        <Toggle onClick={() => setEditing(!editing)}>
          {editing ? <X /> : <CopyX />}
          {editing ? "Cancel select multiple" : "Select multiple notes"}
        </Toggle>
        {editing && (
          <>
            <Button>
              <Database />
              Add as source
            </Button>
            <Button variant="destructive">
              <Trash />
              Delete
            </Button>
          </>
        )}
        <EditorDialog
          note={null}
          open={openNewNote}
          onOpenChange={() => setOpenNewNote(false)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((n) => (
          <Card
            key={n.id}
            className={cn(
              "h-[300px] flex flex-col  transition-transform cursor-pointer hover:scale-[1.01]"
            )}
            onClick={() => (!editing ? setSelectedNote(n) : onToggleNote(n))}
          >
            <CardHeader>
              <CardTitle className="flex justify-between ">
                <span>{n.name}</span>
                {editing && (
                  <Checkbox
                    checked={selectedNotes.includes(n)}
                    onCheckedChange={() => onToggleNote(n)}
                  />
                )}
              </CardTitle>
              <div className="flex justify-between items-center">
                <TypeTag type={n.type} />
                <Tooltip>
                  <TooltipTrigger>
                    <Moment fromNow>{n.updated_at}</Moment>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Moment format="MMMM Do, YYYY">{n.updated_at}</Moment>
                  </TooltipContent>
                </Tooltip>
              </div>{" "}
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden relative">
              <Markdown className="line-clamp-10">{n.content}</Markdown>
            </CardContent>
          </Card>
        ))}
        <EditorDialog
          note={selectedNote}
          open={!!selectedNote}
          onOpenChange={() => {
            setSelectedNote(null);
          }}
        />
      </div>
    </div>
  );
}
