import { ProductData } from "../types/products-type";
import { Suspense } from "react";
import { FaCaretDown, FaCaretUp, FaMinus } from "react-icons/fa";

const vegetableDataPromise = async (): Promise<ProductData[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products?category=sobji",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch vegetable data");
  }

  const data: ProductData[] = await res.json();
  return data;
};

async function VegetableList() {
  const vegetableData = await vegetableDataPromise();

  if (vegetableData.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
        কোনো সবজির তথ্য পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <section className="mt-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-600">
            বাজারদর আপডেট
          </p>

          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            সবজির বাজারদর
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            প্রতিদিনের সবজির দাম এক নজরে দেখুন।
          </p>
        </div>

        <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          মোট {vegetableData.length.toLocaleString("bn-BD")}টি পণ্য
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {vegetableData.map((vegetable) => {
          const priceChange =
            vegetable.yesterday > 0
              ? ((vegetable.today - vegetable.yesterday) /
                  vegetable.yesterday) *
                100
              : 0;

          const isPriceUp = priceChange > 0;
          const isPriceDown = priceChange < 0;

          return (
            <article
              key={vegetable.id}
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-4xl transition-colors group-hover:bg-emerald-100">
                  {vegetable.image}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-lg font-bold text-gray-800">
                    {vegetable.nameBn}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {vegetable.categoryNameBn}
                  </p>

                  <span className="mt-2 inline-block rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                    প্রতি {vegetable.unit === "kg" ? "কেজি" : vegetable.unit}
                  </span>
                </div>
              </div>

              <div className="my-5 border-t border-dashed border-gray-200" />

              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">আজকের দাম</p>

                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold tracking-tight text-gray-900">
                      ৳{vegetable.today.toLocaleString("bn-BD")}
                    </span>

                    <span className="text-sm text-gray-500">
                      / {vegetable.unit === "kg" ? "কেজি" : vegetable.unit}
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
          );
        })}
      </div>
    </section>
  );
}

export default function VegetablePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="h-56 animate-pulse rounded-2xl border border-gray-200 bg-gray-100"
              />
            ))}
          </div>
        }
      >
        <VegetableList />
      </Suspense>
    </main>
  );
}
