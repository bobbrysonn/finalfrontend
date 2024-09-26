"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { activateEmail } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function EmailActivation() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [activationResult, setActivationResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    const activate = async () => {
      if (
        typeof params.userId === "string" &&
        typeof params.token === "string"
      ) {
        const result = await activateEmail(params.userId, params.token);
        setActivationResult(result);
      } else {
        setActivationResult({
          success: false,
          message: "Invalid activation link",
        });
      }
      setIsLoading(false);
    };

    activate();
  }, [params.userId, params.token]);

  return (
    <div className="flex items-center justify-center min-h-[85vh]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Email Activation</CardTitle>
          <CardDescription>Confirming your email address</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : activationResult ? (
            <Alert
              variant={activationResult.success ? "default" : "destructive"}
            >
              <AlertTitle>
                {activationResult.success ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription>{activationResult.message}</AlertDescription>
            </Alert>
          ) : null}
        </CardContent>
        {!isLoading && (
          <CardFooter className="flex justify-center">
            {activationResult?.success ? (
              <Button onClick={() => (window.location.href = "/auth/login")}>
                Login
              </Button>
            ) : (
              <></>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
