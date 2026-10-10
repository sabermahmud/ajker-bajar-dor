import { ProductData } from "@/app/types/products-type";
import Link from "next/link";
import { Suspense } from "react";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaChartLine,
  FaLocationDot,
  FaStore,
} from "react-icons/fa6";

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

function formatPrice(price: number) {
  return `৳${Number(price).toLocaleString("bn-BD")}`;
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
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-5 w-48 animate-pulse rounded bg-base-300" />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="min-h-80 animate-pulse rounded-3xl bg-base-200" />

        <div className="space-y-4 rounded-3xl border border-base-300 p-6">
          <div className="h-6 w-28 animate-pulse rounded bg-base-300" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-base-300" />
          <div className="h-16 w-1/2 animate-pulse rounded bg-base-200" />
          <div className="h-24 animate-pulse rounded-2xl bg-base-200" />
        </div>
      </div>

      <div className="h-48 animate-pulse rounded-3xl bg-base-200" />
    </main>
  );
}

async function ProductDetails({ params }: ProductsDetailsPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isSafeInteger(productId) || productId <= 0) {
    return <ProductNotFound />;
  }

  const products = await productsDataPromise();

  const product = products.find((item) => Number(item.id) === productId);

  if (!product) {
    return <ProductNotFound />;
  }

  const priceChange =
    product.yesterday > 0
      ? ((product.today - product.yesterday) / product.yesterday) * 100
      : 0;

  const isPriceUp = priceChange > 0;
  const isPriceDown = priceChange < 0;

  const markets = product.markets ?? [];

  // Find overall minimum and maximum prices across all markets.
  const validMarkets = markets.filter(
    (market) =>
      Number.isFinite(Number(market.min)) &&
      Number.isFinite(Number(market.max)),
  );

  const lowestMarket = validMarkets.reduce<
    (typeof validMarkets)[number] | null
  >(
    (lowest, market) =>
      !lowest || Number(market.min) < Number(lowest.min) ? market : lowest,
    null,
  );

  const highestMarket = validMarkets.reduce<
    (typeof validMarkets)[number] | null
  >(
    (highest, market) =>
      !highest || Number(market.max) > Number(highest.max) ? market : highest,
    null,
  );

  const averagePrice =
    validMarkets.length > 0
      ? validMarkets.reduce(
          (total, market) =>
            total + (Number(market.min) + Number(market.max)) / 2,
          0,
        ) / validMarkets.length
      : 0;

  const sortedMarkets = [...validMarkets].sort(
    (a, b) => Number(a.min) - Number(b.min),
  );

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-sm text-base-content/60"
      >
        <Link href="/" className="transition hover:text-success">
          হোম
        </Link>
        <span>/</span>
        <Link href="/#allProducts" className="transition hover:text-success">
          সব পণ্য
        </Link>
        <span>/</span>
        <span className="font-semibold text-base-content">
          {product.nameBn}
        </span>
      </nav>

      {/* Product Overview */}
      <section className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
        <div className="grid lg:grid-cols-2">
          <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-linear-to-br from-success/10 via-base-100 to-success/5 p-8 sm:min-h-96 sm:p-12 lg:min-h-[460px]">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-success/10 blur-3xl sm:size-72"
            />

            <div className="relative flex size-44 items-center justify-center rounded-full border border-success/15 bg-base-100 text-8xl shadow-xl shadow-success/5 sm:size-56 sm:text-9xl">
              <span role="img" aria-label={product.nameBn}>
                {product.image}
              </span>
            </div>

            <div className="absolute left-4 top-4 rounded-full border border-success/20 bg-base-100/90 px-3 py-2 text-xs font-bold text-success shadow-sm backdrop-blur sm:left-5 sm:top-5 sm:px-4">
              {product.categoryNameBn}
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-base-100/90 px-3 py-2 text-xs font-medium text-base-content/70 shadow-sm backdrop-blur sm:bottom-5 sm:right-5">
              <FaStore className="text-success" />
              বাজারের তথ্য
            </div>
          </div>

          <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-12">
            <p className="text-sm font-semibold tracking-wide text-success">
              পণ্যের বিস্তারিত
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
              {product.nameBn}
            </h1>

            <p className="mt-3 text-sm text-base-content/50">
              পণ্যের আইডি: {Number(product.id).toLocaleString("bn-BD")}
            </p>

            {/* Today's Price */}
            <div className="mt-6 rounded-2xl border border-success/20 bg-success/5 p-5 sm:mt-8 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-base-content/70">
                  আজকের বাজারদর
                </p>
                <FaChartLine className="text-lg text-success" />
              </div>

              <div className="mt-3 flex flex-wrap items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-success sm:text-5xl">
                  {formatPrice(product.today)}
                </span>
                <span className="text-sm text-base-content/60">
                  / {product.unit}
                </span>
              </div>

              <div
                className={`mt-5 inline-flex flex-wrap items-center gap-2 rounded-full px-3 py-2 text-sm font-bold ${
                  isPriceUp
                    ? "bg-error/10 text-error"
                    : isPriceDown
                      ? "bg-success/10 text-success"
                      : "bg-base-200 text-base-content/70"
                }`}
              >
                {isPriceUp ? (
                  <FaArrowUp />
                ) : isPriceDown ? (
                  <FaArrowDown />
                ) : null}

                <span>
                  {priceChange > 0 ? "+" : ""}
                  {priceChange.toLocaleString("bn-BD", {
                    maximumFractionDigits: 2,
                  })}
                  %
                </span>

                <span>
                  {isPriceUp
                    ? "দাম বেড়েছে"
                    : isPriceDown
                      ? "দাম কমেছে"
                      : "দামের পরিবর্তন নেই"}
                </span>
                <span className="font-normal opacity-70">
                  (গতকালের তুলনায়)
                </span>
              </div>
            </div>

            {/* Price History */}
            <div className="mt-6">
              <h2 className="mb-3 text-sm font-bold text-base-content">
                দামের তুলনা
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <PriceCard
                  label="গতকালের দাম"
                  price={product.yesterday}
                  unit={product.unit}
                />
                <PriceCard
                  label="গত সপ্তাহের দাম"
                  price={product.lastWeek}
                  unit={product.unit}
                />
              </div>
            </div>

            <Link
              href="/#allProducts"
              className="btn mt-7 h-12 rounded-xl border-0 bg-success text-base font-bold text-success-content shadow-sm transition hover:-translate-y-0.5 hover:bg-success/90"
            >
              <FaArrowLeft />
              সব পণ্যে ফিরে যান
            </Link>
          </div>
        </div>
      </section>

      {/* Market-wise Price Comparison */}
      <section className="space-y-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-success">
              <FaLocationDot />
              বাজারভিত্তিক তথ্য
            </div>

            <h2 className="mt-2 text-2xl font-extrabold text-base-content sm:text-3xl">
              {product.nameBn} — বাজারদর
            </h2>

            <p className="mt-2 text-sm leading-6 text-base-content/60">
              বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম এক নজরে তুলনা করুন।
            </p>
          </div>

          <div className="w-fit rounded-full border border-base-300 bg-base-100 px-4 py-2 text-sm font-semibold text-base-content/70">
            মোট {markets.length.toLocaleString("bn-BD")}টি বাজার
          </div>
        </div>

        {validMarkets.length > 0 ? (
          <>
            {/* Price Summary */}
            <div className="grid gap-4 sm:grid-cols-3">
              <SummaryCard
                label="সর্বনিম্ন দাম"
                marketName={lowestMarket!.market}
                price={Number(lowestMarket!.min)}
                unit={product.unit}
                tone="success"
                icon={<FaArrowDown />}
              />

              <SummaryCard
                label="সর্বোচ্চ দাম"
                marketName={highestMarket!.market}
                price={Number(highestMarket!.max)}
                unit={product.unit}
                tone="error"
                icon={<FaArrowUp />}
              />

              <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-base-content/60">
                    গড় বাজারদর
                  </p>

                  <span className="flex size-10 items-center justify-center rounded-xl bg-warning/10 text-warning">
                    <FaChartLine />
                  </span>
                </div>

                <p className="mt-3 text-2xl font-extrabold text-base-content sm:text-3xl">
                  {formatPrice(averagePrice)}
                </p>

                <p className="mt-2 text-xs text-base-content/50">
                  প্রতি {product.unit} · সব বাজারের গড়
                </p>
              </div>
            </div>

            {/* Market Price Table */}
            <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
              <div className="flex flex-col gap-2 border-b border-base-300 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div>
                  <h3 className="text-lg font-bold text-base-content">
                    বাজারভিত্তিক আজকের দাম
                  </h3>
                  <p className="mt-1 text-xs text-base-content/50">
                    প্রতি {product.unit} হিসেবে দাম দেখানো হয়েছে
                  </p>
                </div>

                <span className="flex w-fit items-center gap-2 rounded-full bg-success/10 px-3 py-2 text-xs font-semibold text-success">
                  <FaStore />
                  {sortedMarkets.length.toLocaleString("bn-BD")}টি বাজারের তথ্য
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="table w-full min-w-[620px]">
                  <thead>
                    <tr className="bg-base-200/70 text-xs uppercase text-base-content/60">
                      <th className="py-4">ক্রম</th>
                      <th>বাজারের নাম</th>
                      <th>বিভাগ</th>
                      <th className="text-right">সর্বনিম্ন দাম</th>
                      <th className="text-right">সর্বোচ্চ দাম</th>
                    </tr>
                  </thead>

                  <tbody>
                    {sortedMarkets.map((market, index) => (
                      <tr
                        key={`${market.division}-${market.market}-${index}`}
                        className="transition-colors hover:bg-success/5"
                      >
                        <td className="font-medium text-base-content/50">
                          {(index + 1).toLocaleString("bn-BD")}
                        </td>

                        <td>
                          <div className="flex items-center gap-3">
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                              <FaStore />
                            </span>
                            <span className="font-semibold text-base-content">
                              {market.market}
                            </span>
                          </div>
                        </td>

                        <td>
                          <span className="inline-flex items-center gap-1.5 text-sm text-base-content/60">
                            <FaLocationDot className="text-success" />
                            {market.division}
                          </span>
                        </td>

                        <td className="text-right">
                          <span className="font-bold text-success">
                            {formatPrice(Number(market.min))}
                          </span>
                        </td>

                        <td className="text-right">
                          <span className="font-bold text-error">
                            {formatPrice(Number(market.max))}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-base-300 bg-base-200/30 px-4 py-3 text-xs leading-5 text-base-content/50 sm:px-5">
                <span className="font-semibold">মনে রাখুন:</span> বাজারভেদে দাম
                ভিন্ন হতে পারে। এখানে API-তে পাওয়া তথ্য দেখানো হয়েছে।
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-base-300 bg-base-200/40 px-6 py-12 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-base-200 text-2xl">
              <FaStore />
            </div>

            <h3 className="mt-4 text-lg font-bold text-base-content">
              বাজারের তথ্য পাওয়া যায়নি
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-base-content/60">
              এই পণ্যের জন্য বর্তমানে কোনো বাজারভিত্তিক দামের তথ্য নেই।
            </p>
          </div>
        )}
      </section>

      {/* Bottom Navigation */}
      <div className="flex justify-center border-t border-base-300 pt-8">
        <Link
          href="/#allProducts"
          className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-success transition-colors hover:bg-success/10"
        >
          আরও পণ্য দেখুন
          <FaArrowRight />
        </Link>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  marketName,
  price,
  unit,
  tone,
  icon,
}: {
  label: string;
  marketName: string;
  price: number;
  unit: string;
  tone: "success" | "error";
  icon: React.ReactNode;
}) {
  const isSuccess = tone === "success";

  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-base-content/60">{label}</p>

        <span
          className={`flex size-10 items-center justify-center rounded-xl ${
            isSuccess ? "bg-success/10 text-success" : "bg-error/10 text-error"
          }`}
        >
          {icon}
        </span>
      </div>

      <p
        className={`mt-3 text-2xl font-extrabold sm:text-3xl ${
          isSuccess ? "text-success" : "text-error"
        }`}
      >
        {formatPrice(price)}
      </p>

      <p className="mt-2 truncate text-sm font-semibold text-base-content">
        {marketName}
      </p>

      <p className="mt-1 text-xs text-base-content/50">প্রতি {unit}</p>
    </div>
  );
}

function PriceCard({
  label,
  price,
  unit,
}: {
  label: string;
  price: number;
  unit: string;
}) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4 transition-colors hover:border-success/30">
      <p className="text-sm font-medium text-base-content/60">{label}</p>

      <p className="mt-2 text-xl font-extrabold text-base-content sm:text-2xl">
        {formatPrice(price)}
      </p>

      <p className="mt-1 text-xs text-base-content/50">প্রতি {unit}</p>
    </div>
  );
}

function ProductNotFound() {
  return (
    <main className="flex min-h-[55vh] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="flex size-20 items-center justify-center rounded-3xl bg-success/10 text-4xl">
        🛒
      </div>

      <h1 className="mt-6 text-2xl font-extrabold text-base-content sm:text-3xl">
        পণ্যটি খুঁজে পাওয়া যায়নি
      </h1>

      <p className="mt-3 max-w-md text-sm leading-7 text-base-content/60">
        পণ্যটির তথ্য পাওয়া যায়নি অথবা পণ্যের লিংকটি সঠিক নয়। সব পণ্য থেকে
        আপনার পছন্দের পণ্যটি খুঁজে নিন।
      </p>

      <Link
        href="/#allProducts"
        className="btn mt-6 rounded-xl border-0 bg-success px-6 text-success-content hover:bg-success/90"
      >
        <FaArrowLeft />
        সব পণ্য দেখুন
      </Link>
    </main>
  );
}
