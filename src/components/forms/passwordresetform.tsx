"use client";

import { AlertCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { PasswordResetFormSchema } from "@/lib/definitions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  reset: (
    email: string
  ) => Promise<{ success?: boolean; error?: boolean; message?: string }>;
};

export default function PasswordResetForm({ reset }: Props) {
  const form = useForm<z.infer<typeof PasswordResetFormSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(PasswordResetFormSchema),
  });

  /* Get form state */
  const {
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  /* Handle form submission */
  async function handleSubmit(data: z.infer<typeof PasswordResetFormSchema>) {
    await reset(data.email);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your email to receive a password reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                    placeholder="Enter your email"
                    required
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem className="mt-8">
              <Button
                type="submit"
                className="w-full flex gap-2"
                disabled={isSubmitting || isSubmitSuccessful}
              >
                {isSubmitting ? "Sending reset link" : "Send Reset Link"}
                {isSubmitting && <Loader size={14} className="animate-spin" />}
              </Button>
            </FormItem>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {isSubmitSuccessful && (
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <AlertCircle size={16} />
            <span>A reset link has been sent. Check inbox or spam</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
