export const getDiscountRate = (price: number, discount: number) => {
  if (!discount) return null;

  const dif = price - discount;

  return Math.round((dif * 100) / price);
};
