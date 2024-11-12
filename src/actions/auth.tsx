"use server";

import { z } from "zod";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/definitions";
import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function resetConfirm(
    id: string,
    token: string,
    password: string,
    passwordConfirm: string
) {
    /* Reset password on the /auth/users/reset_password_confirm/ endpoint */
    try {
        const response = await fetch(
            `${process.env.API_ROOT}/auth/users/reset_password_confirm/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: id,
                    token,
                    new_password: password,
                    re_new_password: passwordConfirm,
                }),
            }
        );

        if (response.status === 204) {
            /* Return success message if the password is successfully reset */
            return {
                success: true,
                message: "Your password has been reset succesfully",
            };
        } else {
            return {
                success: false,
                message: "Invalid password reset link",
            };
        }
    } catch (error) {
        throw error;
    }
}

export async function resetPassword(email: string) {
    /* Reset password on the /auth/users/reset_password/ endpoint */
    try {
        const response = await fetch(
            `${process.env.API_ROOT}/auth/users/reset_password/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            }
        );

        if (response.status === 204) {
            /* Return success message if the password reset link is sent */
            return {
                success: true,
                message: "Password reset link sent to your email",
            };
        } else {
            return {
                success: false,
                message: "Invalid email address",
            };
        }
    } catch (error) {
        throw error;
    }
}

export async function activateEmail(userId: string, token: string) {
    /* Activate email on the /auth/users/activation/ endpoint */
    try {
        const response = await fetch(
            `${process.env.API_ROOT}/auth/users/activation/`,
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

export async function resendActivationEmail(email: string) {
    console.log(email);
}

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
    /* Object to return */
    const res: {
        success?: boolean;
        error?: boolean;
        message?: string;
        errorBody?: { netID?: string; email?: string };
    } = {};

    try {
        /* First fetch the user from lookup dartmouth */
        const lookupResponse = await fetch(
            `https://api-lookup.dartmouth.edu/v1/lookup?q=${formData.netID}&field=mail`
        );
        type lookupDataType = { truncated : string, users : [ { mail : string } ] }
        const lookupData: lookupDataType = await lookupResponse.json();

        /* Check if netId is valid */
        if (lookupData.users.length < 1) {
            return {
                ...res,
                error: true,
                errorBody: { netID: "NetID does not exist" }
            }
        }

        /* Register user on the /auth/users/ endpoint */
        const response = await fetch(`${process.env.API_ROOT}/auth/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: lookupData.users[0].mail,
                username: formData.netID,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            }),
        });

        /* Redirect to the confirmation email page if the registration is successful */
        if (response.status === 201) {
            redirect("/auth/confirmation-email/");
        } else {
            const data = await response.json();

            return {
                ...res,
                error: true,
                errorBody: { netID: data?.username?.[0] },
            };
        }
    } catch (error) {
        throw error;
    }
}
