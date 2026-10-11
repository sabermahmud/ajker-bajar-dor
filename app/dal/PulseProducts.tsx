"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ProductData } from "../types/products-type";
import { FaCaretDown, FaCaretUp, FaMinus } from "react-icons/fa";

interface PulseProductsProps {
  pulseData: ProductData[];
}

export default function PulseProducts({ pulseData }: PulseProductsProps) {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedPulseData = useMemo(() => {
    const products = [...pulseData];

    if (sortOrder === "low-to-high") {
      return products.sort((a, b) => Number(a.today) - Number(b.today));
    }

    if (sortOrder === "high-to-low") {
      return products.sort((a, b) => Number(b.today) - Number(a.today));
    }

    return products;
  }, [pulseData, sortOrder]);

  return (
    <section className="mt-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-600">
            বাজারদর আপডেট
          </p>

          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            ডালের বাজারদর
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            প্রতিদিনের ডালের দাম এক নজরে দেখুন।
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            মোট {pulseData.length.toLocaleString("bn-BD")}টি পণ্য
          </span>

          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            aria-label="দাম অনুযায়ী পণ্য সাজান"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:w-56"
          >
            <option value="default">দাম অনুযায়ী সাজান</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPulseData.map((pulse) => {
          const today = Number(pulse.today);
          const yesterday = Number(pulse.yesterday);

          const priceChange =
            yesterday > 0 ? ((today - yesterday) / yesterday) * 100 : 0;

          const isPriceUp = priceChange > 0;
          const isPriceDown = priceChange < 0;

          return (
            <Link
              href={`/allProducts/${pulse.id}`}
              key={pulse.id}
              className="group block h-full"
            >
              <article className="h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-4xl transition-colors group-hover:bg-emerald-100">
                    {pulse.image}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-lg font-bold text-gray-800">
                      {pulse.nameBn}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {pulse.categoryNameBn}
                    </p>

                    <span className="mt-2 inline-block rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      প্রতি {pulse.unit === "kg" ? "কেজি" : pulse.unit}
                    </span>
                  </div>
                </div>

                <div className="my-5 border-t border-dashed border-gray-200" />

                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      আজকের দাম
                    </p>

                    <div className="mt-1 flex flex-wrap items-baseline gap-1">
                      <span className="text-3xl font-extrabold tracking-tight text-gray-900">
                        ৳{today.toLocaleString("bn-BD")}
                      </span>

                      <span className="text-sm text-gray-500">
                        / {pulse.unit === "kg" ? "কেজি" : pulse.unit}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex shrink-0 items-center gap-1 rounded-xl px-3 py-2 text-sm font-bold ${
                      isPriceUp
                        ? "bg-red-50 text-red-600"
                        : isPriceDown
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isPriceUp ? (
                      <FaCaretUp size={16} />
                    ) : isPriceDown ? (
                      <FaCaretDown size={16} />
                    ) : (
                      <FaMinus size={12} />
                    )}

                    <span>
                      {Math.abs(priceChange).toLocaleString("bn-BD", {
                        maximumFractionDigits: 2,
                      })}
                      %
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
