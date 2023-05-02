import { api, MarketsResponseData } from '@/api'
import { afterErrorReconnectDelay } from '@/config'

import { useEffect, useState, useRef } from 'react'

export const useSubscribeToSecondApi = <
  TResponseData = MarketsResponseData,
>() => {
  const [dataFromSecondApi, setDataFromSecondApi] =
    useState<TResponseData | null>(null)

  const connection = useRef(true)

  const updateFromSecondApi = async () => {
    try {
      const { data } = await api.secondPoll<TResponseData>()

      if (data) {
        setDataFromSecondApi(data)
      }

      if (connection.current) {
        await updateFromSecondApi()
      }
    } catch (e: unknown) {
      setTimeout(() => {
        updateFromSecondApi()
      }, afterErrorReconnectDelay)
    }
  }

  useEffect(() => {
    updateFromSecondApi()

    return () => {
      connection.current = false
    }
  }, [])

  return {
    dataFromSecondApi,
  }
}
