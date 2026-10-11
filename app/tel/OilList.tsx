import type { ProductData } from "../types/products-type";
import OilProducts from "./OilProducts";

const oilDataPromise = async (): Promise<ProductData[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products?category=tel",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch oil data");
  }

  const data: ProductData[] = await res.json();
  return data;
};

export default async function OilList() {
  const oilData = await oilDataPromise();

  if (oilData.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
        কোনো তেলের তথ্য পাওয়া যায়নি।
      </p>
    );
  }

  return <OilProducts oilData={oilData} />;
}
