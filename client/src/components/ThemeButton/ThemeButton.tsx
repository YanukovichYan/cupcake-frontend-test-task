import React, { useEffect, useState } from 'react'

import c from './ThemeButtom.module.scss'

enum THEME_COLOR {
  DARK = 'dark',
  LIGHT = 'light',
}

export const ThemeButton = () => {
  const [theme, setTheme] = useState<THEME_COLOR>(THEME_COLOR.LIGHT)

  useEffect(() => {
    document.documentElement.dataset.theme =
      theme === THEME_COLOR.LIGHT ? THEME_COLOR.LIGHT : THEME_COLOR.DARK
  }, [theme])

  return (
    <input
      type="checkbox"
      className={c.checkbox}
      onClick={() =>
        setTheme(
          theme === THEME_COLOR.DARK ? THEME_COLOR.LIGHT : THEME_COLOR.DARK,
        )
      }
    />
  )
}
