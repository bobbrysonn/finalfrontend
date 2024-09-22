import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheckIcon } from "lucide-react";

export default function ConfirmationEmailAlert() {
  return (
    <main className="flex items-center justify-center min-h-[80vh]">
      <Alert className="max-w-md mx-auto">
        <MailCheckIcon className="h-4 w-4" />
        <AlertTitle>Confirmation Email Sent</AlertTitle>
        <AlertDescription>
          We&apos;ve sent a confirmation email to your email address. Please check your
          inbox and follow the instructions to complete your registration.
        </AlertDescription>
      </Alert>
    </main>
  );
}
