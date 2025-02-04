import React from 'react';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import '@schedule-x/theme-default/dist/index.css';
import './caren.css';
import { MenuWithCheckbox } from './MenuList';
import BasicDateCalendar from './Basiccalender';
import SearchBox from './Seacrh';

const CalendarApp = () => {
  const eventsService = React.useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
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
    ],
    plugins: [
      eventsService,
      createEventModalPlugin(),
      createDragAndDropPlugin(),
    ],
  });

  React.useEffect(() => {
    eventsService.getAll();
  }, [eventsService]);

  return (
    <div className="flex h-screen  " style={{ backgroundColor: '#F1F1F1' }}>
      {/* Left Sidebar */}
      <div className='flex-col items-center mt-10 mx-10 '>
        <SearchBox />
        <br/>
        <BasicDateCalendar />
        <MenuWithCheckbox />
      </div>
      {/* Calendar Section */}
      <div className="flex-1 p-6">
        <div className='flex justify-end mr-30'>
          <botton>จองห้อง</botton>
        </div>
        <div className="p-4 rounded-lg shadow-lg">
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;