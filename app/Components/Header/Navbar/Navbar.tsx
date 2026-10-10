import Image from "next/image";
import { BsListNested } from "react-icons/bs";
import CurrentDate from "../../CurrentDate";
import { Suspense } from "react";
import NavAuthAction from "./NavAuthAction";
import Link from "next/link";

interface NavDataTypes {
  id: string;
  nameBn: string;
  icon: string;
}

const navDataPromise = async (): Promise<NavDataTypes[]> => {
  "use cache";

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

export default async function Navbar() {
  const navData = await navDataPromise();

  return (
    <header className="border-b bg-base-100">
      <div>
        {/* Top Header */}
        <div className="flex min-h-20 items-center justify-between gap-4">
          <Link href={"/"}>
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="বাজার দর"
                width={64}
                height={64}
                priority
                className="h-14 w-14 object-contain"
              />

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-base-content">
                  বাজার দর
                </h1>

                <div className="mt-0.5 text-xs font-medium text-base-content/60 sm:text-sm">
                  <Suspense fallback={<p>তারিখ লোড হচ্ছে...</p>}>
                    <CurrentDate />
                  </Suspense>
                </div>
              </div>
            </div>
          </Link>
          {/* Actions */}
          <div>
            <NavAuthAction />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2 overflow-x-auto py-3">
          <button className="btn btn-sm btn-ghost text-base md:text-lg">
            <BsListNested size={20} />
            ক্যাটাগরি
          </button>

          {navData.map((item) => (
            
            <Link href={item.id}
              key={item.id}
              className="btn btn-sm btn-ghost shrink-0 font-medium text-base md:text-lg"
            >
              {item.icon}
              {item.nameBn}
            </Link>
            
          ))}
        </nav>
      </div>
    </header>
  );
}
