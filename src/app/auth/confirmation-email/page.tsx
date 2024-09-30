import type { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheckIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Confirmation Email",
  description: "Confirmation email sent to your email address",
};

export default function ConfirmationEmailAlert() {
  return (
    <section className="px-6">
      <Alert className="max-w-md mx-auto">
        <MailCheckIcon className="h-4 w-4" />
        <AlertTitle>Confirmation Email Sent</AlertTitle>
        <AlertDescription className="text-[#333333] dark:text-muted-foreground">
          We&apos;ve sent a confirmation email to your email address. Please
          check your <span className="underline dark:text-white">inbox</span> or{" "}
          <span className="underline dark:text-white">spam</span> and{" "}
          <span className="underline dark:text-white">deleted</span> folders and
          follow the instructions to complete your registration.
        </AlertDescription>
      </Alert>
    </section>
  );
}
