import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import AllProductsPage from "./allProducts/page";
import CurrentDate from "./Components/CurrentDate";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative my-6 overflow-hidden rounded-3xl border border-green-100 bg-white px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Hero Content */}
          <div className="order-2 lg:order-1">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-green-600" />
              </span>
              <Suspense
                fallback={
                  <span className="inline-block h-4 w-28 animate-pulse rounded bg-green-100" />
                }
              >
                <CurrentDate />
              </Suspense>
            </div>

            <h1 className="max-w-2xl text-3xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম
              <span className="mt-2 block text-green-700">এক নজরে দেখুন</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম জানুন সহজেই। দেখুন
              বাজারদরের তুলনা, গড় দাম এবং প্রতিদিনের মূল্য পরিবর্তনের তথ্য এক
              জায়গায়।
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#allProducts"
                className="btn h-12 border-0 bg-green-700 px-7 text-base text-white shadow-md shadow-green-700/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-800"
              >
                সব পণ্যের দাম দেখুন
                <span aria-hidden="true" className="text-lg">
                  ↓
                </span>
              </Link>

             
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="relative w-full max-w-sm">
              <div
                aria-hidden="true"
                className="absolute inset-6 rounded-full bg-green-200/60 blur-3xl"
              />

              <div className="relative rounded-3xl border border-white/80 bg-white/70 p-5 shadow-xl shadow-green-900/5 backdrop-blur-sm sm:p-8">
                <Image
                  src="/logo.png"
                  alt="আজকের বাজারদর"
                  width={400}
                  height={400}
                  priority
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 400px"
                />

                <div className="mt-3 rounded-2xl bg-green-50 px-4 py-3 text-center">
                  <p className="font-bold text-green-800">
                    আপনার বাজার, আপনার হিসাব
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    নিত্যপ্রয়োজনীয় পণ্যের দাম এক জায়গায়
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section id="allProducts" className="scroll-mt-24 py-6">
        <AllProductsPage />
      </section>
    </>
  );
}
