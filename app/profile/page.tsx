"use client";

import Image from "next/image";
import { authClient, signOut, useSession } from "../lib/auth-client";
import { FaSignOutAlt, FaUserEdit, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleUpdateInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const result = await authClient.updateUser({
      name: String(data.name),
    });

    console.log(result);
  };

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10 md:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        {/* Profile Section */}
        {session?.user && (
          <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-lg">
            <div className="h-32 bg-gradient-to-r from-green-700 via-green-600 to-emerald-500" />

            <div className="-mt-12 flex flex-col gap-6 px-6 pb-7 md:flex-row md:items-end md:justify-between md:px-10">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                <div className="avatar">
                  <div className="w-24 rounded-full border-4 border-base-100 bg-base-200 shadow-md">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "ব্যবহারকারীর ছবি"}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src="/user_male.jpeg"
                        alt="ব্যবহারকারীর ছবি"
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="pb-1">
                  <h1 className="text-2xl font-bold text-base-content">
                    {session.user.name}
                  </h1>
                  <p className="mt-1 break-all text-sm text-base-content/60">
                    {session.user.email}
                  </p>
                  <div className="mt-3">
                    <span className="badge badge-success badge-outline gap-1">
                      <FaUserCircle />
                      সদস্য প্রোফাইল
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="btn btn-error btn-outline gap-2 rounded-xl"
              >
                <FaSignOutAlt />
                সাইন আউট
              </button>
            </div>
          </div>
        )}

        {/* Update Information Section */}
        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-lg sm:p-8">
          <div className="mb-7 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-xl text-green-700">
              <FaUserEdit />
            </div>

            <div>
              <h2 className="text-xl font-bold text-base-content sm:text-2xl">
                আপনার তথ্য হালনাগাদ করুন
              </h2>
              <p className="mt-2 text-sm leading-6 text-base-content/60">
                আপনার প্রোফাইলের নাম পরিবর্তন করতে নিচের ফর্মটি পূরণ করুন।
              </p>
            </div>
          </div>

          <div className="divider mt-0" />

          <form onSubmit={handleUpdateInfo} className="space-y-5">
            <div className="form-control w-full">
              <label htmlFor="name" className="label">
                <span className="label-text font-semibold">আপনার নাম</span>
              </label>

              <input
                id="name"
                type="text"
                className="input input-bordered w-full rounded-xl focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20"
                name="name"
                placeholder="যেমন: রহিম উদ্দিন"
                autoComplete="name"
                defaultValue={session?.user?.name || ""}
                required
              />

              <label className="label">
                <span className="label-text-alt text-base-content/50">
                  আপনার পছন্দের নামটি লিখুন।
                </span>
              </label>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="btn w-full rounded-xl border-none bg-green-700 px-8 text-white shadow-md transition-all duration-200 hover:bg-green-800 hover:shadow-lg sm:w-auto"
              >
                <FaUserEdit />
                তথ্য আপডেট করুন
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
