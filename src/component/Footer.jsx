import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='bg-black py-9'>
      <div className='text-white pt-3 py-auto  text-center flex flex-col items-center '>
        <div className=''>
            <img src="public/SIT LOGO White.png" alt="" className='w-100'/>
        </div>
        <div className='my-7 font-bold text-2xl'>
            <Link to="/Rooms" className='mx-15'>Rooms</Link> |
            <Link to="/Report" className='mx-15'>Report</Link> |
            <Link to="/Rooms" className='mx-15'>Help</Link>
        </div>
        <div>
            <p className='text-2xl font-bold'>School of Infomation Technology</p>
            <p className='text-[15px] mt-1 text-gray-400'>King MongKut's University of Technology Thonburi</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
