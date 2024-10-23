import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/FirstLayout'
import Home from './pages/Home'
import Cities from './pages/Cities'
import CityDetail from './pages/CityDetail'
import ErrorPage from './pages/ErrorPage'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      {
        index: true, 
        element: <Home />,
      },
      {
        path: 'cities',
        element: <Cities />,
      },
      {
        path: 'city/:id',
        element: <CityDetail />,
      },
    ],
  },
  {
    path: '*', 
    element: <ErrorPage />,
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
