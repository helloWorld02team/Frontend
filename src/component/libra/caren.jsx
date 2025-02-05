import React, { useState, useEffect } from 'react';
import { MenuWithCheckbox } from './MenuList';
import BasicDateCalendar from './Basiccalender';
import SearchBox from './Seacrh';
import Test from '../Test'


const CalendarApp = () => {
 

  return (
    <div className="flex h-230 " style={{ backgroundColor: '#F1F1F1' }}>
      <div className='flex-col items-center mt-10 mx-10 '>
        <SearchBox />
        <br />
        <div className='bg-white rounded-2xl shadow-2xl'>
          <BasicDateCalendar />
        </div>
        
        <MenuWithCheckbox />
      </div>
      <div className="flex-1 p-6 ">
        
          <Test />
        </div>
      </div>
    
    );
};

export default CalendarApp;

