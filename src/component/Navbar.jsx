import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import LoginModal from './libra/LoginModal';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState(null);

  const handleOpen = () => setOpen((cur) => !cur);

  const handleLogout = async () => {
    
    try {
      // Make the fetch request to the logout API
      const response = await fetch('http://helloworld02.sit.kmutt.ac.th:3001/api/user/logout', {
        method: 'POST', // Assuming it's a POST request for logout
        headers: {
          'Content-Type': 'application/json', // Adjust headers if necessary
          // Add Authorization token or other headers if required
        },
        credentials:'include'
      });
  
      // Check if the response is successful (status code 200-299)
      if (response.ok) {
        // Remove user data from localStorage
        localStorage.removeItem("userData");
        
        // Clear the user name from the state
        setUserName(null);
      } else {
        // Handle errors, you can show a message to the user
        console.error('Logout failed:', await response.text());
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
        try {
            const parsedData = JSON.parse(storedUserData);
            if (parsedData?.username) {
                setUserName(parsedData.username);
            }
        } catch (error) {
            console.error("Error parsing userData from localStorage:", error);
            localStorage.removeItem("userData"); // Reset corrupted data
        }
    }
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
          <li><Link to="/app" className= {`text-white hover:text-[#53E2FF] ${location.pathname === '/' ? 'underline decoration-[#53E2FF] ' : ''}`}>Home</Link></li>
          <li><Link to="/Rooms" className={`text-white hover:text-[#53E2FF] ${location.pathname === '/Rooms' ? 'underline decoration-[#53E2FF]' : ''}`}>Rooms</Link></li>
          <li><Link to="/Report" className={`text-white hover:text-[#53E2FF] ${location.pathname === '/Report' ? 'underline decoration-[#53E2FF]' : ''}`}>Report</Link></li>
          <li><Link to="/Help" className={`text-white hover:text-[#53E2FF] ${location.pathname === '/Help' ? 'underline decoration-[#53E2FF]' : ''}`}>Help</Link></li>
        </ul>
      </div>
      {userName ? (
        <div className="flex gap-4 items-center">
          <span className="text-white">ยินดีต้อนรับ {userName}</span>
          <Button
            color='red'
            onClick={handleLogout}
            variant="gradient"
            className=' text-black px-15 py-3 rounded-xl hover:bg-[#FF5E5E] hover:cursor-pointer text-1xl'
          >
            Logout
          </Button>
        </div>
      ) : (
        <Button
          color='white'
          onClick={handleOpen}
          variant="gradient"
          className=' text-black px-15 py-3 rounded-xl hover:bg-[#53E2FF] mr-20 hover:cursor-pointer text-1xl'
        >
          Login
        </Button>
      )}
      <LoginModal open={open} handleOpen={handleOpen} setUserName={setUserName} />
    </div>
  );
};

export default Navbar;
