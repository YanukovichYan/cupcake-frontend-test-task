import { api, MarketsResponseData } from '@/api'
import { afterErrorReconnectDelay } from '@/config'

import { useEffect, useState, useRef } from 'react'

export const useSubscribeToThirdApi = <
  TResponseData = MarketsResponseData,
>() => {
  const [dataFromThirdApi, setDataFromThirdApi] =
    useState<TResponseData | null>(null)

  const connection = useRef(true)

  const updateFromThirdApi = async () => {
    try {
      const { data } = await api.thirdPoll<TResponseData>()

      if (data) {
        setDataFromThirdApi(data)
      }

      if (connection.current) {
        await updateFromThirdApi()
      }
    } catch (e: unknown) {
      setTimeout(() => {
        updateFromThirdApi()
      }, afterErrorReconnectDelay)
    }
  }

  useEffect(() => {
    updateFromThirdApi()

    return () => {
      connection.current = false
    }
  }, [])

  return {
    dataFromThirdApi,
  }
}
