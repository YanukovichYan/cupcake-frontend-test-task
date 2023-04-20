import { ApiDataType } from '@/api'
import { currencyPairs } from '@/config'
import { calculateValCurrPair } from '@/helpers'

import React, { memo } from 'react'

import c from './Table.module.scss'

interface ITableProps {
  theadList: string[]
  tbodyData: ApiDataType
}

export const Table = memo(({ theadList, tbodyData }: ITableProps) => (
  <table className={c.table}>
    <colgroup style={{ width: '8%' }} />
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
              return +firstApiVal === Math.min(...rowValues.filter((v) => !!v))
            case 2:
              return +secondApiVal === Math.min(...rowValues.filter((v) => !!v))
            case 3:
              return +thirdApiVal === Math.min(...rowValues.filter((v) => !!v))
            default:
              return false
          }
        }

        return (
          <tr key={market + i}>
            <TCell val={market} />
            <TCell isActive={isActive(1)} val={firstApiVal} />
            <TCell isActive={isActive(2)} val={secondApiVal} />
            <TCell isActive={isActive(3)} val={thirdApiVal} />
          </tr>
        )
      })}
    </tbody>
  </table>
))

const TCell = memo(({isActive, val}: {isActive?: boolean; val: string  }) => {
  return (
    <td className={`${c.td} ${isActive && c.active}`}>
      {val}
    </td>
  )
})