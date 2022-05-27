import { DefaultUser, JWT, Session } from "next-auth";

declare module "next-auth" {
  interface JWT {
    accessToken: string;
  }
  interface Session {
    isLoggedIn: boolean;
    accessToken: string;
  }
}
