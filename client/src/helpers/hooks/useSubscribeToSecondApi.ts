import { MarketsResponseData } from '@/api'
import { afterErrorReconnectDelay } from '@/config'
import { subscribeToFirstApi } from '@/helpers'

import { useEffect, useState } from 'react'

export const useSubscribeToSecondApi = () => {
  const [dataFromFirstApi, setDataFromFirstApi] =
    useState<MarketsResponseData | null>(null)

  const updateFromFirstApi = async () => {
    // setServiceConnection((prev) => ({
    //   ...prev,
    //   firstApi: true,
    // }))

    try {
      const res: MarketsResponseData | null =
        await subscribeToFirstApi<MarketsResponseData>()

      if (res) {
        setDataFromFirstApi(res)
      }

      await updateFromFirstApi()
    } catch (e: unknown) {
      setTimeout(() => {
        updateFromFirstApi()
      }, afterErrorReconnectDelay)
    }
  }

  useEffect(() => {
    updateFromFirstApi()
  }, [])

  return {
    dataFromFirstApi,
  }
}
