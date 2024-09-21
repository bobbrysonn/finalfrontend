"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { register } from "@/actions/auth"
import { RegisterFormSchema } from "@/lib/definitions"

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


export default function Register() {
	const form = useForm<z.infer<typeof RegisterFormSchema>>({
		defaultValues: {
			email: "",
			username: "",
			password: "",
			confirmPassword: ""
		},
		resolver: zodResolver(RegisterFormSchema)
	})

	return (
		<main className="flex items-center justify-center min-h-[85vh]">
      <Card className="mx-auto max-w-[32rem]">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your details below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(register)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="usernamegiven">Username</FormLabel>
                    <Input {...field} type="text" id="usernamegiven" autoComplete="username" placeholder="johndoe" />
                    <FormDescription>
                      Enter your username
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} type="email" id="email" autoComplete="email" placeholder="john.doe.26@dartmouth.edu" />
                    <FormDescription>
                      Enter your school email address
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
                    </div>
                    <Input {...field} type="password" id="password" autoComplete="new-password" aria-autocomplete="list" required />
                    <FormDescription>
                      Password must be at least 8 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <div className="flex items-center">
                      <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
                    </div>
                    <Input {...field} type="password" id="confirmPassword" autoComplete="new-password" aria-autocomplete="list" required />
                    <FormDescription>
                      Password must match the one above
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className="mt-4">
                <Button type="submit" className="w-full ">
                  Register
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
    </main>
	)
}