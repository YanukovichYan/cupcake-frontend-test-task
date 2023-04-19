import { AvailableMarketsType, ApiNameTitles, ApiDataType } from '@/api'

const host: string = 'http://localhost:3000/api/v1'

const afterErrorReconnectDelay: number = 500

const currencyPairs: AvailableMarketsType[] = [
  'RUB/CUPCAKE',
  'USD/CUPCAKE',
  'EUR/CUPCAKE',
  'RUB/USD',
  'RUB/EUR',
  'EUR/USD',
]

const theadList: string[] = ['Pair name/market', 'First', 'Second', 'Third']

type ApiValueType = { [key in ApiNameTitles]: string }

const initApiValue: ApiValueType = {
  firstApi: '',
  secondApi: '',
  thirdApi: '',
}

const initApiData: ApiDataType = {
  firstApi: null,
  secondApi: null,
  thirdApi: null,
}

type InitConnectType = { [key in ApiNameTitles]: boolean }

const initConnectObj: InitConnectType = {
  firstApi: false,
  secondApi: false,
  thirdApi: false,
}

export {
  host,
  currencyPairs,
  theadList,
  initApiValue,
  initApiData,
  initConnectObj,
  afterErrorReconnectDelay,
}

export type { ApiValueType, InitConnectType }
