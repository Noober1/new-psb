import { DefaultUser, JWT, Session } from "next-auth";

declare module "next-auth" {
  interface JWT {
    accessToken: string;
    id: string | number;
  }
  interface Session {
    isLoggedIn: boolean;
    id: string | number;
  }
}
