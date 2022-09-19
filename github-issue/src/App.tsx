//Libraries
import React from 'react'
import { Outlet } from 'react-router-dom'

//reset
import { ResetStyle, GlobalStyle } from './globalStyle'

//components
import Header from './components/Header/Header'
import Footer from './components/Foorter/Footer'
function App() {
  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
