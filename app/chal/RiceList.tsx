import { ProductData } from "../types/products-type";
import RiceProducts from "./RiceProducts";

const riceDataPromise = async (): Promise<ProductData[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products?category=chal",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch rice data");
  }

  const data: ProductData[] = await res.json();

  return data;
};

export default async function RiceList() {
  const riceData = await riceDataPromise();

  if (riceData.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
        কোনো চালের তথ্য পাওয়া যায়নি।
      </p>
    );
  }

  return <RiceProducts riceData={riceData} />;
}