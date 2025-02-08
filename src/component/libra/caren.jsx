import React, { useState, useEffect } from "react";
import { MenuWithCheckbox } from "./MenuList";
import BasicDateCalendar from "./Basiccalender";
import SearchBox from "./Seacrh";
import { Button } from "@material-tailwind/react";
import BookingForm from "./BookingForm";
import CalendarPage from "../CalendarPage";

const CalendarApp = () => {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [events, setEvents] = useState([]);

  return (
    <div
      className="flex h-full w-full px-15 py-15"
      style={{ backgroundColor: "#F1F1F1" }}
    >
      {/* Sidebar */}
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-xl shadow-lg w-full">
          <SearchBox />
        </div>
        <br />
        <div className="bg-white mb-5 py-5 rounded-xl shadow-lg w-full">
          <BasicDateCalendar />
        </div>
        <div className="bg-white rounded-xl shadow-lg w-full h-full">
          <MenuWithCheckbox />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 rounded-xl shadow-lg bg-white mx-5">
        <div className="h-full">
          <CalendarPage events={events} />
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;
