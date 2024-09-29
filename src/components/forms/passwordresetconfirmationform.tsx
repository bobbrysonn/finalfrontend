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

import { PasswordResetConfirmationSchema } from "@/lib/definitions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

type Props = {
  resetConfirm: (
    id: string,
    token: string,
    password: string,
    passwordConfirm: string
  ) => Promise<{ success?: boolean; error?: boolean; message?: string }>;
  id: string;
  token: string;
};

export default function PasswordResetConfirmationForm({
  resetConfirm,
  id,
  token,
}: Props) {
  const [message, setMessage] = useState<string | null | undefined>(null);

  const form = useForm<z.infer<typeof PasswordResetConfirmationSchema>>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(PasswordResetConfirmationSchema),
  });

  /* Get form state */
  const {
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  /* Handle form submission */
  async function handleSubmit(
    data: z.infer<typeof PasswordResetConfirmationSchema>
  ) {
    const response = await resetConfirm(
      id,
      token,
      data.password,
      data.confirmPassword
    );

    setMessage(response.message);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Confirm Reset Password</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="passwordGiven">New Password</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    id="passwordGiven"
                    autoComplete="new-password"
                    placeholder="Enter your new password"
                    required
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel htmlFor="confirmPasswordGiven">
                    Confirm Password
                  </FormLabel>
                  <Input
                    {...field}
                    type="password"
                    id="confirmPasswordGiven"
                    autoComplete="new-password"
                    placeholder="Confirm your password"
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
                {isSubmitting ? "Submitting" : "Reset"}
                {isSubmitting && <Loader size={14} className="animate-spin" />}
              </Button>
            </FormItem>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {message && (
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <AlertCircle size={16} />
            <span>{message}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
