import React from 'react'

import AppLoading from 'expo-app-loading'
import { ThemeProvider } from 'styled-components'

import { fonts, useFonts } from './fonts'
import { Home } from './src/screens/Home'
import theme from './src/screens/styles/theme'

export default function App() {
  const [fontsLoaded] = useFonts({ ...fonts })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  )
}
