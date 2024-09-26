import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {jwtDecode} from "jwt-decode";
import {ZodError} from "zod"
import {LoginFormSchema} from "./definitions"

/* eslint-disable */
export const {handlers, signIn, signOut, auth} = NextAuth({
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      // @ts-ignore
      session.user.id = token.id
      return session
    },
  },
  pages: {
    signIn: "/auth/login"
  },
  providers: [
    Credentials({
      credentials: {email: {}, password: {}},
      // @ts-ignore
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
            const {email, user_id} = jwtDecode<{
              exp: string;
              user_id: number;
              username: string,
              email: string;
            }>(data.access);

            user = { id: user_id, email }
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
/* eslint-enable */