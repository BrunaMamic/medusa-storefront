import { getPriceByCurrency } from "@/utils/getPriceByCurrency";
import { useState } from "react";

const DisplayCurrency = ({
  onCurrencyChange,
  prices,
  selectedQuantity,
}: any) => {
  const [displayCurrency, setDisplayCurrency] = useState("eur");

  const toggleCurrency = (currency: any) => {
    setDisplayCurrency(currency);
    onCurrencyChange(currency);
  };

  return (
    <div className="flex justify-end mt-4 mr-4">
      <button
        className={`mr-2 ${
          displayCurrency === "eur" ? "font-bold" : "font-normal"
        }`}
        onClick={() => toggleCurrency("eur")}>
        EUR
      </button>
      <button
        className={`mr-2 ${
          displayCurrency === "usd" ? "font-bold" : "font-normal"
        }`}
        onClick={() => toggleCurrency("usd")}>
        USD
      </button>
      <div>
        <p className="text-2xl font-bold">{getPriceByCurrency(prices,displayCurrency,selectedQuantity )}</p>
      </div>
    </div>
  );
};

export default DisplayCurrency;
