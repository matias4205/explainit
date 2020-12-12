import { h, createContext } from 'preact'
import { useContext, useState } from 'preact/hooks'

import { themes } from '../../config'
import { lightenDarkenColor } from '../../utils'

const ThemeContext = createContext(null)

export const ThemeProvider = ({ primaryColor = themes.turquoise, children }) => {
  const [state, setState] = useState({
    primaryColor: {
      100: lightenDarkenColor(primaryColor, 40),
      300: lightenDarkenColor(primaryColor, 20),
      500: lightenDarkenColor(primaryColor, 0),
      700: lightenDarkenColor(primaryColor, -20),
      900: lightenDarkenColor(primaryColor, -60)
    }
  })

  return (
    <ThemeContext.Provider value={state}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}
