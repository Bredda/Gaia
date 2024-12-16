import { z } from "zod";

export const interviewInputSchema = z.object({
  candidat_name: z.string().min(1, "Candidate name is required"),
  interview_date: z.date().optional(),
  hr_notes: z.string().optional(),
  technical_notes: z.string().optional(),
  cv_content: z.string().optional(),
  cv_name: z.string().optional(),
  position: z.string().min(1, "Candidate position is required"),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  topics: z.string().optional(),
});

export type InterviewInput = z.infer<typeof interviewInputSchema>;

export interface Interview {
  id: string;
  created_at: string;
  updated_at: string;
  candidat_name: string;
  interview_date?: string;
  hr_notes?: string;
  technical_notes?: string;
  cv_content?: string;
  position: string;
  cv_name?: string;
  status?: string;
  topics: string;
}
