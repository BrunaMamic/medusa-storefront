import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductImg from "@/components/ProductImg";
import DisplayCurrency from "@/components/DisplayCurrency";
import { GetServerSidePropsContext } from "next";
import ProductVariants from "@/components/ProductVariants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import AddToCart from "@/components/AddToCart";
import { getPriceByCurrency } from "@/utils/getPriceByCurrency";

const Product = ({ product }: any) => {
  const [prod, setProd] = useState(product.product);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [displayCurrency, setDisplayCurrency] = useState("eur");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isAddToCartEnabled, setIsAddToCartEnabled] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setProd(product.product)
    const colors = Array.from(
      new Set(
        prod.options
          .find((option: any) => option.title === "Color")
          ?.values.map((color: any) => color.value)
      )
    );
    if (colors.length) {
      setSelectedColor(colors[0] as string);
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleSizeClick = (size: any) => {
    setSelectedSize(size);
    setIsAddToCartEnabled(true);
  };

  const handleColorChange = (color: any) => {
    setSelectedColor(color);
  };

  const handleIncreaseQuantity = () => {
    if (selectedQuantity < prod.variants[0].inventory_quantity) {
      setSelectedQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleSelectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="h-screen">
      <div className="flex flex-row items-baseline justify-between mb-3 mx-3">
        <Link href="/Products">
          <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6" />
        </Link>

        <Link href="/Products">
          <p className="text-lg font-semibold">MEDUSA STORE</p>
        </Link>

        <DisplayCurrency
          displayCurrency={displayCurrency}
          onCurrencyChange={setDisplayCurrency}
        />
      </div>
      <div className="flex flex-row items-center justify-center 3xl:max-w-screen-xl max-w-screen-lg m-auto">
        <ProductImg
          images={prod.images}
          currentImageIndex={currentImageIndex}
          handlePrevImage={() =>
            setCurrentImageIndex((prevIndex) => prevIndex - 1)
          }
          handleNextImage={() =>
            setCurrentImageIndex((prevIndex) => prevIndex + 1)
          }
          handleSelectImage={handleSelectImage}
        />

        <div className="ml-8">
          <h1 className="text-2xl font-bold">{prod.title}</h1>
          <div className="mt-4 mb-4">{prod.description}</div>

          <p className="text-2xl font-bold">
            {getPriceByCurrency(prod.variants[0].prices, displayCurrency, selectedQuantity)}
          </p>

          <ProductVariants
            selectedSize={selectedSize}
            handleSizeClick={handleSizeClick}
            selectedColor={selectedColor}
            handleColorChange={handleColorChange}
            selectedQuantity={selectedQuantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
            options={prod.options}
          />

          <div className="flex mt-4 mr-4">
            <button
              className={`py-2 px-4 rounded ${
                isAddToCartEnabled
                  ? "bg-gray-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isAddToCartEnabled}
              onClick={() => setIsModalOpen(true)}>
              Add to Cart
            </button>
          </div>

          <AddToCart
            prod={prod}
            currentImageIndex={currentImageIndex}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            selectedQuantity={selectedQuantity}
            displayCurrency={displayCurrency}
            closeModal={closeModal}
            isModalOpen={isModalOpen}
          />

          <div className="mt-4 flex flex-row items-baseline justify-between">
            <div className="flex flex-col items-start">
              <button
                className="text-blue-500 underline cursor-pointer"
                onClick={toggleDetails}>
                See more
              </button>
              {showDetails && (
                <div>
                  Material: {prod.variants[0].material} <br />
                  Collection: {prod.collection.title} <br />
                  Type: {prod.handle}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  req,
  res,
  params,
}: GetServerSidePropsContext) => {
  if (params?.id) {
    const res = await fetch(
      `http://localhost:9000/store/products/${params.id}`
    );
    const resJson = await res.json();

    if (resJson) {
      return {
        props: {
          product: resJson,
        },
      };
    }
  }
  return { props: {} };
};

export default Product;
