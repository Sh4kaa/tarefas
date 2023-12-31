import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_GOOGLE_ID as string,
      clientSecret: process.env.CLIENT_SECRET_KEY as string
    })
  ],
  secret: process.env.NEXTAUTH_SECRET as string
}

export default NextAuth(authOptions)
