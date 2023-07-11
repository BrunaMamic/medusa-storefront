import { useProducts } from "medusa-react";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import DisplayCurrency from "@/components/DisplayCurrency";
import ProductFilter from "@/components/ProductFilter";

const Products = () => {
  const { products, isLoading } = useProducts();
  const [displayCurrency, setDisplayCurrency] = useState("eur");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (products && products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  const toggleCurrency = (currency: any) => {
    setDisplayCurrency(currency);
  };

  const filterProducts = (collection: any) => {
    if (collection) {
      const filtered = products?.filter(
        (product: any) => product.collection.title === collection
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };
  return (
    <div>
      <div
        className="header relative bg-cover bg-center h-[500px]"
        style={{ backgroundImage: "url('/static/header.jpg')" }}>
      </div>

      <div className="flex flex-row-reverse items-baseline justify-between m-4">
        <DisplayCurrency onCurrencyChange={toggleCurrency} />
        <ProductFilter products={products} filterProducts={filterProducts} />
      </div>
      <div className="flex flex-wrap m-4">
        {filteredProducts?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            displayCurrency={displayCurrency}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
