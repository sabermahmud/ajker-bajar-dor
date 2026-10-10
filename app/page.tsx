import Products from "./Components/Products/Products";
import { ProductData } from "./types/products-type";

const productsDataPromise = async ():Promise<ProductData[]> => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

export default async function Home() {
  const products = await productsDataPromise();

  return (
    <>
      <div>
        <h3 className="text-xl md:text-2xl lg:text-4xl">সব পণ্য</h3>
        <p className="text-lg">মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</p>
        <div className="grid grid-cols-1 md:grid-cols-3   gap-4">
          {products.map((product) => (
            <Products key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
