import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import LoginModal from './libra/LoginModal';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [userName, setUserName] = React.useState(null);

  return (
    <div className='flex justify-between items-center p-4 bg-black shadow-md'>
      <div className='ml-20 flex'>
        <div className='border-r-1 pr-2'>
          <span className='text-white text-[15px] font-bold'>Booking<br/>System</span>
        </div>
        <img src="public/sit.png" alt="" className='w-50'/>
      </div>
      <div>
        <ul className='flex gap-25 text-[18px] font-bold'>
          <li><Link to="/" className='text-white'>Home</Link></li>
          <li><Link to="/Rooms" className='text-white'>Rooms</Link></li>
          <li><Link to="/Report" className='text-white'>Report</Link></li>
          <li><Link to="/Help" className='text-white'>Help</Link></li>
        </ul>
      </div>
      <Button
        color='white'
        onClick={handleOpen}
        variant="gradient"
        className=' text-black px-15 py-3 rounded-xl hover:bg-[#53E2FF] mr-20 hover:cursor-pointer'
      >
        {userName ? `ยินดีต้อนรับ, ${userName}` : "L0gin"}
      </Button>
      <LoginModal open={open} handleOpen={handleOpen} setUserName={setUserName} />
      
    </div>
  );
};

export default Navbar;
