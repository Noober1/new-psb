declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_COMPANY_NAME: string;
    NEXT_PUBLIC_API_URL: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
  }
}
