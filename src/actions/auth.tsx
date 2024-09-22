"use server";

import { z } from "zod";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/definitions";
import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function activateEmail(userId: string, token: string) {
  /* Activate email on the /auth/users/activation/ endpoint */
  try {
    const response = await fetch(
      "http://localhost:8000/auth/users/activation/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: userId, token }),
      }
    );

    if (response.status === 204) {
      /* Return success message if the email is successfully activated */
      return { success: true, message: "Email successfully activated!" };
    } else if (response.status === 403) {
      /* Return error message if the activation link is invalid */

      return {
        success: false,
        message: "Activation link has expired or is invalid",
      };
    } else {
      return {
        success: false,
        message: "Invalid activation link",
      };
    }
  } catch (error) {
    throw error;
  }
}

export async function resendActivationEmail(email: string) {}

export async function login(formData: z.infer<typeof LoginFormSchema>) {
  const res: { success?: boolean; error?: boolean; message?: string } = {};

  try {
    await signIn("credentials", { ...formData, redirect: false });

    redirect("/");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            ...res,
            error: true,
            message: "Invalid username or password",
          };
        }
        default: {
          return { ...res, error: true, message: error.message };
        }
      }
    }

    throw error;
  }
}

export async function logout() {
  await signOut({ redirect: false });
}

export async function register(formData: z.infer<typeof RegisterFormSchema>) {
  const res: {
    success?: boolean;
    error?: boolean;
    message?: string;
    errorBody?: { username?: string; email?: string };
  } = {};

  try {
    /* Register user on the /auth/users/ endpoint */
    const response = await fetch("http://localhost:8000/auth/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    /* Redirect to the confirmation email page if the registration is successful */
    if (response.status === 201) {
      redirect("/auth/confirmation-email/");
    } else {
      const data = await response.json();

      console.log(data);

      return {
        ...res,
        error: true,
        errorBody: { username: data?.username?.[0], email: data.email?.[0] },
      };
    }
  } catch (error) {
    throw error;
  }
}
