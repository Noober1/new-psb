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
          const getData: any = await fetchApi({
            method: "POST",
            url: "/ppdb/login",
            data: {
              username: credentials?.username,
              password: credentials?.password,
            },
          });

          return {
            accessToken: getData.accessToken,
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
      const accessToken = token.accessToken as string;
      session.isLoggedIn = true;
      session.accessToken = accessToken;
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
