import React from 'react'
import { NavLink } from 'react-router-dom'

const HomePage = () => {
    return (
        <section className="HomePageMainContainer">
            <article className="homePageFirstChildContainer">
                <main className="homePageLeftContainer">
                    <h2>Your Tursted Online Application for Doctors Appointment</h2>
                    <aside className="buttonsContainer">
                        <NavLink to="/doctors">View Doctors</NavLink>
                        <NavLink to="/appointments">View Appointments</NavLink>
                    </aside>
                </main>
                <aside className="imageContainer">
                    <img src="https://png.pngtree.com/png-clipart/20240702/original/pngtree-friendly-cartoon-doctor-png-image_15467257.png" alt="" />
                </aside>
            </article>
        </section>
    )
}

export default HomePage
