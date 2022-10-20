//Libraries
import { Outlet } from 'react-router-dom'

//reset
import { useLocation } from 'react-router-dom'
import { GlobalStyle, ResetStyle } from './globalStyle'
//components
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
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
