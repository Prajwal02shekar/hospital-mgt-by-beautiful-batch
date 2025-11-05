import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <aside className="layoutContainer">
        <Navbar/>
        <article className="displayPage">
            <Outlet/>
        </article>
        <Footer/>
    </aside>
  )
}

export default Layout
