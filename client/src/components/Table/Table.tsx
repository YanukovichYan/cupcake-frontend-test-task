import { ApiDataType } from '@/api'
import { currencyPairs } from '@/config'
import { calculateValCurrPair } from '@/helpers'

import React from 'react'

import c from './Table.module.scss'

interface ITableProps {
  theadList: string[]
  tbodyData: ApiDataType
}

export const Table = ({ theadList, tbodyData }: ITableProps) => (
  <table className={c.table}>
    <colgroup style={{ width: '5%' }} />
    <colgroup span={3} style={{ width: '5%' }} />
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
      {currencyPairs.map((market: string, i: number) => {
        const {
          firstApi: firstApiVal,
          secondApi: secondApiVal,
          thirdApi: thirdApiVal,
        } = calculateValCurrPair(market, tbodyData)

        const rowValues: number[] = [+firstApiVal, +secondApiVal, +thirdApiVal]

        const isActive = (apiId: number): boolean => {
          switch (apiId) {
            case 1:
              return +firstApiVal === Math.min(...rowValues)
            case 2:
              return +secondApiVal === Math.min(...rowValues)
            case 3:
              return +thirdApiVal === Math.min(...rowValues)
            default:
              return false
          }
        }

        return (
          <tr key={market + i}>
            <td className={c.td}>{market}</td>
            <td className={`${c.td} ${isActive(1) && c.active}`}>
              {firstApiVal}
            </td>
            <td className={`${c.td} ${isActive(2) && c.active}`}>
              {secondApiVal}
            </td>
            <td className={`${c.td} ${isActive(3) && c.active}`}>
              {thirdApiVal}
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
)
