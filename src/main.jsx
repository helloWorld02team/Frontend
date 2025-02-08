import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Report from './component/Report.jsx';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import BookingPage from './component/BookingPage.jsx';
import HelpCenter from './component/HelpCenter.jsx';
import HowToBook from './component/HowToBook.jsx';
import Rules from './component/Rules.jsx';

// แก้ไขการตรวจสอบ termsAccepted จาก localStorage
const termsAccepted = localStorage.getItem('termsAccepted') === 'true';


const router = createBrowserRouter([

  {
    path: "/",
    element: <Navigate to="/rules" replace />
  },
  {
    path: "/rules",
    element: <Rules />,
  },
  {
    path: "/app", // ตั้งเส้นทางสำหรับหน้าหลัก
    element: <App />, 
  },
  {
    path: "/Report",
    element: <Report />,
  },
  {
    path: "/Rooms",
    element: <BookingPage />,
  },
  {
    path: "/help",
    element: <HelpCenter />,
  },
  {
    path: "/HowToBook",
    element: <HowToBook />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
