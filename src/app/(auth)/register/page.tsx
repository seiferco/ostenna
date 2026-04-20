"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { registerSchema, type RegisterInput } from "@/lib/validators";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    setError(null);
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
          display_name: data.displayName,
        },
      },
    });

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-patina-linen border border-patina-sand rounded-xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 bg-patina-verdigris-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-patina-verdigris-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-heading text-patina-espresso mb-2">
            Check your email
          </h1>
          <p className="text-patina-clay mb-6">
            We sent you a confirmation link. Click it to activate your account.
          </p>
          <Link
            href="/login"
            className="text-patina-verdigris-500 hover:text-patina-verdigris-600 font-medium"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-patina-linen border border-patina-sand rounded-xl p-8 shadow-sm">
        <h1 className="text-3xl font-heading text-patina-espresso mb-2">
          Join Ostenna
        </h1>
        <p className="text-patina-clay mb-8">
          Create your account to start buying and selling
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-patina-walnut mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                {...register("username")}
                className="w-full bg-white border border-patina-sand rounded-lg px-4 py-2.5 text-patina-espresso placeholder:text-patina-clay focus:ring-2 focus:ring-patina-verdigris-200 focus:border-patina-verdigris-400 outline-none transition"
                placeholder="janedoe"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-patina-error">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-patina-walnut mb-1.5"
              >
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                {...register("displayName")}
                className="w-full bg-white border border-patina-sand rounded-lg px-4 py-2.5 text-patina-espresso placeholder:text-patina-clay focus:ring-2 focus:ring-patina-verdigris-200 focus:border-patina-verdigris-400 outline-none transition"
                placeholder="Jane Doe"
              />
              {errors.displayName && (
                <p className="mt-1 text-sm text-patina-error">
                  {errors.displayName.message}
                </p>
              )}
            </div>
          </div>

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
              autoComplete="new-password"
              {...register("password")}
              className="w-full bg-white border border-patina-sand rounded-lg px-4 py-2.5 text-patina-espresso placeholder:text-patina-clay focus:ring-2 focus:ring-patina-verdigris-200 focus:border-patina-verdigris-400 outline-none transition"
              placeholder="At least 8 characters"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-patina-error">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-patina-walnut mb-1.5"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword")}
              className="w-full bg-white border border-patina-sand rounded-lg px-4 py-2.5 text-patina-espresso placeholder:text-patina-clay focus:ring-2 focus:ring-patina-verdigris-200 focus:border-patina-verdigris-400 outline-none transition"
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-patina-error">
                {errors.confirmPassword.message}
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
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-patina-clay">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-patina-verdigris-500 hover:text-patina-verdigris-600 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
