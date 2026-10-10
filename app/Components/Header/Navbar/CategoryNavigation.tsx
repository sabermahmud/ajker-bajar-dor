"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsListNested } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";

interface NavDataTypes {
  id: string;
  nameBn: string;
  icon: string;
}

interface CategoryNavigationProps {
  navData: NavDataTypes[];
}

export default function CategoryNavigation({
  navData,
}: CategoryNavigationProps) {
  const pathname = usePathname();

  const [isAllProductsActive, setIsAllProductsActive] = useState(false);

  useEffect(() => {
    const updateActiveState = () => {
      setIsAllProductsActive(
        window.location.hash === "#allProducts" ||
          pathname === "/allProducts" ||
          pathname.startsWith("/allProducts/"),
      );
    };

    updateActiveState();

    window.addEventListener("hashchange", updateActiveState);

    return () => {
      window.removeEventListener("hashchange", updateActiveState);
    };
  }, [pathname]);

  return (
    <nav
      aria-label="পণ্য ক্যাটাগরি"
      className="-mx-4 border-t border-base-300/60 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <div className="flex items-center gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* All Products */}
        <Link
          href="/#allProducts"
          aria-current={isAllProductsActive ? "location" : undefined}
          className={`relative btn btn-sm h-10 shrink-0 gap-2 rounded-xl px-4 text-sm font-bold transition-all duration-200 ${
            isAllProductsActive
              ? "border-0 bg-success text-success-content shadow-md shadow-success/20"
              : "border border-transparent bg-transparent text-base-content/75 hover:border-success/20 hover:bg-success/10 hover:text-success"
          }`}
        >
          <BsListNested size={17} />
          সব পণ্য

          {isAllProductsActive && (
            <span className="absolute inset-x-3 -bottom-3 h-0.5 rounded-full bg-success" />
          )}
        </Link>

        <div className="mx-1 h-6 w-px shrink-0 bg-base-300" />

        {/* Categories */}
        {navData.map((item) => {
          const href = `/${item.id}`;

          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={item.id}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`relative btn btn-sm h-10 shrink-0 gap-2 rounded-xl px-3 text-sm font-medium transition-all duration-200 sm:px-4 ${
                isActive
                  ? "border border-success/20 bg-success/10 font-bold text-success shadow-sm"
                  : "border border-transparent bg-transparent text-base-content/75 hover:border-success/20 hover:bg-success/10 hover:text-success"
              }`}
            >
              <span aria-hidden="true" className="text-base">
                {item.icon}
              </span>

              <span>{item.nameBn}</span>

              {isActive && (
                <span className="absolute inset-x-3 -bottom-3 h-0.5 rounded-full bg-success" />
              )}
            </Link>
          );
        })}

        {/* Browse All */}
        <Link
          href="/#allProducts"
          className="ml-auto hidden shrink-0 items-center gap-2 px-3 py-2 text-sm font-semibold text-success transition-colors hover:text-success/70 xl:flex"
        >
          সকল পণ্য
          <FaArrowRight size={12} />
        </Link>
      </div>
    </nav>
  );
}
