import { api, MarketsResponseData } from '@/api'
import { afterErrorReconnectDelay } from '@/config'

import { useEffect, useState } from 'react'

export const useSubscribeToThirdApi = <
  TResponseData = MarketsResponseData,
>() => {
  const [dataFromThirdApi, setDataFromThirdApi] =
    useState<TResponseData | null>(null)

  const updateFromThirdApi = async () => {
    try {
      const { data } = await api.thirdPoll<TResponseData>()

      if (data) {
        setDataFromThirdApi(data)
      }

      await updateFromThirdApi()
    } catch (e: unknown) {
      setTimeout(() => {
        updateFromThirdApi()
      }, afterErrorReconnectDelay)
    }
  }

  useEffect(() => {
    updateFromThirdApi()
  }, [])

  return {
    dataFromThirdApi,
  }
}
