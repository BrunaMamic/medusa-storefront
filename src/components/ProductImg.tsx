/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const ProductImg = ({
  images,
  currentImageIndex,
  handlePrevImage,
  handleNextImage,
  handleSelectImage,
}: any) => {

  return (
    <div className="relative ml-5 mb-5 ">
      <img
        src={images[currentImageIndex]?.url}
        alt={images[currentImageIndex]?.title}
      />
      <div className="flex justify-center mt-2">
        {images.map((image: any, index: number) => (
          <img
            key={index}
            src={image.url}
            alt={image.title}
            className={`w-20 h-20 object-cover rounded-full cursor-pointer ${
              index === currentImageIndex ? "border-2 border-gray-500" : ""
            }`}
            onClick={() => handleSelectImage(index)}
          />
        ))}
      </div>

      {currentImageIndex > 0 && (
        <div
          className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 text-white bg-black cursor-pointer"
          style={{ backgroundColor: "#b5b6b74f" }}
          onClick={handlePrevImage}>
          <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6" />
        </div>
      )}

      {currentImageIndex < images.length - 1 && (
        <div
          className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 text-white bg-darkgray cursor-pointer"
          style={{ backgroundColor: "#b5b6b74f" }}
          onClick={handleNextImage}>
          <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default ProductImg;
