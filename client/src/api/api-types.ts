type AvailableCurrencies = 'EUR' | 'RUB' | 'USD'

type MarketsResponseData = {
  base: 'CUPCAKE'
  date: Date
  rates: { [key in AvailableCurrencies]: number }
  timestamp: number
}

type ApiDataObjType = {
  [key: string]: MarketsResponseData
}

export type { MarketsResponseData, ApiDataObjType }
