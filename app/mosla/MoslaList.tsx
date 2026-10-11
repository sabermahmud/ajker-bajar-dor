import { ProductData } from "../types/products-type";
import MoslaProducts from "./MoslaProducts";

const moslaDataPromise = async (): Promise<ProductData[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products?category=mosla",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch spice data");
  }

  const data: ProductData[] = await res.json();

  return data;
};

export default async function MoslaList() {
  const moslaData = await moslaDataPromise();

  if (moslaData.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
        কোনো মসলার তথ্য পাওয়া যায়নি।{" "}
      </p>
    );
  }

  return <MoslaProducts moslaData={moslaData} />;
}
