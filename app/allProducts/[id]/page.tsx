import { ProductData } from "@/app/types/products-type";
import Link from "next/link";
import { Suspense } from "react";

interface ProductsDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function productsDataPromise(): Promise<ProductData[]> {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default function ProductsDetailsPage({
  params,
}: ProductsDetailsPageProps) {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

function ProductDetailsSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="animate-pulse space-y-5">
        <div className="h-5 w-32 rounded bg-gray-200" />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="h-80 rounded-3xl bg-gray-100" />
          <div className="space-y-4 py-4">
            <div className="h-8 w-3/4 rounded bg-gray-200" />
            <div className="h-5 w-1/2 rounded bg-gray-100" />
            <div className="h-12 w-2/3 rounded bg-gray-200" />
            <div className="h-24 rounded-2xl bg-gray-100" />
          </div>
        </div>
      </div>
    </main>
  );
}

async function ProductDetails({ params }: ProductsDetailsPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    return <ProductNotFound />;
  }

  const products = await productsDataPromise();

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return <ProductNotFound />;
  }

  const priceChange =
    product.yesterday > 0
      ? ((product.today - product.yesterday) / product.yesterday) * 100
      : 0;

  const isPriceUp = priceChange > 0;
  const isPriceDown = priceChange < 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Breadcrumb */}
      <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="transition hover:text-green-700">
          হোম
        </Link>
        <span>/</span>
        <Link href="/#allProducts" className="transition hover:text-green-700">
          সব পণ্য
        </Link>
        <span>/</span>
        <span className="font-medium text-gray-800">{product.nameBn}</span>
      </div>

      {/* Product Details */}
      <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="grid md:grid-cols-2">
          {/* Product Image */}
          <div className="flex min-h-72 items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-8 sm:p-12 md:min-h-[440px]">
            <div className="flex size-48 items-center justify-center rounded-full border border-green-100 bg-white text-8xl shadow-xl shadow-green-900/5 sm:size-60 sm:text-9xl">
              {product.image}
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <span className="mb-4 w-fit rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
              {product.categoryNameBn}
            </span>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product.nameBn}
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              পণ্যের আইডি: {product.id}
            </p>

            {/* Current Price */}
            <div className="mt-8 rounded-2xl border border-green-100 bg-green-50/70 p-5">
              <p className="text-sm font-medium text-gray-600">আজকের বাজারদর</p>

              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-green-800 sm:text-5xl">
                  ৳{product.today.toLocaleString("bn-BD")}
                </span>

                <span className="text-sm text-gray-500">/ {product.unit}</span>
              </div>

              {/* Price Change */}
              <div
                className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${
                  isPriceUp
                    ? "bg-red-100 text-red-700"
                    : isPriceDown
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                <span>{isPriceUp ? "▲" : isPriceDown ? "▼" : "—"}</span>

                <span>
                  {priceChange > 0 ? "+" : ""}
                  {priceChange.toLocaleString("bn-BD", {
                    maximumFractionDigits: 2,
                  })}
                  %{" "}
                  {isPriceUp
                    ? "দাম বেড়েছে"
                    : isPriceDown
                      ? "দাম কমেছে"
                      : "দামের পরিবর্তন নেই"}
                </span>
              </div>
            </div>

            {/* Price Comparison */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">গতকালের দাম</p>
                <p className="mt-2 text-xl font-bold text-gray-800">
                  ৳{product.yesterday.toLocaleString("bn-BD")}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">গত সপ্তাহের দাম</p>
                <p className="mt-2 text-xl font-bold text-gray-800">
                  ৳{product.lastWeek.toLocaleString("bn-BD")}
                </p>
              </div>
            </div>

            <Link
              href="/#allProducts"
              className="btn mt-8 h-12 rounded-xl border-0 bg-green-700 text-base font-semibold text-white shadow-md shadow-green-700/15 hover:bg-green-800"
            >
              ← সব পণ্যে ফিরে যান
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductNotFound() {
  return (
    <div>
      <main className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-gray-100 text-4xl">
          🛒
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          পণ্যটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-3 max-w-md text-gray-500">
          পণ্যের তথ্য পাওয়া যায়নি। সঠিক লিংক ব্যবহার করে আবার চেষ্টা করুন।
        </p>

        <Link
          href="/#allProducts"
          className="btn mt-6 rounded-xl border-0 bg-green-700 text-white hover:bg-green-800"
        >
          সব পণ্য দেখুন
        </Link>
      </main>
    </div>
  );
}
