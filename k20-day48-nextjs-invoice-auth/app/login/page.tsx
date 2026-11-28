"use client";

import React, { useActionState } from "react";
import {login, LoginFormState } from "../action";

const initialLoginState: LoginFormState = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    login,
    initialLoginState
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-white">
      <form
        action={formAction}
        className="w-full max-w-md space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-6"
      >
        <h1 className="text-2xl font-bold">Đăng nhập</h1>
        <p className="text-sm text-slate-400">
          Vui lòng đăng nhập để truy cập hệ thống quản lý hóa đơn.
        </p>

        {state.error && (
          <div
            role="alert"
            aria-live="polite"
            className="rounded-md border border-red-500/50 bg-red-950/50 px-3 py-2 text-sm text-red-300"
          >
            {state.error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-slate-200"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="user@nextmail.com"
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-slate-200"
          >
            Mật khẩu
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Nhập mật khẩu"
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </main>
  );
}