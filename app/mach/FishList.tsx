import { ProductData } from "../types/products-type";
import FishProducts from "./FishProducts";

const fishDataPromise = async (): Promise<ProductData[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products?category=mach",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch fish data");
  }

  const data: ProductData[] = await res.json();

  return data;
};

export default async function FishList() {
  const fishData = await fishDataPromise();

  if (fishData.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
        কোনো মাছের তথ্য পাওয়া যায়নি।
      </p>
    );
  }

  return <FishProducts fishData={fishData} />;
}