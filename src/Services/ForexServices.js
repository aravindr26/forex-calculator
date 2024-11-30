const BASE_URL = 'https://rates.staging.api.paytron.com'; // it can be loading from .env

export const getForexRate = async (sellCurrency, buyCurrency) => {
  const response = await fetch(
    `${BASE_URL}/rate/public?sellCurrency=${sellCurrency}&buyCurrency=${buyCurrency}`
  );
  const data = await response.json();

  return data;
};
