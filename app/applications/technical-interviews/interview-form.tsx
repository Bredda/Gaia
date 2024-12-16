"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  ArrowLeftRight,
  CalendarIcon,
  Eye,
  Lightbulb,
  Link,
  Loader,
  NotebookText,
  Pencil,
  Plus,
  Save,
  Trash,
  Upload,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { add, format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { InterviewInput, interviewInputSchema } from "./types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userInterviews } from "./interview.provider";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Markdown from "react-markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { readStreamableValue } from "ai/rsc";
import { generateTopics } from "./ai/generate-topics";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function InterviewForm() {
  const { currentInterview, addInterview, editInterview } = userInterviews();
  const [hrDialogOpen, setHrDialogOpen] = useState(false);
  const [parsingCv, setParsingCv] = useState(false);
  const [hasCv, setHasCv] = useState(false);
  const [hasHrNotes, setHasHrNotes] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const cvInput = useRef<any>(null);
  const form = useForm<InterviewInput>({
    resolver: zodResolver(interviewInputSchema),
    defaultValues: {
      candidat_name: currentInterview?.candidat_name || "",
      interview_date: currentInterview?.interview_date
        ? new Date(currentInterview?.interview_date)
        : new Date(),
      hr_notes: currentInterview?.hr_notes || "",
      position: currentInterview?.position || "",
      cv_content: currentInterview?.cv_content || "",
      cv_name: currentInterview?.cv_name || "",
    },
  });
  const [topics, setTopics] = useState(currentInterview?.topics || "");
  const watchHrNotes = form.watch("hr_notes");
  const watchCvContent = form.watch("cv_content");
  const watchCvName = form.watch("cv_name");

  useEffect(() => {
    form.setValue(
      "interview_date",
      currentInterview?.interview_date
        ? new Date(currentInterview.interview_date)
        : new Date()
    );
    form.setValue("position", currentInterview?.position || "");
    form.setValue("candidat_name", currentInterview?.candidat_name || "");
    form.setValue("hr_notes", currentInterview?.hr_notes || "");
    form.setValue("cv_content", currentInterview?.cv_content || "");
    form.setValue("cv_name", currentInterview?.cv_name || "");
  }, [currentInterview]);

  useEffect(() => {
    setHasCv(watchCvContent !== "");
  }, [watchCvContent]);

  useEffect(() => {
    setHasHrNotes(watchHrNotes !== "");
  }, [watchHrNotes]);

  function onSubmit(data: z.infer<typeof interviewInputSchema>) {
    console.log(data);
    if (currentInterview) {
      editInterview({
        ...data,
        interview_date: data.interview_date?.toString(),
        id: currentInterview.id,
      });
    } else {
      addInterview({ ...data });
    }
  }
  const handleUploadClick = (e: any) => {
    if (!cvInput.current) return;
    cvInput.current.click();
  };
  const handleCvDelete = () => {
    form.setValue("cv_content", "");
    form.setValue("cv_name", "");
  };
  const handleHrNotesDelete = () => {
    form.setValue("hr_notes", "");
  };
  const handleUpload = async (e: any) => {
    if (!e.target.files[0]) return;
    setParsingCv(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const resp = await fetch("/api/upload", { method: "POST", body: formData });
    const parsed = await resp.text();
    setParsingCv(false);
    form.setValue("cv_content", parsed);
    form.setValue("cv_name", e.target.files[0].name);
    e.target.value = "";
  };
  const handleGenerateTopics = async () => {
    setTopics("");
    setIsGenerating(true);
    if (!currentInterview) return;
    const { output } = await generateTopics(currentInterview);
    for await (const delta of readStreamableValue(output)) {
      setTopics((currentTopics) => `${currentTopics}${delta}`);
    }
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full p-2">
      <div className="text-4xl text-muted-foreground">
        {currentInterview?.candidat_name || "New interview"}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <div className="flex space-x-4 w-full ">
            <Button type="submit" size="sm">
              <Save />
              Save
            </Button>
            {currentInterview && (
              <Button type="button" variant="destructive" size="sm">
                <Trash />
                Delete
              </Button>
            )}
          </div>
          <div className="flex space-x-8">
            <div className="w-[400px] space-y-4 flex flex-col gap-2">
              <div className="text-2xl font-bold">Context</div>
              <FormField
                control={form.control}
                name="candidat_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Canadidate name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="automation enginer">
                          Automation enginer
                        </SelectItem>
                        <SelectItem value="Functional tester">
                          Functional tester
                        </SelectItem>
                        <SelectItem value="Test Lead">Test Lead</SelectItem>
                        <SelectItem value="Test Manager">
                          Test Manager
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interview_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of interview</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("2024-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-1">
                <FormLabel>CV</FormLabel>
                <div className="flex items-center space-x-2 min-w-0">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={handleUploadClick}
                    disabled={parsingCv}
                  >
                    {parsingCv ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <Upload />
                    )}
                  </Button>

                  {!hasCv ? (
                    <span className="flex-1 truncate">No CV uploaded </span>
                  ) : (
                    <Badge className="flex-1 truncate p-3" variant="outline">
                      {watchCvName}
                    </Badge>
                  )}

                  {hasCv && (
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      onClick={handleCvDelete}
                      disabled={parsingCv}
                    >
                      <Trash />
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <FormLabel>HR Notes</FormLabel>
                <div className="flex items-center space-x-2 min-w-0">
                  <Dialog open={hrDialogOpen} onOpenChange={setHrDialogOpen}>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={parsingCv}
                      onClick={() => setHrDialogOpen(true)}
                    >
                      <Pencil />
                    </Button>

                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Add HR notes</DialogTitle>
                        <DialogDescription>
                          Add notes by HR to provide context for the interview
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Textarea
                          rows={20}
                          value={watchHrNotes}
                          onChange={(e) =>
                            form.setValue("hr_notes", e.target.value)
                          }
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setHrDialogOpen(false)}
                        >
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  {!hasHrNotes ? (
                    <span className="flex-1 truncate">No notes </span>
                  ) : (
                    <Badge className="flex-1 truncate p-3" variant="outline">
                      {watchHrNotes?.slice(0, 20)}...
                    </Badge>
                  )}
                  {hasHrNotes && (
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      onClick={handleHrNotesDelete}
                      disabled={parsingCv}
                    >
                      <Trash />
                    </Button>
                  )}
                </div>
              </div>
              <input
                ref={cvInput}
                className="hidden"
                type="file"
                name="file"
                onChange={handleUpload}
              />
            </div>
            <div className="flex-1 space-y-6 flex flex-col gap-2">
              <div className="text-2xl font-bold">Interview</div>
              {currentInterview ? (
                <Tabs defaultValue="topics" className="w-full">
                  <TabsList>
                    <TabsTrigger value="topics">
                      <Lightbulb />
                      Topics
                    </TabsTrigger>
                    <TabsTrigger value="notes">
                      <NotebookText />
                      Notes
                    </TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                  </TabsList>
                  <TabsContent value="topics" className="grid gap-2">
                    <div className="text-muted-foreground">
                      A structured outline of key subjects and questions to
                      explore during the interview, generated based on the
                      provided inputs.
                    </div>

                    <Button
                      type="button"
                      onClick={handleGenerateTopics}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <Loader className="animate-spin" />
                      ) : (
                        <Lightbulb />
                      )}
                      Generate topics
                    </Button>
                    {topics !== "" ? (
                      <ScrollArea className="h-[500px]">
                        <Markdown className="prose">{topics}</Markdown>
                      </ScrollArea>
                    ) : (
                      <div>No topics genrated</div>
                    )}
                  </TabsContent>
                  <TabsContent value="notes">
                    <div className="text-muted-foreground">
                      A dedicated area for recording observations and insights
                      gathered throughout the interview.
                    </div>
                  </TabsContent>
                  <TabsContent value="summary">
                    <div className="text-muted-foreground">
                      An AI-generated draft of the interview report,
                      synthesizing all available information into a specific
                      format.
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div>Create the interview before proceding</div>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
