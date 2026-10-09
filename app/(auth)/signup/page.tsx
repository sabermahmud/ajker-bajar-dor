"use client";
import { signUp } from "@/app/lib/auth-client";
import Link from "next/link";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";

export default function SignUpPage() {
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const { data: resData, error } = await signUp.email({
      name: data.name as string, // required,
      email: data.email as string, //
      password: data.password as string, //
      callbackURL: "/" as string,
    });
    if (error) {
      alert(error.message);
      return;
    }

    console.log("Signup response:", resData);
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="py-6">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSignUp} className="fieldset">
              <label className="label">নাম</label>
              <input
                type="text"
                className="input"
                name="name"
                placeholder="যেমন: রহিম উদ্দিন"
              />
              <label className="label">ইমেইল</label>
              <input
                type="email"
                className="input"
                name="email"
                placeholder="you@example.com"
              />
              <label className="label">পাসওয়ার্ড</label>
              <input
                type="password"
                className="input"
                name="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
              />
              <label className="label">পাসওয়ার্ড নিশ্চিত করুন</label>
              <input
                type="password"
                className="input"
                name="confirmPassword"
                placeholder="আবার লিখুন"
              />

              <button type="submit" className="btn btn-accent mt-4">
                সাইন আপ করুন
              </button>
            </form>
          </div>
        </div>
        <div className="divider">অথবা</div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <button className="btn btn-error text-white flex items-center">
              <FaGoogle className="text-xl" />
              Google দিয়ে চালিয়ে যান
            </button>
            <button className="btn btn-primary">
              {" "}
              <FaGithub className="text-xl" />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>
          <div>
            <p className="text-center">
              অ্যাকাউন্ট আছে?{" "}
              <Link className="text-accent" href={"/login"}>
                সাইন ইন করুন
              </Link>
            </p>
          </div>
        </div>
        <div>
          <Link className="flex items-center gap-2" href="/">
            <GoArrowLeft /> হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
