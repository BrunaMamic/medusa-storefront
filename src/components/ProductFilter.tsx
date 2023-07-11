import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const ProductFilter = ({ products, filterProducts }: any) => {
  const [collectionTitles, setCollectionTitles] = useState<any>([]);
  const [selectedCollection, setSelectedCollection] = useState<any>("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (products) {
      const titles = Array.from(
        new Set(products.map((product: any) => product.collection.title))
      );
      setCollectionTitles(titles);
    }
  }, [products]);

  const handleCollectionChange = (collection: string) => {
    setSelectedCollection(collection);
    filterProducts(collection);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className='h-[90px]'>
      <div className="flex items-center mb-4">
        <button
          className="flex items-center focus:outline-none"
          onClick={toggleFilters}>
          <FontAwesomeIcon
            icon={faFilter}
            className="mr-2"
            style={{ color: "#838486" }}
          />
          Show Collections
        </button>
      </div>

      {showFilters && (
        <div className="mb-4">
          <button
            className={` m-2 px-3 py-2 ${
              selectedCollection === "" ? "bg-gray-300" : ""
            }`}
            onClick={() => handleCollectionChange("")}>
            All
          </button>
          {collectionTitles.map((title: any, index: number) => (
            <button
              key={index}
              className={` m-2 px-3 py-2  ${
                selectedCollection === title ? "bg-gray-300" : ""
              }`}
              onClick={() => handleCollectionChange(title)}>
              {title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
