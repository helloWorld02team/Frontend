import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';


export default function BasicDateCalendar() {
    // สร้าง state เพื่อเก็บวันที่ที่เลือก
    const [selectedDate, setSelectedDate] = useState(null); 

    // ฟังก์ชันที่จะถูกเรียกเมื่อเลือกวันที่
    const handleDateChange = (newDate) => {
      setSelectedDate(newDate); // ตั้งค่า selectedDate เมื่อมีการเลือกวัน
      console.log('Selected Date:', newDate); // แสดงผลวันที่ที่เลือกใน console
    };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar 
        value={selectedDate} 
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}