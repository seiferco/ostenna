"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginInput } from "@/lib/validators";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    setError(null);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-patina-linen border border-patina-sand rounded-xl p-8 shadow-sm">
        <h1 className="text-3xl font-heading text-patina-espresso mb-2">
          Welcome back
        </h1>
        <p className="text-patina-clay mb-8">
          Sign in to your Ostenna account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-patina-walnut mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className="w-full bg-white border border-patina-sand rounded-lg px-4 py-2.5 text-patina-espresso placeholder:text-patina-clay focus:ring-2 focus:ring-patina-verdigris-200 focus:border-patina-verdigris-400 outline-none transition"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-patina-error">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-patina-walnut mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              className="w-full bg-white border border-patina-sand rounded-lg px-4 py-2.5 text-patina-espresso placeholder:text-patina-clay focus:ring-2 focus:ring-patina-verdigris-200 focus:border-patina-verdigris-400 outline-none transition"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-patina-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-patina-error/20 rounded-lg px-4 py-3 text-sm text-patina-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-patina-verdigris-500 text-white rounded-lg px-6 py-2.5 font-medium hover:bg-patina-verdigris-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-patina-clay">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-patina-verdigris-500 hover:text-patina-verdigris-600 font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
