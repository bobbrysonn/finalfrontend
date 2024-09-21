import { z } from "zod"
import { LoginFormSchema, RegisterFormSchema } from "@/lib/definitions"

export async function login(formData: z.infer<typeof LoginFormSchema>) { 
  console.log(formData)
}

export async function register(formData: z.infer<typeof RegisterFormSchema>) { 
  console.log(formData)
}