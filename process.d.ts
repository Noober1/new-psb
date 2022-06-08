declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_COMPANY_NAME: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_CAPTCHA_SITE_KEY: string;
    CAPTCHA_SECRET_KEY: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    NEXT_PUBLIC_BASE_URL: string;
  }
}
