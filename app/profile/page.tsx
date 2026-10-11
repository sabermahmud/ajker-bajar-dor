"use client";
import Image from "next/image";
import { authClient, signOut, useSession } from "../lib/auth-client";
import { FaSignOutAlt } from "react-icons/fa";

import { useRouter } from "next/navigation";
import React from "react";

export interface ProfilePageProps {
  prop: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleUpdateInfo = async (e) => {
    e.preventDefault()

    const form = e.target;
    const formData = new FormData(form)
    const data = Object.fromEntries(formData);
    
    console.log(data) 
    await authClient.updateUser({
      ...data
    });
  };

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  };
  return (
    <div>
      <div>
        {session?.user ? (
          <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content bg-green-200/50 rounded-xl w-full flex-col md:flex-row md:justify-between">
              <div className="flex gap-6 items-center">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={100}
                    height={100}
                  />
                ) : (
                  <Image
                    src={"/user_male.jpeg"}
                    alt={"user icon"}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                )}
                <div className="text-left">
                  <h1 className="text-xl font-bold">{session.user.name}</h1>
                  <p className="py-2">{session.user.email}</p>
                </div>
              </div>

              <div>
                <button onClick={handleSignOut} className="btn btn-error">
                  <FaSignOutAlt /> সাইন আউট
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col items-center w-full">
        <h2>তথ্য</h2>
        <form onSubmit={handleUpdateInfo}>
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
          <button type="submit" className="btn bg-green-700 text-white">
            আপডেট{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
