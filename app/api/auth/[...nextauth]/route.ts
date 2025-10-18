import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@/lib/auth-adapter"
import connectDB from "@/lib/mongodb"

// Ensure database connection is established before NextAuth starts
connectDB()

export const authOptions = {
  adapter: MongoDBAdapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" as const },
  callbacks: {
    async session({ session, token, user }) {
      // Add user ID to session
      if (session.user) {
        session.user.id = token.sub || user?.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add user ID to JWT token
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


