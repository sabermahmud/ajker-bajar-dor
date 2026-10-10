"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "@/app/lib/auth-client";
import Link from "next/link";
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LogInPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setErrorMessage("ইমেইল ও পাসওয়ার্ড পূরণ করুন।");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await signIn.email({
        email,
        password,
        callbackURL: "http://localhost:3000",
      });

      if (error) {
        setErrorMessage(error.message || "সাইন ইন করা যায়নি।");
        toast.error(error.message || "সাইন ইন করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Signin failed:", error);

      setErrorMessage("কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      toast.error("সাইন ইন করা যায়নি।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen py-10 px-4">
      {" "}
      <div className="hero-content flex-col w-full max-w-md">
        {" "}
        <div className="text-center">
          {" "}
          <h1 className="text-4xl sm:text-5xl font-bold">সাইন ইন </h1>
          <p className="py-5 text-base-content/70">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl border border-base-300/50">
          <div className="card-body p-6 sm:p-8">
            <form onSubmit={handleSignin} className="fieldset gap-1">
              <label htmlFor="email" className="label">
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                className="input input-bordered w-full"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />

              <label htmlFor="password" className="label mt-3">
                পাসওয়ার্ড
              </label>

              <label className="input input-bordered flex w-full items-center gap-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="grow"
                  name="password"
                  placeholder="আপনার পাসওয়ার্ড"
                  autoComplete="current-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="text-base-content/60 hover:text-base-content"
                  aria-label={
                    showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </label>

              {errorMessage && (
                <p role="alert" className="text-error text-sm mt-3">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-accent mt-5 w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    সাইন ইন হচ্ছে...
                  </>
                ) : (
                  "সাইন ইন করুন"
                )}
              </button>
            </form>

            <div className="divider my-3 text-base-content/50">অথবা</div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                type="button"
                className="btn btn-error text-white flex-1"
                disabled={isLoading}
              >
                <FaGoogle className="text-xl" />
                Google
              </button>

              <button
                type="button"
                className="btn btn-primary flex-1"
                disabled={isLoading}
              >
                <FaGithub className="text-xl" />
                GitHub
              </button>
            </div>

            <p className="text-center text-sm mt-4">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                className="text-accent font-semibold hover:underline"
                href="/signup"
              >
                সাইন আপ করুন
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-2">
          <Link
            className="flex items-center gap-2 text-sm text-base-content/70 hover:text-accent transition-colors"
            href="/"
          >
            <GoArrowLeft />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
