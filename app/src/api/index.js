import instance from "./instance";

export const getExchangeRate = async (currencyFrom, currencyTo) => {
  const data = new FormData();
  data.append("currency_from", currencyFrom);
  data.append("currency_to", currencyTo);

  return instance.post("/calculator/exchange/calculate", {
    currency_from: currencyFrom,
    currency_to: currencyTo,
  });
};
