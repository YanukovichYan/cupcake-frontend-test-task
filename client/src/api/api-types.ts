type ResponseData<T> = {
  data: T | null
  error: ErrorIbj | null | string
}

type ErrorIbj = {
  error: string
  message: string
  statusCode: number
}

type AvailableCurrencies = 'EUR' | 'RUB' | 'USD' | 'CUPCAKE'

type AvailableMarketsType =
  | 'RUB/CUPCAKE'
  | 'USD/CUPCAKE'
  | 'EUR/CUPCAKE'
  | 'RUB/USD'
  | 'RUB/EUR'
  | 'EUR/USD'

type MarketsResponseData = {
  base: 'CUPCAKE'
  date: Date
  rates: { [key in AvailableCurrencies]: number }
  timestamp: number
}

type ApiNameTitles = 'firstApi' | 'secondApi' | 'thirdApi'

type ApiDataType<T = MarketsResponseData> = {
  [key in ApiNameTitles]: T | null
}

export type {
  ResponseData,
  MarketsResponseData,
  ApiDataType,
  AvailableMarketsType,
  ApiNameTitles,
  AvailableCurrencies,
}
