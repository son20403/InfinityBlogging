import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './pages/Header'
import Footer from './pages/Footer'
/*tesst*/
function App() {
  return (
    <div className=''>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App
