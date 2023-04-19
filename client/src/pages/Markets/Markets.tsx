import { ApiDataObjType, MarketsResponseData } from '@/api'
import { Table } from '@/components'
import { theadList } from '@/config'
import {
  getAllMarkets,
  subscribeToUpdateFirstApi,
  subscribeToUpdateSecondApi,
  subscribeToUpdateThirdApi,
} from '@/helpers'

import React, { useEffect, useState } from 'react'

import c from './Markets.module.scss'

export const Markets = () => {
  const [apiData, setApiData] = useState<ApiDataObjType | null>(null)
  const [serviceConnection, setServiceConnection] = useState({
    firstApi: false,
    secondApi: false,
    thirdApi: false,
  })

  useEffect(() => {
    const data = getAllMarkets<MarketsResponseData>()
    data.then((res) => {
      setApiData({
        firstApi: res[0],
        secondApi: res[1],
        thirdApi: res[2],
      })
    })
  }, [])

  useEffect(() => {
    !serviceConnection.firstApi && updateMarkets()
    // !serviceConnection.secondApi && updateMarkets2()
    !serviceConnection.thirdApi && updateMarkets3()
  }, [apiData])

  const updateMarkets = async () => {
    setServiceConnection((prev) => ({
      ...prev,
      firstApi: true,
    }))

    try {
      const res = await subscribeToUpdateFirstApi()

      setApiData((prev) => ({ ...prev, firstApi: res }))

      await updateMarkets()
    } catch (e: any) {
      console.log(1, e)
      setTimeout(() => {
        updateMarkets()
      }, 500)
    }
  }

  const updateMarkets2 = async () => {
    setServiceConnection((prev) => ({
      ...prev,
      secondApi: true,
    }))

    try {
      const res = await subscribeToUpdateSecondApi()

      setApiData((prev) => ({ ...prev, secondApi: res }))

      await updateMarkets2()
    } catch (e: any) {
      console.log(2, e)
      setTimeout(() => {
        updateMarkets2()
      }, 500)
    }
  }

  const updateMarkets3 = async () => {
    setServiceConnection((prev) => ({
      ...prev,
      thirdApi: true,
    }))

    try {
      const res = await subscribeToUpdateThirdApi()

      setApiData((prev) => ({ ...prev, thirdApi: res }))

      await updateMarkets3()
    } catch (e: any) {
      console.log(3, e)
      setTimeout(() => {
        updateMarkets3()
      }, 500)
    }
  }

  return (
    <>
      {apiData && (
        <div className={c.container}>
          <Table theadList={theadList} tbodyData={apiData} />
        </div>
      )}
    </>
  )
}
