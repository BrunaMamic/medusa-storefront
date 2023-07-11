
export const getPriceByCurrency = (prices: any, currency: any, selectedQuantity: any) => {
 console.log(prices)  
  const selectedPrice = (prices || []).find(
      (price: any) => price.currency_code === currency
    );
    if (selectedPrice) {
      const totalPrice = selectedPrice.amount * selectedQuantity;
      return `${(totalPrice / 100).toFixed(2)} ${currency.toUpperCase()}`;
    }
    return "";
  };