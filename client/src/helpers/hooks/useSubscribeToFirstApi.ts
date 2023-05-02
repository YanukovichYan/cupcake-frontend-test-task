import { api, MarketsResponseData } from '@/api'
import { afterErrorReconnectDelay } from '@/config'

import { useEffect, useState, useRef } from 'react'

export const useSubscribeToFirstApi = <
  TResponseData = MarketsResponseData,
>() => {
  const [dataFromFirstApi, setDataFromFirstApi] =
    useState<TResponseData | null>(null)

  const connection = useRef(true)

  const updateFromFirstApi = async () => {
    try {
      const { data } = await api.firstPoll<TResponseData>()

      if (data) {
        setDataFromFirstApi(data)
      }

      if (connection.current) {
        await updateFromFirstApi()
      }
    } catch (e: unknown) {
      setTimeout(() => {
        updateFromFirstApi()
      }, afterErrorReconnectDelay)
    }
  }

  useEffect(() => {
    updateFromFirstApi()

    return () => {
      connection.current = false
    }
  }, [])

  return {
    dataFromFirstApi,
  }
}
