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


  return (

    <div className="flex h-250 pb-5" style={{ backgroundColor: '#F1F1F1' }}>
      {/* Sidebar */}
      <div className="flex flex-col items-center mt-10 mx-7">
        <SearchBox />
        <br />
        <div className='bg-white mb-5 rounded-2xl shadow-2xl'>
        <BasicDateCalendar />
        </div>
        <MenuWithCheckbox />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        <div className="h-full p-4 rounded-lg shadow-lg bg-white mt-4">

          <CalendarPage events={events} />
        </div>
      </div>


      
    </div>
  );
};

export default CalendarApp;

