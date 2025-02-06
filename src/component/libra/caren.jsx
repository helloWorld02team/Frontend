import React, { useState, useEffect } from 'react';
import { MenuWithCheckbox } from './MenuList';
import BasicDateCalendar from './Basiccalender';
import SearchBox from './Seacrh';
import { Button } from "@material-tailwind/react";
import BookingForm from './BookingForm'; 
import CalendarPage from '../CalendarPage';


const CalendarApp = () => {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const openBookingForm = () => {
    setIsBookingFormOpen(true);
  };

  const closeBookingForm = () => {
    setIsBookingFormOpen(false);
  };

  const addEventToCalendar = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div className="flex h-290 " style={{ backgroundColor: '#F1F1F1' }}>
  

      {/* Main Content */}
      <div className="flex-1 p-6 ">

        <div className="h-4/5 p-4 rounded-lg shadow-lg bg-white mt-4">
          <CalendarPage events={events} />
          <div className=' flex gap-5 items-center justify-center mt-10 ' style={{ backgroundColor: '#F1F1F1' }}  >
            <p>อาคาร:</p>
            <div className='w-[113px] text-center p-2 rounded-2xl' style={{ backgroundColor: '#ABE9FF' }}>SIT building</div>
            <div className='w-[113px] text-center p-2 rounded-2xl' style={{ backgroundColor: '#FFB692' }}>LX</div>
            <div className='w-[113px] text-center p-2 rounded-2xl' style={{ backgroundColor: '#F5E460' }}>CB2</div>
            <p>หมวดหมู่:</p>
            <div className='w-[113px] text-center p-2 rounded-2xl border-3' >Lecturer</div>
            <div className='w-[113px] text-center p-2 rounded-2xl border-3' >Staff</div>
            <div className='w-[113px] text-center p-2 rounded-2xl border-3' >LF</div>
            <div className='w-[113px] text-center p-2 rounded-2xl border-3' >Student</div>
          </div>
        </div>
       
      </div>
      


    </div>
  );
};

export default CalendarApp;

