import { api, ApiDataType, ResponseData } from '@/api'

import { useEffect, useState } from 'react'

export const useGetAllMarkets = <TResponseData>() => {
  const [allMarkets, setAllMarkets] = useState<ApiDataType<TResponseData>>({
    firstApi: null,
    secondApi: null,
    thirdApi: null,
  })

  const [isLoading, setIsLoading] = useState<boolean>(true)

  async function fetchData(): Promise<ResponseData<TResponseData>[]> {
    return await Promise.all([
      api.first<TResponseData>(),
      api.second<TResponseData>(),
      api.third<TResponseData>(),
    ])
  }

  useEffect(() => {
    fetchData().then(([api1, api2, api3]) => {
      setIsLoading(false)

      setAllMarkets({
        firstApi: api1.data,
        secondApi: api2.data,
        thirdApi: api3.data,
      })
    })
  }, [])

  return {
    allMarkets,
    isLoading,
  }
}
