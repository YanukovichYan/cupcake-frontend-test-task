import { ThemeButton } from '@/components'
import { Markets } from '@/pages'

import { useState, useEffect } from 'react'

export const App = () => {
  const [isMarketsPage, setMarketsPage] = useState<boolean>(false)

  return (
    <div>
      <button onClick={() => setMarketsPage((prev) => !prev)}>
        Change page
      </button>
      <ThemeButton />
      {isMarketsPage ? <Markets /> : null}
    </div>
  )
}
