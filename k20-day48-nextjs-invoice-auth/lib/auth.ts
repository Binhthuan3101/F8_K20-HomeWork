import { neon } from "@neondatabase/serverless";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { use } from "react";
export const SESSION_COOKIE_NAME = "invoice_session";
import bcrypt from "bcryptjs";

const sql = neon(`${process.env.DATABASE_URL}`);

export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("Thiếu biến môi trường SESSION_SECRET");
  }
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({
    id: user.id,
    name: user.name,
    email: user.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(getSecretKey());
}

export async function verifySessionToken(
  token: string | undefined,
): Promise<SessionUser | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (
      typeof payload.id === "string" &&
      typeof payload.name === "string" &&
      typeof payload.email === "string"
    ) {
      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function createSession(user: SessionUser) {
  const token = await signSessionToken(user);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<SessionUser | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const row =
    await sql`SELECT id, name, email,password FROM users WHERE LOWER(email)= ${normalizedEmail} LIMIT 1`;
  const user = row[0] as
    | {
        id: string;
        name: string;
        email: string;
        password: string;
      }
    | undefined;

  if (!user) {
    return null;
  }
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
