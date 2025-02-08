import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import LoginModal from './libra/LoginModal';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState(null);

  const handleOpen = () => setOpen((cur) => !cur);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserName(null);
  };

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserName(storedUserData.username);
    }
  }, []);

  return (
    <div className='flex justify-between items-center p-4 bg-black shadow-md'>
      <div className='ml-20 flex'>
        <div className='border-r-1 pr-2'>
          <span className='text-white text-[15px] font-bold'>Booking<br/>System</span>
        </div>
        <img src="public/sit.png" alt="" className='w-50' />
      </div>
      <div>
        <ul className='flex gap-25 text-[18px] font-bold'>
          <li><Link to="/app" className= {`text-white hover:text-[#53E2FF] ${location.pathname === '/app' ? 'underline decoration-[#53E2FF] ' : ''}`}>Home</Link></li>
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
