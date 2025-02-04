import React, { useState, useEffect } from 'react';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek } from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import '@schedule-x/theme-default/dist/index.css';
import './caren.css';
import { MenuWithCheckbox } from './MenuList';
import BasicDateCalendar from './Basiccalender';
import SearchBox from './Seacrh';
import { Button } from "@material-tailwind/react";
import BookingForm from './BookingForm'; 

const CalendarApp = () => {
  const eventsService = React.useState(() => createEventsServicePlugin())[0];

  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'My new event',
      start: '2025-02-01 02:00',
      end: '2025-02-01 03:00',
    },
    {
      id: '2',
      title: 'สอบ',
      start: '2025-02-01 06:00',
      end: '2025-02-01 09:00',
    },
  ]);

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events,
    plugins: [eventsService, createEventModalPlugin(), createDragAndDropPlugin()],
  });

  const [isBookingFormOpen, setBookingFormOpen] = useState(false);

  useEffect(() => {
    eventsService.getAll();
  }, [eventsService]);

  const openBookingForm = () => setBookingFormOpen(true);
  const closeBookingForm = () => setBookingFormOpen(false);

  // ฟังก์ชันเพิ่ม event ลงใน calendar
  const addEventToCalendar = (newEvent) => {
    setEvents((prevEvents) => [
      ...prevEvents,
      { id: `${Date.now()}`, ...newEvent },
    ]);
  };

  return (
    <div className="flex h-300 " style={{ backgroundColor: '#F1F1F1' }}>
      <div className='flex-col items-center mt-10 mx-10 '>
        <SearchBox />
        <br />
        <BasicDateCalendar />
        <MenuWithCheckbox />
      </div>
      <div className="flex-1 p-6 ">
        <div className='flex justify-end mr-20 '>
          <Button className='text-1xl' onClick={openBookingForm}>จองห้อง</Button>
        </div>
        <div className="p-4 rounded-lg shadow-lg">
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      </div>

      {/* Booking Form Modal */}
      <BookingForm
        open={isBookingFormOpen}
        handleOpen={closeBookingForm}
        onSubmitEvent={addEventToCalendar}
      />
    </div>
  );
};

export default CalendarApp;

