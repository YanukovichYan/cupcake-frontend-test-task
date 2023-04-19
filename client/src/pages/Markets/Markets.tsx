import { ApiDataType, MarketsResponseData } from '@/api'
import { Loader, Table } from '@/components'
import {
  afterErrorReconnectDelay,
  initApiData,
  initConnectObj,
  InitConnectType,
  theadList,
} from '@/config'
import {
  subscribeToFirstApi,
  subscribeToSecondApi,
  subscribeToThirdApi,
  useSubscribeToSecondApi,
} from '@/helpers'
import { useGetAllMarkets } from '@/helpers/hooks'

import React, { useEffect, useState } from 'react'

import c from './Markets.module.scss'

export const Markets = () => {
  const [apiData, setApiData] = useState<ApiDataType>(initApiData)

  const [serviceConnection, setServiceConnection] =
    useState<InitConnectType>(initConnectObj)

  const { allMarkets, isLoading } = useGetAllMarkets<MarketsResponseData>()

  useEffect(() => {
    setApiData(allMarkets)
  }, [allMarkets])

  useEffect(() => {
    // !serviceConnection.firstApi && updateFromFirstApi()
    // !serviceConnection.secondApi && updateFromSecondApi()
    // !serviceConnection.thirdApi && updateFromThirdApi()
  }, [apiData])

  const { dataFromFirstApi } = useSubscribeToSecondApi()

  useEffect(() => {
    if (!serviceConnection.firstApi) {
      setServiceConnection((prev) => ({
        ...prev,
        firstApi: true,
      }))
    }

    setApiData((prev) => ({ ...prev, firstApi: dataFromFirstApi }))
  }, [dataFromFirstApi])

  // const updateFromFirstApi = async () => {
  //   try {
  //     const res: MarketsResponseData | null =
  //       await subscribeToFirstApi<MarketsResponseData>()
  //
  //     if (res) {
  //       setApiData((prev) => ({ ...prev, firstApi: res }))
  //     }
  //
  //     await updateFromFirstApi()
  //   } catch (e: unknown) {
  //     setTimeout(() => {
  //       updateFromFirstApi()
  //     }, afterErrorReconnectDelay)
  //   }
  // }

  const updateFromSecondApi = async () => {
    setServiceConnection((prev) => ({
      ...prev,
      secondApi: true,
    }))

    try {
      const res: MarketsResponseData | null =
        await subscribeToSecondApi<MarketsResponseData>()

      if (res) {
        setApiData((prev) => ({ ...prev, secondApi: res }))
      }

      await updateFromSecondApi()
    } catch (e: unknown) {
      setTimeout(() => {
        updateFromSecondApi()
      }, afterErrorReconnectDelay)
    }
  }

  const updateFromThirdApi = async () => {
    setServiceConnection((prev) => ({
      ...prev,
      thirdApi: true,
    }))

    try {
      const res: MarketsResponseData | null =
        await subscribeToThirdApi<MarketsResponseData>()

      if (res) {
        setApiData((prev) => ({ ...prev, thirdApi: res }))
      }

      await updateFromThirdApi()
    } catch (e: unknown) {
      setTimeout(() => {
        updateFromThirdApi()
      }, afterErrorReconnectDelay)
    }
  }

  const isShowTable: boolean =
    Object.values(apiData).some((data) => data) && !isLoading

  return (
    <>
      {isShowTable ? (
        <div className={c.container}>
          <Table theadList={theadList} tbodyData={apiData} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}
