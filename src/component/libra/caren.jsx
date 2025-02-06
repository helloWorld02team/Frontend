import React, { useState, useEffect } from 'react';
import { MenuWithCheckbox } from './MenuList';
import BasicDateCalendar from './Basiccalender';
import SearchBox from './Seacrh';
<<<<<<< HEAD
import { Button } from "@material-tailwind/react";
import BookingForm from './BookingForm'; 
import CalendarPage from '../CalendarPage';
=======

>>>>>>> 717d54c66567fea42d1edb2d684cab327c63c12b

const CalendarApp = () => {
 

  return (
    <div className="flex h-200 " style={{ backgroundColor: '#F1F1F1' }}>
      <div className='flex-col items-center mt-10 mx-10 '>
        <SearchBox />
        <br />
        <BasicDateCalendar />
        <MenuWithCheckbox />
      </div>
      <div className="flex-1 p-6 ">
<<<<<<< HEAD
        <div className='flex justify-end mr-20 '>
          <Button className='text-1xl' onClick={openBookingForm}>จองห้อง</Button>
        </div>
        <div className="p-4 rounded-lg shadow-lg">
          {/* <ScheduleXCalendar calendarApp={calendar} /> */}
          <CalendarPage />
        </div>
      </div>
      

      <BookingForm
        open={isBookingFormOpen}
        handleOpen={closeBookingForm}
        onSubmitEvent={addEventToCalendar}
      />
=======
        
          <Test />
        </div>
      </div>
>>>>>>> 717d54c66567fea42d1edb2d684cab327c63c12b
    </div>
  );
};

export default CalendarApp;

