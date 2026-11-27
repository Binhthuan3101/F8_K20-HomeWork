import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import credentials from "next-auth/providers/credentials";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcrypt";

const sql = neon(process.env.DATABASE_URL!);
const getUser = async (email: string) => {
  const data = await sql`SELECT * FROM users WHERE email=${email}`;
  return data[0];
};
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      async authorize(credentials) {
        if (
          typeof credentials.email === "string" &&
          typeof credentials.password === "string"
        ) {
          const user = await getUser(credentials.email);
          if (!user) return null;
          const isMatchedPassword = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          // 2. Nếu khớp mật khẩu thì trả về user (ép id sang string cho NextAuth)
          if (isMatchedPassword) {
            return {
              ...user,
              id: String(user.id),
            };
          }
          return null;
        }
      },
    }),
  ],
});
