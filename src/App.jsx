import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './components/HomePage'
import Apppointments from './pages/Apppointments'
import Doctors from './pages/Doctors'
import ContactUS from './pages/ContactUS'

const App = () => {
  let router=createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:<HomePage/>
        },
        {
          path:'/appointments',
          element:<Apppointments/>
        },
        {
          path:"/doctors",
          element:<Doctors/>
        },
        {
          path:"/contactus",
          element:<ContactUS/>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
