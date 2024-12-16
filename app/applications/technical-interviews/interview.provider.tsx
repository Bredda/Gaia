"use client";

import { useSafeContext } from "@/lib/utils";
import { createContext, useEffect, useState } from "react";
import { Interview, InterviewInput } from "./types";
import {
  deleteInterview,
  fetchInterviews,
  insertInterview,
  updateInterview,
} from "./actions";
import { toast } from "sonner";

interface InterviewsState {
  interviews: Interview[];
  addInterview: (interviewInput: InterviewInput) => void;
  loading: boolean;
  deleting: boolean;
  saving: boolean;
  currentInterview: Interview | null;
  setCurrentInterview: (interview: Interview | null) => void;
  removeInterview: (interviewId: string) => void;
  editInterview: (interview: Partial<Interview> & { id: string }) => void;
}

const InterviewsContext = createContext<InterviewsState | undefined>(undefined);

export const userInterviews = () => useSafeContext(InterviewsContext);

export function InterviewsProvider({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentInterview, setCurrentInterview] = useState<Interview | null>(
    null
  );
  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const data = await fetchInterviews();
        console.log(data);
        setInterviews(data);
      } catch (error) {
        alert("Error fetching interviews!");
      } finally {
        setLoading(false);
      }
    };
  }, []);

  const addInterview = async (interview: InterviewInput) => {
    setSaving(true);

    try {
      const data = await insertInterview(interview);
      setInterviews((prev) => [...prev, data]);
      setCurrentInterview(data);
      toast.success("Interview saved!");
    } catch (error) {
      console.error(error);
      toast.error("Error saving interview!");
    } finally {
      setLoading(false);
    }
  };

  const removeInterview = async (interviewId: string) => {
    setDeleting(true);
    try {
      const data = await deleteInterview(interviewId);
      setInterviews((prev) => [...prev.filter((i) => i.id !== data)]);
      setCurrentInterview(null);
      toast.success("Interview deleted!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting interview!");
    } finally {
      setLoading(false);
    }
    setDeleting(false);
  };

  const editInterview = async (
    interview: Partial<Interview> & { id: string }
  ) => {
    setSaving(true);
    try {
      const data = await updateInterview(interview);
      setInterviews((prev) =>
        prev.map((i) => (i.id === interview.id ? data : i))
      );
      toast.success("Interview saved!");
    } catch (error) {
      console.error(error);
      toast.error("Error saving interview!");
    } finally {
      setLoading(false);
    }
    setSaving(false);
  };

  const value = {
    loading,
    deleting,
    saving,
    currentInterview,
    interviews,
    setCurrentInterview,
    addInterview,
    removeInterview,
    editInterview,
  };

  return (
    <InterviewsContext.Provider value={value}>
      {children}
    </InterviewsContext.Provider>
  );
}
