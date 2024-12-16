"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BanIcon } from "lucide-react";
import LoadingButton from "@/components/ui/extensions/loading-button";
import { signup } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";

const signupSchema = z
  .object({
    email: z.string().email({
      message: "Email must be a valid email adress.",
    }),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The confirm password do not match",
        path: ["confirmPassword"],
      });
    }
  });

interface SignupProps {
  toSignin: () => void;
}

export default function SignupPage({ toSignin }: SignupProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    setLoading(true);
    setError(undefined);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    const error = await signup(formData);
    setError(error);
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-balance text-muted-foreground">
            Enter your information to create an account
          </p>
        </div>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input id="password" type="password" required {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <Alert variant="destructive">
              <BanIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <LoadingButton
            type="submit"
            className="w-full"
            label="Sign up"
            loading={loading}
          />
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Button variant="link" onClick={toSignin}>
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
}
