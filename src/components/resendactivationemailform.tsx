"use client";

import { Button } from "@/components/ui/button";
import { useActivationEmailStore } from "@/providers/activationemail-store-provider";

export default function ResendActivationEmailForm() {
  const { activationEmail } = useActivationEmailStore((store) => store);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("Resending activation email to", activationEmail);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">
        Resend Activation Email: To {activationEmail}
      </Button>
    </form>
  );
}
