import { ApiDataObjType } from '@/api'
import { currencyPairs } from '@/config'
import { calculateValCurrPair } from '@/helpers'

import React from 'react'

import c from './Table.module.scss'

interface ITableProps {
  theadList: string[]
  tbodyData: ApiDataObjType
}

export const Table = ({ theadList, tbodyData }: ITableProps) => {
  return (
    <table className={c.table}>
      <colgroup style={{ width: '20%' }} />
      <colgroup span={3} style={{ width: '20%' }} />
      <thead>
        <tr>
          {theadList.map((title: string) => (
            <th className={c.th} key={title}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {currencyPairs.map((market: string, i: number) => (
          <tr key={market + i}>
            <td className={c.td}>{market}</td>
            <td className={c.td}>{calculateValCurrPair(market, tbodyData['firstApi'])}</td>
            <td className={c.td}>{calculateValCurrPair(market, tbodyData['secondApi'])}</td>
            <td className={c.td}>{calculateValCurrPair(market, tbodyData['thirdApi'])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
