"use client";

import { useState, type FormEvent } from "react";
import { signUp } from "@/app/lib/auth-client";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(
      formData.get("confirmPassword") ?? ""
    );

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
        callbackURL: "http://localhost:3000",
      });


      if (error) {
        setErrorMessage(error.message || "সাইন আপ করা যায়নি।");
        toast.error("সাইন আপ করা যায়নি।")
        return;
      }

      setSuccessMessage("অ্যাকাউন্ট তৈরি সফল হয়েছে।");
      toast.success(`${data.user.name}অ্যাকাউন্ট তৈরি সফল হয়েছে।`)

      router.push("/");
      form.reset();

    } catch (error) {
      console.error("Signup failed:", error);

      setErrorMessage(
        "কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
      toast.error("কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen py-10">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="py-6">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSignUp} className="fieldset">
              <label htmlFor="name" className="label">
                নাম
              </label>

              <input
                id="name"
                type="text"
                className="input w-full"
                name="name"
                placeholder="যেমন: রহিম উদ্দিন"
                autoComplete="name"
                required
              />

              <label htmlFor="email" className="label">
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                className="input w-full"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />

              <label htmlFor="password" className="label">
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                type="password"
                className="input w-full"
                name="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete="new-password"
                minLength={8}
                required
              />

              <label htmlFor="confirmPassword" className="label">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                type="password"
                className="input w-full"
                name="confirmPassword"
                placeholder="আবার লিখুন"
                autoComplete="new-password"
                minLength={8}
                required
              />

              {errorMessage && (
                <p role="alert" className="text-error text-sm mt-3">
                  {errorMessage}
                </p>
              )}

              {successMessage && (
                <p
                  role="status"
                  className="text-success text-sm mt-3"
                >
                  {successMessage}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-accent mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    সাইন আপ হচ্ছে...
                  </>
                ) : (
                  "সাইন আপ করুন"
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="divider">অথবা</div>

        <div className="flex flex-col gap-4">
          <div className="flex  flex-col md:flex-row justify-center gap-4">
            <button
              type="button"
              className="btn btn-error text-white"
              onClick={() =>
                alert("Google sign-in এখনো যুক্ত করা হয়নি।")
              }
            >
              <FaGoogle className="text-xl" />
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                alert("GitHub sign-in এখনো যুক্ত করা হয়নি।")
              }
            >
              <FaGithub className="text-xl" />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="text-center">
            অ্যাকাউন্ট আছে?{" "}
            <Link className="text-accent" href="/login">
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <div>
          <Link className="flex items-center gap-2" href="/">
            <GoArrowLeft />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}