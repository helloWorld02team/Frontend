import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import LoginModal from './libra/LoginModal';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState(null);
  const [token, setToken] = React.useState(null);

  const handleOpen = () => setOpen((cur) => !cur);

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await fetch('http://helloworld02.sit.kmutt.ac.th:3001/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        // Clear user session
        localStorage.removeItem("userData");
        setUserName(null);
        setToken(null); // Reset token state
      } else {
        console.error('Logout failed:', await response.text());
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://helloworld02.sit.kmutt.ac.th:3001/api/user/getuserdata', {
          method: 'GET',
          credentials: 'include', // Ensure cookies are sent
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setUserName(data.username);
          localStorage.setItem("userData", JSON.stringify(data));
        } else if (data.expired) {
          console.warn("Token expired, logging out...");
          alert("Session expired. Please log in again.");
          handleLogout(); // Log user out
        } else {
          console.error('Failed to fetch user data:', data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);
  return (
    <div className='flex justify-between items-center p-4 bg-black shadow-md'>
      <div className='ml-20 flex'>
        <div className='border-r-1 pr-2'>
          <span className='text-white text-[15px] font-bold'>Booking<br/>System</span>
        </div>
        <img src="/sit.png" alt="" className='w-50' />
      </div>
      <div>
        <ul className='flex gap-25 text-[18px] font-bold'>
          <li><Link to="/app" className={`text-white hover:text-[#53E2FF] ${location.pathname === '/app' ? 'underline decoration-[#53E2FF] ' : ''}`}>Home</Link></li>
          <li><Link to="/Rooms" className={`text-white hover:text-[#53E2FF] ${location.pathname === '/Rooms' ? 'underline decoration-[#53E2FF] ' : ''}`}>Rooms</Link></li>
          <li><Link to="/Report" className={`text-white hover:text-[#53E2FF] ${location.pathname === '/Report' ? 'underline decoration-[#53E2FF] ' : ''}`}>Report</Link></li>
          <li><Link to="/Help" className={`text-white hover:text-[#53E2FF] ${location.pathname === '/Help' ? 'underline decoration-[#53E2FF] ' : ''}`}>Help</Link></li>
        </ul>
      </div>
      {userName ? (
        <div className="flex gap-4 items-center">
          <span className="text-white">ยินดีต้อนรับ {userName}</span>
          <Button
            color='red'
            onClick={handleLogout}
            variant="gradient"
            className='text-black px-15 py-3 rounded-xl hover:bg-[#FF5E5E] hover:cursor-pointer text-1xl'
          >
            Logout
          </Button>
        </div>
      ) : (
        <Button
          color='white'
          onClick={handleOpen}
          variant="gradient"
          className='text-black px-15 py-3 rounded-xl hover:bg-[#53E2FF] mr-20 hover:cursor-pointer text-1xl'
        >
          Login
        </Button>
      )}
      <LoginModal open={open} handleOpen={handleOpen} setUserName={setUserName} />
    </div>
  );
};

export default Navbar;

