"use client"
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";

export interface LogInPageProps {
  prop: string;
}

export default function LogInPage() {
  const handleSignin = () => {
    console.log("clicked log in")
  }
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">সাইন ইন</h1>
            <p className="py-6">
              বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">ইমেইল</label>
                <input
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                />
                <label className="label">পাসওয়ার্ড</label>
                <input
                  type="password"
                  className="input"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                />

                <button onClick={handleSignin} className="btn btn-accent mt-4">সাইন ইন করুন</button>
              </fieldset>
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
                অ্যাকাউন্ট নেই?{" "}
                <Link className="text-accent" href={"/signup"}>
                  সাইন আপ করুন
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
    </>
  );
}
