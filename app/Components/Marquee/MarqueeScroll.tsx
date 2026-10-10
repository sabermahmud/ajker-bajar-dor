import { ProductData } from "@/app/types/products-type";
import MarqueeData from "./MarqueeData";

const productsDataPromise = async (): Promise<ProductData[]> => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

export default async function MarqueeScroll() {
    
  const products = await productsDataPromise();
  return (
    <>
      <div className=" flex  items-center gap-15 bg-white py-2">
        {products.map((product) => (
        <MarqueeData key={product.id} product={product}/>

      ))}
      </div>
    </>
  );
}
