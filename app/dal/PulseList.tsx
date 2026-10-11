import { ProductData } from "../types/products-type";
import PulseProducts from "./PulseProducts";

const pulseDataPromise = async (): Promise<ProductData[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products?category=dal",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch pulse data");
  }

  const data: ProductData[] = await res.json();

  return data;
};

export default async function PulseList() {
  const pulseData = await pulseDataPromise();

  if (pulseData.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
        কোনো ডালের তথ্য পাওয়া যায়নি।
      </p>
    );
  }

  return <PulseProducts pulseData={pulseData} />;
}