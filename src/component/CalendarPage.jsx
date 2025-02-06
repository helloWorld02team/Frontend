import React, { useState, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import th from "date-fns/locale/th";
import { Dialog } from "@headlessui/react";
import LxStart from "./libra/LxStart";

const locales = { th };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
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
    title: "",
    start: null,
    end: null,
    building: "",
    floor: "",
    room: "",
    description: "",
    recurring: false,
  });

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

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert("Please fill all fields before saving.");
      return;
    }

    const newEvents = [
      {
        ...newEvent,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end),
        id: events.length,
      },
    ];

    // Handle recurring event creation
    if (newEvent.recurring) {
      const recurringEvents = [];
      for (let i = 1; i <= 4; i++) {
        const nextWeekStart = new Date(newEvent.start);
        nextWeekStart.setDate(nextWeekStart.getDate() + i * 7);

        const nextWeekEnd = new Date(newEvent.end);
        nextWeekEnd.setDate(nextWeekEnd.getDate() + i * 7);

        recurringEvents.push({
          ...newEvent,
          start: nextWeekStart,
          end: nextWeekEnd,
          id: events.length + i,
        });
      }
      newEvents.push(...recurringEvents);
    }

    setEvents((prev) => [...prev, ...newEvents]);
    setIsModalOpen(false);
  };

  const handleDeleteEvent = () => {
    setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id));
    setIsDetailModalOpen(false);
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

  return (
    <div className="h-full bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Booking Room</h1>
      </header>

      {/* Calendar Component */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
        step={30}
        views={{ week: true, day: true }}
        defaultView="week"
        className="border border-gray-200 rounded-lg"
        min={new Date(2023, 1, 1, 8, 0)}
        max={new Date(2023, 1, 1, 22, 0)}
      />

      {/* Modal for Adding Event */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-lg">
          <div className=" w-7/10 h-4/5 flex">
            <div className="w-full flex flex-row shadow-lg rounded-2xl overflow-hidden z-50">
              <LxStart />
              <div className="w-2/3 p-15 bg-white">
                <h2 className="text-4xl font-semibold mb-4">เพิ่มหัวข้อ...</h2>
                <form>
                  <div className="mb-4">
                    <label className="flex gap-2 text-lg font-medium py-2">
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
                      className="w-2/3 p-2 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
                      value={newEvent.title}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                    />
                  </div>

                  {/* ฟอร์มส่วนอื่นๆ */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="gap-2 text-lg font-medium py-2">
                        วันที่
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
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
                      <label className="gap-2 text-lg font-medium py-2">
                        เวลาเริ่ม
                      </label>
                      <input
                        type="time"
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
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
                      <label className="gap-2 text-lg font-medium py-2">
                        เวลาสิ้นสุด
                      </label>
                      <input
                        type="time"
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
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
                      <label className="gap-2 text-lg font-medium py-2">
                        อาคาร
                      </label>
                      <select
                        name="building"
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
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
                      <label className="gap-2 text-lg font-medium py-2">
                        ชั้น
                      </label>
                      <select
                        name="floor"
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
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
                      <label className="gap-2 text-lg font-medium py-2">
                        ห้อง
                      </label>
                      <select
                        name="room"
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-md focus:ring focus:border-blue-300"
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

                  {/* <div className="mb-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={newEvent.recurring}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            recurring: e.target.checked,
                          })
                        }
                      />
                      จองซ้ำทุกสัปดาห์
                    </label>
                  </div> */}

                  {/* คำอธิบาย */}
                  <div className="bg-[#F1F1F1] flex flex-col space-y-2 rounded-lg">
                    <textarea
                      name="description"
                      placeholder="คำอธิบาย..."
                      value={newEvent.description}
                      onChange={handleChange}
                      className="p-3 rounded-lg w-full"
                    />
                  </div>

                  {/* ฟอร์มอื่นๆ */}
                  <div className="flex justify-end py-10 gap-5">
                    <button
                      type="button"
                      className="text-xl px-5 py-3 border border-gray-300 rounded-xl w-[150px] shadow-md hover:shadow-lg"
                      onClick={() => setIsModalOpen(false)}
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="button"
                      className="text-xl px-5 py-3 bg-[#4EFFF0] border border-gray-300 rounded-xl w-[150px] shadow-md hover:shadow-lg"
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
          <div>
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-2xl font-semibold mb-4">รายละเอียดการจอง</h2>
              {selectedEvent && (
                <div>
                  <p>
                    <strong>ชื่อการจอง:</strong> {selectedEvent.title}
                  </p>
                  <p>
                    <strong>เวลาเริ่ม:</strong>{" "}
                    {new Date(selectedEvent.start).toLocaleString()}
                  </p>
                  <p>
                    <strong>เวลาสิ้นสุด:</strong>{" "}
                    {new Date(selectedEvent.end).toLocaleString()}
                  </p>
                  <p>
                    <strong>อาคาร:</strong> {selectedEvent.building}
                  </p>
                  <p>
                    <strong>ชั้น:</strong> {selectedEvent.floor}
                  </p>
                  <p>
                    <strong>ห้อง:</strong> {selectedEvent.room}
                  </p>
                </div>
              )}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="bg-red-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-700"
                  onClick={handleDeleteEvent}
                >
                  ลบการจอง
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  onClick={() => setIsDetailModalOpen(false)}
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
