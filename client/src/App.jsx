import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './pages/Header'
import Footer from './pages/Footer'

function App() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default App
