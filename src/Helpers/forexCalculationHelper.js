export const calculateForexRate = (sendingAmount, exchangeRate) => {
  const MARKUP_PERCENTAGE = 0.5;
  const markup = exchangeRate * (MARKUP_PERCENTAGE / 100);
  const ofxRate = exchangeRate - markup;
  const amountWithoutMarkup = sendingAmount * exchangeRate;
  const receivingAmount = sendingAmount * ofxRate;

  return {
    amountWithoutMarkup: amountWithoutMarkup.toFixed(4),
    receivingAmount: receivingAmount.toFixed(4),
  };
};
