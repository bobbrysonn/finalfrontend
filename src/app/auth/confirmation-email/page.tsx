import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheckIcon } from "lucide-react";

export default function ConfirmationEmailAlert() {
  return (
    <main className="flex items-center justify-center min-h-[80vh]">
      <Alert className="max-w-md mx-auto">
        <MailCheckIcon className="h-4 w-4" />
        <AlertTitle>Confirmation Email Sent</AlertTitle>
        <AlertDescription className="text-gray-300">
          We&apos;ve sent a confirmation email to your email address. Please check your <span className="underline text-white">inbox</span> or <span
          className="underline text-white">spam</span> and <span className="underline text-white">deleted</span> folders
          and follow the instructions to complete your registration.
        </AlertDescription>
      </Alert>
    </main>
  );
}
