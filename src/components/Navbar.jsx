import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
   <nav className="navbarContainer">
    <h1>MyDoctorCare</h1>
    <aside className="menuItems">
        <NavLink to="/">HomePage</NavLink>
        <NavLink to="/appointments">Appointments</NavLink>
        <NavLink to="/doctors">Doctors</NavLink>
        <NavLink to="/contactus">Contact Us</NavLink>
    </aside>
   </nav>
  )
}

export default Navbar
