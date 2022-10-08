//Libraries
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

//reset
import { ResetStyle, GlobalStyle } from './globalStyle'

//components
import Header from './components/Header/Header'
import Footer from './components/Foorter/Footer'
import MainHeader from './components/MainHeader/MainHeader'

function App() {
  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <Header />
      <MainHeader />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
