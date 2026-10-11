import { ProductData } from "../types/products-type";
import MeatProducts from "./MeatProducts";

const meatDataPromise = async (): Promise<ProductData[]> => {
const res = await fetch(
"https://openapi.programming-hero.com/api/bazardor/products?category=mangsho",
);

if (!res.ok) {
throw new Error("Failed to fetch meat data");
}

const data: ProductData[] = await res.json();

return data;
};

export default async function MeatList() {
const meatData = await meatDataPromise();

if (meatData.length === 0) {
return ( <p className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
কোনো মাংসের তথ্য পাওয়া যায়নি। </p>
);
}

return <MeatProducts meatData={meatData} />;
}
