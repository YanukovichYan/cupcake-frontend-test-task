import React from 'react'

import c from './Table.module.scss'

interface ITableProps {
  theadList: string[]
  tbodyData: any
}

export const Table = ({ theadList, tbodyData }: ITableProps) => {
  // fetch('http://localhost:3000/api/v1/first')
  //   .then((res) => res.json())
  //   .then((data) => console.log(data))

  return (
    <table className={c.table}>
      <colgroup style={{ width: '20%' }} />
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
        {tbodyData.map((market: any) => (
          <tr key={market.id}>
            <td className={c.td}>{market.name}</td>
            <td className={c.td}>{market.firstValue}</td>
            <td className={c.td}>{market.firstValue}</td>
            <td className={c.td}>{market.firstValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
