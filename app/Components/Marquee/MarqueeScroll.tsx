import { ProductData } from "@/app/types/products-type";
import MarqueeData from "./MarqueeData";

const productsDataPromise = async (): Promise<ProductData[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
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
