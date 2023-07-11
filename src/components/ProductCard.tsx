/* eslint-disable @next/next/no-img-element */
import { getPriceByCurrency } from "@/utils/getPriceByCurrency";
import Link from "next/link";

const ProductCard = ({ product, displayCurrency }: any) => {
  return (
    <div
      key={product.id}
      className="w-full md:w-1/2 lg:w-1/4 p-5 h-full transform transition-transform duration-300 hover:scale-110 relative">
      <div className="relative">
        <Link href={`/Products/${product.id}`}>
          <img
            src={product.images[0].url}
            alt={product.title}
            className="w-full"
          />
        </Link>
        <div className="absolute bottom-0 left-0 right-0 bg-gray-200 bg-opacity-85 text-gray p-2">
          <div className="text-lg font-semibold">{product.title}</div>
          <div>
            {getPriceByCurrency(product.variants[0].prices, displayCurrency, 1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
