import instance from './instance';

export const convert = async (currentFrom, currencyTo) => {
  return instance.post('/calculator/exchange/calculate', {
    currency_from: currentFrom,
    currency_to: currencyTo,
  })
}