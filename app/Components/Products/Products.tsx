import { ProductData } from "@/app/types/products-type";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export interface ProductsProps {
  product: ProductData;
}

export default function Products({ product }: ProductsProps) {
  const priceChange =
    product.yesterday > 0
      ? ((product.today - product.yesterday) / product.yesterday) * 100
      : 0;

  const isPriceUp = priceChange > 0;
  const isPriceDown = priceChange < 0;

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      {/* Product Information */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-4xl">
          {product.image}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-bold text-gray-800">
            {product.nameBn}
          </h2>
          <p className="mt-1 text-sm text-gray-500">প্রতি কেজি</p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-dashed border-gray-200" />

      {/* Price Information */}
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">আজকের দাম</p>

          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold tracking-tight text-gray-900">
              ৳{product.today.toLocaleString("bn-BD")}
            </span>
            <span className="text-sm text-gray-500">/ কেজি</span>
          </div>
        </div>

        <div
          className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold ${
            isPriceUp
              ? "bg-red-50 text-red-600"
              : isPriceDown
                ? "bg-emerald-50 text-emerald-600"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {isPriceUp ? (
            <FaCaretUp size={16} />
          ) : isPriceDown ? (
            <FaCaretDown size={16} />
          ) : null}

          <span>
            {/* {priceChange > 0 ? "+" : ""} */}
            {priceChange.toLocaleString("bn-BD", {
              maximumFractionDigits: 2,
            })}
            %
          </span>
        </div>
      </div>



    </div>
  );
}
