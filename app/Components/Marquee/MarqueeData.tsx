import { ProductData } from "@/app/types/products-type";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export interface MarqueeDataProps {
  product: ProductData;
}

export default function MarqueeData({ product }: MarqueeDataProps) {
  const priceChange =
    product.yesterday > 0
      ? ((product.today - product.yesterday) / product.yesterday) * 100
      : 0;
  const isPriceUp = priceChange > 0;
  const isPriceDown = priceChange < 0;
  return (
    <>
      <div className="flex items-center gap-2 text-black">
        <p>{product.image}</p>
        <h3>{product.nameBn}</h3>
        <p>{product.today.toLocaleString("bn-BD")}</p>
        <div
          className={`flex items-center gap-1 rounded-full text-sm font-semibold ${
            isPriceUp
              ? " text-red-600"
              : isPriceDown
                ? " text-emerald-600"
                : " text-gray-600"
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
    </>
  );
}
