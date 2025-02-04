import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Report from './component/report.jsx'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'

import BookingPage from './component/BookingPage.jsx'

const router = createBrowserRouter ([
  {
    path: "/",
    element:<App />
  },
  {
    path: "/Report",
    element:<Report />
  },
  {
    path: "/Rooms",
    element:<BookingPage />
  },
  {
    path: "/",
    element:<App />
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
