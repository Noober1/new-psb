import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import fetchApi from "../../../lib/fetchApi";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username/email",
          type: "text",
          placeholder: "Your username or email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const params = new URLSearchParams();
          params.set("email", credentials?.username || "");
          params.set("phone", credentials?.password || "");
          const getData: any = await fetchApi({
            method: "GET",
            url: "/api/student?" + params.toString(),
          });

          if (!getData) return null;

          return {
            id: getData.id,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.isLoggedIn = true;
      session.id = token.id as number;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
    newUser: "/signup",
    verifyRequest: "/verify-request",
  },
};

export default NextAuth(options);
