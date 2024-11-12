"use client";

import Link from "next/link";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {RegisterFormSchema} from "@/lib/definitions";

import {Button} from "@/components/ui/button";
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
import {Input} from "@/components/ui/input";
import {Loader} from "lucide-react";

type RegisterFormProps = {
    register: () => Promise<{
        success?: boolean,
        error?: boolean,
        message?: string,
        errorBody?: { netID?: string, email?: string }
    }>;
}
export default function RegisterForm({register}: RegisterFormProps) {
    /* Create the form */
    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        defaultValues: {
            netID: "",
            password: "",
            confirmPassword: "",
        },
        resolver: zodResolver(RegisterFormSchema),
    });

    /* Get form state */
    const {
        formState: {isSubmitting, isSubmitSuccessful},
    } = form;

    async function handleRegister(data: z.infer<typeof RegisterFormSchema>) {
        const res = await register(data);

        if (res?.error) {
            if (res.errorBody?.netID) {
                form.setError("netID", {
                    message: res.errorBody.netID,
                });
            }
        }
    }

    return (
        <Card className="mx-auto max-w-[32rem]">
            <CardHeader>
                <CardTitle className="text-2xl">Register</CardTitle>
                <CardDescription>
                    Enter your details below to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => handleRegister(data))}>
                        <FormField
                            control={form.control}
                            name="netID"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel htmlFor="netIDgiven">Net ID</FormLabel>
                                    <Input
                                        {...field}
                                        type="text"
                                        id="netIDgiven"
                                        autoComplete="username"
                                    />
                                    <FormDescription>Enter your net id</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem className="mt-2">
                                    <div className="flex items-center">
                                        <FormLabel htmlFor="password">Password</FormLabel>
                                    </div>
                                    <Input
                                        {...field}
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        aria-autocomplete="list"
                                        required
                                    />
                                    <FormDescription>
                                        Password must be at least 8 characters
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({field}) => (
                                <FormItem className="mt-2">
                                    <div className="flex items-center">
                                        <FormLabel htmlFor="confirmPassword">
                                            Confirm password
                                        </FormLabel>
                                    </div>
                                    <Input
                                        {...field}
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="new-password"
                                        aria-autocomplete="list"
                                        required
                                    />
                                    <FormDescription>
                                        Password must match the one above
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormItem className="mt-4">
                            <Button
                                type="submit"
                                className="w-full flex gap-2"
                                disabled={isSubmitting || isSubmitSuccessful}
                            >
                                {isSubmitting ? "" : "Register"}
                                {isSubmitting && <Loader className="w-4 h-4 animate-spin"/>}
                            </Button>
                        </FormItem>
                    </form>
                </Form>

                <div className="mt-8 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="underline">
                        Login
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
