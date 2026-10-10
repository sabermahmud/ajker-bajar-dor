"use client";
import Image from "next/image";
import { signOut, useSession } from "../lib/auth-client";
import { FaSignOutAlt } from "react-icons/fa";

import { useRouter } from "next/navigation";

export interface ProfilePageProps {
  prop: string;
}

export default function ProfilePage() {
    const router = useRouter();
  const { data: session } = useSession();

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
    <>
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
    </>
  );
}
