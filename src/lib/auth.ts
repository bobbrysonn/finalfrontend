import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod"
import { LoginFormSchema } from "./definitions"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        let user = null

        try {
          const { email, password } = LoginFormSchema.parse(credentials)

          /* Authenticate user */
          const response = await fetch("http://127.0.0.1:8000/auth/jwt/create/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          })

          /* Handle response */
          if (response.status === 200) {
            const data = await response.json()
            const { exp, user_id, username, email } = data.access
            const refresh_token = data.refresh

            user = { expiry: exp, id: user_id, username, email, refresh_token}
          } else {

            throw new Error("Invalid credentials")
          }
        } catch (error) {
          if (error instanceof ZodError) {

            return null
          }
        }

        return user
      }
    }),
  ],
})