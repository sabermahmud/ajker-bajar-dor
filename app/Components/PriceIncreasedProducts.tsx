
import { ProductData } from "@/app/types/products-type";
import Products from "./Products/Products";

const productsDataPromise = async (): Promise<ProductData[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

export default async function PriceIncreasedProducts() {
  const products = await productsDataPromise();

  const priceIncreasedProducts = products
    .filter(
      (product) =>
        product.change.dir === "up" && product.today > product.yesterday,
    )
    .slice(0, 6);

  return (
    <section className="my-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold md:text-3xl">
          📈 আজ যেসব পণ্যের দাম বেড়েছে
        </h2>

        <p className="mt-2 text-base">
          মোট {priceIncreasedProducts.length.toLocaleString("bn-BD")}
          টি পণ্য
        </p>
      </div>

      {priceIncreasedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {priceIncreasedProducts.map((product) => (
            <Products key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>আজ দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।</p>
      )}
    </section>
  );
}
