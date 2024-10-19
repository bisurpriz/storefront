export const getPriceTR = (price: number) => {
  return price ? `₺${price.toFixed(2)}` : price;
};
