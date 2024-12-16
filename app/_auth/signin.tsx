"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BanIcon } from "lucide-react";
import LoadingButton from "@/components/ui/extensions/loading-button";
import { signin } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email adress.",
  }),
  password: z.string(),
});

interface SigninProps {
  toSignup: () => void;
}

export default function Signin({ toSignup }: SigninProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    setError(undefined);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    const error = await signin(formData);
    setError(error);
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
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
                    autoComplete="email"
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
                  <Input
                    id="password"
                    type="password"
                    required
                    {...field}
                    autoComplete="current-password"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href="/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            Forgot your password?
          </Link>
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
            label="Sign in"
            loading={loading}
          />
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Button variant="link" onClick={toSignup}>
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
}
