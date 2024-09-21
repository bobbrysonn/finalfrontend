import { z } from "zod"

export const LoginFormSchema = z.object({
	username: z.string().min(3).max(150),
	password: z.string().min(8)
})

export const RegisterFormSchema = z.object({
	email: z.string().email().regex(/^[a-zA-Z]+(\.[a-zA-Z]+)*\.\d+@dartmouth\.edu$/, { message : "Email must be valid undergraduate dartmouth email"}),
	username: z.string().min(3).max(150),
	password: z.string().min(8, { message: "Password must be at least 8 characters long" })
						.max(20, { message: "Password should not exceed 20 characters long"})
						.refine((data) => /[A-Z]/.test(data), { message: "Password must have at least one uppercase letter" })
						.refine((data) => /[a-z]/.test(data), { message: "Password must have at least one lowercase letter" })
						.refine((data) => /[0-9]/.test(data), { message: "Password must have at least one number" })
						.refine((data) => /[!@#$%^&*(),.?":{}|<>]/.test(data), { message: "Password must have at least one special character" }),
	confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, { message: "Passwords must match", path: ["confirmPassword"] })