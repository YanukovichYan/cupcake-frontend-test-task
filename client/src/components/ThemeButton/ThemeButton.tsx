import React, { useEffect, useState } from 'react'

import c from './ThemeButtom.module.scss'

export const ThemeButton = () => {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light'
  }, [theme])

  return <input type="checkbox" className={c.checkbox} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
}
