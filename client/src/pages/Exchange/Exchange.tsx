import { Table } from '@/components'

import React from 'react'

import c from './Exchange.module.scss'

const theadList: string[] = ['Pair name/market', 'First', 'Second', 'Third']

export const Exchange = () => {
  return (
    <div className={c.container}>
      <Table theadList={theadList} tbodyData={[]} />
    </div>
  )
}
