/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { getPriceByCurrency } from "@/utils/getPriceByCurrency";

const AddToCart = ({
  prod,
  currentImageIndex,
  selectedSize,
  selectedColor,
  selectedQuantity,
  displayCurrency,
  closeModal,
  isModalOpen,
}: any) => {  
  return isModalOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="bg-white rounded-lg p-4 shadow-md max-w-sm">
          <p className="text-lg font-semibold mb-4">Added to Cart</p>
          <img
            src={prod.images[currentImageIndex]?.url}
            alt={prod.title}
            className="mb-4"
          />
          <div className="text-lg font-semibold">Size: {selectedSize} </div>
          <div className="text-lg font-semibold">Color: {selectedColor}</div>
          <div className="text-lg font-semibold">
            Quantity: {selectedQuantity}
          </div>
          <div className="text-lg font-semibold">
            Total:{" "}
            {getPriceByCurrency(prod.variants[0].prices, displayCurrency, selectedQuantity)}
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={closeModal}>
              Close
            </button>
            <Link href="/Products" className={"py-2 px-4 rounded"}>
              Back
            </Link>
          </div>
        </div>
      </div>
  ) : null;
};

export default AddToCart;
