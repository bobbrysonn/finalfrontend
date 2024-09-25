import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {jwtDecode} from "jwt-decode";
import {ZodError} from "zod"
import {LoginFormSchema} from "./definitions"

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    Credentials({
      credentials: {email: {}, password: {}},
      authorize: async (credentials) => {
        let user = null

        try {
          const {email, password} = LoginFormSchema.parse(credentials)

          /* Authenticate user */
          const response = await fetch(`${process.env.API_ROOT}/auth/jwt/create/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
          })

          /* Handle response */
          if (response.status === 200) {
            const data = await response.json()
            const {email} = jwtDecode<{
              exp: string;
              user_id: number;
              username: string,
              email: string;
            }>(data.access);

            user = { email }
          } else {

            throw new Error("Invalid credentials")
          }
        } catch (error) {
          if (error instanceof ZodError) {

            return null
          }
        }

        console.log(user)
        return user
      }
    }),
  ],

  callbacks: {

  }
})