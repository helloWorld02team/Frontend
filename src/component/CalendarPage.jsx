import React, { useState, useCallback,useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import th from "date-fns/locale/th";
import { Dialog } from "@headlessui/react";
import LxStart from "./libra/LxStart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, addHours } from 'date-fns';

const locales = { th };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const roleOptions = ["Lecturer", "Staff", "LF", "Student"];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleNavigate = (date) => {
    setSelectedDate(date);
  };
  const buildingOptions = ["CB2", "LX", "SIT"];
  const floorOptions = {
    CB2: ["CB23"],
    LX: ["LX10", "LX11", "LX12"],
    SIT: ["SIT1", "SIT3", "SIT4"],
  };

  const roomOptions = {
    CB23: [
      "CB2301",
      "CB2304",
      "CB2305",
      "CB2306",
      "CB2308",
      "CB2312",
      "CB2313",
    ],
    LX10: ["LX10/1", "LX10/2", "LX10/3", "LX10/4", "LX10/5"],
    LX11: ["LX11/1", "LX11/2", "LX11/3", "LX11/4", "LX11/5"],
    LX12: ["LX12/1", "LX12/2"],
    SIT1: ["SIT1/3", "SIT1/5"],
    SIT3: ["SIT3/1", "SIT3/2", "SIT3/3", "SIT3/4"],
    SIT4: ["SIT4/2", "SIT4/3"],
  };

  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({

    maintitle: "",
    title: "",
    start: null,
    end: null,
    building: "",
    floor: "",
    room: "",
    description: "",
    recurring: false,

  });


//   useEffect(() => {
//     console.log("start fetch")
//     // Function to fetch data
//     const fetchData = async () => {
//         try {
//           console.log('tr')
//             const response = await fetch('http://localhost:3001/api/booking/');
//             const data = await response.json();

//             if (data.success) {
//                 // Set the events state with the fetched data
//                 setEvents(data.data);
//             } else {
//                 console.error("Error fetching data:", data.message);
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     // Call the fetchData function
//     fetchData();
// }, []);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      setNewEvent({ ...newEvent, start, end });
      setIsModalOpen(true);
    },
    [newEvent]
  );

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleAddEvent = async () => {
    if (
      !newEvent.maintitle ||
      !newEvent.room ||
      !newEvent.start ||
      !newEvent.end
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    const postData = {
      name: newEvent.maintitle,
      BookingTimeIn: newEvent.start.toISOString(),
      BookingTimeOut: newEvent.end.toISOString(),
      Room_idRoom: newEvent.room,
      BookingDesription:newEvent.description,
      repeatType: newEvent.recurring ? "weekly" : "none",

      repeatEndDate: newEvent.recurring && newEvent.repeatUntil,
    };

    try {

      const response = await fetch("http://helloworld02.sit.kmutt.ac.th:3001/api/booking/create", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(postData),
        credentials: "include",
      });
  
      const result = await response.json();

      console.log(result)
      if (result.success) {
        alert("จองห้องสำเร็จ!");
        

        // สร้าง Event ใหม่และอัปเดต State
        const newEvents = [
          {
            ...newEvent,
            start: new Date(newEvent.start),
            end: new Date(newEvent.end),
            id: events.length,
          },
        ];


        if (newEvent.recurring && newEvent.repeatUntil) {
          let nextStart = new Date(newEvent.start);
          let nextEnd = new Date(newEvent.end);
          const repeatUntilDate = new Date(newEvent.repeatUntil);

          while (nextStart <= repeatUntilDate) {
            nextStart.setDate(nextStart.getDate() + 7);
            nextEnd.setDate(nextEnd.getDate() + 7);

            if (nextStart <= repeatUntilDate) {
              newEvents.push({
                ...newEvent,
                start: new Date(nextStart),
                end: new Date(nextEnd),
                id: events.length + newEvents.length,
              });
            }
          }
        }


        setEvents((prev) => [...prev, ...newEvents]);
        setIsModalOpen(false);
      } else {
        console.log(result)
        alert("ไม่สามารถจองห้องได้: " + result.error);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("เกิดข้อผิดพลาดในการจองห้อง");
    }
  };

  const handleDeleteEvent = async () => {

    if (!selectedEvent || !selectedEvent.bookingid) return;
    
    try {
      console.log("delete click")
      const response = await fetch("http://helloworld02.sit.kmutt.ac.th:3001/api/booking/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idBooking: selectedEvent.bookingid}), 
        credentials:'include'
        // Send booking ID
      });
  
      if (!response.success) {
        alert("Deleting failed Unauthorized delete")
        throw new Error("Failed to delete booking");
        
      }

      // Remove event from state if API deletion is successful
      setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.bookingid));
      setIsDetailModalOpen(false);
      alert("Booking Deleted!!");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "building") {
      setNewEvent({ ...newEvent, building: value, floor: "", room: "" });
    } else if (name === "floor") {
      setNewEvent({ ...newEvent, floor: value, room: "" });
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  const CustomEvent = ({ event }) => {
    return (
      <div className="h-full flex flex-col justify-between">
        <div className="text-sm text-black h-3/4">{event.maintitle}</div>
        <div className="bg-black text-ml text-white flex justify-center items-center h-1/4 rounded-b-xl">
          {event.room}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://helloworld02.sit.kmutt.ac.th:3001/api/booking/"); 
        const data = await response.json();
        
        if (response.ok) {  
          const extractRoomInfo = (roomCode) => {
            let building, floor, room;
        
            // Handle CB rooms (e.g., CB2304)
            if (roomCode.startsWith("CB")) {
                building = "CB2";  // All CB rooms belong to building "CB"
                floor = roomCode.slice(3, 4);  // First two digits after 'CB' are the floor
                room = roomCode.slice(4);      // Remaining digits after floor are the room number
            }
            // Handle LX rooms (e.g., LX10/1)
            else if (roomCode.startsWith("LX")) {
                building = "LX";  // All LX rooms belong to building "LX"
                const parts = roomCode.split("/");  // Split by '/'
                floor = parts[0].slice(2);         // Extract floor number after 'LX'
                room = parts[1];                   // Room number after '/'
            }
            
            return [building, floor, room];
        }
          
          const parsedEvents = data.data.map((event) => ({
            ...event,
            start: addHours(parseISO(event.BookingTimeIn), 7),  // Convert and adjust for UTC+7
            end: addHours(parseISO(event.BookingTimeOut), 7),
            maintitle: event.BookingName,
            title: event.Username,
            building: extractRoomInfo(event.Room_idRoom)[0],
            floor: extractRoomInfo(event.Room_idRoom)[1],
            room: event.Room_idRoom,
            description: "",
            recurring: false,
            bookingid:event.idBooking
          }));
          
          setEvents(parsedEvents);
        } else {
          alert("เกิดข้อผิดพลาดในการดึงข้อมูล: " + data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับ API");
      }
    };

    fetchEvents();
  }, [selectedDate]);

  return (
    <div className="h-full">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Booking Rooms</h1><DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          locale="th"
          className="border border-gray-300 rounded-lg p-2"
        />
      </header>
      <div>
        
      </div>
      {/* Calendar Component */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: 700 }}
        step={30}
        views={{ week: true, day: true }}
        defaultView="week"
        className="rounded-xl"
        min={new Date(2023, 1, 1, 8, 0)}
        max={new Date(2023, 1, 1, 23, 0)}
        date={selectedDate}
        onNavigate={handleNavigate}
        components={{
          event: CustomEvent,
        }}
        eventPropGetter={(event) => {
          let color = "black"; // สีตัวอักษร
          let eventColor = "#3174ad"; // สีเริ่มต้นของอีเวนต์

          if (event.building === "CB2") eventColor = "#F5E460";
          if (event.building === "LX") eventColor = "#FFB692";
          if (event.building === "SIT") eventColor = "#ABE9FF";

          return {
            style: {
              background: `linear-gradient(to bottom, ${eventColor} 75%, #000 50%)`,
              color,
              border: "none",
              borderRadius: "8px",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            },
          };
        }}
        defaultDate={selectedDate}
      />

      <div className="flex items-center space-x-3 py-5 pl-5">
        <span>อาคาร:</span>
        <span className="bg-[#ABE9FF] text-[#2A82A1] px-4 py-1 rounded-full font-medium">
          SIT Building
        </span>
        <span className="bg-[#FFB692] text-[#C74200] px-4 py-1 rounded-full font-medium">
          LX
        </span>
        <span className="bg-[#F5E460] text-[#8E6F09] px-4 py-1 rounded-full font-medium">
          CB2
        </span>
        <span className="ml-3">หมวดหมู่:</span>
        <span className="text-center border-3 px-4 py-1 rounded-full font-medium">
          Lecturer
        </span>
        <span className="text-center border-3 px-4 py-1 rounded-full font-medium">
          Staff
        </span>
        <span className="text-center border-3 px-4 py-1 rounded-full font-medium">
          LF
        </span>
        <span className="text-center border-3 px-4 py-1 rounded-full font-medium">
          Student
        </span>
      </div>

      {/* Modal for Adding Event */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center rounded-lg">
          <div className=" w-7/10 h-9/10 flex ">
            <div className="w-full flex flex-row shadow-lg rounded-2xl z-50 overflow-auto ">
              <LxStart />
              <div className="w-2/3 p-15 bg-white">
                <form className="">
                  <div>
                    <textarea
                      className="w-full text-[26px] font-semibold mb-3 focus:outline-none focus:border-blue-500 resize-none break-words "
                      placeholder="เพิ่มหัวข้อ..."
                      value={newEvent.maintitle}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, maintitle: e.target.value })
                      }
                      rows={2}
                      wrap="soft"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="col-span-2">
                      <label className="flex gap-2 font-sm ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#000000"
                        >
                          <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                        </svg>
                        ผู้จอง
                      </label>
                      <input
                        type="text"
                        className="w-full h-8 px-3 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
                        value={newEvent.username}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, username: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="gap-2 py-2">บทบาท</label>
                      <select
                        name="role"
                        className="w-full h-8 px-3 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
                        value={newEvent.role}
                        onChange={handleChange}
                      >
                        <option value="">เลือกบทบาท</option>
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* ฟอร์มส่วนอื่นๆ */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="gap-2 py-2">วันที่</label>
                      <input
                        type="date"
                        className="w-full p-4 h-7 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
                        value={
                          newEvent.start
                            ? new Date(newEvent.start)
                                .toISOString()
                                .slice(0, 10)
                            : ""
                        }
                        onChange={(e) => {
                          const selectedDate = e.target.value;
                          setNewEvent({
                            ...newEvent,
                            start: `${selectedDate}T${
                              newEvent.start
                                ? new Date(newEvent.start)
                                    .toISOString()
                                    .slice(11, 16)
                                : "00:00"
                            }`,
                            end: `${selectedDate}T${
                              newEvent.end
                                ? new Date(newEvent.end)
                                    .toISOString()
                                    .slice(11, 16)
                                : "23:59"
                            }`,
                          });
                        }}
                      />
                    </div>
                    <div>
                      <label className="gap-2 py-2">เวลาเริ่ม</label>
                      <input
                        type="time"
                        className="w-full p-4 h-7 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
                        value={
                          newEvent.start
                            ? new Date(newEvent.start)
                                .toISOString()
                                .slice(11, 16)
                            : ""
                        }
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            start: `${newEvent.start?.slice(0, 10)}T${
                              e.target.value
                            }`,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="gap-2 py-2">เวลาสิ้นสุด</label>
                      <input
                        type="time"
                        className="w-full p-4 h-7 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
                        value={
                          newEvent.end
                            ? new Date(newEvent.end).toISOString().slice(11, 16)
                            : ""
                        }
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            end: `${newEvent.end?.slice(0, 10)}T${
                              e.target.value
                            }`,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* ฟอร์มสำหรับเลือกอาคาร ชั้น ห้อง */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="mb-4">
                      <label className="gap-2 py-2">อาคาร</label>
                      <select
                        name="building"
                        className="w-full h-8 px-3 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
                        value={newEvent.building}
                        onChange={handleChange}
                      >
                        <option value="">เลือกอาคาร</option>
                        {buildingOptions.map((building) => (
                          <option key={building} value={building}>
                            {building}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="gap-2 py-2">ชั้น</label>
                      <select
                        name="floor"
                        className="w-full h-8 px-3 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
                        value={newEvent.floor}
                        onChange={handleChange}
                        disabled={!newEvent.building}
                      >
                        <option value="">เลือกชั้น</option>
                        {newEvent.building &&
                          floorOptions[newEvent.building]?.map((floor) => (
                            <option key={floor} value={floor}>
                              {floor}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="gap-2 py-2">ห้อง</label>
                      <select
                        name="room"
                        className="w-full h-8 px-3 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
                        value={newEvent.room}
                        onChange={handleChange}
                        disabled={!newEvent.floor}
                      >
                        <option value="">เลือกห้อง</option>
                        {newEvent.floor &&
                          roomOptions[newEvent.floor]?.map((room) => (
                            <option key={room} value={room}>
                              {room}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="bg-[#F1F1F1] flex flex-col space-y-2 rounded-lg">
                    <textarea
                      name="description"
                      placeholder="คำอธิบาย..."
                      value={newEvent.description}
                      onChange={handleChange}
                      className="p-3 rounded-lg w-full h-18 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="mb-4">
                      <label className="gap-2 py-2">จองซ้ำ</label>
                      <select
                        name="recurring"
                        className="w-full h-8 px-3 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
                        value={newEvent.recurring}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            recurring: e.target.value === "weekly",
                          })
                        }
                      >
                        <option value="none">ไม่จองซ้ำ</option>
                        <option value="weekly">จองซ้ำทุกอาทิตย์</option>
                      </select>
                    </div>

                    {newEvent.recurring && (
                      <div className="mb-4">
                        <label className="gap-2 py-2">จองซ้ำถึงวันที่</label>
                        <input
                          type="date"
                          name="repeatUntil"
                          className="w-full h-8 px-3 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
                          value={newEvent.repeatUntil}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              repeatUntil: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* ฟอร์มอื่นๆ */}
                  <div className="flex justify-end py-5 gap-5">
                    <button
                      type="button"
                      className="px-5 py-2 border border-gray-300 rounded-xl w-[150px] shadow-md hover:shadow-lg"
                      onClick={() => setIsModalOpen(false)}
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="button"
                      className="px-5 py-2 bg-[#4EFFF0] border border-gray-300 rounded-xl w-[150px] shadow-md hover:shadow-lg"
                      onClick={handleAddEvent}
                    >
                      จองเลย
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Modal for Viewing Event Details */}
      <Dialog
        open={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      >
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className=" w-7/10 h-4/5 flex">
            <div className="w-full flex flex-row shadow-lg rounded-2xl overflow-hidden z-50">
              <LxStart />
              <div className="w-2/3 p-15 bg-white">
                {selectedEvent && (
                  <div>
                    <p className="text-4xl font-semibold mb-4 p-2">
                      {selectedEvent.maintitle}
                    </p>
                    <p className="flex gap-2 text-xl mb-4 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="30px"
                        viewBox="0 -960 960 960"
                        width="30px"
                        fill="#000000"
                      >
                        <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                      </svg>
                      {selectedEvent.username}
                      <span className="font-semibold text-sm mx-1 bg-[#179EFF] text-white p-0.5 px-5 rounded-full flex items-center">
                        {selectedEvent.role}
                      </span>
                    </p>

                    <div className="space-y-4 ml-3">
                      {/* วันที่ */}
                      <div className="flex items-center gap-4">
                        <svg
                          width="20"
                          height="21"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.21954 21C1.60917 21 1.08665 20.7944 0.65199 20.3831C0.21733 19.9719 0 19.4775 0 18.9V4.2C0 3.6225 0.21733 3.12812 0.65199 2.71687C1.08665 2.30562 1.60917 2.1 2.21954 2.1H3.32931V0H5.54885V2.1H14.427V0H16.6466V2.1H17.7563C18.3667 2.1 18.8892 2.30562 19.3239 2.71687C19.7585 3.12812 19.9759 3.6225 19.9759 4.2V18.9C19.9759 19.4775 19.7585 19.9719 19.3239 20.3831C18.8892 20.7944 18.3667 21 17.7563 21H2.21954ZM2.21954 18.9H17.7563V8.4H2.21954V18.9ZM2.21954 6.3H17.7563V4.2H2.21954V6.3ZM9.98793 12.6C9.6735 12.6 9.40993 12.4994 9.19722 12.2981C8.98452 12.0969 8.87816 11.8475 8.87816 11.55C8.87816 11.2525 8.98452 11.0031 9.19722 10.8019C9.40993 10.6006 9.6735 10.5 9.98793 10.5C10.3024 10.5 10.5659 10.6006 10.7786 10.8019C10.9914 11.0031 11.0977 11.2525 11.0977 11.55C11.0977 11.8475 10.9914 12.0969 10.7786 12.2981C10.5659 12.4994 10.3024 12.6 9.98793 12.6ZM5.54885 12.6C5.23442 12.6 4.97085 12.4994 4.75814 12.2981C4.54543 12.0969 4.43908 11.8475 4.43908 11.55C4.43908 11.2525 4.54543 11.0031 4.75814 10.8019C4.97085 10.6006 5.23442 10.5 5.54885 10.5C5.86329 10.5 6.12686 10.6006 6.33956 10.8019C6.55227 11.0031 6.65862 11.2525 6.65862 11.55C6.65862 11.8475 6.55227 12.0969 6.33956 12.2981C6.12686 12.4994 5.86329 12.6 5.54885 12.6ZM14.427 12.6C14.1126 12.6 13.849 12.4994 13.6363 12.2981C13.4236 12.0969 13.3172 11.8475 13.3172 11.55C13.3172 11.2525 13.4236 11.0031 13.6363 10.8019C13.849 10.6006 14.1126 10.5 14.427 10.5C14.7415 10.5 15.005 10.6006 15.2177 10.8019C15.4304 11.0031 15.5368 11.2525 15.5368 11.55C15.5368 11.8475 15.4304 12.0969 15.2177 12.2981C15.005 12.4994 14.7415 12.6 14.427 12.6ZM9.98793 16.8C9.6735 16.8 9.40993 16.6994 9.19722 16.4981C8.98452 16.2969 8.87816 16.0475 8.87816 15.75C8.87816 15.4525 8.98452 15.2031 9.19722 15.0019C9.40993 14.8006 9.6735 14.7 9.98793 14.7C10.3024 14.7 10.5659 14.8006 10.7786 15.0019C10.9914 15.2031 11.0977 15.4525 11.0977 15.75C11.0977 16.0475 10.9914 16.2969 10.7786 16.4981C10.5659 16.6994 10.3024 16.8 9.98793 16.8ZM5.54885 16.8C5.23442 16.8 4.97085 16.6994 4.75814 16.4981C4.54543 16.2969 4.43908 16.0475 4.43908 15.75C4.43908 15.4525 4.54543 15.2031 4.75814 15.0019C4.97085 14.8006 5.23442 14.7 5.54885 14.7C5.86329 14.7 6.12686 14.8006 6.33956 15.0019C6.55227 15.2031 6.65862 15.4525 6.65862 15.75C6.65862 16.0475 6.55227 16.2969 6.33956 16.4981C6.12686 16.6994 5.86329 16.8 5.54885 16.8ZM14.427 16.8C14.1126 16.8 13.849 16.6994 13.6363 16.4981C13.4236 16.2969 13.3172 16.0475 13.3172 15.75C13.3172 15.4525 13.4236 15.2031 13.6363 15.0019C13.849 14.8006 14.1126 14.7 14.427 14.7C14.7415 14.7 15.005 14.8006 15.2177 15.0019C15.4304 15.2031 15.5368 15.4525 15.5368 15.75C15.5368 16.0475 15.4304 16.2969 15.2177 16.4981C15.005 16.6994 14.7415 16.8 14.427 16.8Z"
                            fill="#09090B"
                          />
                        </svg>
                        <span className="font-semibold mx-1">วันที่</span>
                        <input
                          type="text"
                          className="border border-gray-400 rounded-lg p-1 px-3 w-3/10 text-center text-sm"
                          value={new Date(
                            selectedEvent.start
                          ).toLocaleDateString("th-TH", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                          readOnly
                        />
                      </div>

                      {/* เวลา */}

                      <div className="flex items-center gap-4">
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.965 15.435L15.435 13.965L11.55 10.08V5.25H9.45V10.92L13.965 15.435ZM10.5 21C9.0475 21 7.6825 20.7244 6.405 20.1731C5.1275 19.6219 4.01625 18.8737 3.07125 17.9287C2.12625 16.9837 1.37812 15.8725 0.826875 14.595C0.275625 13.3175 0 11.9525 0 10.5C0 9.0475 0.275625 7.6825 0.826875 6.405C1.37812 5.1275 2.12625 4.01625 3.07125 3.07125C4.01625 2.12625 5.1275 1.37812 6.405 0.826875C7.6825 0.275625 9.0475 0 10.5 0C11.9525 0 13.3175 0.275625 14.595 0.826875C15.8725 1.37812 16.9837 2.12625 17.9287 3.07125C18.8737 4.01625 19.6219 5.1275 20.1731 6.405C20.7244 7.6825 21 9.0475 21 10.5C21 11.9525 20.7244 13.3175 20.1731 14.595C19.6219 15.8725 18.8737 16.9837 17.9287 17.9287C16.9837 18.8737 15.8725 19.6219 14.595 20.1731C13.3175 20.7244 11.9525 21 10.5 21ZM10.5 18.9C12.8275 18.9 14.8094 18.0819 16.4456 16.4456C18.0819 14.8094 18.9 12.8275 18.9 10.5C18.9 8.1725 18.0819 6.19062 16.4456 4.55437C14.8094 2.91812 12.8275 2.1 10.5 2.1C8.1725 2.1 6.19062 2.91812 4.55437 4.55437C2.91812 6.19062 2.1 8.1725 2.1 10.5C2.1 12.8275 2.91812 14.8094 4.55437 16.4456C6.19062 18.0819 8.1725 18.9 10.5 18.9Z"
                            fill="black"
                          />
                        </svg>
                        <span className="font-semibold mx-0.75">เวลา</span>
                        <input
                          type="text"
                          className="border border-gray-400 rounded-lg p-1 px-3 w-3/10 text-center text-sm"
                          value={new Date(
                            selectedEvent.start
                          ).toLocaleTimeString("th-TH", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          readOnly
                        />
                        <span className="mx-3.5">-</span>
                        <input
                          type="text"
                          className="border border-gray-400 rounded-lg p-1 px-3 w-3/10 text-center text-sm"
                          value={new Date(selectedEvent.end).toLocaleTimeString(
                            "th-TH",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                          readOnly
                        />
                      </div>

                      {/* ชั้นและห้อง */}
                      <div className="flex items-center gap-4 mb-6">
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 24V0H11V5.33333H22V24H0ZM2.2 21.3333H8.8V18.6667H2.2V21.3333ZM2.2 16H8.8V13.3333H2.2V16ZM2.2 10.6667H8.8V8H2.2V10.6667ZM2.2 5.33333H8.8V2.66667H2.2V5.33333ZM11 21.3333H19.8V8H11V21.3333ZM13.2 13.3333V10.6667H17.6V13.3333H13.2ZM13.2 18.6667V16H17.6V18.6667H13.2Z"
                            fill="#09090B"
                          />
                        </svg>
                        <span className="font-semibold">ชั้นที่</span>
                        <input
                          type="text"
                          className="border border-gray-400 rounded-lg p-1 px-3 w-3/10 text-center text-sm"
                          value={selectedEvent.floor}
                          readOnly
                        />
                        <span className="font-semibold mx-1">ห้อง</span>
                        <input
                          type="text"
                          className="border border-gray-400 rounded-lg p-1 px-3 w-3/10 text-center text-sm"
                          value={selectedEvent.room}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="bg-[#F1F1F1] flex flex-col space-y-2 rounded-lg">
                      <textarea
                        value={selectedEvent.description}
                        className="p-3 rounded-lg w-full h-24 resize-none"
                        readOnly
                      />
                    </div>
                  </div>
                )}
                <div className="flex justify-end py-5 gap-5">
                  <button
                    type="button"
                    className="text-lg px-5 py-2 bg-[#FF0004] text-white border border-gray-300 rounded-xl w-[150px] shadow-md hover:shadow-lg"
                    onClick={handleDeleteEvent}
                  >
                    ลบการจอง
                  </button>
                  <button
                    type="button"
                    className="text-lg px-5 py-2 bg-[#000000] text-white border border-gray-300 rounded-xl w-[150px] shadow-md hover:shadow-lg"
                    onClick={() => setIsDetailModalOpen(false)}
                  >
                    ปิด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CalendarPage;