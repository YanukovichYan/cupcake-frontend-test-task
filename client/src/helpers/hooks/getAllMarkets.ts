import { api, MarketsResponseData } from '@/api'

export const getAllMarkets = async <TResponseData>() => {
  const data: MarketsResponseData[] = await Promise.all([
    api.first<TResponseData>(),
    api.second<TResponseData>(),
    api.third<TResponseData>(),
  ])

  // if (!data.every((res) => res))
  //   data = await Promise.all([api.first<TResponseData>(), api.second<TResponseData>(), api.third<TResponseData>()])

  return data
}
