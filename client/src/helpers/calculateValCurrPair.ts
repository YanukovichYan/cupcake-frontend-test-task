export const calculateValCurrPair = (market: string, rates: any, value: number = 1): string | '-' => {
  if (!rates) return '-'

  const ratesData = rates.rates

  const [sourceCurrency, targetCurrency] = market.split('/').slice(0, 2)
  const priceByBase: number = value / ratesData[sourceCurrency]

  return (priceByBase * (ratesData[targetCurrency] ?? value)).toFixed(2)
}
