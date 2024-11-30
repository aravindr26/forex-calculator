import { useState, useEffect, useCallback } from "react";
import { getForexRate } from "../Services/ForexServices";
import countryToCurrency from "../Libs/CountryCurrency.json";

const useForexRates = (fromCurrency, toCurrency) => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /**
   * Fetches the forex rate from the service
   * * */
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getForexRate(
        countryToCurrency[fromCurrency],
        countryToCurrency[toCurrency]
      );
      if (!data || !data.hasOwnProperty("retailRate")) {
        setError(true);
      } else {
        setError(false);
        setExchangeRate(data.retailRate);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [fromCurrency, toCurrency]);

  // Fetch the data when the currencies change
  useEffect(() => {
    fetchData();
  }, [fromCurrency, toCurrency, fetchData]);

  return { exchangeRate, loading, error, fetchData };
};

export default useForexRates;
