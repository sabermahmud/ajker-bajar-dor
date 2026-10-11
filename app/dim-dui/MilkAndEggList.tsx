import { ProductData } from "../types/products-type";
import MilkAndEggProducts from "./MilkAndEggProducts";

const milkAndEggDataPromise = async (): Promise<ProductData[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products?category=dim-dui",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch milk and egg data");
  }

  const data: ProductData[] = await res.json();

  return data;
};

export default async function MilkAndEggList() {
  const milkAndEggData = await milkAndEggDataPromise();

  if (milkAndEggData.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
        দুধ ও ডিমের কোনো তথ্য পাওয়া যায়নি।
      </p>
    );
  }

  return <MilkAndEggProducts milkAndEggData={milkAndEggData} />;
}