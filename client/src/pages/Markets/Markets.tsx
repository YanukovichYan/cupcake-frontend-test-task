import { ApiDataType, MarketsResponseData } from '@/api'
import { Loader, Table } from '@/components'
import { initApiData, theadList } from '@/config'
import {
  useSubscribeToFirstApi,
  useSubscribeToSecondApi,
  useSubscribeToThirdApi,
} from '@/helpers'
import { useGetAllMarkets } from '@/helpers/hooks'

import React, { useEffect, useState } from 'react'

import c from './Markets.module.scss'

export const Markets = () => {
  const [allApiData, setAllApiData] = useState<ApiDataType>(initApiData)

  const { allMarkets, isLoading } = useGetAllMarkets<MarketsResponseData>()

  useEffect(() => {
    setAllApiData(allMarkets)
  }, [allMarkets])

  const { dataFromFirstApi } = useSubscribeToFirstApi()
  const { dataFromSecondApi } = useSubscribeToSecondApi()
  const { dataFromThirdApi } = useSubscribeToThirdApi()

  useEffect(() => {
    setAllApiData((prev) => ({ ...prev, firstApi: dataFromFirstApi }))
  }, [dataFromFirstApi])

  useEffect(() => {
    setAllApiData((prev) => ({ ...prev, secondApi: dataFromSecondApi }))
  }, [dataFromSecondApi])

  useEffect(() => {
    setAllApiData((prev) => ({ ...prev, thirdApi: dataFromThirdApi }))
  }, [dataFromThirdApi])

  const isShowTable: boolean =
    Object.values(allApiData).some((data) => data) && !isLoading

  return (
    <>
      {isShowTable ? (
        <div className={c.container}>
          <Table theadList={theadList} tbodyData={allApiData} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}
