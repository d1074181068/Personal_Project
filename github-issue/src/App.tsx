//Libraries
import React from 'react'
import { Outlet } from 'react-router-dom'

//reset
import { ResetStyle, GlobalStyle } from './globalStyle'
import { useLocation } from 'react-router-dom'
//components
import Header from './components/Header/Header'
import Footer from './components/Foorter/Footer'
import MainHeader from './components/MainHeader/MainHeader'

function App() {
  const location = useLocation()
  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <Header />
      {location.pathname !== '/' && <MainHeader />}
      <Outlet />
      <Footer />
    </>
  )
}

export default App
