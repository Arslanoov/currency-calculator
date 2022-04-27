import instance from "./instance";

export const getExchangeRate = async (currencyFrom, currencyTo) => {
  return instance.post("/calculator/exchange/calculate", {
    currency_from: currencyFrom,
    currency_to: currencyTo,
  });
};
