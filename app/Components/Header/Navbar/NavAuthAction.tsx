"use client";

import { signOut, useSession } from "@/app/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineUserCircle,
  HiOutlineUser,
  HiOutlineLogout,
} from "react-icons/hi";

export default function NavAuthAction() {
  const { data: session, isPending } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-3">
        {" "}
        <div className="skeleton h-9 w-20 rounded-xl" />{" "}
        <div className="skeleton h-9 w-20 rounded-xl" />{" "}
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        {" "}
        <Link
          href="/login"
          className="btn btn-ghost hover:border-2 hover:border-green-700 btn-sm rounded-xl px-4 font-semibold sm:btn-md"
        >
          সাইন ইন{" "}
        </Link>
        <Link
          href="/signup"
          className="btn bg-green-700 text-white btn-sm rounded-xl px-4 font-semibold shadow-sm sm:btn-md"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        className="btn btn-ghost h-auto min-h-0 gap-2 rounded-2xl px-2 py-1.5 normal-case hover:bg-base-200 sm:px-3"
        aria-label="Open user menu"
      >
        {" "}
        <div className="avatar">
          {" "}
          <div className="w-9 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100 sm:w-10">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User avatar"}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                {" "}
                <HiOutlineUserCircle size={28} />{" "}
              </div>
            )}{" "}
          </div>{" "}
        </div>
        ```
        <div className="hidden text-left sm:block">
          <p className="max-w-32 truncate text-sm font-semibold">
            {user.name || "User"}
          </p>
          <p className="text-xs text-base-content/60">আমার অ্যাকাউন্ট</p>
        </div>
        <HiOutlineChevronDown
          size={16}
          className="hidden text-base-content/60 sm:block"
        />
      </button>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-50 mt-3 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl shadow-black/10"
      >
        <li className="pointer-events-none mb-1">
          <div className="flex items-center gap-3 rounded-xl px-3 py-3">
            <div className="avatar">
              <div className="w-11 rounded-full">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User avatar"}
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                    <HiOutlineUserCircle size={30} />
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">
                {user.name || "User"}
              </p>
              <p className="truncate text-xs text-base-content/60">
                {user.email}
              </p>
            </div>
          </div>
        </li>

        <div className="divider my-1" />

        <li>
          <Link href="/profile" className="gap-3 rounded-xl py-3 font-medium">
            <HiOutlineUser size={19} />
            ইউজার প্রোফাইল
          </Link>
        </li>

        <div className="divider my-1" />

        <li>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="gap-3 rounded-xl py-3 font-medium text-error hover:bg-error/10 hover:text-error"
          >
            {isSigningOut ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <HiOutlineLogout size={19} />
            )}
            {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
          </button>
        </li>
      </ul>
    </div>
  );
}
