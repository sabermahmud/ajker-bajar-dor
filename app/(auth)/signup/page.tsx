"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/app/lib/auth-client";
import {
  FaGithub,
  FaGoogle,
  FaArrowRight,
  FaUserPlus,
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("সবগুলো ঘর পূরণ করুন।");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "সাইন আপ করা যায়নি।");
        toast.error(error.message || "সাইন আপ করা যায়নি।");
        return;
      }

      toast.success(`${data.user.name}, আপনার অ্যাকাউন্ট তৈরি হয়েছে!`);

      form.reset();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Signup failed:", error);

      setErrorMessage("কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      toast.error("সাইন আপ করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      setErrorMessage("");
      setSocialLoading(provider);

      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "সাইন আপ করা যায়নি।");
        toast.error(error.message || "সাইন আপ করা যায়নি।");
        setSocialLoading("");
      }
    } catch (error) {
      console.error(`${provider} signup failed:`, error);

      setErrorMessage("কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      toast.error("আবার চেষ্টা করুন।");
      setSocialLoading("");
    }
  };

  const isBusy = isLoading || Boolean(socialLoading);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-200 px-4 py-10 sm:px-6">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative w-full max-w-md">
        <section className="overflow-hidden rounded-3xl border border-base-300/70 bg-base-100 shadow-xl shadow-base-content/5">
          {/* Matching login page accent */}
          <div className="h-1.5 bg-linear-to-r from-green-700/30 via-accent to-green-700/30" />

          <div className="p-6 sm:p-9">
            {/* Heading */}
            <div className="mb-7 text-center">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                অ্যাকাউন্ট তৈরি করুন
              </h1>

              <p className="mt-3 text-sm leading-6 text-base-content/65">
                অ্যাকাউন্ট তৈরি করে প্রতিদিনের বাজারদর জানুন, পণ্যের দাম তুলনা
                করুন এবং সাশ্রয়ী কেনাকাটা করুন।
              </p>
            </div>

            {/* Signup form */}
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  আপনার নাম
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  className="input input-bordered h-12 w-full rounded-xl bg-base-100 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
                  placeholder="যেমন: রহিম উদ্দিন"
                  autoComplete="name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  ইমেইল ঠিকানা
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input input-bordered h-12 w-full rounded-xl bg-base-100 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  পাসওয়ার্ড
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered h-12 w-full rounded-xl bg-base-100 pr-12 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
                    placeholder="কমপক্ষে ৮ অক্ষর"
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-base-content/55 transition hover:text-accent"
                    aria-label={
                      showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered h-12 w-full rounded-xl bg-base-100 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
                  placeholder="পাসওয়ার্ড আবার লিখুন"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              {errorMessage && (
                <p
                  role="alert"
                  className="rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error"
                >
                  {errorMessage}
                </p>
              )}

              {/* Primary action */}
              <button
                type="submit"
                className="btn bg-green-700 h-12 min-h-12 w-full rounded-xl text-white font-bold shadow-lg shadow-primary/15 transition hover:-translate-y-0.5"
                disabled={isBusy}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    অ্যাকাউন্ট তৈরি হচ্ছে...
                  </>
                ) : (
                  <>
                    <FaUserPlus />
                    সাইন আপ করুন
                    <FaArrowRight className="ml-auto" />
                  </>
                )}
              </button>
            </form>

            {/* Social login */}
            <div className="divider my-6 text-xs text-base-content/45">
              অথবা অন্যভাবে চালিয়ে যান
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleSocialSignIn("google")}
                className="btn h-12 min-h-12 rounded-xl border-base-300 bg-base-100 text-base-content hover:bg-base-200"
                disabled={isBusy}
              >
                {socialLoading === "google" ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <FaGoogle className="text-lg text-[#DB4437]" />
                )}
                Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialSignIn("github")}
                className="btn h-12 min-h-12 rounded-xl border-base-300 bg-base-100 text-base-content hover:bg-base-200"
                disabled={isBusy}
              >
                {socialLoading === "github" ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <FaGithub className="text-lg" />
                )}
                GitHub
              </button>
            </div>

            {/* Login link */}
            <p className="mt-6 text-center text-sm text-base-content/70">
              আগে থেকেই অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/login"
                className="font-bold text-green-700 hover:underline"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-6 flex flex-col items-center gap-3 text-sm text-base-content/60">
          <p className="flex items-center gap-2">
            <FaShieldAlt className="text-green-700" />
            আপনার অ্যাকাউন্টের নিরাপত্তা আমাদের অগ্রাধিকার।
          </p>

          <Link
            href="/"
            className="flex items-center gap-2 transition hover:text-accent"
          >
            <GoArrowLeft />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
