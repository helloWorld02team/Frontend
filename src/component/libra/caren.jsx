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
          <div>
          <SearchBox />
          <BasicDateCalendar />
          <br/>
          <MenuWithCheckbox />
          </div>
         

      {/* Main Content */}
      <div className="flex-1 p-6 ">
      
          
        <div className="h-7/10 p-4 rounded-lg shadow-lg bg-white mt-4">
          <CalendarPage events={events} />
        </div>
       
      </div>
      


    </div>
  );
};

export default CalendarApp;

