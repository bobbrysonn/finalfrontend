"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { login } from "@/actions/auth"
import { LoginFormSchema } from "@/lib/definitions"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


export default function Login() {
	const form = useForm<z.infer<typeof LoginFormSchema>>({
		defaultValues: {
			username: "",
			password: "",
		},
		resolver: zodResolver(LoginFormSchema)
	})

	return (
		<main className="flex items-center justify-center min-h-[80vh]">
      <Card className="mx-auto max-w-[32rem]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username and password to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(login)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="usernamegiven">Username</FormLabel>
                    <Input {...field} type="text" id="usernamegiven" autoComplete="username" placeholder="johndoe" required />
                    <FormDescription>
                      Enter your username
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <div className="flex items-center">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Link href="#" className="ml-auto inline-block text-sm underline">
                        Forgot your password?
                      </Link>
                    </div>
                    <Input {...field} type="password" id="password" autoComplete="current-password" required />
                    <FormDescription>
                      Password must be at least 8 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className="mt-4">
                <Button type="submit" className="w-full ">
                  Login
                </Button>
              </FormItem>
            </form>
          </Form>

          <div className="mt-8 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
	)
}