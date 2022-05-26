import NextAuth, { NextAuthOptions } from "next-auth";
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
        const data = [
          {
            email: "cucu.ruhiyatna3@gmail.com",
            password: "kekaishi123",
            name: "Cucu Ruhiyatna",
          },
          { email: "cucu@ruhiyatna.id", password: "test", Name: "tesuto" },
        ];

        const findData = data.find(
          (item) =>
            credentials?.username == item.email &&
            credentials.password == item.password
        );

        return findData
          ? {
              email: findData.email,
              name: findData.name,
            }
          : null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: token.accessToken,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      session.isLoggedIn = true;
      return session;
    },
  },
};

export default NextAuth(options);
