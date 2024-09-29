"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginFormSchema } from "@/lib/definitions";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function LoginForm({
  login,
}: {
  login: (
    data: z.infer<typeof LoginFormSchema>
  ) => Promise<{ success?: boolean; error?: boolean; message?: string }>;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  async function handleLogin(data: z.infer<typeof LoginFormSchema>) {
    toast({ title: "Authentication", description: "Logging you in..." });
    const res = await login(data);

    if (res?.error) {
      form.setError("password", { message: res.message });
    }
  }

  return (
    <Card className="mx-auto max-w-[32rem]">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your dartmouth email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="emailgiven">Email</FormLabel>
                  <Input
                    {...field}
                    type="email"
                    id="emailgiven"
                    autoComplete="email"
                    placeholder="john.doe.26@dartmouth.edu"
                    required
                  />
                  <FormDescription>Enter your email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <div className="flex items-center">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Link
                      href="/auth/reset/password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    {...field}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    required
                  />
                  <FormDescription>
                    Password must be at least 8 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem className="mt-4">
              <Button type="submit" className="w-full ">
                Login
              </Button>
            </FormItem>
          </form>
        </Form>

        <div className="mt-8 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
