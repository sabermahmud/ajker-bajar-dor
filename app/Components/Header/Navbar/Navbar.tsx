import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import CurrentDate from "../../CurrentDate";
import NavAuthAction from "./NavAuthAction";
import CategoryNavigation from "./CategoryNavigation";

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
    <header className="sticky top-0 z-50 border-b border-base-300/70 bg-base-100/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex min-h-20 items-center justify-between gap-3 py-3">
          {/* Brand */}
          <Link
            href="/"
            aria-label="বাজার দর - হোম"
            className="group flex min-w-0 items-center gap-2.5 rounded-xl transition-opacity hover:opacity-80 sm:gap-3"
          >
            <div className="relative shrink-0 rounded-2xl bg-success/10 p-1.5 ring-1 ring-success/15 transition-transform duration-200 group-hover:scale-105 sm:p-2">
              <Image
                src="/logo.png"
                alt="বাজার দর"
                width={56}
                height={56}
                priority
                className="size-10 object-contain sm:size-12"
              />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-xl font-extrabold tracking-tight text-base-content sm:text-2xl">
                বাজার দর
              </h1>

              

              <div className="mt-1 hidden text-xs text-base-content/50 sm:block">
                <Suspense
                  fallback={
                    <span className="inline-block h-3 w-24 animate-pulse rounded bg-base-300" />
                  }
                >
                  <CurrentDate />
                </Suspense>
              </div>
            </div>
          </Link>

          {/* Header Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <NavAuthAction />
          </div>
        </div>

        {/* Category Navigation */}
        <Suspense
          fallback={
            <div className="flex gap-2 overflow-hidden border-t border-base-300/60 py-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-10 w-24 shrink-0 animate-pulse rounded-xl bg-base-300"
                />
              ))}
            </div>
          }
        >

          <CategoryNavigation navData={navData} />
        </Suspense>
      </div>
    </header>
  );
}
