import React, { useEffect, useState } from "react";

const ProductVariants = ({
  selectedSize,
  handleSizeClick,
  selectedColor,
  handleColorChange,
  selectedQuantity,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  options,
  inventoryQuantity,
}: any) => {
  const [uniqueSizes, setUniqueSizes] = useState<any>([]);
  const [uniqueColors, setUniqueColors] = useState<any>([]);

  useEffect(() => {
    const sizes = Array.from(
      new Set(
        options
          .find((option: any) => option.title === "Size")
          ?.values.map((size: any) => size.value)
      )
    );
    setUniqueSizes(sizes);

    const colors = Array.from(
      new Set(
        options
          .find((option: any) => option.title === "Color")
          ?.values.map((color: any) => color.value)
      )
    );
    setUniqueColors(colors);
  }, [options]);



  return (
    <div>
      <div className="mt-4">
        <div className="flex">
          {uniqueSizes.map((size: any) => (
            <div
              key={size}
              className={`px-3 mr-3 py-2 border border-gray-300 rounded cursor-pointer ${
                size === selectedSize ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSizeClick(size)}>
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <select
          value={selectedColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded">
          {uniqueColors.map((color: any) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center mt-4">
        <label className="mr-3 font-bold">Quantity:</label>
        <button
          className="px-2 py-1 border border-gray-300 rounded cursor-pointer"
          onClick={handleDecreaseQuantity}>
          -
        </button>
        <span className="px-2">{selectedQuantity}</span>
        <button
          className="px-2 py-1 border border-gray-300 rounded cursor-pointer"
          onClick={handleIncreaseQuantity}>
          +
        </button>
      </div>
    </div>
  );
};

export default ProductVariants;
