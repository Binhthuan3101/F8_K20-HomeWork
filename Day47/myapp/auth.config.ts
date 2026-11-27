import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth ,request: {nextUrl}}) {
      return !!auth?.user;
    },
  },
} satisfies NextAuthConfig;
