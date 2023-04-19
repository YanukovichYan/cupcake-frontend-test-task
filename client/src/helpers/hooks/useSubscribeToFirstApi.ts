import { api, MarketsResponseData } from '@/api'
import { afterErrorReconnectDelay } from '@/config'

import { useEffect, useState } from 'react'

export const useSubscribeToFirstApi = <
  TResponseData = MarketsResponseData,
>() => {
  const [dataFromFirstApi, setDataFromFirstApi] =
    useState<TResponseData | null>(null)

  const updateFromFirstApi = async () => {
    try {
      const { data } = await api.firstPoll<TResponseData>()

      if (data) {
        setDataFromFirstApi(data)
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
