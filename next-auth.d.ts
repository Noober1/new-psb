import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    isLoggedIn: boolean;
  }

  interface User {
    email: string;
    name: string;
  }
}
