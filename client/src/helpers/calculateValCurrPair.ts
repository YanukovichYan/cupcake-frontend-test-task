import {
  ApiDataType,
  ApiNameTitles,
  AvailableCurrencies,
  MarketsResponseData,
} from '@/api'
import { ApiValueType, initApiValue } from '@/config'

export const calculateValCurrPair = (
  market: string,
  tbodyData: ApiDataType,
  value: number = 1,
): ApiValueType => {
  return Object.entries(tbodyData).reduce(
    (
      acc: ApiValueType,
      [key, val]: [string, MarketsResponseData | null],
    ): ApiValueType => {
      const [sourceCurrency, targetCurrency] = market.split('/').slice(0, 2)
      if (!val) {
        acc[key as ApiNameTitles] = '-'
      } else {
        const priceByBase: number =
          value / val.rates[sourceCurrency as AvailableCurrencies]

        if (targetCurrency === 'CUPCAKE') {
          acc[key as ApiNameTitles] = (priceByBase * value).toFixed(2)
        } else {
          acc[key as ApiNameTitles] = (
            priceByBase * val.rates[targetCurrency as AvailableCurrencies]
          ).toFixed(2)
        }
      }

      return acc
    },
    initApiValue,
  )
}
