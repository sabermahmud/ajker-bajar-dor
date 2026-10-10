import Products from "../Components/Products/Products";
import { ProductData } from "../types/products-type";


const productsDataPromise = async (): Promise<ProductData[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
};

export default async function AllProductsPage() {
    const products = await productsDataPromise();


    return (<>
          {/* সব পণ্য */}
      <div className="my-6 flex flex-col gap-6">
        <div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl">সব পণ্য</h3>
          <p className="text-lg mt-1">
            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-4">
          {products.map((product) => (
            <Products key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>)
}